<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_stats_inview } from 'stores/sectionScrollManager';

	import LawStatus from 'components/LawStatus.svelte';
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

<section bind:this={el_section} id="stats-section" class="c wv-font-anuphan">
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
		<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0.646283 0.646161C0.692729 0.599598 0.747904 0.562655 0.80865 0.537449C0.869395 0.512242 0.934516 0.499268 1.00028 0.499268C1.06605 0.499268 1.13117 0.512242 1.19192 0.537449C1.25266 0.562655 1.30784 0.599598 1.35428 0.646161L7.35428 6.64616C7.40085 6.69261 7.43779 6.74778 7.463 6.80853C7.4882 6.86927 7.50118 6.93439 7.50118 7.00016C7.50118 7.06593 7.4882 7.13105 7.463 7.19179C7.43779 7.25254 7.40085 7.30772 7.35428 7.35416L1.35428 13.3542C1.2604 13.448 1.13306 13.5008 1.00028 13.5008C0.867508 13.5008 0.74017 13.448 0.646283 13.3542C0.552397 13.2603 0.499651 13.1329 0.499651 13.0002C0.499651 12.8674 0.552397 12.74 0.646283 12.6462L6.29328 7.00016L0.646283 1.35416C0.59972 1.30772 0.562777 1.25254 0.53757 1.1918C0.512364 1.13105 0.49939 1.06593 0.49939 1.00016C0.49939 0.934394 0.512364 0.869273 0.53757 0.808528C0.562777 0.747783 0.59972 0.692607 0.646283 0.646161Z"
				fill="white"
			/>
		</svg>
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
					<div class="year-label wv-font-anuphan wv-b6">ปี พ.ศ.</div>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 175 108">
						<path
							fill="#373746"
							d="M42.37 111.24c23.36 0 40.8-12.96 40.8-34.56v-3.84c0-21.92-13.6-32-36.32-32-4.96 0-12 1.92-15.2 3.68v-4.16c0-10.08 5.12-14.56 12.48-14.56 5.6 0 8.8 1.6 11.52 4.48h20c.64-6.08 1.76-15.36 1.76-23.36C68.45 2.6 55.17.68 43.97.68 17.57.68.45 16.84.45 45.64V71.4c0 26.08 16.96 39.84 41.92 39.84zm0-24.96c-6.88 0-10.72-3.2-10.72-13.12v-5.12c2.88-1.44 6.88-2.56 11.2-2.56 3.04 0 8.96.96 8.96 8.96v1.76c0 6.88-3.84 10.08-9.44 10.08zM173.218 109V78.6h-20.32l-1.44 6.4h-15.84l10.88-8.16c16.48-12.48 28-23.52 28-42.08 0-20.64-14.88-34.08-40.96-34.08-16.32 0-29.76 6.56-37.6 13.76 0 8.32.64 16.64 2.08 23.2h23.84c.8-6.88 4.16-12.16 10.56-12.16s10.08 3.84 10.08 10.72c0 9.12-4.48 17.12-17.6 27.68l-29.76 24V109h78.08z"
							opacity=".75"
						/>
					</svg>
				</div>
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 177 108">
					<path
						fill="#373746"
						d="M42.589 111.24c23.36 0 40.8-12.96 40.8-34.56v-3.84c0-21.92-13.6-32-36.32-32-4.96 0-12 1.92-15.2 3.68v-4.16c0-10.08 5.12-14.56 12.48-14.56 5.6 0 8.8 1.6 11.52 4.48h20c.64-6.08 1.76-15.36 1.76-23.36C68.669 2.6 55.389.68 44.189.68 17.789.68.669 16.84.669 45.64V71.4c0 26.08 16.96 39.84 41.92 39.84zm0-24.96c-6.88 0-10.72-3.2-10.72-13.12v-5.12c2.88-1.44 6.88-2.56 11.2-2.56 3.04 0 8.96.96 8.96 8.96v1.76c0 6.88-3.84 10.08-9.44 10.08zm93.887 24.32c24.48 0 40.48-13.44 40.48-32.96v-4c0-11.84-7.52-19.2-15.84-21.12v-.16c8.16-2.24 13.6-9.76 13.6-19.36v-2.72C174.556 9 156.956.68 137.276.68c-15.04 0-30.72 5.76-39.52 11.2 0 7.04.96 16 2.08 21.92h25.44c.48-5.6 4.8-8.32 9.44-8.32 5.92 0 8.8 3.04 8.8 7.36v2.4c0 6.4-2.4 8.8-7.2 8.8h-12.96v21.44l13.92 1.12c5.92.48 8.32 3.36 8.32 8.48v2.56c0 4-4.16 8.16-10.08 8.16-6.56 0-10.08-2.24-11.36-6.72h-25.6c-.96 6.4-1.76 14.56-1.6 22.24 6.08 3.84 22.88 9.28 39.52 9.28z"
						opacity=".75"
					/>
				</svg>
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 177 108">
					<path
						fill="#373746"
						d="M42.37 111.24c23.36 0 40.8-12.96 40.8-34.56v-3.84c0-21.92-13.6-32-36.32-32-4.96 0-12 1.92-15.2 3.68v-4.16c0-10.08 5.12-14.56 12.48-14.56 5.6 0 8.8 1.6 11.52 4.48h20c.64-6.08 1.76-15.36 1.76-23.36C68.45 2.6 55.17.68 43.97.68 17.57.68.45 16.84.45 45.64V71.4c0 26.08 16.96 39.84 41.92 39.84zm0-24.96c-6.88 0-10.72-3.2-10.72-13.12v-5.12c2.88-1.44 6.88-2.56 11.2-2.56 3.04 0 8.96.96 8.96 8.96v1.76c0 6.88-3.84 10.08-9.44 10.08zM174.818 109V91.72l-7.84-2.08v-6.88h9.76V62.44h-9.76V1.8h-33.44l-41.6 60.8v20.16h43.84v6.88l-9.6 1.92V109h48.64zm-39.04-70.4v23.84h-16.64l16.64-23.84z"
						opacity=".75"
					/>
				</svg>
			</div>
			<div class="wv-font-kondolar wv-font-black year">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 175 108">
					<path
						fill="#373746"
						d="M42.37 111.24c23.36 0 40.8-12.96 40.8-34.56v-3.84c0-21.92-13.6-32-36.32-32-4.96 0-12 1.92-15.2 3.68v-4.16c0-10.08 5.12-14.56 12.48-14.56 5.6 0 8.8 1.6 11.52 4.48h20c.64-6.08 1.76-15.36 1.76-23.36C68.45 2.6 55.17.68 43.97.68 17.57.68.45 16.84.45 45.64V71.4c0 26.08 16.96 39.84 41.92 39.84zm0-24.96c-6.88 0-10.72-3.2-10.72-13.12v-5.12c2.88-1.44 6.88-2.56 11.2-2.56 3.04 0 8.96.96 8.96 8.96v1.76c0 6.88-3.84 10.08-9.44 10.08zm92.288 24.32c24.48 0 39.52-13.44 39.52-32.96v-8c0-18.88-13.44-30.4-37.12-30.4-4.16 0-9.12.8-11.68 1.92l.64-16.16h19.36l2.08 7.04h23.52l1.12-30.24h-74.08l-1.92 52.48 21.12 11.36c4.48-1.6 9.92-2.4 15.52-2.4 7.04 0 10.08 2.88 10.08 9.12v5.28c0 4.16-3.68 8.16-9.6 8.16-6.4 0-8.48-2.56-10.08-6.08h-25.12c-.8 7.36-1.28 14.88-1.44 22.24 7.84 3.36 21.76 8.64 38.08 8.64z"
						opacity=".75"
					/>
				</svg>
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

		svg {
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
