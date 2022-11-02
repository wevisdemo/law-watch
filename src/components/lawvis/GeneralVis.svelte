<script lang="ts">
	import Paper from 'components/papers/DynamicPaper.svelte';
	import type { RawDataType } from 'data/raw-data-types';

	export let data: [RawDataType[], RawDataType[]][][];
</script>

<div class="general-vis-container">
	{#each data as dom_catg}
		<div class="vis-row">
			{#each dom_catg as [out_sapa, in_sapa]}
				{#each out_sapa as doc, i (doc.Law_ID)}
					<Paper
						id={doc.Law_ID}
						marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && i + 1 === out_sapa.length ? 'left' : null}
					/>
				{/each}
				{#each in_sapa as doc, i (doc.Law_ID)}
					<Paper
						id={doc.Law_ID}
						marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && i === 0 ? 'right' : null}
					/>
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
		margin-bottom: 8px;
	}
</style>
