export const GOV_PARTY = [
	'ครูไทยเพื่อประชาชน',
	'ชาติไทยพัฒนา',
	'ชาติพัฒนา',
	'ไทรักธรรม',
	'ประชาชนปฏิรูป',
	'ประชาธรรมไทย',
	'ประชาธิปไตยใหม่',
	'ประชาธิปัตย์',
	'ประชานิยม',
	'ประชาภิวัฒน์',
	'พลเมืองไทย',
	'พลังชาติไทย',
	'พลังท้องถิ่นไท',
	'พลังไทยรักไทย',
	'พลังธรรมใหม่',
	'พลังประชารัฐ',
	'ภูมิใจไทย',
	'รวมพลังประชาชาติไทย',
	'รักษ์ผืนป่าประเทศไทย',
	'เศรษฐกิจใหม่'
] as const;

export const OPP_PARTY = [
	'ไทยศรีวิไลย์',
	'ประชาชาติ',
	'พลังปวงชนไทย',
	'เพื่อชาติ',
	'เพื่อไทย',
	'เสรีรวมไทย',
	'อนาคตใหม่',
	'ประชาธิปไตยใหม่'
] as const;

export const FREE_PARTY = ['ชื่อพรรค', 'ชื่อพรรค', 'ชื่อพรรค'] as const;

export const isParty = (string: string) => {
	return ([...GOV_PARTY, ...OPP_PARTY, ...FREE_PARTY] as string[]).includes(string);
};

export const getPartyImage = (party: string) => {
	if (isParty(party)) return `https://promisetracker.wevis.info/images/party/${party}.jpg`;
	return '';
};
