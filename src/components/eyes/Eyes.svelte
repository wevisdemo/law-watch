<script>
	import { onMount } from 'svelte';
	import Eye from './Eye.svelte';

	export let margin = '0 0 64px';

	let play = false;
	onMount(() => {
		play = true;
	});
</script>

<div class="eyes-container" style="margin:{margin}">
	<Eye {play} />
	<Eye {play} />
</div>

<style lang="scss">
	.eyes-container {
		display: flex;
		gap: 24px;
	}
</style>
