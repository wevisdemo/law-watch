<script lang="ts">
	import type { LawTypes } from 'data/law-types';
	import { LAW_TYPE_METADATA } from 'data/law-types';

	import { selected_law } from 'stores/filterOptionStore';

	export let type: '' | 'process' | 'pass' = '';
	export let category: LawTypes | '' = '';
	export let stacked = false;
	export let noMargin = false;
	export let marked: null | 'left' | 'right' = null;
	export let whiteBg = false;
	export let width: number | null = null;
	export let height: number | null = null;
	export let mwidth: number | null = null;
	export let mheight: number | null = null;

	$: color_class =
		category && $selected_law.includes(category) && LAW_TYPE_METADATA[category]?.color;
</script>

{#if stacked}
	<div
		class="stack-paper-container"
		class:noMargin
		style:--width={width}
		style:--height={height}
		style:--mwidth={mwidth}
		style:--mheight={mheight}
	>
		<svelte:self
			{type}
			{category}
			{whiteBg}
			{width}
			{height}
			{mwidth}
			{mheight}
			style="position:absolute;top:6px;left:6px"
		/>
		<svelte:self
			{type}
			{category}
			{marked}
			{whiteBg}
			{width}
			{height}
			{mwidth}
			{mheight}
			style="position:absolute;top:3px;left:3px"
		/>
		<svelte:self
			{type}
			{category}
			{marked}
			{whiteBg}
			{width}
			{height}
			{mwidth}
			{mheight}
			style="position:absolute"
		/>
	</div>
{:else}
	<div
		class="paper {type} {color_class}"
		class:noMargin
		class:whiteBg
		class:paper-mark-left={marked === 'left'}
		class:paper-mark-right={marked === 'right'}
		style:--width={width}
		style:--height={height}
		style:--mwidth={mwidth}
		style:--mheight={mheight}
		{...$$restProps}
	>
		{#if type === 'process'}
			<!-- keep svg: css coloring -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 18 22"
				preserveAspectRatio="none"
			>
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M0 .041L.072 0h2L0 1.196V.041zm0 7.155V6.041L10.464 0h2L0 7.196zm0 6v-1.155L18 1.65v1.155L0 13.196zm0 6v-1.155L18 7.65v1.155L0 19.196zM5.536 22h-2L18 13.65v1.154L5.536 22zm10.392 0h-2L18 19.65v1.154L15.928 22z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
		{#if marked === 'left'}
			<div class="mark-left" />
		{/if}
		{#if marked === 'right'}
			<div class="mark-right" />
		{/if}
	</div>
{/if}

<style lang="scss">
	.stack-paper-container {
		z-index: 1;

		width: calc(var(--width, 20) * 1px);
		height: calc(var(--height, 24) * 1px);
		flex: 0 0 calc(var(--width, 20) * 1px);

		margin-right: -8px;

		&.noMargin {
			margin-right: 0;
		}
	}

	.paper {
		--paper-bg: #000;
		--default-color: #fff;
		z-index: 1;

		width: calc(var(--width, 20) * 1px);
		height: calc(var(--height, 24) * 1px);
		flex: 0 0 calc(var(--width, 20) * 1px);

		background: var(--paper-bg);
		border: 1px var(--law-color, var(--default-color)) solid;

		font-size: 0;
		line-height: 0;

		margin-right: -8px;

		&.whiteBg {
			--paper-bg: #fff;
			--default-color: #000;
		}

		&.process {
			color: var(--law-color, var(--default-color));

			> svg {
				width: 100%;
				height: 100%;
			}
		}

		&.pass {
			border: 1px var(--paper-bg) solid;
			background: var(--law-color, var(--default-color));
		}

		&.noMargin {
			margin-right: 0;
		}
	}

	.mark-left {
		position: absolute;
		top: -1px;
		width: 7px;
		height: 7px;
		border: 3px var(--law-color, #fff) solid;
		right: 7px;
		border-right: 3px #000 solid;
		border-top: 3px #000 solid;
	}

	.mark-right {
		position: absolute;
		top: -1px;
		width: 7px;
		height: 7px;
		border: 3px var(--law-color, #fff) solid;
		left: -1px;
		border-left: 3px #000 solid;
		border-top: 3px #000 solid;
	}

	@media (max-width: 767.5px) {
		.stack-paper-container,
		.paper {
			width: calc(var(--mwidth, 13) * 1px);
			height: calc(var(--mheight, 16) * 1px);
			flex: 0 0 calc(var(--mwidth, 13) * 1px);
		}

		.mark-left {
			right: 5px;
		}
	}
</style>
