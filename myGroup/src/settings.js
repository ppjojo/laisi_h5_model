module.exports = {
	title: 'LAISITECH',
	host: process.env.NODE_ENV != 'production' ? 'https://lstest.laisitech.com/' : 'https://lsprod.laisitech.com/',
	label: [{
			id: 1,
			name: "跳绳",
			class: "ts",
			img:"https://oss.laisitech.com/501c1b2a-7e91-4d4b-8ffe-19c4259a2eda.svg",
			activeImg:"https://oss.laisitech.com/0c302aeb-fd83-4a20-a1b3-1a4b38b20283.svg",
		},
		{
			id: 2,
			name: "减肥",
			class: "jf",
			img: 'https://oss.laisitech.com/ea8c0ae0-53b5-4112-a7dc-86c2b98b20c5.svg',
			activeImg:'https://oss.laisitech.com/26b96405-1eb4-4080-bc48-3b4165829b33.svg',
		},
		{
			id: 3,
			name: "减脂",
			class: "jz",
			img: 'https://oss.laisitech.com/828705e0-ef2d-4f0c-aa35-4826009897ab.svg',
			activeImg: 'https://oss.laisitech.com/e3044da5-270e-49ca-a94d-68b875dabfae.svg',
		},
		{
			id: 4,
			name: "健身",
			class: "js",
			img: 'https://oss.laisitech.com/d4cf0da8-9896-4f4a-9c6b-ef01f0d97b17.svg',
			activeImg:'https://oss.laisitech.com/7a8eb792-1b79-4f5c-bfba-45d99bd7c69c.svg',
		},
		{
			id: 5,
			name: "腕力球",
			class: "wlq",
			img: 'https://oss.laisitech.com/03d4e96a-6bce-42d3-b983-812ac4055d57.svg',
			activeImg: 'https://oss.laisitech.com/6ae3e607-9498-4af5-8848-9a5883a46800.svg',
		},
	],
	RETURN_LABEL(id){
		let idArr = id.split(',');
		let returnArr = [];
		idArr.forEach(e=>{
			this.label.forEach(d=>{
				if(e == d.id){
					returnArr.push([d.class,d.name]);
				}
			})
		})
		return returnArr;
	},
}
