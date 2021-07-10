<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="数据详情" @click-left="onclickLeft"  left-arrow
                safe-area-inset-top fixed>
                <template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.48rem;" />
				</template>
                <!-- <template #right>
                    <van-icon name="plus" style="font-size: 0.4rem;" />
                </template> -->
            </van-nav-bar>
        </div>
        <div class="nullDataBox" >
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
            onclickLeft() {
                //this.$interaction.closePage();
                this.$router.go(-1)
            }

        }
    };
</script> 
<style lang="scss" scoped>
    @import '@s/group.scss';
</style>