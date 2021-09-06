import { isAndroid,isIOS } from '@u/tool';

//传入时间戳获取日期显示在pk详情
export function sjc2time(id, sjc) {
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
}
//将国际时间转为相应的格式 time传入为转化指定时间 否则就是当前时间
export function timeStamp2String(id, time) {
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
		return year + "/" + month + "/" + date;
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
}
