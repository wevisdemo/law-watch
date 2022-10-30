<script lang="ts">
	import Paper from './Paper.svelte';
	export let data: [[number, number], [number, number], [0, number]] = [
		[0, 0],
		[0, 0],
		[0, 0]
	];
</script>

<div class="paper-container">
	{#each Array(data[0][0]) as _}
		<Paper noHover />
	{/each}
	<div class="line" />
	{#each Array(data[0][1]) as _}
		<Paper noHover />
	{/each}
	<div class="number wv-b5">{data[0][0] + data[0][1]}</div>
</div>
<div class="paper-container">
	{#each Array(data[1][0]) as _}
		<Paper type="process" noHover />
	{/each}
	<div class="line" />
	{#each Array(data[1][1]) as _}
		<Paper type="process" noHover />
	{/each}
	<div class="number wv-b5">{data[1][0] + data[1][1]}</div>
</div>
<div class="paper-container">
	{#each Array(data[2][1]) as _}
		<Paper type="pass" noHover />
	{/each}
	<div class="number wv-b5">{data[2][1]}</div>
</div>

<style lang="scss">
	.paper-container {
		display: flex;
		margin-bottom: 8px;
		margin-left: -1px;
		padding-right: 10px;
	}

	.number {
		margin-left: 20px;
	}

	.line {
		position: relative;
		pointer-events: none;

		&::after {
			content: '';
			position: absolute;
			background: url(/law-watch/line.png);
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			height: 28px;
			width: 4px;
			top: -2px;
			left: -2px;
			z-index: 2;
		}
	}

	@media (max-width: 767.5px) {
		.number {
			font-size: 12px;
			line-height: 1.3;
		}

		.line::after {
			height: 20px;
			left: -1.5px;
		}
	}
</style>
