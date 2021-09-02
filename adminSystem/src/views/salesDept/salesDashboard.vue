<template>
    <section>
        <div class="bg">
            <div class="header" @click="handleFullScreen">
                <img class="logo" src="../../assets/logo.png" alt="">
                销售部看板
            </div>

            <el-row :gutter="20" style="margin-top: 10px;">
                <!-- 左边 -->
                <el-col :span="8">
                    <div class="boxbg">
                        <div style="padding: left 5px;color:#409EFF;">
                            <svg-icon icon-class="salesDept_historyDate" />
                            上月情况</div>
                    </div>
                    <div style="padding: 10px; height:200px" class="boxbg">
                        <div>
                            <el-table :data="channelData1" size="small" style="width: 100%">
                                <el-table-column prop="customerType" label="客户">
                                    <template scope="scope">
                                        {{scope.row.customerType||"零售"}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="monthTask" label="月目标">
                                </el-table-column>
                                <el-table-column prop="actualComeplete" label="实际完成">
                                </el-table-column>
                                <el-table-column prop="completionRate" label="完成率">
                                    <template scope="scope">
                                        {{(scope.row.actualComeplete/scope.row.monthTask*100).toFixed(2)+"%"}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="boxbg" style="margin-top:10px;">
                        <div ref="lastChannelChart1" style="width:100%;height:200px"></div>
                    </div>
                    <div class="boxbg" style="margin-top:10px;">
                        <div ref="lastChannelChart2" style="width:100%;height:200px"></div>
                    </div>
                    <div class="boxbg" style="margin-top:10px;">
                        <div ref="lastChannelChart3" style="width:100%;height:200px"></div>
                    </div>
                </el-col>
                <!-- 中间 -->
                <el-col :span="8">
                    <div class="boxbg">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div style="padding: left 5px;color:#409EFF;">
                                    <svg-icon icon-class="salesDept_date" />
                                    当月销售情况</div>
                            </el-col>

                        </el-row>
                    </div>
                    <div style="padding: 10px;height:200px" class="boxbg">
                        <div>
                            <el-table :data="channelData2" style="width: 100%" size="small">
                                <el-table-column prop="customerType" label="客户">
                                    <template scope="scope">
                                        {{scope.row.customerType||"零售"}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="monthTask" label="月目标">
                                    <template scope="scope">
                                        {{scope.row.monthTask}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="actualComeplete" label="实际完成">
                                    <template scope="scope">
                                        {{scope.row.actualComeplete}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="completionRate" label="完成率">
                                    <template scope="scope">
                                        {{(scope.row.actualComeplete/scope.row.monthTask*100).toFixed(2)+"%"}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="boxbg" style="margin-top:10px;">
                        <div ref="channelChart" style="width:100%;height:300px"></div>
                    </div>
                    <div class="boxbg" style="margin-top:10px;">
                        <div ref="channelChart2" style="width:100%;height:332px"></div>
                    </div>
                </el-col>

                <!-- 右边 -->
                <el-col :span="8">
                    <div class="boxbg">
                        <div style="padding: left 5px; color:#409EFF;">
                            <svg-icon icon-class="salesDept_nowDate" />
                            数据截至到{{nowTime+" "+"24:00:00"}} 为止</div>
                    </div>
                    <div class="boxbg">
                        <div ref="shopChart" style="width:100%;height:424px"></div>
                    </div>
                    <div style="margin-top: 10px;padding: 10px;height:440px" class="boxbg">
                        <div>
                            <el-table :data="shopData" size="small" style="width: 100%">
                                <el-table-column prop="saleboardName" label="店铺">
                                </el-table-column>
                                <el-table-column prop="saleboardPerson" label="责任人">
                                </el-table-column>
                                <el-table-column prop="totalTask" label="月目标">
                                </el-table-column>
                                <el-table-column prop="sum" label="已完成">
                                </el-table-column>
                                <el-table-column prop="completionRate" label="完成率">
                                    <template scope="scope">
                                        {{(scope.row.sum/scope.row.totalTask*100).toFixed(2)+"%"}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>



    </section>
</template>

<script>
    import echarts from 'echarts'
    import { mapGetters } from 'vuex'
    import { shopDataList, shopCustomerList, shopCustomerLine, shopCustomerTop, shopTop } from '@/api/salesDept/salesDashboard';
    export default {
        data() {
            return {
                fullscreen: false,
                nowTime: new Date(),


                editFormRules: {},
                shopData: [],

                channelData1: [],
                channelData2: [],

                topData: [],

                currentYear: new Date().getFullYear(),
                currenrMonth: new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
                lastMonth: new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth(),
                yesterdayMonth: new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
            }
        },
        created() {
            this.nowTime = this.getYesterday()
        },
        mounted() {

            this.getshopDataList()
            this.getShopCustomerList()
            this.getShopCustomerList2()
            this.getShopCustomerLine()
            this.getShopCustomerTop()
            this.getShopCustomerTop2()

            setInterval(() => {
                this.getshopDataList()
                this.getShopCustomerList()
                this.getShopCustomerList2()
                this.getShopCustomerLine()
                this.getShopCustomerTop()
                this.getShopCustomerTop2()
            }, 3600000)


        },
       
        
        methods: {
            handleFullScreen() {
                //let element = document.documentElement;
                let element=document.getElementsByClassName("app-main")[0]
                console.log(this.fullscreen)
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;

            },
            getYesterday() {
                var time = (new Date).getTime() - 24 * 60 * 60 * 1000;
                var yesterday = new Date(time);
                var month = yesterday.getMonth();
                var day = yesterday.getDate();
                this.yesterdayMonth = yesterday.getMonth() + 1 > 9 ? (yesterday.getMonth() + 1) : "0" + (yesterday.getMonth() + 1);
                return yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1 > 9 ? (yesterday.getMonth() + 1) : "0" + (yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));

            },
            //上月渠道代理
            getLastChannelEchartData1(data) {
                let legendData = [];
                let series = [];

                data.forEach(ele => {
                    legendData.push(ele.customerName)
                    let seriesJson = {
                        name: ele.customerName,
                        type: 'bar',
                        data: [ele.actualComeplete],
                        label: {
                            show: true,
                            position: 'right',
                            formatter: "{a}:{c}"
                        }
                    }
                    series.push(seriesJson)
                })
                const chart = this.$refs.lastChannelChart1
                if (chart) {
                    const myChart = echarts.init(chart)
                    let option = {
                        title: {
                            text: '渠道代理商Top3'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            data: legendData,
                            bottom: "0%"
                        },
                        grid: {
                            left: 100
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'value',
                            name: '元',

                        },
                        yAxis: {
                            type: 'category',
                            inverse: true,
                            data: ['渠道代理'],
                        },
                        series: series

                    };
                    myChart.setOption(option)
                    window.addEventListener("resize", function () {
                        myChart.resize()
                    })
                }
                this.$on('hook:destroyed', () => {
                    window.removeEventListener("resize", function () {
                        myChart.resize();
                    });
                })
            },
            //上月定制客户
            getLastChannelEchartData2(data) {
                let legendData = [];
                let series = [];

                data.forEach(ele => {
                    legendData.push(ele.customerName)
                    let seriesJson = {
                        name: ele.customerName,
                        type: 'bar',
                        data: [ele.actualComeplete],
                        label: {
                            show: true,
                            position: 'right',
                            formatter: "{a}:{c}"
                        }
                    }
                    series.push(seriesJson)
                })
                const chart = this.$refs.lastChannelChart2
                if (chart) {
                    const myChart = echarts.init(chart)
                    let option = {
                        title: {
                            text: '定制客户Top3'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            data: legendData,
                            bottom: "0%"
                        },
                        grid: {
                            left: 100
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'value',
                            name: '元',

                        },
                        yAxis: {
                            type: 'category',
                            inverse: true,
                            data: ['定制客户'],
                        },
                        series: series
                    };
                    myChart.setOption(option)
                    window.addEventListener("resize", function () {
                        myChart.resize()
                    })
                }
                this.$on('hook:destroyed', () => {
                    window.removeEventListener("resize", function () {
                        myChart.resize();
                    });
                })
            },
            //上月零售出货
            getLastChannelEchartData3(data) {
                let legendData = [];
                let series = [];

                data.forEach(ele => {
                    legendData.push(ele.customerName)
                    let seriesJson = {
                        name: ele.customerName,
                        type: 'bar',
                        data: [ele.actualComeplete],
                        label: {
                            show: true,
                            position: 'right',
                            formatter: "{a}:{c}"
                        }
                    }
                    series.push(seriesJson)
                })
                const chart = this.$refs.lastChannelChart3
                if (chart) {
                    const myChart = echarts.init(chart)
                    let option = {
                        title: {
                            text: '零售出货Top3'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            data: legendData,
                            bottom: "0%"
                        },
                        grid: {
                            left: 100
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'value',
                            name: '元',

                        },
                        yAxis: {
                            type: 'category',
                            inverse: true,
                            data: ['零售出货'],
                        },
                        series: series
                    };
                    myChart.setOption(option)
                    window.addEventListener("resize", function () {
                        myChart.resize()
                    })
                }
                this.$on('hook:destroyed', () => {
                    window.removeEventListener("resize", function () {
                        myChart.resize();
                    });
                })
            },

            //当月的代理情况折线
            getchannelEchartData(data) {
                let xAxis = [];
                let yAxis = [];
                let keys = [];
                for (var key in data) {
                    keys.push(key)
                }
                keys.sort()
                for (var i = 0; i < keys.length; i++) {
                    for (var key in data) {
                        if (keys[i] == key) {
                            xAxis.push(key)
                            yAxis.push(data[key])
                        }
                    }
                }







                const chart = this.$refs.channelChart
                if (chart) {
                    const myChart = echarts.init(chart)
                    let option = {
                        title: {
                            text: '日销售额'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['日销售额'],
                            // textStyle: {
                            //     color: "#fff"
                            // }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: xAxis,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    // color: "#fff"
                                }
                            },
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    // color: "#fff"
                                }
                            },
                        },
                        // dataZoom: [{
                        //     startValue: '2'
                        // }, {
                        //     type: 'inside'
                        // }],
                        series: [
                            {
                                name: '总销售额',
                                type: 'line',
                                data: yAxis
                            }

                        ]
                    };


                    myChart.setOption(option)
                    window.addEventListener("resize", function () {
                        myChart.resize()
                    })
                }
                this.$on('hook:destroyed', () => {
                    window.removeEventListener("resize", function () {
                        myChart.resize();
                    });
                })
            },
            //当月top9
            getchannelEchartData2(data) {
                data.sort(function (a, b) {
                    let x = a["actualComeplete"]
                    let y = b["actualComeplete"]
                    return ((x < y) ? 1 : (x > y) ? -1 : 0)
                })

                let dimensions = ['product',];
                let sourceJson = { product: "", };
                let series = [];
                data.forEach(ele => {
                    dimensions.push(ele.customerName)
                    sourceJson[ele.customerName] = ele.actualComeplete;
                    series.push({
                        type: 'bar', label: {
                            show: true,
                            position: 'top'
                        },
                    })
                })

                // console.log(dimensions)
                // console.log(sourceJson)
                const chart = this.$refs.channelChart2
                if (chart) {
                    const myChart = echarts.init(chart)
                    let option = {
                        title: {
                            text: '本月销售额TOP9'
                        },
                        legend: {
                            bottom: "0%"
                        },
                        tooltip: {},
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        dataset: {
                            dimensions: dimensions,
                            source: [
                                sourceJson
                            ]
                        },
                        xAxis: { type: 'category' },
                        yAxis: {},
                        series: series
                    };


                    myChart.setOption(option)
                    window.addEventListener("resize", function () {
                        myChart.resize()
                    })
                }
                this.$on('hook:destroyed', () => {
                    window.removeEventListener("resize", function () {
                        myChart.resize();
                    });
                })
            },

            //店铺的情况
            getShopEchartData(data) {
                let totalNum = 0;
                let nowNum = 0;
                let percentage = 0;
                data.forEach(ele => {
                    totalNum += ele.totalTask
                    nowNum += ele.sum
                });
                if (data.length > 0)
                    percentage = (nowNum / totalNum * 100).toFixed(2)
                const chart = this.$refs.shopChart
                if (chart) {
                    const myChart = echarts.init(chart)
                    let option = {
                        title: {
                            text: '电商完成情况'
                        },
                        tooltip: {
                            formatter: '{a} <br/>{b} : {c}%',
                        },
                        toolbox: {
                            feature: {
                                //restore: {},
                                saveAsImage: {}
                            }
                        },
                        series: [
                            {
                                name: '总业务指标',
                                type: 'gauge',
                                detail: { formatter: percentage + '%', fontSize: 30 },
                                data: [{ value: percentage, name: '完成率' }],
                                title: {
                                    show: true,
                                    // color: "rgba(244, 237, 237, 1)"
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']]
                                    }
                                }
                            }

                        ],
                        color: ['#61a0a8', '#2f4554', '#d48265']

                    };
                    myChart.setOption(option)
                    window.addEventListener("resize", function () {
                        myChart.resize()
                    })
                }
                this.$on('hook:destroyed', () => {
                    window.removeEventListener("resize", function () {
                        myChart.resize();
                    });
                })
            },



            //店铺表格
            getshopDataList() {
                shopDataList({
                    month: this.currentYear + "-" + this.yesterdayMonth
                }).then(res => {
                    if (res.code == 0) {

                        let sum = 0;
                        let realSum = 0;
                        this.shopData = res.data
                        this.shopData.sort(function (a, b) {
                            let x = a.sum / a.totalTask
                            let y = b.sum / b.totalTask
                            return ((x < y) ? 1 : (x > y) ? -1 : 0)
                        })
                        this.shopData.forEach(ele => {
                            realSum += ele.sum
                            sum += ele.totalTask
                        })
                        if (this.shopData.length > 0)
                            this.shopData.push({
                                sum: realSum,
                                totalTask: sum,
                                saleboardName: '合计',
                                saleboardPerson: "/"
                            })
                        this.getShopEchartData(res.data)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            //代理商表格上月
            getShopCustomerList() {
                shopCustomerList({
                    month: this.currentYear + "-" + this.lastMonth
                }).then(res => {
                    if (res.code == 0) {
                        let sum = 0;
                        let realSum = 0;
                        res.data.forEach(item => {
                            if (item) {
                                this.channelData1.push(item)
                            }
                        })
                        this.channelData1.forEach(ele => {
                            realSum += ele.actualComeplete
                            sum += ele.monthTask
                        })
                        if (this.channelData1.length > 0)
                            this.channelData1.push({
                                actualComeplete: realSum,
                                monthTask: sum,
                                customerType: '合计'
                            })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            //代理商表格当月
            getShopCustomerList2() {
                shopCustomerList({
                    month: this.currentYear + "-" + this.currenrMonth
                }).then(res => {
                    if (res.code == 0) {
                        let sum = 0;
                        let realSum = 0;
                        res.data.forEach(item => {
                            if (item) {
                                this.channelData2.push(item)
                            }
                        })
                        this.channelData2.forEach(ele => {
                            realSum += ele.actualComeplete
                            sum += ele.monthTask

                        })
                        if (this.channelData2.length > 0)
                            this.channelData2.push({
                                actualComeplete: realSum,
                                monthTask: sum,
                                customerType: '合计'
                            })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            //代理商折线
            getShopCustomerLine() {
                shopCustomerLine({
                    month: this.currentYear + "-" + this.currenrMonth
                }).then(res => {
                    if (res.code == 0) {
                        this.getchannelEchartData(res.data)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            //top 上个月
            getShopCustomerTop() {
                shopCustomerTop({
                    customerType: "渠道",
                    month: this.currentYear + "-" + this.lastMonth
                }).then(res => {
                    if (res.code == 0) {
                        this.getLastChannelEchartData1(res.data)
                    }
                }).catch(error => {
                    console.log(error)
                })

                shopCustomerTop({
                    customerType: "定制",
                    month: this.currentYear + "-" + this.lastMonth
                }).then(res => {
                    if (res.code == 0) {
                        this.getLastChannelEchartData2(res.data)
                    }
                }).catch(error => {
                    console.log(error)
                })

                shopTop({
                    customerType: "零售",
                    month: this.currentYear + "-" + this.lastMonth
                }).then(res => {
                    if (res.code == 0) {
                        this.getLastChannelEchartData3(res.data)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            //TOP 当月
            getShopCustomerTop2() {
                var that = this
                that.topData = []
                shopCustomerTop({
                    customerType: "渠道",
                    month: this.currentYear + "-" + this.currenrMonth
                }).then(res => {
                    if (res.code == 0) {
                        res.data.forEach(ele => {
                            that.topData.push(ele)
                        })
                    }

                    shopCustomerTop({
                        customerType: "定制",
                        month: this.currentYear + "-" + this.currenrMonth
                    }).then(res => {
                        if (res.code == 0) {
                            res.data.forEach(ele => {
                                that.topData.push(ele)
                            })
                        }

                        shopTop({
                            customerType: "零售",
                            month: this.currentYear + "-" + this.currenrMonth
                        }).then(res => {
                            if (res.code == 0) {
                                res.data.forEach(ele => {
                                    that.topData.push(ele)
                                })
                                that.getchannelEchartData2(that.topData)
                            }
                        })
                    })
                }).catch(error => {
                    console.log(error)
                })





            }




        },

    }

</script>
<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
    }

    body {
        overflow-x: hidden;
    }

    .header {
        border-bottom: 10px solid #eee;
        line-height: 40px;
        font-size: 20px;

        .logo {
            width: 40px;
            position: relative;
            top: 11px;
            margin-right: 5px;
            margin-left: 10px;
        }
    }



    .boxbg {
        padding: 10px;
        border: 1px solid #eee;
        box-sizing: border-box;
    }

    table tbody tr:last-child {
        background-color: #f5f7fa;
    }
</style>