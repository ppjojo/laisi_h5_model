<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="小组设置" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
                <template #right>
                </template>
            </van-nav-bar>
        </div>
        <van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
        <!-- 人数box -->
        <div class="cellbox ub ub-ac ub-pj" @click="goMember(4)">
        	<div class="title">小组成员</div>
        	<div class="ub ub-ac">
        		<div class="detail">10人</div>
        		<van-icon  color="#999" name="arrow" />
        	</div>
        </div>
        <div class="cellbox ub ub-ac border-bottom2" style="height: auto;">
        	<div class="groupMember ub-ac" v-for="item in 3">
        		<div class="imgbox ub ub-ac ub-pc">
        			<img class="headImg" :src="require('../img/plus.png')" alt="">
        		</div>
        		<div class="van-ellipsis detail">ssss</div>
        	</div>
        	<div class="groupMember ub-ac">
        		<div class="imgbox ub ub-ac ub-pc" style="background-color: #f5f5f5;">
        			<img :src="require('../img/plus.png')" alt="">
        		</div>
        		<div class="van-ellipsis detail">邀请</div>
        	</div>
        	<div class="groupMember ub-ac" @click="goMember(3)">
        		<div class="imgbox ub ub-ac ub-pc" style="background-color: #f5f5f5;">
        			<img :src="require('../img/minus.png')" alt="">
        		</div>
        		<div class="van-ellipsis detail">移除</div>
        	</div>
        </div>
        <!-- 小组菜单 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom">
        	<div class="title">小组形象</div>
        	<div class="ub ub-ac">
        		<van-uploader :after-read="afterRead">
        			<img class="headpic" :src="groupItem.image" />
        		</van-uploader>
        		<!-- <img class="headpic" :src="groupItem.image" /> -->
        		<van-icon  color="#999" name="arrow" />
        	</div>
        </div>
        <!-- 小组名称 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeMult(4)">
        	<div class="title">小组名称</div>
        	<div class="ub ub-ac">
        		<div class="van-ellipsis detail">西八罗马</div>
        		<van-icon  color="#999" name="arrow" />
        	</div>
        </div>
        <!-- 小组口号 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeMult(1)">
        	<div class="title">小组口号</div>
        	<div class="ub ub-ac">
        		<div class="van-ellipsis detail">西八罗马</div>
        		<van-icon  color="#999" name="arrow" />
        	</div>
        </div>
        <!-- 小组公告 -->
        <div class="cellbox border-bottom ub ub-ac ub-pj" style="height: auto;" @click="goChangeMult(2)">
        	<div class="">
        		<div class="title" style="margin-bottom: .2rem;">小组公告</div>
        		<div class="van-multi-ellipsis--l3 detail" style="max-width: 6.6rem">西八罗马</div>
        	</div>
        	<van-icon  color="#999" name="arrow" />
        </div>
        <!-- 小组标签 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeMult(3)">
        	<div class="title">小组标签</div>
        	<div class="ub ub-ac">
        		<div class="ub ub-ac"><van-tag color="#ffe1e1" text-color="#ad0000">标签</van-tag></div>
        		<van-icon  color="#999" name="arrow" />
        	</div>
        </div>
        <!-- 小组qr -->
        <div class="cellbox border-bottom2 ub ub-ac ub-pj">
        	<div class="title">小组二维码</div>
        	<van-icon  color="#999" name="arrow" />
        </div>
        <!-- 设为置顶 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom">
        	<div class="title">设为置顶</div>
        	<van-switch active-color="#07c160" v-model="groupItem.Top" size="20"></van-switch>
        </div>
        <!-- 消息免打扰 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom">
        	<div class="title">消息免打扰</div>
        	<van-switch active-color="#07c160" v-model="groupItem.Top" size="20"></van-switch>
        </div>
        <!-- 小组邀请确认 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom2">
        	<div class="title">小组邀请确认</div>
        	<van-switch active-color="#07c160" v-model="groupItem.Top" size="20"></van-switch>
        </div>
        <!-- 我在小组中昵称 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeNickname">
        	<div class="title">我在小组中昵称</div>
        	<div class="ub ub-ac">
        		<div class="van-ellipsis detail">西八罗马</div>
        		<van-icon  color="#999" name="arrow" />
        	</div>
        </div>
        <!-- 转让组长 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom2" @click="goMember(1)">
        	<div class="title">转让组长</div>
        	<van-icon  color="#999" name="arrow" />
        </div>
        <!-- 删除聊天记录 -->
        <div class="cellbox ub ub-ac ub-pj border-bottom2">
        	<div class="title">删除聊天记录</div>
        	<van-icon  color="#999" name="arrow" />
        </div>
        <!-- 退出 -->
        <div class="cellbox quit" @click="goMember(2)">
        	转让并退出小组
        </div>
        <div class="border-bottom2"></div>
        <!-- 退出 -->
        <div class="cellbox quit" @click="cancelGroup">
        	解散小组
        </div>
    </div>
</template>

<script>
    
    import {
        listItem
    } from '@a/test'
    import {
        NavBar ,Icon ,Loading,Tag,Switch,Uploader
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Loading.name]: Loading,
            [Tag.name]: Tag,
            [Switch.name]: Switch,
            [Uploader.name]: Uploader,
            // [GoodsAction.name]: GoodsAction,
            // [GoodsActionIcon.name]: GoodsActionIcon,
            // [GoodsActionButton.name]: GoodsActionButton
        },

        data() {
            return {
                overlayShow: false,
                loading: false,
                finished: false,
                groupItem:{
                	image:'../healthy5.0/back/images/icon_advice.png',
                	Top:false
                }
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
			afterRead(file) {
				this.overlayShow = true;
				uploadImg1(file, 'headpic', null, res => {
					this.overlayShow = false;
					if (res.code != 0) {
						this.$toast("图片审核未通过，请重新上传！");
					} else {
						this.groupItem.image = res.url;
					}
				})
			},
			goMember(flag){
				//1组长转让 2 组长转让并退出  3移除成员  4 成员列表
				let url = './groupMember.html?flag='+flag;
				window.location.href = url;
			},
			goChangeNickname(){//修改昵称
				this.$router.push({path: '/changeNickname', query: {name: 'sss'}});
			},
			goChangeMult(flag){//1小组口号--2小组公告---3小组标签--4小组名称
				let url = 'multChangePage.html?flag='+flag+'&text=222';
				// window.location.href = url;
				this.$router.push({path: '/multChangePage', query: {flag: flag}});
			},
			cancelGroup(){//解散小组
				this.$dialog.confirm({
					confirmButtonText: '确定',
					confirmButtonColor:'#e62000',
					cancelButtonColor:'#999',
					message: '确定解散小组？'
				}).then(() => {
					
				}).catch(() => {
				
				});
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
<style >
    @import '../styles/groupSetting/groupSetting.css';
	.border-bottom .detail{
		max-width: 4.8rem;
	}
</style>
