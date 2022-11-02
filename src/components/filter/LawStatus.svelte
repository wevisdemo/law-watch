<script lang="ts">
	import Paper from 'components/papers/StaticPaper.svelte';

	import { stats } from 'data/stats-cache';

	import type { LawStatusHighlightType } from 'stores/highlightManager';

	let clazz = '';
	export { clazz as class };

	export let data: {
		reject: number;
		progress: number;
		pass: number;
	} = { reject: stats.total_reject, progress: stats.total_progress, pass: stats.total_pass };
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
		<Paper noMargin />
		<span>ตกไป</span>
		<span class="number">{data.reject}</span>
	</div>
	<div class="law-status-type" class:highlight={highlight === 'two'}>
		<Paper type="process" noMargin />
		<span>อยู่ในกระบวนการ</span>
		<span class="number">{data.progress}</span>
	</div>
	<div class="law-status-type">
		<Paper type="pass" noMargin />
		<span>ออกเป็นกฎหมาย</span>
		<span class="number">{data.pass}</span>
	</div>
	<div class="law-status-type merge-type">
		<Paper type="pass" stacked noMargin />
		<span>กฎหมายที่ถูกรวมร่าง</span>
	</div>
	<div class="law-line" class:always_show_line>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 130 44" width="130" height="44"
			><g clip-path="url(#a)"
				><path fill="#000" d="M0 0h130v44H0z" /><path
					fill="#000"
					stroke="#fff"
					d="M40 33.5h12v24H40v-24zM28 33.5h12v24H28v-24zM16 33.5h12v24H16v-24zM4 33.5h12v24H4v-24zM52 33.5h12v24H52v-24z"
				/><path
					fill="#fff"
					stroke="#fff"
					stroke-width="1.2"
					d="M58.6 38.9v-4.451l4.451 4.451H58.6z"
				/><path fill="#000" d="M58 33l6.5 6.5V33H58z" /><path
					fill="#000"
					stroke="#fff"
					d="M89 33.5H77v24h12v-24zM101 33.5H89v24h12v-24zM113 33.5h-12v24h12v-24zM125 33.5h-12v24h12v-24zM77 33.5H65v24h12v-24z"
				/><path
					fill="#fff"
					stroke="#fff"
					stroke-width="1.2"
					d="M70.4 38.9v-4.451L65.948 38.9H70.4z"
				/><path fill="#000" d="M71 33l-6.5 6.5V33H71zM82 0h32v18H82z" /><path
					fill="#fff"
					d="M84.728 14h1.2v-.84h-1.26V6.644c.708-.156 1.524-.708 1.524-1.884 0-1.104-.756-1.824-1.932-1.824-1.032 0-1.764.54-2.064 1.452l.804.504c.216-.72.6-1.104 1.224-1.104.6 0 .96.36.96.972v.132c0 .744-.552 1.188-1.476 1.224v6.864c0 .6.36 1.02 1.02 1.02zm4.777.144c1.128 0 1.644-.624 1.908-1.272h.048V14h.96V7.16h-.984v4.788c0 .9-.828 1.32-1.668 1.32-1.02 0-1.572-.636-1.572-1.86V7.16h-.984v4.392c0 1.644.9 2.592 2.292 2.592zm10.661-6.564v-.84h-1.104c-.42 0-.696.228-.696.576V7.4c-.396-.264-.924-.384-1.536-.384-1.188 0-2.016.54-2.508 1.332l.636.612c.372-.612.984-1.08 1.848-1.08 1.152 0 1.704.516 1.704 1.728v.36h-1.464c-1.932 0-2.856.684-2.856 2.052 0 1.32.876 1.98 2.256 1.98h.708v-.876h-.588c-.864 0-1.344-.312-1.344-1.008v-.312c0-.6.54-.96 1.62-.96h1.668V14h.984V9.5c0-.66-.168-1.224-.564-1.644V7.58h1.236zm4.101-.564c-1.728 0-2.772.876-2.772 2.436v.588h1.74v.048c-.624.144-1.248.66-1.248 1.788v1.284h-.84V14h.516c.996 0 1.284-.3 1.284-1.476v-.912c0-.84.288-1.512 1.2-1.548v-.72h-1.692c.084-1.02.636-1.464 1.812-1.464 1.188 0 1.872.648 1.872 1.788V14h.984V9.608c0-1.584-.912-2.592-2.856-2.592zM111.743 14h.984V9.104c0-1.332-.804-2.088-2.208-2.088-1.032 0-1.848.444-2.268 1.212l.66.6c.384-.576.852-.948 1.584-.948.828 0 1.248.396 1.248 1.332V14z"
				/><path fill="#000" d="M0 0h58v18H0z" /><path
					fill="#fff"
					d="M3.794 7.016c-1.584 0-2.736.876-2.736 2.436v.588h1.5v.048c-.624.144-1.248.66-1.248 1.788V14h.984v-2.388c0-1.044.42-1.512 1.308-1.548v-.72H2.03c.108-1.032.744-1.464 1.764-1.464 1.14 0 1.788.648 1.788 1.788V14h.984V9.608c0-1.584-.924-2.592-2.772-2.592zm1.7-.816h.935V4.208h-.936V6.2zm5.397 7.944c1.956 0 2.856-1.152 2.856-3.564 0-2.34-.924-3.564-2.892-3.564-1.164 0-1.992.42-2.532 1.212l.66.588c.396-.588.984-.936 1.848-.936 1.2 0 1.884.744 1.884 2.052v1.32c0 1.356-.612 2.028-1.824 2.028-1.248 0-1.776-.588-1.776-2.028v-.36h1.248v-.84h-.96c-.792 0-1.248.396-1.248 1.212v.096c0 1.764.996 2.784 2.736 2.784zm6.76 0c1.129 0 1.645-.624 1.909-1.272h.048V14h.96V7.16h-.984v4.788c0 .9-.828 1.32-1.668 1.32-1.02 0-1.572-.636-1.572-1.86V7.16h-.984v4.392c0 1.644.9 2.592 2.292 2.592zM23.79 14h1.2v-.84h-1.236v-6h-.984v5.82c0 .6.36 1.02 1.02 1.02zm4.691.144c1.512 0 2.412-.864 2.412-2.352V7.16h-.984v4.488c0 1.08-.552 1.632-1.428 1.632-.888 0-1.44-.444-1.44-1.56 0-1.752 1.08-1.728 1.08-3.24v-.144c0-.72-.324-1.176-1.404-1.176h-.756V8h1.2v.588c0 1.296-1.128 1.056-1.128 3.168 0 1.476.912 2.388 2.448 2.388zm.185-7.944h2.796v-.792h-2.004V5.3c0-.684-.252-.912-.924-.912h-.708v.792h.84V6.2zM35.53 14h.983V9.104c0-1.332-.803-2.088-2.208-2.088-1.031 0-1.847.444-2.267 1.212l.66.6c.384-.576.852-.948 1.584-.948.828 0 1.248.396 1.248 1.332V14zm8.66-6.42v-.84h-1.104c-.42 0-.696.228-.696.576V7.4c-.395-.264-.923-.384-1.535-.384-1.189 0-2.017.54-2.509 1.332l.636.612c.373-.612.985-1.08 1.849-1.08 1.151 0 1.703.516 1.703 1.728v.36h-1.463c-1.933 0-2.857.684-2.857 2.052 0 1.32.877 1.98 2.256 1.98h.709v-.876h-.588c-.864 0-1.344-.312-1.344-1.008v-.312c0-.6.54-.96 1.62-.96h1.667V14h.985V9.5c0-.66-.169-1.224-.565-1.644V7.58h1.236zm4.101-.564c-1.728 0-2.772.876-2.772 2.436v.588h1.74v.048c-.624.144-1.248.66-1.248 1.788v1.284h-.84V14h.516c.996 0 1.284-.3 1.284-1.476v-.912c0-.84.288-1.512 1.2-1.548v-.72H46.48c.084-1.02.636-1.464 1.812-1.464 1.188 0 1.872.648 1.872 1.788V14h.984V9.608c0-1.584-.912-2.592-2.856-2.592zM55.769 14h.984V9.104c0-1.332-.804-2.088-2.208-2.088-1.032 0-1.848.444-2.268 1.212l.66.6c.384-.576.852-.948 1.584-.948.828 0 1.248.396 1.248 1.332V14zM2.646 22.646a.5.5 0 000 .708l3.182 3.181a.5.5 0 10.708-.707L3.707 23l2.829-2.828a.5.5 0 10-.708-.707l-3.182 3.181zM55 22.5H3v1h52v-1zM125.354 23.354a.5.5 0 000-.708l-3.182-3.181a.501.501 0 00-.708.707L124.293 23l-2.829 2.828a.5.5 0 00.708.707l3.182-3.181zM71 23.5h54v-1H71v1z"
				/></g
			><defs><clipPath id="a"><path fill="#fff" d="M0 0h130v44H0z" /></clipPath></defs></svg
		>
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
		}

		.law-line:not(.always_show_line) {
			display: none;
		}
	}

	.highlight {
		z-index: 2;
	}
</style>
