import { derived, writable } from 'svelte/store';

const SECTION_ID = [
	'importance-section',
	'process-section',
	'investigate-section',
	'conclusion-section'
];

export const is_section1_inview = writable(false);
export const is_section2_inview = writable(false);
export const is_section3_inview = writable(false);
export const is_ending_inview = writable(false);

export const current_section = derived(
	[is_section1_inview, is_section2_inview, is_section3_inview, is_ending_inview],
	([$is_section1_inview, $is_section2_inview, $is_section3_inview, $is_ending_inview]) => {
		if ($is_section3_inview || $is_ending_inview) return 3;
		if ($is_section2_inview) return 2;
		if ($is_section1_inview) return 1;
		return 0;
	}
);

export const jumpTo = (section_id: 0 | 1 | 2 | 3) => {
	const val = [false, false, false];
	val[section_id - 1] = true;
	is_section1_inview.set(val[0]);
	is_section2_inview.set(val[1]);
	is_section3_inview.set(val[2]);
	is_ending_inview.set(false);
	location.href = '#' + SECTION_ID[section_id];
};
