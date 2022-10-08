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
		<svg
			aria-label="กลับพาร์ทก่อนหน้า"
			width="14"
			height="8"
			viewBox="0 0 14 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0.646161 7.35392C0.599598 7.30747 0.562655 7.2523 0.537449 7.19155C0.512242 7.13081 0.499268 7.06569 0.499268 6.99992C0.499268 6.93415 0.512242 6.86903 0.537449 6.80828C0.562655 6.74754 0.599598 6.69236 0.646161 6.64592L6.64616 0.645917C6.69261 0.599354 6.74778 0.562411 6.80853 0.537205C6.86927 0.511998 6.93439 0.499023 7.00016 0.499023C7.06593 0.499023 7.13105 0.511998 7.19179 0.537205C7.25254 0.562411 7.30771 0.599354 7.35416 0.645917L13.3542 6.64592C13.448 6.7398 13.5008 6.86714 13.5008 6.99992C13.5008 7.13269 13.448 7.26003 13.3542 7.35392C13.2603 7.4478 13.1329 7.50055 13.0002 7.50055C12.8674 7.50055 12.74 7.4478 12.6462 7.35392L7.00016 1.70692L1.35416 7.35392C1.30772 7.40048 1.25254 7.43742 1.1918 7.46263C1.13105 7.48784 1.06593 7.50081 1.00016 7.50081C0.934394 7.50081 0.869273 7.48784 0.808528 7.46263C0.747783 7.43742 0.692607 7.40048 0.646161 7.35392Z"
				fill="white"
			/>
		</svg>
	</button>
	<ul>
		<li class="wv-font-anuphan wv-b5" class:current={$current_section === 0}>
			<a href="#importance-section"
				><span class="text">ความสำคัญ</span>
				<span class="indicator" /></a
			>
		</li>
		<li class="wv-font-anuphan wv-b5" class:current={$current_section === 1}>
			<a href="#process-section"
				><span class="text">ขั้นตอนการเสนอ</span>
				<span class="indicator" /></a
			>
		</li>
		<li class="wv-font-anuphan wv-b5" class:current={$current_section === 2}>
			<a href="#investigate-section">
				<span class="text">สำรวจ</span>
				<span class="indicator" />
			</a>
		</li>
		<li class="wv-font-anuphan wv-b5" class:current={$current_section === 3}>
			<a href="#conclusion-section">
				<span class="text">บทสรุป</span>
				<span class="indicator" />
			</a>
		</li>
	</ul>
	<button type="button" title="ไปพาร์ทถัดไป" on:click={next} disabled={$current_section === 3}>
		<svg
			aria-label="ไปพาร์ทถัดไป"
			width="14"
			height="8"
			viewBox="0 0 14 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M13.3541 1.04582C13.4007 1.09226 13.4376 1.14744 13.4629 1.20819C13.4881 1.26893 13.501 1.33405 13.501 1.39982C13.501 1.46559 13.4881 1.53071 13.4629 1.59145C13.4376 1.6522 13.4007 1.70737 13.3541 1.75382L7.35414 7.75382C7.3077 7.80038 7.25252 7.83733 7.19178 7.86253C7.13103 7.88774 7.06591 7.90071 7.00014 7.90071C6.93437 7.90071 6.86925 7.88774 6.80851 7.86253C6.74776 7.83733 6.69259 7.80038 6.64614 7.75382L0.646143 1.75382C0.552257 1.65993 0.499512 1.53259 0.499512 1.39982C0.499512 1.26704 0.552257 1.13971 0.646143 1.04582C0.740029 0.951932 0.867367 0.899187 1.00014 0.899187C1.13292 0.899187 1.26026 0.951932 1.35414 1.04582L7.00014 6.69282L12.6461 1.04582C12.6926 0.999256 12.7478 0.962313 12.8085 0.937107C12.8693 0.9119 12.9344 0.898926 13.0001 0.898926C13.0659 0.898926 13.131 0.9119 13.1918 0.937107C13.2525 0.962313 13.3077 0.999256 13.3541 1.04582Z"
				fill="white"
			/>
		</svg>
	</button>
</aside>

<style lang="scss">
	.navigator {
		position: sticky;
		top: 73px;
		margin: 73px 44px calc(-128px - 73px) auto;
		width: max-content;
		z-index: 999;

		text-align: right;

		display: flex;
		flex-direction: column;
		align-items: flex-end;
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
				display: flex;
				align-items: center;
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

			&:nth-child(2) > a > .text {
				transition-delay: 0.1s;
			}

			&:nth-child(3) > a > .text {
				transition-delay: 0.2s;
			}

			&:nth-child(4) > a > .text {
				transition-delay: 0.3s;
			}
		}

		> li.current > a > .indicator {
			background: #a5ebd7;
		}
	}

	.navigator > ul:hover {
		> li > a > .text {
			opacity: 1;
		}
	}
</style>
