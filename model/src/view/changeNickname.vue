<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="我的小组" @click-left="onclickLeft" @click-right="onClickRight" left-arrow safe-area-inset-top fixed>
                <template #right>
                </template>
            </van-nav-bar>
        </div>
        <div class="infomation">
        	修改我在小组中的昵称，昵称修改后，只会在此小组内有效，小组内成员都可看见。
        </div>
        <van-cell-group>
          <van-field v-model="nickname" maxlength="8" clearable placeholder="请输入昵称" ></van-field>
        </van-cell-group>
        <van-button round class="submit" block @click="changeName(nickname)" :color="nickname?bgc:bgcgrey">完成</van-button>
    </div>
</template>

<script>
    
    import {
        listItem
    } from '@a/test'
    import {
        NavBar ,CellGroup,Field,Button
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            // [Swipe.name]: Swipe,
            // [SwipeItem.name]: SwipeItem,
            // [GoodsAction.name]: GoodsAction,
            // [GoodsActionIcon.name]: GoodsActionIcon,
            // [GoodsActionButton.name]: GoodsActionButton
        },

        data() {
            return {
                bgc: "linear-gradient(to right, #FF6A88, #FF5136 )",
                bgcgrey: '#999',
				nickname:'',
				clubid:''
            };
        },
        filters: {},
        mounted() {
            // this.getList()
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
                // this.$interaction.closePage();
                this.$router.go(-1)
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
<style >
    @import '../styles/clubCreateCompetition.css';
	.infomation{
		margin: 1.2rem auto;
		line-height: .4rem;
		width: 6.3rem;
		font-size: .28rem;
		color: #999;
		text-align: center;
	}
	.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
		border-width:0 0 0.02rem 0;
	}
	.van-cell-group{
		width: 85%;
		margin: 0 auto;
		padding:0 .5rem;
	}
	.van-field__control{
		text-align: center;
	}
	.van-field__control{
		padding: 0;
		}
</style>
