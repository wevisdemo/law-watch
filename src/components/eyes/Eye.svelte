<script lang="ts">
	import { onMount } from 'svelte';
	import type { AnimationType } from './AnimationType';

	export let play = false;
	export let animation: AnimationType;

	let eye_el: Element;
	let eye_x = 0;
	let eye_y = 0;
	let eye_w = 0;
	let eye_h = 0;
	let page_y = 0;

	let mx = 0;
	let my = 0;
	let x = '0';
	let y = '0';

	const handleMousemove = (event: MouseEvent) => {
		mx = event.clientX;
		my = event.clientY;
	};

	onMount(() => {
		const { top, left, width, height } = eye_el.getBoundingClientRect();
		eye_x = left;
		eye_y = top;
		eye_w = width;
		eye_h = height;
	});

	$: {
		// shift origin
		const x0 = eye_x + eye_w / 2;
		const y0 = eye_y + eye_h / 2 - page_y;
		const mxs = mx - x0;
		const mys = my - y0;

		const dist = Math.hypot(mxs, mys);

		const ex = dist < 25 ? mxs : (25 * mxs) / dist;
		const ey = dist < 25 ? mys : (25 * mys) / dist;

		x = ex + 'px';
		y = ey + 'px';
	}
</script>

<svelte:body on:mousemove={handleMousemove} />
<svelte:window bind:scrollY={page_y} />

<div
	class="eyeball"
	bind:this={eye_el}
	class:pre-awake={animation === 'awake'}
	class:awake={animation === 'awake' && play}
	class:close={animation === 'close' && play}
>
	<div class="pupil" style:--x={x} style:--y={y} />
</div>

<style lang="scss">
	@keyframes eye-close {
		0% {
			clip-path: ellipse(50% 50% at 50% 50%);
		}

		to {
			clip-path: ellipse(50% 0% at 50% 50%);
		}
	}

	@keyframes eye-blink {
		0%,
		25%,
		55%,
		85% {
			// Closed
			clip-path: ellipse(50% 0% at 50% 50%);
		}
		20%,
		40%,
		50%,
		70%,
		80%,
		to {
			// Open
			clip-path: ellipse(50% 50% at 50% 50%);
		}
	}

	@keyframes pupil-move {
		0%,
		20% {
			transform: translate(25px, 25px) translate(0, 0);
		}
		40%,
		50% {
			transform: translate(25px, 25px) translate(20.86px, 13.76px);
		}
		70%,
		80% {
			transform: translate(25px, 25px) translate(-21.8px, -12.23px);
		}
		to {
			transform: translate(25px, 25px) translate(var(--x), var(--y));
		}
	}

	.eyeball {
		width: 100px;
		height: 100px;

		background: #fff;
		box-shadow: inset 0px 0px 24px rgba(0, 0, 0, 0.5);
		border-radius: 50%;

		> .pupil {
			width: 50px;
			height: 50px;

			background: #000;
			border-radius: 50%;

			transform: translate(25px, 25px) translate(var(--x), var(--y));
		}

		&.pre-awake {
			clip-path: ellipse(50% 0% at 50% 50%);
		}

		&.awake {
			animation: eye-blink 3s forwards;

			> .pupil {
				animation: pupil-move 3s;
			}
		}

		&.close {
			animation: eye-close 1s forwards;
		}
	}
</style>
