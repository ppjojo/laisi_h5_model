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
            <div v-if="createList.length>0">
                <div class="labelTitle">我创建的</div>
                <div class="groupBox">
                    <ul>
                        <li v-for="item in createList" @click="goGroupIndex(item)">
                            <!-- <div class="groupImg" style="background-image: url(../img/1.png);"></div> -->
                            <div class="groupImg" :style="{'background-image':'url('+item.portrait+')'}"></div>
                            <div class="groupInfo">
                                <div class="nameBox"><span class="name">{{item.name}}</span><span>({{item.count}})</span>
                                </div>
                                <div class="desc">{{item.slogon}}</div>
                                <div class="labelBox">
									<div v-for="labelItem in labelFun(item.labelId)" class="labelItem" :class="labelItem[0]">{{labelItem[1]}}</div>
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
                                <div class="nameBox"><span class="name">{{item.name}}</span><span>({{item.count}})</span>
                                </div>
                                <div class="desc">{{item.slogon}}</div>
                                <div class="labelBox">
                                    <div v-for="labelItem in labelFun(item.labelId)" class="labelItem" :class="labelItem[0]">{{labelItem[1]}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="joinList.length==0&&createList.length==0&&isFinish" class="nullDataBox">
                <img :src="require('../img/noData.png')" alt="">
                <p>暂无小组</p>
            </div>
        </div>

    </div>
</template>

<script>
    
    import {
        listItem
    } from '@a/myGroupList';
	const defaultSettings = require('../settings.js');
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
                joinList:[],
				createList:[],
				isFinish:false,
            };
        },
        filters: {},
        mounted() {
            this.getList();
        },
        created() {},
        methods: {
            getList(){
                listItem({}).then((res)=>{
					this.joinList = res.data[0];
					this.createList = res.data[1];
					this.isFinish = true;
                }).catch(()=>{
					this.isFinish = true;
                    console.log("error")
                })
            },
			labelFun(id){
			   return defaultSettings.RETURN_LABEL(id)
			},
            onclickLeft() {
                this.$interaction.closePage();
            },
            onClickRight() { //跳转创建小组
                this.$router.push({path: '/createGroup'});
            },
            goGroupIndex(item) {
               this.$router.push({path: '/groupIndex', query: {id: item.id,isFromList:1}});
            }
        }
    };
</script>
<style scoped="scoped">
    @import '../styles/css/myGroupList.css';
</style>

