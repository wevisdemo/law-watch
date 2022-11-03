<script lang="ts">
	import { expand_timeline } from 'stores/timelineOptionStore';

	const expand = () => {
		$expand_timeline = true;
	};

	const collapse = () => {
		$expand_timeline = false;
	};
</script>

<div class="timeline-collapse">
	<button class="collapse-btn" class:active={$expand_timeline} type="button" on:click={expand}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16" width="10" height="16">
			<path
				fill="currentColor"
				d="M4.49.796a.547.547 0 00-.177.118L.16 5.067a.546.546 0 10.773.773l3.766-3.767L8.465 5.84a.547.547 0 10.773-.773L5.086.914A.546.546 0 004.49.796zM4.49 15.204a.547.547 0 01-.177-.118L.16 10.933a.547.547 0 01.773-.773l3.766 3.767 3.766-3.767a.548.548 0 01.892.177.546.546 0 01-.119.596l-4.152 4.153a.546.546 0 01-.596.118z"
			/>
		</svg>
	</button>
	<button
		class="collapse-btn right"
		class:active={!$expand_timeline}
		type="button"
		on:click={collapse}
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14" width="10" height="14">
			<path
				fill="currentColor"
				d="M4.49 5.458a.547.547 0 01-.177-.118L.16 1.187A.546.546 0 11.933.414l3.766 3.767L8.465.414a.547.547 0 11.773.773L5.086 5.34a.546.546 0 01-.596.118z"
			/>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M.7 7a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 01.7 7z"
				clip-rule="evenodd"
			/>
			<path
				fill="currentColor"
				d="M4.49 8.542a.547.547 0 00-.177.118L.16 12.813a.547.547 0 10.773.773l3.766-3.767 3.766 3.767a.548.548 0 00.892-.177.546.546 0 00-.119-.596L5.086 8.66a.546.546 0 00-.596-.118z"
			/>
		</svg>
	</button>
</div>

<style lang="scss">
	.timeline-collapse {
		margin-right: 48px;

		display: flex;
	}

	.collapse-btn {
		width: 25px;
		height: 25px;

		background: transparent;
		border: 1px #fff solid;
		border-radius: 2px 0 0 2px;
		padding: 0;
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;

		color: #fff;

		&.right {
			border-radius: 0 2px 2px 0;
		}

		&.active {
			background: #fff;
			color: #000;
		}
	}
</style>
