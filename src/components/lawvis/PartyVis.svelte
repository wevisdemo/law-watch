<script lang="ts">
	import { fade } from 'svelte/transition';

	import Paper from 'components/papers/DynamicPaper.svelte';
	import type { RawDataType } from 'data/data-types';
	import { ALL_PARTY } from 'data/parties';
	import { current_party_choice } from 'stores/filterOptionStore';

	export let data: [RawDataType[], RawDataType[]][][][];

	$: num_in_catg = data.map((party) => party.map((e) => e.flat(2).length).filter((e) => e));
</script>

<div class="party-container" transition:fade={{ duration: 300 }}>
	{#each data as party, party_index}
		<div class="vis-text nw wv-b5">
			{$current_party_choice === 'เลือกทุกพรรค' ? ALL_PARTY[party_index] : $current_party_choice}
		</div>
		<div class="vis-row">
			{#each party as dom_catg}
				{#each dom_catg as [out_sapa, in_sapa]}
					{#each out_sapa as doc, doc_index}
						<Paper
							{doc}
							marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && doc_index + 1 === out_sapa.length
								? 'left'
								: null}
						/>
					{/each}
					{#each in_sapa as doc, doc_index}
						<Paper
							{doc}
							marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && doc_index === 0 ? 'right' : null}
						/>
					{/each}
				{/each}
			{/each}
			<div class="number wv-b5">
				<span class="wv-font-semibold">{party.flat(3).length} ฉบับ</span>
				{#if num_in_catg[party_index].length > 1}
					<span class="number-back">
						{num_in_catg[party_index].join(' | ')}
					</span>
				{/if}
			</div>
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
		display: flex;
		flex-wrap: wrap;
		gap: 8px 0;
		align-items: center;
	}

	.vis-text {
		@media (min-width: 768px) {
			text-align: right;
		}
	}

	.number {
		margin-left: 20px;

		display: flex;
		align-items: baseline;

		line-height: 1;
	}

	.number-back {
		font-size: 0.8em;
		margin-left: 1ch;
	}
</style>
