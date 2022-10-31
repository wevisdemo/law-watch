<script lang="ts">
	import Paper from 'components/Paper.svelte';
	import type { PartyChoiceType, SideChoiceType } from 'data/filter-choices';

	import type { RawDataType } from 'data/raw-data-types';
	import { stats } from 'data/stats-cache';
	import { ALL_PARTY } from 'data/parties';

	import {
		sort_order_when_status,
		current_group_choice,
		current_side_choice,
		current_party_choice
	} from 'stores/filterOptionStore';

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

	const textTypeToPaperType = (text_type: string) =>
		((
			{
				ตกไป: '',
				อยู่ในกระบวนการ: 'process',
				ออกเป็นกฎหมาย: 'pass'
			} as const
		)[text_type] ?? '');

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

	const LAW_COUNT_WO_STACK = stats.all_law_len - stats.merged_law_len;

	const groupDataByParty = (
		data: RawDataType[],
		specific_party: PartyChoiceType
	): RawDataType[][] => {
		const by_party = ALL_PARTY.map((party) => data.filter((d) => d.Proposer_Party.includes(party)));
		return specific_party === 'เลือกทุกพรรค'
			? by_party
			: [by_party[ALL_PARTY.indexOf(specific_party)]];
	};

	const PROPOSER = ['คณะรัฐมนตรี', 'ประชาชน', 'ฝ่ายรัฐบาล', 'ฝ่ายค้าน', 'ผสม', 'ไม่ทราบฝ่าย'];

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
		<div class="general-vis-container">
			{#each general_visdata as dom_catg}
				<div class="row">
					{#each dom_catg as [out_sapa, in_sapa]}
						{#each out_sapa as doc (doc.Law_ID)}
							<Paper
								law_id={doc.Law_ID}
								category={doc.Law_Type}
								type={textTypeToPaperType(doc.Law_Status)}
								stacked={doc.Law_Merge_Head}
								title={doc.Law_Name}
							/>
						{/each}
						<!-- {#if out_sapa.length && in_sapa.length} -->
						<div class="line" />
						<!-- {/if} -->
						{#each in_sapa as doc (doc.Law_ID)}
							<Paper
								law_id={doc.Law_ID}
								category={doc.Law_Type}
								type={textTypeToPaperType(doc.Law_Status)}
								stacked={doc.Law_Merge_Head}
								title={doc.Law_Name}
							/>
						{/each}
					{/each}
				</div>
			{/each}
		</div>
	{:else if $current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย'}
		<div class="proposer-container">
			{#each proposer_visdata as proposer, i}
				<div class="nw text-right">
					{$current_side_choice === 'เลือกทุกฝ่าย' ? PROPOSER[i] : $current_side_choice}
				</div>
				<div>
					{#each proposer as dom_catg}
						<div class="row">
							{#each dom_catg as [out_sapa, in_sapa]}
								{#each out_sapa as doc (doc.Law_ID)}
									<Paper
										law_id={doc.Law_ID}
										category={doc.Law_Type}
										type={textTypeToPaperType(doc.Law_Status)}
										stacked={doc.Law_Merge_Head}
										title={doc.Law_Name}
									/>
								{/each}
								<!-- <div class="line" /> -->
								{#each in_sapa as doc (doc.Law_ID)}
									<Paper
										law_id={doc.Law_ID}
										category={doc.Law_Type}
										type={textTypeToPaperType(doc.Law_Status)}
										stacked={doc.Law_Merge_Head}
										title={doc.Law_Name}
									/>
								{/each}
							{/each}
							<div class="number">
								<span class="wv-font-semibold">{dom_catg.flat(2).length} ฉบับ</span>
								<span class="number-back sep">
									{((dom_catg.flat(2).length / LAW_COUNT_WO_STACK) * 100).toFixed(1)}%
								</span>
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{:else if $current_group_choice === 'พรรคที่เสนอร่างกฎหมาย'}
		<div class="party-container">
			{#each party_visdata as party, i}
				<div class="nw text-right">
					{$current_party_choice === 'เลือกทุกพรรค' ? ALL_PARTY[i] : $current_party_choice}
				</div>
				<div class="row">
					{#each party as dom_catg}
						{#each dom_catg as [out_sapa, in_sapa]}
							{#each out_sapa as doc (doc.Law_ID)}
								<Paper
									law_id={doc.Law_ID}
									category={doc.Law_Type}
									type={textTypeToPaperType(doc.Law_Status)}
									stacked={doc.Law_Merge_Head}
									title={doc.Law_Name}
								/>
							{/each}
							<!-- <div class="line" /> -->
							{#each in_sapa as doc (doc.Law_ID)}
								<Paper
									law_id={doc.Law_ID}
									category={doc.Law_Type}
									type={textTypeToPaperType(doc.Law_Status)}
									stacked={doc.Law_Merge_Head}
									title={doc.Law_Name}
								/>
							{/each}
						{/each}
					{/each}
					<div class="number">
						<span class="wv-font-semibold">{party.flat(3).length} ฉบับ</span>
						<span class="number-back">
							{party
								.map((e) => e.flat(2).length)
								.filter((e) => e)
								.join(' | ')}
						</span>
					</div>
				</div>
			{/each}
		</div>
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

		.row {
			display: flex;
			flex-wrap: wrap;
			gap: 8px 0;
			margin-bottom: 8px;
		}
	}

	.general-vis-container {
		max-width: 370px;
		margin: auto;
	}

	.line {
		position: relative;
		pointer-events: none;

		&::after {
			content: '';
			position: absolute;
			background: url(/law-watch/line.png);
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			height: 28px;
			width: 4px;
			top: -2px;
			left: -2px;
			z-index: 2;
		}
	}

	.proposer-container,
	.party-container {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: 24px 48px;
		margin: auto;
	}

	.party-container {
		gap: 16px 16px;
	}

	.text-right {
		text-align: right;
	}

	.number {
		margin-left: 20px;

		display: flex;
		align-items: baseline;
	}

	.number-back {
		font-size: 0.8em;

		margin-left: 1ch;

		&.sep {
			border-left: 1px #fff solid;
			padding-left: 1ch;
		}
	}
</style>
