<script lang="ts">
	import type { PartyChoiceType, SideChoiceType } from 'data/filter-choices';

	import { ALL_PARTY } from 'data/parties';
	import type { RawDataType } from 'data/raw-data-types';

	import {
		current_group_choice,
		current_party_choice,
		current_side_choice,
		sort_order_when_status
	} from 'stores/filterOptionStore';

	import GeneralVis from './GeneralVis.svelte';
	import PartyVis from './PartyVis.svelte';
	import PurposerVis from './PurposerVis.svelte';

	export let data: RawDataType[];

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
		const by_party = ALL_PARTY.map((party) => data.filter((d) => d.Proposer_Party.includes(party)));
		return specific_party === 'เลือกทุกพรรค'
			? by_party
			: [by_party[ALL_PARTY.indexOf(specific_party)]];
	};

	// https://twitter.com/dtinth/status/1315714173242728448/photo/1
	const removeNull = (element: any): element is Exclude<typeof element, null> => !!element;

	// #endregion

	let general_visdata: [RawDataType[], RawDataType[]][][];
	let proposer_visdata: [RawDataType[], RawDataType[]][][][];
	let party_visdata: [RawDataType[], RawDataType[]][][][];
	$: {
		if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') {
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

<div id="vis-playground">
	{#if $current_group_choice === 'ไม่แบ่งกลุ่ม'}
		<GeneralVis data={general_visdata} />
	{:else if $current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย'}
		<PurposerVis data={proposer_visdata} />
	{:else if $current_group_choice === 'พรรคที่เสนอร่างกฎหมาย'}
		<PartyVis data={party_visdata} />
	{/if}
</div>

<style lang="scss">
	#vis-playground {
		position: absolute;
		inset: 128px 0;
		width: calc(100% - 48px);
		@media (min-width: 768px) {
			inset: 128px 308px;
			width: calc(100% - 616px);
		}

		margin: auto;

		display: flex;
		flex-direction: column;
		align-items: center;

		overflow-y: auto;
		overscroll-behavior: contain;
	}
</style>
