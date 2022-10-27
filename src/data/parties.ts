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

const ALL_PARTY = [...GOV_PARTY, ...OPP_PARTY];

export type PartyType = typeof ALL_PARTY[number];

export const isParty = (string: string) => {
	return ([...GOV_PARTY, ...OPP_PARTY] as string[]).includes(string);
};

export const getPartyImage = (party: string) => {
	if (isParty(party)) return `/law-watch/party/${party}.jpg`;
	return '';
};
