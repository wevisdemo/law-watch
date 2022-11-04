<script lang="ts">
	import Paper from 'components/papers/DynamicPaper.svelte';
	import type { RawDataType } from 'data/data-types';
	import { stats } from 'data/stats-cache';
	import { current_side_choice } from 'stores/filterOptionStore';

	const PROPOSER = ['คณะรัฐมนตรี', 'ประชาชน', 'ฝ่ายรัฐบาล', 'ฝ่ายค้าน', 'ผสม', 'ไม่ทราบฝ่าย'];
	const LAW_COUNT_WO_STACK = stats.all_law_len - stats.merged_law_len;

	export let data: [RawDataType[], RawDataType[]][][][];
</script>

<div class="proposer-container">
	{#each data as proposer, proposer_index}
		<div class="nw text-right">
			{$current_side_choice === 'เลือกทุกฝ่าย' ? PROPOSER[proposer_index] : $current_side_choice}
		</div>
		<div>
			{#each proposer as dom_catg}
				<div class="vis-row">
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
					<div class="number">
						<span class="wv-font-semibold">{dom_catg.flat(2).length} ฉบับ</span>
						<span class="number-back">
							{((dom_catg.flat(2).length / LAW_COUNT_WO_STACK) * 100).toFixed(1)}%
						</span>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.proposer-container {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: 24px 48px;
		margin: auto;
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

		border-left: 1px #fff solid;
		padding-left: 1ch;
	}
</style>
