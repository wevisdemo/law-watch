<script lang="ts">
	import Paper from 'components/Paper.svelte';
	import { sort_order_when_status, current_group_choice } from 'stores/filterOptionStore';

	export let data: any;

	// #region[ --- HELPER FUNCTIONS --- ]
	// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
	const groupBy = (arr: any[], groupFn: (element: any) => any) => {
		return arr.reduce((r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
	};

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

	const groupDataByStatus = <T>(data: T[]): T[][] => {
		const status_json = groupBy(data, (d) => d.Law_Status);
		return [status_json.ตกไป, status_json.อยู่ในกระบวนการ, status_json.ออกเป็นกฎหมาย];
	};

	const groupDataByCatg = <T>(data: T[]): T[][] => {
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

	const groupDataByInOutSapa = <T>(data: T[]): T[][] => {
		const in_out_json = groupBy(data, (d) => +d.Law_in_Parliament);
		return [in_out_json[0] ?? [], in_out_json[1] ?? []];
	};

	// https://twitter.com/dtinth/status/1315714173242728448/photo/1
	const removeNull = (element: any): element is Exclude<typeof element, null> => !!element;

	// #endregion

	let transformed_data: any = data;
	$: {
		let temp: any = '';
		// if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') {
		// 	temp = groupBy(data, (element) => element.Law_Status);
		// 	temp = [temp.ตกไป, temp.อยู่ในกระบวนการ, temp.ออกเป็นกฎหมาย];
		// } else {
		const step_function =
			$sort_order_when_status[0] === 'สถานะ'
				? [groupDataByStatus, groupDataByCatg]
				: [groupDataByCatg, groupDataByStatus];
		temp = step_function[0](data).map((data_by_status) =>
			step_function[1](data_by_status)
				.filter(removeNull)
				.map((data_by_catg) =>
					groupDataByInOutSapa(data_by_catg).map((data_by_inout) => data_by_inout.sort(sortByName))
				)
		);
		// }
		transformed_data = temp;
	}
</script>

<div id="vis-playground">
	{#each transformed_data as dom_catg}
		<div class="row">
			{#each dom_catg as [out_sapa, in_sapa]}
				{#each out_sapa as doc (doc.Law_ID)}
					<Paper
						category={doc.Law_Type}
						type={textTypeToPaperType(doc.Law_Status)}
						stacked={doc.Law_Merge_Head}
						title={doc.Law_Name}
					/>
				{/each}
				{#if out_sapa.length && in_sapa.length}
					<div class="line" />
				{/if}
				{#each in_sapa as doc (doc.Law_ID)}
					<Paper
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

<style lang="scss">
	#vis-playground {
		position: absolute;
		inset: 25% 0;
		width: 370px;
		margin: auto;

		.row {
			display: flex;
			flex-wrap: wrap;
			gap: 8px 0;
			margin-bottom: 8px;
		}
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
</style>
