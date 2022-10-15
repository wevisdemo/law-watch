export const GROUP_CHOICES = [
	'ไม่แบ่งกลุ่ม',
	'ฝ่ายที่เสนอร่าง',
	'พรรคที่เสนอร่าง',
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

export const PARTY_CHOICES = [
	'เลือกทุกพรรค',
	'ครูไทยเพื่อประชาชน',
	'ชาติไทยพัฒนา',
	'ชาติพัฒนา',
	'ไทรักธรรม',
	'ประชาชนปฏิรูป',
	'ประชาธรรมไทย'
] as const;
export type PartyChoiceType = typeof PARTY_CHOICES[number];

export const VOTEPARTY_CHOICES = [
	'ครูไทยเพื่อประชาชน',
	'ชาติไทยพัฒนา',
	'ชาติพัฒนา',
	'ไทรักธรรม',
	'ประชาชนปฏิรูป',
	'ประชาธรรมไทย'
] as const;
export type VotepartyChoiceType = typeof VOTEPARTY_CHOICES[number];
