<script lang="ts">
	import { onMount } from 'svelte';
	import { search_input } from 'stores/filterOptionStore';
	import { suggest_list } from 'stores/suggestListStore';

	let el_suggest: HTMLElement;
	onMount(() => {
		window.el_suggest = el_suggest;
	});
</script>

<div bind:this={el_suggest} class="search-suggest">
	{#if $suggest_list.length > 0}
		<ul class="select-list">
			{#each $suggest_list as suggest}
				<li
					class="wv-b7 select-list-option"
					on:click={() => {
						$search_input = suggest;
					}}
				>
					{suggest}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.search-suggest {
		position: absolute;
		width: 260px;
		pointer-events: none;
		z-index: 9;
	}

	.select-list {
		border: 1px solid #fff;
		position: absolute;
		top: 0;
		width: 100%;
		background: #000;
		display: none;
		margin: 0;
		list-style: none;

		max-height: 30vh;
		overflow-y: auto;
		scrollbar-width: thin;
	}

	:global(.search-suggest.show) {
		height: 30vh;
		pointer-events: auto;

		> .select-list {
			display: block;
		}
	}

	.select-list-option {
		height: 40px;
		padding: 8px 16px;

		display: flex;
		align-items: center;

		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		cursor: pointer;

		&:hover,
		&:focus-visible {
			background: #fff;
			color: #000;
			outline: none;
		}
	}
</style>
