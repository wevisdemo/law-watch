<!-- wrapper for details summary -->
<script lang="ts">
	export let title: string;
</script>

<details>
	<summary class="wv-font-kondolar wv-h10">
		<span>{title}<span class="cross" aria-hidden="true" /></span>
	</summary>
	<div class="details-body">
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

				> .cross {
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
						transition: transform 0.5s;
					}
				}
			}
		}

		&[open] > summary > span > .cross {
			&::after {
				width: 1.5px;
				height: 100%;
				top: 0;
				left: 50%;
				transform: translateX(-50%) scale(0);
			}
		}
	}

	.details-body {
		margin-bottom: 16px;
	}
</style>
