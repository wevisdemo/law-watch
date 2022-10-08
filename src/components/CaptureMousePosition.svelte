<script lang="ts">
	import { scroll } from 'motion';
	import { mouseX, mouseY, scrollY } from 'stores/mousePositionStore';
	import { onMount } from 'svelte';

	const handleMousemove = (event: MouseEvent) => {
		mouseX.set(event.clientX);
		mouseY.set(event.clientY);
	};

	onMount(() => {
		scroll(({ y }) => scrollY.set(y.current));
	});
</script>

<svelte:body on:mousemove={handleMousemove} />
