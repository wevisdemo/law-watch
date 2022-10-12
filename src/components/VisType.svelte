<script lang="ts">
	export let viewTimeline = false;
</script>

<label class="vistype-container wv-font-anuphan wv-b6">
	<span>ภาพรวม</span>
	<input class="switch-input" type="checkbox" bind:checked={viewTimeline} />
	<span class="switch-decor" />
	<span>ดูระยะเวลา</span>
</label>

<style lang="scss">
	.vistype-container {
		display: flex;
		align-items: center;
		gap: 10px;

		user-select: none;
	}

	.switch-input {
		display: none;
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
</style>
