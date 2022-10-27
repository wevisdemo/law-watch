import { GOV_PARTY, OPP_PARTY, getPartyImage } from './parties';

export type DropdownChoiceType =
	| string
	| {
			text: string;
			border?: boolean;
			bold?: boolean;
			image?: string;
			readonly?: boolean;
	  };

export const GROUP_CHOICES = [
	'ไม่แบ่งกลุ่ม',
	'ฝ่ายที่เสนอร่างกฎหมาย',
	'พรรคที่เสนอร่างกฎหมาย',
	'ผลโหวตของพรรค'
] as const;
export type GroupChoiceType = typeof GROUP_CHOICES[number];

export const SIDE_CHOICES = [
	'เลือกทุกฝ่าย',
	'คณะรัฐมนตรี',
	'ประชาชน',
	'ผสม',
	'ฝ่ายรัฐบาล',
	'ฝ่ายค้าน',
	'ฝ่ายอิสระ'
] as const;
export type SideChoiceType = typeof SIDE_CHOICES[number];

export const PARTY_CHOICES = ['เลือกทุกพรรค', ...GOV_PARTY, ...OPP_PARTY] as const;
export const PARTY_DROPDOWN_CHOICES: DropdownChoiceType[] = [
	{ text: 'เลือกทุกพรรค', bold: true },
	{ text: 'ฝ่ายรัฐบาล', border: true, bold: true, readonly: true },
	...GOV_PARTY.map((name) => ({
		text: name,
		image: getPartyImage(name)
	})),
	{ text: 'ฝ่ายค้าน', border: true, bold: true, readonly: true },
	...OPP_PARTY.map((name) => ({
		text: name,
		image: getPartyImage(name)
	}))
];
export type PartyChoiceType = typeof PARTY_CHOICES[number];

export const VOTEPARTY_CHOICES = [...GOV_PARTY, ...OPP_PARTY] as const;
export const VOTEPARTY_DROPDOWN_CHOICES: DropdownChoiceType[] = [
	{ text: 'ฝ่ายรัฐบาล', bold: true, readonly: true },
	...GOV_PARTY.map((name) => ({
		text: name,
		image: getPartyImage(name)
	})),
	{ text: 'ฝ่ายค้าน', border: true, bold: true, readonly: true },
	...OPP_PARTY.map((name) => ({
		text: name,
		image: getPartyImage(name)
	}))
];
export type VotepartyChoiceType = typeof VOTEPARTY_CHOICES[number];
