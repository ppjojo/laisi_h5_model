<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="制定专属计划" @click-left="onclickLeft" @click-right="shareWeekPlan" left-arrow
                safe-area-inset-top fixed>
                <template #right>
                    <i class="iconfont icon-tongyong-fenxiang" style="font-size: 0.4rem;"></i>
                </template>
            </van-nav-bar>
        </div>
        <div class="homePageBox">
            <div class="buttonOK startTest" @click="startTest">开始测评</div>
            <div class="buttonOK getPlan">获取专属计划</div>
            <div class="buttonOK againTest buttonWait">再次测评</div>
        </div>




    </div>
</template>

<script>
    const defaultSettings = require('../settings.js');
    import {
        NavBar,
        // Icon,
        // NoticeBar,
        // Popup,
        // DatetimePicker
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            // [Icon.name]: Icon,
            // [NoticeBar.name]: NoticeBar,
            // [Popup.name]: Popup,
            // [DatetimePicker.name]: DatetimePicker,
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
            }
        },
        filters: {},
        mounted() {
            window.addEventListener('scroll', this.scrollFn);
        },
        created() {
            this.initData();
        },
        beforeRouteLeave(to, from, next) {
            this.destroyed();
            next() //一定不要忘记写
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
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
                document.getElementsByClassName("icon-tongyong-fenxiang")[0].style.color = colorValue2
                // document.getElementsByClassName("van-icon-setting-o")[0].style.color = colorValue2
            },
            destroyed() {
                window.removeEventListener('scroll', this.scrollFn); // 销毁监听
            },
            onclickLeft() {
                this.destroyed();
                this.$interaction.closePage();
            },
            shareWeekPlan() {
                this.$interaction.sharePage({
                    title: "专属计划",
                    description: "快来一起创建专属计划",
                    url: defaultSettings.host + 'h5/h5V2/weekPlan/#/index?isShare=1'
                })
            },
            startTest() {
                this.$router.push({
                    path: '/personalTest',
                })
            },
            goMemberlist() {},

        }
    };
</script>
<style scoped>
    @import "../assets/iconfont/iconfont.css";

    .van-nav-bar {
        background-color: transparent;
        z-index: 999;
    }
</style>
<style lang="scss">
    @import '@/styles/weekPlan.scss';
</style>