<script lang="ts">
	import { onMount } from 'svelte';
	import { inView } from 'motion';
	import { is_process_inview } from 'stores/sectionScrollManager';

	import Details from 'components/Details.svelte';

	let el_section: Element;
	onMount(() => {
		inView(
			el_section,
			() => {
				is_process_inview.set(true);
				return () => is_process_inview.set(false);
			},
			{
				margin: '0px 0px -50% 0px'
			}
		);
	});
</script>

<section bind:this={el_section} id="process-section" class="f c tc">
	<h2 class="wv-h9 wv-font-kondolar">
		<span class="nw">การที่ร่างกฎหมายจะออกเป็นกฎหมายได้</span>
		<span class="nw">ต้องผ่าน <strong class="c-mint">กระบวนการทางสภา</strong> ดังนี้</span>
	</h2>
	<section class="before-sapa">
		<h3 class="wv-b6 c-mint">ก่อนเข้าสภา</h3>
		<div class="draft-editor-container" aria-hidden="true">
			<div class="tc">
				<span class="editor-type wv-font-semibold wv-b5">ครม.</span>
			</div>
			<div>/</div>
			<div class="tc">
				<span class="editor-type wv-font-semibold wv-b5">ส.ส.</span><br />
				<span class="wv-b6">20 คน</span>
			</div>
			<div>/</div>
			<div class="tc">
				<span class="editor-type wv-font-semibold wv-b5">ประชาชน</span><br />
				<span class="wv-b6">10,000 คน</span>
			</div>
		</div>
		<div>
			<Details title="ร่างกฎหมาย">
				<img
					src="/law-watch/process/draft.png"
					alt="ขั้นที่ 1: หากร่างกฎหมายถูกริเริ่มเสนอโดย ส.ส. หรือประชาชน เมื่อตรวจสอบความเรียบร้อย ต้องถูกการพิจารณาความเป็นกฎหมายที่เกี่ยวกับการเงินโดยนายกรัฐมนตรี หากพิจารณาแล้วว่าไม่เป็น หรือเป็นแต่ให้คำรับรอง ร่างกฎหมายก็จะผ่านเข้าสภา แต่หากพิจารณาแล้วว่าเป็นและถูกไม่ให้คำรับรอง ร่างกฎหมายจะตกไป"
					width="131"
					height="328"
					loading="lazy"
					decoding="async"
				/>
			</Details>
			<img
				class="mem-tooltip"
				src="/law-watch/process/mem-present.png"
				alt=""
				width="125"
				height="68"
				loading="lazy"
				decoding="async"
			/>
		</div>
	</section>
	<div class="sep" />
	<section>
		<h3 class="wv-b6 c-mint">
			<span class="sr-only">ต่อมาก็จะผ่านเข้ามา</span>ในสภา
		</h3>
		<div>
			<Details title="ส.ส.">
				<img
					src="/law-watch/process/member.png"
					alt="ขั้นที่ 2: การพิจารณาร่างกฎหมายในสภาผู้แทนราษฎร พื้นฐานจะพิจารณาทั้งหมด 3 วาระ โดย ส.ส. มีอำนาจหลักพิจารณาร่างกฎหมาย"
					width="134"
					height="311"
					loading="lazy"
					decoding="async"
				/>
			</Details>
			<img
				class="mem-tooltip"
				src="/law-watch/process/mem-vote.png"
				alt=""
				width="124"
				height="70"
				loading="lazy"
				decoding="async"
			/>
		</div>
		<Details title="ส.ว.">
			<img
				src="/law-watch/process/senate.png"
				alt="ขั้นที่ 3: การพิจารณาร่างกฎหมายในวุฒิสภา พื้นฐานจะพิจารณาทั้งหมด 3 วาระ โดย ส.ว. สามารถยับยั้งหรือแก้ไขเพิ่มเติมร่างกฎหมายได้ แต่ไม่สามารถปัดตกร่างกฎหมาย"
				width="162"
				height="351"
				loading="lazy"
				decoding="async"
			/>
		</Details>
		<Details title="ศาลรัฐธรรมนูญ">
			<img
				src="/law-watch/process/court.png"
				alt="ขั้นที่ 4: กรณีสงสัยว่าร่างกฎหมายใดขัดหรือแย้งต่อรัฐธรรมนูญ มีขั้นตอนให้ส่งศาลรัฐธรรมนูญเพื่อวินิจฉัย ซึ่งหากขัดหรือแย้งทั้งหมด ร่างกฎหมายจะตกไป หากขัดหรือแย้งบางส่วน ร่างกฎหมายจะถูกตีกลับไปให้สภาแก้ไขเพิ่มเติม หากไม่ขัดหรือแย้ง ร่างกฎหมายจะเข้าสู่กระบวนการต่อไป"
				width="134"
				height="180"
				loading="lazy"
				decoding="async"
			/>
		</Details>
		<Details title="กษัตริย์">
			<img
				src="/law-watch/process/king.png"
				alt="ขั้นที่ 5: หากร่างกฎหมายไม่มีปัญหาใดแล้ว นายกรัฐมนตรีนำทูลเกล้าเพื่อทรงลงพระปรมาภิไธย หากทรงลงพระปรมาภิไธยแล้ว จะประกาศลงราชกิจจานุเบกษาบังคับใช้เป็นกฎหมาย แต่หากไม่ทรงลงพระปรมาภิไธยภายใน 90 วัน รัฐสภาต้องนำร่างกฎหมายนั้นมาปรึกษาใหม่ เพื่อหาทางว่าจะดำเนินการอย่างไร หากประสงค์ยืนยันให้ผ่านร่าง ต้องใช้มติไม่น้อยกว่าสองในสามของสมาชิกสองสภาทั้งหมดเท่าที่มีอยู่"
				width="153"
				height="198"
				loading="lazy"
				decoding="async"
			/>
		</Details>
		<img
			class="passed-law"
			src="/law-watch/passed-law.png"
			alt=""
			width="22"
			height="26"
			loading="lazy"
			decoding="async"
		/>
		<p class="wv-font-kondolar wv-h10 c-mint">
			<span class="sr-only">แล้วก็จะ</span>ประกาศในราชกิจจานุเบกษา<br />
			บังคับใช้เป็นกฎหมาย
		</p>
	</section>
	<p class="mem-detail wv-b5">
		<span class="wv-font-bold"><span class="sr-only">สังเกตได้ว่า</span> ส.ส. จากพรรคการเมือง</span
		><br />
		ที่ได้รับเลือกตั้งจากประชาชน<br />
		มีส่วนเกี่ยวข้องกับกระบวนการ<br />
		ออกกฎหมายทุกช่องทาง
	</p>
	<div class="mem-relation">
		<div class="rel-text">
			<span class="wv-h11 c-mint">ก่อนเข้าสภา</span>
			<span class="wv-font-kondolar wv-h9"><span class="sr-only">ทำการเสนอ</span>ร่างกฎหมาย</span>
		</div>
		<img
			class="rel-tooltip"
			src="/law-watch/process/mem-present.png"
			alt=""
			width="125"
			height="68"
			loading="lazy"
			decoding="async"
		/>
		<div class="rel-text">
			<span class="wv-h11 c-mint">ในสภา</span>
			<span class="wv-font-kondolar wv-h9">ส.ส. <span class="sr-only">ทำการโหวต</span></span>
		</div>
		<img
			class="rel-tooltip"
			src="/law-watch/process/mem-vote.png"
			alt=""
			width="124"
			height="70"
			loading="lazy"
			decoding="async"
		/>
	</div>
