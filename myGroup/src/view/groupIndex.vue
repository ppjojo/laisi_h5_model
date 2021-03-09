<template>
    <div id="app" class="groupIndex" v-cloak>
        <div class="header">
            <van-nav-bar :title="documentTitle" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed >
                <template #right>
                    <div style="margin-right: 0.2rem;" @click="shareGroup()">
                        <van-icon name="icon-tongyong-fenxiang" style="font-size: 0.4rem;" />
                    </div>
                    <div @click="goSetting()">
                        <van-icon name="setting-o" style="font-size: 0.4rem;" />
                    </div>
                </template>
            </van-nav-bar>
        </div>
        <div style="height: 4.6rem;">
            <div class="groupInfoBox">
                <img class="bannerBg" :src="groupItem.portrait" alt="">
                <div class="groupBox">
                    <div class="groupImg" :style="{'background-image':'url('+groupItem.portrait+')'}"></div>
                    <div class="groupInfo">
                        <div class="nameBox"><span class="name">{{groupItem.name}}</span>
                        </div>
                        <div class="desc">{{groupItem.slogon}}</div>
                        <div class="labelBox">
                            <div v-for="labelItem in labelFun(groupItem.labelId)" class="labelItem"
                                :class="labelItem[0]">{{labelItem[1]}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="containBox">
            <div class="noticeBox" @click="goNotice()">
                <div class="noticeBoxLeft">
                    <img class="iconNotice" :src="require('../img/iconNotice.png')" alt="">
                    <van-notice-bar class="noticeContent" background="#fff" :text="groupItem.content||''" />
                </div>
                <img class="iconRight" :src="require('../img/iconRight.png')" alt="">
            </div>
            <div class="memberBox">
                <div class="title">成员</div>
                <div class="memberListDiv">
                    <div class="memberPersonPic">
                        <template v-for="(item ,index) in memberIcon">
                            <img :src="item.headPictureUrl" v-if="index<=5" :style="{left:''+index*0.5+'rem'}">
                        </template>

                    </div>
                    <div class="memberPersonNum" @click="goMemberlist()">
                        <div class="numP">{{groupItem.count}}人</div>
                        <img class="iconRight" :src="require('../img/iconRight.png')" alt="">
                    </div>
                </div>
            </div>

            <div class="sportBox">
                <div class="dateBox">
                    <div class="dateTitle">
                        {{currentDatestr}}
                    </div>
                    <img class="chooseDate" @click="dateshow = true" :src="require('../img/canlindar.png')" alt="">
                </div>
                <div class="personBox">
                    <ul>
                        <li v-for="item in userIdData">
                            <div class="personInfo">
                                <img :src="item.headPictureUrl" class="personImg"></img>
                                <div>
                                    <div class="name van-ellipsis">{{item.nickName}}</div>
                                    <div class="idInfo">ID:{{item.userId}}</div>
                                </div>
                            </div>
                            <div class="deviceList">
                                <div class="deviceItem" v-if="returnUserData('balance',item.dataList)">
                                    <img class="deviceImg" :src="require('../img/group_tzc.png')" alt="">
                                    <div class="deviceData">
                                        <span>体重:</span>
                                        <span class="num"> {{returnUserData('balance',item.dataList).weight}}</span>
                                        <span>kg</span>
                                    </div>
                                    <div class="deviceData">
                                        <span>体脂:</span>
                                        <span class="num"> {{returnUserData('balance',item.dataList).bfr}}</span>
                                        <span>%</span>
                                    </div>
                                    <img class="iconRight" :src="require('../img/iconRight.png')" alt="">
                                </div>
                                <div class="deviceItem" v-if="returnUserData('wristball',item.dataList)">
                                    <img class="deviceImg" :src="require('../img/group_wlq.png')" alt="">
                                    <div class="deviceData">
                                        <span>圈数:</span>
                                        <span class="num">
										{{ returnUserData('wristball',item.dataList).totalNumber?(returnUserData('wristball',item.dataList).totalNumber/10000).toFixed(3):0 }}
										</span>
                                        <span>万</span>
                                    </div>
                                    <div class="deviceData">
                                        <span>用时:</span>
                                        <span class="num">{{returnTime(returnUserData('wristball',item.dataList).totalTime)}}</span>
                                    </div>
                                    <img class="iconRight" :src="require('../img/iconRight.png')" alt="">
                                </div>
                                <div class="deviceItem" v-if="returnUserData('skipping',item.dataList)">
                                    <img class="deviceImg" :src="require('../img/group_ts.png')" alt="">
                                    <div class="deviceData">
                                        <span>个数:</span>
                                        <span class="num">{{returnUserData('skipping',item.dataList).totalNumber}}</span>
                                        <span>个</span>
                                    </div>
                                    <div class="deviceData">
                                        <span>用时:</span>
                                        <span class="num">{{returnTime(returnUserData('skipping',item.dataList).totalTime)}}</span>
                                    </div>
                                    <img class="iconRight" :src="require('../img/iconRight.png')" alt="">
                                </div>
                            </div>

                        </li>
                    </ul>
					<div v-if="userIdData.length==0" class="nullDataBox" style="margin-top: 0;">
						<img :src="require('../img/noData.png')" alt="">
						<p>今日无运动</p>
					</div>
                </div>
            </div>

            <div class="btn_box">
                <div class="btn" @click="goToGroupChat">小组群聊</div>
            </div>

            <van-popup v-model="dateshow" position="bottom" style="z-index: 9999;">
                <van-datetime-picker v-model="currentDate" type="date" title="" :min-date="minDate" :max-date="maxDate"
                    :formatter="formatter" swipe-duration=100 @confirm="dateConfirm" @cancel="dateshow = false" />
            </van-popup>
        </div>

    </div>
</template>

<script>
    

    import {
        getGroupInfo
    } from '@a/groupIndex';
    const defaultSettings = require('../settings.js');
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
                groupId: parseInt(this.$route.query.id),
				isFromList:this.$route.query.isFromList||null,
                documentTitle: "小组主页",
                dateshow: false,
                minDate: new Date("2021", "00", "01"),
                maxDate: new Date(),
                currentDate: new Date(),
                currentDatestr: "今日运动",
                isCurrentUser: 0,
                memberIcon: [],
				userIdData:[],
				huanxinGroupId:null,
                groupItem: {
                    name: '',
                    portrait: '',
                    slogon: '',
                    labelId: '',
                }
            }
        },
        filters: {},
        mounted() {
            window.addEventListener('scroll', this.scrollFn);
        },

        created() {
            this.initData();
        },
        methods: {
            initData() {
                getGroupInfo({
                    groupId: this.groupId,
                    searchTime:1565166618000|| new Date().getTime()
                }).then(res => {
                    this.groupItem = res.data.groupInfo;
                    this.memberIcon = res.data.memberIcon;
					this.userIdData = res.data.userIdData;
                    this.isCurrentUser = res.data.isCurrentUser;
					this.huanxinGroupId = res.data.huanxinGroupId;
                })
            },
            labelFun(id) {
                return defaultSettings.RETURN_LABEL(id)
            },
            scrollFn() {
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                var rate = t / 200
                if (rate > 1) rate = 1
                var colorValue = `rgba(255,255,255,${rate})`
                var val = parseInt(255 - rate * 255)
                var colorValue2 = `rgba(${val},${val},${val})`
                document.getElementsByClassName("van-nav-bar")[0].style.background = colorValue
                document.getElementsByClassName("van-nav-bar__title")[0].style.color = colorValue2
                document.getElementsByClassName("van-nav-bar__arrow")[0].style.color = colorValue2
                document.getElementsByClassName("van-icon-icon-tongyong-fenxiang")[0].style.color = colorValue2
                document.getElementsByClassName("van-icon-setting-o")[0].style.color = colorValue2
            },
            destroyed() {
                window.removeEventListener('scroll', this.scrollFn); // 销毁监听
            },
            onclickLeft() {
               this.destroyed();
			   if(parseInt(this.isFromList)==1){
				   this.$router.go(-1);
			   }else{
				   this.$interaction.closePage();
			   }
            },
            shareGroup() {
                console.log("分享")
            },
            goSetting() { //去设置页面
            this.destroyed();
                this.$router.push({
                    path: '/groupSetting',
                    query: {
                        id: this.groupId,
						huanxinGroupId:this.huanxinGroupId
                    }
                });
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
			returnUserData(id,list){
				let obj = null;
				list.forEach(d=>{
					if(id==d.deviceType){
						obj = d;
					}
				});
				return obj
			},
            goNotice() {},
            goMemberlist() {
				this.$router.push({
					path: '/groupMember',
					query: {
						flag: 4,
						id: this.groupId
					}
				});
			},
            goToGroupChat(){
                this.$interaction.appNative("LSTH5APP_goToGroupChat",{
                    chatGroupId:this.huanxinGroupId
                });
                
            },
			returnTime(unit){
				if(!unit)return '00:00:00';
				unit = Math.round(unit/1000);
				let hour = Math.floor(unit / 3600) >= 10 ? Math.floor(unit / 3600) : '0' + Math.floor(unit / 3600);
				unit -= 3600 * hour;
				let min = Math.floor(unit / 60) >= 10 ? Math.floor(unit / 60) : '0' + Math.floor(unit / 60);
				unit -= 60 * min;
				let sec = unit >= 10 ? unit : '0' + unit;
				return hour + ':' + min + ':' + sec;
			}

        }
    };
</script>
<style>
    @import '../styles/css/myGroupList.css';
	@import "../font/iconfont.css";
</style>
<style  scoped>
	@font-face {
	  font-family: 'icon-tongyong-fenxiang';
	  src: url('../font/iconfont.ttf') format('truetype');
	}
	.van-icon-icon-tongyong-fenxiang {
	  font-family: 'icon-tongyong-fenxiang';
	}
    .van-nav-bar {
        background-color: transparent;
        z-index: 999;
    }
</style>