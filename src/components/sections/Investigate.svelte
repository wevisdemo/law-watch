<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_section2_inview } from 'stores/sectionScrollManager';

	let el_section: Element;
	onMount(() => {
		inView(
			el_section,
			() => {
				is_section2_inview.set(true);
				return () => is_section2_inview.set(false);
			},
			{
				margin: '0px 0px -50% 0px'
			}
		);
	});
</script>

<section bind:this={el_section} id="investigate-section" class="h100 c wv-font-anuphan">
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
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<span class="wv-b4">คณะรัฐมนตรี</span><br />
			<div class="number-aligner">
				<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
				<span class="wv-b5">ฉบับ</span>
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<span class="wv-b4">ประชาชน</span><br />
			<div class="number-aligner">
				<span class="wv-font-kondolar wv-h5 wv-font-black">100</span>
				<span class="wv-b5">ฉบับ</span>
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<div class="paper-container">
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
				<div class="line" />
				<div class="paper" />
				<div class="paper" />
				<div class="paper" />
			</div>
			<div class="paper-container">
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="line" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
				<div class="paper process" />
			</div>
			<div class="paper-container">
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
				<div class="paper pass" />
			</div>
		</div>
		<div>
			<span class="wv-font-semibold wv-b6">สถานะกฎหมาย</span>
			<div class="law-status">
				<div class="paper" />
				<span>ตกไป</span>
				<span class="number">50</span>
			</div>
			<div class="law-status">
				<div class="paper process" />
				<span>อยู่ในกระบวนการ</span>
				<span class="number">50</span>
			</div>
			<div class="law-status">
				<div class="paper pass" />
				<span>ออกเป็นกฎหมาย</span>
				<span class="number">50</span>
			</div>
			<div class="law-status">
				<div class="paper stack" />
				<span>กฎหมายที่ถูกรวมร่าง</span>
			</div>
		</div>
		<div class="wv-font-kondolar wv-font-black year">62</div>
		<div class="wv-font-kondolar wv-font-black year">63</div>
		<div class="wv-font-kondolar wv-font-black year">64</div>
		<div class="wv-font-kondolar wv-font-black year">65</div>
	</div>
</section>

<style lang="scss">
	.header-line2 {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
	}

	.paper-container {
		display: flex;
		margin-bottom: 8px;
		padding-right: 10px;

		> .paper {
			margin-right: -8px;
		}
	}

	.paper {
		position: relative;
		z-index: 1;

		width: 20px;
		height: 24px;

		background: #000;
		border: 1px var(--paper-color, #fff) solid;

		// margin-right: -8px;

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
	}

	.line {
		position: relative;
		pointer-events: none;

		&::after {
			content: '';
			position: absolute;
			background: url(/law-watch/line.png);
			height: 28px;
			width: 4px;
			top: -2px;
			left: -2px;
			z-index: 2;
		}
	}

	.chart-body {
		display: grid;
		grid-template-columns: auto repeat(4, 1fr);
		grid-template-rows: auto repeat(3, 1fr) auto;
		width: 90%;

		> div {
			border-left: 1px solid #373746;
			padding-bottom: 16px;
			padding-right: 16px;

			&:nth-child(5n + 1) {
				border: none;
			}

			&:nth-child(n + 21) {
				padding-bottom: 0;
			}
		}
	}

	.number-aligner,
	.law-status {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.law-status {
		margin-bottom: 8px;

		> .number {
			margin-left: auto;
		}
	}

	.year {
		color: #373746;
		line-height: 5vw;
		font-size: 10vw;
		display: flex;
		align-items: flex-end;

		&::before {
			content: '';
			display: block;
			margin-left: -0.5vw;
		}
	}
</style>
