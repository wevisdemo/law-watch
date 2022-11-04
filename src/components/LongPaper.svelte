<script lang="ts">
	import { LAW_TYPE_METADATA } from 'data/law-types';
	import type { RawDataType } from 'data/data-types';
	import { stats } from 'data/stats-cache';

	import { textTypeToPaperType } from 'components/lawvis/utils';
	import Paper from 'components/papers/StaticPaper.svelte';

	import { current_selected_paper_id, highlighted_paper_ids } from 'stores/paperHighlightStore';
	import { expand_timeline } from 'stores/timelineOptionStore';

	import { hideTooltip, showTooltip } from 'utils/tooltips';

	export let doc: RawDataType;

	const setSelectedPaper = () => {
		$current_selected_paper_id = doc.Law_ID;
	};
</script>

<div
	class="longpaper-container"
	class:has-lawid={$highlighted_paper_ids}
	class:highlight={$highlighted_paper_ids?.includes(doc.Law_ID)}
	class:expanded={$expand_timeline}
	data-title={doc.Law_Name}
	on:click={setSelectedPaper}
	on:mouseenter={showTooltip({
		middleware: (e) => e.children[+!!doc.Date_Diff],
		offset: doc.Date_Diff ? 23.5 : 16
	})}
	on:mouseleave={hideTooltip}
>
	<Paper
		category={doc.Law_Type}
		type={textTypeToPaperType(doc.Law_Status)}
		stacked={doc.Law_Merge_Head}
		small
		noMargin
	/>
	{#if doc.Date_Diff}
		<div
			class="line {LAW_TYPE_METADATA[doc.Law_Type].color}"
			style:--length={(doc.Date_Diff / stats.longest_diff) * 100}
		/>
		<Paper
			category={doc.Law_Type}
			type={textTypeToPaperType(doc.Law_Status)}
			stacked={doc.Law_Merge_Head}
			small
			noMargin
		/>
	{/if}
</div>

<style lang="scss">
	.longpaper-container {
		display: inline-flex;
		align-items: center;

		cursor: pointer;

		transition-property: opacity, transform, z-index, margin-bottom;
		transition-duration: 0.1s;

		margin-bottom: -4px;
		will-change: margin-bottom;

		&.expanded {
			margin-bottom: 8px;
		}

		&.has-lawid {
			opacity: 0.25;
		}

		&.has-lawid.highlight {
			opacity: 1;
		}

		&:hover {
			transform: translateY(-4px);
			z-index: 2;
		}
	}

	.line {
		--default-color: #fff;
		background: var(--law-color, var(--default-color));

		width: calc(1% * var(--length));
		height: 1px;
	}
</style>
