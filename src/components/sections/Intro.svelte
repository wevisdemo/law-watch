<script lang="ts">
	import { onMount } from 'svelte';
	import { scroll, animate, ScrollOffset } from 'motion';
	import { removeClass } from 'utils/class-director';

	import Eyes from 'components/eyes/Eyes.svelte';

	let el_header_container: Element;
	let el_h1: Element;
	let el_p: Element;
	let el_svg: Element;
	onMount(() => {
		animate(
			el_header_container,
			{ transform: ['translateY(7vw)', 'translateY(0)'] },
			{
				duration: 1,
				delay: 1.5
			}
		);

		scroll(
			animate(
				el_header_container.children[0],
				{ transform: ['translateY(0)', 'translateY(50%)'] },
				{ easing: 'linear' }
			),
			{ target: el_header_container, offset: ScrollOffset.Exit }
		);

		animate(
			el_h1,
			{ opacity: [0, 1] },
			{
				duration: 1,
				delay: 0.5
			}
		);

		animate(
			el_p,
			{ opacity: [0, 1] },
			{
				duration: 1,
				delay: 1
			}
		);

		animate(
			el_svg,
			{
				transform: ['translateY(100%)', 'translateY(0)']
			},
			{
				duration: 1,
				delay: 1.5
			}
		);

		setTimeout(() => {
			removeClass('lock-body-scroll');
		}, 1500);
	});
</script>

<section>
	<div bind:this={el_header_container} class="c jumbo-container">
		<div class="c tc">
			<Eyes animation="awake" />
			<header>
				<h1 bind:this={el_h1} class="wv-h2 wv-font-kondolar wv-font-black">
					<span class="nw">ส่องผลงาน</span><span class="nw">ผ่านสภา</span><span class="nw"
						>ยุคตู่สอง</span
					>
				</h1>
				<p bind:this={el_p} class="wv-h5 wv-font-kondolar c-mint">
					<span class="nw">ส.ส. <strong>เสนอ</strong> และ/หรือ <strong>โหวต</strong></span>
					<span class="nw">กฎหมายอะไรกันบ้าง ?</span>
				</p>
			</header>
		</div>
	</div>
	<img
		bind:this={el_svg}
		class="intro-year"
		src="/law-watch/intro-year.svg"
		alt="2562 ถึง 2565"
		width="1280"
		height="179"
		loading="lazy"
		decoding="async"
	/>
</section>

<style lang="scss">
	.jumbo-container {
		--h: calc(100vh - 40px - 14vw);

		@media (min-width: 768px) {
			--h: calc(100vh - 52px - 14vw);
		}
	}

	h1 {
		color: #fff;
		margin-bottom: 4px;
		opacity: 0;
	}

	p {
		opacity: 0;
	}

	.intro-year {
		transform: translateY(100%);
		width: 100%;
		height: 14vw;
		bottom: calc(env(safe-area-inset-bottom, 0px));

		object-fit: cover;
		object-position: center;
	}
</style>
