<script lang="ts">
	import type { RawDataType } from 'data/data-types';
	import { LAW_TYPE_METADATA } from 'data/law-types';
	import { data } from 'data/raw-data';
	import { votelog } from 'data/votelog';

	import { textTypeToPaperType } from 'components/lawvis/utils';
	import Paper from 'components/papers/StaticPaper.svelte';

	import { current_selected_paper_id } from 'stores/paperHighlightStore';
	import { current_section } from 'stores/sectionScrollManager';

	const date_formatter = new Intl.DateTimeFormat('th-TH', {
		dateStyle: 'medium'
	});
	const formatDate = (date: number | null | undefined) => {
		if (!date) return 'ไม่พบข้อมูล';
		return date_formatter.format(new Date(date));
	};

	const formatDuration = (duration: number) => {
		if (duration < 365) return `${duration} วัน`;
		let year = 0;
		switch (true) {
			case (year++, (duration -= 365)) < 366:
				break;
			case (year++, (duration -= 366)) < 365:
				break;
			default:
				year++;
				duration -= 365;
		}
		return `${year} ปี ${duration} วัน`;
	};

	let open_sidebar = false;

	let current_law_index = 0;
	let relative_law: RawDataType[] = [];
	$: if ($current_selected_paper_id) {
		relative_law = data
			.filter(
				(e) => e.Law_ID === $current_selected_paper_id || e.Law_Merge === $current_selected_paper_id
			)
			.sort((a, z) => {
				const a_head_val = +a.Law_Merge_Head;
				const z_head_val = +z.Law_Merge_Head;
				if (a_head_val === z_head_val) return a.Law_ID - z.Law_ID;
				return z_head_val - a_head_val;
			});
		current_law_index = 0;
		open_sidebar = true;
	}

	const nextLaw = () => {
		current_law_index = (current_law_index + 1) % relative_law.length;
	};

	const prevLaw = () => {
		current_law_index = (current_law_index + relative_law.length - 1) % relative_law.length;
	};

	const close = () => {
		open_sidebar = false;
		$current_selected_paper_id = null;
	};

	$: votelog_data = relative_law[current_law_index]?.VoteLog_ID
		? votelog[relative_law[current_law_index]?.VoteLog_ID ?? ''] ?? null
		: null;

	$: if ($current_section !== 2 && open_sidebar) {
		close();
	}
</script>

