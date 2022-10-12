<script context="module" lang="ts">
	export type GROUP_NAME =
		| 'บริหารราชการ'
		| 'การศึกษา'
		| 'เศรษฐกิจ'
		| 'สังคม'
		| 'สิ่งแวดล้อม'
		| 'กระบวนการยุติธรรม'
		| 'รัฐธรรมนูญ';
</script>

<script lang="ts">
	const GROUP_COLOR: Record<GROUP_NAME, string> = {
		บริหารราชการ: 'blue',
		การศึกษา: 'sky',
		เศรษฐกิจ: 'yellow',
		สังคม: 'orange',
		สิ่งแวดล้อม: 'green',
		กระบวนการยุติธรรม: 'red',
		รัฐธรรมนูญ: 'magenta'
	};

	export let group: Record<GROUP_NAME, number> = {
		เศรษฐกิจ: 20,
		สังคม: 20,
		สิ่งแวดล้อม: 20,
		การศึกษา: 20,
		บริหารราชการ: 20,
		รัฐธรรมนูญ: 20,
		กระบวนการยุติธรรม: 20
	};

	export let selected_law: GROUP_NAME[];
</script>

<div class="header wv-font-semibold wv-font-anuphan wv-b6">หมวดหมู่กฎหมาย</div>
<div class="law-group-selector">
	{#each Object.entries(group) as [name, amount] (name)}
		<input
			class="law-group-radio"
			id="law-group-{name}"
			type="checkbox"
			bind:group={selected_law}
			value={name}
		/>
		<!-- @ts-expect-error -->
		<label class="law-group-label {GROUP_COLOR[name]}" for="law-group-{name}">
			<span class="wv-b6">{name} ({amount})</span>
		</label>
	{/each}
</div>

<style lang="scss">
	.header {
		margin-bottom: 8px;
	}

	.law-group-selector {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;

		width: 320px;
	}

	.law-group-radio {
		display: none;
	}

	.law-group-label {
		padding: 1px 8px;
		border-radius: 2px;

		display: flex;

		cursor: pointer;
		user-select: none;

		background: rgba(var(--group-color), 0);
		border: 1px var(--group-color) solid;
		color: var(--group-color);

		transition-property: color, background;
		transition-duration: 0.3s;
	}

	.law-group-radio:checked + .law-group-label {
		background: var(--group-color);
		color: #000;
	}

	.blue {
		--group-color: #676dff;
	}

	.sky {
		--group-color: #9feeff;
	}

	.yellow {
		--group-color: #fff173;
	}

	.orange {
		--group-color: #ff8a00;
	}

	.green {
		--group-color: #1dc775;
	}

	.red {
		--group-color: #ff3767;
	}

	.magenta {
		--group-color: #d252ff;
	}
</style>
