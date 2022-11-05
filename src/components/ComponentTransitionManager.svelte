<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let current_component: number;
	export let components_data_arr: { component: ComponentType; props: object }[];
	export let transition_time = 300;

	let displaying_component = 0;
	let destroy_component = false;
	let transition_timeout: NodeJS.Timeout | null = null;

	$: {
		if (current_component !== displaying_component) {
			if (transition_timeout) clearTimeout(transition_timeout);
			destroy_component = true;
			transition_timeout = setTimeout(() => {
				transition_timeout = null;
				displaying_component = current_component;
				destroy_component = false;
			}, transition_time);
		}
	}
</script>

{#each components_data_arr as { component, props }, component_index (component_index)}
	{#if !destroy_component && component_index === displaying_component}
		<svelte:component this={component} {...props} />
	{/if}
{/each}
