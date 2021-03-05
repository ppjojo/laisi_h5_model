<template>
    <div id="app" class="groupIndex" v-cloak>
        <div class="header">
            <van-nav-bar title="这样" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed >
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
        <div style="height:20rem"></div>
       

        

    </div>
</template>

<script>
    

    
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
                groupId: this.$route.query.id,
                documentTitle: "小组主页",
                dateshow: false,
                minDate: new Date("2021", "00", "01"),
                maxDate: new Date(),
                currentDate: new Date(),
                currentDatestr: "今日运动",
                isCurrentUser: 0,
                memberIcon: [],
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
                // getGroupInfo({
                //     groupId: this.groupId,
                //     searchTime: new Date().getTime()
                // }).then(res => {
                //     this.groupItem = res.data.groupInfo;
                //     this.memberIcon = res.data.memberIcon;
                //     this.isCurrentUser = res.data.isCurrentUser;
                // })
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
                document.getElementsByClassName("van-icon-share-o")[0].style.color = colorValue2
                document.getElementsByClassName("van-icon-setting-o")[0].style.color = colorValue2
            },
            destroyed() {
                window.removeEventListener('scroll', this.scrollFn); // 销毁监听
            },
            onclickLeft() {
               this.destroyed();
                this.$router.go(-1)

            },
            shareGroup() {
                console.log("分享")
            },
            goSetting() { //去设置页面
            this.destroyed();
                this.$router.push({
                    path: '/groupSetting',
                    query: {
                        id: this.groupId
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

    .groupIndex .groupInfoBox .groupBox .groupImg {
        background-size: cover;
    }
</style>