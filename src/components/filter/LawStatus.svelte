<script lang="ts">
	import type { LawStatusHighlightType } from 'stores/highlightManager';
	import Paper from 'components/Paper.svelte';

	let clazz = '';
	export { clazz as class };

	export let data: {
		reject: number;
		progress: number;
		pass: number;
	} = { reject: 50, progress: 50, pass: 50 };
	export let always_show_line = false;
	export let is_open = true;

	export let highlight: LawStatusHighlightType = false;
</script>

<details
	class="law-status wv-b6 {clazz}"
	class:highlight={highlight === 'all'}
	bind:open={is_open}
	{...$$restProps}
>
	<summary
		class="header wv-font-semibold"
		class:highlight={typeof highlight === 'string' && ['one', 'two'].includes(highlight)}
	>
		<span>
			สถานะกฎหมาย
			<img class="caret" src="/law-watch/carets/dw.svg" alt="" width="14" height="8" />
		</span>
	</summary>
	<div
		class="law-status-type"
		class:highlight={typeof highlight === 'string' && ['one', 'two'].includes(highlight)}
	>
		<Paper noMargin noHover />
		<span>ตกไป</span>
		<span class="number">{data.reject}</span>
	</div>
	<div class="law-status-type" class:highlight={highlight === 'two'}>
		<Paper type="process" noMargin noHover />
		<span>อยู่ในกระบวนการ</span>
		<span class="number">{data.progress}</span>
	</div>
	<div class="law-status-type">
		<Paper type="pass" noMargin noHover />
		<span>ออกเป็นกฎหมาย</span>
		<span class="number">{data.pass}</span>
	</div>
	<div class="law-status-type merge-type">
		<Paper type="stack" noMargin noHover />
		<span>กฎหมายที่ถูกรวมร่าง</span>
	</div>
	<div class="law-status-type law-line" class:always_show_line>
		<span class="wv-b7">ก่อนเข้าสภา</span>
		<img src="/law-watch/line.png" alt="" />
		<span class="wv-b7">ในสภา</span>
	</div>
</details>

<style lang="scss">
	.law-status {
		min-width: 140px;
	}

	.header {
		cursor: pointer;

		list-style: none;

		&::-webkit-details-marker {
			display: none;
		}

		> span {
			margin-bottom: 8px;
			display: flex;
			align-items: center;
			> .caret {
				margin-left: auto;
				transform: rotate(180deg);
			}
		}
	}

	.law-status[open] .caret {
		transform: rotate(0);
	}

	.law-status-type {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 8px;
		white-space: nowrap;

		> .number {
			margin-left: auto;
		}
	}

	.merge-type {
		margin: 24px 0;
	}

	.law-line {
		justify-content: center;
	}

	@media (max-width: 767.5px) {
		.law-status-type,
		.header > span {
			margin-bottom: 4px;
		}

		.merge-type {
			margin: 0;
		}

		.law-line {
			margin-top: 8px;
			gap: 4px;

			> img {
				height: 16px;
			}
		}

		.law-line:not(.always_show_line) {
			display: none;
		}
	}

	.highlight {
		z-index: 2;
	}
</style>
