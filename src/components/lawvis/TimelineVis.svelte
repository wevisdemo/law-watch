<script lang="ts">
	// 2019	2020	2021	2022	2023
	// 0	365	731	1096	1461
	// 0	+365	+366	+365	+365

	import type { RawDataType } from 'data/raw-data-types';
	import { stats } from 'data/stats-cache';

	import LongPaper from 'components/LongPaper.svelte';
	import ReverseSort from './timeline/ReverseSort.svelte';
	import Collapse from './timeline/Collapse.svelte';

	import { reverse_sort } from 'stores/timelineOptionStore';

	export let data: Record<string, RawDataType[]>;
	$: data_keys = Object.keys(data);
</script>

<div class="timeline-vis-container">
	<div class="time-decor" style="--max-days:{stats.longest_diff}">
		<div class="bar" style="--days:0">
			<span>0<br /><small>&nbsp;</small></span>
		</div>
		<div class="bar" style="--days:365">
			<span>365<br /><small>(1 ปี)</small></span>
		</div>
		<div class="bar" style="--days:731">
			<span>731<br /><small>(2 ปี)</small></span>
		</div>
		<div class="bar" style="--days:1096">
			<span>1096<br /><small>(3 ปี)</small></span>
		</div>
		<!-- <div class="bar" style="--days:1219">
			<span>1219<br /><small>(Max)</small></span>
		</div> -->
	</div>
	<div class="timeline-tools">
		<ReverseSort />
		<Collapse />
	</div>
	<div class="data">
		{#each data_keys as type}
			{#if type !== '0'}
				<span class="type">{type}</span>
			{/if}
			{#each $reverse_sort ? [...data[type]].reverse() : data[type] as doc}
				<LongPaper {doc} />
			{/each}
		{/each}
	</div>
</div>

<style lang="scss">
	.timeline-vis-container {
		height: 100%;
		width: 100%;
	}

	.time-decor {
		inset: 0 8.5px 0 6.5px;
		position: absolute;

		@supports (-moz-appearance: none) {
			inset: 0 14.5px 0 6.5px;
		}

		> .bar {
			position: absolute;
			bottom: 0;
			left: calc((var(--days) / var(--max-days) * (100% - 8px)));

			height: 100%;

			display: flex;
			flex-direction: column;
			align-items: center;

			&::before {
				content: '';

				width: 1px;
				top: calc(24px + 8px);
				height: calc(100% - 24px - 12px - 24px - 8px);

				background: #373746;
			}

			> span {
				position: absolute;
				bottom: 0;

				font-size: 0.875rem;
				line-height: 1;
				text-align: center;

				> small {
					font-size: 0.625rem;
				}
			}
		}
	}

	.timeline-tools {
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin-bottom: 8px;
	}

	.data {
		display: flex;
		flex-direction: column;

		height: calc(100% - 24px - 24px - 12px - 8px);
		padding: 8px 8px 8px 0;

		overflow-y: scroll;
		overscroll-behavior: contain;

		&::-webkit-scrollbar {
			width: 2px;
		}

		&::-webkit-scrollbar-thumb {
			background: #ffffff40;
			border-radius: 1px;
		}

		@supports (-moz-appearance: none) {
			scrollbar-color: #ffffff40 #ffffff00;
			scrollbar-width: thin;
		}
	}

	.type {
		font-size: 0.875rem;
		display: block;
		margin: 8px 0;

		&:first-of-type {
			margin-top: 0;
		}
	}
</style>
