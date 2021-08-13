<template>
    <div id="app" class="groupIndex" v-cloak>
       <div class="header" >
			<van-nav-bar @click-left="onclickLeft" :title="groupItem.name" left-arrow safe-area-inset-top fixed>
				<template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.48rem;" />
				</template>
				<template #right>
					<div style="margin-right: 0.25rem;" @click="shareGroup()">
						<span class="icon iconfont icon-fenxianganniu" style="font-size: 0.48rem;" />
					</div>
					<div @click="goSetting()">
						<span class="icon iconfont icon-shezhi" style="font-size: 0.48rem;" />
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
            }
        },
        beforeRouteLeave(to, from, next) {
			this.destroyed();
			next() //一定不要忘记写
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
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
				var rate = t / 100
				if (rate > 1) {
					rate = 1
				}
				var colorValue = `rgba(18,18,31,${rate})`
				document.getElementsByClassName("van-nav-bar")[0].style.background = colorValue
				document.getElementsByClassName("van-nav-bar__title")[0].style.opacity = rate;
				document.getElementsByClassName("van-nav-bar")[0].style.color =
					`rgb(${255-48*rate},${255-48*rate},${255-45*rate})`
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
            goNotice() {},
            goMemberlist() {},

        }
    };
</script>
<style scoped>
    .van-nav-bar {
        background-color: transparent;
        z-index: 999;
    }

    .groupIndex .groupInfoBox .groupBox .groupImg {
        background-size: cover;
    }
</style>