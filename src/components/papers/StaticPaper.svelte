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
	export let small = false;

	$: color_class =
		category && $selected_law.includes(category) && LAW_TYPE_METADATA[category]?.color;
</script>

{#if stacked}
	<div class="stack-paper-container" class:noMargin class:small {...$$restProps}>
		<svelte:self {type} {category} {whiteBg} {small} style="position:absolute;top:6px;left:6px" />
		<svelte:self
			{type}
			{category}
			{marked}
			{whiteBg}
			{small}
			style="position:absolute;top:3px;left:3px"
		/>
		<svelte:self {type} {category} {marked} {whiteBg} {small} style="position:absolute" />
	</div>
{:else}
	<div
		class="paper {type} {color_class}"
		class:noMargin
		class:whiteBg
		class:paper-mark-left={marked === 'left'}
		class:paper-mark-right={marked === 'right'}
		class:small
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
	.stack-paper-container,
	.paper {
		width: 13px;
		height: 16px;
		flex: 0 0 13px;

		margin-right: -8px;

		&.noMargin {
			margin-right: 4px;
		}
	}

	.paper {
		--paper-bg: #000;
		--default-color: #fff;

		background: var(--paper-bg);
		border: 1px var(--law-color, var(--default-color)) solid;

		font-size: 0;
		line-height: 0;

		&.noMargin {
			margin-right: 0;
		}

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
	}

	.mark-left {
		position: absolute;
		top: -1px;
		width: 7px;
		height: 7px;
		border: 3px var(--law-color, #fff) solid;
		right: 5px;
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

	@media (min-width: 768px) {
		.stack-paper-container:not(.small),
		.paper:not(.small) {
			width: 20px;
			height: 24px;
			flex: 0 0 20px;
		}

		.mark-left {
			right: 7px;
		}
	}
</style>
