<script lang="ts">
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import type { GroupChoiceType, PartyChoiceType, SideChoiceType } from 'data/filter-choices';
	import type { LawTypes } from 'data/law-types';
	import { LAW_TYPES } from 'data/law-types';
	import { TUTORIAL_BALLOONS, TUTORIAL_CHOICES } from 'data/tutorial-data';

	import HelpBtn from './HelpBtn.svelte';

	import {
		current_group_choice,
		current_party_choice,
		current_side_choice,
		is_law_status_open,
		is_mobile_drawer_open,
		search_input,
		selected_law,
		show_filterbox,
		// current_voteparty_choice,
		sort_order_when_status,
		sort_order_when_timeline,
		view_timeline
	} from 'stores/filterOptionStore';
	import type { LawStatusHighlightType } from 'stores/highlightManager';
	import {
		group_highlight,
		is_help_show,
		law_status_highlight,
		law_type_highlight,
		mobile_filter_toggle_highlight,
		order_highlight,
		vis_type_highlight
	} from 'stores/highlightManager';

	let is_intro_dismiss = false;
	let current_tutorial: 1 | 2 | 3 | 4 | null = null;

	const dismissIntro = () => {
		is_intro_dismiss = true;
	};

	const closeHelp = () => {
		$is_help_show = false;
		$show_filterbox = true;
		if (!is_intro_dismiss) setTimeout(dismissIntro, 500);
		setTimeout(resetCurrentTutorial, 500);
	};

	const resetCurrentTutorial = () => {
		current_tutorial = null;
		setHighlight();
	};

	type setHighlightOptionType = {
		vis_type_highlight?: boolean;
		group_highlight?: boolean;
		order_highlight?: boolean;
		law_type_highlight?: boolean;
		law_status_highlight?: LawStatusHighlightType;
		mobile_filter_toggle_highlight?: boolean;
		is_mobile_drawer_open?: boolean;
	};
	const setHighlight = (options?: setHighlightOptionType) => {
		$vis_type_highlight = options?.vis_type_highlight ?? false;
		$group_highlight = options?.group_highlight ?? false;
		$order_highlight = options?.order_highlight ?? false;
		$law_type_highlight = options?.law_type_highlight ?? false;
		$law_status_highlight = options?.law_status_highlight ?? false;
		$mobile_filter_toggle_highlight = options?.mobile_filter_toggle_highlight ?? false;
		$is_mobile_drawer_open = options?.is_mobile_drawer_open ?? false;
	};

	type setFilterOptionType = {
		search_input?: string;
		sort_order_when_timeline?: ('????????????????????????' | '???????????????' | '????????????????????????')[];
		sort_order_when_status?: ('???????????????' | '????????????????????????')[];
		view_timeline?: boolean;
		current_group_choice?: GroupChoiceType;
		current_side_choice?: SideChoiceType;
		current_party_choice?: PartyChoiceType;
		// current_voteparty_choice?: VotepartyChoiceType;
		selected_law?: LawTypes[];
		is_law_status_open?: boolean;
	};
	const setFilter = (options?: setFilterOptionType) => {
		$search_input = options?.search_input ?? '';
		$sort_order_when_timeline = options?.sort_order_when_timeline ?? [
			'????????????????????????',
			'???????????????',
			'????????????????????????'
		];
		$sort_order_when_status = options?.sort_order_when_status ?? ['???????????????', '????????????????????????'];
		$view_timeline = options?.view_timeline ?? false;
		$current_group_choice = options?.current_group_choice ?? '????????????????????????????????????';
		$current_side_choice = options?.current_side_choice ?? '????????????????????????????????????';
		$current_party_choice = options?.current_party_choice ?? '????????????????????????????????????';
		// $current_voteparty_choice = options?.current_voteparty_choice ?? '??????????????????????????????????????????????????????';
		$selected_law = options?.selected_law ?? [...LAW_TYPES];
		$is_law_status_open = options?.is_law_status_open ?? true;
	};

	const showTutorial1 = () => {
		current_tutorial = 1;
		$show_filterbox = true;

		setHighlight({
			mobile_filter_toggle_highlight: true,
			vis_type_highlight: true,
			group_highlight: true,
			order_highlight: true,
			law_status_highlight: 'two'
		});

		setFilter();

		tick().then(() => {
			$is_mobile_drawer_open = true;
		});
	};

	const showTutorial2 = () => {
		current_tutorial = 2;
		$show_filterbox = true;

		setHighlight({
			mobile_filter_toggle_highlight: true,
			vis_type_highlight: true,
			group_highlight: true,
			law_status_highlight: 'all'
		});

		setFilter({
			current_group_choice: '???????????????????????????????????????????????????????????????',
			selected_law: []
		});

		tick().then(() => {
			$is_mobile_drawer_open = true;
		});
	};

	const showTutorial3 = () => {
		current_tutorial = 3;
		$show_filterbox = true;

		setHighlight({
			mobile_filter_toggle_highlight: true,
			vis_type_highlight: true,
			group_highlight: true,
			order_highlight: true,
			law_type_highlight: true
		});

		setFilter({
			sort_order_when_status: ['????????????????????????', '???????????????'],
			current_group_choice: '???????????????????????????????????????????????????????????????',
			selected_law: ['????????????????????????', '???????????????', '??????????????????????????????']
		});

		tick().then(() => {
			$is_mobile_drawer_open = true;
		});
	};

	const showTutorial4 = () => {
		current_tutorial = 4;
		$show_filterbox = true;

		setHighlight({
			mobile_filter_toggle_highlight: true,
			vis_type_highlight: true,
			group_highlight: true,
			order_highlight: true,
			law_status_highlight: 'one'
		});

		setFilter({
			view_timeline: true
		});

		tick().then(() => {
			$is_mobile_drawer_open = true;
		});
	};
