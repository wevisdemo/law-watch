<script lang="ts">
	import { onMount } from 'svelte';

	import { keywords } from 'data/keywords';
	import { data } from 'data/raw-data';

	import { search_input } from 'stores/filterOptionStore';
	import { manual_highlighted_paper_ids } from 'stores/paperHighlightStore';
	import { DEFAULT_SUGGEST_LIST, suggest_list } from 'stores/suggestListStore';

	import { hideSuggest, showSuggest } from 'utils/suggests';

	let clazz: string = '';
	export { clazz as class };

	$: {
		let trimmed_search = $search_input.trim().toLocaleLowerCase();
		if (trimmed_search) {
			$manual_highlighted_paper_ids = data
				.filter((d) => d.Law_Keyword.includes(trimmed_search))
				.map((d) => d.Law_ID);
			$suggest_list = keywords.filter((k) => k.toLocaleLowerCase().includes(trimmed_search));
		} else {
			$manual_highlighted_paper_ids = null;
			$suggest_list = DEFAULT_SUGGEST_LIST;
		}
	}

	let el_searchbox: HTMLInputElement;
	onMount(() => {
		window.el_searchbox = el_searchbox;
	});
</script>

<div class="searchbox-container f {clazz}" {...$$restProps}>
	<input
		bind:this={el_searchbox}
		class="search-input wv-font-anuphan wv-b6"
		type="text"
		placeholder="ค้นหาร่างกฎหมาย"
		bind:value={$search_input}
		on:focus={showSuggest}
		on:blur={hideSuggest}
	/>
	{#if $search_input === ''}
		<img
			src="/law-watch/search.svg"
			alt=""
			width="14"
			height="14"
			loading="lazy"
			decoding="async"
		/>
	{:else}
		<button
			class="clear-btn"
			type="button"
			on:click={() => {
				$search_input = '';
			}}
		>
			<img
				src="/law-watch/close.svg"
				alt=""
				width="12"
				height="12"
				loading="lazy"
				decoding="async"
			/>
		</button>
	{/if}
</div>

<style lang="scss">
	.searchbox-container {
		border-bottom: 1px #fff solid;
		gap: 8px;
	}

	.search-input {
		border: none;
		background: transparent;
		color: #fff;

		padding: 4px 0;
		width: 100%;

		outline: none;

		&::placeholder {
			color: #fff;
			opacity: 0.5;
		}
	}

	.clear-btn {
		border: none;
		background: transparent;

		padding: 0;
		height: 12px;

		cursor: pointer;
		display: flex;
	}
</style>
