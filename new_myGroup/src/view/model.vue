<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="我的小组" @click-left="onclickLeft" @click-right="onClickRight" left-arrow safe-area-inset-top fixed>
                <template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.48rem;" />
				</template>
                <template #right>
                    <van-icon name="plus" style="font-size: 0.4rem;" />
                </template>
            </van-nav-bar>
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
                // this.$router.go(-1)
            },
            onClickRight() { //跳转创建小组
                localStorage.removeItem("groupItem")
                 this.$router.push({path: '/groupIndex', query: {id: item}});
            },
            goGroupIndex(item) {
                this.$router.push({path: '/groupIndex', query: {id: item}});
                
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '@s/group.scss';
</style>
