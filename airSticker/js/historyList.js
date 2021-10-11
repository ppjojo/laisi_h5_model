new Vue({
    el: '#app',
    data: {
        macAddress: getQueryString("macAddress"),

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

        //echarts图表数据
        chartColumn: null,
        xdata: [],
        ydata: [],
        ydataMax: 15,
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
        onclickLeft() {
            window.history.back()
        },
        sharePage() {
            alert("分享")
            Interaction.sharePage({
                title: this.classDetail.className,
                description: this.classDetail.description,
                url: host + "h5/h5V3/videoCourse/courseList.html?isShare=1&id=" + this.classDetail
                    .bigClassId,
            })
        },

        // 获取设备的历史数据
        getHistoryData() {
            ajax({
                type: "post",
                url: "airSticker/get/history",
                data: {
                    macAddress: this.macAddress,
                    deviceType: 'T10N'
                }
            }).then(res => {
                if (res.code == 0) {
                    var data = res.data
                    this.xdata = []
                    this.ydata = []
                    this.monthlist = []
                    this.daylist = []
                    this.day_time_list = []

                    this.eTimes = data.allLevelCount.EXCELLENT || 0
                    this.gTimes = data.allLevelCount.GOOD || 0
                    this.mTimes = data.allLevelCount.MEDIUM || 0
                    this.pTimes = data.allLevelCount.POOR || 0
                    this.bTimes = data.allLevelCount.BAD || 0

                    //图表数据
                    for (var prop in data.lasted24Item) {
                        this.xdata.push(prop)
                        this.ydata.push(data.lasted24Item[prop])
                    }
                    this.ydata = this.ydata.map(function(item) {
                        item = item.toFixed(2)
                        return item
                    })

                    this.ydataMax = Math.max.apply(null, this.ydata)
                    this.ydataMax = Math.ceil(this.ydataMax)
                    var arrMonthChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

                    for (var prop in data.monthLevelCount) {
                        this.monthlist.push({
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
                        this.daylist.push({
                            id: prop,
                            time: this.dateFormat(data.dayOfLastedMonthList[prop], 'month_day'),
                            start_day: this.dateFormat(data.dayOfLastedMonthList[prop], 'yyyy-MM-dd')
                        })
                    }


                    //判断是否取历史缓存中的点击数据
                    if (localStorage.getItem('T10NInfo_clicked_month')) {
                        data = JSON.parse(localStorage.getItem('T10NInfo_clicked_month'))
                        this.openMonthid = data.index
                        this.getmonthlist(data)
                    } else {
                        this.openMonthid = 0
                        this.getmonthlist(this.monthlist[0])
                    }
                }
                //当所有数据全部删完之后的异常处理
                if (res.code == 1051) {
                    this.xdata = []
                    this.ydata = []
                    this.monthlist = []
                    this.daylist = []
                    this.day_time_list = []

                    this.eTimes = 0
                    this.gTimes = 0
                    this.mTimes = 0
                    this.pTimes = 0
                    this.bTimes = 0

                    document.getElementById('chartsDiv').style.display = 'none';

                }
            })

        },
        // 查询用户信息和设备信息
        getBasicInfo() {
            ajax({
                type: "post",
                url: "device/bind/user/info/get",
                data: {
                    deviceId: getQueryString('macAddress')
                }
            }).then(res => {
                if (res.code == 0) {
                    var data = res.data
                    this.devicename = data.deviceNickName
                }
            })
        },


        // 点击月份，请求某一时间段数据接口
        selectMonth(item, index) {
            if (this.openMonthid == index) {
                this.openMonthid = -1
                return
            } else {
                //请求每月时，page 也要恢复原始数据
                this.page = 0
                this.daylist = []
                this.day_time_list = []
                this.openMonthid = index
                this.openDayid = 0
                this.clickedDate_month = {
                    year_month: item.year_month,
                    index: index,
                }
                localStorage.setItem('T10NInfo_clicked_month', JSON.stringify(this.clickedDate_month));
                this.getmonthlist(item)
            }

        },

        //请求月份数据接口
        getmonthlist(item) {
            var _ = this
            ajax({
                type: "post",
                url: "airSticker/get/monthinfo",
                data: {
                    macAddress: this.macAddress,
                    startMonth: item.year_month
                }
            }).then(res => {
                this.daylist = []
                this.day_time_list = []
                if (res.code == 0) {
                    var data = res.data
                    for (var prop in data.dayOfMonthList) {
                        this.daylist.push({
                            id: prop,
                            time: this.dateFormat(data.dayOfMonthList[prop], 'month_day'),
                            start_day: this.dateFormat(data.dayOfMonthList[prop], 'yyyy-MM-dd')
                        })
                    }
                    this.getDay_time_listByPage(_.daylist[0])
                }
            })

        },

        // 点击日期，请求某一时间段数据接口
        selectDay(data, index) {
            if (this.openDayid == index) {
                this.openDayid = -1
                return
            } else {
                this.day_time_list = []
                this.openDayid = index
                this.clickedDate_date = {
                    start_day: data.start_day,
                    index: index,
                }
                localStorage.setItem('T10NInfo_clicked_date', JSON.stringify(this.clickedDate_date));
                this.getDay_time_listByPage(data)

            }
        },
        //获取指定日期的数据列表--分页
        getDay_time_listByPage(data) {
            ajax({
                type: "post",
                url: "airSticker/get/dayinfo",
                data: {
                    macAddress: this.macAddress,
                    startDay: data.start_day,
                    pageNumber: 0,
                    pageSize: 9999
                }
            }).then(res => {
                if (res.code == 0) {
                    var data = res.data
                    var that = this
                    data.content = data.content.map(function(item) {
                        item.num = item.airQuality.toFixed(2)
                        item.leveltxt = that.selectlevel(item.num).txt
                        item.bgClass = that.selectlevel(item.num).bgClass
                        item.time = that.dateFormat(that.timestampTodate(item.sampleTime), 'HH:mm')

                        item.temperature = Math.round(item.temperature)
                        item.humidity = Math.round(item.humidity)
                        return item
                    })
                    this.day_time_list = data.content;
                }
            })

        },

        //跳转
        skip(item) {
            window.location.href = `itemData.html?dataId=${item.id}&bottomBtnShow=' + 0;`;
        },

        //时间记录删除
        deleteItem(item, index) {
            ajax({
                type: "post",
                url: "airSticker/delete/id",
                data: {
                    id: item.id,
                }
            }).then(res => {
                if (res.code == 0) {
                    this.$refs.daySwipecell[index].close()
                    this.day_time_list.splice(index, 1);
                    //this.getHistoryData()
                }
            })


        },

        //每月记录删除
        deleteMonthItem(item, index) {
            ajax({
                type: "post",
                url: "airSticker/delete/month",
                data: {
                    macAddress: this.macAddress,
                    startMonth: item.year_month
                }
            }).then(res => {
                this.$refs.monthSwipecell[index].close()
                this.monthlist.splice(index, 1);

                //this.getHistoryData()
            })

        },

        //echarts 数据图表方法
        drawColumnChart() {
            var _ = this
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));
            this.chartColumn.setOption({
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
                            fontSize: 10
                        },
                        formatter: function(value, index) { //value当前值，index当前索引
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
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: "#71717f"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#71717F',
                            fontSize: 10
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
                            color: function(params) {
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

                dataZoom: [{
                    type: 'inside',
                    start: (1 - 24 / _.ydata.length) * 100,
                    end: 100,
                }, ]


            });
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

    }

});