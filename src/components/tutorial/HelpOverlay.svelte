<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { LAW_TYPES } from 'data/law-types';
	import {
		search_input,
		view_timeline,
		current_group_choice,
		current_side_choice,
		current_party_choice,
		current_voteparty_choice,
		sort_order_when_status,
		sort_order_when_timeline,
		selected_law,
		is_law_status_open,
		is_mobile_drawer_open
	} from 'stores/filterOptionStore';
	import {
		vis_type_highlight,
		group_highlight,
		order_highlight,
		law_type_highlight,
		law_status_highlight,
		mobile_filter_toggle_highlight
	} from 'stores/highlightManager';

	import HelpBtn from './HelpBtn.svelte';

	let is_help_show = true;
	let is_intro_dismiss = false;
	let current_tutorial: 1 | 2 | 3 | 4 | null = null;

	const dismissIntro = () => {
		is_intro_dismiss = true;
	};

	const closeHelp = () => {
		is_help_show = false;
		if (!is_intro_dismiss) setTimeout(dismissIntro, 500);
		setTimeout(resetCurrentTutorial, 500);
	};

	const resetCurrentTutorial = () => {
		current_tutorial = null;
		resetHighlight();
	};

	const resetHighlight = () => {
		$vis_type_highlight = false;
		$group_highlight = false;
		$order_highlight = false;
		$law_type_highlight = false;
		$law_status_highlight = false;
		$mobile_filter_toggle_highlight = false;
		$is_mobile_drawer_open = false;
	};

	const resetFilter = () => {
		$search_input = '';
		$sort_order_when_timeline = ['ระยะเวลา', 'สถานะ', 'หมวดหมู่'];
		$sort_order_when_status = ['สถานะ', 'หมวดหมู่'];
		$view_timeline = false;
		$current_group_choice = 'ไม่แบ่งกลุ่ม';
		$current_side_choice = 'เลือกทุกฝ่าย';
		$current_party_choice = 'เลือกทุกพรรค';
		$current_voteparty_choice = 'ครูไทยเพื่อประชาชน';
		$selected_law = [...LAW_TYPES];
		$is_law_status_open = true;
	};

	const showTutorial1 = () => {
		current_tutorial = 1;
		resetHighlight();
		$mobile_filter_toggle_highlight = true;
		$vis_type_highlight = true;
		$group_highlight = true;
		$order_highlight = true;
		$law_status_highlight = 'two';
		$is_mobile_drawer_open = true;

		resetFilter();
	};

	const showTutorial2 = () => {
		current_tutorial = 2;
		resetHighlight();
		$mobile_filter_toggle_highlight = true;
		$vis_type_highlight = true;
		$group_highlight = true;
		$law_status_highlight = 'all';
		$is_mobile_drawer_open = true;

		resetFilter();
		$current_group_choice = 'ฝ่ายที่เสนอร่างกฎหมาย';
		$selected_law = [];
	};

	const showTutorial3 = () => {
		current_tutorial = 3;
		resetHighlight();
		$mobile_filter_toggle_highlight = true;
		$vis_type_highlight = true;
		$group_highlight = true;
		$order_highlight = true;
		$law_type_highlight = true;
		$is_mobile_drawer_open = true;

		resetFilter();
		$sort_order_when_status = ['หมวดหมู่', 'สถานะ'];
		$current_group_choice = 'พรรคที่เสนอร่างกฎหมาย';
		$selected_law = ['สิ่งแวดล้อม'];
	};

	const showTutorial4 = () => {
		current_tutorial = 4;
		resetHighlight();
		$mobile_filter_toggle_highlight = true;
		$vis_type_highlight = true;
		$group_highlight = true;
		$order_highlight = true;
		$law_status_highlight = 'one';
		$is_mobile_drawer_open = true;

		resetFilter();
		$view_timeline = true;
	};

	const TUTORIAL_CHOICES = [
		'<strong>ร่างกฎหมาย</strong> มักไม่ค่อยออกเป็น<br />กฎหมาย ส่วนมากอยู่ระหว่าง<br />กระบวนการ หรือตกไปแล้วใช่ไหม',
		'<strong>ร่างกฎหมาย</strong> ของฝ่ายรัฐบาล<br />ผ่านได้ง่ายกว่าของฝ่ายค้านหรือเปล่า',
		'<strong>พรรคการเมือง</strong> สนใจประเด็น<br />กฎหมายแตกต่างกันแค่ไหน',
		'<strong>ร่างกฎหมาย</strong> ที่ใช้ระยะเวลานานใน<br />กระบวนการนานมักไม่ผ่านใช่ไหม'
	];

	const TUTORIAL_BALLOONS = [
		[
			{
				key: -1,
				name: 'เลือก filter',
				styles: '--m-t:11px'
			},
			{
				key: 0,
				name: 'เลือกดูภาพรวม',
				styles: '--d-t:81px;--m-t:41px'
			},
			{
				key: 1,
				name: 'เลือกไม่แบ่งกลุ่ม<wbr> เพื่อดูทั้งหมด',
				styles: '--d-t:151px;--m-t:89px'
			},
			{
				key: 2,
				name: 'เลือกเรียงตาม<wbr>สถานะ',
				styles: '--d-t:222px;--m-t:152px'
			},
			{
				key: 5,
				name: 'มองหาสัญลักษณ์ที่บอกว่า<wbr>ตกไป/อยู่ในกระบวนการ<br />หรือดูจำนวนรวมเทียบกัน',
				styles: '--d-b:205px;--m-b:130px'
			}
		],
		[
			{
				key: -1,
				name: 'เลือก filter',
				styles: '--m-t:11px'
			},
			{
				key: 0,
				name: 'เลือกดูภาพรวม',
				styles: '--d-t:81px;--m-t:41px'
			},
			{
				key: 1,
				name: 'เลือกดูฝ่ายที่เสนอ<wbr>ร่างกฎหมาย',
				styles: '--d-t:151px;--m-t:89px'
			},
			{
				key: 2,
				name: 'เลือกทุกฝ่าย<wbr>เพื่อเทียบกัน',
				styles: '--d-t:231px;--m-t:161px'
			},
			{
				key: 5,
				name: 'มองหาสัญลักษณ์ที่บอกว่าผ่าน<br />หรือดูจำนวนรวมเทียบกัน',
				styles: '--d-b:205px;--m-b:130px'
			}
		],
		[
			{
				key: -1,
				name: 'เลือก filter',
				styles: '--m-t:11px'
			},
			{
				key: 0,
				name: 'เลือกดูภาพรวม',
				styles: '--d-t:81px;--m-t:41px'
			},
			{
				key: 1,
				name: 'เลือกดูพรรคที่<wbr>เสนอร่างกฎหมาย',
				styles: '--d-t:151px;--m-t:89px'
			},
			{
				key: 2,
				name: 'เลือกทุกพรรค<wbr>เพื่อเทียบกัน',
				styles: '--d-t:231px;--m-t:161px'
			},
			{
				key: 3,
				name: 'เลือกเรียงตาม<wbr>หมวดหมู่<wbr>เพื่อดูประเด็น',
				styles: '--d-t:302px;--m-t:213px'
			},
			{
				key: 4,
				name: 'เลือกหมวดหมู่<wbr>ที่สนใจ',
				styles: '--d-t:419px;--m-t:323px'
			}
		],
		[
			{
				key: -1,
				name: 'เลือก filter',
				styles: '--m-t:11px'
			},
			{
				key: 0,
				name: 'เลือกดูระยะเวลา',
				styles: '--d-t:81px;--m-t:41px'
			},
			{
				key: 1,
				name: 'เลือกไม่แบ่งกลุ่ม<wbr> เพื่อดูทั้งหมด',
				styles: '--d-t:151px;--m-t:90px'
			},
			{
				key: 2,
				name: 'เลือกเรียงตาม<wbr>ระยะเวลา',
				styles: '--d-t:222px;--m-t:152px'
			},
			{
				key: 5,
				name: 'มองหาสัญลักษณ์<wbr>ที่บอกว่าตกไป',
				styles: '--d-b:217px;--m-b:130px'
			}
		]
	];
