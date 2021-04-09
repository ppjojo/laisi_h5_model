<template>
    <div id="app" v-cloak>
        <van-nav-bar title="制定专属计划" @click-left="onclickLeft" @click-right="shareWeekPlan" left-arrow
            safe-area-inset-top fixed>
            <template #right>
                <i class="iconfont icon-tongyong-fenxiang" style="font-size: 0.4rem;"></i>
            </template>
        </van-nav-bar>

        <div class="homePageBox">
            <div class="buttonOK startTest" :class="{buttonWait:params.bf1}" @click="startTest">{{params.bt1}}</div>
            <div class="buttonOK getPlan" :class="{buttonWait:params.bf2}" @click="getPlan">{{params.bt2}}</div>
            <div class="buttonOK againTest" :class="{buttonWait:params.bf3}" @click="againTest">{{params.bt3}}</div>
        </div>




    </div>
</template>

<script>
    const defaultSettings = require('../settings.js');
    import {
        NavBar,
    } from 'vant';
    import {
        isAndroid,
        isIOS
    } from "@u/tool";
    import {
        getIndexData
    } from '@a/api'
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
                params: {
                    bt1: '开始测评',
                    bf1: false,
                    bt2: '获取专属计划',
                    bf2: false,
                    bt3: '再次测评',
                    bf3: false
                },
                statusCode: "0001"
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
                getIndexData({
                    memberId: JSON.parse(localStorage.getItem("appInfo")).memberId
                }).then(res => {
                    this.finished = true;
                    this.statusCode = res.data;
                    if (res.data == '0001') {
                        /**
                         * 七日计划状态一：开始测试：
                         * 开始测试按钮高亮
                         * 另外两个灰显
                         */
                        this.params.bf2 = this.params.bf3 = true;
                    } else if (res.data == '0002' || res.data == '0003') {
                        /**
                         * 七日计划状态二：测试完毕；但未获取专属课程计划
                         * 可查看测试报告，获取专属计划
                         * 但是再次测试灰显
                         */
                        /**
                         * 七日计划状态三：测试完且已经获取专属课程，但未看完
                         * 可查看测试报告，查看专属课程
                         * 再次测试灰显示
                         */
                        this.params.bt1 = '查看测试报告';
                        this.params.bt2 = res.data == '0003' ? '获取专属课程' : '获取专属计划';
                        this.params.bf3 = true;
                    } else if (res.data == '0004') {
                        /**
                         * 七日计划状态四：完成了课程
                         * 再次测试高亮
                         */
                        this.params.bt1 = '查看测试报告';
                        this.params.bt2 = '获取专属课程';
                    } else if (res.data == '0005') {
                        /**
                         * 再次测试完成
                         */
                        this.params.bt1 = '查看测试报告';
                        this.params.bt2 = '获取专属课程';
                        this.params.bf3 = true;
                    }
                })
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
                if (!this.finished) return;
                if (this.params.btn1 == '开始测评') {
                    if (isIOS) {
                        window.webkit.messageHandlers.lstNative.postMessage({
                            method: LSTH5APP_goToEvalutaion,
                        });
                    } else if (isAndroid) {
                        window.android.LSTH5APP_goToEvalutaion();
                    }
                } else if (this.params.btn1 == '查看测试报告') {
                    if (isIOS) {
                        window.webkit.messageHandlers.lstNative.postMessage({
                            method: LSTH5APP_evaluationReport,
                            type: this.statusCode == "0005" ? 0 : 1
                        });
                    } else if (isAndroid) {
                        window.android.LSTH5APP_evaluationReport(JSON.stringify({
                            type: this.statusCode == "0005" ? 0 : 1
                        }));
                    }
                }


            },
            getPlan() {
                if (this.params.bf2 && !this.finished) {
                    return
                }
                if (isIOS) {
                    window.webkit.messageHandlers.lstNative.postMessage({
                        method: LSTH5APP_goToEvalutaion,
                    });
                } else if (isAndroid) {
                    window.android.LSTH5APP_goToEvalutaion();
                }
            },
            againTest() {
                if (this.params.bf3 && !this.finished) {
                    return
                }
                //0004 的时候允许二次测评
                if (isIOS) {
                    window.webkit.messageHandlers.lstNative.postMessage({
                        method: LSTH5APP_goToEvalutaion,
                        type: this.statusCode == "0004" ? 0 : 1
                    });
                } else if (isAndroid) {
                    window.android.LSTH5APP_goToEvalutaion(JSON.stringify({
                        type: this.statusCode == "0004" ? 0 : 1
                    }));
                }

            }

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