<script lang="ts">
	import { fade } from 'svelte/transition';

	import Paper from 'components/papers/DynamicPaper.svelte';
	import type { RawDataType } from 'data/generated/data-types';
	import { ALL_PARTIES } from 'data/generated/all-parties';
	import { current_party_choice } from 'stores/filterOptionStore';

	export let data: [RawDataType[], RawDataType[]][][][];
</script>

<div class="party-container" transition:fade={{ duration: 300 }}>
	{#each data as party, party_index}
		<div class="vis-text wv-b5">
			{$current_party_choice === 'เลือกทุกพรรค' ? ALL_PARTIES[party_index] : $current_party_choice}
		</div>
		<div class="vis-row f">
			{#each party as dom_catg}
				{#each dom_catg as [out_sapa, in_sapa]}
					{#each out_sapa as doc, doc_index (($current_party_choice === 'เลือกทุกพรรค' ? ALL_PARTIES[party_index] : $current_party_choice) + doc.Law_ID + doc_index)}
						<Paper
							{doc}
							marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && doc_index + 1 === out_sapa.length
								? 'left'
								: null}
						/>
					{/each}
					{#each in_sapa as doc, doc_index (($current_party_choice === 'เลือกทุกพรรค' ? ALL_PARTIES[party_index] : $current_party_choice) + doc.Law_ID + doc_index)}
						<Paper
							{doc}
							marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && doc_index === 0 ? 'right' : null}
						/>
					{/each}
				{/each}
			{/each}
			<span class="number wv-b5">
				<span class="wv-semibold">{party.flat(3).length} ฉบับ</span>
			</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.party-container {
		display: grid;
		grid-template-columns: auto;
		align-items: center;
		margin: auto;
		gap: 16px 24px;

		@media (min-width: 768px) {
			grid-template-columns: auto auto;
		}
	}

	.vis-row {
		flex-wrap: wrap;
		gap: 8px 0;
	}

	.vis-text {
		white-space: nowrap;

		@media (min-width: 768px) {
			text-align: right;
		}
	}

	.number {
		display: flex;
		align-items: baseline;

		line-height: 1;
	}
</style>
