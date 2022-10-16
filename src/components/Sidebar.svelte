<script lang="ts">
	import { LAW_TYPE_METADATA } from 'data/law-types';
	import Paper from './Paper.svelte';

	export let is_open = false;

	const close = () => {
		is_open = false;
	};
</script>

<article class="law-detail wv-b6" class:open={is_open}>
	<header>
		<h3 class="wv-font-semibold wv-h10">ร่างพระราชบัญญัติวิธีพิจารณาคดีจราจร พ.ศ. ...</h3>
		<button type="button" class="close-btn" on:click={close}>
			<img src="/law-watch/card-close.svg" alt="ปิด" width="16" height="16" />
		</button>
	</header>
	<div class="detail-wrapper">
		<div class="merged-doc">
			<button type="button">
				<img src="/law-watch/carets/lb.svg" alt="ดูฉบับก่อนหน้า" width="8" height="14" />
			</button>
			<span>ดูร่างกฎหมายอื่นที่ถูกรวมร่าง 1/7 ฉบับ</span>
			<button type="button">
				<img src="/law-watch/carets/rb.svg" alt="ดูฉบับถัดไป" width="8" height="14" />
			</button>
		</div>
		<div class="status">
			<span class="wv-font-semibold" style="line-height:1">สถานะกฎหมาย</span>
			<Paper
				noHover
				noMargin
				type="process"
				style="display:inline-block;margin-left:4px;height:16px;width:13.33px"
			/>
			<span style="line-height:1">อยู่ในกระบวนการ</span>
		</div>
		<div class="timeline">
			<div class="active">ร่างกฎหมาย</div>
			<img src="/law-watch/card-arrow.svg" alt="" width="9" height="4" />
			<div class="active">ส.ส.</div>
			<img src="/law-watch/card-arrow.svg" alt="" width="9" height="4" />
			<div>ส.ว.</div>
			<img src="/law-watch/card-arrow.svg" alt="" width="9" height="4" />
			<div>ศาลรัฐธรรมนูญ</div>
			<img src="/law-watch/card-arrow.svg" alt="" width="9" height="4" />
			<div>กษัตริย์</div>
		</div>
		<span>ส.ส. วาระที่ 2</span>
		<section>
			<dl>
				<dd class="wv-font-semibold">หมวดกฎหมาย</dd>
				<dt>
					<div class="law-type-pill {LAW_TYPE_METADATA['บริหารราชการ'].color}">บริหารราชการ</div>
				</dt>
				<dd class="wv-font-semibold">
					<img src="/law-watch/calendar.svg" alt="" class="addon" />
					วันที่เสนอ
				</dd>
				<dt>8/8/2562</dt>
				<dd class="wv-font-semibold">
					<img src="/law-watch/calendar.svg" alt="" class="addon" />
					วันที่สิ้นสุด
				</dd>
				<dt>8/8/2562</dt>
				<dd class="wv-font-semibold">
					<img src="/law-watch/person.svg" alt="" class="addon" />
					ชื่อผู้เสนอ
				</dd>
				<dt>วราวุธ ศิลปอาชา กับคณะ</dt>
				<dd class="wv-font-semibold">
					<div class="addon" />
					ประเภทผู้เสนอ
				</dd>
				<dt>ผู้แทนพรรค</dt>
			</dl>
			<ul class="party wv-b7">
				<li>ชาติไทยพัฒนา</li>
				<li>เพื่อไทย</li>
				<li>พลังประชารัฐ</li>
				<li>อนาคตใหม่</li>
				<li>ประชาธิปไตยใหม่</li>
				<li>ไทยศรีวิไลย์</li>
				<li>พลังท้องถิ่นไทย</li>
				<li>ภูมิใจไทย</li>
			</ul>
		</section>
		<section class="theywork">
			<h4 class="wv-font-semibold">การโหวตในสภาผู้แทนราษฎรวาระล่าสุด</h4>
			<p>วาระ xxxxx</p>
			<div class="wv-font-kondolar wv-font-black wv-h10">50% ผ่าน</div>
			<div class="theywork-barchart" style="--total:120+100+12+10">
				<div class="bar" style="--bar-color:#1dc7a8;--bar-value:120" />
				<div class="bar" style="--bar-color:#e63a64;--bar-value:100" />
				<div class="bar" style="--bar-color:#aaa;--bar-value:12" />
				<div class="bar border" style="--bar-color:#fff;--bar-value:10" />
			</div>
			<ul class="theywork-chart-desc wv-b7">
				<li style="--bar-color:#1dc7a8">120 เห็นด้วย</li>
				<li style="--bar-color:#e63a64">100 ไม่เห็นด้วย</li>
				<li style="--bar-color:#aaa">12 งดออกเสียง</li>
				<li class="border" style="--bar-color:#fff">10 ไม่ลงคะแนน</li>
			</ul>
			<details>
				<summary>
					<span class="wv-font-semibold">
						<img src="/law-watch/checked.svg" alt="" width="12" height="12" />
						พรรคที่ให้ผ่าน
						<img class="caret" src="/law-watch/carets/db.svg" alt="" width="14" height="8" />
					</span>
				</summary>
				<ul class="theywork-ul wv-b7">
					<li>ชาติไทยพัฒนา</li>
					<li>เพื่อไทย</li>
					<li>พลังประชารัฐ</li>
					<li>อนาคตใหม่</li>
					<li>ประชาธิปไตยใหม่</li>
					<li>ไทยศรีวิไลย์</li>
					<li>พลังท้องถิ่นไทย</li>
					<li>ภูมิใจไทย</li>
				</ul>
			</details>
			<details>
				<summary>
					<span class="wv-font-semibold">
						<img src="/law-watch/cross.svg" alt="" width="12" height="12" />
						พรรคที่ไม่ให้ผ่าน
						<img class="caret" src="/law-watch/carets/db.svg" alt="" width="14" height="8" />
					</span>
				</summary>
				<ul class="theywork-ul wv-b7">
					<li>ชาติไทยพัฒนา</li>
					<li>เพื่อไทย</li>
					<li>พลังประชารัฐ</li>
					<li>อนาคตใหม่</li>
					<li>ประชาธิปไตยใหม่</li>
					<li>ไทยศรีวิไลย์</li>
					<li>พลังท้องถิ่นไทย</li>
					<li>ภูมิใจไทย</li>
				</ul>
			</details>
		</section>
	</div>
	<a href="#top" class="theywork-link wv-b6">
		ดูรายละเอียดการโหวตเพิ่มเติม
		<img src="/law-watch/external-link.svg" alt="" width="14" height="14" />
	</a>
