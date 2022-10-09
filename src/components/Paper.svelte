<script lang="ts">
	export let type: '' | 'process' | 'pass' | 'stack' = '';
	export let noMargin = false;
</script>

<div class="paper {type}" class:noMargin />

<style lang="scss">
	.paper {
		position: relative;
		z-index: 1;

		width: 20px;
		height: 24px;

		background: #000;
		border: 1px var(--paper-color, #fff) solid;

		margin-right: -8px;

		transition: transform 0.1s;

		&:hover {
			transform: translateY(-4px);
		}

		&.process {
			background: linear-gradient(
				-30deg,
				#000,
				#000 40.37%,
				var(--paper-color, #fff) 40.37%,
				var(--paper-color, #fff) 50%,
				#000 50%,
				#000 90.37%,
				var(--paper-color, #fff) 90.37%,
				var(--paper-color, #fff) 100%
			);
			background-size: 10.39px 6px;
			background-repeat: repeat;
		}

		&.pass,
		&.stack {
			border: 1px #000 solid;
			background: var(--paper-color, #fff);
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
				background: var(--paper-color, #fff);
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
