import { derived, writable } from 'svelte/store';

export const is_section1_inview = writable(false);
export const is_section2_inview = writable(false);
export const is_section3_inview = writable(false);

export const current_section = derived(
	[is_section1_inview, is_section2_inview, is_section3_inview],
	([$is_section1_inview, $is_section2_inview, $is_section3_inview]) => {
		if ($is_section3_inview) return 3;
		if ($is_section2_inview) return 2;
		if ($is_section1_inview) return 1;
		return 0;
	}
);
