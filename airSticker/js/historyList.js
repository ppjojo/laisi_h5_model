new Vue({
	el: '#app',
	data: {
		startX: 0,
		endX: 0,

		startX_month: 0,
		endX_month: 0,

		openMonthid: 0,
		openDayid: 0,

		devicename: '---------------',
		eTimes: 0,
		gTimes: 0,
		mTimes: 0,
		pTimes: 0,
		bTimes: 0,

		echartsData: [],

		//各个月份空气数据统计列表
		monthlist: [{
			id: null
		}, ],

		//每个月使用日期的列表
		daylist: [],

		//每天的全部的时间段的空气具体数据列表
		day_time_list: [],
		sumpage: 0,
		page: 0,
		startY: 0,
		endY: 0,
		loading: false,

		//echarts图表数据
		chartColumn: null,
		xdata: [],
		ydata: [],
		ydataMax: 15,

		// 存储当前点击的请求月份和日期
		clickedDate_day: {
			start_day: '',
			dayIndex: 0
		},
		clickedDate_month: {
			start_month: '',
			monthIndex: 0,
		}

	},

	mounted() {
		this.getBasicInfo()
		this.getHistoryData()
		this.drawColumnChart()


	},
	updated() {
		this.drawColumnChart()
	},

	methods: {
		//日期转换格式---（yyyy-MM-dd hh:mm:ss格式转换成其他格式）
		dateFormat(date, format) {
			if (date) {
				date = new Date(date.replace(/-/g, "/"));

				var year = date.getFullYear();
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

				var minutes = (Array(2).join(0) + date.getMinutes()).slice(-2);
				var hours = (Array(2).join(0) + date.getHours()).slice(-2);
				var secondes = (Array(2).join(0) + date.getSeconds()).slice(-2);

				var arrMonthChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
				var monthChinese = arrMonthChinese[date.getMonth()]

				switch (format) {
					case 'year':
						return year + '年';
						// break;
					case 'month':
						return monthChinese + '月';
					case 'year_month':
						return year + '-' + month;
					case 'yyyy-MM-dd':
						return year + '-' + month + '-' + day;
					case 'h_m_s':
						return {
							hours: hours,
								minutes: minutes,
								secondes: secondes
						};
					case 'month_day':
						return month + '月' + day + '日';
					case 'HH:mm':
						return hours + ':' + minutes;
					case 'MM/DD HH:mm':
						return month + '/' + day + ' ' + hours + ':' + minutes;
					case '/':
						return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
					default:
						return year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes;
				}
			}
		},
		//时间戳转换为yyyy-MM-dd hh:mm:ss格式的日期 
		timestampTodate(date) {
			if (date) {
				var newdate = new Date(date)

				var year = newdate.getFullYear();
				var day = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
				var month = newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1;

				var minutes = (Array(2).join(0) + newdate.getMinutes()).slice(-2);
				var hours = (Array(2).join(0) + newdate.getHours()).slice(-2);
				var secondes = (Array(2).join(0) + newdate.getSeconds()).slice(-2);

				return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + secondes;
			}
		},
		// 获取设备的历史数据
		getHistoryData() {
			var _ = this
			if (getQueryString('macAddress')) {
				ajax({
					type: "post",
					url: "airSticker/get/history",
					data: {
						macAddress: getQueryString('macAddress'),
						deviceType: 'T10N'
					},
					success: function (res) {
						if (res.code == 0) {
							var data = res.data
							_.xdata = []
							_.ydata = []
							_.monthlist = []
							_.daylist = []
							_.day_time_list = []

							_.eTimes = data.allLevelCount.EXCELLENT || 0
							_.gTimes = data.allLevelCount.GOOD || 0
							_.mTimes = data.allLevelCount.MEDIUM || 0
							_.pTimes = data.allLevelCount.POOR || 0
							_.bTimes = data.allLevelCount.BAD || 0

							//图表数据
							for (var prop in data.lasted24Item) {
								_.xdata.push(prop)
								_.ydata.push(data.lasted24Item[prop])
							}
							_.ydata = _.ydata.map(function (item) {
								item = item.toFixed(2)
								return item
							})

							_.ydataMax = Math.max.apply(null, _.ydata)
							_.ydataMax = Math.ceil(_.ydataMax)
							var arrMonthChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

							for (var prop in data.monthLevelCount) {
								_.monthlist.push({
									year_month: prop,
									month: arrMonthChinese[parseInt((prop.split('-'))[1] - 1)] + '月',
									year: (prop.split('-'))[0] + '年',
									ex: data.monthLevelCount[prop].EXCELLENT,
									gd: data.monthLevelCount[prop].GOOD,
									medium: data.monthLevelCount[prop].MEDIUM,
									poor: data.monthLevelCount[prop].POOR,
									bad: data.monthLevelCount[prop].BAD
								})
							}
							for (var prop in data.dayOfLastedMonthList) {
								_.daylist.push({
									id: prop,
									time: _.dateFormat(data.dayOfLastedMonthList[prop], 'month_day'),
									start_day: _.dateFormat(data.dayOfLastedMonthList[prop], 'yyyy-MM-dd')
								})
							}


							//判断是否取历史缓存中的点击数据
							if (localStorage.getItem('T10NInfo_clicked_month')) {
								data = JSON.parse(localStorage.getItem('T10NInfo_clicked_month'))
								//重新查找monthIndex
								// console.log('T10NInfo_clicked_month', data)
								data.monthIndex = _.searchIndex(data, _.monthlist, 'month')
								// console.log('data.monthIndex',data.monthIndex)
								_.openMonthid = data.monthIndex
								_.getmonthlist(data)
							} else {
								console.log('_.monthlist', _.monthlist)
								_.getmonthlist(_.monthlist[0])
							}
						}
						//当所有数据全部删完之后的异常处理
						if (res.code == 1051) {
							_.xdata = []
							_.ydata = []
							_.monthlist = []
							_.daylist = []
							_.day_time_list = []

							_.eTimes = 0
							_.gTimes = 0
							_.mTimes = 0
							_.pTimes = 0
							_.bTimes = 0

							document.getElementById('chartsDiv').style.display = 'none';

						}
					},
					error: function () {
						console.log("error")
					}
				})
			}
			// //获取历史数据列表,post请求
		},

		// 重新查找应打开的index
		searchIndex(data, datalist, type) {
			var data_start_date = ''
			if (type == 'month') {
				data_start_date = data.start_month
			} else {
				data_start_date = data.start_day
			}

			for (var i = 0; i < datalist.length; i++) {
				var item = datalist[i]
				if (type == 'month') {
					if (data_start_date == item.year_month) {
						return i
					}
				} else {
					if (data_start_date == item.start_day) {
						// console.log('data_start_date == item.start_day', i)
						return i
					}
				}
			}
			return -1
		},


		// 查询用户信息和设备信息
		getBasicInfo() {
			var _ = this
			if (getQueryString('macAddress')) {
				ajax({
					type: "post",
					url: "device/bind/user/info/get",
					data: {
						deviceId: getQueryString('macAddress')
					},
					success: function (res) {
						if (res.code == 0) {
							var data = res.data
							_.devicename = data.deviceNickName
						} else {}
					},
					error: function () {
						console.log("error")
					}
				})
			}
		},

		//空气质量等级显示文字及背景颜色
		selectlevel(data) {
			//空气质量等级： 优： 0-1， 良：1-2，中: 2-5, 较差: 5-10, 差： 10-正无穷大
			var level = {
				txt: '',
				bgClass: ''
			}
			if (data >= 0 && data <= 1) {
				return level = {
					txt: '优',
					bgClass: 'bg-green'
				}
			} else if (data > 1 && data <= 2) {
				return level = {
					txt: '良',
					bgClass: 'bg-Lightblue'
				}
			} else if (data > 2 && data <= 5) {
				return level = {
					txt: '中',
					bgClass: 'bg-orange'
				}
			} else if (data > 5 && data <= 10) {
				return level = {
					txt: '较差',
					bgClass: 'bg-purple'
				}
			} else if (data > 10) {
				return level = {
					txt: '差',
					bgClass: 'bg-red'
				}
			} else {
				return level = {
					txt: '--',
					bgClass: 'bg-gray'
				}
			}
		},
		// 点击月份，请求某一时间段数据接口
		selectMonth(data, index) {
			var _ = this

			if (_.openMonthid == index) {
				_.openMonthid = -1
			} else {
				//请求每月时，page 也要恢复原始数据
				_.page = 0
				_.daylist = []
				_.day_time_list = []

				_.openMonthid = index

				_.clickedDate_month = {
					start_month: data.year_month,
					monthIndex: index,
				}
				localStorage.setItem('T10NInfo_clicked_month', JSON.stringify(_.clickedDate_month));

				_.getmonthlist(data)

			}

			_.openDayid = 0
		},

		//请求月份数据接口
		getmonthlist(data) {
			var _ = this

			var start_month = data.year_month

			//判断是否取缓存中的点击日期
			if (localStorage.getItem('T10NInfo_clicked_month')) {
				start_month = JSON.parse(localStorage.getItem('T10NInfo_clicked_month')).start_month
			}


			ajax({
				type: "post",
				url: "airSticker/get/monthinfo",
				data: {
					macAddress: getQueryString('macAddress'),
					startMonth: start_month
				},
				success: function (res) {
					_.daylist = []
					_.day_time_list = []
					if (res.code == 0) {
						var data = res.data
						for (var prop in data.dayOfMonthList) {
							_.daylist.push({
								id: prop,
								time: _.dateFormat(data.dayOfMonthList[prop], 'month_day'),
								start_day: _.dateFormat(data.dayOfMonthList[prop], 'yyyy-MM-dd')
							})
						}
						_.page = 0

						if (localStorage.getItem('T10NInfo_clicked_day')) {
							data = JSON.parse(localStorage.getItem('T10NInfo_clicked_day'))
							//重新查找dayIndex
							// console.log('T10NInfo_clicked_day', data)
							data.dayIndex = _.searchIndex(data, _.daylist, 'day')
							_.openDayid = data.dayIndex
							// _.getDay_time_list(data)

							if (_.openDayid == -1) {
								localStorage.removeItem('T10NInfo_clicked_day')
								_.openDayid = 0
								_.getDay_time_listByPage(_.daylist[0])
							} else {
								_.getDay_time_listByPage(data)
							}

						} else {
							_.getDay_time_listByPage(_.daylist[0])
						}
					} else {
						_.daylist = []
						_.day_time_list = []
						console.log('请求参数缺失')
					}
				},
				error: function () {
					console.log("error")
				}
			})

		},

		// 点击日期，请求某一时间段数据接口
		selectDay(data) {
			var _ = this
			// _.day_time_list = []
			if (_.openDayid == data.id) {
				_.openDayid = -1
			} else {

				// 每次点击每天请求数据时，按钮时要还原page=0
				_.page = 0
				_.day_time_list = []

				_.openDayid = data.id

				_.clickedDate_day = {
					start_day: data.start_day,
					dayIndex: data.id,
				}
				localStorage.setItem('T10NInfo_clicked_day', JSON.stringify(_.clickedDate_day));

				// _.getDay_time_list(data)
				_.getDay_time_listByPage(data)

			}
		},
		//获取指定日期的数据列表
		getDay_time_list(data) {
			var _ = this
			var start_day = data.start_day
			//判断是否取缓存中的点击日期
			if (localStorage.getItem('T10NInfo_clicked_day')) {
				start_day = JSON.parse(localStorage.getItem('T10NInfo_clicked_day')).start_day
			}


			ajax({
				type: "post",
				url: "airSticker/get/dayinfo",
				data: {
					macAddress: getQueryString('macAddress'),
					startDay: start_day
				},
				success: function (res) {
					_.day_time_list = []
					if (res.code == 0) {
						var data = res.data

						_.day_time_list = data.map(function (item) {
							item.num = item.airQuality.toFixed(2)
							item.leveltxt = _.selectlevel(item.num).txt
							item.bgClass = _.selectlevel(item.num).bgClass
							item.time = _.dateFormat(_.timestampTodate(item.sampleTime), 'HH:mm')
							return item
						})
					} else {
						_.day_time_list = []
						console.log('请求参数缺失')
					}
				},
				error: function () {
					console.log("error");
					_.day_time_list = []
					console.log('请求参数缺失')
				}
			})

		},

		//每天数据的滑动和分页加载
		//下滑开始
		touchStartY(e) {
			this.startY = e.touches[0].clientY;
		},
		//滑动结束
		touchEndY(e) {
			// var parentElement = e.currentTarget.parentElement;
			this.endY = e.changedTouches[0].clientY;
			// 下滑
			if (this.startY - this.endY > 30 && this.page < this.sumpage - 1 && this.openDayid != -1) {
				this.page++;

				if (localStorage.getItem('T10NInfo_clicked_day')) {
					data = JSON.parse(localStorage.getItem('T10NInfo_clicked_day'))
					data.dayIndex = this.searchIndex(data, this.daylist, 'day')

					this.openDayid = data.dayIndex
					// _.getDay_time_list(data)
					this.getDay_time_listByPage(data)
				} else {
					this.getDay_time_listByPage(this.daylist[0])
				}

			}
			this.startY = 0;
			this.endY = 0;
		},

		//获取指定日期的数据列表--分页
		getDay_time_listByPage(data) {
			var _ = this
			var params = {
				mac_address: getQueryString('macAddress') || '',
				start_day: data.start_day,
				pageNumber: _.page,
				pageSize: 20,
			}

			//判断是否取缓存中的点击日期
			if (localStorage.getItem('T10NInfo_clicked_day')) {
				params.start_day = JSON.parse(localStorage.getItem('T10NInfo_clicked_day')).start_day
			}
			_.loading = true
			ajax({
				type: "post",
				url: "airSticker/get/dayinfo",
				data: {
					macAddress: params.mac_address,
					startDay: params.start_day,
					pageNumber: params.pageNumber,
					pageSize: params.pageSize
				},
				success: function (res) {
					if (res.code == 0) {
						var data = res.data

						_.sumpage = data.totalPages

						data.content = data.content.map(function (item) {
							item.num = item.airQuality.toFixed(2)
							item.leveltxt = _.selectlevel(item.num).txt
							item.bgClass = _.selectlevel(item.num).bgClass
							item.time = _.dateFormat(_.timestampTodate(item.sampleTime), 'HH:mm')

							item.temperature = Math.round(item.temperature)
							item.humidity = Math.round(item.humidity)
							return item
						})

						if (_.page === 0) _.day_time_list = data.content;
						else _.day_time_list = _.day_time_list.concat(data.content);

						_.loading = false
					} else {}
				},
				error: function () {
					console.log("error")
					_.day_time_list = []
					console.log('请求参数缺失')
				}
			})

		},

		//跳转
		skip(e) {
			var index = e.currentTarget.dataset.index;
			var _ = this
			if (_.checkSlide()) {
				_.restSlide();
				var dataId = _.day_time_list[index].id
				console.log('dataId', dataId)
				url = "itemData.html?dataId=" + dataId + '&bottomBtnShow=' + 0;
				window.location.href = url;
			} else {
				var dataId = _.day_time_list[index].id
				url = "itemData.html?dataId=" + dataId + '&bottomBtnShow=' + 0;
				window.location.href = url;

			}

		},

		// 每条数据的滑动和删除方法
		//滑动开始
		touchStart(e) {
			this.startX = e.touches[0].clientX;
		},
		//滑动结束
		touchEnd(e) {
			var parentElement = e.currentTarget.parentElement;
			this.endX = e.changedTouches[0].clientX;
			// 左滑
			if (parentElement.dataset.type == 0 && this.startX - this.endX > 60) {
				this.restSlide();
				parentElement.dataset.type = 1;
			}
			if (parentElement.dataset.type == 1 && this.startX - this.endX < 20) {
				this.restSlide();
			}
			//  console.log('this.startX',this.startX,'this.endX',this.endX)
			this.startX = 0;
			this.endX = 0;
		},
		//判断当前是否有滑块处于滑动状态
		checkSlide() {
			var listItems = document.querySelectorAll('.list-item');
			for (var i = 0; i < listItems.length; i++) {
				if (listItems[i].dataset.type == 1) {
					return true;
				}
			}
			return false;
		},
		//复位滑动状态
		restSlide() {
			var listItems = document.querySelectorAll('.list-item');
			// 复位
			for (var i = 0; i < listItems.length; i++) {
				listItems[i].dataset.type = 0;
			}
		},
		//每条记录删除
		deleteItem(e) {
			var index = e.currentTarget.dataset.index;
			var _ = this
			_.restSlide();

			var dataid = _.day_time_list[index].id
			var params = {
				id: dataid,
			}
			if (params.id) {
				ajax({
					type: "post",
					url: "airSticker/delete/id",
					data: {
						id: params.id,
					},
					success: function (res) {
						if (res.code == 0) {
							_.day_time_list.splice(index, 1);

							_.getHistoryData()

							var returnDataId = ''
							if (_.day_time_list && _.day_time_list.length > 0) {
								returnDataId = _.day_time_list[0].id
							}

							if (isIOS) { 
								try {
									window.webkit.messageHandlers.lstNative.postMessage({
										'method': 'shareDeleteDataIdKey',
										'dataId': returnDataId
									})
								} catch (e) {
									console.log(e)
								}
							} else { //判断Android
								window.android.updateRecentDataId(returnDataId)
							}
						} else {}
					},
					error: function () {
						console.log("error")
					}
				})
			}

		},

		// 每月的数据的滑动和删除方法
		//滑动开始
		touchMonthItemStart(e) {
			var _ = this
			var touchindex = e.currentTarget.dataset.index;
			if (touchindex == _.openMonthid) {
				return _.startX_month = 0;
			} else {
				_.startX_month = e.touches[0].clientX;
			}

		},
		//滑动结束
		touchMonthItemEnd(e) {
			var parentElement = e.currentTarget.parentElement;
			this.endX_month = e.changedTouches[0].clientX;
			// 左滑
			if (parentElement.dataset.type == 0 && this.startX_month - this.endX_month > 60) {
				this.restSlide_month();
				parentElement.dataset.type = 1;
			}
			if (parentElement.dataset.type == 1 && this.startX_month - this.endX_month < 20) {
				this.restSlide_month();
			}
			this.startX_month = 0;
			this.endX_month = 0;
		},
		//判断当前是否有滑块处于滑动状态
		checkSlide_month() {
			var listItems = document.querySelectorAll('.monthitem-sumcontent');
			for (var i = 0; i < listItems.length; i++) {
				if (listItems[i].dataset.type == 1) {
					return true;
				}
			}
			return false;
		},
		//复位滑动状态
		restSlide_month() {
			var listItems = document.querySelectorAll('.monthitem-sumcontent');
			// 复位
			for (var i = 0; i < listItems.length; i++) {
				listItems[i].dataset.type = 0;
			}
		},
		//每月记录删除
		deleteMonthItem(e) {
			var index = e.currentTarget.dataset.index;
			var _ = this
			_.restSlide_month();

			var delmonth = _.monthlist[index].year_month
			var params = {
				mac_address: getQueryString('macAddress') || '',
				start_month: delmonth
			}

			if (params.mac_address && params.start_month) {
				ajax({
					type: "post",
					url: "airSticker/delete/month",
					data: {
						macAddress: params.mac_address,
						startMonth: params.start_month
					},
					success: function (res) {
						if (res.code == 0) {
							_.getHistoryData()

							var returnDataId = ''
							if (_.day_time_list && _.day_time_list.length > 0) {
								returnDataId = _.day_time_list[0].id
							}
							//给APP回传 ：每次删除后的最近一条数据id
							if (isIOS) { //判断iPhone|iPad|iPod|iOS
								try {
									window.webkit.messageHandlers.lstNative.postMessage({
										'method': 'shareDeleteDataIdKey',
										'dataId': returnDataId
									})
								} catch (err) {
									console.log(err)
								}
							} else { //判断Android
								try {
									window.android.updateRecentDataId(returnDataId)
								} catch (err) {
									console.log(err)
								}
							}
						} else {}
					},
					error: function () {
						console.log("error")
					}
				})
			}

		},

		//echarts 数据图表方法
		drawColumnChart() {
			var _ = this
			_.chartColumn = echarts.init(document.getElementById('chartColumn'));
			_.chartColumn.setOption({
				title: {},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					inverse: true, //此属性控制方向,默认为false,改为true
					axisTick: { //刻度线
						show: false
					},
					axisLabel: {
						textStyle: {
							color: '#71717F',
							fontSize : 10
						},
						formatter: function (value, index) { //value当前值，index当前索引
							return _.dateFormat(value, 'HH:mm');
						}
					},
					
					axisLine: {
						show: true,
						lineStyle: {
							color: "#71717F"
						}
					},
					data: _.xdata
				},
				yAxis: {
					type: 'value',
					scale: true,
					name: 'PPM',
					min: 0,
					axisTick: { //y轴刻度线
						show: false
					},
					axisLine: { //y轴
						show: false
					},
					splitLine:{
						show:true,
						lineStyle:{
							type:'dashed',
							color:"#71717f"
						}
					},
					axisLabel: {
						textStyle: {
							color: '#71717F',
							fontSize : 10
						}
					},
					nameTextStyle: {
						color: "#71717F",
					}
				},
				series: [{
					name: 'PPM值',
					type: 'bar',
					barWidth: 6, //柱图宽度
					data: _.ydata,
					itemStyle: {
						normal: {
							color: function (params) {
								var colorList = ['#01EA01', '#00EAEA', '#FFE12F', '#FF00FF', '#FF0000'];
								if (params.data >= 0 && params.data <= 1) {
									return colorList[0];
								} else if (params.data > 1 && params.data <= 2) {
									return colorList[1];
								} else if (params.data > 2 && params.data <= 5) {
									return colorList[2];
								} else if (params.data > 5 && params.data <= 10) {
									return colorList[3];
								} else if (params.data > 10) {
									return colorList[4];
								}
							}
						}
					}
				}],

				dataZoom: [
					{
						type: 'inside',
						start: (1 - 24 / _.ydata.length) * 100,
						end: 100,
					},
				]


			});
		},


	}

});