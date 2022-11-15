<!-- wrapper for details summary -->
<script lang="ts">
	import { animate, type AnimationControls } from 'motion';

	export let title: string;

	let el_details: HTMLDetailsElement;
	let el_body: HTMLElement;
	let current_animation: AnimationControls | null = null;
	let was_closing = true;

	const changeDetailState = (state: boolean) => {
		el_details.open = state;
		el_details.ariaExpanded = '' + state;
	};

	const onClick = (event: MouseEvent | KeyboardEvent) => {
		event.preventDefault();
		if (current_animation?.playState === 'running') {
			current_animation.stop();
			if (was_closing) {
				el_body.style.marginBottom = '';
				el_body.style.height = '';
				changeDetailState(false);
			}
		}
		requestAnimationFrame(() => {
			if (el_details.open) {
				const { height } = el_body.getBoundingClientRect();
				current_animation = animate(el_body, { height: [height + 'px', 0], marginBottom: 0 });
				current_animation.finished.then(() => {
					el_body.style.marginBottom = '';
					el_body.style.height = '';
					changeDetailState(false);
				});
				was_closing = true;
			} else {
				changeDetailState(true);
				const { height } = el_body.getBoundingClientRect();
				current_animation = animate(el_body, { height: [0, height + 'px'] });
				was_closing = false;
			}
		});
	};
</script>

<details bind:this={el_details} on:click={onClick} on:keypress={onClick} aria-expanded="false">
	<summary class="wv-font-kondolar wv-h10" tabindex="0">
		<span>{title}<span class="cross" aria-hidden="true" class:expanded={!was_closing} /></span>
	</summary>
	<div bind:this={el_body} class="details-body">
		<slot />
	</div>
</details>

<style lang="scss">
	details {
		width: 240px;
		margin: 8px 0 16px;
		border: 1px solid #fff;

		> summary {
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			user-select: none;
			padding: 16px;

			list-style: none;
			&::-webkit-details-marker {
				display: none;
			}

			> span {
				display: flex;
				justify-content: space-between;
				line-height: 1;
				align-items: center;

				width: 100%;
			}
		}

		> .details-body {
			overflow: hidden;
			margin-bottom: 16px;
		}
	}

	.cross {
		display: block;
		width: 16px;
		height: 16px;

		&::before,
		&::after {
			content: '';
			position: absolute;
			display: block;
			height: 2px;
			width: 100%;
			top: 50%;
			transform: translateY(-50%);

			background: #fff;
			border-radius: 1px;
		}

		&::after {
			width: 2px;
			height: 100%;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			transition: transform 0.3s;
		}

		&.expanded::after {
			width: 1.5px;
			height: 100%;
			top: 0;
			left: 50%;
			transform: translateX(-50%) scale(0);
		}
	}
</style>
