import type { PartyType } from '../parties';
import type { LawTypes } from '../law-types';

export type RawDataType = {
	Law_ID: number;
	Proposer_Name: string;
	Proposer_Type: 'คณะรัฐมนตรี' | 'ประชาชน' | 'ผสม' | 'ฝ่ายค้าน' | 'ฝ่ายรัฐบาล' | 'ไม่ทราบฝ่าย';
	Proposer_Party: PartyType[];
	Law_Keyword: string;
	Law_Name: string;
	Start_Date: number | null;
	End_Date: number | null;
	Date_Diff: number | null;
	Law_Status: 'กฎหมายที่ถูกรวมร่าง' | 'ตกไป' | 'อยู่ในกระบวนการ' | 'ออกเป็นกฎหมาย';
	Law_Stage: 'ร่างกฎหมาย' | 'ส.ส.' | 'ส.ว.' | 'ศาลรัฐธรรมนูญ' | 'กษัตริย์';
	Status_Description: string;
	Law_Merge: number | null;
	Law_in_Parliament: boolean;
	Law_Type: LawTypes;

	// Votelog
	VoteLog_ID: number | null;
	VoteLog_Term: number | null;

	// Custom
	Law_Merge_Head: boolean;
	Law_Merge_Status?: 'กฎหมายที่ถูกรวมร่าง' | 'ตกไป' | 'อยู่ในกระบวนการ' | 'ออกเป็นกฎหมาย';
};

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
	longest_diff: number;
};

export type VotelogType = {
	id: number;
	approve: number;
	disprove: number;
	abstained: number;
	absent: number;
	total_voter: number;
};
