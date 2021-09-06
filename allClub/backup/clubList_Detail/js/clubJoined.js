//pageshow
window.addEventListener('pageshow', function(e) {
	var dataChangeVar = localStorage.getItem('dataChange')
	localStorage.removeItem('dataChange');
	if (dataChangeVar == 'tabDetailChange') {
		refreshDetailData()
	}
	console.log('pageshow', dataChangeVar)

}, false)
function ininPageData(){
	getDetail()
	console.log("getDetail")
}

//获取token的方法（调取安卓和IOS方法，本地测试）
$(function() {
	localStorage.removeItem('clubHomeTab')
	clearData()
	getDetail()
	selectTab(1)
	ajax({
	          type: "post",
	          url: "integral/add/integral",
	          data:{
	            actionType:"0503"
	          },
	          success: function(res) {
	            
	          },
	          error: function() {
	            
	          }
	        })
})



//数据定义

var isMinister = 0 //用户是否为部长
var noticeInfo = {} //通知信息

//今日运动数据
var todaydatalistPage = 1 //今日运动的信息列表 分页请求的页数
var todaydatalistTotal = 0 //今日运动的信息列表的总数
var todaydatalist = [] //今日运动的信息列表

//往日运动数据
var pastdaySumList = [] //往日 日统计列表

var allPastdayItemList = [] //展开的全部的往日运动的数据列表（多个往日数据列表的数组）

//任务
var participatedPage_task = 1 //其他tab点击的显示区域，有我参与或报名的数据列表  分页请求的页数
var participatedDataList_task = [] //其他tab点击的显示区域，有我参与或报名的数据列表
var participatedListTotal_task = 0 //有我参与或报名的数据列表 总数

var notParticipatedPage_task = 1 //其他tab点击的显示区域，没有我参与或报名的数据列表  分页请求的页数
var notParticipatedDataList_task = [] //其他tab点击的显示区域，没有我参与或报名的数据列表
var notParticipateListTotal_task = 0 //没有我参与或报名的数据列表 总数

//线上赛
var participatedPage_match = 0 //其他tab点击的显示区域，有我参与或报名的数据列表  分页请求的页数
var participatedDataList_match = [] //其他tab点击的显示区域，有我参与或报名的数据列表
var participatedListTotal_match = 0 //有我参与或报名的数据列表 总数

var notParticipatedPage_match = 0 //其他tab点击的显示区域，没有我参与或报名的数据列表  分页请求的页数
var notParticipatedDataList_match = [] //其他tab点击的显示区域，没有我参与或报名的数据列表
var notParticipateListTotal_match = 0 //没有我参与或报名的数据列表 总数

//活动
var participatedPage_activity = 0 //其他tab点击的显示区域，有我参与或报名的数据列表  分页请求的页数
var participatedDataList_activity = [] //其他tab点击的显示区域，有我参与或报名的数据列表
var participatedListTotal_activity = 0 //有我参与或报名的数据列表 总数

var notParticipatedPage_activity = 0 //其他tab点击的显示区域，没有我参与或报名的数据列表  分页请求的页数
var notParticipatedDataList_activity = [] //其他tab点击的显示区域，没有我参与或报名的数据列表
var notParticipateListTotal_activity = 0 //没有我参与或报名的数据列表 总数


