<script lang="ts">
	import Paper from 'components/papers/StaticPaper.svelte';
	export let data: [[number, number], [number, number], [0, number]] = [
		[0, 0],
		[0, 0],
		[0, 0]
	];
</script>

<div class="paper-container">
	{#each Array(data[0][0]) as _, i}
		<Paper marked={i + 1 === data[0][0] ? 'left' : null} />
	{/each}
	{#each Array(data[0][1]) as _, i}
		<Paper marked={i === 0 ? 'right' : null} />
	{/each}
	<div class="number wv-b5" data-num={data[0][0] + data[0][1]} />
</div>
<div class="paper-container">
	{#each Array(data[1][0]) as _, i}
		<Paper type="process" marked={i + 1 === data[1][0] ? 'left' : null} />
	{/each}
	{#each Array(data[1][1]) as _, i}
		<Paper type="process" marked={i === 0 ? 'right' : null} />
	{/each}
	<div class="number wv-b5" data-num={data[1][0] + data[1][1]} />
</div>
<div class="paper-container">
	{#each Array(data[2][1]) as _}
		<Paper type="pass" />
	{/each}
	<div class="number wv-b5" data-num={data[2][1]} />
</div>

<style lang="scss">
	.paper-container {
		display: flex;
		margin-bottom: 8px;
		margin-left: -1px;
		padding-right: 10px;
		width: 260px;
		flex-wrap: wrap;
		gap: 8px 0;
	}

	.number {
		height: 24px;

		&::after {
			content: attr(data-num);
			position: absolute;
			margin-left: 20px;
		}

		&:only-child::after {
			margin-left: 12px;
		}
	}

	@media (max-width: 767.5px) {
		.paper-container {
			width: 110px;
		}

		.number {
			font-size: 12px;
			line-height: 1.3;
		}
	}
</style>
