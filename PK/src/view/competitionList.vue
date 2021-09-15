<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar :title="navBarTitle" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
                <template #left>
                    <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
                </template>
            </van-nav-bar>
        </div>
        <div class="comListBox">
            <van-tabs v-model="active" @click="tabsClick" sticky>
                <van-tab v-for="tabItem in all" :title="tabItem.title">
                    <van-pull-refresh v-model="tabItem.refreshing" :head-height="90" @refresh="onRefresh"
                        class=" monkey-pull-refresh">
                        <template #pulling="props">
                            <div class="monkeyBox">
                                <img class="monkey" src="../img/monkey.gif" />
                                <p>下拉刷新</p>
                            </div>
                        </template>
                        <!-- 释放提示 -->
                        <template #loosing>
                            <div class="monkeyBox">
                                <img class="monkey" src="../img/monkey.gif" />
                                <p>释放刷新</p>
                            </div>
                        </template>
                        <!-- 加载提示 -->
                        <template #loading>
                            <div class="monkeyBox">
                                <img class="monkey" src="../img/monkey.gif" />
                                <p>正在刷新</p>
                            </div>
                        </template>

                        <van-list v-model="tabItem.loading" v-if="tabItem.list.length>0" :finished="tabItem.finished"
                            finished-text="没有更多了" @load="onLoad" :immediate-check=false>
                            <ListItem v-for="item in tabItem.list" @getJoinStatus="getJoinStatus" :item="item">
                            </ListItem>
                        </van-list>
                        <div class="noData-box" v-else-if="tabItem.finished">
                            <img class="noData-img" src="../img/noData.png" />
                        </div>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
            <div class="creatMatch-img-box">
                <img @click="getPower" src="../img/createPic.png" />
            </div>
        </div>

        <van-dialog v-model="verifyShow" width="80%" title="请输入邀请码" show-cancel-button @confirm="invitationCodeConfirm">
            <div>
                <van-field v-model="invitationCode" placeholder="请输入邀请码" />
            </div>
        </van-dialog>


    </div>
</template>

