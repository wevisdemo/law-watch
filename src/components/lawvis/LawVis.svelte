<script lang="ts">
	import type { RawDataType } from 'data/data-types';
	import type { PartyChoiceType, SideChoiceType } from 'data/filter-choices';
	import { merge_cache } from 'data/merge-cache';
	import { ALL_PARTY } from 'data/parties';
	import { data as raw_data } from 'data/raw-data';

	import {
		current_group_choice,
		current_party_choice,
		current_side_choice,
		is_law_status_open,
		sort_order_when_status,
		sort_order_when_timeline,
		view_timeline
	} from 'stores/filterOptionStore';
	import { current_selected_paper_id } from 'stores/paperHighlightStore';
	import { timeline_animation_finished, timeline_mounted } from 'stores/timelineOptionStore';

	import ComponentTransitionManager from 'components/ComponentTransitionManager.svelte';
	import GeneralVis from './GeneralVis.svelte';
	import PartyVis from './PartyVis.svelte';
	import PurposerVis from './PurposerVis.svelte';
	import TimelineVis from './TimelineVis.svelte';

	// #region [ --- HELPER FUNCTIONS --- ]
	// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
	const groupBy = <T, K extends keyof any>(arr: T[], groupFn: (element: T) => K): Record<K, T[]> =>
		arr.reduce(
			(r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r),
			{} as Record<K, T[]>
		);

	// Groupping element when groupFn return array of overlapping group
	const groupByIncludes = <T, K extends keyof any>(
		arr: T[],
		groupFn: (element: T) => K[]
	): Record<K, T[]> =>
		arr.reduce(
			(r, v, _i, _a, g = groupFn(v)) => (g.forEach((k) => (r[k] || (r[k] = [])).push(v)), r),
			{} as Record<K, T[]>
		);

	const sortByName = (a: any, z: any) => {
		return a.Law_Name.localeCompare(z.Law_Name);
	};

	const groupDataByStatus =
		(keepMerged = true) =>
		(data: RawDataType[]): [RawDataType[], RawDataType[], RawDataType[]] => {
			const transformed_data = keepMerged
				? data.map((d) => {
						if (d.Law_Merge) return raw_data[merge_cache[d.Law_Merge]] ?? d;
						return d;
				  })
				: data;
			const status_json = groupBy(transformed_data, (d) => d.Law_Status);
			return [status_json.ตกไป, status_json.อยู่ในกระบวนการ, status_json.ออกเป็นกฎหมาย];
		};

	const groupDataByCatg = (
		data: RawDataType[]
	): [
		RawDataType[],
		RawDataType[],
		RawDataType[],
		RawDataType[],
		RawDataType[],
		RawDataType[],
		RawDataType[]
	] => {
		const catg_json = groupBy(data, (d) => d.Law_Type);
		return [
			catg_json.บริหารราชการ,
			catg_json.การศึกษา,
			catg_json.เศรษฐกิจ,
			catg_json.สังคม,
			catg_json.สิ่งแวดล้อม,
			catg_json.รัฐธรรมนูญ,
			catg_json.กระบวนการยุติธรรม
		];
	};

	const groupDataByInOutSapa = (data: RawDataType[]): [RawDataType[], RawDataType[]] => {
		const in_out_json = groupBy(data, (d) => +d.Law_in_Parliament);
		return [in_out_json[0] ?? [], in_out_json[1] ?? []];
	};

	const groupDataByProposer = (
		data: RawDataType[],
		specific_group: SideChoiceType
	): RawDataType[][] => {
		const catg_json = groupBy(data, (d) => d.Proposer_Type);
		return specific_group === 'เลือกทุกฝ่าย'
			? [
					catg_json.คณะรัฐมนตรี,
					catg_json.ประชาชน,
					catg_json.ฝ่ายรัฐบาล,
					catg_json.ฝ่ายค้าน,
					catg_json.ผสม,
					catg_json.ไม่ทราบฝ่าย
			  ]
			: [catg_json[specific_group]];
	};

	const groupDataByParty = (
		data: RawDataType[],
		specific_party: PartyChoiceType
	): RawDataType[][] => {
		const party_json = groupByIncludes(data, (d) => d.Proposer_Party);
		return specific_party === 'เลือกทุกพรรค'
			? ALL_PARTY.map((p) => party_json[p])
			: [party_json[specific_party]];
	};

	const sortData =
		(sort_order_when_status: ('สถานะ' | 'หมวดหมู่')[], keepMerged = true) =>
		(raw_data: RawDataType[]) => {
			const GROUP_FUNCTION_LOOKUP = {
				สถานะ: groupDataByStatus(keepMerged),
				หมวดหมู่: groupDataByCatg
			};
			return GROUP_FUNCTION_LOOKUP[sort_order_when_status[0]](raw_data)
				.filter(removeNull)
				.map((data_by_status) =>
					GROUP_FUNCTION_LOOKUP[sort_order_when_status[1]](data_by_status)
						.filter(removeNull)
						.map(
							(data_by_catg) =>
								groupDataByInOutSapa(data_by_catg).map((data_by_inout) =>
									data_by_inout.sort(sortByName)
								) as [RawDataType[], RawDataType[]]
						)
				);
		};

	// https://twitter.com/dtinth/status/1315714173242728448/photo/1
	const removeNull = (element: any): element is Exclude<typeof element, null> => !!element;

	// #endregion

	let general_visdata: [RawDataType[], RawDataType[]][][];
	let proposer_visdata: [RawDataType[], RawDataType[]][][][];
	let party_visdata: [RawDataType[], RawDataType[]][][][];
	let timeline_visdata: any;
	$: if ($view_timeline) {
		let temp: Record<string, RawDataType[]>;
		// Split into base catg
		if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') {
			temp = groupBy(raw_data, (d) => d.Proposer_Type);
			temp = {
				คณะรัฐมนตรี: temp.คณะรัฐมนตรี,
				ประชาชน: temp.ประชาชน,
				ฝ่ายรัฐบาล: temp.ฝ่ายรัฐบาล,
				ฝ่ายค้าน: temp.ฝ่ายค้าน,
				ผสม: temp.ผสม,
				ไม่ทราบฝ่าย: temp.ไม่ทราบฝ่าย
			};
		} else if ($current_group_choice === 'พรรคที่เสนอร่างกฎหมาย') {
			temp = groupByIncludes(raw_data, (d) => d.Proposer_Party);
			temp = Object.fromEntries(ALL_PARTY.map((p) => [p, temp[p]]));
		} else {
			temp = { '0': raw_data };
		}
		// remove merged law in general vis
		if ('0' in temp) {
			temp['0'] = temp['0'].filter((d) => d.Law_Status !== 'กฎหมายที่ถูกรวมร่าง');
		} else {
			// not general vis, replace merged law with its head law
			for (let group in temp) {
				temp[group] = temp[group].map((d) => {
					if (d.Law_Merge) return raw_data[merge_cache[d.Law_Merge]] ?? d;
					return d;
				});
			}
		}
		// sort order
		const STATUS_SORT_LOOKUP = {
			กฎหมายที่ถูกรวมร่าง: 0,
			ตกไป: 1,
			อยู่ในกระบวนการ: 2,
			ออกเป็นกฎหมาย: 3
		} as const;
		const CATG_SORT_LOOKUP = {
			บริหารราชการ: 0,
			การศึกษา: 1,
			เศรษฐกิจ: 2,
			สังคม: 3,
			สิ่งแวดล้อม: 4,
			รัฐธรรมนูญ: 5,
			กระบวนการยุติธรรม: 6
		};
		const sort_by_duration = (a: RawDataType, z: RawDataType) =>
			(z.Date_Diff ?? 0) - (a.Date_Diff ?? 0);
		const sort_by_status = (a: RawDataType, z: RawDataType) =>
			STATUS_SORT_LOOKUP[a.Law_Status] - STATUS_SORT_LOOKUP[z.Law_Status];
		const sort_by_catg = (a: RawDataType, z: RawDataType) =>
			CATG_SORT_LOOKUP[a.Law_Type] - CATG_SORT_LOOKUP[z.Law_Type];
		const SORT_FUNCTION_LOOKUP = {
			ระยะเวลา: sort_by_duration,
			สถานะ: sort_by_status,
			หมวดหมู่: sort_by_catg,
			ชื่อ: sortByName
		};
		const sort_type_arr = [...$sort_order_when_timeline, 'ชื่อ'].reverse() as (
			| typeof $sort_order_when_timeline[number]
			| 'ชื่อ'
		)[];
		for (let sort_type of sort_type_arr) {
			for (let group in temp) {
				temp[group] = temp[group].sort(SORT_FUNCTION_LOOKUP[sort_type]);
			}
		}
		timeline_visdata = temp;
	} else if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') {
		proposer_visdata = groupDataByProposer(raw_data, $current_side_choice).map(
			sortData($sort_order_when_status)
		);
	} else if ($current_group_choice === 'พรรคที่เสนอร่างกฎหมาย') {
		party_visdata = groupDataByParty(raw_data, $current_party_choice).map(
			sortData($sort_order_when_status)
		);
	} else {
		general_visdata = sortData($sort_order_when_status, false)(raw_data);
	}

	let current_component_index = 0;
	$: if ($view_timeline === true) current_component_index = 3;
	else if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') current_component_index = 1;
	else if ($current_group_choice === 'พรรคที่เสนอร่างกฎหมาย') current_component_index = 2;
	else current_component_index = 0;
