import { derived, writable } from 'svelte/store';

import {
	GROUP_CHOICES,
	SIDE_CHOICES,
	PARTY_CHOICES
	// VOTEPARTY_CHOICES
} from 'data/filter-choices';
import type {
	GroupChoiceType,
	PartyChoiceType,
	SideChoiceType
	// VotepartyChoiceType
} from 'data/filter-choices';
import { LAW_TYPES } from 'data/law-types';
import type { LawTypes } from 'data/law-types';

export const search_input = writable<string>('');

export const selected_law = writable<LawTypes[]>([...LAW_TYPES]);

export const current_group_choice = writable<GroupChoiceType>(GROUP_CHOICES[0]);
export const current_side_choice = writable<SideChoiceType>(SIDE_CHOICES[0]);
export const current_party_choice = writable<PartyChoiceType>(PARTY_CHOICES[0]);
// export const current_voteparty_choice = writable<VotepartyChoiceType>(VOTEPARTY_CHOICES[0]);

export const view_timeline = writable(false);

export const sort_order_when_status = writable(['สถานะ', 'หมวดหมู่']);
export const sort_order_when_timeline = writable(['ระยะเวลา', 'สถานะ', 'หมวดหมู่']);
export const sort_order = derived(
	[view_timeline, sort_order_when_status, sort_order_when_timeline],
	([$view_timeline, $sort_order_when_status, $sort_order_when_timeline]) => {
		if ($view_timeline) return $sort_order_when_timeline;
		return $sort_order_when_status;
	}
);

export const is_mobile_drawer_open = writable(false);

export const is_law_status_open = writable(true);
