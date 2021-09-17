window.onload = function() {
	if (isIOS) {
		// document.getElementById('app').style.paddingTop = '.92rem';
	}
}
function debounce(func, wait=800){ //可以放入项目中的公共方法中进行调用（鹅只是省事）
 let timeout;
 return function(event){
  clearTimeout(timeout)
  timeout = setTimeout(()=>{
   func.call(this, event)
  },wait)
 }
}
var DateTime = {
	//将国际时间转为相应的格式 time传入为转化指定时间 否则就是当前时间
	timeStamp2String: function(id, time) {
		var datetime = new Date();
		if (time) {
			datetime.setTime(time);
		}
		var year = datetime.getFullYear();
		var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		var month2 = datetime.getMonth() + 1 < 10 ? datetime.getMonth() + 1 : datetime.getMonth() + 1;
		var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		var date2 = datetime.getDate() < 10 ? datetime.getDate() : datetime.getDate();
		var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
		var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
		var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
		if (id == "y") {
			return year;
		} else if (id == "d") {
			return date;
		} else if (id == "ym") {
			return year + "-" + month;
		} else if (id == "ymd") {
			return year + "-" + month + "-" + date;
		} else if (id == "ymd2") {
			return year + "年" + month + "月" + date + "日";
		} else if (id == "ymdh") {
			return year + "-" + month + "-" + date + " " + hour + "时";
		} else if (id == "ymdhm") {
			return year + "-" + month + "-" + date + " " + hour + ":" + minute;
		} else if (id == "ymdh+1m") {
			return year + "-" + month + "-" + date + " " + hour + ":" + minute;
		} else if (id == "ymdhms") {
			return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
		} else if (id == "md") {
			return month + "-" + date;
		} else if (id == "hm") {
			return hour + ":" + minute;
		} else if (id == "hms") {
			return hour + ":" + minute + ":" + second;
		} else if (id == "md2") {
			return month2 + "月" + date2 + "日";
		} else if (id == "h") {
			return hour;
		} else if (id == "M") {
			return month2;
		} else if (id == "m") {
			return minute;
		} else if (id == "s") {
			return second;
		} else if (!id) {
			return year + "-" + month + "-" + date;
		} else if (id == "mdhm") {
			return month + "-" + date + " " + hour + ":" + minute;
		} else if (id == "dhms") {
			return date + "," + hour + "," + minute + "," + second;
		} else if (id == "mdhm3") {
			return month + "/" + date + " " + hour + ":" + minute;
		}
	},
	//传入时间戳获取日期显示在pk详情
	sjc2time: function(id, sjc) {
		if (isIOS) {
			var str = sjc.replace(/T/g, ' ');
			str = str.split('.')[0];
			sjc = new Date(str.replace(/-/g, '/')).getTime();
		}
		var datetime = new Date(sjc);
		var year = datetime.getFullYear();
		var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		var month2 = datetime.getMonth() + 1 < 10 ? datetime.getMonth() + 1 : datetime.getMonth() + 1;
		var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		var date2 = datetime.getDate() < 10 ? datetime.getDate() : datetime.getDate();
		var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
		var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
		var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
		if (id == "y") {
			return year;
		} else if (id == "d") {
			return date;
		} else if (id == "ym") {
			return year + "-" + month;
		} else if (id == "ymd") {
			return year + "-" + month + "-" + date;
		} else if (id == "ymd3") {
			return year + "/" + month + "/" + date;
		} else if (id == "ymd2") {
			return year + "年" + month + "月" + date + "日";
		} else if (id == "ymdhm") {
			return year + "-" + month + "-" + date + " " + hour + ":" + minute;
		} else if (id == "mdhm") {
			return month + "月" + date + "日 " + hour + ":" + minute;
		} else if (id == "ymdhms") {
			return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
		} else if (id == "ymdhm2") {
			return year + "年" + month + "月" + date + "日 " + hour + ":" + minute;
		} else if (id == "ymdhm3") {
			return year + "/" + month + "/" + date + " " + hour + ":" + minute;
		} else if (id == "md") {
			return month + "-" + date;
		} else if (id == "md2") {
			return month2 + "月" + date2 + "日";
		} else if (id == "hm") {
			return hour + ":" + minute;
		} else if (id == "hms") {
			return hour + ":" + minute + ":" + second;
		} else if (!id) {
			return year + "-" + month + "-" + date;
		} else if (id == "mdhm2") {
			return month + "-" + date + " " + hour + ":" + minute;
		} else if (id == "mdhm3") {
			return month + "/" + date + " " + hour + ":" + minute;
		} else if (id == "dhms") {
			return date + "," + hour + "," + minute + "," + second;
		}
	},
	//2019-03-07 12:00:00转换为 Thu Mar 07 2019 12:00:00 GMT+0800 (中国标准时间)
	parserDate: function(date) {
		var t = Date.parse(date);
		return new Date(Date.parse(date.replace(/-/g, '/')))
		if (!isNaN(t)) {
			return new Date(Date.parse(date.replace(/-/g, '/')))
		}
	},
	//获取当前小时
	getHours: function() {
		return DateTime.timeStamp2String("h");
	},
	getTime: function(time) {
		var myDate = new Date(time);
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if (isiOS) {
			var str = time.replace(/T/g, ' ');
			str = str.split('.')[0];
			var t = new Date(str.replace(/-/g, '/')).getTime();
		} else {
			var t = myDate.getTime();
		}
		return t;
	},
	//获取时间戳
	getSjc: function(time) {
		return this.getTime(time);
	},
	//对比时间显示不同的背景图传入时间戳
	timeContrast: function(time) {
		if (time > 0) {
			var result
			time = parseInt(time);
			var minute = 1000 * 60;
			var hour = minute * 60;
			var day = hour * 24;
			var month = day * 30;
			var now = new Date().getTime();
			var diffValue = time - now;
			//console.log(diffValue)
			if (diffValue < 0) {
				return false;
			} else {
				return true;
			}
		}
	},
	timeFormat: function(time) {
		if (time > 0) {
			var result
			time = parseInt(time);
			var minute = 1000 * 60;
			var hour = minute * 60;
			var day = hour * 24;
			var month = day * 30;
			var now = new Date().getTime();
			var diffValue = time - now;
			if (diffValue < 0) {
				return
			}
			var monthC = diffValue / month;
			var weekC = diffValue / (7 * day);
			var dayC = diffValue / day;
			var hourC = diffValue / hour;
			var minC = diffValue / minute;
			if (monthC >= 1) {
				if (monthC <= 12) {
					result = "" + parseInt(monthC) + "月后";
				} else {
					result = "" + parseInt(monthC / 12) + "年后";
				}
			} else if (weekC >= 1) {
				result = "" + parseInt(weekC) + "周后";
			} else if (dayC >= 1) {
				result = "" + parseInt(dayC) + "天后";
			} else if (hourC >= 1) {
				result = "" + parseInt(hourC) + "小时后";
			} else if (minC >= 1) {
				result = "" + parseInt(minC) + "分钟后";
			} else {
				result = "马上";
			}
			return result
		} else {
			return '';
		}
	},
	getDateByNum: function(n, time) {
		if (time) {
			var timestamp = DateTime.getTime(time); //获取当前时间戳
		} else {
			var timestamp = new Date().getTime(); //获取当前时间戳
		}
		var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
		var date1 = new Date(ss * n + timestamp); //加上n天的国际标准日期
		return DateTime.timeStamp2String('ymd', date1);
	},
	initStart: function(flag) { //默认是公开赛 2私密赛
		var hour = this.getHours();
		var startTime = {};
		var num = 1;
		if (flag == 2) {
			num = 1;
			startTime['立即开始'] = [];
		}
		for (var i = 0; i < 7; i++) {
			var startHour = [];
			for (var j = 0; j <= 23; j++) {
				if ((Number(hour) + num > j) && i == 0) {
					startHour.push({
						text: (j < 10) ? '0' + j + ':00' : j + ':00',
						disabled: true
					})
				} else {
					startHour.push({
						text: (j < 10) ? '0' + j + ':00' : j + ':00',
					})
				}

			}
			startTime[this.getDateByNum(i)] = startHour
		}
		//console.log(startTime)
		return startTime;
	},
	initEnd: function(time, flag) { //默认是公开赛 2私密赛
		var num = 5;
		var datenum = 0;
		if (flag == 2) {
			num = 1
		}

		if (time) {
			var starth = DateTime.timeStamp2String("h", DateTime.getTime(time))
			var endh = Number(starth) + num;
		} else {
			var starth = DateTime.getHours()
			var endh = Number(starth) + num;
		}

		if (endh > 23) {
			datenum = 1;
			endh = endh - 24;
		}
		var endTime = {};
		for (var i = datenum; i < 4; i++) {
			var endtHour = [];
			for (var j = 0; j <= 23; j++) {
				if (((Number(endh) > j) && i == datenum) || (((Number(starth) < j) && i == 3))) {
					endtHour.push({
						text: (j < 10) ? '0' + j + ':00' : j + ':00',
						disabled: true
					})
				} else {
					endtHour.push({
						text: (j < 10) ? '0' + j + ':00' : j + ':00',
					})
				}

			}
			endTime[DateTime.getDateByNum(i, time)] = endtHour
		}
		return endTime;
	},
	needYearOrNot(time1, time2) { //传入两个时间戳 判断是否需要显示年份用于比赛详情
		var year1 = DateTime.sjc2time("y", time1);
		var year2 = DateTime.sjc2time("y", time2);
		if (year2 != year1) {
			return DateTime.sjc2time("ymdhm2", time1) + " - " + DateTime.sjc2time("ymdhm2", time2);
		} else {
			return DateTime.sjc2time("mdhm", time1) + " - " + DateTime.sjc2time("mdhm", time2);
		}
	},
	needYearOrNot2(time1, time2) { //传入两个时间戳 判断是否需要显示年份用于创建比赛
		var year1 = DateTime.sjc2time("y", time1);
		var year2 = DateTime.sjc2time("y", time2);
		var returnData = [];
		if (year2 != year1) {
			return [
				DateTime.sjc2time("ymdhm", time1),
				DateTime.sjc2time("ymdhm", time2)
			]
		} else {
			return [
				DateTime.sjc2time("mdhm2", time1),
				DateTime.sjc2time("mdhm2", time2)
			]
		}
	}
}

