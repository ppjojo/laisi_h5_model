<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="我的小组" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
                safe-area-inset-top fixed>
                <template #right>
                    <van-icon name="plus" style="font-size: 0.4rem;" />
                </template>
            </van-nav-bar>
            <div>
                <div>
                    <div :style="{'background-image':'url('+require('@/assets/img/homepage.png')+')'}"></div>

                    <svg-icon iconClass="share" />
                </div>
                <div class="myGroupList">
                    <div>
                        <div class="labelTitle">我创建的</div>
                        <div class="groupBox">
                            <ul>
                                <li v-for="item in 5">
                                    <!-- <div class="groupImg" style="background-image: url(../img/1.png);"></div> -->

                                    <div class="groupInfo">
                                        <div class="nameBox"><span class="name">555</span><span>45452</span>
                                        </div>
                                        <div class="desc">asdasasdas</div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
    import {
        listItem
    } from '@a/test'
    import {
        NavBar,
        Icon
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
            getList() {
                listItem().then(() => {
                    console.log("success")
                }).catch(() => {
                    console.log("error")
                })
            },
            onclickLeft() {
                this.$interaction.closePage();
                // this.$router.go(-1)
            },
            onClickRight() { //跳转创建小组
                this.$router.push({
                    path: '/groupIndex',
                    query: {
                        id: item
                    }
                });
            },
            goGroupIndex(item) {
                this.$router.push({
                    path: '/groupIndex',
                    query: {
                        id: item
                    }
                });

            }
        }
    };
</script>
<style lang="scss">
    @import '@/styles/weekPlan.scss'
</style>