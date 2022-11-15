<script lang="ts">
	import { current_section, jumpTo } from 'stores/sectionScrollManager';

	const prev = () => {
		const prev_index = $current_section - 1;
		if (prev_index < 0) jumpTo(0);
		else jumpTo(prev_index as 0 | 1 | 2);
	};

	const next = () => {
		const next_index = $current_section + 1;
		if (next_index > 3) jumpTo(3);
		else jumpTo(next_index as 1 | 2 | 3);
	};
</script>

<aside class="navigator">
	<button type="button" title="กลับพาร์ทก่อนหน้า" on:click={prev} disabled={$current_section === 0}>
		<img
			src="/law-watch/carets/uw.svg"
			alt="กลับพาร์ทก่อนหน้า"
			width="14"
			height="8"
			loading="lazy"
			decoding="async"
		/>
	</button>
	<ul>
		<li class="wv-b5" class:current={$current_section === 0}>
			<a class="f" href="#importance-section"
				><span class="text">ความสำคัญ</span>
				<span class="indicator" /></a
			>
		</li>
		<li class="wv-b5" class:current={$current_section === 1}>
			<a class="f" href="#process-section"
				><span class="text">ขั้นตอนการเสนอ</span>
				<span class="indicator" /></a
			>
		</li>
		<li class="wv-b5" class:current={$current_section === 2}>
			<a class="f" href="#investigate-section">
				<span class="text">สำรวจ</span>
				<span class="indicator" />
			</a>
		</li>
		<li class="wv-b5" class:current={$current_section === 3}>
			<a class="f" href="#conclusion-section">
				<span class="text">บทสรุป</span>
				<span class="indicator" />
			</a>
		</li>
	</ul>
	<button type="button" title="ไปพาร์ทถัดไป" on:click={next} disabled={$current_section === 3}>
		<img
			src="/law-watch/carets/dw.svg"
			alt="ไปพาร์ทถัดไป"
			width="14"
			height="8"
			loading="lazy"
			decoding="async"
		/>
	</button>
</aside>

<style lang="scss">
	.navigator {
		display: none;

		@media (min-width: 768px) {
			position: sticky;
			top: 48px;
			margin: 48px 48px calc(-128px - 48px) auto;
			width: max-content;
			z-index: 10;

			text-align: right;

			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}
	}

	.navigator > button {
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		line-height: 0;
		display: block;
		transition: opacity 0.3s;
		height: 14px;

		&[disabled] {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}

	.navigator > ul {
		list-style: none;
		margin: 0;

		> li {
			line-height: 1;
			margin: 8px 0;

			> a {
				justify-content: flex-end;
				gap: 12px;

				color: #fff;
				text-decoration: none;

				> .text {
					opacity: 0;
					transition: opacity 0.3s;
				}

				> .indicator {
					display: block;
					width: 8px;
					height: 8px;
					border: 1px solid #a5ebd7;
					border-radius: 4px;
					margin-right: 3px;

					transition: background 0.3s;
				}
			}
		}

		> li:is(.current, :hover) > a > .indicator {
			background: #a5ebd7;
		}
	}

	.navigator > ul:hover {
		> li > a > .text {
			opacity: 0.5;
		}

		> li:is(.current, :hover) > a > .text {
			opacity: 1;
		}
	}
</style>
