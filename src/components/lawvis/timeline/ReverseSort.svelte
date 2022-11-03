<script lang="ts">
	import { reverse_sort } from 'stores/timelineOptionStore';

	const reverse = () => {
		$reverse_sort = !$reverse_sort;
	};
</script>

<button class="reverse-timeline" type="button" on:click={reverse}>
	{#if $reverse_sort}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 18"
			><path
				fill="#fff"
				d="M5.469 1.469a.781.781 0 00-1.563 0v13.739l-1.79-1.792a.783.783 0 00-1.107 1.106l3.125 3.123.011.011a.776.776 0 001.094-.01l3.125-3.124a.782.782 0 00-1.105-1.106l-1.79 1.792V1.468zm6.25.781a.781.781 0 110-1.563h1.562a.781.781 0 110 1.563H11.72zm0 4.688a.781.781 0 110-1.563h4.687a.781.781 0 110 1.563H11.72zm0 4.687a.781.781 0 110-1.563h7.812a.781.781 0 110 1.563H11.72zm-.781 3.906a.781.781 0 00.78.781h10.938a.781.781 0 100-1.562H11.72a.781.781 0 00-.781.781z"
			/></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 18"
			><path
				fill="#fff"
				d="M4.688.781a.781.781 0 10-1.562 0v13.74l-1.79-1.793a.782.782 0 10-1.107 1.106l3.125 3.124.011.01a.776.776 0 001.094-.009l3.125-3.125a.783.783 0 00-1.105-1.106L4.69 14.52V.781zm5.47 1.563a.781.781 0 01.78-.781h10.938a.781.781 0 110 1.562H10.938a.781.781 0 01-.78-.781zm.78 3.906a.781.781 0 100 1.563h7.813a.781.781 0 100-1.563h-7.813zm0 4.688a.781.781 0 100 1.562h4.688a.781.781 0 100-1.563h-4.688zm0 4.687a.781.781 0 100 1.563h1.563a.781.781 0 100-1.563h-1.563z"
			/></svg
		>
	{/if}
</button>

<style lang="scss">
	.reverse-timeline {
		width: 25px;
		height: 25px;

		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
