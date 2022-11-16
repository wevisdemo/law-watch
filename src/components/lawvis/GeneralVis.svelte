<script lang="ts">
	import { fade } from 'svelte/transition';

	import Paper from 'components/papers/DynamicPaper.svelte';
	import type { RawDataType } from 'data/generated/data-types';

	export let data: [RawDataType[], RawDataType[]][][];
</script>

<div class="general-vis-container" transition:fade={{ duration: 300 }}>
	{#each data as dom_catg}
		<div class="vis-row">
			{#each dom_catg as [out_sapa, in_sapa]}
				{#each out_sapa as doc, i (doc.Law_ID)}
					<Paper
						{doc}
						marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && i + 1 === out_sapa.length ? 'left' : null}
					/>
				{/each}
				{#each in_sapa as doc, i (doc.Law_ID)}
					<Paper {doc} marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && i === 0 ? 'right' : null} />
				{/each}
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.general-vis-container {
		max-width: 370px;
		margin: auto;
	}

	.vis-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 0;
		margin-bottom: 16px;
	}
</style>
