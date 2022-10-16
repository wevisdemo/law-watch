<script lang="ts">
	type ChoiceType =
		| string
		| {
				text: string;
				border?: boolean;
				bold?: boolean;
				image?: string;
		  };

	export let label_image: string | null = null;
	export let label = 'แบ่งกลุ่มตาม';
	export let choices: readonly ChoiceType[] = [
		'ไม่แบ่งกลุ่ม',
		'ฝ่ายที่เสนอร่าง',
		'พรรคที่เสนอร่าง',
		'ผลโหวตของพรรค'
	];
	export let current_choice = choices[0];

	let el_list: HTMLElement;
	let is_list_opened = false;
	const toggleSelect = () => {
		is_list_opened = !is_list_opened;
	};

	const closeSelect = () => {
		is_list_opened = false;
	};

	const selectChoice = (choice: string) => () => {
		current_choice = choice;
		closeSelect();
	};

	const selectChoiceKbd = (choice: string) => (event: KeyboardEvent) => {
		if (event.key === 'Enter') return selectChoice(choice)();
		if (event.key === 'Tab') return;
		event.preventDefault();
		return false;
	};
</script>

<div class="dropdown-container">
	<span id="dropdown-{label}-label" class="select-label wv-b7">
		{#if label_image}
			<img src={label_image} alt="" width="12" height="12" />
		{/if}
		{label}
	</span>
	<button
		type="button"
		class="select-control wv-font-anuphan wv-b7"
		tabindex="0"
		on:click={toggleSelect}
		id="dropdown-{label}-button"
		aria-labelledby="dropdown-{label}-label dropdown-{label}-button"
		aria-haspopup="listbox"
	>
		{current_choice}
		<img class="select-arrow" src="/law-watch/carets/dw.svg" alt="" width="14" height="8" />
	</button>
	<ul
		bind:this={el_list}
		class="select-list"
		class:open={is_list_opened}
		role="listbox"
		aria-labelledby="dropdown-{label}-label"
		aria-activedescendant="dropdown-{label}-{current_choice}"
	>
		{#each choices as choice}
			<li
				class="wv-b7 select-list-option"
				class:bold={typeof choice !== 'string' && choice.bold}
				class:border={typeof choice !== 'string' && choice.border}
				on:click={selectChoice(typeof choice === 'string' ? choice : choice.text)}
				on:keydown={selectChoiceKbd(typeof choice === 'string' ? choice : choice.text)}
				role="option"
				aria-selected={current_choice === (typeof choice === 'string' ? choice : choice.text)}
				id="dropdown-{label}-{typeof choice === 'string' ? choice : choice.text}"
				tabindex={is_list_opened ? 0 : -1}
			>
				{typeof choice === 'string' ? choice : choice.text}
			</li>
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
	}

	.select-arrow {
		margin-left: auto;
	}

	.select-list {
		border: 1px solid #fff;
		position: absolute;
		top: calc(100% + 14px);
		width: 100%;
		background: #000;
		z-index: 5;
		display: none;
		margin: 0;
		list-style: none;
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
			border-bottom: 1px #fff dashed;
		}

		&.bold {
			font-weight: 600;
		}

		&:hover,
		&:focus {
			background: #fff;
			color: #000;
			outline: none;
		}
	}
</style>
