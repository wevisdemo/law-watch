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
			name: '<span class="nw">เลือก Filter</span>',
			style: '--m-t:12px'
		},
		{
			name: '<span class="nw">เลือกดูภาพรวม</span>',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: '<span class="nw no-desktop">เลือกไม่แบ่งกลุ่ม</span><span class="nw no-desktop">เพื่อดูทั้งหมด</span>',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: '<span class="nw no-desktop">เลือกเรียงตาม</span><span class="nw no-desktop">สถานะ</span>',
			style: '--d-t:226px;--m-t:156px'
		},
		{
			cssClass: 'bottom',
			name: '<span class="nw no-desktop">มองหาสัญลักษณ์ที่บอกว่า</span><span class="nw no-desktop">ตกไป/อยู่ในกระบวนการ</span><br><span class="nw no-desktop">หรือดูจำนวนรวมเทียบกัน</span>',
			style: '--d-b:211px;--m-b:130px'
		}
	],
	[
		{
			cssClass: 'mobile-top',
			name: '<span class="nw">เลือก Filter</span>',
			style: '--m-t:12px'
		},
		{
			name: '<span class="nw">เลือกดูภาพรวม</span>',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: '<span class="nw no-desktop">เลือกดูฝ่ายที่เสนอ</span><span class="nw no-desktop">ร่างกฎหมาย</span>',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: '<span class="nw no-desktop">เลือกทุกฝ่าย</span><span class="nw no-desktop">เพื่อเทียบกัน</span>',
			style: '--d-t:235px;--m-t:165px'
		},
		{
			cssClass: 'bottom special-bottom',
			name: '<span class="nw">มองหาสัญลักษณ์ที่บอกว่าผ่าน</span><br><span class="nw">หรือดูจำนวนรวมเทียบกัน</span>',
			style: '--d-st:530px;--d-b:211px;--m-b:130px'
		}
	],
	[
		{
			cssClass: 'mobile-top',
			name: '<span class="nw">เลือก Filter</span>',
			style: '--m-t:12px'
		},
		{
			name: '<span class="nw">เลือกดูภาพรวม</span>',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: '<span class="nw no-desktop">เลือกดูพรรคที่</span><span class="nw no-desktop">เสนอร่างกฎหมาย</span>',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: '<span class="nw no-desktop">เลือกทุกพรรค</span><span class="nw no-desktop">เพื่อเทียบกัน</span>',
			style: '--d-t:235px;--m-t:165px'
		},
		{
			name: '<span class="nw no-desktop">เลือกเรียงตาม</span><span class="nw no-desktop">หมวดหมู่</span><span class="nw no-desktop">เพื่อดูประเด็น</span>',
			style: '--d-t:306px;--m-t:218px'
		},
		{
			name: '<span class="nw no-desktop">เลือกหมวดหมู่</span><span class="nw no-desktop">ที่สนใจ</span>',
			style: '--d-t:423px;--m-t:327px'
		}
	],
	[
		{
			cssClass: 'mobile-top',
			name: '<span class="nw">เลือก Filter</span>',
			style: '--m-t:12px'
		},
		{
			name: '<span class="nw">เลือกดูระยะเวลา</span>',
			style: '--d-t:84px;--m-t:43px'
		},
		{
			name: '<span class="nw no-desktop">เลือกไม่แบ่งกลุ่ม</span><span class="nw no-desktop">เพื่อดูทั้งหมด</span>',
			style: '--d-t:155px;--m-t:94px'
		},
		{
			name: '<span class="nw no-desktop">เลือกเรียงตาม</span><span class="nw no-desktop">ระยะเวลา</span>',
			style: '--d-t:226px;--m-t:156px'
		},
		{
			cssClass: 'bottom',
			name: '<span class="nw no-desktop">มองหาสัญลักษณ์</span><span class="nw no-desktop">ที่บอกว่าตกไป</span>',
			style: '--d-b:221px;--m-b:130px'
		}
	]
];
