$(function () {
	getdetail()
})

//获取详情数据
function getdetail() {
	var paramsid = getQueryString('dataId')
	try {
		if (isIOS) {
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'shareDataIdKey',
				'dataId': paramsid
			})
		} else if (isAndroid) {
			window.android.onDataLoad(paramsid)
		}
	} catch (e) {}
	if (paramsid) {
		ajax({
			type: "post",
			url: "airSticker/get/id",
			data: {
				id: paramsid
			},
			success: function (res) {
				if (res.code == 0) {
					var data = res.data
					var airQuality = data.airQuality
					var airdata = selectlevel(airQuality)

					$('#airData').html(airQuality.toFixed(2))

					$('.leveltxt').html(airdata.txt)
					$('.leveltxt').addClass(airdata.bgClass)

					var time = data.sampleTime
					$('#time').html(timestampTodate(time))
					var temp = Math.round(data.temperature)
					$('#temp').html(temp)
					var humidity = Math.round(data.humidity)
					$('#humidity').html(humidity)
					var circle_bar = document.querySelector('.circle-bar')


					var rotate = 30;

					if (airQuality >= 0 && airQuality <= 2) {
						// 显示范围： 30--180
						if (airQuality < 0.1 && airQuality > 0) {
							rotate = 0.1 * 75 + 30;
						} else {
							rotate = airQuality * 75 + 30;
						}
					} else if (airQuality > 2 && airQuality <= 5) {
						// 显示范围： 180--230
						rotate = (airQuality - 2) * (50 / 3) + 180
					} else if (airQuality > 5 && airQuality < 40) {
						// 显示范围： 230--330
						rotate = (airQuality - 5) * (100 / 35) + 230
					} else if (airQuality >= 40) {
						rotate = 330
					}
					try {
						var styleSheets = document.styleSheets[0]
						if (styleSheets.insertRule) {
							styleSheets.insertRule('.circle-bar:after', 'transform: rotate(' + rotate +
								'deg) translate(0, 1.58rem);', 0);
						} else {
							styleSheets.addRule('.circle-bar:after', 'transform: rotate(' + rotate +
								'deg) translate(0, 1.58rem);', 0);
						}
					}catch(e){
						console.log(e)
					}


					var styleStr = ""
					if (airQuality > 0 & airQuality <= 2) {
						rotate = rotate - 90
						styleStr = 'linear-gradient(-60deg, #4FC4F7 50%, transparent 50%, transparent), linear-gradient(' + rotate +
							'deg, #fff 50%, #4FC4F7 50%, #4FC4F7)'
					}
					if (airQuality > 2 && airQuality <= 40) {
						rotate = rotate - 90
						styleStr =
							'linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(' + rotate +
							'deg, #fff 50%, #4FC4F7 50%, #4FC4F7)'
					}
					if (airQuality > 40) {
						styleStr = 'linear-gradient(90deg, #fff 50%, transparent 50%, transparent), linear-gradient(240deg, #fff 50%, #4FC4F7 50%, #4FC4F7)'

					}
					circle_bar.style.background = styleStr

					$(".main_contaniner").fadeIn();
					$(".loading").fadeOut();

				} else if (res.code == 1001) {
					$(".nulldataDiv").fadeIn();
					$(".loading").fadeOut();
				}
			},
			error: function () {
				console.log("error")
			}
		})

	} else {
		console.log('请求参数缺失')
	}

}

//日期转换格式---（yyyy-MM-dd hh:mm:ss格式转换成其他格式）
function dateFormat(date, format) {
	if (date) {
		date = new Date(date.replace(/-/g, "/"));

		var year = date.getFullYear();
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

		var minutes = (Array(2).join(0) + date.getMinutes()).slice(-2);
		var hours = (Array(2).join(0) + date.getHours()).slice(-2);
		var secondes = (Array(2).join(0) + date.getSeconds()).slice(-2);

		var arrMonthChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
		var monthChinese = arrMonthChinese[date.getMonth()]

		switch (format) {
			case 'year':
				return year + '年';
				// break;
			case 'month':
				return monthChinese + '月';
			case 'year_month':
				return year + '-' + month;
			case 'yyyy-MM-dd':
				return year + '-' + month + '-' + day;
			case 'h_m_s':
				return {
					hours: hours,
						minutes: minutes,
						secondes: secondes
				};
			case 'month_day':
				return month + '月' + day + '日';
			case 'HH:mm':
				return hours + ':' + minutes;
			case 'MM/DD HH:mm':
				return month + '/' + day + ' ' + hours + ':' + minutes;
			case '/':
				return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
			default:
				return year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes;
		}
	}
}

//时间戳转换为yyyy-MM-dd hh:mm:ss格式的日期 
function timestampTodate(date) {
	if (date) {
		var newdate = new Date(date)

		var year = newdate.getFullYear();
		var day = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
		var month = newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1;

		var minutes = (Array(2).join(0) + newdate.getMinutes()).slice(-2);
		var hours = (Array(2).join(0) + newdate.getHours()).slice(-2);
		var secondes = (Array(2).join(0) + newdate.getSeconds()).slice(-2);

		// return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes;
		return month + '-' + day + ' ' + hours + ':' + minutes;
	}
}


//空气质量等级显示文字及背景颜色,详情的图片和文字颜色
function selectlevel(data) {
	//空气质量等级：  优： 0-1， 良：1-2，中: 2-5, 较差: 5-10, 差： 10-正无穷大
	var level = {
		txt: '',
		bgClass: '',
		imgurl: '',
		txtcolor: '',
		leveldes: ''
	}
	if (data >= 0 && data <= 1) {
		return level = {
			txt: '优',
			bgClass: 'bg-green'
		}
	} else if (data > 1 && data <= 2) {
		return level = {
			txt: '良',
			bgClass: 'bg-Lightblue'
		}
	} else if (data > 2 && data <= 5) {
		return level = {
			txt: '中',
			bgClass: 'bg-orange'
		}
	} else if (data > 5 && data <= 10) {
		return level = {
			txt: '较差',
			bgClass: 'bg-purple'
		}
	} else if (data > 10) {
		return level = {
			txt: '差',
			bgClass: 'bg-red'
		}
	} else {
		return level = {
			txt: '--',
			bgClass: 'bg-gray'
		}
	}
}