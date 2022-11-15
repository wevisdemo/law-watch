<script>
	import Eyes from 'components/eyes/Eyes.svelte';
	import { onMount } from 'svelte';

	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

<section class="loader-container f c" class:ready>
	<Eyes animation="close" dontPlayOnMount play={ready} margin="0 0 25px" />
	<p class="wv-b4">Loading...</p>
</section>

<style lang="scss">
	.loader-container {
		--h: calc(100vh - 40px);

		@media (min-width: 768px) {
			--h: calc(100vh - 52px);
		}
	}

	section {
		position: fixed;
		inset: 0;
		top: 52px;
		background: #000;

		pointer-events: none;
		z-index: 999;

		transition: opacity 1s;
		&.ready {
			opacity: 0;
			transition-delay: 1s;
		}
	}

	p {
		color: #fff;
	}
</style>
