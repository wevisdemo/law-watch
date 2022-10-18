<script lang="ts">
	import { fly } from 'svelte/transition';
	import HelpBtn from './HelpBtn.svelte';

	let is_help_show = true;
	let is_intro_dismiss = false;

	const dismiss_intro = () => {
		is_intro_dismiss = true;
	};

	const close_help = () => {
		is_help_show = false;
		if (!is_intro_dismiss) setTimeout(dismiss_intro, 500);
	};
</script>

{#if !is_help_show}
	<HelpBtn on:click={() => (is_help_show = true)} />
{/if}
<div class="help-overlay" class:show={is_help_show}>
	<div class="help-backdrop" />
	<div class="help-content c">
		{#if is_intro_dismiss}
			<div class="balloon wv-b5 choice" in:fly={{ y: 10, duration: 300, delay: 0 }}>
				<div>
					<strong>ร่างกฎหมาย</strong> มักไม่ค่อยออกเป็น<br />
					กฎหมาย ส่วนมากอยู่ระหว่าง<br />
					กระบวนการ หรือตกไปแล้วใช่ไหม
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
			<div class="balloon wv-b5 choice" in:fly={{ y: 10, duration: 300, delay: 100 }}>
				<div>
					<strong>ร่างกฎหมาย</strong> ของฝ่ายรัฐบาล<br />
					ผ่านได้ง่ายกว่าของฝ่ายค้านหรือเปล่า
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
			<div class="balloon wv-b5 choice" in:fly={{ y: 10, duration: 300, delay: 200 }}>
				<div>
					<strong>พรรคการเมือง</strong> สนใจประเด็น<br />
					กฎหมายแตกต่างกันแค่ไหน
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
			<div class="balloon wv-b5 choice" in:fly={{ y: 10, duration: 300, delay: 300 }}>
				<div>
					<strong>ร่างกฎหมาย</strong> ที่ใช้ระยะเวลานานใน<br />
					กระบวนการนานมักไม่ผ่านใช่ไหม
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
		{:else}
			<div class="balloon wv-b4">
				<div>
					<strong>ลองมาสำรวจกัน</strong> ว่าร่างกฎหมาย<br />
					ที่ผ่านเข้ารัฐสภาในรัฐบาลนี้สะท้อน<br />
					เรื่องราวอะไรบ้าง
				</div>
			</div>
		{/if}
		<div class="btn-container" class:right={is_intro_dismiss}>
			<button type="button" class="wv-font-anuphan wv-b4 tut-btn primary" on:click={close_help}>
				สำรวจเอง
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					><rect
						width="16.388"
						height="1.366"
						x="5.908"
						y="17.346"
						fill="currentColor"
						rx=".683"
						transform="rotate(-45 5.908 17.346)"
					/><rect
						width="16.388"
						height="1.366"
						x="6.873"
						y="5.867"
						fill="currentColor"
						rx=".683"
						transform="rotate(45 6.873 5.867)"
					/></svg
				>
			</button>
			{#if !is_intro_dismiss}
				<button type="button" class="wv-font-anuphan wv-b4 tut-btn" on:click={dismiss_intro}>
					ช่วยนำทางที
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						><path
							fill="currentColor"
							fill-rule="evenodd"
							d="M5.807 2.058a.625.625 0 01.885 0l7.5 7.5a.625.625 0 010 .885l-7.5 7.5a.626.626 0 11-.885-.885L12.867 10l-7.06-7.057a.625.625 0 010-.885z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.help-overlay,
	.help-backdrop,
	.help-content {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.help-overlay {
		pointer-events: none;

		> .help-backdrop {
			background: rgba(0, 0, 0, 0.5);

			opacity: 0;
			transition: opacity 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
		}

		> .help-content {
			opacity: 0;
			transform: scale(0);
			transform-origin: calc(100% - 48px) calc(100% - 48px);
			transition-property: opacity, transform;
			transition-duration: 0.5s;
			transition-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
		}

		&.show {
			pointer-events: all;

			> .help-backdrop {
				opacity: 1;
				transition-duration: 1s;
				transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
			}

			> .help-content {
				opacity: 1;
				transform: scale(1);
				transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
			}
		}
	}

	.balloon {
		display: flex;
		align-items: center;
		justify-content: space-between;

		background: #fff;
		border-radius: 16px 16px 0px 16px;
		color: #3904e9;

		padding: 16px;
		margin-bottom: 16px;

		width: 260px;

		> img {
			height: 48px;
		}

		&.choice {
			cursor: pointer;
			user-select: none;
		}

		@media (min-width: 768px) {
			width: 300px;
			height: 104px;
		}
	}

	.btn-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;

		width: 260px;

		&.right {
			justify-content: flex-end;
		}

		@media (min-width: 768px) {
			width: 300px;
		}
	}

	.tut-btn {
		background: #fff;
		border-radius: 24px;
		border: none;
		color: #3904e9;

		display: flex;
		align-items: center;
		justify-content: space-between;

		cursor: pointer;

		padding: 8px 8px 8px 12px;
		width: 126px;

		&.primary {
			background: #3904e9;
			color: #fff;
		}

		@media (min-width: 768px) {
			width: 145px;
		}
	}
</style>
