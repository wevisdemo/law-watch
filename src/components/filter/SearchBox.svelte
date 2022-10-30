<script lang="ts">
	import { data } from 'data/raw-data';

	import { search_input } from 'stores/filterOptionStore';
	import { manual_highlighted_paper_ids } from 'stores/paperHighlightStore';

	let clazz: string = '';
	export { clazz as class };

	$: {
		let trimmed_search = $search_input.trim();
		if (trimmed_search) {
			$manual_highlighted_paper_ids = data
				.filter(
					(d) => d.Law_Name.includes(trimmed_search) || d.Law_Nickname.includes(trimmed_search)
				)
				.map((d) => d.Law_ID);
		} else {
			$manual_highlighted_paper_ids = null;
		}
	}
</script>

<div class="searchbox-container {clazz}" {...$$restProps}>
	<input
		class="search-input wv-font-anuphan wv-b6"
		type="text"
		placeholder="ค้นหาร่างกฎหมาย"
		bind:value={$search_input}
	/>
	<img src="/law-watch/search.svg" alt="" width="14" height="14" />
</div>

<style lang="scss">
	.searchbox-container {
		display: flex;
		align-items: center;
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
</style>