</section>

<style lang="scss">
	#process-section {
		color: #fff;
		scroll-margin-top: 64px;
	}

	h2 {
		margin-bottom: 12px;
	}

	h3 {
		width: 240px;
		text-align: left;
	}

	.draft-editor-container {
		display: flex;
		gap: 16px;
		justify-content: center;
		margin-top: 8px;

		> div,
		> div > .editor-type {
			line-height: 1;
		}
	}

	.mem-tooltip {
		position: absolute;
		top: -22px;
		left: calc(100% + 16px);

		@media (max-width: 1100px) {
			display: none;
		}
	}

	.sep {
		border-bottom: 4px dotted #fff;
		margin: 8px 0 16px;
		max-width: 300px;
		width: 100%;
	}

	.passed-law {
		display: inline-block;
		margin-bottom: 12px;
	}

	.mem-detail {
		position: absolute;
		top: 154px /*139px*/;
		left: calc(50% + 260px + 32px);
		text-align: left;

		@media (max-width: 1100px) {
			position: static;
			margin-top: 64px;
			text-align: center;
		}
	}

	.mem-relation {
		@media (min-width: 1101px) {
			display: none;
		}

		display: grid;
		grid-template-columns: auto auto;
		gap: 16px;
		margin-top: 16px;

		.rel-text {
			align-self: flex-end;
			> span {
				display: block;
			}
		}
	}
</style>
