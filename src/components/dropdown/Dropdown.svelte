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
	export let choices: ChoiceType[] = [
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
		class="select-control wv-b7"
		tabindex="0"
		on:click={toggleSelect}
		id="dropdown-{label}-button"
		aria-labelledby="dropdown-{label}-label dropdown-{label}-button"
		aria-haspopup="listbox"
	>
		{current_choice}
		<svg
			class="select-arrow"
			width="14"
			height="8"
			viewBox="0 0 14 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M13.354 0.645917C13.4006 0.692363 13.4375 0.747538 13.4627 0.808283C13.4879 0.869029 13.5009 0.93415 13.5009 0.999917C13.5009 1.06568 13.4879 1.13081 13.4627 1.19155C13.4375 1.2523 13.4006 1.30747 13.354 1.35392L7.35402 7.35392C7.30757 7.40048 7.2524 7.43742 7.19165 7.46263C7.13091 7.48784 7.06579 7.50081 7.00002 7.50081C6.93425 7.50081 6.86913 7.48784 6.80839 7.46263C6.74764 7.43742 6.69247 7.40048 6.64602 7.35392L0.646021 1.35392C0.552135 1.26003 0.49939 1.13269 0.49939 0.999917C0.49939 0.867141 0.552135 0.739803 0.646021 0.645916C0.739907 0.55203 0.867245 0.499285 1.00002 0.499285C1.1328 0.499285 1.26013 0.55203 1.35402 0.645916L7.00002 6.29292L12.646 0.645917C12.6925 0.599354 12.7476 0.562411 12.8084 0.537204C12.8691 0.511998 12.9343 0.499023 13 0.499023C13.0658 0.499023 13.1309 0.511998 13.1917 0.537204C13.2524 0.562411 13.3076 0.599354 13.354 0.645917Z"
				fill="white"
			/>
		</svg>
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
