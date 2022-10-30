<script lang="ts">
	import { onMount } from 'svelte';

	import CaptureMousePosition from 'components/CaptureMousePosition.svelte';

	import Loader from 'components/Loader.svelte';
	import Navigator from 'components/Navigator.svelte';

	import Intro from 'components/sections/Intro.svelte';
	import Importance from 'components/sections/Importance.svelte';
	import Process from 'components/sections/Process.svelte';
	import Stats from 'components/sections/Stats.svelte';
	import Investigate from 'components/sections/Investigate.svelte';
	import Conclusion from 'components/sections/Conclusion.svelte';
	import Ending from 'components/sections/Ending.svelte';

	let state: null | 'transitioning' | 'end' = null;
	let el_tooltip: HTMLElement;
	let el_tooltip_arrow: HTMLElement;
	onMount(() => {
		window.el_tooltip = el_tooltip;
		window.el_tooltip_arrow = el_tooltip_arrow;
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
<Stats />
<Investigate />
<Conclusion />
<Ending />
<div bind:this={el_tooltip} class="tooltip">
	<span />
	<div bind:this={el_tooltip_arrow} class="tooltip-arrow" />
</div>
