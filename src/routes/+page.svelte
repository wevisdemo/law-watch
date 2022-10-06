<script lang="ts">
	import { onMount } from 'svelte';

	import Loader from 'components/Loader.svelte';

	import Intro from 'components/sections/Intro.svelte';
	import Importance from 'components/sections/Importance.svelte';
	import Process from 'components/sections/Process.svelte';
	import Conclusion from 'components/sections/Conclusion.svelte';
	import Ending from 'components/sections/Ending.svelte';

	let state: null | 'transitioning' | 'end' = null;
	onMount(() => {
		setTimeout(() => (state = 'transitioning'), 1000);
		setTimeout(() => (state = 'end'), 2000);
	});
</script>

<svelte:head>
	<title>Law Watch — WeVis</title>
</svelte:head>

{#if state !== 'end'}
	<Loader />
{/if}
{#if state}
	<Intro />
{/if}
<Importance />
<Process />
<Conclusion />
<Ending />
