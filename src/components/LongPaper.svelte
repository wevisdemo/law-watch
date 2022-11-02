<script lang="ts">
	import { textTypeToPaperType } from 'components/lawvis/utils';
	import Paper from 'components/papers/StaticPaper.svelte';
	import { LAW_TYPE_METADATA } from 'data/law-types';
	import type { RawDataType } from 'data/raw-data-types';
	import { stats } from 'data/stats-cache';

	export let doc: RawDataType;
</script>

<div class="longpaper-container">
	<Paper
		category={doc.Law_Type}
		type={textTypeToPaperType(doc.Law_Status)}
		stacked={doc.Law_Merge_Head}
	/>
	<div
		class="line {LAW_TYPE_METADATA[doc.Law_Type].color}"
		style:--length={((doc.Date_Diff ?? 0) / stats.longest_diff) * 100}
	/>
	<Paper
		category={doc.Law_Type}
		type={textTypeToPaperType(doc.Law_Status)}
		stacked={doc.Law_Merge_Head}
	/>
</div>

<style lang="scss">
	.longpaper-container {
		display: flex;
		align-items: center;

		margin-bottom: -8px;

		transition: transform 0.1s, z-index 0.1s;

		&:hover {
			transform: translateY(-4px);
			z-index: 2;
		}
	}

	.line {
		--default-color: #fff;
		margin-left: 8px;
		background: var(--law-color, var(--default-color));

		width: calc(1% * var(--length));
		height: 1px;
	}
</style>
