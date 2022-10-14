<script lang="ts">
	import type { LawTypes } from 'data/law-types';
	import GroupRadio from 'components/GroupRadio.svelte';
	let selected_law: LawTypes[] = [
		'บริหารราชการ',
		'การศึกษา',
		'เศรษฐกิจ',
		'สังคม',
		'สิ่งแวดล้อม',
		'กระบวนการยุติธรรม',
		'รัฐธรรมนูญ'
	];

	import VisType from './VisType.svelte';
	import SortBy from './SortBy.svelte';
	import LawStatus from './LawStatus.svelte';
	import SearchBox from './SearchBox.svelte';
	import Dropdown from 'components/dropdown/Dropdown.svelte';
</script>

<div class="filter-box">
	<SearchBox />
	<Dropdown label_image="/law-watch/group.svg" />
	<VisType />
	<SortBy />
	<GroupRadio {selected_law} />
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
