<template>
    <div id="app" class="groupIndex" v-cloak>
        <div class="header">
            <van-nav-bar :title="documentTitle" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed >
                <template #right>
                    <div style="margin-right: 0.2rem;" @click="shareGroup()">
                        <van-icon name="share-o" style="font-size: 0.4rem;" />
                    </div>
                    <div @click="goSetting()">
                        <van-icon name="setting-o" style="font-size: 0.4rem;" />
                    </div>
                </template>
            </van-nav-bar>
        </div>
        <div style="height: 5.6rem;">
            <div class="groupInfoBox">
                <img class="bannerBg" :src="require('../img/1.png')" alt="">
                <div class="groupBox">
                    <div class="groupImg" :style="{'background-image':'url('+require('../img/1.png')+')'}"></div>
                    <div class="groupInfo">
                        <div class="nameBox"><span class="name">上海市松江区九亭镇俱乐上海市松江区九亭镇俱乐</span>
                        </div>
                        <div class="desc">俱乐部简介至显示一行，俱乐部简介至显示一行俱乐部简介至显示一行俱乐部简介至显示一行</div>
                        <div class="labelBox">
                            <div class="labelItem js">健身</div>
                            <div class="labelItem jf">减肥</div>
                            <div class="labelItem jz">减脂</div>
                            <div class="labelItem ts">跳绳</div>
                            <div class="labelItem wlq">腕力球</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="containBox">
            <div class="noticeBox" @click="goNotice()">
                <div class="noticeBoxLeft">
                    <img class="iconNotice" :src="require('../img/iconNotice.png')" alt="">
                    <van-notice-bar class="noticeContent" background="#fff" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
                </div>
                <img class="iconRight" :src="require('../img/iconRight.png')" alt="">
            </div>
            <div class="memberBox">
                <div class="title">成员</div>
                <div class="memberListDiv">
                    <div class="memberPersonPic">
                        <img :src="require('../img/1.png')" v-for="(item ,index) in 6"
                            :style="{left:''+index*0.5+'rem'}">
                    </div>
                    <div class="memberPersonNum" @click="goMemberlist()">
                        <div class="numP">10人</div>
                        <img class="iconRight" :src="require('../img/iconRight.png')" alt="">
                    </div>
                </div>
            </div>

            <div class="sportBox">
                <div class="dateBox">
                    <div class="dateTitle">
                        {{currentDatestr}}
                    </div>
                    <img class="chooseDate" @click="dateshow = true" src="img/1.png" alt="">
                </div>
                <div class="personBox">
                    <ul>
                        <li v-for="item in 4">
                            <div class="personInfo">
                                <img :src="require('../img/1.png')" class="personImg"></img>
                                <div>
                                    <div class="name">哈师大是卡卡是的</div>
                                    <div class="idInfo">ID:124465</div>
                                </div>
                            </div>
                            <div class="deviceList">
                                <div class="deviceItem">
                                    <img class="deviceImg" :src="require('../img/1.png')" alt="">
                                    <div class="deviceData">
                                        <span>体重:</span>
                                        <span class="num"> 55</span>
                                        <span>kg</span>
                                    </div>
                                    <div class="deviceData">
                                        <span>体脂:</span>
                                        <span class="num"> 55</span>
                                        <span>%</span>
                                    </div>
                                    <img class="iconRight" :src="require('../img/1.png')" alt="">
                                </div>
                                <div class="deviceItem">
                                    <img class="deviceImg" :src="require('../img/1.png')" alt="">
                                    <div class="deviceData">
                                        <span>圈数:</span>
                                        <span class="num"> 5252</span>
                                        <span>万</span>
                                    </div>
                                    <div class="deviceData">
                                        <span>用时:</span>
                                        <span class="num">00:30:00</span>
                                    </div>
                                    <img class="iconRight" src="img/iconRight.png" alt="">
                                </div>
                                <div class="deviceItem">
                                    <img class="deviceImg" src="img/1.png" alt="">
                                    <div class="deviceData">
                                        <span>个数:</span>
                                        <span class="num">55555</span>
                                        <span>个</span>
                                    </div>
                                    <div class="deviceData">
                                        <span>用时:</span>
                                        <span class="num">00:30:00</span>
                                    </div>
                                    <img class="iconRight" src="img/iconRight.png" alt="">
                                </div>
                            </div>

                        </li>
                    </ul>

                </div>
            </div>

            <div class="btn_box">
                <div class="btn">小组群聊</div>
            </div>

            <van-popup v-model="dateshow" position="bottom" style="z-index: 9999;">
                <van-datetime-picker v-model="currentDate" type="date" title="" :min-date="minDate" :max-date="maxDate"
                    :formatter="formatter" swipe-duration=100 @confirm="dateConfirm" @cancel="dateshow = false" />
            </van-popup>
        </div>

    </div>
</template>

<script>
    window.addEventListener("scroll", function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        var rate = t / 200
        if (rate > 1) rate = 1
        var colorValue = `rgba(255,255,255,${rate})`
        var val = parseInt(255 - rate * 255)
        var colorValue2 = `rgba(${val},${val},${val})`
        document.getElementsByClassName("van-nav-bar")[0].style.background = colorValue
        document.getElementsByClassName("van-nav-bar__title")[0].style.color = colorValue2
        document.getElementsByClassName("van-nav-bar__arrow")[0].style.color = colorValue2
        document.getElementsByClassName("van-icon-share-o")[0].style.color = colorValue2
        document.getElementsByClassName("van-icon-setting-o")[0].style.color = colorValue2
    })
    import {
        listItem
    } from '@a/test'
    import {
        NavBar,
        Icon,
        NoticeBar,
        Popup,
        DatetimePicker
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [NoticeBar.name]: NoticeBar,
            [Popup.name]: Popup,
            [DatetimePicker.name]: DatetimePicker,

            // [Cell.name]: Cell,
            // [CellGroup.name]: CellGroup,
            // [Swipe.name]: Swipe,
            // [SwipeItem.name]: SwipeItem,
            // [GoodsAction.name]: GoodsAction,
            // [GoodsActionIcon.name]: GoodsActionIcon,
            // [GoodsActionButton.name]: GoodsActionButton
        },

        data() {
            return {
                loading: false,
                finished: false,
                groupId: this.$route.query.id,
                documentTitle: "小组主页",
                dateshow: false,
                minDate: new Date("2021", "00", "01"),
                maxDate: new Date(),
                currentDate: new Date(),
                currentDatestr: "今日运动",
            }
        },
        filters: {},
        mounted() {

        },
        created() {},
        methods: {
            onclickLeft() {
                this.$router.go(-1)
            },
            shareGroup() {
                console.log("分享")
            },
            goSetting() { //去设置页面
                window.location.href = `groupSetting.html?id=${4}`
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
                month = month > 9 ? month : "0" + month;
                dates = dates > 9 ? dates : "0" + dates;
                this.currentDatestr = year + '年' + month + '月' + dates + '日';
                // this.getSchoolrank();
                this.dateshow = false;
            },


            goNotice() {},
            goMemberlist() {},
            
        }
    };
</script>
<style>
    @import '../styles/css/myGroupList.css'
</style>
<style scoped>
    .van-nav-bar {
        background-color: transparent;
        z-index: 999;
    }
</style>