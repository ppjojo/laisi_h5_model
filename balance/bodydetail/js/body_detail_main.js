let memberId = getQueryString("memberId"); //成员id
let measureId = getQueryString("measureId"); //数据id
let deviceType = getQueryString("deviceType"); //设备类型 区分是不是非智能体脂秤

$(function () {
	$(".loading").fadeOut();
	$(".content").fadeIn();

	var detailApiUrl = "balance/h5/data/body/detail/v2"

	if (deviceType == 'blebalance') {
		$(".newblue").show();
		$(".footer").addClass("footernone");
		detailApiUrl = "bleBalance/h5/data/body/detail/v2"
	} else {
		detailApiUrl = "balance/h5/data/body/detail/v2"
	}
	ajax({
		type: "get",
		url: detailApiUrl,
		data: {
			memberId: memberId,
			measureId: measureId,
		},
		success: function (res) {
			if (res.code == 0) {
				setDetailText(res)
			}
		},
		error: function (err) {
			console.log("error")
		}
	})

})

var bodyData={}
function setDetailText(data) {
	var detail = data.data;
	var bodyData = detail;
	if (detail) { //有数据

		$("#scorenight").html(detail["score"]);
		$("#time").html(getdate(detail["createTime"]));
		for (item in detail) {
			var type = detail[item];
			if (!$("#" + item)) continue;
			if (item === "bodyFat" && type === "--") {
				localStorage.showtab = true;
			}
			if (item === "bodyFat" || item === "tfr" || item === 'protein' || item === 'od' || item === 'smm') {
				type = type.replace(/%/, "")
			}
			if (item === "weightType" && type == "偏瘦") {
				type = "偏轻";
			}
			$("#" + item).html(type);
			if (type === "--") $("#" + item).html("<img style='width:0.56rem;vertical-align:middle;margin-top:-0.05rem;' src='images/icon_1@2x.png' />");

			if (type === "偏轻" || type === "偏瘦" || type === "偏低" || type === "良好" || type === "消瘦") {
				if (item == 'bmiType' || item == 'weightType' || item == 'bodyFatType') {
					$("#" + item).addClass("bg-blue");
				} else {
					$("#" + item).addClass("txt-blue");
				}

			} else if (type === "健康" || type === "标准" || type === "年轻" || type === "运动员体型") {
				if (item == 'bmiType' || item == 'weightType' || item == 'bodyFatType') {
					$("#" + item).addClass("bg-green");
				} else {
					$("#" + item).addClass("txt-green");
				}
			} else if (type === "偏重" || type === "偏胖" || type === "偏高" || type === "警惕" || type === "一般" || type === "隐形肥胖" || type === "偏大") {
				if (item == 'bmiType' || item == 'weightType' || item == 'bodyFatType') {
					$("#" + item).addClass("bg-yellow");
				} else {
					$("#" + item).addClass("txt-yellow");
				}
			} else if (type === "亚健康" || type === "危险" || type === "肥胖" || type === "超重" || type === "稍多") {
				if (item == 'bmiType' || item == 'weightType' || item == 'bodyFatType') {
					$("#" + item).addClass("bg-orange");
				} else {
					$("#" + item).addClass("txt-orange");
				}
			} else if (type === "危险") {
				if (item == 'bmiType' || item == 'weightType' || item == 'bodyFatType') {
					$("#" + item).addClass("bg-red");
				} else {
					$("#" + item).addClass("txt-red");
				}
			} else if (type === "无" || type === "未成年") {
				if (item == 'bmiType' || item == 'weightType' || item == 'bodyFatType') {
					$("#" + item).addClass("bg-gray");
				} else {
					$("#" + item).addClass("txt-gray");
				}

			}
		}
		// console.log(localStorage.showtab);

		//体型
		var datatext = detail["sharp"],
			bodyimg = '';
		if (datatext === '消瘦型' || datatext === '偏瘦型') {
			bodyimg = 'thin';
			$("a[data-id='005']").addClass("txt-blue");
		} else if (datatext === '肌肉型' || datatext === '运动员体型' || datatext === '苗条肌肉型' || datatext === '苗条' || datatext === '健康型') {
			bodyimg = 'health';
			$("a[data-id='005']").addClass("txt-green");
		} else if (datatext === '偏胖' || datatext === '隐形肥胖' || datatext === '肌肉型偏胖') {
			bodyimg = 'fat';
			$("a[data-id='005']").addClass("txt-yellow");
		} else if (datatext === '肥胖') {
			bodyimg = 'fat';
			$("a[data-id='005']").addClass("txt-orange");
		} else {
			bodyimg = 'health';
		}
		$(".bodyimg").attr("src", "images/icon_body_" + bodyimg + "@2x.png");
		if ($("#scorenight").html() == "--") {
			$("#scorenight").html("<img style='width:1.24rem;vertical-align:middle;' src='images/icon_minute@2x.png' />");
		}

		//只有8电极，才显示肢体数据或者是蓝牙体脂称
		if (parseInt(detail["electrodeNumber"]) == 0 || parseInt(detail["electrodeNumber"]) == 4 || parseInt(detail["electrodeNumber"]) == 6 || getQueryString("deviceType") == 'blebalance') {
			$(".footer").addClass("footernone");
		} else if (parseInt(detail["electrodeNumber"]) == 8) {
			$(".footer").removeClass("footernone");
		}
		//当称重结果返回为未成年时，肢体数据全应显示'--'  S7 / H10
		for (item in detail) {
			var type = detail[item];
			if (type === "未成年") {

				$("#rightHandFatRate").html('--')
				$("#rightHandMuscle").html('--')
				$("#rightLegFatRate").html('--')
				$("#rightLegFatMuscle").html('--')
				$("#bodyLegFatRate").html('--')
				$("#bodyLegFatMuscle").html('--')
				$("#leftHandFatRate").html('--')
				$("#leftHandMuscle").html('--')
				$("#leftLegFatRate").html('--')
				$("#leftLegFatMuscle").html('--')

				break
			}
		}

	} else { //无数据

		if ($("#scorenight").html() == "") {
			$("#scorenight").html("<img style='width:1.24rem;vertical-align:middle;' src='images/icon_minute@2x.png' />");
		}
		$("#bodyEvaluation").html("没有获取到身体数据，赤脚上秤试一试！");
		$(".asidebox").each(function () {
			var divTitle = $(this).find("p").eq(1);
			var divNum = $(this).find("p").eq(0);

			if (divTitle.html() == "体脂") {
				if (divNum.html() == "") {
					divNum.html("<img style='width:0.56rem;vertical-align:middle;margin-top:-0.05rem;' src='images/icon_1@2x.png' />");
					$(".asidebox").eq(1).find("p").eq(2).html("<img style='width:0.56rem;vertical-align:middle;margin-top:-0.05rem;' src='images/icon_1@2x.png' />");;
					$(".asidebox").find("a").html("无").addClass("bg-gray");
				}
			} else {
				if (divNum.html() == "") {
					divNum.html("<img style='width:0.56rem;vertical-align:middle;margin-top:-0.05rem;' src='images/icon_1@2x.png' />");
					$(".asidebox").find("a").html("无").addClass("bg-gray");
				}
			}
		});
		$(".listbox").each(function () {
			var divTitle = $(this).find("p").eq(0);
			var divNum = $(this).find("p").eq(1);

			if (divTitle.html() == "体脂") {
				if (divNum.html() == "") {
					divNum.html("<img style='width:0.56rem;vertical-align:middle;margin-top:-0.05rem;' src='images/icon_1@2x.png' />");
					$(".listbox").eq(4).find("p").eq(1).html("<img style='width:0.56rem;vertical-align:middle;margin-top:-0.05rem;' src='images/icon_1@2x.png' />");;
					$(".listbox").find("a").html("无").addClass("txt-gray");
				}
			} else {
				if (divNum.html() == "") {
					divNum.html("<img style='width:0.56rem;vertical-align:middle;margin-top:-0.05rem;' src='images/icon_1@2x.png' />");
					$(".listbox").find("a").html("无").addClass("txt-gray");
				}
			}
		});

		$(".lefthand").each(function () {
			var zhifang = $(this).find("p").eq(1);
			var jirou = $(this).find("p").eq(2);
			zhifang.html("<img style='width:0.5rem;height:auto;vertical-align:middle;margin:-0.05rem auto 0;' src='images/icon_1@2x.png' />");
			jirou.html("<img style='width:0.5rem;height:auto;vertical-align:middle;margin:-0.05rem auto 0;' src='images/icon_1@2x.png' />");
		});
	}
	$(".content").fadeIn();
	$(".loading").fadeOut();
}

