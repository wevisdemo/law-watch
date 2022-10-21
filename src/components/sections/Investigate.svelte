<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_investigate_inview } from 'stores/sectionScrollManager';
	import {
		current_group_choice,
		current_side_choice,
		current_party_choice,
		current_voteparty_choice,
		sort_order,
		selected_law
	} from 'stores/filterOptionStore';

	import { data } from 'data/rawData';

	import FilterBox from 'components/filter/FilterBox.svelte';
	import HelpOverlay from 'components/tutorial/HelpOverlay.svelte';
	import Sidebar from 'components/Sidebar.svelte';
	import Paper from 'components/Paper.svelte';

	$: label = (() => {
		let formatted_choice;
		switch ($current_group_choice) {
			case 'ฝ่ายที่เสนอร่างกฎหมาย':
				formatted_choice =
					// @ts-expect-error ตรงนี้ fallback แล้วด้วย `??`
					{
						เลือกทุกฝ่าย: 'ทุกฝ่าย',
						คณะรัฐมนตรี: 'ฝ่ายคณะรัฐมนตรี',
						ประชาชน: 'ฝ่ายประชาชน',
						ผสม: 'ฝ่ายผสม'
					}?.[$current_side_choice] ?? $current_side_choice;
			case 'พรรคที่เสนอร่างกฎหมาย':
				if (!formatted_choice) {
					formatted_choice =
						// @ts-expect-error ตรงนี้ fallback แล้วด้วย `??`
						{
							เลือกทุกพรรค: 'ทุกพรรค'
						}?.[$current_party_choice] ?? 'พรรค' + $current_party_choice;
				}
				return `แสดงการเสนอ<wbr>ร่างกฎหมาย${formatted_choice}<wbr>เรียงตาม${$sort_order[0]}`;
			case 'ผลโหวตของพรรค':
				return `แสดงผลโหวต<wbr>ของพรรค${current_voteparty_choice}<wbr>เรียงตาม${$sort_order[0]}`;
			default:
				return `แสดงร่างกฎหมาย<wbr>ไม่แบ่งกลุ่ม<wbr>เรียงตาม${$sort_order[0]}`;
		}
	})();

	let is_sidebar_open = false;

	let el_section: Element;
	onMount(() => {
		inView(
			el_section,
			() => {
				is_investigate_inview.set(true);
				return () => is_investigate_inview.set(false);
			},
			{
				margin: '0px 0px -50% 0px'
			}
		);
	});

	// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
	const groupBy = (arr: any[], groupFn: (element: any) => any) => {
		return arr.reduce((r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
	};

	const CATG_ORDER = {
		บริหารราชการ: 1,
		การศึกษา: 2,
		เศรษฐกิจ: 3,
		สังคม: 4,
		สิ่งแวดล้อม: 5,
		รัฐธรรมนูญ: 6,
		กระบวนการยุติธรรม: 7
	};
	const catgSort = (a: any, z: any) => {
		//@ts-expect-error
		if ((CATG_ORDER[a.หมวดหมู่ร่างกฎหมาย] ?? 0) === (CATG_ORDER[z.หมวดหมู่ร่างกฎหมาย] ?? 0)) {
			return a.ชื่อจริงร่างกฎหมาย.localeCompare(z.ชื่อจริงร่างกฎหมาย);
		}
		return Math.sign(
			//@ts-expect-error
			(CATG_ORDER[a.หมวดหมู่ร่างกฎหมาย] ?? 0) - (CATG_ORDER[z.หมวดหมู่ร่างกฎหมาย] ?? 0)
		);
	};

	let transformed_data: any = data;
	$: {
		let temp: any = '';
		if ($current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย') {
			// temp = groupBy(data, (element) => element['ประเภทผู้เสนอ']);
			// for (let key in temp) {
			// 	if ($sort_order[0] === 'สถานะ') {
			// 		temp[key] = groupBy(temp[key], (element) => element['status ร่างกฎหมาย']);
			// 	} else {
			// 		temp[key] = groupBy(temp[key], (element) => element.หมวดหมู่ร่างกฎหมาย);
			// 	}
			// }
		} else {
			temp = groupBy(data, (element) => element['status ร่างกฎหมาย']);
			// if ($sort_order[0] === 'สถานะ') {
			// } else {
			// 	temp = groupBy(data, (element) => element.หมวดหมู่ร่างกฎหมาย);
			// }
			// for (let key in temp) {
			// 	temp[key] = temp[key].filter((e: any) =>
			// 		$selected_law.some((c) => e.หมวดหมู่ร่างกฎหมาย.includes(c))
			// 	);
			// }
			temp = [
				temp.ตกไป.sort(catgSort),
				temp.อยู่ในกระบวนการ.sort(catgSort),
				[...temp.กฎหมายที่ถูกรวมร่าง.sort(catgSort), ...temp.ออกเป็นกฎหมาย.sort(catgSort)]
			];
		}
		transformed_data = temp;
	}
</script>

<section bind:this={el_section} id="investigate-section" class="h100">
	<h2 class="title wv-b4 tc nw">{@html label}</h2>
	<div class="playground">
		{#if $current_group_choice !== 'ฝ่ายที่เสนอร่างกฎหมาย'}
			{#each transformed_data as _type, i}
				<div class="row">
					{#each _type as doc}
						<Paper
							category={doc.หมวดหมู่ร่างกฎหมาย}
							type={{
								ตกไป: '',
								อยู่ในกระบวนการ: 'process',
								ออกเป็นกฎหมาย: 'pass',
								กฎหมายที่ถูกรวมร่าง: 'stack'
							}[doc['status ร่างกฎหมาย']]}
						/>
					{/each}
				</div>
			{/each}
		{/if}
	</div>
	<FilterBox />
	<Sidebar is_open={is_sidebar_open} />
	<!-- <HelpOverlay /> -->

	<!-- <button
		type="button"
		on:click={() => (is_sidebar_open = !is_sidebar_open)}
		style="position:absolute;top:50%;left:50%"
	>
		open sidebar
	</button> -->
</section>

<style lang="scss">
	#investigate-section {
		scroll-snap-align: center;
	}

	.title {
		position: absolute;
		inset: 24px;
		top: 64px;
		width: calc(100% - 48px);

		@media (min-width: 768px) {
			left: calc(308px);
			width: calc(100% - 616px);
		}
	}

	.playground {
		position: absolute;
		inset: 25% 0;
		width: 370px;
		margin: auto;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 0;
		margin-bottom: 8px;
	}
</style>
