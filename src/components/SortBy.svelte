<script lang="ts">
	import { flip } from 'svelte/animate';

	// export let sort_order = ['หมวดหมู่', 'สถานะ'];
	export let sort_order = ['ระยะเวลา', 'สถานะ', 'หมวดหมู่'];

	const setSortOrder = (property: string) => () => {
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
</script>

<div class="header wv-b6 wv-font-semibold">
	<img src="/law-watch/sort.svg" alt="" width="12" height="12" />
	เรียงตาม
</div>
<div class="sort-order-container">
	{#each sort_order as property, i (property)}
		<div
			class="sort-property wv-b6"
			class:active={i === 0}
			on:click={setSortOrder(property)}
			animate:flip={{ duration: 300 }}
		>
			{property}
		</div>
	{/each}
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-bottom: 4px;
	}

	.sort-order-container {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
	}

	.sort-property {
		padding: 0px 8px;

		border: 1px solid #ffffff;
		border-radius: 2px;

		cursor: pointer;
		user-select: none;

		position: relative;

		transition-property: color, background;
		transition-duration: 0.3s;

		&.active {
			background: white;
			color: #000;
		}

		&:not(:last-child) {
			margin-right: 10px;

			&::after {
				content: '';
				display: block;
				background: url(/law-watch/arrow_right.svg);
				top: 50%;
				right: -1px;
				height: 8px;
				width: 10px;
				position: absolute;
				transform: translateX(100%) translateY(-50%);
			}
		}
	}
</style>