// 获取俱乐部详情
function getDetail() {
	var that = this
	if (getQueryString('id')) {
		$(".loading").fadeIn();
		$(".content-container").fadeOut();
	}
	ajax({
		type: "get",
		url: "club/clubDetail",
		data: {
			clubId: getQueryString('id') || 10000182,
		},
		success: function(res) {
			if (res.code == 0) {
				var data = res.data
				$("#infoImg").attr('src', data.photo);
				$(".bannerBg").attr('src', data.photo);
				//本期的俱乐部标签只有跳绳(00)；后期的的俱乐部标签可扩散至跳绳，跑步、健走、骑行、游泳等；
				if (data.label == '00') {
					$('#clubType').html('跳绳')
				}
				$('#clubName1').html(data.name.substring(0, 2))
				if (data.name.length > 2&&data.name.length<13) {
					$('#clubName2').html(data.name.substring(2, data.name.length))
				}else if(data.name.length >= 13){
					$('#clubName2').html(data.name.substring(2, data.name.length))
					$(".info-content .title").css("fontSize","0.29rem")
				}
				// console.log($(".info-content .title").css("lineHeight"))
				$('#clubId').html(data.id)
				if (data.province) {
					$('#clubLocal').html(data.province || '--' + '·' + data.city || '--')
				} else {
					var localStr = data.city + '·' + data.county

					$('#clubLocal').html(localStr) //上海·松江
				}


				data.createTime = data.createTime.split('T')[0]
				console.log('data.createTime', data.createTime)
				$('#clubTime').html(timestampTodate(data.createTime.replace(/\-/g, "/")))

				appenddata_MemberHeadpic(data.memberList)
				$("#memberNumber").html(data.memberNumber)

				//判断用户为部长还是成员
				isMinister = getQueryString('isMinister')

				//通知内容
				if (data.notice) {
					noticeInfo = data.notice
					$("#noticeContent").html(data.notice.title)
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
function timestampTodate(date, type) {
	if (date) {
		var newdate = new Date(date)

		var year = newdate.getFullYear();
		var day = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
		var month = newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1;

		if (type == '-') {
			return year + '-' + month + '-' + day;
		} else if (type == 'M/D') {
			return newdate.getMonth() + 1 + '月' + newdate.getDate() + '日';
		} else {
			return year + '/' + month + '/' + day;
		}

	}
}
//数据列表处理，循环显示 ,成员头像列表
function appenddata_MemberHeadpic(datalist) {

	var html = '';

	for (var i = 0; i < datalist.length; i++) {
		var index = i
		var item = datalist[i]

		html += '<div class="memberItemImg">' +
			'<img  src=' + item.headPictureUrl + ' alt="" >' +
			'</div>'
	}
	$('#memberlist').html(html)

}

//根据tab选择项， 请求接口    // 选项卡切换
var tabId = 1

function selectTab(tab) {
	$("#tab" + tabId).removeClass("selected");
	$("#tab" + tab).addClass("selected");

	$('#tabContentTaskNotopen').hide()

	console.log("localStorage.getItem('clubHomeTab')", localStorage.getItem('clubHomeTab'))
	
	tabId = tab
	if (tab == 1 && localStorage.getItem('clubHomeTab') != tab) {

		localStorage.setItem('clubHomeTab', tab);
		clearData()

		$('#addBtn').hide()
		$('#todaySportDiv').show()
		$('#otherTabDiv').hide()

		//请求今日运动列表,  
		getList_todaySportDataList()

		//(请求往日运动总结及其数据列表)
		getList_pastdayList()

	} else if (tab == 2 && localStorage.getItem('clubHomeTab') != tab) {
		localStorage.setItem('clubHomeTab', tab);
		clearData()

		//任务板块先不上 2019.12.03
		if (getQueryString('isMinister') == 'Y') {
			$('#addBtn').show()
		}

		$('#title1').html('我的任务')
		$('#title2').html('未参与')
		$('#todaySportDiv').hide()
		$('#otherTabDiv').show()
		$('.not-participate-container').hide()

		//请求我的任务列表 ,  (请求未参加任务列表) 
		getList_participated_task()

		// $('#addBtn').hide()
		// $('#todaySportDiv').hide()
		// $('#otherTabDiv').hide()
		// $('#tabContentTaskNotopen').show()

	} else if (tab == 3 && localStorage.getItem('clubHomeTab') != tab) {
		localStorage.setItem('clubHomeTab', tab);
		clearData()

		if (getQueryString('isMinister') == 'Y') {
			$('#addBtn').show()
		}
		$('#title1').html('已报名')
		$('#title2').html('未报名')
		$('#todaySportDiv').hide()
		$('#otherTabDiv').show()
		$('.not-participate-container').hide()

		//请求用户参与比赛的列表 ,  (请求未报名比赛列表)
		getList_participated_match()

	} else if (tab == 4 && localStorage.getItem('clubHomeTab') != tab) {
		localStorage.setItem('clubHomeTab', tab);
		clearData()

		if (getQueryString('isMinister') == 'Y') {
			$('#addBtn').show()
		}
		$('#title1').html('已报名')
		$('#title2').html('未报名')
		$('#todaySportDiv').hide()
		$('#otherTabDiv').show()
		$('.not-participate-container').hide()

		//请求用户报名活动的列表, (请求未报名活动列表)
		getList_participated_activity()
	}

}
//清空数据
function clearData() {
	//今日运动数据
	todaydatalistPage = 1 //今日运动的信息列表 分页请求的页数
	todaydatalistTotal = 0 //今日运动的信息列表的总数
	todaydatalist = [] //今日运动的信息列表

	//往日运动数据
	pastdaySumList = [] //往日 日统计列表
	allPastdayItemList = [] //展开的全部的往日运动的数据列表（多个往日数据列表的数组）

	//任务
	participatedPage_task = 1 //其他tab点击的显示区域，有我参与或报名的数据列表  分页请求的页数
	participatedDataList_task = [] //其他tab点击的显示区域，有我参与或报名的数据列表
	participatedListTotal_task = 0 //有我参与或报名的数据列表 总数

	notParticipatedPage_task = 1 //其他tab点击的显示区域，没有我参与或报名的数据列表  分页请求的页数
	notParticipatedDataList_task = [] //其他tab点击的显示区域，没有我参与或报名的数据列表
	notParticipateListTotal_task = 0 //没有我参与或报名的数据列表 总数

	//线上赛
	participatedPage_match = 0 //其他tab点击的显示区域，有我参与或报名的数据列表  分页请求的页数
	participatedDataList_match = [] //其他tab点击的显示区域，有我参与或报名的数据列表
	participatedListTotal_match = 0 //有我参与或报名的数据列表 总数

	notParticipatedPage_match = 0 //其他tab点击的显示区域，没有我参与或报名的数据列表  分页请求的页数
	notParticipatedDataList_match = [] //其他tab点击的显示区域，没有我参与或报名的数据列表
	notParticipateListTotal_match = 0 //没有我参与或报名的数据列表 总数

	//活动
	participatedPage_activity = 0 //其他tab点击的显示区域，有我参与或报名的数据列表  分页请求的页数
	participatedDataList_activity = [] //其他tab点击的显示区域，有我参与或报名的数据列表
	participatedListTotal_activity = 0 //有我参与或报名的数据列表 总数

	notParticipatedPage_activity = 0 //其他tab点击的显示区域，没有我参与或报名的数据列表  分页请求的页数
	notParticipatedDataList_activity = [] //其他tab点击的显示区域，没有我参与或报名的数据列表
	notParticipateListTotal_activity = 0 //没有我参与或报名的数据列表 总数
}

//app(IOS) 调JS 刷新详情列表
function refreshDetailData() {

	try {
		clearData()
		var historyTab = localStorage.getItem('clubHomeTab')
		localStorage.removeItem('clubHomeTab');
		selectTab(historyTab)
		getDetail()
		console.log('refreshDetailData() historyTab', historyTab)
	} catch (err) {
		window.location.reload()
		console.log('refreshDetailData() err', err)
	}
}


//今日运动(往日运动)的加载 分页请求 按日期请求
function getList_todaySportDataList() {
	if (getQueryString('id') && timestampTodate(new Date(), '-')) {
		ajax({
			type: "get",
			url: "club/todaySport",
			data: {
				clubId: getQueryString('id'),
				page: todaydatalistPage,
				pageSize: 999,
				date: timestampTodate(new Date(), '-')
			},
			success: function(res) {
				if (res.code == 0) {
					var data = res.data

					todaydatalistTotal = data.totalNum
					if (todaydatalistPage === 1) todaydatalist = data.sportList;
					else todaydatalist = todaydatalist.concat(data.sportList);
					appenddata_TabTodaySport(todaydatalist)
				}
			},
			error: function() {
				console.log("error")
			}
		})
	}

}
//数据列表处理，循环显示 ,今日运动列表
function appenddata_TabTodaySport(todaydatalist) {

	var html = '';

	//渲染今日运动数据
	if (todaydatalist && todaydatalist.length) {
		for (var i = 0; i < todaydatalist.length; i++) {
			var item = todaydatalist[i]

			// <!-- 今日运动用户列表 ， 每个成员的运动详情 -->
			html += '<div class="todaySportList">' +
				'<div class="memberSportDetailItem">' +
				'<div class="memberInfo">' +
				'<img  onclick="Interaction.visitPersonalHomepage(' + item.memberId + ')" src=' + item.headPictureUrl + ' alt="" >' +
				'<p class="name" onclick="Interaction.visitPersonalHomepage(' + item.memberId + ')">' + item.nickname
					 + '</p>' +
				'</div>' +
				'<p class="num"><span class="ropenum">' + item.ropeNum + '</span><span>个</span></p>' +
				'<p class="member-time">' + countTimeAll(item.duraMs) + '</p>' +
				'</div>' +
				'</div>'
		}
	} else {
		// <!-- 今日运动 无数据 -->
		html += '<div class="todaySportList">' +
			'<div class="memberNullData">' +
			'<img class="" src="./img/iconNullData.png" alt="">' +
			'</div>' +
			'</div>'
	}

	// html+='<div class="pastdayList" id="pastdayList">'
	//     + '</div>'


	$('#todaydayList').html(html)

}

// 根据传入的数值,计算时分秒
function countTimeAll(time) {
	if (time) {
		time = parseInt(time / 1000)

		var h = Math.floor(time / 60 / 60)
		var m = (Array(2).join(0) + Math.floor((time - h * 60 * 60) / 60)).slice(-2)
		var s = (Array(2).join(0) + (time - h * 60 * 60 - m * 60)).slice(-2)

		// return h + ':' + m + ':' + s 

		if (Math.floor(time / 60 / 60)) {
			// return h + '小时' + m + '分' + s +'秒'
			if (!Math.floor((time - h * 60 * 60) / 60) && !(time - h * 60 * 60 - m * 60)) {
				return '<span class="ropenum">' + h + '</span>' + '小时'
			} else if (Math.floor((time - h * 60 * 60) / 60) && !(time - h * 60 * 60 - m * 60)) {
				return '<span class="ropenum">' + h + '</span>' + '小时' + '<span class="ropenum">' + m + '</span>' + '分'
			} else {
				return '<span class="ropenum">' + h + '</span>' + '小时' + '<span class="ropenum">' + m + '</span>' + '分' +
					'<span class="ropenum">' + s + '</span>' + '秒'
			}
		} else if (!Math.floor(time / 60 / 60) && Math.floor((time - h * 60 * 60) / 60)) {
			if ((time - h * 60 * 60 - m * 60)) {
				return '<span class="ropenum">' + Math.floor((time - h * 60 * 60) / 60) + '</span>' + '分' +
					'<span class="ropenum">' + s + '</span>' + '秒'
			} else {
				return '<span class="ropenum">' + Math.floor((time - h * 60 * 60) / 60) + '</span>' + '分'
			}

		} else {
			return '<span class="ropenum">' + (time - h * 60 * 60 - m * 60) + '</span>' + '秒'
		}
	} else {
		return '<span class="ropenum">0</span>秒'
	}

}
//超出指定字数个数，则超过部分用省略号显示
function strEllipsis(str, len) {
	console.log(str)
	var strlen = 0;
	        var tempArr = [];
	        var tempStr = '';
	        var i = 0;
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	        try {
	                for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var v = _step.value;
	                        tempArr[i] = v;
	                        tempStr = tempStr + v;
	                        i = i + 1;
	                        if (tempStr != str) {
	                                //还没有到最后
	                                if (v.charCodeAt(0) > 128) {
	                                        strlen = strlen + 2;
	                                        if (strlen >= len) {
	                                                return tempArr.slice(0, tempArr.length - 1).join('') + "..."; //...也占用len里面的位置
	                                        }
	                                } else {
	                                        strlen = strlen + 1;
	                                        if (strlen >= len) {
	                                                return tempArr.slice(0, tempArr.length - 2).join('') + "..."; //...也占用len里面的位置
	                                        }
	                                }
	                        }
	                }
	        } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	        } finally {
	            try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                    }
	            } finally {
	                    if (_didIteratorError) {
	                            throw _iteratorError;
	                    }
	            }
	        }
	        return tempStr;
}

function entitiestoUtf16(str) {
	// 检测出形如&#12345;形式的字符串
	var strObj = utf16toEntities(str);
	var patt = /&#\d+;/g;
	var H, L, code;
	var arr = strObj.match(patt) || [];
	for (var i = 0; i < arr.length; i++) {
		code = arr[i];
		code = code.replace('&#', '').replace(';', '');
		// 高位
		H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
		// 低位
		L = (code - 0x10000) % 0x400 + 0xDC00;
		code = "&#" + code + ";";
		var s = String.fromCharCode(H, L);
		strObj.replace(code, s);
	}
	console.log(strObj)
	return strObj;
}

function utf16toEntities(str) {
	var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则 
	str = str.replace(patt, function(char) {
		var H, L, code;
		if (char.length === 2) {
			H = char.charCodeAt(0); // 取出高位 
			L = char.charCodeAt(1); // 取出低位 
			code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法 
			return "&#" + code + ";";
		} else {
			return char;
		}
	});
	return str;
}
//往日 日统计列表 请求  不分页 (总共30天的运动人数统计列表)
function getList_pastdayList() {
	if (getQueryString('id')) {
		ajax({
			type: "get",
			url: "club/pastSportData",
			data: {
				clubId: getQueryString('id'),
			},
			success: function(res) {
				if (res.code == 0) {
					if (res.data && res.data.length) {
						var data = res.data
						pastdaySumList = data;
						appenddata_pastdaySumList(pastdaySumList)

					}
				}
			},
			error: function() {
				console.log("error")
			}
		})
	}

}

//往日列表的日统计列表 循环渲染
function appenddata_pastdaySumList(pastdaySumList) {

	var html = '';

	//渲染往日列表数据
	if (pastdaySumList && pastdaySumList.length) {

		for (var i = 0; i < pastdaySumList.length; i++) {
			var item = pastdaySumList[i]
			if (item.sportNum == 0) {
				continue
			}
			// <!-- 往日运动用户统计列表  -->
			html += '<div class="pastlistItem">' +
				'<div  class="sumItem" onclick="pastdaySumListclickItem(' + i + ')">' +
				'<p id="pastTime">' + timestampTodate(item.date.replace(/\-/g, "/"), 'M/D') + '</p>' +
				'<div class="number-icon">' +
				'<p>' + item.sportNum + '人运动</p>' +
				'<img class="icon-down" id="pastdaySumItemIcon' + i + '" src="./img/iconRight.png" alt="">' +
				'</div>' +
				'</div>' +
				'<div class="pastDatalist-container"  id="pastlistItem' + i + '" >' +
				'</div>' +
				'</div>'
		}
	}

	$('#pastdayList').html(html)

}

//Item点击展开的存储
var clckedPastdayItem = {
	ind: null,
	page: 1,
	total: 0,
	datalist: []
}

//往日 日统计列表的Item点击展开和收起  
function pastdaySumListclickItem(ind) {
	console.log('pastdaySumListclickItem(ind)', ind)

	if ($('#pastdaySumItemIcon' + ind).hasClass('icon-up')) {
		$('#pastdaySumItemIcon' + ind).removeClass('icon-up')
		$('#pastlistItem' + ind).hide()
	} else {
		if (allPastdayItemList && allPastdayItemList.length) {
			for (var i = 0; i < allPastdayItemList.length; i++) {
				if (allPastdayItemList[i].ind == ind && allPastdayItemList[i].datalist.length == allPastdayItemList[i].total) {
					// allPastdayItemList[i].datalist.length == pastdayItemListTotal 
					console.log('allPastdayItemList[i].datalist', allPastdayItemList[i].datalist)
					appenddata_pastdayDataList(allPastdayItemList[i].datalist, ind)
					break
				}
				if (i == allPastdayItemList.length - 1 && (allPastdayItemList[i].ind != ind || !allPastdayItemList[i].datalist.length)) {
					clckedPastdayItem = {
						ind: ind,
						page: 1,
						total: 0,
						datalist: []
					}
					allPastdayItemList.push(clckedPastdayItem)

					getList_pastdayItemList(ind, clckedPastdayItem.page)
					break
				}
			}
		} else {
			clckedPastdayItem = {
				ind: ind,
				page: 1,
				total: 0,
				datalist: []
			}
			allPastdayItemList.push(clckedPastdayItem)

			getList_pastdayItemList(ind, clckedPastdayItem.page)
		}

		console.log('allPastdayItemList', allPastdayItemList)

		$('#pastdaySumItemIcon' + ind).addClass('icon-up')
		$('#pastlistItem' + ind).show()

	}

}
//往日列表 展开的某个日期的数据列表 分页请求
function getList_pastdayItemList(ind, itempage) {
	if (getQueryString('id')) {
		ajax({
			type: "get",
			url: "club/todaySport",
			data: {
				clubId: getQueryString('id'),
				page: itempage,
				pageSize: 999,
				date: timestampTodate(pastdaySumList[ind].date, '-')
			},
			success: function(res) {
				if (res.code == 0) {
					if (res.data) {
						var data = res.data

						for (var i = 0; i < allPastdayItemList.length; i++) {
							if (allPastdayItemList[i].ind == ind) {

								if (itempage === 1) allPastdayItemList[i].datalist = data.sportList;
								else allPastdayItemList[i].datalist = allPastdayItemList[i].datalist.concat(data.sportList);

								allPastdayItemList[i].total = data.totalNum

								appenddata_pastdayDataList(allPastdayItemList[i].datalist, ind)

								console.log('getList_pastdayItemList', allPastdayItemList[i], ind)

								break
							}
						}

					}
				}
			},
			error: function() {
				console.log("error")
			}
		})
	}


}


//往日数据的数据列表循环展示
function appenddata_pastdayDataList(pastdayItemDataList, divID) {

	var html = '';

	if (pastdayItemDataList && pastdayItemDataList.length) {
		for (var i = 0; i < pastdayItemDataList.length; i++) {
			var item = pastdayItemDataList[i]

			html += '<div class="memberSportDetailItem">' +
				'<div class="memberInfo">' +
				'<img  onclick="Interaction.visitPersonalHomepage(' + item.memberId + ')" src=' + item.headPictureUrl + ' alt="" >' +
				'<p class="name" onclick="Interaction.visitPersonalHomepage(' + item.memberId + ')">' + item.nickname
					 + '</p>' +
				'</div>' +
				'<p class="num"><span class="ropenum">' + item.ropeNum + '</span>个</p>' +
				'<p class="member-time">' + countTimeAll(item.duraMs) + '</p>' +
				'</div>'

		}
	}

	$('#pastlistItem' + divID).html(html)

}

//点击 任务/线上赛/活动 tab  , 请求列表接口
// 获取有我参与的列表数据 --任务
function getList_participated_task() {



	var params = {
		clubId: getQueryString('id'),
		page: participatedPage_task,
		pageSize: 20,
		memberId: JSON.parse(localStorage.getItem("appInfo")).userId
	}


	if (params.memberId && params.clubId) {
		ajax({
			type: "post",
			url: "club/myTask",
			data: params,
			success: function(res) {
				if (res.code == 0) {
					if (res.data) {
						var data = res.data

						participatedListTotal_task = data.totalNum
						if (participatedPage_task === 1) participatedDataList_task = data.joinTaskList;
						else participatedDataList_task = participatedDataList_task.concat(data.joinTaskList);

						appenddata_otherTabDataList(participatedDataList_task, 'participated')

						if (participatedListTotal_task <= 9 || participatedDataList_task.length == participatedListTotal_task) {
							getList_notParticipated_task()
						}

					}
				}
			},
			error: function() {
				console.log("error")
			}
		})
	}




}
// 获取有我参与的列表数据 --线上赛
function getList_participated_match() {

	var params = {
		clubId: getQueryString('id') || 10000111,
		pageNmber: participatedPage_match,
		pageSize: 20,
	}
	ajax({
		type: "post",
		url: "club/competition/user/attended",
		data: params,
		success: function(res) {
			if (parseInt(res.code) == 0) {
				if (res.data) {
					var data = res.data

					participatedListTotal_match = data.total
					if (participatedPage_match === 0) participatedDataList_match = data.content;
					else participatedDataList_match = participatedDataList_match.concat(data.content);

					appenddata_otherTabDataList(participatedDataList_match, 'participated')

					if (participatedListTotal_match <= 9 || participatedDataList_match.length == participatedListTotal_match) {
						getList_notParticipated_match()
					}

				}

			} else if (parseInt(res.code) == 1000) {
				participatedDataList_match = []
				appenddata_otherTabDataList([], 'participated')
				getList_notParticipated_match()
			}
		},
		error: function() {
			console.log("error")
		}
	})





}
// 获取有我参与的列表数据 --活动
function getList_participated_activity() {

	var params = {
		clubId: getQueryString('id'),
		pageNmber: participatedPage_activity,
		pageSize: 20,
	}
	ajax({
		type: "post",
		url: "club/activity/user/attended",
		data: params,
		success: function(res) {
			if (parseInt(res.code) == 0) {
				if (res.data) {
					var data = res.data

					participatedListTotal_activity = data.total
					if (participatedPage_activity === 0) participatedDataList_activity = data.content;
					else participatedDataList_activity = participatedDataList_activity.concat(data.content);

					appenddata_otherTabDataList(participatedDataList_activity, 'participated')

					if (participatedListTotal_activity <= 9 || participatedDataList_match.activity ==
						participatedListTotal_activity) {
						getList_notParticipated_activity()
					}

				}
			} else if (parseInt(res.code) == 1000) {
				participatedDataList_activity = []
				appenddata_otherTabDataList([], 'participated')
				getList_notParticipated_activity()
			}
		},
		error: function() {
			console.log("error")
		}
	})

}


// 获取没有我参与的列表数据 --任务
function getList_notParticipated_task() {

	var params = {
		clubId: getQueryString('id'),
		page: notParticipatedPage_task,
		pageSize: 20,
		memberId: JSON.parse(localStorage.getItem("appInfo")).userId
	}

	ajax({
		type: "post",
		url: "club/notJoinTask",
		data: params,
		success: function(res) {
			if (res.code == 0) {
				if (res.data) {
					var data = res.data

					notParticipateListTotal_task = data.totalNum
					if (notParticipatedPage_task === 1) notParticipatedDataList_task = data.notJoinTaskList;
					else notParticipatedDataList_task = notParticipatedDataList_task.concat(data.notJoinTaskList);

					appenddata_otherTabDataList(notParticipatedDataList_task, 'notParticipate')

				}
			}
		},
		error: function() {
			console.log("error")
		}
	})

}
// 获取没有我参与的列表数据 --线上赛
function getList_notParticipated_match() {

	var params = {
		clubId: getQueryString('id'),
		pageNmber: notParticipatedPage_match,
		pageSize: 20,
	}

	ajax({
		type: "post",
		url: "club/competition/user/notAttended",
		data: params,
		success: function(res) {
			if (parseInt(res.code) == 0) {
				if (res.data) {
					var data = res.data

					notParticipateListTotal_match = data.total
					if (notParticipatedPage_match === 0) notParticipatedDataList_match = data.content;
					else notParticipatedDataList_match = notParticipatedDataList_match.concat(data.content);

					appenddata_otherTabDataList(notParticipatedDataList_match, 'notParticipate')
				}

			} else if (parseInt(res.code) == 1000) {
				notParticipatedDataList_match = []
				appenddata_otherTabDataList([], 'notParticipate')
			}
		},
		error: function() {
			console.log("error")
		}
	})
}
// 获取没有我参与的列表数据 --活动
function getList_notParticipated_activity() {

	var params = {
		clubId: getQueryString('id'),
		pageNmber: notParticipatedPage_activity,
		pageSize: 20,
	}
	ajax({
		type: "post",
		url: "club/activity/user/notAttended",
		data: params,
		success: function(res) {
			if (parseInt(res.code) == 0) {
				if (res.data) {
					var data = res.data

					notParticipateListTotal_activity = data.total
					if (notParticipatedPage_activity === 0) notParticipatedDataList_activity = data.content;
					else notParticipatedDataList_activity = notParticipatedDataList_activity.concat(data.content);

					appenddata_otherTabDataList(notParticipatedDataList_activity, 'notParticipate')

				}

			} else if (parseInt(res.code) == 1000) {
				notParticipatedDataList_activity = []
				appenddata_otherTabDataList([], 'notParticipate')
			}
		},
		error: function() {
			console.log("error")
		}
	})

}

//数据列表处理，循环显示 , 两种状态的列表的渲染(任务，线上赛，活动 显示区域)
//两种状态的列表的渲染(任务，线上赛，活动 显示区域) 分页加载， notParticipate / participated
// 当第一个列表的数据的总长度小于9时，第二个列表也一起加载
// 否则，先加载完第一个列表，再加载第二个列表
function appenddata_otherTabDataList(datalist, divId) {
	var html = ''
	if (tabId == 2 && notParticipateListTotal_task == 0) {
		$('.not-participate-container').hide()
	} else {
		$('.not-participate-container').show()
	}

	if (datalist && datalist.length) {
		for (var i = 0; i < datalist.length; i++) {
			var index = i
			var item = datalist[i]

			var itemId = null
			var noNumIcon = ''
			var numTxt = ''

			if (tabId == 2) {
				//任务
				itemId = item.taskId
				if (divId == 'participated') {
					item.isDone == 'N' ? noNumIcon = 'noNum' : noNumIcon = '';
				}

				numTxt = (item.doneTaskNum || 0) + '人完成';
			} else if (tabId == 3) {
				//线上赛
				itemId = item.id

				if (divId == 'notParticipate') {
					numTxt = (item.registerCount || 0) + '人参赛'
				} else {
					// item.rank ? numTxt = '排名' + item.rank : numTxt = '未跳绳' ;
					item.repeatNumber == 0 ? noNumIcon = 'noNum' : noNumIcon = '';
					item.repeatNumber == 0 ? numTxt = '未跳绳' : numTxt = '排名' + item.rank;
				}
			} else if (tabId == 4) {
				//活动
				itemId = item.id

				numTxt = (item.attendCount || 0) + '人报名';
			}
			var isAttend = 0
			if (divId == 'participated') {
				isAttend = 1
			}
			html += '<div class="infoDivItem" onclick="othertabDataListclickItem(' + itemId + ', ' + isAttend + ')">' +
				'<p class="name">' + (item.title?item.title:item.name) +'</p>' +
				'<div class="num-icon">' +
				'<p class="num ' + noNumIcon + ' ">' + numTxt + '<span class="redcircle"></span></p>' +
				'<img class="icon-right" src="./img/iconRight.png" alt="">' +
				'</div>' +
				'</div>'
		}
	} else {
		// <!-- 无数据 -->
		html += '<div class="memberNullData">' +
			'<img class="" src="./img/iconNullData.png" alt="">' +
			'</div>'

	}

	$('#' + divId).html(html)
}


//点击通知区域的跳转： 
function noticeClick() {
	if (noticeInfo.relatedId) {
		var isHistory = 0
		if (noticeInfo.isExpired == 'Y') {
			isHistory = 1
		}
		if (noticeInfo.type == '00') {
			//跳转任务详情
			if (isIOS) {
				//IOS 调用方法，H5去任务详情界面，拿到任务ID，任务设置做：发任务通知、结束任务、停止报名操作使用
				window.webkit.messageHandlers.lstNative.postMessage({
					'method': 'clubToTaskDetail',
					'taskId': noticeInfo.relatedId,
					"isHistory": isHistory,
					"url": "/h5/h5V2/allClub/club/tasksDetail.html?id=" + noticeInfo.relatedId + '&userId=' + JSON.parse(localStorage.getItem(
						"appInfo")).userId + '&clubId=' + getQueryString('id')
				})
			} else { //判断Android
				var str = "id=" + noticeInfo.relatedId + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId +
					'&clubId=' + getQueryString('id') + '&isHistory=' + isHistory;
				window.android.clubToTaskDetail(str)
			}
		} else if (noticeInfo.type == '01') {
			//跳转比赛详情
			if (isIOS) {
				window.webkit.messageHandlers.lstNative.postMessage({
					'method': 'clubToCompetitionDetail',
					'matchId': noticeInfo.relatedId,
					"isHistory": isHistory,
					"url": "/h5/h5V2/allClub/club/clubCompetitionDetail.html?id=" + noticeInfo.relatedId + '&userId=' + JSON.parse(
						localStorage.getItem("appInfo")).userId + '&clubId=' + getQueryString('id')
				})
			} else { //判断Android
				var str = "id=" + noticeInfo.relatedId + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId +
					'&clubId=' + getQueryString('id') + '&isHistory=' + isHistory
				window.android.clubToCompetitionDetail(str)
			}
		} else if (noticeInfo.type == '02') {
			//跳转活动详情
			if (isIOS) {
				window.webkit.messageHandlers.lstNative.postMessage({
					'method': 'clubToActivityDetail',
					'activityId': noticeInfo.relatedId,
					"isHistory": isHistory,
					"url": "/h5/h5V2/allClub/club/activityDetail.html?id=" + noticeInfo.relatedId + '&userId=' + JSON.parse(
						localStorage.getItem("appInfo")).userId + '&clubId=' + getQueryString('id')
				})
			} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
				var str = "id=" + noticeInfo.relatedId + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId +
					'&clubId=' + getQueryString('id') + '&isHistory=' + isHistory
				window.android.clubToActivityDetail(str)
			}
		}
	} else {
		if (noticeInfo.noticeId) {
			//跳转任务、通知详情
			if (isIOS) {
				var allstr = "/h5/h5V2/allClub/clubList_Detail/noticeDetail.html?id=" + noticeInfo.noticeId + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId
				Interaction.pushToNextVC(allstr)
			} else {
				var allstr = host + "h5//h5V2/allClub/clubList_Detail/noticeDetail.html?id=" + noticeInfo.noticeId + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId
				Interaction.pushToNextVC(allstr)
			}
		}
	}


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


// 发布按钮： 发布任务、比赛、活动按钮
//成员的俱乐部页面是没有发布任务、比赛、活动按钮的；
function goAddEvent() {
	console.log('tabId', tabId)
	localStorage.removeItem('taskForm');
	localStorage.removeItem('taskForm2');
	localStorage.removeItem('activityForm');
	localStorage.removeItem('competitionForm');
	//给APP回传 
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
		//IOS 调用方法，跳转创建页面
		if (tabId == 2) {
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'clubCreatTask'
			})
		} else if (tabId == 3) {
			localStorage.setItem('CLUBID',getQueryString('id'));
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'clubCreatCompetition'
			})
		} else if (tabId == 4) {
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'clubCreatActivity'
			})
		}

	} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
		if (tabId == 2) {
			window.android.clubCreatTask()
		} else if (tabId == 3) {
			window.android.clubCreatCompetition()
		} else if (tabId == 4) {
			window.android.clubCreatActivity()
		}
	}
}

