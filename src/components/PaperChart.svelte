<script lang="ts">
	import Paper from './Paper.svelte';
	export let data: [[number, number], [number, number], number] = [[0, 0], [0, 0], 0];
</script>

<div class="paper-container">
	{#each Array(data[0][0]) as _}
		<Paper />
	{/each}
	<div class="line" />
	{#each Array(data[0][1]) as _}
		<Paper />
	{/each}
	<div class="number">{data[0][0] + data[0][1]}</div>
</div>
<div class="paper-container">
	{#each Array(data[1][0]) as _}
		<Paper type="process" />
	{/each}
	<div class="line" />
	{#each Array(data[1][1]) as _}
		<Paper type="process" />
	{/each}
	<div class="number">{data[1][0] + data[1][1]}</div>
</div>
<div class="paper-container">
	{#each Array(data[2]) as _}
		<Paper type="pass" />
	{/each}
	<div class="number">{data[2]}</div>
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
			height: 28px;
			width: 4px;
			top: -2px;
			left: -2px;
			z-index: 2;
		}
	}
</style>
