import { derived, writable } from 'svelte/store';

const SECTION_ID = [
	'importance-section',
	'process-section',
	'investigate-section',
	'conclusion-section'
];

export const is_process_inview = writable(false);
export const is_stats_inview = writable(false);
export const is_investigate_inview = writable(false);
export const is_conclusion_inview = writable(false);
export const is_ending_inview = writable(false);

export const current_section = derived(
	[
		is_process_inview,
		is_stats_inview,
		is_investigate_inview,
		is_conclusion_inview,
		is_ending_inview
	],
	([$proc, $stat, $inv, $con, $end]) => {
		if ($con || $end) return 3;
		if ($inv) return 2;
		if ($proc || $stat) return 1;
		return 0;
	}
);

export const jumpTo = (section_id: 0 | 1 | 2 | 3) => {
	const val = [false, false, false];
	val[section_id - 1] = true;

	// Base condition
	is_process_inview.set(val[0]);
	is_investigate_inview.set(val[1]);
	is_conclusion_inview.set(val[2]);

	// Set other to false
	is_stats_inview.set(false);
	is_ending_inview.set(false);

	location.href = '#' + SECTION_ID[section_id];
};
