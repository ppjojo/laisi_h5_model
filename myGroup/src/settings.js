const path = require("path");
function resolve(dir) {
	return path.join(__dirname, dir);
  }
module.exports = {
	title: 'LAISITECH',
	host: process.env.NODE_ENV != 'production' ? 'https://lstest.laisitech.com/' : 'https://lsprod.laisitech.com/',
	label: [{
			id: 1,
			name: "跳绳",
			class: "ts",
			img:resolve('src/img/label_ts.svg'),
			activeImg:resolve('src/img/label_ts_color.svg'),
		},
		{
			id: 2,
			name: "减肥",
			class: "jf",
			img: resolve('src/img/label_jf.svg'),
			activeImg: resolve('src/img/label_jf_color.svg'),
		},
		{
			id: 3,
			name: "减脂",
			class: "jz",
			img: resolve('src/img/label_jz.svg'),
			activeImg: resolve('src/img/label_jz_color.svg'),
		},
		{
			id: 4,
			name: "健身",
			class: "js",
			img: resolve('src/img/label_js.svg'),
			activeImg: resolve('src/img/label_js_color.svg'),
		},
		{
			id: 5,
			name: "腕力球",
			class: "wlq",
			img: resolve('src/img/label_wlq.svg'),
			activeImg: resolve('src/img/label_wlq_color.svg'),
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
