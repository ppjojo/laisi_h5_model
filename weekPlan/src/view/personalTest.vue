<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="测评" @click-left="onclickLeft" @click-right="onClickRight" left-arrow safe-area-inset-top
                fixed>
                <template #right>
                    测评规则
                </template>
            </van-nav-bar>
        </div>
        <div>
            <div :style="{'background-image':'url('+require('@/assets/img/homepage.png')+')'}"></div>

            <svg-icon iconClass="share" />
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
                // listItem().then(() => {
                //     console.log("success")
                // }).catch(() => {
                //     console.log("error")
                // })
            },
            onclickLeft() {
                this.$router.go(-1)
            },
            onClickRight() { //跳转创建小组
                this.$router.push({
                    path: '/weekPlanRule',
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
    @import '@/styles/weekPlan.scss';
</style>