<script lang="ts">
	import Paper from './Paper.svelte';

	let clazz = '';
	export { clazz as class };
</script>

<div class="law-status wv-font-anuphan wv-b6 {clazz}">
	<div class="header wv-font-semibold">สถานะกฎหมาย</div>
	<div class="law-status-type">
		<Paper noMargin noHover />
		<span>ตกไป</span>
		<span class="number">50</span>
	</div>
	<div class="law-status-type">
		<Paper type="process" noMargin noHover />
		<span>อยู่ในกระบวนการ</span>
		<span class="number">50</span>
	</div>
	<div class="law-status-type">
		<Paper type="pass" noMargin noHover />
		<span>ออกเป็นกฎหมาย</span>
		<span class="number">50</span>
	</div>
	<div class="law-status-type merge-type">
		<Paper type="stack" noMargin noHover />
		<span>กฎหมายที่ถูกรวมร่าง</span>
	</div>
	<div class="law-status-type">
		<span class="wv-b7">ก่อนเข้าสภา</span>
		<img src="/law-watch/line.png" alt="" />
		<span class="wv-b7">ในสภา</span>
	</div>
</div>

<style lang="scss">
	.header {
		margin-bottom: 8px;
	}

	.law-status-type {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 8px;
		white-space: nowrap;

		> .number {
			margin-left: auto;
		}
	}

	.merge-type {
		margin: 24px 0;
	}

	@media (max-width: 767.5px) {
		.merge-type {
			margin: 16px 0;
		}

		.law-status-type {
			justify-content: center;
		}
	}
</style>
