<script lang="ts">
	import { inView } from 'motion';
	import { onMount } from 'svelte';

	import {
		current_group_choice,
		current_party_choice,
		current_side_choice,
		// current_voteparty_choice,
		sort_order
	} from 'stores/filterOptionStore';
	import { is_investigate_inview } from 'stores/sectionScrollManager';

	import FilterBox from 'components/filter/FilterBox.svelte';
	import HelpOverlay from 'components/tutorial/HelpOverlay.svelte';
	import LawVis from 'components/lawvis/LawVis.svelte';
	import Sidebar from 'components/Sidebar.svelte';

	$: label = (() => {
		let formatted_choice: string | undefined;
		switch ($current_group_choice) {
			case 'ฝ่ายที่เสนอร่างกฎหมาย':
				formatted_choice =
					(
						{
							เลือกทุกฝ่าย: 'ทุกฝ่าย',
							คณะรัฐมนตรี: 'ฝ่ายคณะรัฐมนตรี',
							ประชาชน: 'ฝ่ายประชาชน',
							ผสม: 'ฝ่ายผสม'
						} as Record<string, string | undefined>
					)[$current_side_choice] ?? $current_side_choice;
			case 'พรรคที่เสนอร่างกฎหมาย':
				if (!formatted_choice) {
					formatted_choice =
						(
							{
								เลือกทุกพรรค: 'ทุกพรรค'
							} as Record<string, string | undefined>
						)[$current_party_choice] ?? 'พรรค' + $current_party_choice;
				}
				return `<span class="nw">แสดงการเสนอ</span><span class="nw">ร่างกฎหมาย${formatted_choice}</span><span class="nw">เรียงตาม${$sort_order[0]}</span>`;
			// case 'ผลโหวตของพรรค':
			// 	return `<span class="nw">แสดงผลโหวต</span><span class="nw">ของพรรค${$current_voteparty_choice}</span><span class="nw">เรียงตาม${$sort_order[0]}</span>`;
			default:
				return `<span class="nw">แสดงร่างกฎหมาย</span><span class="nw">ไม่แบ่งกลุ่ม</span><span class="nw">เรียงตาม${$sort_order[0]}</span>`;
		}
	})();

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

<section bind:this={el_section} id="investigate-section">
	<h2 class="title wv-b4 tc">{@html label}</h2>
	<LawVis />
	<FilterBox />
	<Sidebar />
	<HelpOverlay />
</section>

<style lang="scss">
	#investigate-section {
		height: 100vh;

		@supports (height: 100dvh) {
			height: 100dvh;
		}
	}

	.title {
		position: absolute;
		top: 64px;
		left: 24px;
		width: calc(100% - 48px);

		@media (min-width: 768px) {
			left: 308px;
			width: calc(100% - 616px);
		}
	}
</style>
