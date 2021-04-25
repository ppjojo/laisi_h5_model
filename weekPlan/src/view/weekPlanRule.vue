<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="测评规则" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
            </van-nav-bar>
        </div>
        <div class="weekPlanRule">
            <img style="width:100%;margin:0;padding:0;border:0;display:block" src="https://oss.laisitech.com/e4d97bf9-3537-4aaa-b7cc-81e8b7f50eca.png"
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