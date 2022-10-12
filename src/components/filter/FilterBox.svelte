<script lang="ts">
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

	import VisType from 'components/VisType.svelte';
	import SortBy from 'components/SortBy.svelte';
	import LawStatus from 'components/LawStatus.svelte';
	import SearchBox from 'components/SearchBox.svelte';
</script>

<div class="filter-box">
	<SearchBox />
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
