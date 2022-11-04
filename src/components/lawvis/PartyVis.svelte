<script lang="ts">
	import Paper from 'components/papers/DynamicPaper.svelte';
	import { ALL_PARTY } from 'data/parties';
	import type { RawDataType } from 'data/raw-data-types';
	import { current_party_choice } from 'stores/filterOptionStore';

	export let data: [RawDataType[], RawDataType[]][][][];

	$: num_in_catg = data.map((party) => party.map((e) => e.flat(2).length).filter((e) => e));
</script>

<div class="party-container">
	{#each data as party, party_index}
		<div class="nw text-right">
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
			<div class="number">
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
		grid-template-columns: auto auto;
		align-items: center;
		gap: 24px 48px;
		margin: auto;
		gap: 16px 16px;
	}

	.vis-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 0;
		margin-bottom: 8px;
	}

	.text-right {
		text-align: right;
	}

	.number {
		margin-left: 20px;

		display: flex;
		align-items: baseline;
	}

	.number-back {
		font-size: 0.8em;
		margin-left: 1ch;
	}
</style>
