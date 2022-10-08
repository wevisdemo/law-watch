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
		margin-bottom: 8px;
		padding-right: 10px;
	}

	.paper {
		width: 20px;
		height: 24px;

		background: #000;
		border: 1px #fff solid;

		margin-right: -10px;

		&.process {
			background-color: #000;
			background-image: url(/law-watch/bg.png);
			background-size: 10px 6px;
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
			background: url(/law-watch/line.png);
			height: 28px;
			width: 4px;
			top: -2px;
			left: -2px;
			z-index: 1;
		}
	}
</style>
