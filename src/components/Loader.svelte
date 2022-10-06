<script>
	import Eyes from 'components/eyes/Eyes.svelte';
	import { onMount } from 'svelte';

	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

<section class="c" class:ready style="--h:calc(100vh - 52px)">
	<Eyes animation="close" playOnMount={false} play={ready} margin="0 0 25px" />
	<p class="wv-font-anuphan wv-b4">Loading...</p>
</section>

<style lang="scss">
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
