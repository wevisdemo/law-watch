<script lang="ts">
	import { tick } from 'svelte';
	import { isParty, getPartyImage } from 'data/parties';
	import type { DropdownChoiceType } from 'data/filter-choices';

	export let label_image: string | null = null;
	export let label = 'แบ่งกลุ่มตาม';
	export let choices: readonly DropdownChoiceType[] = [
		'ไม่แบ่งกลุ่ม',
		'ฝ่ายที่เสนอร่างกฎหมาย',
		'พรรคที่เสนอร่างกฎหมาย',
		'ผลโหวตของพรรค'
	];
	export let current_choice = typeof choices[0] === 'string' ? choices[0] : choices[0].text;

	let el_list: HTMLElement;
	let is_list_opened = false;
	const toggleSelect = () => {
		is_list_opened = !is_list_opened;
	};

	const closeSelect = () => {
		is_list_opened = false;
	};

	const selectChoice = (choice: DropdownChoiceType) => () => {
		if (typeof choice !== 'string') {
			if (choice.readonly) return;
			current_choice = choice.text;
		} else {
			current_choice = choice;
		}
		closeSelect();
	};

	const selectChoiceKbd = (choice: DropdownChoiceType) => (event: KeyboardEvent) => {
		const el = event.target as HTMLElement;
		const parent = el.parentElement as HTMLElement;
		const siblings = Array.from(parent.children) as HTMLElement[];
		const index = siblings?.indexOf(el);
		if (event.key === 'Enter') {
			event.preventDefault();
			parent.focus();
			selectChoice(choice)();
			return false;
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			siblings[index + 1]?.focus();
			return false;
		}
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			siblings[index - 1]?.focus();
			return false;
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			parent.focus();
			closeSelect();
			return false;
		}
		if (event.key !== 'Tab') {
			event.preventDefault();
			return false;
		}
	};

	const selectKeyManager = (event: KeyboardEvent) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			is_list_opened = true;
			tick().then(() => {
				(el_list.children[0] as HTMLElement).focus();
			});
			return false;
		}
	};

	export let highlight = false;
	export let menu_z = 4;

	let clazz = '';
	export { clazz as class };
</script>

<div class="dropdown-container {clazz}" class:highlight>
	<span id="dropdown-{label}-label" class="select-label wv-b7">
		{#if label_image}
			<img src={label_image} alt="" width="12" height="12" loading="lazy" decoding="async" />
		{/if}
		{label}
	</span>
	<button
		type="button"
		class="select-control wv-font-anuphan wv-b7"
		tabindex="0"
		on:click={toggleSelect}
		on:keydown={selectKeyManager}
		id="dropdown-{label}-button"
		aria-labelledby="dropdown-{label}-label dropdown-{label}-button"
		aria-haspopup="listbox"
	>
		{#if isParty(current_choice)}
			<img
				class="party-image"
				src={getPartyImage(current_choice)}
				alt={current_choice}
				width="20"
				height="20"
				loading="lazy"
				decoding="async"
			/>
		{/if}
		{current_choice}
		<img
			class="select-arrow"
			src="/law-watch/carets/dw.svg"
			alt=""
			width="14"
			height="8"
			loading="lazy"
			decoding="async"
		/>
	</button>
</div>
<div class="list-container" style="z-index:{menu_z}">
	<ul
		bind:this={el_list}
		class="select-list"
		class:open={is_list_opened}
		role="listbox"
		aria-labelledby="dropdown-{label}-label"
		aria-activedescendant="dropdown-{label}-{current_choice}"
	>
		{#each choices as choice}
			{#if typeof choice !== 'string'}
				{#if choice.readonly}
					<li
						class="wv-b7 select-list-option readonly"
						class:bold={choice.bold}
						class:border={choice.border}
						id="dropdown-{label}-{choice.text}"
					>
						{choice.text}
					</li>
				{:else}
					<li
						class="wv-b7 select-list-option"
						class:bold={choice.bold}
						class:border={choice.border}
						on:click={selectChoice(choice)}
						on:keydown={selectChoiceKbd(choice)}
						role="option"
						aria-selected={current_choice === choice.text}
						id="dropdown-{label}-{choice.text}"
						tabindex={is_list_opened ? 0 : -1}
					>
						{#if choice.image}
							<img
								class="party-image"
								src={choice.image}
								alt={choice.text}
								width="20"
								height="20"
								loading="lazy"
								decoding="async"
							/>
						{/if}
						{choice.text}
					</li>
				{/if}
			{:else}
				<li
					class="wv-b7 select-list-option"
					on:click={selectChoice(choice)}
					on:keydown={selectChoiceKbd(choice)}
					role="option"
					aria-selected={current_choice === choice}
					id="dropdown-{label}-{choice}"
					tabindex={is_list_opened ? 0 : -1}
				>
					{choice}
				</li>
			{/if}
		{/each}
	</ul>
</div>

<style lang="scss">
	.select-label {
		display: flex;
		gap: 4px;
		align-items: center;
		margin-bottom: 8px;
	}

	.select-control {
		background: #000;
		border: 1px solid #fff;
		color: #fff;

		padding: 8px 16px;
		height: 40px;

		display: flex;
		align-items: center;
		width: 100%;

		user-select: none;
		cursor: pointer;

		&:focus-visible {
			outline: none;
			border-radius: 0;
			box-shadow: 0 0 0 1px #000, 0 0 0 2px #fff;
		}
	}

	.select-arrow {
		margin-left: auto;
	}

	.list-container {
		margin-bottom: -8px;

		@media (min-width: 768px) {
			margin-bottom: -14px;
		}
	}

	.select-list {
		border: 1px solid #fff;
		position: absolute;
		top: 0;
		width: 100%;
		background: #000;
		display: none;
		margin: 0;
		list-style: none;

		max-height: 30vh;
		overflow-y: auto;
		scrollbar-width: thin;
	}

	.select-list.open {
		display: block;
	}

	.select-list-option {
		height: 40px;
		padding: 8px 16px;

		display: flex;
		align-items: center;

		user-select: none;
		cursor: pointer;

		&.border {
			border-top: 1px #fff dashed;
		}

		&.bold {
			font-weight: 600;
		}

		&.readonly {
			cursor: auto;
			pointer-events: none;
		}

		&:not(.readonly):hover,
		&:not(.readonly):focus-visible {
			background: #fff;
			color: #000;
			outline: none;
		}
	}

	.party-image {
		width: 20px;
		height: 20px;

		border: 1px solid #000000;
		border-radius: 50%;
		margin-right: 8px;
	}

	.highlight {
		z-index: 3;
	}
</style>
