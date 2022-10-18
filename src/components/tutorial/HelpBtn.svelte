<button type="button" class="help-btn" on:click>
	<img src="/law-watch/question.svg" alt="" />
</button>

<style lang="scss">
	.help-btn {
		display: flex;
		align-items: center;
		justify-content: center;

		background: #ffffff;
		border: none;
		border-radius: 24px;

		width: 48px;
		height: 48px;

		position: absolute;
		padding: 0;
		bottom: 16px;
		right: 16px;

		@media (min-width: 768px) {
			bottom: 48px;
			right: 48px;
		}

		cursor: pointer;

		> img {
			height: auto;
			width: 16px;
		}
	}
</style>
