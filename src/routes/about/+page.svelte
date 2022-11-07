<script>
	import { onMount } from 'svelte';
	import { removeClass } from 'utils/class-director';

	import WvButtonGroup from '@wevisdemo/ui/components/button-group.svelte';
	import WvButton from '@wevisdemo/ui/components/button.svelte';
	import WvContainer from '@wevisdemo/ui/components/container.svelte';
	import WvParagraphGroup from '@wevisdemo/ui/components/paragraph-group.svelte';
	import WvSharer from '@wevisdemo/ui/components/sharer.svelte';

	onMount(() => {
		removeClass('lock-body-scroll');
	});
</script>

<WvContainer heading="เกี่ยวกับโครงการ" children>
	<WvParagraphGroup small={false} heading="เป้าหมาย" children>
		<p class="wv-font-baijamjuri">
			เมื่อกฎหมายคือกติกาของการอยู่ร่วมกันในสังคมของรัฐหนึ่ง
			กฎหมายจึงควรต้องมีที่มาจากกระบวนการอันมีส่วนยึดโยงประชาชนผู้เป็นองค์ประกอบหนึ่งของรัฐ
			ไม่ว่าจะโดยทางตรงหรือทางอ้อม ซึ่งตามกลไกทางประชาธิปไตยในระบบรัฐธรรมนูญของหลายประเทศ
			รวมถึงประเทศไทย สมาชิกสภาผู้แทนราษฎรของพรรคการเมืองที่ได้รับการเลือกตั้งเข้าสู่รัฐสภา
			คือผู้ที่มีส่วนเกี่ยวข้องกับกระบวนการร่างกฎหมายในทุกเส้นทางเสมอ
		</p>
		<p class="wv-font-baijamjuri">
			ทาง WeVis ร่วมกับ 101 PUB
			ขอชวนทุกคนดูข้อมูลร่างกฎหมายที่เข้าสู่กระบวนการรัฐสภาไทยในรัฐบาลยุคประยุทธ์ จันทร์โอชา 2
			เพื่อพิจารณาว่า ส.ส. ที่คนไทยเลือกตั้งไปนั้น ทำการเสนอ และพิจารณาร่างกฎหมายอะไร และอย่างไรบ้าง
			เพื่อตอบประเด็นสำคัญที่ว่า &ldquo;ผู้แทนของเราในสภาชุดปัจจุบัน ทำงาน (ด้านกฎหมาย)
			เพื่อประชาชนอย่างเรา ๆ ได้มากน้อยเพียงใด&rdquo;
		</p>
	</WvParagraphGroup>
	<WvParagraphGroup small={false} heading="ที่มาของข้อมูล" children>
		<ol class="wv-font-baijamjuri" style="padding-left:1rem">
			<li>
				สำหรับข้อมูลร่างกฎหมายทั้งหมดที่ถูกเสนอและพิจารณาในสภาสมัยรัฐบาลประยุทธ์ จันทร์โอชา 2 ทาง
				WeVis ขอขอบคุณ <a
					href="https://the101percent.com/works/101pub/"
					target="_blank"
					rel="nofollow noopener noreferrer">101 PUB &ndash; 101 Public Policy Think Tank</a
				>
				สำหรับการค้นคว้า และสนับสนุนข้อมูลที่เป็นประโยชน์กับโปรเจกต์นี้อย่างละเอียด และครบถ้วนที่สุดเท่าที่จะเป็นไปได้
				โดยข้อมูลที่ได้มาจากการสืบค้นใน
				<a
					href="https://lis.parliament.go.th/index/index.php"
					target="_blank"
					rel="nofollow noopener noreferrer"
					>ระบบสารสนเทศด้านนิติบัญญัติของสำนักงานเลขาธิการสภาผู้แทนราษฎร</a
				>
			</li>
			<li>
				สำหรับข้อมูลการลงมติของสมาชิกสภาผู้แทนราษฎร (ส.ส.) พรรคการเมืองต่าง ๆ
				ต่อร่างกฎหมายที่ถูกเสนอและพิจารณาในสภาสมัยรัฐบาลประยุทธ์ จันทร์โอชา 2
				มาจากการใช้ข้อมูลของโปรเจกต์ WeVis ที่ชื่อว่า &ldquo;<a
					href="https://theyworkforus.wevis.info/"
					>They work for us - ใครคือผู้แทนของเรา ค้นหา ตรวจสอบ โปร่งใส</a
				>&rdquo;
			</li>
		</ol>
	</WvParagraphGroup>
	<WvParagraphGroup small={false} heading="นโยบายการนำข้อมูลไปใช้ต่อ" children>
		<p class="wv-font-baijamjuri">
			ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจ็กต์ให้เป็น Open Source และเปิดข้อมูลเป็น Open Data
			ภายใต้เงื่อนไข Creative Commons Attribution-ShareAlike License
			คือสามารถนำไปเผยแพร่และดัดแปลงได้ โดยต้องระบุที่มา แต่ห้ามนำไปใช้เพื่อการค้า
			และต้องเผยแพร่งานดัดแปลงโดยใช้สัญญาอนุญาตชนิดเดียวกัน
		</p>
		<p class="wv-font-baijamjuri">
			หากมีข้อสงสัยต้องการสอบถามเพิ่มเติม ประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูลเพื่อความถูกต้อง
			หรือมีข้อเสนอแนะใดๆ สามารถติดต่อได้ที่ team@punchup.world
		</p>
	</WvParagraphGroup>
	<WvParagraphGroup small={false} heading="อาสาสมัครร่วมพัฒนา" children>
		<WvParagraphGroup small="true" heading="เขียนโปรแกรม" children>
			<p class="wv-font-baijamjuri">
				<a href="https://rootenginear.github.io/" target="_blank" rel="nofollow noopener noreferrer"
					>สุเทพ จันทร์ชูผล</a
				>
			</p>
		</WvParagraphGroup>
		<WvParagraphGroup small="true" heading="ออกแบบ" children>
			<p class="wv-font-baijamjuri">
				<a
					href="https://pearwawa.myportfolio.com/"
					target="_blank"
					rel="nofollow noopener noreferrer">มนสิชา ศรีสวนแตง</a
				>
			</p>
		</WvParagraphGroup>
		<WvParagraphGroup small="true" heading="สืบค้นและรวบรวมข้อมูล" children>
			<p class="wv-font-baijamjuri">
				สิทธิกานต์ ธีระวัฒนชัย, <a
					href="https://the101percent.com/works/101pub/"
					target="_blank"
					rel="nofollow noopener noreferrer">101 PUB</a
				>
			</p>
		</WvParagraphGroup>
		<WvParagraphGroup small="true" heading="บรรณาธิการ" children>
			<p class="wv-font-baijamjuri">ธนิสรา เรืองเดช</p>
		</WvParagraphGroup>
		<WvParagraphGroup small="true" heading="ประสานงานและจัดการอื่นๆ" children>
			<p class="wv-font-baijamjuri">
				<a href="https://punchup.world/" target="_blank" rel="nofollow noopener noreferrer"
					>Punch Up</a
				>
			</p>
		</WvParagraphGroup>
		<p class="wv-font-baijamjuri">
			โปรเจกต์ <strong
				>&ldquo;ส่องผลงานผ่านสภายุคตู่สอง ส.ส. เสนอ และ/หรือ โหวต กฎหมายอะไรกันบ้าง ?&rdquo;</strong
			> ได้รับการสนับสนุนทุนในการดำเนินงานจาก National Endowment for Democracy (NED) ซึ่งนำมาใช้เป็นต้นทุนในการรวมรวมข้อมูล
			ออกแบบ พัฒนาเว็บไซต์ ประสานงาน บริหารจัดการ ตลอดจนการจัด Meetup เพื่อดำเนินโครงการ
		</p>
	</WvParagraphGroup>

	<WvButtonGroup center={true} children>
		<WvButton color="blue" small={false} onClick children>
			<!-- keep svg: css coloring -->
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21" width="21" height="21"
				><g stroke="currentColor" stroke-width="2" clip-path="url(#a)"
					><path stroke-miterlimit="10" d="M7.036 2.864h-5.86v16.544h18.649V2.864h-5.86" /><path
						stroke-miterlimit="10"
						d="M16.032 8.655l-5.304 5.304-5.303-5.304"
					/><path d="M10.667.5V13" /></g
				><defs
					><clipPath id="a"
						><path fill="#fff" d="M0 0h20.833v20H0z" transform="translate(.083 .5)" /></clipPath
					></defs
				></svg
			>
			<div>ดาวน์โหลดข้อมูล</div>
		</WvButton>
		<WvButton color="blue" small={false} onClick children>
			<img
				src="data:image/png;base64,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"
				alt=""
				width="30"
				height="30"
				loading="lazy"
				decoding="async"
			/>
			<span>Feedback</span>
		</WvButton>
	</WvButtonGroup>

	<WvSharer
		url=""
		label="Share"
		hideLabel={false}
		light={false}
		outline={false}
		center
		allowCopyLink={false}
	/>
</WvContainer>

<style>
	p,
	li {
		line-height: 1.5;
	}
</style>
