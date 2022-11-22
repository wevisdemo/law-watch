<script lang="ts">
	import { onMount } from 'svelte';
	import type { AnimationType } from './AnimationType';
	import Eye from './Eye.svelte';

	export let margin = '0 0 64px';
	export let animation: AnimationType = null;
	export let dontPlayOnMount = false;
	export let play = false;

	onMount(() => {
		!dontPlayOnMount && (play = true);
	});
</script>

<div class="eyes-container" style="margin:{margin}" aria-hidden="true">
	<Eye {animation} {play} />
	<Eye {animation} {play} />
</div>

<style lang="scss">
	.eyes-container {
		display: flex;
		gap: 24px;
	}
</style>
