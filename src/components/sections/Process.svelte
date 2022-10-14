<script lang="ts">
	// TODO: เขียน alt
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

<section bind:this={el_section} id="process-section" class="c tc">
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
				<img src="/law-watch/process/draft.png" alt="TODO: เขียน alt ตรงนี้" />
			</Details>
			<img class="mem-tooltip" src="/law-watch/process/mem-present.png" alt="" />
		</div>
	</section>
	<div class="sep" />
	<section>
		<h3 class="wv-b6 c-mint">
			<span class="sr-only">เมื่อเข้ามา</span>ในสภา
			<span class="sr-only">ร่างกฎหมายจะต้องผ่านการโหวต</span>
		</h3>
		<div>
			<Details title="ส.ส.">
				<img src="/law-watch/process/member.png" alt="TODO: เขียน alt ตรงนี้" />
			</Details>
			<img class="mem-tooltip" src="/law-watch/process/mem-vote.png" alt="" />
		</div>
		<Details title="ส.ว.">
			<img src="/law-watch/process/senate.png" alt="TODO: เขียน alt ตรงนี้" />
		</Details>
		<Details title="ศาลรัฐธรรมนูญ">
			<img src="/law-watch/process/court.png" alt="TODO: เขียน alt ตรงนี้" />
		</Details>
		<Details title="กษัตริย์">
			<img src="/law-watch/process/king.png" alt="TODO: เขียน alt ตรงนี้" />
		</Details>
		<img class="passed-law" src="/law-watch/passed-law.png" alt="" />
		<p class="wv-font-kondolar wv-h10 c-mint">
			ประกาศในราชกิจจานุเบกษา<br />
			บังคับใช้เป็นกฎหมาย
		</p>
	</section>
	<p class="mem-detail wv-b5">
		<span class="wv-font-bold">ส.ส. จากพรรคการเมือง</span><br />
		ที่ได้รับเลือกตั้งจากประชาชน<br />
		มีส่วนเกี่ยวข้องกับกระบวนการ<br />
		ออกกฎหมายทุกช่องทาง
	</p>
	<div class="mem-relation">
		<div class="rel-text">
			<span class="wv-h11 c-mint">ก่อนเข้าสภา</span>
			<span class="wv-font-kondolar wv-h9">ร่างกฎหมาย</span>
		</div>
		<img class="rel-tooltip" src="/law-watch/process/mem-present.png" alt="" />
		<div class="rel-text">
			<span class="wv-h11 c-mint">ในสภา</span>
			<span class="wv-font-kondolar wv-h9">ส.ส.</span>
		</div>
		<img class="rel-tooltip" src="/law-watch/process/mem-vote.png" alt="" />
	</div>
</section>

<style lang="scss">
	#process-section {
		color: #fff;
		scroll-margin-top: 10vh;
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
