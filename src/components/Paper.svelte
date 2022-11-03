<script lang="ts">
	import type { LawTypes } from 'data/law-types';
	import { LAW_TYPE_METADATA } from 'data/law-types';

	import { selected_law } from 'stores/filterOptionStore';
	import { highlighted_paper_ids, current_selected_paper_id } from 'stores/paperHighlightStore';

	import { hideTooltip as _hideTooltip, showTooltip as _showTooltip } from 'utils/tooltips';

	export let type: '' | 'process' | 'pass' = '';
	export let stacked = false;
	export let category: LawTypes | '' = '';
	export let noMargin = false;
	export let noHover = false;
	export let marked: null | 'left' | 'right' = null;
	export let whiteBg = false;

	export let law_id: number | null = null;
	export let title = '';

	let showTooltip = noHover ? () => {} : _showTooltip();
	let hideTooltip = noHover ? () => {} : _hideTooltip;

	const setSelectedPaper = () => {
		if (law_id) $current_selected_paper_id = law_id;
	};

	$: color_class =
		category && $selected_law.includes(category) && LAW_TYPE_METADATA[category]?.color;
</script>

<div
	class="paper {type} {color_class}"
	class:stacked
	class:noMargin
	class:noHover
	class:whiteBg
	class:paper-mark-left={marked === 'left'}
	class:paper-mark-right={marked === 'right'}
	class:has-lawid={law_id && $highlighted_paper_ids}
	class:highlight={law_id && $highlighted_paper_ids?.includes(law_id)}
	data-title={title}
	on:click={setSelectedPaper}
	on:mouseenter={showTooltip}
	on:mouseleave={hideTooltip}
	{...$$restProps}
>
	{#if type === 'process'}
		<!-- keep svg: css coloring -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 18 22"
			preserveAspectRatio="none"
		>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M0 .041L.072 0h2L0 1.196V.041zm0 7.155V6.041L10.464 0h2L0 7.196zm0 6v-1.155L18 1.65v1.155L0 13.196zm0 6v-1.155L18 7.65v1.155L0 19.196zM5.536 22h-2L18 13.65v1.154L5.536 22zm10.392 0h-2L18 19.65v1.154L15.928 22z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
	{#if marked === 'left'}
		<div class="mark-left" />
	{/if}
	{#if marked === 'right'}
		<div class="mark-right" />
	{/if}
</div>

<style lang="scss">
	.paper {
		--paper-bg: #000;
		--default-color: #fff;
		position: relative;
		z-index: 1;

		width: 20px;
		height: 24px;

		background: var(--paper-bg);
		border: 1px var(--law-color, var(--default-color)) solid;

		font-size: 0;
		line-height: 0;

		margin-right: -8px;

		cursor: pointer;

		transition: transform 0.1s, opacity 0.1s;

		&.noHover {
			cursor: default;
		}

		&:not(.noHover):hover {
			transform: translateY(-4px);
		}

		&.whiteBg {
			--paper-bg: #fff;
			--default-color: #000;
		}

		&.has-lawid {
			opacity: 0.25;
		}

		&.has-lawid.highlight {
			opacity: 1;
		}

		&.process {
			color: var(--law-color, var(--default-color));

			> svg {
				width: 100%;
				height: 100%;
			}
		}

		&.pass {
			border: 1px var(--paper-bg) solid;
			background: var(--law-color, var(--default-color));
		}

		&.stacked {
			top: 6px;
			left: 7px;

			&::before,
			&::after {
				content: '';
				position: absolute;
				z-index: -1;
				width: 20px;
				height: 24px;
				border: 1px var(--paper-bg) solid;
				background: var(--law-color, var(--default-color));
				top: -4px;
				left: -4px;
			}

			&::after {
				top: -7px;
				left: -8px;
			}

			&.process {
				> svg {
					top: -6px;
					left: -7px;
				}

				&::before,
				&::after {
					border: 1px var(--law-color, var(--default-color)) solid;
					background: var(--paper-bg);
				}
			}
		}

		&.noMargin {
			margin-right: 0;
		}
	}

	.mark-left {
		position: absolute;
		top: -1px;
		width: 7px;
		height: 7px;
		border: 3px var(--law-color, #fff) solid;
		right: 7px;
		border-right: 3px #0000 solid;
		border-top: 3px #0000 solid;
	}

	.mark-right {
		position: absolute;
		top: -1px;
		width: 7px;
		height: 7px;
		border: 3px var(--law-color, #fff) solid;
		left: -1px;
		border-left: 3px #0000 solid;
		border-top: 3px #0000 solid;
	}

	.paper-mark-left {
		clip-path: polygon(5px 0, 12px 7px, 12px 100%, 0 100%, 0 0);
	}

	.paper-mark-right {
		clip-path: polygon(7px 0, 100% 0, 100% 100%, 0 100%, 0 7px);
	}

	.paper:last-of-type > .mark-left,
	.paper:nth-last-of-type(2) > .mark-left {
		left: 12px;
	}

	.paper-mark-left:last-of-type,
	.paper-mark-left:nth-last-of-type(2) {
		clip-path: polygon(12px 0, 20px 8px, 20px 100%, 0 100%, 0 0);
	}

	@media (max-width: 767.5px) {
		.paper {
			width: 13px;
			height: 16px;

			&.stack {
				&::before,
				&::after {
					width: 13px;
					height: 16px;
				}
			}
		}
	}
</style>
