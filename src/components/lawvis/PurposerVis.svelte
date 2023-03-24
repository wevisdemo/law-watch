<script lang="ts">
	import { fade } from 'svelte/transition';

	import Paper from 'components/papers/DynamicPaper.svelte';
	import type { RawDataType } from 'data/generated/data-types';
	import { stats } from 'data/generated/stats';
	import { current_side_choice } from 'stores/filterOptionStore';

	const PROPOSER = ['คณะรัฐมนตรี', 'ประชาชน', 'ฝ่ายรัฐบาล', 'ฝ่ายค้าน', 'ผสม', 'ไม่ทราบฝ่าย'];

	export let data: [RawDataType[], RawDataType[]][][][];
</script>

<div class="proposer-container" transition:fade={{ duration: 300 }}>
	{#each data as proposer, proposer_index}
		<div class="vis-text wv-b5">
			{$current_side_choice === 'เลือกทุกฝ่าย' ? PROPOSER[proposer_index] : $current_side_choice}
		</div>
		<div style="margin-bottom:-8px">
			{#each proposer as dom_catg}
				<div class="vis-row f">
					{#each dom_catg as [out_sapa, in_sapa]}
						{#each out_sapa as doc, doc_index (($current_side_choice === 'เลือกทุกฝ่าย' ? PROPOSER[proposer_index] : $current_side_choice) + doc.Law_ID + doc_index)}
							<Paper
								{doc}
								marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && doc_index + 1 === out_sapa.length
									? 'left'
									: null}
							/>
						{/each}
						{#each in_sapa as doc, doc_index (($current_side_choice === 'เลือกทุกฝ่าย' ? PROPOSER[proposer_index] : $current_side_choice) + doc.Law_ID + doc_index)}
							<Paper
								{doc}
								marked={doc.Law_Status !== 'ออกเป็นกฎหมาย' && doc_index === 0 ? 'right' : null}
							/>
						{/each}
					{/each}
					<span class="number wv-b5">
						<span class="wv-semibold">{dom_catg.flat(2).length} ฉบับ</span>
						<span class="number-back">
							{((dom_catg.flat(2).length / stats.all_law_len) * 100).toFixed(1)}%
						</span>
					</span>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.proposer-container {
		display: grid;
		grid-template-columns: auto;
		align-items: center;
		gap: 16px;
		margin: auto;

		@media (min-width: 768px) {
			grid-template-columns: auto auto;
			gap: 32px 48px;
		}
	}

	.vis-row {
		flex-wrap: wrap;
		gap: 8px 0;
		margin-bottom: 8px;
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

	.number-back {
		font-size: 0.8em;
		margin-left: 1ch;

		border-left: 1px #fff solid;
		padding-left: 1ch;
	}
</style>
