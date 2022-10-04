<script>
	import WvSharer from '@wevisdemo/ui/components/sharer.svelte';
	import WvFooter from '@wevisdemo/ui/components/footer.svelte';

	import Eyes from 'components/eyes/Eyes.svelte';
</script>

<section class="c" style="--h:calc(100vh - 70px)">
	<section class="outro-section c">
		<p class="wv-font-anuphan wv-b3">
			ดังนั้น ผลงานด้านกฎหมาย จากบรรดา สส. พรรคการเมืองต่าง ๆ<br />
			คือตัวช่วยตัดสินใจอย่างหนึ่ง เพื่อให้ประชาชนทุกคนได้คิดว่า
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
