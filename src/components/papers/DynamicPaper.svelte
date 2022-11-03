<script lang="ts">
	import { LAW_TYPE_METADATA } from 'data/law-types';
	import { data } from 'data/raw-data';

	import StaticPaper from './StaticPaper.svelte';

	import { selected_law } from 'stores/filterOptionStore';
	import { current_selected_paper_id, highlighted_paper_ids } from 'stores/paperHighlightStore';

	import { textTypeToPaperType } from 'components/lawvis/utils';
	import { hideTooltip, showTooltip } from 'utils/tooltips';

	export let id: number;

	const doc = data.find((e) => e.Law_ID === id);
	const category = doc?.Law_Type ?? '';
	const type = textTypeToPaperType(doc?.Law_Status ?? '');
	const stacked = doc?.Law_Merge_Head;
	const title = doc?.Law_Name ?? '';

	export let noMargin = false;
	export let marked: null | 'left' | 'right' = null;
	export let small = false;

	const setSelectedPaper = () => {
		$current_selected_paper_id = id;
	};

	$: color_class =
		category && $selected_law.includes(category) && LAW_TYPE_METADATA[category]?.color;
</script>

{#if stacked}
	<div
		class="stack-paper-container"
		class:noMargin
		class:has-lawid={id && $highlighted_paper_ids}
		class:highlight={id && $highlighted_paper_ids?.includes(id)}
		class:small
		data-title={title}
		on:click={setSelectedPaper}
		on:mouseenter={showTooltip()}
		on:mouseleave={hideTooltip}
		{...$$restProps}
	>
		<StaticPaper {type} {category} {small} style="position:absolute;top:6px;left:6px" />
		<StaticPaper {type} {category} {marked} {small} style="position:absolute;top:3px;left:3px" />
		<div
			class="paper {type} {color_class}"
			class:small
			class:paper-mark-left={marked === 'left'}
			class:paper-mark-right={marked === 'right'}
			style="position:absolute"
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
		<!-- <StaticPaper {type} {category} {marked} {whiteBg} {small} style="position:absolute" /> -->
	</div>
{:else}
	<div
		class="paper {type} {color_class}"
		class:noMargin
		class:small
		class:paper-mark-left={marked === 'left'}
		class:paper-mark-right={marked === 'right'}
		class:has-lawid={$highlighted_paper_ids}
		class:highlight={$highlighted_paper_ids?.includes(id)}
		data-title={title}
		on:click={setSelectedPaper}
		on:mouseenter={showTooltip()}
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
{/if}

<style lang="scss">
	.stack-paper-container,
	.paper {
		width: 13px;
		height: 16px;
		flex: 0 0 13px;

		cursor: pointer;

		margin-right: -8px;

		&.noMargin {
			margin-right: 0;
		}

		&.has-lawid {
			opacity: 0.25;
		}

		&.has-lawid.highlight {
			opacity: 1;
		}

		transition: transform 0.1s, opacity 0.1s;

		&:hover {
			transform: translateY(-4px);
		}
	}

	.paper {
		--paper-bg: #000;
		--default-color: #fff;

		background: var(--paper-bg);
		border: 1px var(--law-color, var(--default-color)) solid;

		font-size: 0;
		line-height: 0;

		&.whiteBg {
			--paper-bg: #fff;
			--default-color: #000;
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
	}

	.mark-left {
		position: absolute;
		top: -1px;
		width: 7px;
		height: 7px;
		border: 3px var(--law-color, #fff) solid;
		right: 5px;
		border-right: 3px #0000 solid;
		border-top: 3px #0000 solid;

		transform-origin: top right;
		transition: transform 0.1s;
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

		transform-origin: top left;
		transition: transform 0.1s;
	}

	.paper-mark-left {
		clip-path: polygon(5px 0, 12px 7px, 12px 100%, 0 100%, 0 0);

		&:last-of-type,
		&:nth-last-of-type(2) {
			clip-path: polygon(13px 0, 20px 7px, 20px 100%, 0 100%, 0 0);

			> .mark-left {
				right: -1px;
			}
		}
	}

	.paper-mark-left:hover {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0);

		> .mark-left {
			transform: translateX(8px) scale(0);
		}
	}

	.paper-mark-right {
		clip-path: polygon(7px 0, 100% 0, 100% 100%, 0 100%, 0 7px);
	}

	.paper-mark-right:hover {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0);

		> .mark-right {
			transform: scale(0);
		}
	}

	.stack-paper-container {
		> .paper:hover {
			transform: none;
		}

		&:hover > .paper-mark-right {
			clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0);

			> .mark-right {
				transform: scale(0);
			}
		}
	}

	@media (min-width: 768px) {
		.stack-paper-container:not(.small),
		.paper:not(.small) {
			width: 20px;
			height: 24px;
			flex: 0 0 20px;
		}

		.mark-left {
			right: 7px;
		}
	}
</style>
