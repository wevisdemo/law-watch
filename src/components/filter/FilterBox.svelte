<script lang="ts">
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
	import { LAW_TYPES } from 'data/law-types';
	import type { LawTypes } from 'data/law-types';

	import SearchBox from './SearchBox.svelte';
	import Dropdown from 'components/dropdown/Dropdown.svelte';
	import VisType from './VisType.svelte';
	import SortOrder from './SortOrder.svelte';
	import LawType from './LawType.svelte';
	import LawStatus from './LawStatus.svelte';

	export let selected_law: LawTypes[] = [...LAW_TYPES];

	export let current_group_choice: GroupChoiceType = GROUP_CHOICES[0];
	export let current_side_choice: SideChoiceType = SIDE_CHOICES[0];
	export let current_party_choice: PartyChoiceType = PARTY_CHOICES[0];
	export let current_voteparty_choice: VotepartyChoiceType = VOTEPARTY_CHOICES[0];

	export let sort_order = ['สถานะ', 'หมวดหมู่'];
</script>

<div class="filter-box">
	<SearchBox />
	<Dropdown
		label_image="/law-watch/group.svg"
		choices={GROUP_CHOICES}
		bind:current_choice={current_group_choice}
	/>
	{#if current_group_choice === 'ฝ่ายที่เสนอร่าง'}
		<Dropdown
			label_image="/law-watch/filter.svg"
			label="ตัวกรอง"
			choices={SIDE_CHOICES}
			bind:current_choice={current_side_choice}
		/>
	{/if}
	{#if current_group_choice === 'พรรคที่เสนอร่าง'}
		<Dropdown
			label_image="/law-watch/filter.svg"
			label="ตัวกรอง"
			choices={PARTY_CHOICES}
			bind:current_choice={current_party_choice}
		/>
	{/if}
	{#if current_group_choice === 'ผลโหวตของพรรค'}
		<Dropdown
			label_image="/law-watch/filter.svg"
			label="ตัวกรอง"
			choices={VOTEPARTY_CHOICES}
			bind:current_choice={current_voteparty_choice}
		/>
	{/if}
	<VisType />
	<SortOrder bind:sort_order />
	<LawType {selected_law} />
	<LawStatus class="alone" />
</div>

<style lang="scss">
	.filter-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 14px;

		width: 260px;

		position: absolute;
		left: 5%;
		right: unset;
		top: 10%;
		bottom: 10%;
	}

	:global(.alone) {
		margin-top: auto;
	}
</style>
