<script lang="ts">
	import { vis_type_highlight } from 'stores/highlightManager';

	export let view_timeline = false;

	let clazz = '';
	export { clazz as class };
</script>

<label class="vistype-container f wv-b6 {clazz}" class:highlight={$vis_type_highlight}>
	<span>ภาพรวม</span>
	<input id="vistype-check" class="switch-input" type="checkbox" bind:checked={view_timeline} />
	<span class="switch-decor" />
	<span>ดูระยะเวลา</span>
</label>

<style lang="scss">
	.vistype-container {
		gap: 10px;

		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	.switch-input {
		position: absolute;
		clip: rect(0, 0, 0, 0);
		pointer-events: none;
	}

	.switch-decor {
		background: #777;
		border-radius: 10px;
		width: 25px;
		height: 14px;
		padding: 2px;
		transition: background 0.1s;

		&::before {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			border-radius: 8px;
			background: #fff;
			border: 1px #fff solid;

			transition-property: border, transform;
			transition-duration: 0.1s;
		}
	}

	.switch-input:checked + .switch-decor {
		background: #fff;

		&::before {
			border: 1px #000 solid;
			transform: translateX(11px);
		}
	}

	.switch-input:focus-visible + .switch-decor {
		box-shadow: 0 0 0 1px #000, 0 0 0 2px #fff;
	}

	.highlight {
		z-index: 2;
	}
</style>
