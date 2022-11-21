<script lang="ts">
	import { scroll } from 'motion';
	import { mouse_x, mouse_y, scroll_y } from 'stores/mousePositionStore';
	import { onMount } from 'svelte';

	const handleMousemove = (event: MouseEvent) => {
		mouse_x.set(event.clientX);
		mouse_y.set(event.clientY);
	};

	onMount(() => {
		scroll(({ y }) => scroll_y.set(y.current));
	});
</script>

<svelte:body on:mousemove={handleMousemove} />
