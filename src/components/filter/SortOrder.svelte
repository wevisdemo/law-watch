<script lang="ts">
	import { flip } from 'svelte/animate';

	import { order_highlight } from 'stores/highlightManager';

	export let sort_order = ['สถานะ', 'หมวดหมู่'];

	const setSortOrder = (property: string | number) => () => {
		if (typeof property === 'number' || sort_order[0] === property) return;
		sort_order = [property, ...sort_order.filter((e) => e !== property)];
	};

	$: arrow_inbetween = sort_order
		.map((e, i) => [e, i])
		.flat()
		.slice(0, -1);

	let clazz = '';
	export { clazz as class };
</script>

<div class={clazz} class:highlight={$order_highlight}>
	<div class="header f wv-b7">
		<img src="/law-watch/sort.svg" alt="" width="16" height="16" loading="lazy" decoding="async" />
		เรียงตาม
	</div>
	<div class="f">
		{#each arrow_inbetween as property, i (property)}
			<button
				type="button"
				class="wv-font-anuphan"
				class:active={i === 0}
				class:sort-property={i % 2 === 0}
				class:wv-b6={i % 2 === 0}
				class:arrow={i % 2 === 1}
				class:f={i % 2 === 1}
				tabindex={-(i % 2)}
				on:click={i % 2 === 1 ? () => {} : setSortOrder(property)}
				animate:flip={{ duration: 300 }}
			>
				{#if i % 2 === 0}
					{property}
				{:else}
					<img
						src="/law-watch/arrow_right.svg"
						alt="ลูกศรขวา"
						width="10"
						height="8"
						loading="lazy"
						decoding="async"
					/>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.header {
		gap: 4px;
		margin-bottom: 8px;
	}

	.sort-property {
		padding: 0px 8px;

		background: #000;
		border: 1px solid #fff;
		border-radius: 2px;
		color: #fff;

		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;

		position: relative;

		white-space: nowrap;

		transition-property: color, background;
		transition-duration: 0.3s;

		&.active {
			background: #fff;
			color: #000;
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 1px #000, 0 0 0 2px #fff;
		}
	}

	.arrow {
		background: transparent;
		border: none;
		padding: 0;
	}

	.highlight {
		z-index: 2;
	}
</style>
