import { writable } from 'svelte/store';

export const reverse_sort = writable(false);
export const expand_timeline = writable(false);
export const timeline_mounted = writable(false)
export const timeline_animation_finished = writable(false)