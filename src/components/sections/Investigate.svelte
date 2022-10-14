<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_investigate_inview } from 'stores/sectionScrollManager';

	import FilterBox from 'components/filter/FilterBox.svelte';
	import HelpBtn from 'components/tutorial/HelpBtn.svelte';
	import Sidebar from 'components/Sidebar.svelte';

	let is_sidebar_open = true;

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

<section bind:this={el_section} id="investigate-section" class="h100">
	<h2 class="title wv-b4 tc">แสดงร่างกฎหมายไม่แบ่งกลุ่มเรียงตามสถานะ</h2>
	<FilterBox />
	<HelpBtn />
	<Sidebar is_open={is_sidebar_open} />

	<button type="button" on:click={() => (is_sidebar_open = !is_sidebar_open)} style="z-index:50">
		open sidebar
	</button>
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
