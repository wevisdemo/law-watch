<script lang="ts">
	import { onMount } from 'svelte';

	import CaptureMousePosition from 'components/CaptureMousePosition.svelte';

	import Loader from 'components/Loader.svelte';
	import Navigator from 'components/Navigator.svelte';

	import Intro from 'components/sections/Intro.svelte';
	import Importance from 'components/sections/Importance.svelte';
	import Process from 'components/sections/Process.svelte';
	import Investigate from 'components/sections/Investigate.svelte';
	import Conclusion from 'components/sections/Conclusion.svelte';
	import Ending from 'components/sections/Ending.svelte';

	let state: null | 'transitioning' | 'end' = null;
	onMount(() => {
		setTimeout(() => (state = 'transitioning'), 1000);
		setTimeout(() => (state = 'end'), 2000);
	});
</script>

<CaptureMousePosition />
{#if state !== 'end'}
	<Loader />
{/if}
{#if state}
	<Intro />
	<Navigator />
{/if}
<Importance />
<Process />
<Investigate />
<Conclusion />
<Ending />
