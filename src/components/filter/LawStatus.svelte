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
			<img
				class="caret"
				src="/law-watch/carets/dw.svg"
				alt=""
				width="14"
				height="8"
				loading="lazy"
				decoding="async"
			/>
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
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 130 44"
			width="130"
			height="44"
		>
			<g clip-path="url(#a)">
				<path
					fill="#fff"
					fill-rule="evenodd"
					d="M85.732 15.064h-1.2c-.66 0-1.02-.42-1.02-1.02V7.18c.924-.036 1.476-.48 1.476-1.224v-.132c0-.612-.36-.972-.96-.972-.624 0-1.008.384-1.224 1.104L82 5.452C82.3 4.54 83.032 4 84.064 4c1.176 0 1.932.72 1.932 1.824 0 1.176-.816 1.728-1.524 1.884v6.516h1.26v.84zm5.486-1.128c-.264.648-.78 1.272-1.909 1.272-1.391 0-2.291-.948-2.291-2.592V8.224H88v4.248c0 1.224.552 1.86 1.572 1.86.84 0 1.669-.42 1.669-1.32V8.224h.983v6.84h-.96v-1.128h-.047zm8.753-6.132h-1.104c-.42 0-.696.228-.696.576v.084c-.396-.264-.924-.384-1.536-.384-1.188 0-2.016.54-2.508 1.332l.636.612c.372-.612.984-1.08 1.848-1.08 1.152 0 1.704.516 1.704 1.728v.36H96.85c-1.932 0-2.856.684-2.856 2.052 0 1.32.876 1.98 2.256 1.98h.708v-.876h-.588c-.864 0-1.344-.312-1.344-1.008v-.312c0-.6.54-.96 1.62-.96h1.668v3.156h.984v-4.5c0-.66-.168-1.224-.564-1.644v-.276h1.236v-.84zm1.328 2.712c0-1.56 1.044-2.436 2.772-2.436 1.944 0 2.856 1.008 2.856 2.592v4.392h-.984v-4.332c0-1.14-.684-1.788-1.872-1.788-1.176 0-1.728.444-1.812 1.464h1.692v.72c-.912.036-1.2.708-1.2 1.548v.912c0 1.176-.288 1.476-1.284 1.476h-.516v-.84h.84V12.94c0-1.128.624-1.644 1.248-1.788v-.048h-1.74v-.588zm10.249 4.548h.984v-4.896c0-1.332-.804-2.088-2.208-2.088-1.032 0-1.848.444-2.268 1.212l.66.6c.384-.576.852-.948 1.584-.948.828 0 1.248.396 1.248 1.332v4.788zM15 33H3v25h122V33H70.5L64 39.5 57.5 33H15zm50 6.5V57h11V34h-5.5v5.5H65zm-7.5 0H63V57H52V34h5.5v5.5zM77 34v23h11V34H77zm-26 0v23H40V34h11zm-36 0H4v23h11V34zm1 0v23h11V34H16zm12 23V34h11v23H28zm73-23h11v23h-11V34zm12 23V34h11v23h-11zm-13 0V34H89v23h11zM4.435 6.992h.936V5h-.936v1.992zm-1.699.816C1.152 7.808 0 8.684 0 10.244v.588h1.5v.048c-.624.144-1.248.66-1.248 1.788v2.124h.984v-2.388c0-1.044.42-1.512 1.308-1.548v-.72H.972c.108-1.032.744-1.464 1.764-1.464 1.14 0 1.788.648 1.788 1.788v4.332h.984V10.4c0-1.584-.924-2.592-2.772-2.592zm9.952 3.564c0 2.412-.9 3.564-2.856 3.564-1.74 0-2.736-1.02-2.736-2.784v-.096c0-.816.457-1.212 1.248-1.212h.96v.84H8.057v.36c0 1.44.529 2.028 1.777 2.028 1.211 0 1.823-.672 1.823-2.028v-1.32c0-1.308-.684-2.052-1.883-2.052-.864 0-1.453.348-1.848.936l-.66-.588c.54-.792 1.368-1.212 2.532-1.212 1.967 0 2.891 1.224 2.891 3.564zm3.905 3.564c1.128 0 1.644-.624 1.908-1.272h.048v1.128h.96v-6.84h-.984v4.788c0 .9-.828 1.32-1.668 1.32-1.02 0-1.572-.636-1.572-1.86V7.952h-.984v4.392c0 1.644.9 2.592 2.292 2.592zm7.337-.144h-1.2c-.66 0-1.02-.42-1.02-1.02v-5.82h.984v6h1.236v.84zm3.492.144c1.512 0 2.412-.864 2.412-2.352V7.952h-.984v4.488c0 1.08-.552 1.632-1.428 1.632-.888 0-1.44-.444-1.44-1.56 0-.908.29-1.34.57-1.754.26-.386.51-.758.51-1.486v-.144c0-.72-.324-1.176-1.404-1.176h-.756v.84h1.2v.588c0 .57-.218.842-.462 1.148-.312.391-.666.836-.666 2.02 0 1.476.912 2.388 2.448 2.388zm2.98-7.944h-2.795v-1.02h-.84V5.18h.708c.672 0 .924.228.924.912V6.2h2.004v.792zm4.07 7.8h.984V9.896c0-1.332-.804-2.088-2.208-2.088-1.032 0-1.848.444-2.268 1.212l.66.6c.384-.576.852-.948 1.584-.948.828 0 1.248.396 1.248 1.332v4.788zm7.557-7.26h1.104v.84h-1.236v.276c.396.42.564.984.564 1.644v4.5h-.984v-3.156H39.81c-1.08 0-1.62.36-1.62.96v.312c0 .696.48 1.008 1.344 1.008h.588v.876h-.708c-1.38 0-2.256-.66-2.256-1.98 0-1.368.924-2.052 2.856-2.052h1.464v-.36c0-1.212-.552-1.728-1.704-1.728-.864 0-1.476.468-1.848 1.08l-.636-.612c.492-.792 1.32-1.332 2.508-1.332.612 0 1.14.12 1.536.384v-.084c0-.348.276-.576.696-.576zm5.205.276c-1.728 0-2.772.876-2.772 2.436v.588h1.74v.048c-.624.144-1.248.66-1.248 1.788v1.284h-.84v.84h.516c.996 0 1.284-.3 1.284-1.476v-.912c0-.84.288-1.512 1.2-1.548v-.72h-1.692c.084-1.02.636-1.464 1.812-1.464 1.188 0 1.872.648 1.872 1.788v4.332h.984V10.4c0-1.584-.912-2.592-2.856-2.592zm8.46 6.984h-.983v-4.788c0-.936-.42-1.332-1.248-1.332-.732 0-1.2.372-1.584.948l-.66-.6c.42-.768 1.236-1.212 2.268-1.212 1.404 0 2.208.756 2.208 2.088v4.896zM2.647 23.354a.5.5 0 010-.708l3.182-3.182a.5.5 0 01.708.708L4.207 22.5H55a.5.5 0 110 1H4.207l2.329 2.328a.5.5 0 11-.708.707l-3.182-3.181zm122.708 0a.5.5 0 000-.707l-3.182-3.182a.501.501 0 00-.708.707l2.329 2.328H71a.5.5 0 000 1h52.793l-2.329 2.328a.5.5 0 00.708.708l3.182-3.182z"
					clip-rule="evenodd"
				/>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h130v44H0z" />
				</clipPath>
			</defs>
		</svg>
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
