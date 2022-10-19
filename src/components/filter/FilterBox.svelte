<script lang="ts">
	import {
		current_group_choice,
		current_party_choice,
		current_side_choice,
		current_voteparty_choice,
		selected_law,
		view_timeline,
		is_mobile_drawer_open,
		is_law_status_open,
		sort_order_when_status,
		sort_order_when_timeline
	} from 'stores/filterOptionStore';
	import {
		GROUP_CHOICES,
		SIDE_CHOICES,
		PARTY_DROPDOWN_CHOICES,
		VOTEPARTY_DROPDOWN_CHOICES
	} from 'data/filter-choices';

	import SearchBox from './SearchBox.svelte';
	import Dropdown from 'components/dropdown/Dropdown.svelte';
	import VisType from './VisType.svelte';
	import SortOrder from './SortOrder.svelte';
	import LawType from './LawType.svelte';
	import LawStatus from './LawStatus.svelte';
	import { onMount } from 'svelte';

	let sort_order = $sort_order_when_status;
	let recent_run_timeline = false;
	const swapSortOrderToTimeline = () => {
		$sort_order_when_status = sort_order;
		sort_order = $sort_order_when_timeline;
		recent_run_timeline = true;
	};
	const swapSortOrderToStatus = () => {
		$sort_order_when_timeline = sort_order;
		sort_order = $sort_order_when_status;
		recent_run_timeline = false;
	};

	$: if ($view_timeline) {
		!recent_run_timeline && swapSortOrderToTimeline();
	} else {
		recent_run_timeline && swapSortOrderToStatus();
	}

	const toggleMobileDrawer = () => {
		$is_mobile_drawer_open = !$is_mobile_drawer_open;
	};

	const collapseStatusOnSmallHeight = () => {
		$is_law_status_open =
			Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) >= 800;
	};

	onMount(() => {
		window.addEventListener('resize', collapseStatusOnSmallHeight);

		return () => window.removeEventListener('resize', collapseStatusOnSmallHeight);
	});
</script>

<div class="filter-box">
	<div class="search-mobile-aligner">
		<button type="button" class="mobile-toggle-drawer" on:click={toggleMobileDrawer}>
			<img src="/law-watch/setting.svg" alt="แสดงตัวเลือก" width="20" height="20" />
		</button>
		<SearchBox class="search-flex" />
	</div>
	<div class="drawer-container" class:open={$is_mobile_drawer_open}>
		<button type="button" class="close-btn" on:click={toggleMobileDrawer}>
			<img src="/law-watch/close.svg" alt="ปิด" width="16" height="16" />
		</button>
		<VisType bind:view_timeline={$view_timeline} />
		<Dropdown
			label_image="/law-watch/group.svg"
			choices={GROUP_CHOICES}
			bind:current_choice={$current_group_choice}
		/>
		{#if $current_group_choice === 'ฝ่ายที่เสนอร่าง'}
			<Dropdown
				label_image="/law-watch/filter.svg"
				label="ตัวกรอง"
				choices={SIDE_CHOICES}
				bind:current_choice={$current_side_choice}
			/>
		{/if}
		{#if $current_group_choice === 'พรรคที่เสนอร่าง'}
			<Dropdown
				label_image="/law-watch/filter.svg"
				label="ตัวกรอง"
				choices={PARTY_DROPDOWN_CHOICES}
				bind:current_choice={$current_party_choice}
			/>
		{/if}
		{#if $current_group_choice === 'ผลโหวตของพรรค'}
			<Dropdown
				label_image="/law-watch/filter.svg"
				label="ตัวกรอง"
				choices={VOTEPARTY_DROPDOWN_CHOICES}
				bind:current_choice={$current_voteparty_choice}
			/>
		{/if}
		<SortOrder bind:sort_order />
		<LawType selected_law={$selected_law} />
	</div>
	<LawStatus class="alone" bind:is_open={$is_law_status_open} />
</div>

<style lang="scss">
	.filter-box {
		display: flex;
		flex-direction: column;
		gap: 14px;

		width: 270px;

		position: absolute;
		left: 48px;
		right: unset;
		top: 48px;
		bottom: 48px;

		// focus overflow
		margin: -2px;
		padding: 2px;

		// Webkit Scrollbar
		margin-right: -8px;
		padding-right: 6px;

		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 2px;
		}

		&::-webkit-scrollbar-thumb {
			background: #ffffff40;
			border-radius: 1px;
		}

		@supports (-moz-appearance: none) {
			scrollbar-color: #ffffff40 #ffffff00;
			scrollbar-width: thin;
			margin-right: -12px;
			padding-right: 4px;
		}
	}

	.drawer-container {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.close-btn {
		width: 24px;
		height: 24px;
		flex: 0 0 24px;
		padding: 4px;
		margin-left: auto;

		border: none;
		background: transparent;
		cursor: pointer;

		@media (min-width: 768px) {
			display: none;
		}
	}

	:global(.alone) {
		margin-top: auto;
	}

	.search-mobile-aligner {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	:global(.search-flex) {
		width: 100%;
		margin-left: auto;
	}

	.mobile-toggle-drawer {
		border: none;
		background: transparent;
		padding: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		@media (min-width: 768px) {
			display: none;
		}
	}

	@media (max-width: 767.5px) {
		.filter-box {
			inset: 16px 24px;
			width: auto;
		}

		.drawer-container {
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.8);
			padding: 16px 24px;
			backdrop-filter: blur(4px);

			transform: translateX(-100vw);
			transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);

			&.open {
				transform: translateX(0);
				transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
			}
		}

		:global(.alone) {
			width: 200px;
		}
	}
</style>
