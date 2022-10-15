<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_investigate_inview } from 'stores/sectionScrollManager';

	import {
		GROUP_CHOICES,
		PARTY_CHOICES,
		SIDE_CHOICES,
		VOTEPARTY_CHOICES
	} from 'data/filter-choices';
	import type {
		GroupChoiceType,
		PartyChoiceType,
		SideChoiceType,
		VotepartyChoiceType
	} from 'data/filter-choices';

	import FilterBox from 'components/filter/FilterBox.svelte';
	import HelpBtn from 'components/tutorial/HelpBtn.svelte';
	import Sidebar from 'components/Sidebar.svelte';

	let current_group_choice: GroupChoiceType = GROUP_CHOICES[0];
	let current_side_choice: SideChoiceType = SIDE_CHOICES[0];
	let current_party_choice: PartyChoiceType = PARTY_CHOICES[0];
	let current_voteparty_choice: VotepartyChoiceType = VOTEPARTY_CHOICES[0];
	let sort_order = ['สถานะ', 'หมวดหมู่'];

	$: label = (() => {
		let formatted_choice;
		switch (current_group_choice) {
			case 'ฝ่ายที่เสนอร่าง':
				formatted_choice =
					// @ts-expect-error ตรงนี้ fallback แล้วด้วย `??`
					{
						เลือกทุกฝ่าย: 'ทุกฝ่าย',
						คณะรัฐมนตรี: 'ฝ่ายคณะรัฐมนตรี',
						ประชาชน: 'ฝ่ายประชาชน',
						ผสม: 'ฝ่ายผสม'
					}?.[current_side_choice] ?? current_side_choice;
			case 'พรรคที่เสนอร่าง':
				if (!formatted_choice) {
					formatted_choice =
						// @ts-expect-error ตรงนี้ fallback แล้วด้วย `??`
						{
							เลือกทุกพรรค: 'ทุกพรรค'
						}?.[current_party_choice] ?? 'พรรค' + current_party_choice;
				}
				return `แสดงการเสนอร่างกฎหมาย${formatted_choice}เรียงตาม${sort_order[0]}`;
			case 'ผลโหวตของพรรค':
				return `แสดงผลโหวตของพรรค${current_voteparty_choice}เรียงตาม${sort_order[0]}`;
			default:
				return `แสดงร่างกฎหมายไม่แบ่งกลุ่มเรียงตาม${sort_order[0]}`;
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

	// กลุ่ม	กรอง		ผลลัพธ์				label
	// ไม่แบ่งกลุ่ม	-		3w-barchart ประ			แสดงร่างกฎหมายไม่แบ่งกลุ่มเรียงตาม{sort}
	// ฝ่ายเสนอ	ทุกฝ่าย		แบ่งตามฝ่าย ฝ่ายละ 3-barchart ไม่ประ		แสดงการเสนอร่างกฎหมาย{ฝ่าย}เรียงตาม{sort}
	// 	ฝ่ายไหนฝ่ายหนึ่ง	*โชว์ฝ่ายนั้น 3-barchart ไม่ประ
	// พรรค	รวมพรรค		แสดง 1-barchart แยกพรรค ไม่ประ		แสดงการเสนอร่างกฎหมาย{พรรค}เรียงตาม{sort}
	// 	เลือกพรรค 1 อัน	*แสดง 1-barchart ไม่ประ
	// ผลโหวต	เลือกพรรค 1 อัน	แบ่งตามการสนับสนุน ก้อนละ 3w-barchart ไม่ประ	แสดงผลโหวตของ {พรรค} เรียงตาม{sort}
</script>

<section bind:this={el_section} id="investigate-section" class="h100">
	<h2 class="title wv-b4 tc">{label}</h2>
	<FilterBox
		bind:sort_order
		bind:current_group_choice
		bind:current_side_choice
		bind:current_party_choice
		bind:current_voteparty_choice
	/>
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