</script>

<div
	id="vis-playground"
	class:timeline_wide={$timeline_mounted && !$current_selected_paper_id}
	class:timeline_transition={$timeline_animation_finished}
	class:is_law_status_open={$is_law_status_open}
>
	<ComponentTransitionManager
		components_data_arr={[
			{ component: GeneralVis, props: { data: general_visdata } },
			{ component: PurposerVis, props: { data: proposer_visdata } },
			{ component: PartyVis, props: { data: party_visdata } },
			{ component: TimelineVis, props: { data: timeline_visdata } }
		]}
		{current_component_index}
	/>
</div>

<style lang="scss">
	#vis-playground {
		position: absolute;
		inset: 128px 0 64px;
		padding: 8px 16px 8px 8px;
		width: calc(100% - 48px);

		@media (max-width: 767.5px) {
			&.is_law_status_open {
				inset: 128px 0 192px;
			}
		}

		@media (min-width: 768px) {
			inset: 96px 308px 64px;
			width: calc(100% - 616px);
			will-change: inset, width;

			&.timeline_wide {
				inset: 96px 144px 64px 308px;
				padding: 8px;
				width: calc(100% - 144px - 308px);
			}

			&.timeline_transition {
				transition-property: inset, width;
				transition-duration: 0.45s;
				transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);

				&.timeline_wide {
					transition-delay: 0.05s;
					transition-duration: 0.5s;
					transition-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
				}
			}
		}

		margin: auto;

		display: flex;
		flex-direction: column;
		align-items: center;

		overflow: scroll;
		overscroll-behavior: auto;

		&::-webkit-scrollbar {
			width: 2px;
			height: 2px;
		}

		&::-webkit-scrollbar-thumb {
			background: #ffffff40;
			border-radius: 1px;
		}

		&::-webkit-scrollbar-corner {
			background: transparent;
		}

		@supports (-moz-appearance: none) {
			scrollbar-color: #ffffff40 #ffffff00;
			scrollbar-width: thin;
		}
	}
</style>