</article>

<style lang="scss">
	.law-detail {
		position: fixed;
		inset: 0;
		left: unset;
		width: 300px;
		z-index: 20;

		padding: 32px 16px;

		background: #fff;
		color: #000;

		display: flex;
		flex-direction: column;
		gap: 8px;

		transform: translateX(100%);
		transition: transform 0.5s ease-in;

		&.open {
			transform: translateX(0);
			transition-timing-function: ease-out;
		}
	}

	header {
		display: flex;
	}

	.detail-wrapper {
		flex: 1 1 0;

		display: flex;
		flex-direction: column;
		gap: 8px;

		// Webkit Scrollbar
		margin-right: -6px;
		padding-right: 4px;

		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 2px;
		}

		&::-webkit-scrollbar-thumb {
			background: #00000040;
			border-radius: 1px;
		}

		@supports (-moz-appearance: none) {
			scrollbar-color: #00000040 #00000000;
			scrollbar-width: thin;
			margin-right: -12px;
			padding-right: 4px;
		}
	}

	.merged-doc {
		display: flex;
		align-items: center;
		justify-content: space-between;

		> button {
			border: none;
			background: rgba(0, 0, 0, 0);
			cursor: pointer;

			padding: 0;
			display: flex;
			align-items: center;
		}
	}

	.close-btn {
		width: 24px;
		height: 24px;
		flex: 0 0 24px;
		padding: 4px;
		margin-left: auto;

		border: none;
		background: transparent;
		cursor: pointer;
	}

	.timeline {
		display: flex;
		align-items: center;

		> div {
			border: 1px solid #000;
			padding: 0 4px;
			font-size: 0.625rem;
			text-align: center;

			&.active {
				background: #000;
				color: #fff;
			}
		}
	}

	.status {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		margin: 0;
		gap: 2px 8px;
	}

	.law-type-pill {
		padding: 0 8px;
		border-radius: 2px;
		background: var(--law-color);

		width: max-content;
	}

	.addon {
		width: 16px;
		height: 16px;
		margin-right: 8px;
		display: inline-block;
	}

	.party {
		columns: 2;
		list-style: none;
		margin: 2px 24px 0;

		> li::before {
			content: '•';
			margin: 0.5ch;
		}
	}

	.theywork {
		border: 1px dashed #000000;
		border-radius: 2px;
		padding: 8px;
		flex: 1 1 0;
	}

	.theywork-barchart {
		display: flex;
		height: 8px;
		margin-top: 8px;

		> .bar {
			background: var(--bar-color);
			flex: var(--bar-value) var(--bar-value) 0;

			&.border {
				border: 1px #000 solid;
			}
		}
	}

	.theywork-chart-desc {
		list-style: none;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;

		> li {
			display: flex;
			align-items: center;
			gap: 8px;

			&::before {
				content: '';
				display: block;
				background: var(--bar-color);
				width: 8px;
				height: 8px;
			}

			&.border::before {
				border: 1px #000 solid;
			}
		}
	}

	details {
		margin: 8px 0;

		> summary {
			cursor: pointer;
			list-style: none;

			&::-webkit-details-marker {
				display: none;
			}

			> span {
				display: flex;
				align-items: center;
				width: 100%;
				gap: 4px;

				> .caret {
					margin-left: auto;
				}
			}
		}

		&[open] .caret {
			transform: rotate(180deg);
		}
	}

	.theywork-ul {
		columns: 2;
		list-style: none;

		> li::before {
			content: '•';
			margin: 0.5ch;
		}
	}

	.theywork-link {
		background: #fff;
		border: 1px solid #000;
		box-shadow: 2px 2px 0px #000;
		border-radius: 2px;

		padding: 10px;

		cursor: pointer;

		color: #000;
		text-decoration: none;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
	}

	@media (max-width: 767.5px) {
		.law-detail {
			inset: 12px 14px;
			width: auto;

			transform: translateY(100vh);

			&.open {
				transform: translateY(0);
			}
		}
	}
</style>
