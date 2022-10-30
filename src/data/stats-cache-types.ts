export type StatsCacheType = {
	all_law_len: number;
	merged_law_len: number;
	by_party_len: number;
	by_cabinet_len: number;
	by_people_len: number;
	total_reject: number;
	total_progress: number;
	total_pass: number;
	data: [[number, number], [number, number], [0, number]][];
	type_len: {
		เศรษฐกิจ: number;
		สังคม: number;
		กระบวนการยุติธรรม: number;
		การศึกษา: number;
		บริหารราชการ: number;
		สิ่งแวดล้อม: number;
		รัฐธรรมนูญ: number;
	};
};
