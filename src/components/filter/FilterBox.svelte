<script lang="ts">
	import { onMount } from 'svelte';

	import {
		GROUP_CHOICES,
		PARTY_DROPDOWN_CHOICES,
		// VOTEPARTY_DROPDOWN_CHOICES
		SIDE_CHOICES
	} from 'data/filter-choices';

	import Dropdown from 'components/dropdown/Dropdown.svelte';
	import LawStatus from './LawStatus.svelte';
	import LawType from './LawType.svelte';
	import SearchBox from './SearchBox.svelte';
	import SortOrder from './SortOrder.svelte';
	import VisType from './VisType.svelte';

	import {
		current_group_choice,
		current_party_choice,
		current_side_choice,
		is_law_status_open,
		is_mobile_drawer_open,
		selected_law,
		show_filterbox,
		// current_voteparty_choice,
		sort_order_when_status,
		sort_order_when_timeline,
		view_timeline
	} from 'stores/filterOptionStore';
	import {
		group_highlight,
		is_help_show,
		law_status_highlight,
		mobile_filter_toggle_highlight
	} from 'stores/highlightManager';
	import { current_section } from 'stores/sectionScrollManager';

	let transition_timeout: NodeJS.Timeout | null = null;
	let enable_transition = false;
	const toggleMobileDrawer = () => {
		if ($current_section !== 2) return;
		if (transition_timeout) clearTimeout(transition_timeout);
		enable_transition = true;

		$is_mobile_drawer_open = !$is_mobile_drawer_open;

		transition_timeout = setTimeout(() => {
			transition_timeout = null;
			enable_transition = false;
		}, 500);
	};

	const collapseStatusOnSmallHeight = () => {
		$is_law_status_open = !window.matchMedia('(max-width: 768px)').matches;
	};

	let mounted = false;
	onMount(() => {
		mounted = true;
		$show_filterbox = window.matchMedia('(max-width: 768px)').matches;
		window.addEventListener('resize', collapseStatusOnSmallHeight);

		return () => window.removeEventListener('resize', collapseStatusOnSmallHeight);
	});

	$: if (mounted) {
		if (!$is_mobile_drawer_open) {
			if (window.matchMedia('(max-width: 768px)').matches) {
				$is_law_status_open = false;
			}
		}
	}

	$: if ($current_section !== 2 && $is_mobile_drawer_open) {
		$is_mobile_drawer_open = false;
	}
</script>

<div
	class="filter-box"
	class:filter-box-open={$is_mobile_drawer_open}
	class:is_law_status_open={$is_law_status_open}
	class:is_help_shown={$is_help_show}
	class:enable_transition
>
	{#if $show_filterbox}
		<div class="search-mobile-aligner f">
			<button
				type="button"
				class="mobile-toggle-drawer f"
				class:highlight={$mobile_filter_toggle_highlight}
				on:click={toggleMobileDrawer}
			>
				<img
					src="/law-watch/setting.svg"
					alt="????????????????????????????????????"
					width="20"
					height="20"
					loading="lazy"
					decoding="async"
				/>
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
		{#if $current_group_choice === '???????????????????????????????????????????????????????????????'}
			<Dropdown
				class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
				label_image="/law-watch/filter.svg"
				label="?????????????????????"
				choices={SIDE_CHOICES}
				highlight={$group_highlight}
				bind:current_choice={$current_side_choice}
			/>
		{/if}
		{#if $current_group_choice === '???????????????????????????????????????????????????????????????'}
			<Dropdown
				class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
				label_image="/law-watch/filter.svg"
				label="?????????????????????"
				choices={PARTY_DROPDOWN_CHOICES}
				highlight={$group_highlight}
				bind:current_choice={$current_party_choice}
			/>
		{/if}
		<!-- {#if $current_group_choice === '???????????????????????????????????????'}
		<Dropdown
			class="drawer-partner {$is_mobile_drawer_open ? 'dw-open' : ''}"
			label_image="/law-watch/filter.svg"
			label="?????????????????????"
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
	{/if}
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
		overscroll-behavior: contain;

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

		&.is_help_shown {
			clip-path: unset !important;
			will-change: unset !important;
		}
	}

	:global(.alone) {
		margin-top: auto;
	}

	.search-mobile-aligner {
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

			overflow-y: hidden;

			clip-path: polygon(
				100% 54px,
				0 54px,
				0 calc(100% - 64px),
				100% calc(100% - 64px),
				100% 100%,
				0 100%,
				0 0,
				100% 0
			);
			will-change: clip-path;

			&.enable_transition {
				transition: clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
			}

			&.is_law_status_open {
				clip-path: polygon(
					100% 54px,
					0 54px,
					0 calc(100% - 192px),
					100% calc(100% - 192px),
					100% 100%,
					0 100%,
					0 0,
					100% 0
				);
			}

			&.filter-box-open {
				clip-path: polygon(
					100% 54px,
					100% 54px,
					100% calc(100% - 192px),
					100% calc(100% - 192px),
					100% 100%,
					0 100%,
					0 0,
					100% 0
				);

				&.enable_transition {
					transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
				}

				:global(.alone) {
					position: relative;
					bottom: 0;
				}
			}
		}

		.drawer-backdrop {
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.8);
			-webkit-backdrop-filter: blur(4px);
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
			width: 160px;

			position: absolute;
			bottom: 18px;
		}
	}

	.highlight {
		z-index: 2;
	}
</style>
