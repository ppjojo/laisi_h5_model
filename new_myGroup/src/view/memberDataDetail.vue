<template>
    <div id="app" class="memberDataDetail" v-cloak>
        <div class="header">
            <van-nav-bar title="小组成员数据" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
                <template #left>
                    <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.48rem;" />
                </template>
            </van-nav-bar>
        </div>
        <div class="chooseBox">
            <div class="peopleBox" @click="peopleListshow=true">
                <img class="imgBox" src="../img/group_jfl.png" alt="">
                <span>jahjgjjgjkas</span>
                <span class="icon iconfont icon-xialaxuanxiang" />
            </div>
            <div class="dateBox" @click="dateshow=true">
                <span>{{currentDatestr}}</span>
                <span class="icon iconfont icon-xialaxuanxiang" />
            </div>
        </div>

        <div class="dataBox">
            <!-- 跳绳 -->
            <div class="dataItem">
                <div class="typeBox">
                    <img src="../img/group_ts.png" alt="">
                    <span>跳绳</span>
                </div>
                <div class="detail">
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">跳绳个数(个)</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">2,3000</div>
                        <div class="numDesc">用时</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">消耗(kcal)</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">绊绳</div>
                    </div>
                    <div class="detailItem"></div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">最快频次(次/分)</div>
                    </div>
                </div>
            </div>
            <!-- 腕力球 -->
            <div class="dataItem">
                <div class="typeBox">
                    <img src="../img/group_wlq.png" alt="">
                    <span>腕力球</span>
                </div>
                <div class="detail">
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">圈数(圈)</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">2,3000</div>
                        <div class="numDesc">用时</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">消耗(kcal)</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">最大力量(kg)</div>
                    </div>
                    <div class="detailItem"></div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">最快转速(rpm)</div>
                    </div>
                </div>
            </div>
            <!-- 健腹轮 -->
            <div class="dataItem">
                <div class="typeBox">
                    <img src="../img/group_jfl.png" alt="">
                    <span>健腹轮</span>
                </div>
                <div class="detail">
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">次数(次)</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">2,3000</div>
                        <div class="numDesc">用时</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">消耗(kcal)</div>
                    </div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">距离(米)</div>
                    </div>
                    <div class="detailItem"></div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">达标率</div>
                    </div>
                </div>
            </div>
            <!-- 步数 -->
            <div class="dataItem">
                <div class="typeBox">
                    <img src="../img/group_step.png" alt="">
                    <span>步数</span>
                </div>
                <div class="detail">
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">步数(步)</div>
                    </div>
                    <div class="detailItem">

                    </div>
                    <div class="detailItem">
                        <div class="numBox">23000</div>
                        <div class="numDesc">距离(km)</div>
                    </div>
                </div>
            </div>
            <!-- 体脂秤 -->
            <div class="dataItem">
                <div class="typeBox">
                    <img src="../img/group_tzc.png" alt="">
                    <span>体脂秤</span>
                </div>
                <div class="balanceDetail">
                    <div id="main" style="width:100%; height:200px"></div>
                </div>
            </div>
        </div>

        <van-popup v-model="dateshow" position="bottom" style="z-index: 9999;">
            <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
                :formatter="formatter" swipe-duration=100 @confirm="dateConfirm" @cancel="dateshow = false" />
        </van-popup>
        <van-popup v-model="peopleListshow" position="bottom" round style="z-index: 9999;">
            <div class="peopleListBox">
                <div class="peopleBox" v-for="item in 5" @click="changeMemberUserId(item)">
                    <img class="imgBox" src="../img/group_jfl.png" alt="">
                    <span>jahjgjjgjkas</span>
                </div>
            </div>
        </van-popup>

    </div>
</template>

<script>
    import * as echarts from 'echarts/core';
    import {
        LineChart
    } from 'echarts/charts';
    import {
        TitleComponent,
        TooltipComponent,
        GridComponent
    } from 'echarts/components';
    // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
    import {
        CanvasRenderer
    } from 'echarts/renderers';
    // 注册必须的组件
    echarts.use(
        [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
    );




    import {
        NavBar,
        Icon,
        Popup,
        DatetimePicker,
        // Sticky 
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,
            // [Sticky.name]: Sticky,

        },

        data() {
            return {
                dateshow: false,
                peopleListshow: false,
                searchTime: this.$route.query.searchTime,
                currentDatestr: "",
                currentDate: "",
                minDate: new Date("2021", "00", "01"),
                maxDate: new Date(),
            };
        },
        filters: {},
        mounted() {
            this.initData();


        },
        created() {


        },
        methods: {
            onclickLeft() {
                this.$router.go(-1)
            },
            initData() {
                this.currentDate = new Date(parseInt(this.searchTime))
                var year = this.currentDate.getFullYear(),
                    month = new Date(this.currentDate).getMonth() + 1,
                    dates = new Date(this.currentDate).getDate();
                month = month.toString().padStart(2, "0");
                dates = dates.toString().padStart(2, "0");
                this.currentDatestr = year + '/' + month + '/' + dates;
                var myChart = echarts.init(document.getElementById('main'));
                var option = {
                    title: {
                        text: '体重（kg）',
                        textStyle: {
                            color: '#CFCFD2',
                            fontSize: "14",
                            fontWeight: "normal",
                            height: "30",
                            lineHeight: "30"
                        }
                    },
                    grid: {
                        left: '10%',
                        width: "90%",
                        height: "60%"
                    },

                    xAxis: [{
                        type: 'category',
                        axisLine: {
                            show: false,
                        },
                        data: ['1', '2', '3', '4', '5', '6', '7']
                    }],
                    yAxis: {
                        type: 'value',
                    },
                    series: [{
                            type: 'line',
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                color: '#2E80F3'
                            },
                            data: [51, 55, 65, 45, 65, 92, 75],
                            markPoint: {
                                symbol: "pin",
                                data: [{
                                    type: "min"
                                }],
                                itemStyle: {
                                    color: "rgba(232, 15, 15, 1)"
                                }
                            }
                        },

                    ]
                };
                myChart.setOption(option);

            },
            formatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`;
                } else if (type === 'day') {
                    return `${val}日`;
                }
                return val;
            },
            // 确定时间回调
            dateConfirm(val) {
                var year = new Date(val).getFullYear(),
                    month = new Date(val).getMonth() + 1,
                    dates = new Date(val).getDate();
                month = month.toString().padStart(2, "0");
                dates = dates.toString().padStart(2, "0");
                this.currentDatestr = year + '/' + month + '/' + dates;
                this.dateshow = false;
                this.searchTime = new Date(val).getTime();
                this.initData();
            },
            //成员选择回调
            changeMemberUserId(item) {
                this.peopleListshow = false;
            }

        }
    };
</script>
<style lang="scss" scoped>
    @import '@s/group.scss';
</style>