<script>
    import {
        getQueryString,
    } from '@u/tool'
    import {
        NavBar,
        Icon,
        Tabs,
        Tab,
        PullRefresh,
        List,
        Dialog,
        Field,
    } from 'vant';

    import {
        isAndroid,
        isIOS
    } from "@u/tool";

    import ListItem from '../components/listItem'

    import {
        listItemApi,
        checkCode,
        boundDeviceCount,
        createTimes
    } from '@a/index'

    import {
        userAttendStatus,
    } from '@a/detail'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [PullRefresh.name]: PullRefresh,
            [List.name]: List,
            [Dialog.Component.name]: Dialog.Component,
            [Field.name]: Field,

            ListItem


        },

        data() {
            return {
                type:getQueryString("type"),
                navBarTitle: "跳绳PK赛",
                active: 0, //0 正在进行 1 即将开始 2 我的
                all: [{
                        title: "正在进行",
                        loading: false,
                        finished: false,
                        refreshing: false,
                        page: 0,
                        pageSize: 10,
                        total: 0,
                        list: []
                    },
                    {
                        title: "即将开始",
                        loading: false,
                        finished: false,
                        refreshing: false,
                        page: 0,
                        pageSize: 10,
                        total: 0,
                        list: []
                    },
                    {
                        title: "我参与的",
                        loading: false,
                        finished: false,
                        refreshing: false,
                        page: 0,
                        pageSize: 10,
                        total: 0,
                        list: []
                    }
                ],
                verifyShow: false,
                invitationCode: "",
                itemDetail: {}
            };
        },
        filters: {},
        mounted() {
            this.getList()
        },
        created() {
            // skipping跳绳   steps跑步  wristBall腕力球 wheel健腹轮
            this.navBarTitle = this.type == "steps" ? "跑步Pk赛" : this.type == "wristball" ? "腕力球PK赛" : this.type ==
                "wheel" ? "健腹轮PK赛" : "跳绳PK赛"
            if (localStorage.getItem("pkActive")) {
                this.active=parseInt(localStorage.getItem("pkActive"))
                this.all[localStorage.getItem("pkActive")].page = 0
                this.getList();
            }
        },
        methods: {
            onclickLeft() {
                this.$interaction.closePage();
                localStorage.removeItem("pkActive")
                // this.$router.go(-1)
            },
            tabsClick() {
                localStorage.setItem("pkActive", this.active)
                this.all[this.active].page = 0
                this.getList()
            },
            getList() {
                listItemApi({
                    pageNumber: this.all[this.active].page,
                    pageSize: this.all[this.active].pageSize
                }, this.active).then((res) => {
                    if (res.code == 0) {
                        if (res.data.content.length < this.all[this.active].pageSize) {
                            this.all[this.active].finished = true;
                        }
                        if (this.all[this.active].page + 1 > Math.ceil(res.data.total / this.all[this.active]
                                .pageSize)) {
                            this.all[this.active].finished = true;
                        }
                        if (this.all[this.active].page == 0) {
                            this.all[this.active].list = res.data.content;
                        } else {
                            this.all[this.active].list = this.all[this.active].list.concat(res.data.content);
                        }
                    } else if (this.all[this.active].page == 0 && parseInt(res.code) == 1000) {

                        this.all[this.active].list = [];
                        this.all[this.active].finished = true;
                    }
                    this.all[this.active].loading = false;
                }).catch((err) => {
                    console.log(err)
                })
            },
            onLoad() {
                if (this.all[this.active].refreshing) {
                    this.all[this.active].refreshing = false;
                    this.all[this.active].page = 0;
                } else {
                    this.all[this.active].page++;
                }
                this.getList()
            },
            //刷新
            onRefresh() {
                this.all[this.active].finished = false;
                this.all[this.active].loading = true;
                this.all[this.active].refreshing = true;
                this.onLoad();
            },
            //判断是否参加了这场比赛
            getJoinStatus(item) {
                this.itemDetail = item;
                userAttendStatus({
                    competitionId: item.id,
                }).then(res => {
                    if (res.data) {
                        this.gotoDetail();
                    } else {
                        if (item.isVerify && (item.promoterId != JSON.parse(localStorage.getItem("appInfo"))
                                .userId)) {
                            this.invitationCode = "";
                            this.verifyShow = true;
                        } else {
                            this.gotoDetail()
                        }
                    }
                })
            },
            //判断邀请码是否正确
            invitationCodeConfirm() {
                if (this.invitationCode == "") {
                    this.$toast("邀请码不正确！");
                    return;
                }
                checkCode({
                    id: this.itemDetail.id,
                    invitationCode: this.invitationCode
                }).then(res => {
                    if (res.code == 0) {
                        this.gotoDetail();
                    } else {
                        this.$toast("邀请码不正确！")
                    }
                })


            },
            //跳转详情
            gotoDetail() {
                this.$router.push({
                    path: '/competitionDetail',
                    query: {
                        id: this.itemDetail.id,
                        type: this.type
                    }
                });

            },
            //判断是否有权限去创建
            getPower() {
                if (!JSON.parse(localStorage.getItem("appInfo")).phoneNumber) {
                    this.$dialog.confirm({
                        message: '使用本功能，请先绑定手机号',
                        confirmButtonText: "确定",
                        width: "300",
                    }).then(() => {
                        if (isIOS) {
                            window.webkit.messageHandlers.lstNative.postMessage({
                                "method": "bindPhoneNumber",
                            });
                        } else if (isAndroid) {
                            window.android.bindPhoneNumber()
                        }
                        localStorage.removeItem("appInfo")
                    }).catch(() => {});
                } else {
                    this.getOrderToCreate()
                }
            },
            getOrderToCreate() {
                createTimes().then(res => {
                    if (res.data > 0) {
                        this.$router.push({
                            path: '/createCompetition',
                            query:{
                                type: this.type
                            }
                        });
                    } else {
                        this.$toast("您今天创建的次数已达上限，请明天再来吧");
                    }
                })

            },


        }
    };
</script>
<style lang="scss">
    @import '@/styles/index.scss'
</style>