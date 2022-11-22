export const textTypeToPaperType = (text_type: string) =>
	((
		{
			ตกไป: '',
			อยู่ในกระบวนการ: 'process',
			ออกเป็นกฎหมาย: 'pass'
		} as const
	)[text_type] ?? '');
