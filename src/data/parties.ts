import { ALL_PARTIES } from './generated/all-parties';

export const GOV_PARTY = [
	'ครูไทยเพื่อประชาชน',
	'ชาติไทยพัฒนา',
	'ชาติพัฒนา',
	'ไทยศรีวิไลย์',
	'ไทรักธรรม',
	'ประชาธรรมไทย',
	'ประชาธิปไตยใหม่',
	'ประชาธิปัตย์',
	'ประชานิยม',
	'ประชาภิวัฒน์',
	'พลเมืองไทย',
	'พลังชาติไทย',
	'พลังท้องถิ่นไท',
	'พลังธรรมใหม่',
	'พลังประชารัฐ',
	'เพื่อชาติไทย',
	'ภูมิใจไทย',
	'รวมพลังประชาชาติไทย',
	'รักษ์ผืนป่าประเทศไทย',
	'เศรษฐกิจไทย',
	'เศรษฐกิจใหม่'
] as const;

export const OPP_PARTY = [
	'ก้าวไกล',
	'ประชาชาติ',
	'พลังปวงชนไทย',
	'เพื่อชาติ',
	'เพื่อไทย',
	'เสรีรวมไทย',
	'อนาคตใหม่'
] as const;

export type PartyType = typeof ALL_PARTIES[number];

export const isParty = (string: string) => {
	return ([...ALL_PARTIES] as string[]).includes(string);
};

export const getPartyImage = (party: string) => {
	if (isParty(party)) return `/law-watch/party/${party}.jpg`;
	return '';
};
