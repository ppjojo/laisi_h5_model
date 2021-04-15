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
        Toast
    } from 'vant';
    import {
        isAndroid,
        isIOS
    } from "@u/tool";
    import {
        getIndexData,
        getClassPlan
    } from '@a/api'
    import { getQueryString } from "@u/tool";
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Toast.name]: Toast,
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
            if(getQueryString('isShare')){
                this.params.bf2 = this.params.bf3 = true;
            }else{
               this.initData(); 
            }
            
        },
        beforeRouteLeave(to, from, next) {
            this.destroyed();
            next() //一定不要忘记写
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
        },
        methods: {
            initData() {
                getIndexData().then(res => {
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
                        this.params.bt2 = res.data == '0003' ? '查看专属课程' : '获取专属计划';
                        this.params.bf3 = true;
                    } else if (res.data == '0004') {
                        /**
                         * 七日计划状态四：完成了课程
                         * 再次测试高亮
                         */
                        this.params.bt1 = '查看测试报告';
                        this.params.bt2 = '查看专属课程';
                    } else if (res.data == '0005') {
                        /**
                         * 再次测试完成
                         */
                        this.params.bt1 = '查看再次测试报告';
                        this.params.bt2 = '查看专属课程';
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
                    title: "快来一起制定您的专属计划",
                    description: "跳绳水平测一测，私人定制专属计划",
                    url: defaultSettings.host + 'h5/h5V2/weekPlan/#/index?isShare=1'
                })
            },
            goInto() {
				let linkUrl = '';
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
					linkUrl = "https://lstemp.laisitech.com?actionType=weekplan"
				} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
					if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) { //微信
						linkUrl = "https://a.app.qq.com/o/simple.jsp?pkgname=com.lstech.rehealth"
					} else {
						linkUrl = "rehealth://weekplan"
					}
				}
				var a = document.createElement('a');
				a.setAttribute('href', linkUrl);
				a.setAttribute('id', 'js_a');
				//防止反复添加
				if (document.getElementById('js_a')) {
					document.body.removeChild(document.getElementById('js_a'));
				}
				document.body.appendChild(a);
				a.click();
			},
            startTest() {
                 if(getQueryString('isShare')){
                     this.goInto()
                 }
                if (!this.finished) return;
                //前去测评
                if (this.statusCode == '0001') {
                    if (isIOS) {
                        window.webkit.messageHandlers.lstNative.postMessage({
                            method: "LSTH5APP_goToEvalutaion",
                        });
                    } else if (isAndroid) {
                        window.android.LSTH5APP_goToEvalutaion();
                    }
                } else {
                    //查看测评结果
                    if (isIOS) {
                        window.webkit.messageHandlers.lstNative.postMessage({
                            method: "LSTH5APP_evaluationReport",
                            type: this.statusCode == "0005" ? 1 : 0
                        });
                    } else if (isAndroid) {
                        window.android.LSTH5APP_evaluationReport(JSON.stringify({
                            type: this.statusCode == "0005" ? 1 : 0
                        }));
                    }
                }


            },
            getPlan() {
                //前去训练计划
                if (this.statusCode == "0001" && this.finished) {
                    Toast({
                        message: "您还未进行测评",
                    });
                    return
                }
                if (this.statusCode == "0002" && this.finished) {
                    getClassPlan({
                        memberId: JSON.parse(localStorage.getItem("appInfo")).memberId,
                        userId: JSON.parse(localStorage.getItem("appInfo")).userId,
                    }).then(res => {
                        if (res.code == 0) {
                            Toast({
                                message: "你已成功获取了你的专属计划",
                            });
                            this.initData();
                        } else {
                            Toast(res.msg);
                        }
                    })
                    return
                }
                if ((this.statusCode == "0003" || this.statusCode == "0004") && this.finished) {
                    if (isIOS) {
                        window.webkit.messageHandlers.lstNative.postMessage({
                            method: "LSTH5APP_goToTrainingCourses",
                        });
                    } else if (isAndroid) {
                        window.android.LSTH5APP_goToTrainingCourses();
                    }
                }

            },

            againTest() {
                if (this.statusCode == "0001" && this.finished) {
                    Toast({
                        message: "您还未进行测评",
                    });
                    return
                }
                //0004 的时候允许二次测评
                if (this.statusCode != "0004" && this.finished) {
                    Toast({
                        message: "您还未完成七日计划",
                    });
                    return
                }
                if (isIOS) {
                    window.webkit.messageHandlers.lstNative.postMessage({
                        method: "LSTH5APP_goToReEvalutaion",
                    });
                } else if (isAndroid) {
                    window.android.LSTH5APP_goToReEvalutaion();
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