//获取token的方法（调取安卓和IOS方法，本地测试）
$(function() {
	getDetail()
	ajax({
	          type: "post",
	          url: "integral/add/integral",
	          data:{
	            actionType:"0500"
	          },
	          success: function(res) {
	            
	          },
	          error: function() {
	            
	          }
	        })
})



// 获取俱乐部详情
function getDetail() {
	$(".loading").fadeIn();
	$(".content-container").fadeOut();
	$(".nulldataDiv").fadeOut();
	ajax({
		type: "get",
		url: "club/clubDetail",
		data: {
			clubId: getQueryString('id') || 10005,
		},
		success: function(res) {
			if (parseInt(res.code) == 0) {
				var data = res.data

				// $('#infoImg').src = data.photo
				$("#infoImg").attr('src', data.photo);
				$(".bannerBg").attr('src', data.photo);
				//本期的俱乐部标签只有跳绳(00)；后期的的俱乐部标签可扩散至跳绳，跑步、健走、骑行、游泳等；
				if (data.label == '00') {
					$('#clubType').html('跳绳')
				}

				// $('#clubName').html(strEllipsis(data.name, 8))
				$('#clubName1').html(data.name.substring(0, 2))
				if (data.name.length > 2) {
					$('#clubName2').html(data.name.substring(2, data.name.length))
				}else if(data.name.length >= 13){
					$('#clubName2').html(data.name.substring(2, data.name.length))
					$(".info-content .title").css("fontSize","0.29rem")
				}
				$('#clubId').html(data.id)
				if (data.province) {
					$('#clubLocal').html(data.province || '--' + '·' + data.city || '--')
					// $('#clubLocal').html( data.province||'--' + '·' +  data.city||'--' + '·' + data.county||'--') 
				} else {
					var localStr = data.city + '·' + data.county

					$('#clubLocal').html(localStr) //上海·松江
				}
				data.createTime = data.createTime.split('T')[0]
				console.log('data.createTime', data.createTime)
				$('#clubTime').html(timestampTodate(data.createTime.replace(/\-/g, "/")))
				// console.log('timestampTodate',timestampTodate(data.createTime.replace(/\-/g, "/")) )

				appenddata(data.memberList)
				$("#memberNumber").html(data.memberNumber)

				$('#desc').html(data.introduce)

				$("#todayNumber").html(data.totalJumps)
				$("#sportnum").html(data.ropeTotalNum)
				$("#totalmember").html(data.memberNumber || 0)

				if (data.isPublic == 'Y') {
					$('#joinBtn').show()
					$('#applyJoinBtn').hide()
				} else {
					$('#joinBtn').hide()
					$('#applyJoinBtn').show()
				}

				$(".main-container").fadeIn();
				$(".loading").fadeOut();

			}
		},
		error: function() {
			console.log("error")
		}
	})

}

//时间戳转化为时间日期格式
function timestampTodate(date) {
	if (date) {
		var newdate = new Date(date)
		var year = newdate.getFullYear();
		var day = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
		var month = newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1;

		return year + '/' + month + '/' + day;
	}
}
//数据列表处理，循环显示 ,成员头像列表
function appenddata(datalist) {

	var html = '';

	for (var i = 0; i < datalist.length; i++) {
		var item = datalist[i]

		html += '<div class="memberItemImg">' +
			'<img  src=' + item.headPictureUrl + ' alt="" >' +
			'</div>'
	}
	$('#memberlist').html(html)

}

// 点击成员区域，点击跳转俱乐部成员列表页面；
function goMemberlist() {
	var str = "h5/h5V2/allClub/club/memberList.html?id=" + getQueryString('id') + '&userId=' + JSON.parse(localStorage.getItem(
		"appInfo")).userId + '&flag=5' + '&hiddenTitle=1'
	if (isIOS) {
		var allstr = "/" + str
		Interaction.pushToNextVC(allstr)
	} else {
		var allstr = host + str
		Interaction.pushToNextVC(allstr)
	}
}

//超出指定字数个数，则超过部分用省略号显示
function strEllipsis(str, limit) {
	if (str && str.length > limit) {
		return str.slice(0, limit) + '...';
	} else {
		return str;
	}
}


var isClicked = true //防止重复点击的标识
function growthadd() {
	ajax({
		type: "post",
		url: "grow/addGrowth",
		data: {
			actionId: "1031"
		},
		success: function(res) {
			if (res.code == 0) {} else {}
		},
		error: function() {
			console.log("error")
		}
	})
}
//加入俱乐部接口 , isApply: 是否申请加入，1：申请加入， 0：立即加入
function joinClubReq(isApply) {
	var params = {
		clubId: getQueryString('id'),
		memberId: JSON.parse(localStorage.getItem("appInfo")).userId
	}
	if (params.clubId && params.memberId && isClicked)
		ajax({
			type: "post",
			url: "club/joinClub",
			data: params,
			success: function(res) {
				if (parseInt(res.code) == 0) {
					isClicked = false
					// var data = res.data
					if (isApply) {
						// 如果俱乐部不是公开的，点击“申请加入”按钮toast提示：您已申请加入，请等待部长审核；并且回到当前页面，等部长审核通过之后，会在我的-俱乐部里面进行通知；
						//申请加入
						popMessageTxt('您已申请加入, 请等待部长审核')
					} else {
						// growthadd()
						//给APP回传，交互
						if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
							//加入俱乐部成功
							// window.webkit.messageHandlers.lstNative.postMessage('joinClubSccuess')
							window.webkit.messageHandlers.lstNative.postMessage({
								'method': 'joinClubSccuess'
							})

						} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
							window.android.joinClubSccuess()
						}
						//如果俱乐部是公开的，点击“立即加入”按钮即可加入该俱乐部，并且跳转该俱乐部的主页；
						window.location.href = "clubDetailJoined.html?userId=" + getQueryString('userId') + '&id=' + getQueryString(
							'id');
					}

				} else if (parseInt(res.code) == 3001) {
					isClicked = false
					popMessageTxt('您已加入该俱乐部')
					window.location.href = "clubDetailJoined.html?userId=" + getQueryString('userId') + '&id=' + getQueryString('id');
				} else if (parseInt(res.code) == 4003) {
					isClicked = false
					popMessageTxt(res.msg + '日后可加入该俱乐部')

				} else if (parseInt(res.code) == 2000) {
					isClicked = true
					//告知APP，token失效或者为空
					if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
						window.webkit.messageHandlers.lstNative.postMessage('tokenDisabled')

					} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
						window.android.tokenInvalid()
					}
				} else if (parseInt(res.code) == 3002) {
					isClicked = false
					popMessageTxt('您已申请加入, 请等待部长审核')

				} else {
					isClicked = true
					popMessageTxt(res.msg)
				}
			},
			error: function() {
				isClicked = true
			}
		})

}

// 弹窗内容,显示及消失
function popMessageTxt(content) {
	document.getElementById("popMessages").innerHTML = content
	$('#popMessages').show()
	setTimeout(function() {
		$('#popMessages').hide()
	}, 2000)
}