// 点击列表跳转：点击任务跳转任务列表、点击比赛跳转比赛列表；点击活动跳转活动列表；
function othertabDataListclickItem(id, isAttend) {
	if (tabId == 2) {
		if (isIOS) {
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'clubToTaskDetail',
				'taskId': id,
				'url': "/h5/h5V2/allClub/club/tasksDetail.html?id=" + id + '&userId=' + JSON.parse(localStorage.getItem("appInfo"))
					.userId + '&clubId=' + getQueryString('id')
			})
		} else { //判断Android
			var str = "id=" + id + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId + '&clubId=' + getQueryString(
				'id');
			window.android.clubToTaskDetail(str)
		}
	} else if (tabId == 3) {
		if (isIOS) { //判断iPhone|iPad|iPod|iOS
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'clubToCompetitionDetail',
				'matchId': id,
				'url': "/h5/h5V2/allClub/club/clubCompetitionDetail.html?id=" + id + '&userId=' + JSON.parse(localStorage.getItem(
					"appInfo")).userId + '&clubId=' + getQueryString('id')
			})
		} else { //判断Android
			var str = "id=" + id + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId + '&clubId=' + getQueryString(
				'id')
			window.android.clubToCompetitionDetail(str)
		}
	} else if (tabId == 4) {
		if (isIOS) {
			var urlstr = ""
			if (isAttend == 1) {
				urlstr = "/h5/h5V2/allClub/club/activityDetail.html?id=" + id + '&userId=' + JSON.parse(localStorage.getItem(
					"appInfo")).userId + '&clubId=' + getQueryString('id') + '&isAttend=1'
			} else {
				urlstr = "/h5/h5V2/allClub/club/activityDetail.html?id=" + id + '&userId=' + JSON.parse(localStorage.getItem(
					"appInfo")).userId + '&clubId=' + getQueryString('id')
			}

			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'clubToActivityDetail',
				'activityId': id,
				'url': urlstr
			})

		} else { //判断Android
			if (isAttend == 1) {
				var str = "id=" + id + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId + '&clubId=' +
					getQueryString('id') + '&isAttend=1'
			} else {
				var str = "id=" + id + '&userId=' + JSON.parse(localStorage.getItem("appInfo")).userId + '&clubId=' +
					getQueryString('id')
			}
			window.android.clubToActivityDetail(str)
		}
	}

}


