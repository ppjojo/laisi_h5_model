<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="测评规则" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
            </van-nav-bar>
        </div>
        <div class="weekPlanRule">
            <img style="width:100%;margin:0;padding:0;border:0;display:block" src="https://oss.laisitech.com/785f7a7f-b21f-4aa5-b007-9405d0ff1e27.png"
                alt="">
        </div>
    </div>
</template>

<script>
    import {
        NavBar,

    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            //[Icon.name]: Icon,
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

        },
        created() {},
        methods: {
            onclickLeft() {
                this.$interaction.closePage();
            },
        }
    };
</script>
<style lang="scss">
    @import '@/styles/weekPlan.scss';
</style>
<style scoped>
    .van-nav-bar {
        background-color: #82E1FF;
    }
</style>