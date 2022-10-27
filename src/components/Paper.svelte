<script lang="ts">
	import type { LawTypes } from 'data/law-types';
	import { LAW_TYPE_METADATA } from 'data/law-types';

	import { selected_law } from 'stores/filterOptionStore';

	export let type: '' | 'process' | 'pass' = '';
	export let stacked = false;
	export let category: LawTypes | '' = '';
	export let noMargin = false;
	export let noHover = false;
	export let marked = false;

	export let title = '';

	$: color_class =
		category && $selected_law.includes(category) && LAW_TYPE_METADATA[category]?.color;
</script>

<div
	class="paper {type} {color_class}"
	class:stacked
	class:noMargin
	class:noHover
	class:marked
	{title}
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
</div>

<style lang="scss">
	.paper {
		position: relative;
		z-index: 1;

		width: 20px;
		height: 24px;

		background: #000;
		border: 1px var(--law-color, #fff) solid;

		font-size: 0;
		line-height: 0;

		margin-right: -8px;

		transition: transform 0.1s;

		&:not(.noHover):hover {
			transform: translateY(-4px);
		}

		&.marked::after {
			content: '';
			position: absolute;
			width: 4px;
			height: 7px;
			background: var(--law-color, #fff);
			top: 0;
			left: 3px;
		}

		&.process {
			color: var(--law-color, #fff);

			> svg {
				width: 100%;
				height: 100%;
			}
		}

		&.pass {
			border: 1px #000 solid;
			background: var(--law-color, #fff);
		}

		&.stacked {
			top: 6px;
			left: 7px;

			&::before,
			&::after {
				content: '';
				position: absolute;
				z-index: -1;
				width: 20px;
				height: 24px;
				border: 1px #000 solid;
				background: var(--law-color, #fff);
				top: -4px;
				left: -4px;
			}

			&::after {
				top: -7px;
				left: -8px;
			}

			&.process {
				> svg {
					top: -6px;
					left: -7px;
				}

				&::before,
				&::after {
					border: 1px var(--law-color, #fff) solid;
					background: #000;
				}
			}
		}

		&.noMargin {
			margin-right: 0;
		}
	}

	@media (max-width: 767.5px) {
		.paper {
			width: 13px;
			height: 16px;

			&.marked::after {
				width: 2px;
				height: 5px;
				left: 1px;
			}

			&.stack {
				&::before,
				&::after {
					width: 13px;
					height: 16px;
				}
			}
		}
	}
</style>
