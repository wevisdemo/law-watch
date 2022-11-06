<script lang="ts">
	import type { RawDataType } from 'data/data-types';
	import { LAW_TYPE_METADATA } from 'data/law-types';
	import { stats } from 'data/stats-cache';

	import { textTypeToPaperType } from 'components/lawvis/utils';
	import Paper from 'components/papers/StaticPaper.svelte';

	import { selected_law } from 'stores/filterOptionStore';
	import { current_selected_paper_id, highlighted_paper_ids } from 'stores/paperHighlightStore';
	import { expand_timeline } from 'stores/timelineOptionStore';

	import { hideTooltip, showTooltip } from 'utils/tooltips';

	export let doc: RawDataType;

	$: color_class = $selected_law.includes(doc.Law_Type) && LAW_TYPE_METADATA[doc.Law_Type].color;

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
		middleware: (e) => e.children[+!!doc.Date_Diff]
	})}
	on:mouseleave={hideTooltip}
>
	<Paper
		category={doc.Law_Type}
		type={textTypeToPaperType(doc.Law_Status)}
		stacked={doc.Law_Merge_Head}
		small
		noMargin
		style="margin-right:0"
	/>
	{#if doc.Date_Diff}
		<div class="line {color_class}" style:--length={(doc.Date_Diff / stats.longest_diff) * 100} />
		<Paper
			category={doc.Law_Type}
			type={textTypeToPaperType(doc.Law_Status)}
			stacked={doc.Law_Merge_Head}
			small
			noMargin
			style="margin-left:-13px"
		/>
	{/if}
</div>

<style lang="scss">
	.longpaper-container {
		display: inline-flex;
		align-items: center;

		cursor: pointer;

		margin-bottom: -4px;

		transition-property: opacity, z-index, padding;
		transition-duration: 0.1s;
		will-change: padding;

		&.expanded {
			padding: 6px 0;
		}

		&.has-lawid {
			opacity: 0.25;
		}

		&.has-lawid.highlight {
			opacity: 1;
		}

		&:hover {
			background: #ffffff1a;
			z-index: 2;
		}
	}

	.line {
		--default-color: #fff;
		background: var(--law-color, var(--default-color));

		width: calc(1% * var(--length) - 13px);
		height: 1px;
	}
</style>
