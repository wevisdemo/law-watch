<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_stats_inview } from 'stores/sectionScrollManager';

	import LawStatus from 'components/filter/LawStatus.svelte';
	import PaperChart from 'components/PaperChart.svelte';

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
	<h2 class="wv-font-kondolar wv-h9 tc">
		<span class="nw">ร่างกฎหมายทั้งหมดที่ถูกเสนอในสมัย</span><span class="nw"
			>รัฐบาลประยุทธ์ จันทร์โอชา 2</span
		><br />
		<span class="header-line2">
			ทั้งหมด
			<span class="wv-font-kondolar wv-h4 wv-font-black c-mint">300</span>
			ฉบับ
		</span>
	</h2>

	<LawStatus class="status-mobile" />
	<div class="chart-header-mobile">
		<div class="wv-b7">เสนอโดย</div>
		<img src="/law-watch/carets/rw.svg" alt="" width="8" height="14" />
	</div>

	<div class="chart-container">
		<div class="chart-header">
			<div class="chart-present-by wv-b4">ถูกเสนอโดย</div>
			<div class="chart-presenter-container">
				<div class="chart-presenter-header">
					<span class="wv-b4">พรรคการเมือง</span><br />
					<div class="number-aligner">
						<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
						<span class="wv-b5">ฉบับ</span>
					</div>
				</div>
			</div>
			<div class="chart-presenter-container">
				<div class="chart-presenter-header">
					<div class="number-container">
						<span class="wv-b4">คณะรัฐมนตรี</span><br />
						<div class="number-aligner">
							<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
							<span class="wv-b5">ฉบับ</span>
						</div>
					</div>
				</div>
			</div>
			<div class="chart-presenter-container">
				<div class="chart-presenter-header">
					<span class="wv-b4">ประชาชน</span><br />
					<div class="number-aligner">
						<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
						<span class="wv-b5">ฉบับ</span>
					</div>
				</div>
			</div>
			<div>
				<LawStatus class="status" />
			</div>
		</div>
		<div class="chart-body">
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div>
				<PaperChart data={[[3, 3], [5, 5], 8]} />
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<div class="first-year-wrapper">
					<div class="year-label wv-b6">ปี พ.ศ.</div>
					<img src="/law-watch/stats/62.svg" alt="" />
				</div>
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<img src="/law-watch/stats/63.svg" alt="" />
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<img src="/law-watch/stats/64.svg" alt="" />
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<img src="/law-watch/stats/65.svg" alt="" />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	#stats-section {
		padding-top: 10vh;
	}

	.header-line2 {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
	}

	.chart-container {
		display: flex;
		width: 90%;
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
		height: 120px;
	}

	.chart-presenter-header span {
		white-space: nowrap;
	}

	.chart-body {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(3, min-content) auto;
		width: 90%;

		overflow: auto hidden;

		> div {
			border-left: 1px solid #373746;
			padding-bottom: 24px;
			padding-right: 16px;

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
			max-width: 175px;
			display: block;
		}
	}

	.year-label {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateX(calc(-65% - 6px)) rotate(-90deg);

		color: #fff;
		font-weight: 400;
		line-height: 0;
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

		.chart-header-mobile {
			width: 90%;
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
			height: 112px;
			width: 52px;
		}

		.chart-presenter-header {
			transform: rotate(-90deg) translateY(100%);
			position: absolute;
			bottom: 0;
			transform-origin: bottom left;
		}

		.chart-body > div {
			padding-bottom: 16px;

			&:nth-child(-n + 4) {
				padding-top: 16px;
			}
		}
	}

	.first-year-wrapper {
		width: 100%;
		position: relative;
	}
</style>
