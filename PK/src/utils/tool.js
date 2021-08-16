import request from "@u/request";
import {
  Toast
} from "vant";
//android终端
var isAndroid =
  navigator.userAgent.indexOf("Android") > -1 ||
  navigator.userAgent.indexOf("Adr") > -1;
//iOS终端
var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//是否微信
var isWechat =
  navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
//图片上传并审核
var pictureReview = (fileObject, cb) => {
  var formdata = new FormData();
  formdata.append("file", fileObject.file);
  request({
      url: "oss/upload/file",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
    .then((res) => {
      console.log(res);
      request({
          url: "contentSecurity/aliyun/imageScan",
          method: "post",
          data: {
            content: res.data.url,
          },
        })
        .then((res2) => {
          if (res2.code != 0) {
            Toast("图片审核未通过，请重新上传！");
            return;
          }
          res2.url = res.data.url;
          cb(res2);
        })
        .catch((err) => {
          console.log(err);
          Toast(err.msg);
        });
    })
    .catch((err) => {
      console.log(err);
      Toast("系统异常");
    });
};
var textReview = (str, cb) => {
  request({
    url: "contentSecurity/aliyun/textScan",
    method: "post",
    data: {
      content: str
    },
  }).then(res => {
    cb(res);
  })
}
//获取url后面的参数 仅在request里面使用
var getQueryString = (name) => {
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.href.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

var DateTime = {
  //将国际时间转为相应的格式 time传入为转化指定时间 否则就是当前时间
  timeStamp2String: function (id, time) {
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
      return date + "日";
    } else if (id == "ym") {
      return year + "-" + month;
    } else if (id == "ymd") {
      return year + "-" + month + "-" + date;
    } else if (id == "ymd20200805") {
      return year + "/" + month + "/" + date;
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
      var aa = month.replace(/0/, "");
      return aa;
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
    }
  },
  //传入时间戳获取日期显示在pk详情
  sjc2time: function (id, sjc) {
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
      return date + "日";
    } else if (id == "ym") {
      return year + "-" + month;
    } else if (id == "ymd") {
      return year + "-" + month + "-" + date;
    } else if (id == "ymd20200805") {
      return year + "/" + month + "/" + date;
    } else if (id == "ymdhm") {
      return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    } else if (id == "mdhm") {
      return month + "月" + date + "日 " + hour + ":" + minute;
    } else if (id == "ymdhms") {
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    } else if (id == "ymdhm2") {
      return year + "年" + month + "月" + date + "日 " + hour + ":" + minute;
    } else if (id == "md") {
      return month + "-" + date;
    } else if (id == "hm") {
      return hour + ":" + minute;
    } else if (id == "hms") {
      return hour + ":" + minute + ":" + second;
    } else if (!id) {
      return year + "-" + month + "-" + date;
    } else if (id == "mdhm2") {
      return month + "/" + date + " " + hour + ":" + minute;
    } else if (id == "dhms") {
      return date + "," + hour + "," + minute + "," + second;
    }
  },
  //2019-03-07 12:00:00转换为 Thu Mar 07 2019 12:00:00 GMT+0800 (中国标准时间)
  parserDate: function (date) {
    var t = Date.parse(date)
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, '/')))
    }
  },
  //获取当前小时
  getHours: function () {
    return DateTime.timeStamp2String("h");
  },
  getTime: function (time) {
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
  },
  //获取时间戳
  getSjc: function (time) {
    return this.getTime(time);
  },
  //对比时间显示不同的背景图传入时间戳
  timeContrast: function (time) {
    if (time > 0) {
      time = parseInt(time);
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      // var month = day * 30;
      var now = new Date().getTime();
      var diffValue = time - now;
      if (diffValue < 0) {
        return false;
      } else {
        return true;
      }
    }
  },
  timeFormat: function (time) {
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
  getDateByNum: function (n, time) {
    var timestamp
    if (time) {
       timestamp = DateTime.getTime(time); //获取当前时间戳
    } else {
       timestamp = new Date().getTime(); //获取当前时间戳
    }
    var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
    var date1 = new Date(ss * n + timestamp); //加上n天的国际标准日期
    return DateTime.timeStamp2String('ymd20200805', date1);
  },
  initStart: function (flag) { //默认是公开赛 2私密赛
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
  initEnd: function (time, flag) { //默认是公开赛 2私密赛
    var num = 5;
    var datenum = 0;
    if (flag == 2) {
      num = 1
    }

    var starth ,endh
    if (time) {
       starth = DateTime.timeStamp2String("h", DateTime.getTime(time))
       endh = Number(starth) + num;
    } else {
       starth = DateTime.getHours()
       endh = Number(starth) + num;
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
      return DateTime.sjc2time("ymdhm2", time1) + "-" + DateTime.sjc2time("ymdhm2", time2);
    } else {
      return DateTime.sjc2time("mdhm", time1) + "-" + DateTime.sjc2time("mdhm", time2);
    }
  },
  needYearOrNot2(time1, time2) { //传入两个时间戳 判断是否需要显示年份用于创建比赛
    var year1 = DateTime.sjc2time("y", time1);
    var year2 = DateTime.sjc2time("y", time2);
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



export {
  isAndroid,
  isIOS,
  isWechat,
  pictureReview,
  textReview,
  getQueryString,
  DateTime
};