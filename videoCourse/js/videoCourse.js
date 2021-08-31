//传入秒数 返回相应的日时分秒
function secondsFormat(s, flag) { //有flag的是小课程
	var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
	var hour = Math.floor((s - day * 24 * 3600) / 3600);
	var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
	var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
	if (flag) {
		if (day > 0) {
			return day + "天" + hour + "小时" + minute + "分" + second + "秒";
		} else if (hour > 0) {
			return (hour * 60 + minute) + "分" + second + "秒";
		} else if (minute > 0) {
			return minute + "分" + second + "秒";
		} else {
			return second + "秒";
		}
	} else {
		if (second > 0) {
			minute = minute + 1
		}
		if (day > 0) {
			return day + "天" + hour + "小时" + minute + "分"
		} else if (hour > 0) {
			return (hour * 60 + minute) + "分钟"
		} else if (minute > 0) {
			return minute + "分钟"
		}
	}
}

function formatMsgTime(timespan) {
	var dateTime = new Date(timespan);

	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	var day = dateTime.getDate();
	var hour = dateTime.getHours();
	var minute = dateTime.getMinutes();
	var second = dateTime.getSeconds();
	var now = new Date();
	var now_new =now.getTime()  //typescript转换写法

	var milliseconds = 0;
	var timeSpanStr;

	milliseconds = now_new - timespan;

	if (milliseconds <= 1000 * 60 * 1) {
		timeSpanStr = '刚刚';
	} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
		timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
	} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
	} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
	} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
		timeSpanStr = month + '/' + day + ' ' + hour + ':' + minute;
	} else {
		timeSpanStr = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
	}
	return timeSpanStr;
}


function getTime(time) {
	var myDate = new Date(time);
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS) {
		var t = new Date(time.replace(/-/g, '/')).getTime();
	} else {
		var t = myDate.getTime();
	}
	return t;
}
//传入时间戳获取日期
function sjc2time(id, sjc) {
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
		return year + "." + month + "." + date;
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
}