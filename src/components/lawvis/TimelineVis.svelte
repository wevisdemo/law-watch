<script lang="ts">
	// 2019	2020	2021	2022	2023
	// 0	365	731	1096	1461
	// 0	+365	+366	+365	+365

	import Paper from 'components/papers/DynamicPaper.svelte';
	import type { RawDataType } from 'data/raw-data-types';
	import { textTypeToPaperType } from './utils';
	import LongPaper from 'components/LongPaper.svelte';

	export let data: Record<string, RawDataType[]>;
	$: data_keys = Object.keys(data);
</script>

<div class="timeline-vis-container">
	{#each data_keys as type}
		{#if type !== '0'}
			<p>{type}</p>
		{/if}
		{#each data[type] as doc}
			{#if doc.Date_Diff === null}
				<Paper id={doc.Law_ID} />
			{:else}
				<LongPaper {doc} />
			{/if}
		{/each}
	{/each}
</div>

<style lang="scss">
	.timeline-vis-container {
		display: flex;
		flex-direction: column;
		width: calc(100% - 32px);
	}
</style>
