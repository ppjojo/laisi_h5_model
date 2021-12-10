//Android终端
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
//iOS终端
var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

var title="";
var description="";

$(function() {
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical', // 垂直切换选项
	})
	if(getQueryString("ls")){
		$(".headerImg img").hide();
	}
	ajax({
		type: "get",
		url: "share/ropeSkipping/report/year",
		data: {
			userId: getQueryString('userId'),
			year: 2019
		},
		success: function(res) {
			if (res.code == 0) {
				return
				var scoreData = res.data;
				console.log(res)
				title="我的"+scoreData.year+"年度跳绳报告";
				description=scoreData.year+"年我完成了"+scoreData.yearStatistic.number+"个跳绳，减脂"+Math.ceil(scoreData.yearStatistic.burn / 9000)+"g，快来围观吧！"
				console.log(title)
				console.log(description)
				//第一页
				$("#userName").text(ellipsis(scoreData.nickName)); //昵称
				$("#joinData").html("您于" + timeStamp2String("ymd2", scoreData.registerTime) + "<br>加入派健康"); //加入时间
				$("#jumpDataNumYear").text(scoreData.year + "年度"); //跳绳的年度
				$("#jumpDataNumSpan").html(scoreData.bindDay); //跳绳天数
				$("#jumpTimeTotalp").html("累计跳绳锻炼" + secondsFormat(scoreData.yearStatistic.takeMs / 1000)); //跳绳的总时长
				$("#jumpNumTotal").text(scoreData.yearStatistic.number); //累计跳绳数量
				$("#jumpKLLTotalNum").html("消耗卡路里" + Math.ceil(scoreData.yearStatistic.burn / 1000) + "千卡"); //消耗的卡路里
				$("#jumpKLLTotalZF").html("减脂" + Math.ceil(scoreData.yearStatistic.burn / 9000) + "g")
				//第二页
				var secondPageHtml = '<div class="onedayNumDiv">' +
					'<p class="onedayNum">' + scoreData.bestNumberDay.number + '</p>' +
					'<p class="onedayNumbg"></p>' +
					'</div>' +
					'<div class="onedayDescrip">' +
					'<p>' + timeStamp2String("ymd2", scoreData.bestNumberDay.startTime) + '</p>' +
					'<p>您单日跳绳' + secondsFormat(scoreData.bestNumberDay.takeMs / 1000) + '</p>' +
					'<p>完成跳绳' + scoreData.bestNumberDay.number + '个</p>' +
					'</div>' +
					'<div class="onedayDescrip">'
				if (scoreData.bestNumberDay.number > 2000) {
					secondPageHtml += '<p class="onedayDescripBig">耐力堪比“蓝天的军舰鸟”</p>'
				} else if (scoreData.bestNumberDay.number > 1500) {
					secondPageHtml += '<p class="onedayDescripBig">耐力堪比“来自北方的狼”</p>'
				} else if (scoreData.bestNumberDay.number > 1000) {
					secondPageHtml += '<p class="onedayDescripBig">耐力堪比“非洲的猎豹”</p>'
				} else {
					secondPageHtml += '<p class="onedayDescripBig">耐力堪比“草原的藏羚羊”</p>'
				}

				secondPageHtml += '<p>消耗卡路里' + Math.ceil(scoreData.bestNumberDay.burn / 1000) + '千卡</p>' +
					'<p>相当于' + Math.ceil(scoreData.bestNumberDay.burn / 220000) + '包薯条的热量</p>' +
					'</div>' +
					'<div class="likeAnimal">'
				if (scoreData.bestNumberDay.number > 2000) {
					secondPageHtml += '<img class="eagle" src="img/eagle.png" alt="">'
				} else if (scoreData.bestNumberDay.number > 1500) {
					secondPageHtml += '<img class="wolf" src="img/wolf.png" alt="">'
				} else if (scoreData.bestNumberDay.number > 1000) {
					secondPageHtml += '<img class="leopard" src="img/leopard.png" alt="">'
				} else {
					secondPageHtml += '<img class="sheep" src="img/sheep.png" alt="">'
				}
				secondPageHtml += '</div>'
				$("#secondPage").html(secondPageHtml)

				//第三页
				$("#thirdPage .yearRankNum").text(scoreData.rank); //排名
				$("#thirdPage .yearRankShow").text(scoreData.rank)
				$("#thirdPage .bestBPMDate").text(timeStamp2String("ymd2", scoreData.bestBpm.timestamp)); //取到最好bpm的时间
				$("#thirdPage .bestBPMnumber").text(scoreData.bestBpm.avgNumber); //bpm值
				$("#thirdPage .likejns").text(Math.round((scoreData.bestBpm.avgNumber / 3.8)))
			}
		},
		error: function() {
			console.log("error")
		}
	})
})

function ellipsis(value) {
	if (!value) return '';
	if (value.length > 6) {
		return value.slice(0, 6) + '...';
	}
	return value;
}

function timeStamp2String(id, time) {
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
	} else if (id == "ymd2") {
		return year + "年" + month + "月" + date + "日";
	}
}

function secondsFormat(s) {
	//var day = Math.floor( s/ (24*3600) ); // Math.floor()向下取整 
	var day = 0; // Math.floor()向下取整 
	var hour = Math.floor((s - day * 24 * 3600) / 3600);
	var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
	var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
	var ruturnData = "";
	if (day > 0) {
		ruturnData += day + "天"
	}
	if (hour > 0) {
		ruturnData += hour + "小时"
	}
	if (minute > 0) {
		ruturnData += minute + "分"
	}
	if (second > 0) {
		ruturnData += second + "秒"
	}
	return ruturnData;
}
function shareSuccessCallback(){
	alert("回调成功")
}
function sharePage() {
	console.log("sharePage ")
	alert("LSTH5APP_shareToWechatMoments")
	try {
		if (isIOS) {
			window.webkit.messageHandlers.lstNative.postMessage({
				"method": "LSTH5APP_shareToWechatMoments",
				"title": "分享朋友圈",
				"description": "分享朋友圈",
				"url":"https://lstest.laisitech.com/h5/h5V2/annualReport/2020/annualReport.html" 
			});
		} else if (isAndroid) {
			console.log("android share")
			var androidJson={
				"title": "分享朋友圈",
				"description": "分享朋友圈",
				"url":"https://lstest.laisitech.com/h5/h5V2/annualReport/2020/annualReport.html" 
			}
			window.android.LSTH5APP_shareToWechatMoments(JSON.stringify(androidJson));
		} else {
			console.log("其他设备")
		}
	} catch (e) {
		console.log(e)
	}

}

function closePage() {
	console.log("closePage ")
	try {
		if (isIOS) {
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'goBack',
			});
		} else if (isAndroid) {
			console.log("android back")
			window.android.goBack();
		} else {
			console.log("其他设备")
		}
	} catch (e) {
		console.log(e)
	}
}