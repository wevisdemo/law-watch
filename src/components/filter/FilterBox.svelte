<script lang="ts">
	import { onMount } from 'svelte';

	import {
		GROUP_CHOICES,
		SIDE_CHOICES,
		PARTY_DROPDOWN_CHOICES
		// VOTEPARTY_DROPDOWN_CHOICES
	} from 'data/filter-choices';
	import {
		view_timeline,
		current_group_choice,
		current_side_choice,
		current_party_choice,
		// current_voteparty_choice,
		sort_order_when_status,
		sort_order_when_timeline,
		selected_law,
		is_law_status_open,
		is_mobile_drawer_open
	} from 'stores/filterOptionStore';
	import {
		group_highlight,
		law_status_highlight,
		mobile_filter_toggle_highlight
	} from 'stores/highlightManager';

	import SearchBox from './SearchBox.svelte';
	import Dropdown from 'components/dropdown/Dropdown.svelte';
	import VisType from './VisType.svelte';
	import SortOrder from './SortOrder.svelte';
	import LawType from './LawType.svelte';
	import LawStatus from './LawStatus.svelte';

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
		<button
			type="button"
			class="mobile-toggle-drawer"
			class:highlight={$mobile_filter_toggle_highlight}
			on:click={toggleMobileDrawer}
		>
			<img src="/law-watch/setting.svg" alt="แสดงตัวเลือก" width="20" height="20" />
		</button>
		<SearchBox class="search-flex" />
	</div>
	<div class="drawer-backdrop drawer-partner" class:dw-open={$is_mobile_drawer_open} />
	<VisType
		class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
		bind:view_timeline={$view_timeline}
	/>
	<Dropdown
		class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
		label_image="/law-watch/group.svg"
		choices={GROUP_CHOICES}
		highlight={$group_highlight}
		menu_z={5}
		bind:current_choice={$current_group_choice}
	/>
	{#if $current_group_choice === 'ฝ่ายที่เสนอร่างกฎหมาย'}
		<Dropdown
			class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
			label_image="/law-watch/filter.svg"
			label="ตัวกรอง"
			choices={SIDE_CHOICES}
			highlight={$group_highlight}
			bind:current_choice={$current_side_choice}
		/>
	{/if}
	{#if $current_group_choice === 'พรรคที่เสนอร่างกฎหมาย'}
		<Dropdown
			class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
			label_image="/law-watch/filter.svg"
			label="ตัวกรอง"
			choices={PARTY_DROPDOWN_CHOICES}
			highlight={$group_highlight}
			bind:current_choice={$current_party_choice}
		/>
	{/if}
	<!-- {#if $current_group_choice === 'ผลโหวตของพรรค'}
		<Dropdown
			class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
			label_image="/law-watch/filter.svg"
			label="ตัวกรอง"
			choices={VOTEPARTY_DROPDOWN_CHOICES}
			highlight={$group_highlight}
			bind:current_choice={$current_voteparty_choice}
		/>
	{/if} -->
	{#if $view_timeline}
		<SortOrder
			class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
			bind:sort_order={$sort_order_when_timeline}
		/>
	{:else}
		<SortOrder
			class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
			bind:sort_order={$sort_order_when_status}
		/>
	{/if}
	<LawType
		class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
		bind:selected_law={$selected_law}
	/>
	<LawStatus class="alone" bind:is_open={$is_law_status_open} highlight={$law_status_highlight} />
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

	:global(.alone) {
		margin-top: auto;
	}

	.search-mobile-aligner {
		display: flex;
		align-items: center;
		gap: 16px;

		@media (min-width: 768px) {
			margin-bottom: -14px;
		}
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
		z-index: 1;

		@media (min-width: 768px) {
			display: none;
		}
	}

	@media (max-width: 767.5px) {
		.filter-box {
			inset: 0;
			padding: 18px 26px;
			padding-right: 30px;
			width: 100%;

			gap: 8px;
		}

		.drawer-backdrop {
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.8);
			backdrop-filter: blur(4px);
		}

		:global(.drawer-partner) {
			transform: translateX(-100vw);
			transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
		}

		:global(.drawer-partner.dw-open) {
			transform: translateX(0);
			transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
		}

		:global(.alone) {
			width: 200px;
		}
	}

	.highlight {
		z-index: 2;
	}
</style>
