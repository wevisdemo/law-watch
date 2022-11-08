<script lang="ts">
	import { inView } from 'motion';
	import { onMount } from 'svelte';

	import LawStatus from 'components/filter/LawStatus.svelte';
	import PaperChart from 'components/PaperChart.svelte';

	import { stats } from 'data/stats-cache';

	import { is_stats_inview } from 'stores/sectionScrollManager';

	let el_section: Element;
	onMount(() => {
		inView(
			el_section,
			() => {
				is_stats_inview.set(true);
				return () => is_stats_inview.set(false);
			},
			{
				margin: '0px 0px -50% 0px'
			}
		);
	});
</script>

<section bind:this={el_section} id="stats-section" class="c">
	<h2 class="wv-font-kondolar wv-h9 tc" style="padding:0 16px">
		<span class="nw">ร่างกฎหมายทั้งหมดที่ถูกเสนอ</span><span class="nw">เพื่อพิจารณาในสมัย</span
		><span class="nw">รัฐบาลประยุทธ์ จันทร์โอชา 2</span><br />
		<span class="header-line2">
			ทั้งหมด
			<span class="wv-font-kondolar wv-h4 wv-font-black c-mint">{stats.all_law_len}</span>
			ฉบับ
		</span>
	</h2>

	<LawStatus class="status-mobile" />
	<div class="chart-header-mobile">
		<div class="wv-b7">เสนอโดย</div>
		<img
			src="/law-watch/carets/rw.svg"
			alt=""
			width="8"
			height="14"
			loading="lazy"
			decoding="async"
		/>
	</div>

	<div class="chart-container">
		<div class="chart-header">
			<div class="chart-present-by wv-b4">ถูกเสนอโดย</div>
			<div class="chart-presenter-container party-header">
				<div class="chart-presenter-header">
					<span class="wv-b4">พรรคการเมือง</span><br />
					<div class="number-aligner">
						<span class="wv-font-kondolar wv-h5 wv-font-black">{stats.by_party_len}</span>
						<span class="wv-b5">ฉบับ</span>
					</div>
				</div>
			</div>
			<div class="chart-presenter-container cab-header">
				<div class="chart-presenter-header">
					<div class="number-container">
						<span class="wv-b4">คณะรัฐมนตรี</span><br />
						<div class="number-aligner">
							<span class="wv-font-kondolar wv-h5 wv-font-black">{stats.by_cabinet_len}</span>
							<span class="wv-b5">ฉบับ</span>
						</div>
					</div>
				</div>
			</div>
			<div class="chart-presenter-container people-header">
				<div class="chart-presenter-header">
					<span class="wv-b4">ประชาชน</span><br />
					<div class="number-aligner">
						<span class="wv-font-kondolar wv-h5 wv-font-black">{stats.by_people_len}</span>
						<span class="wv-b5">ฉบับ</span>
					</div>
				</div>
			</div>
			<div>
				<div class="year-label wv-b6">ปี พ.ศ.</div>
				<LawStatus class="status" />
			</div>
		</div>
		<div class="chart-body">
			{#each stats.data as data}
				<div>
					<PaperChart {data} />
				</div>
			{/each}
			<div class="wv-font-kondolar wv-font-black year">
				<img
					src="/law-watch/stats/62.svg"
					alt=""
					width="88"
					height="56"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<img
					src="/law-watch/stats/63.svg"
					alt=""
					width="89"
					height="56"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<img
					src="/law-watch/stats/64.svg"
					alt=""
					width="89"
					height="56"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<img
					src="/law-watch/stats/65.svg"
					alt=""
					width="88"
					height="56"
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
	</div>
	<p class="stats-footnote wv-b7">
		* นับจากปีที่เริ่มยื่นเสนอร่างกฎหมาย<br />
		** มีร่างกฎหมายที่ถูกเสนอตั้งแต่ ปี พ.ศ. 2561 กินระยะเวลานานรวมอยู่ด้วย 3 ฉบับ
	</p>
</section>

<style lang="scss">
	#stats-section {
		padding-top: 64px;
	}

	.header-line2 {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
	}

	.chart-container {
		display: flex;
		width: calc(100% - 96px);
	}

	.chart-header {
		padding-right: 32px;
	}

	.chart-present-by {
		display: block;
		margin-bottom: 8px;
	}

	.chart-presenter-container {
		position: relative;
	}

	.party-header {
		padding: 50px 0;
	}

	.cab-header {
		padding: 40px 0;
	}

	.people-header {
		padding: 24px 0;
	}

	@media (max-width: 767.5px) {
		.party-header {
			padding: 76px 0;
		}

		.cab-header {
			padding: 56px 0;
		}

		.people-header {
			padding: 44px 0;
		}
	}

	.chart-presenter-header span {
		white-space: nowrap;
	}

	.chart-body {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(3, min-content) auto;
		width: 100%;

		overflow: auto hidden;

		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}

		&::-webkit-scrollbar-thumb {
			background: #ffffff40;
			border-radius: 2px;
		}

		&::-webkit-scrollbar-corner {
			background: transparent;
		}

		@supports (-moz-appearance: none) {
			scrollbar-color: #ffffff40 #ffffff00;
			scrollbar-width: thin;
		}

		> div {
			border-left: 1px solid #373746;
			padding: 12px 16px 12px 0;

			&:nth-child(n + 13) {
				padding-bottom: 0;
			}

			&:nth-child(-n + 4) {
				padding-top: 35px;
			}
		}
	}

	.number-aligner {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.year {
		display: flex;
		align-items: flex-end;

		&::before {
			content: '';
			display: block;
			margin-left: -1px;
		}

		img {
			width: 80%;
			height: auto;
			max-width: 175px;
			display: block;
		}
	}

	.year-label {
		position: absolute;
		right: 0;
		bottom: 0;

		transform: translateX(calc(200% - 14px)) rotate(-90deg);
		transform-origin: bottom left;

		color: #fff;
		line-height: 1;
	}

	:global(.status-mobile),
	.chart-header-mobile {
		display: none;
	}

	@media (max-width: 767.5px) {
		:global(.status),
		.chart-present-by {
			display: none;
		}

		:global(.status-mobile) {
			display: block;
		}

		.chart-container {
			width: calc(100% - 32px);
		}

		.chart-header-mobile {
			width: calc(100% - 32px);
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 4px;
		}

		.chart-header {
			padding-right: 8px;
			margin-top: -8px;
		}

		.chart-presenter-container {
			// height: 112px;
			width: 52px;
		}

		.chart-presenter-header {
			transform: translateY(50%) rotate(-90deg) translateY(50%) translateX(-50%);
			position: absolute;
			bottom: 50%;
			transform-origin: center left;
		}

		.chart-body > div {
			padding: 8px 32px 8px 0;

			&:nth-child(-n + 4) {
				padding-top: 16px;
			}
		}
	}

	.stats-footnote {
		margin-top: 16px;
		width: calc(100% - 96px);
	}
</style>
