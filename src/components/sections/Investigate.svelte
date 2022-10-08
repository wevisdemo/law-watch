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

	<div>
		<div class="paper-container">
			<div class="paper" style:--paper-color="#ff8a00" />
			<div class="paper" style:--paper-color="#ff8a00" />
			<div class="paper" style:--paper-color="#ff8a00" />
			<div class="line" />
			<div class="paper" style:--paper-color="#676dff" />
			<div class="paper" style:--paper-color="#676dff" />
			<div class="paper" style:--paper-color="#676dff" />
		</div>
		<div class="paper-container">
			<div class="paper process" style:--paper-color="#1dc775" />
			<div class="paper process" style:--paper-color="#1dc775" />
			<div class="paper process" style:--paper-color="#1dc775" />
			<div class="paper process" style:--paper-color="#1dc775" />
			<div class="paper process" style:--paper-color="#1dc775" />
			<div class="line" />
			<div class="paper process" style:--paper-color="#ff3767" />
			<div class="paper process" style:--paper-color="#ff3767" />
			<div class="paper process" style:--paper-color="#ff3767" />
			<div class="paper process" style:--paper-color="#ff3767" />
			<div class="paper process" style:--paper-color="#ff3767" />
		</div>
		<div class="paper-container">
			<div class="paper stack" style:--paper-color="#d252ff" />
			<div class="paper stack" style:--paper-color="#d252ff" />
			<div class="paper stack" style:--paper-color="#fff173" />
			<div class="paper stack" style:--paper-color="#fff173" />
			<div class="paper stack" style:--paper-color="#fff173" />
			<div class="paper pass" style:--paper-color="#9feeff" />
			<div class="paper pass" style:--paper-color="#9feeff" />
			<div class="paper pass" style:--paper-color="#9feeff" />
			<div class="paper pass" />
			<div class="paper pass" />
		</div>
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
	}

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
				-29.04deg,
				#000,
				#000 40%,
				var(--paper-color, #fff) 40%,
				var(--paper-color, #fff) 50%,
				#000 50%,
				#000 90%,
				var(--paper-color, #fff) 90%,
				var(--paper-color, #fff) 100%
			);
			background-size: 10px 6px;
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
</style>
