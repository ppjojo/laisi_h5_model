<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="数据详情" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
                safe-area-inset-top fixed>
                <!-- <template #right>
                    <van-icon name="plus" style="font-size: 0.4rem;" />
                </template> -->
            </van-nav-bar>
        </div>
        <div class="nullDataBox" style="margin-top: 2rem;">
            <img :src="require('../img/noData.png')" alt="">
            <p>更多数据敬请期待</p>
        </div>

    </div>
</template>

<script>
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
            //this.getList()
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
                //this.$interaction.closePage();
                this.$router.go(-1)
            }

        }
    };
</script>
<style>
    @import '../styles/css/myGroupList.css'
</style>