// 上滑加载更多
// 添加
window.addEventListener("scroll", function(event) {

	event = event || window.event;
	// console.log(event)

	if (tabId == 1 && allPastdayItemList && allPastdayItemList.length) {
		//多个分页请求 往日列表的点击展开列表数据
		for (var i = 0; i < pastdaySumList.length; i++) {
			// console.log('i',i)

			if (pastdaySumList[i].sportNum) {
				//判断 该日期项是否点击展开
				if ($('#pastdaySumItemIcon' + i).hasClass('icon-up')) {

					for (var j = 0; j < allPastdayItemList.length; j++) {
						// console.log('j',j)
						// console.log('allPastdayItemList[j]',allPastdayItemList[j])

						if (allPastdayItemList[j].ind == i && allPastdayItemList[j].datalist.length != allPastdayItemList[j].total &&
							allPastdayItemList[j].page < Math.ceil(allPastdayItemList[j].total / 20)) {
							allPastdayItemList[j].page++
							getList_pastdayItemList(i, clckedPastdayItem.page)
							console.log('j', j, 'allPastdayItemList[j].page++', allPastdayItemList[j].page)

						}
					}

				}
			}

		}

	}

	if (checkScrollHeight()) {

		if (tabId == 1) {

			if (todaydatalist && todaydatalist.length < todaydatalistTotal && todaydatalistPage < Math.ceil(todaydatalistTotal /
					20)) {
				//分页请求 今日运动数据
				todaydatalistPage++
				getList_todaySportDataList()
			}

		} else if (tabId == 2) {

			//分页请求 任务
			if (participatedDataList_task && participatedDataList_task.length < participatedListTotal_task &&
				participatedPage_task < Math.ceil(participatedListTotal_task / 20)) {
				participatedPage_task++
				getList_participated_task()

			} else if (notParticipatedDataList_task && notParticipatedDataList_task.length < notParticipateListTotal_task &&
				notParticipatedPage_task < Math.ceil(notParticipateListTotal_task / 20)) {
				notParticipatedPage_task++
				getList_notParticipated_task()
			}
		} else if (tabId == 3) {

			//分页请求 线上赛
			if (participatedDataList_match && participatedDataList_match.length < participatedListTotal_match &&
				participatedPage_match < Math.ceil(participatedListTotal_match / 20)) {
				participatedPage_match++
				getList_participated_match()

			} else if (notParticipatedDataList_match && notParticipatedDataList_match.length < notParticipateListTotal_match &&
				notParticipatedPage_match < Math.ceil(notParticipateListTotal_match / 20)) {
				notParticipatedPage_match++
				getList_notParticipated_match()
			}
		} else if (tabId == 4) {

			//分页请求  活动
			if (participatedDataList_activity && participatedDataList_activity.length < participatedListTotal_activity &&
				participatedPage_activity < Math.ceil(participatedListTotal_activity / 20)) {
				participatedPage_activity++
				getList_participated_activity()

			} else if (notParticipatedDataList_activity && notParticipatedDataList_activity.length <
				notParticipateListTotal_activity && notParticipatedPage_activity < Math.ceil(notParticipateListTotal_activity /
					20)) {
				notParticipatedPage_activity++
				getList_notParticipated_activity()
			}
		}
	}

}, false);


