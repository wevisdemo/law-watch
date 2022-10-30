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
	export let marked = false;
	export let whiteBg = false;

	export let law_id: number | null = null;
	export let title = '';

	let showTooltip = noHover ? () => {} : _showTooltip;
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
	class:marked
	class:whiteBg
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

		&.marked::after {
			content: '';
			position: absolute;
			width: 4px;
			height: 7px;
			background: var(--law-color, var(--default-color));
			top: 0;
			left: 3px;
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

	@media (max-width: 767.5px) {
		.paper {
			width: 13px;
			height: 16px;

			&.marked::after {
				width: 2px;
				height: 5px;
				left: 1px;
			}

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
