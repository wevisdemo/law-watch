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
</section>

<style lang="scss">
	.header-line2 {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
	}

	.paper-container {
		display: flex;
		margin-bottom: 4px;
		padding-right: 10px;
	}

	.paper {
		width: 20px;
		height: 24px;

		background: #000;
		border: 1px #fff solid;

		margin-right: -10px;

		&.process {
			background: linear-gradient(
				-30deg,
				#000,
				#000 40.38%,
				#fff 40.38%,
				#fff 50%,
				#000 50%,
				#000 90.38%,
				#fff 90.38%,
				#fff 100%
			);
			background-size: 10.39px 6px;
			background-repeat: repeat;
		}

		&.pass {
			border: 1px #000 solid;
			background: #fff;
		}
	}

	.line {
		position: relative;

		&::after {
			content: '';
			position: absolute;
			border-right: 3px #fff dotted;
			z-index: 1;
			display: block;
			height: 100%;
			transform: scale(1.5, 1.1) translateX(-25%);
			left: 0;
		}
	}
</style>
