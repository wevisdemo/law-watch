<script lang="ts">
	import { reverse_sort } from 'stores/timelineOptionStore';

	const reverse = () => {
		$reverse_sort = !$reverse_sort;
	};
</script>

<button class="reverse-timeline" type="button" on:click={reverse}>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25">
		{#if $reverse_sort}
			<path
				fill="#fff"
				d="M5.688 4.781a.781.781 0 00-1.562 0v13.74l-1.79-1.793a.783.783 0 00-1.107 1.106l3.125 3.124.011.01a.776.776 0 001.094-.009l3.125-3.125a.782.782 0 00-1.105-1.106L5.69 18.52V4.781zm6.25 1.282a.781.781 0 110-1.563h1.563a.781.781 0 110 1.563h-1.563zm0 4.687a.781.781 0 110-1.563h4.688a.781.781 0 110 1.563h-4.688zm0 4.688a.781.781 0 110-1.563h7.813a.781.781 0 110 1.563h-7.813zm-.78 3.906a.78.78 0 00.78.781h10.938a.781.781 0 100-1.563H11.938a.781.781 0 00-.78.782z"
			/>
		{:else}
			<path
				fill="#fff"
				d="M5.688 4.781a.781.781 0 00-1.562 0v13.74l-1.79-1.793a.782.782 0 10-1.107 1.106l3.125 3.124.011.01a.776.776 0 001.094-.009l3.125-3.125a.783.783 0 00-1.105-1.106L5.69 18.52V4.781zm5.47.5a.781.781 0 01.78-.781h10.938a.781.781 0 110 1.563H11.938a.781.781 0 01-.78-.782zm.78 3.907a.781.781 0 100 1.562h7.813a.781.781 0 100-1.563h-7.813zm0 4.687a.781.781 0 100 1.563h4.688a.781.781 0 100-1.563h-4.688zm0 4.688a.781.781 0 100 1.562h1.563a.781.781 0 100-1.563h-1.563z"
			/>
		{/if}
	</svg>
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
