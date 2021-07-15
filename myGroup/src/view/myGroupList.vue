<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="我的小组" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
                safe-area-inset-top fixed>
                <template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.48rem;" />
				</template>
                <template #right>
                    <van-icon name="plus" style="font-size: 0.48rem;" />
                </template>
            </van-nav-bar>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="getList" class="monkey-pull-refresh" :head-height="90">
            <template #pulling="props">
                <div class="monkeyBox">
                    <img class="monkey" :src="require('../img/monkey.gif')" />
                    <p>下拉刷新</p>
                </div>
            </template>
            <!-- 释放提示 -->
            <template #loosing>
                <div class="monkeyBox">
                    <img class="monkey" :src="require('../img/monkey.gif')" />
                    <p>释放刷新</p>
                </div>
            </template>

            <!-- 加载提示 -->
            <template #loading>
                <div class="monkeyBox">
                    <img class="monkey" :src="require('../img/monkey.gif')" />
                    <p>正在刷新</p>
                </div>
            </template>
            <div class="myGroupList">
                <div v-if="createList.length>0">
                    <div class="labelTitle">我创建的</div>
                    <div class="groupBox">
                        <ul>
                            <li v-for="item in createList" @click="goGroupIndex(item)">
                                <div class="groupImg" :style="{'background-image':'url('+item.portrait+')'}"></div>
                                <div class="groupInfo">
                                    <div class="nameBox"><span
                                            class="name">{{item.name}}</span><span>({{item.count}})</span>
                                    </div>
                                    <div class="desc">{{item.slogon}}</div>
                                    <div class="labelBox">
                                        <div v-for="labelItem in labelFun(item.labelId)" class="labelItem"
                                            :class="labelItem[0]">{{labelItem[1]}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="joinList.length>0">
                    <div class="labelTitle">我加入的</div>
                    <div class="groupBox">
                        <ul>
                            <li v-for="item in joinList" @click="goGroupIndex(item)">
                                <div class="groupImg" :style="{'background-image':'url('+item.portrait+')'}"></div>
                                <div class="groupInfo">
                                    <div class="nameBox"><span
                                            class="name">{{item.name}}</span><span>({{item.count}})</span>
                                    </div>
                                    <div class="desc">{{item.slogon}}</div>
                                    <div class="labelBox">
                                        <div v-for="labelItem in labelFun(item.labelId)" class="labelItem"
                                            :class="labelItem[0]">{{labelItem[1]}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="joinList.length==0&&createList.length==0&&isFinish" class="nullDataBox">
                    <img :src="require('../img/noData.png')" alt="">
                    <p>暂时还未加入任何小组哦,快去创建加入吧~</p>
                </div>
            </div>
        </van-pull-refresh>

    </div>
</template>

<script>
    import {
        listItem
    } from '@a/myGroupList';
    const defaultSettings = require('../settings.js');
    import {
        NavBar,
        Icon,
        PullRefresh
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [PullRefresh.name]: PullRefresh,
        },

        data() {
            return {
                joinList: [],
                createList: [],
                isFinish: false,
                isCancel: this.$route.query.isCancel || null,
                isLoading: false
            };
        },
        beforeRouteLeave(to, from, next) {
            if (this.isCancel) {
                this.$interaction.closePage();
                this.$interaction.closePage();
                return;
            }
            next() //一定不要忘记写
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
        },
        filters: {},
        mounted() {
            // this.getList();
        },
        activated() {
            if (this.$store.state.myGroupListRefresh) {
                this.getList()
                this.$store.commit("setData", {
                    key: "myGroupListRefresh",
                    value: false
                })
            }
        },
        created() {},
        methods: {
            getList() {
                listItem({}).then((res) => {
                    this.joinList = res.data[0];
                    this.createList = res.data[1];
                    this.isFinish = true;
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 300)
                }).catch(() => {
                    this.isFinish = true;
                })
            },
            labelFun(id) {
                return defaultSettings.RETURN_LABEL(id)
            },
            onclickLeft() {
                this.$interaction.closePage();
                this.$interaction.closePage();
            },
            onClickRight() { //跳转创建小组
                this.isCancel = false
                this.$router.push({
                    path: '/createGroup'
                });
            },
            goGroupIndex(item) {
                this.isCancel = false
                this.$store.commit("setData", {
                    key: "group.groupInfo",
                    val: item
                })
                this.$store.commit("setData", {
                    key: "groupIndexRefresh",
                    val: "true"
                })
                this.$router.push({
                    path: '/groupIndex',
                    query: {
                        id: item.id,
                        isFromList: 1
                    }
                });
            }
        }
    };
</script>
<style lang="scss">

</style>
<style scoped="scoped" lang="scss">
    @import '@s/group.scss';

    .myGroupList {
        min-height: calc(100vh - 1rem);
    }

    /deep/ .monkey-pull-refresh .van-pull-refresh__head {
        line-height: 0;
        height: 90px;
    }


    .monkey-pull-refresh .monkeyBox .monkey {
        width: 60px;
        height: 60px;
        line-height: 0;
        padding: 0;
        margin: 0;
    }

    .monkey-pull-refresh .monkeyBox p {
        height: 10px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        padding: 0;
        margin: 0;
    }
</style>