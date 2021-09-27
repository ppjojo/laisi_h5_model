module.exports = {
	title: 'LAISITECH',
	host: process.env.NODE_ENV != 'production' ? 'https://lstest3.laisitech.com/' : 'https://lsprod3.laisitech.com/',
	label: [{
			id: 1,
			name: "跳绳",
			class: "ts",
			icon:"icon-wodexiaozu-tiaosheng"
		},
		{
			id: 2,
			name: "减肥",
			class: "jf",
			icon:"icon-wodexiaozu-jianfei"
		},
		{
			id: 3,
			name: "减脂",
			class: "jz",
			icon:"icon-wodexiaozu-jianzhi"
		},
		{
			id: 4,
			name: "健身",
			class: "js",
			icon:"icon-wodexiaozu-jianshen"
		},
		{
			id: 5,
			name: "腕力球",
			class: "wlq",
			icon:"icon-wodexiaozu-wanliqiu"
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
