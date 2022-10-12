<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_investigate_inview } from 'stores/sectionScrollManager';

	import GroupRadio, { type GROUP_NAME } from 'components/GroupRadio.svelte';
	let selected_law: GROUP_NAME[] = [
		'บริหารราชการ',
		'การศึกษา',
		'เศรษฐกิจ',
		'สังคม',
		'สิ่งแวดล้อม',
		'กระบวนการยุติธรรม',
		'รัฐธรรมนูญ'
	];

	import LawStatus from 'components/LawStatus.svelte';
	import SortBy from 'components/SortBy.svelte';

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
</script>

<section bind:this={el_section} id="investigate-section" class="h100 c wv-font-anuphan">
	<h2 class="wv-b4">แสดงร่างกฎหมายไม่แบ่งกลุ่มเรียงตามสถานะ</h2>
	<div class="investigate-body">
		<div class="side">
			<div class="header wv-b6 wv-font-semibold">แบ่งกลุ่มตาม</div>
			<SortBy />
			<GroupRadio {selected_law} />
			<LawStatus />
		</div>
		<div>
			<div class="center">Center</div>
		</div>
		<div class="side">Right Reduce</div>
	</div>
</section>

<style lang="scss">
	.investigate-body {
		display: grid;
		grid-template-columns: 1fr max-content 1fr;
		width: 90%;

		> .side {
			width: fit-content;
		}

		.center {
			width: 100%;
		}
	}
</style>
