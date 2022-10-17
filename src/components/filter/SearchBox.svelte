<script lang="ts">
	let clazz: string = '';
	export { clazz as class };
</script>

<div class="searchbox-container {clazz}" {...$$restProps}>
	<input class="search-input wv-font-anuphan wv-b6" type="text" placeholder="ค้นหาร่างกฎหมาย" />
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
