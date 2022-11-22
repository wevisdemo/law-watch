export const LAW_TYPES = [
	'บริหารราชการ',
	'การศึกษา',
	'เศรษฐกิจ',
	'สังคม',
	'สิ่งแวดล้อม',
	'รัฐธรรมนูญ',
	'กระบวนการยุติธรรม'
] as const;

export type LawTypes = typeof LAW_TYPES[number];

export type LawColor =
	| 'law-blue'
	| 'law-sky'
	| 'law-yellow'
	| 'law-orange'
	| 'law-green'
	| 'law-red'
	| 'law-magenta';

export const LAW_TYPE_METADATA: Record<LawTypes, { name: LawTypes; color: LawColor }> = {
	บริหารราชการ: { name: 'บริหารราชการ', color: 'law-blue' },
	การศึกษา: { name: 'การศึกษา', color: 'law-sky' },
	เศรษฐกิจ: { name: 'เศรษฐกิจ', color: 'law-yellow' },
	สังคม: { name: 'สังคม', color: 'law-orange' },
	สิ่งแวดล้อม: { name: 'สิ่งแวดล้อม', color: 'law-green' },
	กระบวนการยุติธรรม: { name: 'กระบวนการยุติธรรม', color: 'law-red' },
	รัฐธรรมนูญ: { name: 'รัฐธรรมนูญ', color: 'law-magenta' }
};
