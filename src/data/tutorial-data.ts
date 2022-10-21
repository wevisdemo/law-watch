export const TUTORIAL_CHOICES = [
	'<strong>ร่างกฎหมาย</strong> มักไม่ค่อยออกเป็น<br>กฎหมาย ส่วนมากอยู่ระหว่าง<br>กระบวนการ หรือตกไปแล้วใช่ไหม',
	'<strong>ร่างกฎหมาย</strong> ของฝ่ายรัฐบาล<br>ผ่านได้ง่ายกว่าของฝ่ายค้านหรือเปล่า',
	'<strong>พรรคการเมือง</strong> สนใจประเด็น<br>กฎหมายแตกต่างกันแค่ไหน',
	'<strong>ร่างกฎหมาย</strong> ที่ใช้ระยะเวลานานใน<br>กระบวนการนานมักไม่ผ่านใช่ไหม'
];

type TutorialBalloonType = {
	cssClass?: string;
	name: string;
	style: string;
};

export const TUTORIAL_BALLOONS: TutorialBalloonType[][] = [
	[
		{
			cssClass: 'mobile-top',
			name: 'เลือก Filter',
			style: '--m-t:12px'
		},
		{
			name: 'เลือกดูภาพรวม',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: 'เลือกไม่แบ่งกลุ่ม<wbr class="no-desktop">เพื่อดูทั้งหมด',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: 'เลือกเรียงตาม<wbr class="no-desktop">สถานะ',
			style: '--d-t:226px;--m-t:156px'
		},
		{
			cssClass: 'bottom',
			name: 'มองหาสัญลักษณ์ที่บอกว่า<wbr class="no-desktop">ตกไป/อยู่ในกระบวนการ<br>หรือดูจำนวนรวมเทียบกัน',
			style: '--d-b:211px;--m-b:130px'
		}
	],
	[
		{
			cssClass: 'mobile-top',
			name: 'เลือก Filter',
			style: '--m-t:12px'
		},
		{
			name: 'เลือกดูภาพรวม',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: 'เลือกดูฝ่ายที่เสนอ<wbr class="no-desktop">ร่างกฎหมาย',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: 'เลือกทุกฝ่าย<wbr class="no-desktop">เพื่อเทียบกัน',
			style: '--d-t:235px;--m-t:165px'
		},
		{
			cssClass: 'bottom special-bottom',
			name: 'มองหาสัญลักษณ์ที่บอกว่าผ่าน<br>หรือดูจำนวนรวมเทียบกัน',
			style: '--d-st:530px;--d-b:211px;--m-b:130px'
		}
	],
	[
		{
			cssClass: 'mobile-top',
			name: 'เลือก Filter',
			style: '--m-t:12px'
		},
		{
			name: 'เลือกดูภาพรวม',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: 'เลือกดูพรรคที่<wbr class="no-desktop">เสนอร่างกฎหมาย',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: 'เลือกทุกพรรค<wbr class="no-desktop">เพื่อเทียบกัน',
			style: '--d-t:235px;--m-t:165px'
		},
		{
			name: 'เลือกเรียงตาม<wbr class="no-desktop">หมวดหมู่<wbr class="no-desktop">เพื่อดูประเด็น',
			style: '--d-t:306px;--m-t:218px'
		},
		{
			name: 'เลือกหมวดหมู่<wbr class="no-desktop">ที่สนใจ',
			style: '--d-t:423px;--m-t:327px'
		}
	],
	[
		{
			cssClass: 'mobile-top',
			name: 'เลือก Filter',
			style: '--m-t:12px'
		},
		{
			name: 'เลือกดูระยะเวลา',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: 'เลือกไม่แบ่งกลุ่ม<wbr class="no-desktop">เพื่อดูทั้งหมด',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: 'เลือกเรียงตาม<wbr class="no-desktop">ระยะเวลา',
			style: '--d-t:226px;--m-t:156px'
		},
		{
			cssClass: 'bottom',
			name: 'มองหาสัญลักษณ์<wbr class="no-desktop">ที่บอกว่าตกไป',
			style: '--d-b:221px;--m-b:130px'
		}
	]
];