$(".asidebox").on("click", function () {
	var tiphref = $(this).find("a").data("href");
	var value = $(this).find("a").text().toString();
	if (value !== "无" && value !== "未成年") {
		tiphref = tiphref + "?memberId=" +memberId + "&measureId=" + measureId + "&bodyWeight=" + bodyData.weight + "&deviceType=" + deviceType;
		window.location.href = tiphref;
	}
})
$(".listbox").on("click", function () {
	var tiphref = $(this).find("a").data("href");
	var value = $(this).find("a").text().toString();
	if (value !== "无" && value !== "未成年") {
		tiphref = tiphref + "?memberId=" + getQueryString("memberId") + "&measureId=" + getQueryString("measureId") + "&bodyWeight=" + bodyData.weight + "&deviceType=" + getQueryString('deviceType');
		window.location.href = tiphref;
	}
})

function toscore() {
	var tiphref = "detail_score.html";
	tiphref = tiphref + "?memberId=" + getQueryString("memberId") + "&measureId=" + getQueryString("measureId") + "&deviceType=" + getQueryString('deviceType');
	window.location.href = tiphref;
}


function getdate(date) {
	var date = new Date(date.replace(/-/g, "/"));
	day = date.getDate();
	Month = date.getMonth() + 1;
	var minutes = (Array(2).join(0) + date.getMinutes()).slice(-2);
	var hours = (Array(2).join(0) + date.getHours()).slice(-2);
	return Month + '/' + day + ' ' + hours + ':' + minutes;
}