</script>

{#if !$is_help_show}
	<HelpBtn on:click={() => ($is_help_show = true)} />
{/if}
<div class="help-overlay" class:show={$is_help_show}>
	<div class="help-backdrop" />
	<div
		class="help-content f c"
		class:right={current_tutorial}
		class:shift-tut3={current_tutorial === 3}
	>
		{#if is_intro_dismiss && !current_tutorial}
			{#each TUTORIAL_CHOICES as choice, i}
				<div
					class="balloon f wv-b5"
					class:clickable={!current_tutorial}
					on:click={[showTutorial1, showTutorial2, showTutorial3, showTutorial4][i]}
					on:keypress={[showTutorial1, showTutorial2, showTutorial3, showTutorial4][i]}
					in:fly={{ y: 10, duration: 300, delay: i * 100 }}
				>
					<div>
						{@html choice}
					</div>
					<img
						src="/law-watch/question.svg"
						alt=""
						width="34"
						height="48"
						loading="lazy"
						decoding="async"
					/>
				</div>
			{/each}
		{:else if current_tutorial}
			<div
				class="balloon f wv-b5"
				class:shift-tut1={current_tutorial === 1}
				class:shift-tut2={current_tutorial === 2}
			>
				<div>
					{@html TUTORIAL_CHOICES[current_tutorial - 1]}
				</div>
				<img
					src="/law-watch/question.svg"
					alt=""
					width="34"
					height="48"
					loading="lazy"
					decoding="async"
				/>
			</div>
		{:else}
			<div class="balloon f wv-b4">
				<div>
					<strong>???????????????????????????????????????</strong> ???????????????????????????????????????<br />
					??????????????????????????????????????????????????????????????????????????????????????????????????????<br />
					???????????????????????????????????????????????????
				</div>
			</div>
		{/if}
		<div class="btn-container f" class:right={is_intro_dismiss}>
			<button type="button" class="wv-font-anuphan wv-b4 tut-btn f primary" on:click={closeHelp}>
				????????????????????????
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					><rect
						width="16.388"
						height="1.366"
						x="5.908"
						y="17.346"
						fill="currentColor"
						rx=".683"
						transform="rotate(-45 5.908 17.346)"
					/><rect
						width="16.388"
						height="1.366"
						x="6.873"
						y="5.867"
						fill="currentColor"
						rx=".683"
						transform="rotate(45 6.873 5.867)"
					/></svg
				>
			</button>
			{#if !is_intro_dismiss}
				<button type="button" class="wv-font-anuphan wv-b4 tut-btn f" on:click={dismissIntro}>
					?????????????????????????????????
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						><path
							fill="currentColor"
							fill-rule="evenodd"
							d="M5.807 2.058a.625.625 0 01.885 0l7.5 7.5a.625.625 0 010 .885l-7.5 7.5a.626.626 0 11-.885-.885L12.867 10l-7.06-7.057a.625.625 0 010-.885z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			{/if}
			{#if current_tutorial}
				<button
					type="button"
					class="wv-font-anuphan wv-b4 tut-btn f"
					style="width:80px;padding:8px 12px 8px 8px"
					on:click={resetCurrentTutorial}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 20 21"
						><g clip-path="url(#aa)" filter="url(#b)"
							><path
								fill="#3904E9"
								fill-rule="evenodd"
								d="M14.193 2.558a.625.625 0 00-.885 0l-7.5 7.5a.624.624 0 000 .885l7.5 7.5a.626.626 0 00.885-.885L7.134 10.5l7.059-7.057a.623.623 0 000-.885z"
								clip-rule="evenodd"
							/></g
						><defs
							><clipPath id="aa"
								><path
									fill="#fff"
									d="M0 0h20v20H0z"
									transform="matrix(1 0 0 -1 0 20.5)"
								/></clipPath
							><filter
								id="b"
								width="48.752"
								height="56.252"
								x="-14.376"
								y="-17.626"
								color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse"
								><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix
									in="SourceAlpha"
									result="hardAlpha"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								/><feOffset /><feGaussianBlur stdDeviation="10" /><feComposite
									in2="hardAlpha"
									operator="out"
								/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" /><feBlend
									in2="BackgroundImageFix"
									result="effect1_dropShadow_430_66298"
								/><feBlend
									in="SourceGraphic"
									in2="effect1_dropShadow_430_66298"
									result="shape"
								/></filter
							></defs
						></svg
					>
					????????????
				</button>
			{/if}
		</div>
	</div>
</div>
{#if current_tutorial}
	{#each TUTORIAL_BALLOONS[current_tutorial - 1] as { name, cssClass, style }}
		<div class="help-tooltip f wv-b6 {cssClass ?? ''}" {style} transition:fade={{ duration: 300 }}>
			<span>{@html name}</span>
		</div>
	{/each}
{/if}

<style lang="scss">
	.help-overlay,
	.help-backdrop,
	.help-content {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.help-overlay {
		pointer-events: none;

		> .help-backdrop {
			background: rgba(0, 0, 0, 0.5);

			opacity: 0;
			transition: opacity 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
		}

		> .help-content {
			opacity: 0;
			transform: scale(0);
			transform-origin: calc(100% - 48px) calc(100% - 48px);
			transition-property: opacity, transform;
			transition-duration: 0.5s;
			transition-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
		}

		&.show {
			pointer-events: all;

			> .help-backdrop {
				opacity: 1;
				transition-duration: 1s;
				transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
			}

			> .help-content {
				opacity: 1;
				transform: scale(1);
				transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
			}
		}
	}

	.help-backdrop {
		overflow: hidden;
	}

	.help-content {
		&.right {
			@media (max-width: 767.5px) {
				&.shift-tut3 {
					padding: 16px 24px;
					align-items: flex-end;
					justify-content: flex-end;
				}
			}

			@media (min-width: 768px) {
				padding: 0 80px;
				align-items: flex-end;
				justify-content: center;
			}
		}
	}

	.balloon {
		justify-content: space-between;

		background: #fff;
		border-radius: 16px 16px 0px 16px;
		color: #3904e9;

		padding: 16px;
		margin-bottom: 16px;

		width: 260px;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;

		> img {
			height: 48px;
		}

		&.clickable {
			cursor: pointer;
		}

		@media (max-width: 767.5px) {
			&.shift-tut1 {
				margin-top: -18px;
			}

			&.shift-tut2 {
				margin-top: 42px;
			}
		}

		@media (min-width: 768px) {
			width: 300px;
			height: 104px;
		}
	}

	.btn-container {
		justify-content: center;
		gap: 8px;

		width: 260px;

		&.right {
			justify-content: flex-end;
		}

		@media (min-width: 768px) {
			width: 300px;
		}
	}

	.tut-btn {
		background: #fff;
		border-radius: 24px;
		border: none;
		color: #3904e9;

		justify-content: space-between;

		cursor: pointer;

		padding: 8px 8px 8px 12px;
		width: 126px;

		&.primary {
			background: #3904e9;
			color: #fff;
		}

		@media (min-width: 768px) {
			width: 145px;
		}
	}

	.help-tooltip {
		background: #fff;
		color: #3904e9;
		border-radius: 2px;

		padding: 8px;

		position: absolute;
		top: var(--m-t, unset);
		bottom: var(--m-b, unset);
		left: 178px;
		width: min-content;
		max-width: 140px;
		z-index: 4;

		gap: 6px;

		&::before {
			content: '';
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 41 16'%3E%3Cpath fill='%233904E9' d='M.293 7.293a1 1 0 000 1.414l6.364 6.364a1 1 0 001.414-1.414L2.414 8l5.657-5.657A1 1 0 006.657.93L.293 7.293zM41 7H1v2h40V7z'/%3E%3C/svg%3E");
			background-size: cover;
			width: 16px;
			height: 16px;
			flex: 0 0 16px;

			@media (min-width: 768px) {
				flex: 0 0 40px;
				width: 40px;
			}
		}

		&.mobile-top {
			left: 56px;
		}

		@media (max-width: 767.5px) {
			&.bottom {
				left: 24px;
				flex-direction: column;
				align-items: flex-start;
				max-width: 185px;
				gap: 4px;

				&:before {
					order: 1;
					transform: rotate(-90deg);
				}
			}
		}

		@media (max-height: 800px) and (min-width: 768px) {
			&.special-bottom {
				top: var(--d-st, unset);
				bottom: unset;
			}
		}

		@media (min-width: 768px) {
			gap: 8px;
			left: 324px;
			top: var(--d-t, unset);
			bottom: var(--d-b, unset);
			max-width: unset;

			&.mobile-top {
				display: none;
			}
		}
	}

	@media (min-width: 768px) {
		:global(wbr.no-desktop) {
			display: none;
		}
	}
</style>
