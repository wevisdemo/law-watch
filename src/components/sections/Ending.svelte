<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_ending_inview } from 'stores/sectionScrollManager';

	import WvSharer from '@wevisdemo/ui/components/sharer.svelte';
	import WvFooter from '@wevisdemo/ui/components/footer.svelte';

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

<section bind:this={el_section} class="c tc" style="--h:calc(100vh - 70px)">
	<section class="outro-section c">
		<p class="wv-font-anuphan wv-b3">
			ดังนั้น การทำงานกระบวนการออกกฎหมาย<br />
			ของบรรดา ส.ส. จากพรรคการเมืองต่าง ๆ ในสภาชุดนี้<br />
			คือตัวช่วยตัดสินใจอย่างหนึ่ง สำหรับประชาชนว่า
		</p>
		<Eyes margin="40px 0" />
		<p class="wv-font-anuphan wv-b3 wv-font-semibold">
			เราควรจะเลือก หรือไม่เลือกใคร ในการเลือกตั้งครั้งถัดไป
		</p>
	</section>
	<section class="share-section c">
		<span class="share-text wv-font-anuphan wv-b5">Share</span>
		<WvSharer
			url=""
			label=""
			hideLabel={true}
			light={true}
			outline={false}
			center={true}
			allowCopyLink={false}
		/>
	</section>
</section>
<WvFooter dark={false} />

<style lang="scss">
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
</style>
