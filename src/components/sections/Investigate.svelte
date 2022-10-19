<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_investigate_inview } from 'stores/sectionScrollManager';
	import {
		current_group_choice,
		current_side_choice,
		current_party_choice,
		current_voteparty_choice,
		sort_order
	} from 'stores/filterOptionStore';

	import FilterBox from 'components/filter/FilterBox.svelte';
	import HelpOverlay from 'components/tutorial/HelpOverlay.svelte';
	import Sidebar from 'components/Sidebar.svelte';

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
</script>

<section bind:this={el_section} id="investigate-section" class="h100">
	<h2 class="title wv-b4 tc nw">{@html label}</h2>
	<FilterBox />
	<Sidebar is_open={is_sidebar_open} />
	<HelpOverlay />

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
</style>
