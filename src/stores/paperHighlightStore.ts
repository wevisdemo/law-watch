import { writable } from 'svelte/store';

export const current_selected_paper_id = writable<number | null>(null);
