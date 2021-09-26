function renderTime(utc_datetime) {
	var T_pos = utc_datetime.indexOf('T');
	var Z_pos = utc_datetime.indexOf('.');
	var year_month_day = utc_datetime.substr(0, T_pos);
	var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
	var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

	// 处理成为时间戳
	var timestamp = getTime(new_datetime);
	// 增加8个小时，北京时间比utc时间多八个时区
	//var timestamp = timestamp + 8 * 60 * 60 * 1000;

	// 时间戳转为时间
	var beijing_datetime = sjc2time("mdhm_dy", timestamp);
	return beijing_datetime;

}

function renderTime2(utc_datetime) {
	var T_pos = utc_datetime.indexOf('T');
	var Z_pos = utc_datetime.indexOf('.');
	var year_month_day = utc_datetime.substr(0, T_pos);
	var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
	var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

	// 处理成为时间戳
	var timestamp = getTime(new_datetime);
	// 增加8个小时，北京时间比utc时间多八个时区
	//var timestamp = timestamp + 8 * 60 * 60 * 1000;

	// 时间戳转为时间
	var beijing_datetime = sjc2time("hm_dy", timestamp);
	return beijing_datetime;

}
function getTime(time) {
	var myDate = new Date(time);
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //android终端
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
	} else if (id == "mdhm_dy") {
		return  month + "/" + date + " " + hour + ":" + minute;
	} else if (id == "hm_dy") {
		return hour + ":" + minute;
	}  else if (id == "hm") {
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