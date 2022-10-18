<script lang="ts">
	import { flip } from 'svelte/animate';

	export let sort_order = ['สถานะ', 'หมวดหมู่'];
	// export let sort_order = ['ระยะเวลา', 'สถานะ', 'หมวดหมู่'];

	const setSortOrder = (property: string | number) => () => {
		if (typeof property === 'number') return;
		if (sort_order[0] === property) return;
		// if (sort_order.length === 3) {
		// 	switch (property) {
		// 		case 'หมวดหมู่':
		// 			sort_order = ['หมวดหมู่', 'สถานะ', 'ระยะเวลา'];
		// 			break;
		// 		case 'สถานะ':
		// 			sort_order = ['สถานะ', 'หมวดหมู่', 'ระยะเวลา'];
		// 			break;
		// 		default:
		// 			sort_order = ['ระยะเวลา', 'สถานะ', 'หมวดหมู่'];
		// 			break;
		// 	}
		// } else {
		// }
		sort_order = [property, ...sort_order.filter((e) => e !== property)];
	};

	$: arrow_inbetween = sort_order
		.map((e, i) => [e, i])
		.flat()
		.slice(0, -1);
</script>

<div>
	<div class="header wv-b7">
		<img src="/law-watch/sort.svg" alt="" width="16" height="16" />
		เรียงตาม
	</div>
	<div class="sort-order-container">
		{#each arrow_inbetween as property, i (property)}
			<button
				type="button"
				class="wv-font-anuphan"
				class:active={i === 0}
				class:sort-property={i % 2 === 0}
				class:wv-b6={i % 2 === 0}
				class:arrow={i % 2 === 1}
				tabindex={-(i % 2)}
				on:click={i % 2 === 1 ? () => {} : setSortOrder(property)}
				animate:flip={{ duration: 300 }}
			>
				{#if i % 2 === 0}
					{property}
				{:else}
					<img src="/law-watch/arrow_right.svg" alt="" width="10" height="8" />
				{/if}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-bottom: 8px;
	}

	.sort-order-container {
		display: flex;
		align-items: center;
	}

	.sort-property {
		padding: 0px 8px;

		background: #000;
		border: 1px solid #fff;
		border-radius: 2px;
		color: #fff;

		cursor: pointer;
		user-select: none;

		position: relative;

		white-space: nowrap;

		transition-property: color, background;
		transition-duration: 0.3s;

		&.active {
			background: #fff;
			color: #000;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 1px #000, 0 0 0 2px #fff;
		}
	}

	.arrow {
		background: transparent;
		border: none;
		padding: 0;
		display: flex;
		align-items: center;
	}
</style>
