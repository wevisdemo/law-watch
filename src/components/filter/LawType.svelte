<script lang="ts">
	import type { LawTypes } from 'data/law-types';
	import { LAW_TYPES, LAW_TYPE_METADATA } from 'data/law-types';
	import { stats } from 'data/generated/stats';

	import { law_type_highlight } from 'stores/highlightManager';

	const GROUP_ORDER: LawTypes[] = [...LAW_TYPES];

	export let group: Record<LawTypes, number> = stats.type_len;

	export let selected_law: LawTypes[];

	let clazz = '';
	export { clazz as class };
</script>

<div class={clazz} class:highlight={$law_type_highlight}>
	<div class="header wv-font-semibold wv-b6">หมวดหมู่กฎหมาย</div>
	<div class="law-group-selector">
		{#each GROUP_ORDER as name (name)}
			<input
				class="law-group-radio"
				id="law-group-{name}"
				type="checkbox"
				bind:group={selected_law}
				value={name}
			/>
			<label class="law-group-label {LAW_TYPE_METADATA[name].color}" for="law-group-{name}">
				<span class="wv-b6">{name} ({group[name]})</span>
			</label>
		{/each}
	</div>
</div>

<style lang="scss">
	.header {
		margin-bottom: 8px;
	}

	.law-group-selector {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.law-group-radio {
		position: absolute;
		clip: rect(0, 0, 0, 0);
		pointer-events: none;
	}

	.law-group-label {
		padding: 1px 8px;
		border-radius: 2px;

		display: flex;

		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;

		background: rgba(var(--law-color), 0);
		border: 1px var(--law-color) solid;
		color: var(--law-color);

		transition-property: color, background;
		transition-duration: 0.1s;
	}

	.law-group-radio:checked + .law-group-label {
		background: var(--law-color);
		color: #000;
	}

	.law-group-radio:focus-visible + .law-group-label {
		box-shadow: 0 0 0 1px #000, 0 0 0 2px var(--law-color);
	}

	.highlight {
		z-index: 2;
	}
</style>
