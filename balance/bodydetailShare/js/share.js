//获取token的方法（调取安卓和IOS方法，本地测试）
$(function() {
	getdetail()

})



//获取详情数据
function getdetail() {

	var params = {
		memberId: getQueryString('memberId'),
		measureId: getQueryString('measureId'),
		userId: getQueryString('userId')
	}

	if (params.memberId && params.measureId && params.userId) {
		ajax({
			type: "get",
			url:getQueryString('deviceType')=='blebalance'? "bleBalance/h5/data/share":"balance/h5/data/share",
			data: {
				memberId: getQueryString('memberId'),
				measureId: getQueryString('measureId'),
			},
			success: function(res) {
				if (res.code == 0) {
					var data = res.data
					// 基本信息
					var textname = data.nickname;
					$('#nickname').html(data.nickname)
					$(".username").text(textname.length > 6 ? textname.substring(0, 6) + '...' : textname);

					$("#headPictureUrl").attr('src', data.headPictureUrl);
					$('#score').html(data.score || '--')
					$('#month').html(data.month)
					$('#day').html(data.day)



					// 身体各项数据
					$('#weight').html(data.weight)
					$('#weightDescription').html(data.weightDescription)

					$('#bmi').html(data.bmi)
					$('#bmiDescription').html(data.bmiDescription)

					$('#bodyAge').html(data.bodyAge)
					$('#bodyAgeDescription').html(data.bodyAgeDescription)

					$('#bfr').html(data.bfr)
					$('#bfrDescription').html(data.bfrDescription)

					$('#sharp').html(data.sharp)

					$('#slm').html(data.slm)
					$('#slmDescription').html(data.slmDescription)

					$('#msw').html(data.msw)
					$('#mswDescription').html(data.mswDescription)

					$('#tfr').html(data.tfr)
					$('#tfrDescription').html(data.tfrDescription)

					$('#vfr').html(data.vfr)
					$('#vfrDescription').html(data.vfrDescription)

					$('#bmr').html(data.bmr)
					$('#bmrDescription').html(data.bmrDescription)

					$('#pm').html(data.pm)
					$('#pmDescription').html(data.pmDescription)

					// console.log('data.score',data.score)
					$('#bodyscore').html(data.score)
					$('#scoreDescription').html(data.scoreDescription)

					if (data.electrodeNumber == "0" || data.bmiDescription === "未成年") {
						$.each($(".asidesize"), function(idx, obj) {
							if (idx > 1) {
								$(obj).html('<img style="width: 0.55rem;" src="../bodydetailShare/images/health_datadetails_2@3x.png"/>');
								$(this).next().html("")
							}
						});
					}
					getbodydata()
				} else {}

			},
			error: function(err) {
				console.log("error")
			}
		})


	} else {
		console.log('请求参数缺失')
	}

}

//获取肢体数据
function getbodydata() {
	var params = {
		memberId: getQueryString('memberId'),
		measureId: getQueryString('measureId'),
		userId: getQueryString('userId')
	}

	if (params.memberId && params.measureId && params.userId) {
		ajax({
			type: "get",
			url:getQueryString('deviceType')=='blebalance'? "bleBalance/h5/data/body/detail/v2":"balance/h5/data/body/detail/v2",
			data: {
				memberId: getQueryString('memberId'),
				measureId: getQueryString('measureId'),
			},
			success: function(res) {
				if (res.code == 0) {
					var detail = res.data;
					for (item in detail) {
						var type = detail[item];
						$("#" + item).html(type);
					}

					if (parseInt(detail["electrodeNumber"]) == 0 || parseInt(detail["electrodeNumber"]) == 4 || parseInt(detail[
							"electrodeNumber"]) == 6||getQueryString('deviceType')=='blebalance') {
						$(".footer").addClass("footernone");
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

					$(".contain").fadeIn();
					$(".loading").fadeOut();

				} else {}

			},
			error: function(err) {
				console.log("error")
			}
		})


		
	} else {
		console.log('请求参数缺失')
	}
}