function compare(property) {
	return function(a, b) {
		var value1 = a[property];
		var value2 = b[property];
		// return value1 - value2;
		return value1.localeCompare(value2)
	}
}

function toThousands(num,flag) {
	if(num<1000){
		if(flag){
			num = num.toFixed(2);
		}
		return num;
		return;
	}
	var num = (num || 0).toString(),
		result = '';
	while (num.length > 3) {
		result = ',' + num.slice(-3) + result;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	return result;
}
//图片上传功能
function uploadImg1(file,element,index,cb){
	try {
		if(index)document.getElementsByClassName(element)[index].src=file.content;
		uploadImg2(file.file,cb)
		return;
		var cropper = new Cropper(document.getElementsByClassName(element)[index], {
			aspectRatio: 16 / 16,
			viewMode: 1,
			dragMode: "move",
			background: false,
			autoCropArea: 1,
			crop: function(e) {
				console.log(e)
				var canvas = cropper.getCroppedCanvas();
				dataURLtoFile(canvas.toDataURL('image/jpeg'), file.file.name, function(dataURLtoFileData) {
					UpladFile({
						file: dataURLtoFileData
					}, function(item) {
						console.log(item)
						uploadImg2(item.file,cb)
					})
				})
			}
		})
	
	} catch (e) {
		console.log(e)
	}
}
function uploadImg2(file,cb){
	console.log("准备上传的文件")
	var formdata = new FormData();
	formdata.append("file", file);
	ajax({
		type: "post",
		url: "oss/upload/file",
		contentType: "multipart/form-data",
		data: {
			formdata: formdata
		},
		success: function(res) {
			if (res.code == 0) {
				console.log(res.data)
				ajax({
					type: "post",
					url: "contentSecurity/aliyun/imageScan",
					data: {
						content: res.data.url
					},
					success: function(res2) {
						res2.url = res.data.url;
						cb(res2);
					},
					error: function() {
						console.log("error")
					}
				})
			}
		},
		error: function() {
			console.log("error")
		}
	})
}