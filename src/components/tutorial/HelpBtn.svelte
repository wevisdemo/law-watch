<script lang="ts">
	import { scale } from 'svelte/transition';
	import { cubicOut, cubicInOut } from 'svelte/easing';
</script>

<button
	type="button"
	class="help-btn f"
	on:click
	in:scale={{ duration: 300, easing: cubicOut }}
	out:scale={{ duration: 300, easing: cubicInOut }}
>
	<img
		src="/law-watch/question.svg"
		alt=""
		width="16"
		height="23"
		loading="lazy"
		decoding="async"
	/>
</button>

<style lang="scss">
	.help-btn {
		justify-content: center;

		background: #ffffff;
		border: none;
		border-radius: 24px;

		width: 48px;
		height: 48px;

		position: absolute;
		padding: 0;
		bottom: 16px;
		right: 16px;

		@media (min-width: 768px) {
			bottom: 48px;
			right: 48px;
		}

		cursor: pointer;
	}
</style>
