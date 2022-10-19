import { writable } from 'svelte/store';

export type LawStatusHighlightType = false | 'two' | 'all' | 'one';

export const vis_type_highlight = writable<boolean>(false);
export const group_highlight = writable<boolean>(false);
export const order_highlight = writable<boolean>(false);
export const law_type_highlight = writable<boolean>(false);
export const law_status_highlight = writable<LawStatusHighlightType>(false);
