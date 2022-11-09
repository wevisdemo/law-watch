<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let current_component_index: number;
	export let components_data_arr: { component: ComponentType; props: object }[];
	export let transition_time = 300;

	let displaying_component_index = 0;
	let hide_component = false;
	let transition_timeout: NodeJS.Timeout | null = null;

	$: if (current_component_index !== displaying_component_index) {
		if (transition_timeout) clearTimeout(transition_timeout);
		hide_component = true;
		transition_timeout = setTimeout(() => {
			transition_timeout = null;
			displaying_component_index = current_component_index;
			hide_component = false;
		}, transition_time);
	}
</script>

{#each components_data_arr as { component, props }, component_index (component_index)}
	{#if !hide_component && component_index === displaying_component_index}
		<svelte:component this={component} {...props} />
	{/if}
{/each}