</script>

{#if !is_help_show}
	<HelpBtn on:click={() => (is_help_show = true)} />
{/if}
<div class="help-overlay" class:show={is_help_show}>
	<div class="help-backdrop" />
	<div
		class="help-content c"
		class:right={current_tutorial}
		class:shift-tut3={current_tutorial === 3}
	>
		{#if is_intro_dismiss && !current_tutorial}
			<div
				class="balloon wv-b5"
				class:clickable={!current_tutorial}
				on:click={showTutorial1}
				in:fly={{ y: 10, duration: 300, delay: 0 }}
			>
				<div>
					{@html TUTORIAL_CHOICES[0]}
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
			<div
				class="balloon wv-b5"
				class:clickable={!current_tutorial}
				on:click={showTutorial2}
				in:fly={{ y: 10, duration: 300, delay: 100 }}
			>
				<div>
					{@html TUTORIAL_CHOICES[1]}
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
			<div
				class="balloon wv-b5"
				class:clickable={!current_tutorial}
				on:click={showTutorial3}
				in:fly={{ y: 10, duration: 300, delay: 200 }}
			>
				<div>
					{@html TUTORIAL_CHOICES[2]}
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
			<div
				class="balloon wv-b5"
				class:clickable={!current_tutorial}
				on:click={showTutorial4}
				in:fly={{ y: 10, duration: 300, delay: 300 }}
			>
				<div>
					{@html TUTORIAL_CHOICES[3]}
				</div>
				<img src="/law-watch/question.svg" alt="" />
			</div>
		{:else if current_tutorial}
			<div
				class="balloon wv-b5"
				class:shift-tut1={current_tutorial === 1}
				class:shift-tut2={current_tutorial === 2}
				class:shift-tut4={current_tutorial === 4}
			>
				<div>
					{@html TUTORIAL_CHOICES[current_tutorial - 1]}
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
			{#if !current_tutorial}
				<button type="button" class="wv-font-anuphan wv-b4 tut-btn primary" on:click={closeHelp}>
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
			{/if}
			{#if !is_intro_dismiss}
				<button type="button" class="wv-font-anuphan wv-b4 tut-btn" on:click={dismissIntro}>
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
			{#if current_tutorial}
				<button
					type="button"
					class="wv-font-anuphan wv-b4 tut-btn"
					style="width:80px;padding:8px 12px 8px 8px"
					on:click={resetCurrentTutorial}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 20 21"
						><g clip-path="url(#a)" filter="url(#b)"
							><path
								fill="#3904E9"
								fill-rule="evenodd"
								d="M14.193 2.558a.625.625 0 00-.885 0l-7.5 7.5a.624.624 0 000 .885l7.5 7.5a.626.626 0 00.885-.885L7.134 10.5l7.059-7.057a.623.623 0 000-.885z"
								clip-rule="evenodd"
							/></g
						><defs
							><clipPath id="a"
								><path
									fill="#fff"
									d="M0 0h20v20H0z"
									transform="matrix(1 0 0 -1 0 20.5)"
								/></clipPath
							><filter
								id="b"
								width="48.752"
								height="56.252"
								x="-14.376"
								y="-17.626"
								color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse"
								><feFlood flood-opacity="0" result="BackgroundImageFix" /><feColorMatrix
									in="SourceAlpha"
									result="hardAlpha"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								/><feOffset /><feGaussianBlur stdDeviation="10" /><feComposite
									in2="hardAlpha"
									operator="out"
								/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" /><feBlend
									in2="BackgroundImageFix"
									result="effect1_dropShadow_430_66298"
								/><feBlend
									in="SourceGraphic"
									in2="effect1_dropShadow_430_66298"
									result="shape"
								/></filter
							></defs
						></svg
					>
					กลับ
				</button>
			{/if}
		</div>
	</div>
</div>
{#if current_tutorial}
	{#each TUTORIAL_BALLOONS[current_tutorial - 1] as { key, name, styles } (key)}
		<div
			class="help-tooltip wv-b6 nw"
			class:mobile-top={key === -1}
			class:bottom={key === 5}
			style={styles}
			transition:fade={{ duration: 300 }}
			animate:flip={{ duration: 300 }}
		>
			{@html name}
		</div>
	{/each}
{/if}

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

	.help-backdrop {
		overflow: hidden;
	}

	.help-content {
		&.right {
			@media (max-width: 767.5px) {
				&.shift-tut3 {
					padding: 16px 24px;
					align-items: flex-end;
					justify-content: flex-end;
				}
			}

			@media (min-width: 768px) {
				justify-content: center;
				padding: 0 80px;
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
		user-select: none;

		> img {
			height: 48px;
		}

		&.clickable {
			cursor: pointer;
		}

		@media (max-width: 767.5px) {
			&.shift-tut1 {
				margin-top: 37px;
			}

			&.shift-tut2 {
				margin-top: 67px;
			}

			&.shift-tut4 {
				margin-top: 58px;
			}
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

	.help-tooltip {
		background: #fff;
		color: #3904e9;
		border-radius: 2px;

		padding: 8px;

		position: absolute;
		top: var(--m-t, unset);
		bottom: var(--m-b, unset);
		left: 178px;
		width: min-content;
		max-width: 140px;
		z-index: 4;

		display: flex;
		align-items: center;
		gap: 6px;

		&::before {
			content: '';
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 41 16'%3E%3Cpath fill='%233904E9' d='M.293 7.293a1 1 0 000 1.414l6.364 6.364a1 1 0 001.414-1.414L2.414 8l5.657-5.657A1 1 0 006.657.93L.293 7.293zM41 7H1v2h40V7z'/%3E%3C/svg%3E");
			background-size: cover;
			width: 16px;
			height: 16px;
			flex: 0 0 16px;

			@media (min-width: 768px) {
				flex: 0 0 40px;
				width: 40px;
			}
		}

		&.mobile-top {
			left: 56px;
		}

		@media (max-width: 767.5px) {
			&.bottom {
				left: 24px;
				flex-direction: column;
				align-items: flex-start;
				max-width: 185px;
				gap: 4px;

				&:before {
					order: 1;
					transform: rotate(-90deg);
				}
			}
		}

		@media (min-width: 768px) {
			gap: 8px;
			left: 324px;
			top: var(--d-t, unset);
			bottom: var(--d-b, unset);
			max-width: unset;

			&.mobile-top {
				display: none;
			}
		}
	}
</style>
