import fs from 'fs';
import csv from 'csvtojson';
import YAML from 'yaml';

// Global
let LAW_WITH_VOTELOG = [];

// ██████╗  █████╗ ████████╗ █████╗ ███████╗██╗  ██╗███████╗███████╗████████╗
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔════╝██║  ██║██╔════╝██╔════╝╚══██╔══╝
// ██║  ██║███████║   ██║   ███████║███████╗███████║█████╗  █████╗     ██║
// ██║  ██║██╔══██║   ██║   ██╔══██║╚════██║██╔══██║██╔══╝  ██╔══╝     ██║
// ██████╔╝██║  ██║   ██║   ██║  ██║███████║██║  ██║███████╗███████╗   ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝

const groupBy = (arr, groupFn) => {
	return arr.reduce((r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
};

csv()
	.fromFile('data/[Wevis-Law Watch] Data sheet - Data Sheet_for dev.csv')
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
			b.VoteLog_Term = b.VoteLog_Term ? +b.VoteLog_Term : null;

			if (b.Start_Date && b.End_Date) {
				// https://stackoverflow.com/a/7763364
				b.Date_Diff = Math.floor((b.End_Date - b.Start_Date) / (24 * 3600 * 1000)) + 1;
			} else {
				b.Date_Diff = null;
			}
			b.Start_Date = b.Start_Date ? +b.Start_Date : null;
			b.End_Date = b.End_Date ? +b.End_Date : null;

			b.Law_Keyword = b.Law_Name + ' ' + b.Law_Nickname;

			delete b.Law_Nickname;

			if (b.VoteLog_ID) {
				LAW_WITH_VOTELOG.push(b.VoteLog_ID);
			}

			return b;
		});

		const references = formattedArr.map((e) => [e.Law_Merge, e.Law_Keyword]).filter((e) => e[0]);
		const ref_id = [...new Set(references.map((e) => e[0]))].filter((e) => e);
		const ref_keyword = groupBy(references, (e) => e[0]);

		const markedRefArr = formattedArr.map((e) => {
			e.Law_Merge_Head = ref_id.includes(e.Law_ID);
			if (e.Law_Merge_Head) {
				e.Law_Keyword = [e.Law_Keyword, ...ref_keyword[e.Law_ID].map((e) => e[1])].join(' ');
				// remove duplicate keyword
				e.Law_Keyword = [...new Set(...e.Law_Keyword.split(' '))].filter((e) => e).join(' ');
			}
			if (e.Law_Merge) {
				e.Law_Merge_Status = formattedArr.find((d) => d.Law_ID === e.Law_Merge).Law_Status;
			}
			return e;
		});

		const newArrStr =
			"import type { RawDataType } from './data-types';\n\nexport const data: RawDataType[] = " +
			JSON.stringify(markedRefArr)
				.replace(/\u200b/g, '')
				.replace(/\u00a0/g, ' ')
				.replace(/ {2}/g, ' ');

		fs.writeFileSync('src/data/raw-data.ts', newArrStr);

		// ███╗   ███╗███████╗██████╗  ██████╗ ███████╗     ██████╗ █████╗  ██████╗██╗  ██╗███████╗
		// ████╗ ████║██╔════╝██╔══██╗██╔════╝ ██╔════╝    ██╔════╝██╔══██╗██╔════╝██║  ██║██╔════╝
		// ██╔████╔██║█████╗  ██████╔╝██║  ███╗█████╗      ██║     ███████║██║     ███████║█████╗
		// ██║╚██╔╝██║██╔══╝  ██╔══██╗██║   ██║██╔══╝      ██║     ██╔══██║██║     ██╔══██║██╔══╝
		// ██║ ╚═╝ ██║███████╗██║  ██║╚██████╔╝███████╗    ╚██████╗██║  ██║╚██████╗██║  ██║███████╗
		// ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝     ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝

		// Cache merge head index for easy lookup
		// By caching from transformer, the index will always be right

		const mergeCache = Object.fromEntries(
			markedRefArr
				.map((e, i) => ({ ...e, i }))
				.filter((e) => e.Law_Merge_Head)
				.map((e) => [e.Law_ID, e.i])
		);

		const mergeCacheStr =
			'export const merge_cache: Record<number, number> = ' +
			JSON.stringify(mergeCache)
				.replace(/\u200b/g, '')
				.replace(/\u00a0/g, ' ')
				.replace(/ {2}/g, ' ');

		fs.writeFileSync('src/data/merge-cache.ts', mergeCacheStr);

		// ███████╗████████╗ █████╗ ████████╗███████╗     ██████╗ █████╗  ██████╗██╗  ██╗███████╗
		// ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝    ██╔════╝██╔══██╗██╔════╝██║  ██║██╔════╝
		// ███████╗   ██║   ███████║   ██║   ███████╗    ██║     ███████║██║     ███████║█████╗
		// ╚════██║   ██║   ██╔══██║   ██║   ╚════██║    ██║     ██╔══██║██║     ██╔══██║██╔══╝
		// ███████║   ██║   ██║  ██║   ██║   ███████║    ╚██████╗██║  ██║╚██████╗██║  ██║███████╗
		// ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝     ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝

		// cache stats
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
			'src/data/stats-cache.ts',
			"import type { StatsCacheType } from './data-types';\n\nexport const stats: StatsCacheType = " +
				JSON.stringify(statCache)
					.replace(/\u200b/g, '')
					.replace(/\u00a0/g, ' ')
					.replace(/ {2}/g, ' ')
		);
	})
	.then(() => {
		// ██╗   ██╗ ██████╗ ████████╗███████╗██╗      ██████╗  ██████╗
		// ██║   ██║██╔═══██╗╚══██╔══╝██╔════╝██║     ██╔═══██╗██╔════╝
		// ██║   ██║██║   ██║   ██║   █████╗  ██║     ██║   ██║██║  ███╗
		// ╚██╗ ██╔╝██║   ██║   ██║   ██╔══╝  ██║     ██║   ██║██║   ██║
		//  ╚████╔╝ ╚██████╔╝   ██║   ███████╗███████╗╚██████╔╝╚██████╔╝
		//   ╚═══╝   ╚═════╝    ╚═╝   ╚══════╝╚══════╝ ╚═════╝  ╚═════╝

		const votelog_file = fs.readFileSync('data/votelog.yaml', 'utf8');

		const votelog_object = Object.fromEntries(
			YAML.parse(votelog_file)
				.map((vl) => {
					const b = {};

					b.id = +vl.id;
					b.approve = vl.approve;
					b.disprove = vl.disprove;
					b.abstained = vl.abstained;
					b.absent = vl.absent;
					b.total_voter = vl.total_voter;

					return b;
				})
				.filter((vl) => LAW_WITH_VOTELOG.includes(vl.id))
				.map((e) => [e.id, e])
		);

		fs.writeFileSync(
			'src/data/votelog.ts',
			"import type { VotelogType } from './data-types';\n\nexport const votelog: Record<string, VotelogType> = " +
				JSON.stringify(votelog_object)
					.replace(/\u200b/g, '')
					.replace(/\u00a0/g, ' ')
					.replace(/ {2}/g, ' ')
		);
	});