// // 获取页面高度
function getScrollTop() {
	var scrollTop = 0;
	// console.log('document.documentElement',document.documentElement)
	if (document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
		// console.log('document.documentElement',document.documentElement)
		// console.log('document.documentElement.scrollTop',document.documentElement.scrollTop)
	} else if (document.body) {
		scrollTop = document.body.scrollTop;
		// console.log('document.body.scrollTop',document.body.scrollTop)
	}
	return scrollTop;
}
// 获取当前可视高度
function getClientHeight() {
	// console.log('document.documentElement.clientHeight',document.documentElement.clientHeight)
	return document.documentElement.clientHeight;
}
//文档完整的高度
function getScrollHeight() {
	// console.log('Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)',Math.max(document.body.scrollHeight, document.documentElement.scrollHeight))
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
//检查滚动高度是否到了底部，距离底部300时，认为到底，开始加载下一页
function checkScrollHeight() {
	return getScrollHeight() - getClientHeight() - getScrollTop() <= 300;
}

// 判断是否上滑
function isScrollUp() {

}


//进入个人中心（20200525）//点击H5头像，跳转到原生个人主页
function visitPersonalHomepage(userId) {
	console.log(userId)
	try {
		if (isIOS) {
			window.webkit.messageHandlers.lstNative.postMessage({
				'method': 'visitPersonalHomepage',
				'visitUserId': userId
			});
		} else if (isAndroid) {
			window.android.visitPersonalHomepage(JSON.stringify({
				'visitUserId': userId
			}));
		} else {
			console.log("其他设备")
		}
	} catch (e) {
		console.log(e)
	}
}
