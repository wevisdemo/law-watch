<script lang="ts">
	import type { PartyChoiceType, SideChoiceType } from 'data/filter-choices';

	import { ALL_PARTY } from 'data/parties';
	import { SIDE_CHOICES } from 'data/filter-choices';
	import { data } from 'data/raw-data';
	import type { RawDataType } from 'data/raw-data-types';

	import {
		current_group_choice,
		current_party_choice,
		current_side_choice,
		sort_order_when_status,
		sort_order_when_timeline,
		view_timeline
	} from 'stores/filterOptionStore';
	import { current_selected_paper_id, highlighted_paper_ids } from 'stores/paperHighlightStore';

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

	const sortByName = (a: any, z: any) => {
		return a.Law_Name.localeCompare(z.Law_Name);
	};

	const groupDataByStatus = (
		data: RawDataType[]
	): [RawDataType[], RawDataType[], RawDataType[]] => {
		const status_json = groupBy(data, (d) => d.Law_Status);
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
		return (specific_party === 'เลือกทุกพรรค' ? ALL_PARTY : [specific_party]).map((party) =>
			data.filter((d) => d.Proposer_Party.includes(party))
		);
	};

	// https://twitter.com/dtinth/status/1315714173242728448/photo/1
	const removeNull = (element: any): element is Exclude<typeof element, null> => !!element;

	// #endregion

	let general_visdata: [RawDataType[], RawDataType[]][][];
	let proposer_visdata: [RawDataType[], RawDataType[]][][][];
	let party_visdata: [RawDataType[], RawDataType[]][][][];
	let timeline_visdata: any;
	$: {
		if ($view_timeline) {
			let temp: Record<string, RawDataType[]>;
			// Split into base catg
			if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') {
				// temp = groupBy(data, (d) => d.Proposer_Type);
				// if ($current_side_choice !== 'เลือกทุกฝ่าย')
				// 	temp = { [$current_side_choice]: temp[$current_side_choice] };
				temp = Object.fromEntries(
					($current_side_choice === 'เลือกทุกฝ่าย'
						? SIDE_CHOICES.slice(1)
						: [$current_side_choice]
					).map((side) => [side, data.filter((d) => d.Proposer_Type === side)])
				);
			} else if ($current_group_choice === 'พรรคที่เสนอร่างกฎหมาย') {
				temp = Object.fromEntries(
					($current_party_choice === 'เลือกทุกพรรค' ? ALL_PARTY : [$current_party_choice]).map(
						(party) => [party, data.filter((d) => d.Proposer_Party.includes(party))]
					)
				);
			} else {
				temp = { '0': data };
			}
			// remove merged law
			for (let group in temp) {
				temp[group] = temp[group].filter((d) => d.Law_Status !== 'กฎหมายที่ถูกรวมร่าง');
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
				หมวดหมู่: sort_by_catg
			};
			const sort_type_arr = [...$sort_order_when_timeline].reverse();
			for (let sort_type of sort_type_arr) {
				for (let group in temp) {
					temp[group] = temp[group].sort(SORT_FUNCTION_LOOKUP[sort_type]);
				}
			}
			timeline_visdata = temp;
		} else if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') {
			proposer_visdata = groupDataByProposer(data, $current_side_choice).map((data_by_proposer) => {
				const sort_step_functions =
					$sort_order_when_status[0] === 'สถานะ'
						? [groupDataByStatus, groupDataByCatg]
						: [groupDataByCatg, groupDataByStatus];
				return sort_step_functions[0](data_by_proposer)
					.filter(removeNull)
					.map((data_by_status) =>
						sort_step_functions[1](data_by_status)
							.filter(removeNull)
							.map(
								(data_by_catg) =>
									groupDataByInOutSapa(data_by_catg).map((data_by_inout) =>
										data_by_inout.sort(sortByName)
									) as [RawDataType[], RawDataType[]]
							)
					);
			});
		} else if ($current_group_choice === 'พรรคที่เสนอร่างกฎหมาย') {
			party_visdata = groupDataByParty(data, $current_party_choice).map((data_by_party) => {
				const sort_step_functions =
					$sort_order_when_status[0] === 'สถานะ'
						? [groupDataByStatus, groupDataByCatg]
						: [groupDataByCatg, groupDataByStatus];
				return sort_step_functions[0](data_by_party)
					.filter(removeNull)
					.map((data_by_status) =>
						sort_step_functions[1](data_by_status)
							.filter(removeNull)
							.map(
								(data_by_catg) =>
									groupDataByInOutSapa(data_by_catg).map((data_by_inout) =>
										data_by_inout.sort(sortByName)
									) as [RawDataType[], RawDataType[]]
							)
					);
			});
		} else {
			const sort_step_functions =
				$sort_order_when_status[0] === 'สถานะ'
					? [groupDataByStatus, groupDataByCatg]
					: [groupDataByCatg, groupDataByStatus];
			general_visdata = sort_step_functions[0](data).map((data_by_status) =>
				sort_step_functions[1](data_by_status)
					.filter(removeNull)
					.map(
						(data_by_catg) =>
							groupDataByInOutSapa(data_by_catg).map((data_by_inout) =>
								data_by_inout.sort(sortByName)
							) as [RawDataType[], RawDataType[]]
					)
			);
		}
	}
</script>

<div id="vis-playground" class:timeline_wide={$view_timeline && !$current_selected_paper_id}>
	{#if $view_timeline === true}
		<TimelineVis data={timeline_visdata} />
	{:else if $current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย'}
		<PurposerVis data={proposer_visdata} />
	{:else if $current_group_choice === 'พรรคที่เสนอร่างกฎหมาย'}
		<PartyVis data={party_visdata} />
	{:else}
		<GeneralVis data={general_visdata} />
	{/if}
</div>

<style lang="scss">
	#vis-playground {
		position: absolute;
		inset: 128px 0 64px;
		width: calc(100% - 48px);

		@media (min-width: 768px) {
			inset: 96px 308px 64px;
			width: calc(100% - 616px);

			transition-property: inset, width;
			transition-duration: 0.45s;
			transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
			will-change: inset, width;

			&.timeline_wide {
				inset: 96px 144px 64px 308px;
				width: calc(100% - 144px - 308px);

				transition-delay: 0.05s;
				transition-duration: 0.5s;
				transition-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
			}
		}

		margin: auto;

		display: flex;
		flex-direction: column;
		align-items: center;

		overflow-y: auto;
		overscroll-behavior: contain;

		// Webkit Scrollbar
		padding: 8px 32px;

		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 2px;
		}

		&::-webkit-scrollbar-thumb {
			background: #ffffff40;
			border-radius: 1px;
		}

		@supports (-moz-appearance: none) {
			scrollbar-color: #ffffff40 #ffffff00;
			scrollbar-width: thin;
		}
	}
</style>
