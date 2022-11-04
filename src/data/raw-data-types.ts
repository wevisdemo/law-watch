import type { PartyType } from './parties';
import type { LawTypes } from './law-types';

export type RawDataType = {
	Law_ID: number;
	Proposer_Name: string;
	Proposer_Type: 'คณะรัฐมนตรี' | 'ประชาชน' | 'ผสม' | 'ฝ่ายค้าน' | 'ฝ่ายรัฐบาล' | 'ไม่ทราบฝ่าย';
	Proposer_Party: PartyType[];
	Law_Nickname: string;
	Law_Name: string;
	Start_Date: number | null;
	End_Date: number | null;
	Date_Diff: number | null;
	Law_Status: 'กฎหมายที่ถูกรวมร่าง' | 'ตกไป' | 'อยู่ในกระบวนการ' | 'ออกเป็นกฎหมาย';
	Status_Description: string;
	Law_Merge: number | null;
	Law_in_Parliament: boolean;
	Law_Type: LawTypes;
	VoteLog_ID: number | null;
	Law_Merge_Head: boolean;
	Law_Merge_Status?: 'กฎหมายที่ถูกรวมร่าง' | 'ตกไป' | 'อยู่ในกระบวนการ' | 'ออกเป็นกฎหมาย';
};
