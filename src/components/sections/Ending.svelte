<script lang="ts">
	import { inView } from 'motion';
	import { onMount } from 'svelte';

	import { is_ending_inview } from 'stores/sectionScrollManager';

	import WvSharer from '@wevisdemo/ui/components/sharer.svelte';
	import Eyes from 'components/eyes/Eyes.svelte';

	let el_section: Element;
	onMount(() => {
		inView(
			el_section,
			() => {
				is_ending_inview.set(true);
				return () => {
					is_ending_inview.set(false);
				};
			},
			{
				margin: '0px 0px -50% 0px'
			}
		);
	});
</script>

<section bind:this={el_section} class="outro-container c tc">
	<section class="outro-section c">
		<p class="outro-1 wv-b3">
			<span class="nw">ดังนั้น การทำงานกระบวนการ</span><span class="nw"> ออกกฎหมาย</span><br
				class="hide-br"
			/><span class="nw"> ของบรรดา ส.ส. </span>
			<span class="nw">จากพรรคการเมืองต่าง ๆ ในสภา</span><span class="nw"> ชุดนี้</span><br
				class="hide-br"
			/><span class="nw"> คือตัวช่วยตัดสินใจอย่างหนึ่ง </span>
			<span class="nw">สำหรับประชาชนว่า</span>
		</p>
		<Eyes margin="40px 0" />
		<p class="wv-b3 wv-font-semibold">
			<span class="nw">เราควรจะเลือก หรือไม่เลือกใคร</span>
			<span class="nw">ในการเลือกตั้งครั้งถัดไป</span>
		</p>
	</section>
	<section class="share-section c">
		<span class="share-text wv-b5">Share</span>
		<WvSharer url="" label="" hideLabel light outline={false} center allowCopyLink={false} />
	</section>
</section>

<style lang="scss">
	.outro-container {
		--h: calc(100vh - 54px);

		@media (min-width: 768px) {
			--h: calc(100vh - 70px);
		}
	}

	.outro-section {
		margin-bottom: 90px;

		> p {
			color: #fff;
		}

		> p.wv-font-semibold {
			color: #a5ebd7;
		}
	}

	.share-section {
		margin-bottom: 40px;

		> .share-text {
			color: #fff;
			margin-bottom: 20px;
		}
	}

	@media (max-width: 400px) {
		.outro-1 {
			padding: 0 16px;
		}

		.hide-br {
			display: none;
		}
	}
</style>
