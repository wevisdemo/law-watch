<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_investigate_inview } from 'stores/sectionScrollManager';

	import FilterBox from 'components/filter/FilterBox.svelte';
	import HelpBtn from 'components/tutorial/HelpBtn.svelte';

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

<section bind:this={el_section} id="investigate-section" class="h100 wv-font-anuphan">
	<h2 class="title wv-b4 tc">แสดงร่างกฎหมายไม่แบ่งกลุ่มเรียงตามสถานะ</h2>
	<FilterBox />
	<HelpBtn />
</section>

<style lang="scss">
	#investigate-section {
		scroll-snap-align: center;
	}

	.title {
		position: absolute;
		inset: 0;
		top: 64px;
	}
</style>
