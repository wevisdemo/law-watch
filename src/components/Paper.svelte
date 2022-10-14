<script lang="ts">
	import { LAW_TYPE_METADATA } from 'data/law-types';
	import type { LawTypes } from 'data/law-types';

	export let type: '' | 'process' | 'pass' | 'stack' = '';
	export let category: LawTypes | '' = '';
	export let noMargin = false;
	export let noHover = false;
</script>

<div
	class="paper {type} {category && LAW_TYPE_METADATA[category].color}"
	class:noMargin
	class:noHover
	{...$$restProps}
>
	{#if type === 'process'}
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 22">
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

		margin-right: -8px;

		@media (max-width: 767.5px) {
			margin-right: -14px;
		}

		transition: transform 0.1s;

		&:not(.noHover):hover {
			transform: translateY(-4px);
		}

		&.process {
			color: var(--law-color, #fff);
		}

		&.pass,
		&.stack {
			border: 1px #000 solid;
			background: var(--law-color, #fff);
		}

		&.stack {
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
		}

		&.noMargin {
			margin-right: 0;
		}
	}
</style>
