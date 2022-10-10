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
		ร่างกฎหมายทั้งหมดที่ถูกเสนอในสมัยรัฐบาลประยุทธ์ จันทร์โอชา 2<br />
		<span class="header-line2">
			ทั้งหมด
			<span class="wv-font-kondolar wv-h4 wv-font-black c-mint">300</span>
			ฉบับ
		</span>
	</h2>

	<div class="chart-body">
		<div class="chart-present-by wv-b4">ถูกเสนอโดย</div>
		<div />
		<div />
		<div />
		<div />
		<div>
			<span class="wv-b4">พรรคการเมือง</span><br />
			<div class="number-aligner">
				<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
				<span class="wv-b5">ฉบับ</span>
			</div>
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
			<span class="wv-b4">คณะรัฐมนตรี</span><br />
			<div class="number-aligner">
				<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
				<span class="wv-b5">ฉบับ</span>
			</div>
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
			<span class="wv-b4">ประชาชน</span><br />
			<div class="number-aligner">
				<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
				<span class="wv-b5">ฉบับ</span>
			</div>
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
			<LawStatus />
		</div>
		<div class="wv-font-kondolar wv-font-black year">
			<div class="year-label wv-font-anuphan wv-b6">ปี พ.ศ.</div>
			62
		</div>
		<div class="wv-font-kondolar wv-font-black year">63</div>
		<div class="wv-font-kondolar wv-font-black year">64</div>
		<div class="wv-font-kondolar wv-font-black year">65</div>
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

	.chart-body {
		display: grid;
		grid-template-columns: auto repeat(4, 1fr);
		grid-template-rows: auto repeat(3, 1fr) auto;
		width: 90%;

		> div {
			border-left: 1px solid #373746;
			padding-bottom: 24px;
			padding-right: 16px;

			&:nth-child(5n + 1) {
				border: none;
				padding-right: 32px;
			}

			&:nth-child(n + 21) {
				padding-bottom: 0;
			}
		}
	}

	.number-aligner {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.year {
		color: #373746;
		line-height: 0.5;
		font-size: min(10vw, 160px);
		display: flex;
		align-items: flex-end;

		&::before {
			content: '';
			display: block;
			margin-left: max(-0.5vw, -8px);
		}
	}

	.year-label {
		position: absolute;
		left: 0;
		top: 75%;
		transform: translateX(-50%) translateX(-12px) rotate(-90deg);
		transform-origin: 50% 100%;

		color: #fff;
		font-weight: 400;
		line-height: 0;
	}
</style>
