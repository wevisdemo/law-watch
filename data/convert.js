import fs from 'fs';
import csv from 'csvtojson';

csv()
	.fromFile('./[Wevis-Law Watch] Data sheet - Data Sheet_for nocodb.csv')
	.then((arr) => {
		const formattedArr = arr.map((a) => {
			let b = { ...a };
			b.Law_ID = +b.Law_ID;
			b.Proposer_Party = b.Proposer_Party.split(',')
				.map((e) => e.trim())
				.filter((e) => e);
			b.Start_Date = b.Start_Date ? new Date(b.Start_Date) : null;
			b.End_Date = b.End_Date ? new Date(b.End_Date) : null;
			b.Law_Merge = b.Law_Merge ? +b.Law_Merge : null;
			b.Law_in_Parliament = b.Law_in_Parliament === 'TRUE';
			b.VoteLog_ID = b.VoteLog_ID ? +b.VoteLog_ID : null;
			if (b.Start_Date && b.End_Date) {
				// https://stackoverflow.com/a/7763364
				b.Date_Diff = Math.floor((b.End_Date - b.Start_Date) / (24 * 3600 * 1000));
			} else {
				b.Date_Diff = null;
			}
			b.Start_Date = b.Start_Date ? +b.Start_Date : null;
			b.End_Date = b.End_Date ? +b.End_Date : null;

			return b;
		});

		const references = [...new Set(formattedArr.map((e) => e.Law_Merge).filter((e) => e))];

		const markedRefArr = formattedArr.map((e) => {
			e.Law_Merge_Head = references.includes(e.Law_ID);
			if (e.Law_Merge) {
				e.Law_Merge_Status = formattedArr.find((d) => d.Law_ID === e.Law_Merge).Law_Status;
			}
			return e;
		});

		const newArrStr =
			"import type { RawDataType } from './raw-data-types';\n\nexport const data: RawDataType[] = " +
			JSON.stringify(markedRefArr, null, 4)
				.replace(/\u200b/g, '')
				.replace(/\u00a0/g, ' ')
				.replace(/ {2}/g, ' ');

		fs.writeFileSync('../src/data/raw-data.ts', newArrStr);

		// cache stats
		const groupBy = (arr, groupFn) => {
			return arr.reduce((r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
		};

		let statCache = {
			all_law_len: markedRefArr.length
		};

		const law_with_merge = markedRefArr.filter((e) => e.Law_Merge);

		statCache.merged_law_len = law_with_merge.length;

		const minimal_data = markedRefArr.map((e) => ({
			id: e.Law_ID,
			who: e.Proposer_Type,
			year: e.Start_Date
				? new Date(e.Start_Date).getFullYear()
				: new Date(e.End_Date).getFullYear(),
			original_status: e.Law_Status,
			status: e.Law_Status === 'กฎหมายที่ถูกรวมร่าง' ? e.Law_Merge_Status : e.Law_Status,
			in_par: +e.Law_in_Parliament,
			type: e.Law_Type,
			diff: e.Date_Diff
		}));

		statCache.longest_diff = Math.max(
			...minimal_data.filter((e) => e.original_status !== 'กฎหมายที่ถูกรวมร่าง').map((e) => e.diff)
		);

		const law_by_type = groupBy(minimal_data, (e) => e.type);

		for (let type in law_by_type) {
			law_by_type[type] = law_by_type[type].length;
		}

		statCache.type_len = law_by_type;

		const law_by_purposer = groupBy(minimal_data, (e) => e.who);

		let by_party = [
			...law_by_purposer.ผสม,
			...law_by_purposer.ฝ่ายรัฐบาล,
			...law_by_purposer.ฝ่ายค้าน,
			...law_by_purposer.ไม่ทราบฝ่าย
		];
		let by_cabinet = law_by_purposer.คณะรัฐมนตรี;
		let by_people = law_by_purposer.ประชาชน;

		statCache.by_party_len = by_party.length;
		statCache.by_cabinet_len = by_cabinet.length;
		statCache.by_people_len = by_people.length;

		by_party = groupBy(by_party, (e) => e.year);
		for (let year in by_party) {
			by_party[year] = groupBy(by_party[year], (e) => e.status);
			for (let status in by_party[year]) {
				by_party[year][status] = groupBy(by_party[year][status], (e) => e.in_par);
				by_party[year][status] = [
					by_party[year][status][0]?.length ?? 0,
					by_party[year][status][1]?.length ?? 0
				];
			}
		}

		by_cabinet = groupBy(by_cabinet, (e) => e.year);
		for (let year in by_cabinet) {
			by_cabinet[year] = groupBy(by_cabinet[year], (e) => e.status);
			for (let status in by_cabinet[year]) {
				by_cabinet[year][status] = groupBy(by_cabinet[year][status], (e) => e.in_par);
				by_cabinet[year][status] = [
					by_cabinet[year][status][0]?.length ?? 0,
					by_cabinet[year][status][1]?.length ?? 0
				];
			}
		}

		by_people = groupBy(by_people, (e) => e.year);
		for (let year in by_people) {
			by_people[year] = groupBy(by_people[year], (e) => e.status);
			for (let status in by_people[year]) {
				by_people[year][status] = groupBy(by_people[year][status], (e) => e.in_par);
				by_people[year][status] = [
					by_people[year][status][0]?.length ?? 0,
					by_people[year][status][1]?.length ?? 0
				];
			}
		}

		// statCache.by_party = by_party;
		// statCache.by_cabinet = by_cabinet;
		// statCache.by_people = by_people;

		let data = [
			[
				by_party?.[2019]?.ตกไป ?? [0, 0],
				by_party?.[2019]?.อยู่ในกระบวนการ ?? [0, 0],
				by_party?.[2019]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_party?.[2020]?.ตกไป ?? [0, 0],
				by_party?.[2020]?.อยู่ในกระบวนการ ?? [0, 0],
				by_party?.[2020]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_party?.[2021]?.ตกไป ?? [0, 0],
				by_party?.[2021]?.อยู่ในกระบวนการ ?? [0, 0],
				by_party?.[2021]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_party?.[2022]?.ตกไป ?? [0, 0],
				by_party?.[2022]?.อยู่ในกระบวนการ ?? [0, 0],
				by_party?.[2022]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_cabinet?.[2019]?.ตกไป ?? [0, 0],
				by_cabinet?.[2019]?.อยู่ในกระบวนการ ?? [0, 0],
				by_cabinet?.[2019]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_cabinet?.[2020]?.ตกไป ?? [0, 0],
				by_cabinet?.[2020]?.อยู่ในกระบวนการ ?? [0, 0],
				by_cabinet?.[2020]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_cabinet?.[2021]?.ตกไป ?? [0, 0],
				by_cabinet?.[2021]?.อยู่ในกระบวนการ ?? [0, 0],
				by_cabinet?.[2021]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_cabinet?.[2022]?.ตกไป ?? [0, 0],
				by_cabinet?.[2022]?.อยู่ในกระบวนการ ?? [0, 0],
				by_cabinet?.[2022]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				[
					(by_people?.[2019]?.ตกไป?.[0] ?? 0) + (by_people?.[2018]?.ตกไป?.[0] ?? 0),
					(by_people?.[2019]?.ตกไป?.[1] ?? 0) + (by_people?.[2018]?.ตกไป?.[1] ?? 0)
				],
				[
					(by_people?.[2019]?.อยู่ในกระบวนการ?.[0] ?? 0) +
						(by_people?.[2018]?.อยู่ในกระบวนการ?.[0] ?? 0),
					(by_people?.[2019]?.อยู่ในกระบวนการ?.[1] ?? 0) +
						(by_people?.[2018]?.อยู่ในกระบวนการ?.[1] ?? 0)
				],
				[
					(by_people?.[2019]?.ออกเป็นกฎหมาย?.[0] ?? 0) +
						(by_people?.[2018]?.ออกเป็นกฎหมาย?.[0] ?? 0),
					(by_people?.[2019]?.ออกเป็นกฎหมาย?.[1] ?? 0) +
						(by_people?.[2018]?.ออกเป็นกฎหมาย?.[1] ?? 0)
				]
			],
			[
				by_people?.[2020]?.ตกไป ?? [0, 0],
				by_people?.[2020]?.อยู่ในกระบวนการ ?? [0, 0],
				by_people?.[2020]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_people?.[2021]?.ตกไป ?? [0, 0],
				by_people?.[2021]?.อยู่ในกระบวนการ ?? [0, 0],
				by_people?.[2021]?.ออกเป็นกฎหมาย ?? [0, 0]
			],
			[
				by_people?.[2022]?.ตกไป ?? [0, 0],
				by_people?.[2022]?.อยู่ในกระบวนการ ?? [0, 0],
				by_people?.[2022]?.ออกเป็นกฎหมาย ?? [0, 0]
			]
		];

		statCache.data = data;

		statCache.total_reject = data
			.map((e) => e[0])
			.flat(1)
			.reduce((a, c) => a + c);
		statCache.total_progress = data
			.map((e) => e[1])
			.flat(1)
			.reduce((a, c) => a + c);
		statCache.total_pass = data
			.map((e) => e[2])
			.flat(1)
			.reduce((a, c) => a + c);

		fs.writeFileSync(
			'../src/data/stats-cache.ts',
			"import type { StatsCacheType } from './stats-cache-types';\n\nexport const stats: StatsCacheType = " +
				JSON.stringify(statCache, null, 4)
					.replace(/\u200b/g, '')
					.replace(/\u00a0/g, ' ')
					.replace(/ {2}/g, ' ')
		);
	});
