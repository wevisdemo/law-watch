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
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 15" width="11" height="15"
			><path
				fill="currentColor"
				stroke="currentColor"
				stroke-width=".2"
				d="M9.968 5.815a.446.446 0 01-.487.097l.487-.097zm0 0a.446.446 0 00.097-.487l-.097.487zM5.499 1.977L1.662 5.815h0a.447.447 0 01-.631-.631L5.183 1.03l.316.946zm0 0l3.837 3.838s0 0 0 0L5.5 1.977zm4.468 3.206s0 0 0 0L5.816 1.032h0l4.152 4.152zM9.968 9.877a.446.446 0 00-.487-.097l.487.097zm0 0a.446.446 0 01.097.487l-.097-.487zm-4.469 3.838L1.662 9.877h0a.447.447 0 00-.631.631l4.152 4.153.316-.946zm0 0l3.837-3.838s0 0 0 0L5.5 13.715zm4.468-3.207s0 0 0 0l-4.152 4.153h0l4.152-4.153z"
			/></svg
		>
	</button>
	<button
		class="collapse-btn right"
		class:active={!$expand_timeline}
		type="button"
		on:click={collapse}
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 11 14" width="11" height="14"
			><path
				fill="currentColor"
				stroke="currentColor"
				stroke-width=".2"
				d="M5.5 4.869L1.661 1.03h0a.446.446 0 10-.631.631l4.152 4.153h0L5.5 4.87zm0 0L9.335 1.03s0 0 0 0h0l.07.07L5.5 4.87zm4.565-3.693a.446.446 0 00-.097-.145v.631h0a.447.447 0 00.097-.486zm-4.25 4.639l4.152-4.153-4.152 4.153h0z"
			/><path
				fill="currentColor"
				fill-rule="evenodd"
				d="M1.5 7.346a.5.5 0 01.5-.5h7a.5.5 0 110 1H2a.5.5 0 01-.5-.5z"
				clip-rule="evenodd"
			/><path
				fill="currentColor"
				stroke="currentColor"
				stroke-width=".2"
				d="M5.5 9.824L1.661 13.66h0a.447.447 0 01-.631-.631l4.152-4.153h0l.316.947zm0 0l3.836 3.837s0 0 0 0h0l.07-.07L5.5 9.824zm4.565 3.692a.446.446 0 01-.097.145v-.631h0a.447.447 0 01.097.486zm-4.25-4.639l4.152 4.153-4.152-4.153h0z"
			/></svg
		>
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
