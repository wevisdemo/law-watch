import { derived, writable } from 'svelte/store';

export const manual_highlighted_paper_ids = writable<number[]>([]);
export const current_selected_paper_id = writable<number | null>(null);

export const highlighted_paper_ids = derived(
	[manual_highlighted_paper_ids, current_selected_paper_id],
	([$manual_highlighted_paper_ids, $current_selected_paper_id]) => {
		return $current_selected_paper_id
			? [$current_selected_paper_id]
			: $manual_highlighted_paper_ids;
	}
);
