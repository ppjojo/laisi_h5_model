<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="我的小组" @click-left="onclickLeft" @click-right="onClickRight" left-arrow safe-area-inset-top fixed>
                <template #right>
                    <van-icon name="plus" style="font-size: 0.4rem;" />
                </template>
            </van-nav-bar>
        </div>
        <div class="myGroupList">
            <div v-if="1">
                <div class="labelTitle">我创建的</div>
                <div class="groupBox">
                    <ul>
                        <li v-for="item in 6" @click="goGroupIndex(item)">
                            <!-- <div class="groupImg" style="background-image: url(../img/1.png);"></div> -->
                            <div class="groupImg" :style="{'background-image':'url('+require('../img/1.png')+')'}"></div>
                            <div class="groupInfo">
                                <div class="nameBox"><span class="name">上海市松江区九亭镇俱乐上海市松江区九亭镇俱乐</span><span>(10)</span>
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
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="1">
                <div class="labelTitle">我加入的</div>
                <div class="groupBox">
                    <ul>
                        <li v-for="item in 6">
                            <div class="groupImg" :style="{'background-image':'url('+require('../img/1.png')+')'}"></div>
                            <div class="groupInfo">
                                <div class="nameBox"><span class="name">上海市松江区九亭镇俱乐上海市松江区九亭镇俱乐</span><span>(10)</span>
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
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="0" class="nullDataBox">
                <img src="../../common/img/noData.png" alt="">
                <p>暂无小组</p>
            </div>
        </div>

    </div>
</template>

<script>
    
    import {
        listItem
    } from '@a/test'
    import {
        NavBar ,Icon 
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
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
                
            };
        },
        filters: {},
        mounted() {
            this.getList()
        },
        created() {},
        methods: {
            getList(){
                listItem().then(()=>{
                    console.log("success")
                }).catch(()=>{
                    console.log("error")
                })
            },
            onclickLeft() {
                this.$interaction.closePage();
            },
            onClickRight() { //跳转创建小组
                this.$router.push({path: '/createGroup'});
            },
            goGroupIndex(item) {
               this.$router.push({path: '/groupIndex', query: {id: item}});
            }
        }
    };
</script>
<style >
    @import '../styles/css/myGroupList.css'
</style>