<article class="law-detail wv-b6" class:open={open_sidebar}>
	<header>
		<h3 class="wv-font-semibold wv-h10">{relative_law[current_law_index]?.Law_Name}</h3>
		<button type="button" class="close-btn" on:click={close}>
			<img
				src="/law-watch/card-close.svg"
				alt="ปิด"
				width="16"
				height="16"
				loading="lazy"
				decoding="async"
			/>
		</button>
	</header>
	<div class="detail-wrapper">
		<div class="status">
			<span class="wv-font-semibold" style="line-height:1">สถานะกฎหมาย</span>
			<Paper
				noMargin
				type={textTypeToPaperType(relative_law[0]?.Law_Status ?? '')}
				stacked={!!relative_law[current_law_index]?.Law_Merge}
				small
				style="display:inline-block;margin-left:4px"
			/>
			<span style="line-height:1">{relative_law[current_law_index]?.Law_Status}</span>
		</div>
		{#if relative_law[0]?.Law_Status !== 'ออกเป็นกฎหมาย'}
			<div class="timeline">
				<div class:active={relative_law[current_law_index]?.Law_Stage === 'ร่างกฎหมาย'}>
					ร่างกฎหมาย
				</div>
				<img
					src="/law-watch/card-arrow.svg"
					alt=""
					width="10"
					height="4"
					loading="lazy"
					decoding="async"
				/>
				<div class:active={relative_law[current_law_index]?.Law_Stage === 'ส.ส.'}>ส.ส.</div>
				<img
					src="/law-watch/card-arrow.svg"
					alt=""
					width="10"
					height="4"
					loading="lazy"
					decoding="async"
				/>
				<div class:active={relative_law[current_law_index]?.Law_Stage === 'ส.ว.'}>ส.ว.</div>
				<img
					src="/law-watch/card-arrow.svg"
					alt=""
					width="10"
					height="4"
					loading="lazy"
					decoding="async"
				/>
				<div class:active={relative_law[current_law_index]?.Law_Stage === 'ศาลรัฐธรรมนูญ'}>
					ศาลรัฐธรรมนูญ
				</div>
				<img
					src="/law-watch/card-arrow.svg"
					alt=""
					width="10"
					height="4"
					loading="lazy"
					decoding="async"
				/>
				<div class:active={relative_law[current_law_index]?.Law_Stage === 'กษัตริย์'}>กษัตริย์</div>
			</div>
		{/if}
		<span>{relative_law[current_law_index]?.Status_Description}</span>
		{#if relative_law.length > 1}
			<hr />
			<div class="merged-doc">
				<button type="button" on:click={prevLaw}>
					<img
						src="/law-watch/carets/lb.svg"
						alt="ดูฉบับก่อนหน้า"
						width="8"
						height="14"
						loading="lazy"
						decoding="async"
					/>
				</button>
				<span>ดูร่างกฎหมายอื่นที่ถูกรวมร่าง {current_law_index + 1}/{relative_law.length} ฉบับ</span
				>
				<button type="button" on:click={nextLaw}>
					<img
						src="/law-watch/carets/rb.svg"
						alt="ดูฉบับถัดไป"
						width="8"
						height="14"
						loading="lazy"
						decoding="async"
					/>
				</button>
			</div>
			<hr />
		{/if}
		<section>
			<dl>
				<dt class="wv-font-semibold">หมวดกฎหมาย</dt>
				<dd>
					<div
						class="law-type-pill {LAW_TYPE_METADATA[
							relative_law[current_law_index]?.Law_Type ?? 'กระบวนการยุติธรรม'
						].color}"
					>
						{relative_law[current_law_index]?.Law_Type}
					</div>
				</dd>
				{#if relative_law[current_law_index]?.Date_Diff}
					<dt class="wv-font-semibold">
						<img
							src="/law-watch/calendar.svg"
							alt=""
							width="16"
							height="16"
							class="addon"
							loading="lazy"
							decoding="async"
						/>
						รวมระยะเวลา
					</dt>
					<dd>{formatDuration(relative_law[current_law_index]?.Date_Diff ?? 0)}</dd>
				{/if}
				<dt class="wv-font-semibold">
					{#if relative_law[current_law_index]?.Date_Diff}
						<div class="addon" />
					{:else}
						<img
							src="/law-watch/calendar.svg"
							alt=""
							width="16"
							height="16"
							class="addon"
							loading="lazy"
							decoding="async"
						/>
					{/if}
					วันที่เสนอ
				</dt>
				<dd>{formatDate(relative_law[current_law_index]?.Start_Date)}</dd>
				<dt class="wv-font-semibold">
					<div class="addon" />
					วันที่สิ้นสุด
				</dt>
				<dd>{formatDate(relative_law[current_law_index]?.End_Date)}</dd>

				<dt class="wv-font-semibold">
					<img
						src="/law-watch/person.svg"
						alt=""
						class="addon"
						width="16"
						height="16"
						loading="lazy"
						decoding="async"
					/>
					ชื่อผู้เสนอ
				</dt>
				<dd>{relative_law[current_law_index]?.Proposer_Name}</dd>
				<dt class="wv-font-semibold">
					<div class="addon" />
					ประเภทผู้เสนอ
				</dt>
				<dd>{relative_law[current_law_index]?.Proposer_Type}</dd>
			</dl>
			{#if relative_law[current_law_index]?.Proposer_Party?.length}
				<ul class="party wv-b7">
					{#each relative_law[current_law_index]?.Proposer_Party as party}
						<li>{party}</li>
					{/each}
				</ul>
			{/if}
		</section>
	</div>
	{#if votelog_data}
		<section class="theywork">
			<h4 class="wv-font-semibold">การโหวตในสภาผู้แทนราษฎรวาระล่าสุด</h4>
			<p>วาระที่ {relative_law[current_law_index]?.VoteLog_Term}</p>
			<div class="wv-font-kondolar wv-font-black wv-h10">
				{Math.floor((votelog_data.approve / votelog_data.total_voter) * 100)}% ผ่าน
			</div>
			<div class="theywork-barchart" style="--total:{votelog_data.total_people}">
				<div class="bar" style="--bar-color:#1dc7a8;--bar-value:{votelog_data.approve}" />
				<div class="bar" style="--bar-color:#e63a64;--bar-value:{votelog_data.disprove}" />
				<div class="bar" style="--bar-color:#aaa;--bar-value:{votelog_data.abstained}" />
				<div class="bar border" style="--bar-color:#fff;--bar-value:{votelog_data.absent}" />
			</div>
			<ul class="theywork-chart-desc wv-b7">
				<li style="--bar-color:#1dc7a8">{votelog_data.approve} เห็นด้วย</li>
				<li style="--bar-color:#e63a64">{votelog_data.disprove} ไม่เห็นด้วย</li>
				<li style="--bar-color:#aaa">{votelog_data.abstained} งดออกเสียง</li>
				<li class="border" style="--bar-color:#fff">{votelog_data.absent} ไม่ลงคะแนน</li>
			</ul>
		</section>
		<a
			href="https://theyworkforus.wevis.info/votelog/{votelog_data.id}"
			class="theywork-link wv-b6"
		>
			ดูรายละเอียดการโหวตเพิ่มเติม
			<img
				src="/law-watch/external-link.svg"
				alt=""
				width="14"
				height="14"
				loading="lazy"
				decoding="async"
			/>
		</a>
	{/if}
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
		transition: transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);

		&.open {
			transform: translateX(0);
			transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
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

		margin-right: -6px;
		padding-right: 4px;

		overflow-y: scroll;
		overscroll-behavior: contain;

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

	hr {
		border: none;
		border-top: 1px #000 solid;
	}

	.merged-doc {
		display: flex;
		align-items: center;
		justify-content: space-between;

		> button {
			border: none;
			background: transparent;
			cursor: pointer;

			padding: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 14px;
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
			border-bottom: 1px solid transparent;
			padding: 1px 4px 0;

			font-size: 0.625rem;
			font-weight: 600;
			text-align: center;

			opacity: 0.5;

			&.active {
				border-bottom-color: #000;
				font-weight: 700;
				opacity: 1;
			}
		}
	}

	.status {
		display: flex;
		align-items: center;
		gap: 4px;

		padding: 8px;
		background: #000;
		color: #fff;
	}

	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 0;
		gap: 2px 8px;
	}

	dt {
		display: flex;
		align-items: center;
		margin-bottom: auto;
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

		> li {
			text-indent: -1.2ch;
			margin-left: 1.2ch;

			&::before {
				content: '•';
				margin-right: 0.5ch;
			}
		}
	}

	.theywork {
		border: 1px dashed #000000;
		border-radius: 2px;
		padding: 8px;
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
			padding: 16px 16px;
			inset: 12px 14px;
			width: auto;

			transform: translateX(100vw);

			&.open {
				transform: translateX(0);
			}
		}
	}
</style>
