import { writable } from 'svelte/store';

export const DEFAULT_SUGGEST_LIST = [
	'พ.ร.บ. สมรสเท่าเทียม',
	'พ.ร.บ. กัญชาเสรี',
	'ร่างรัฐธรรมนูญ Resolution'
];

export const suggest_list = writable<string[]>(DEFAULT_SUGGEST_LIST);
