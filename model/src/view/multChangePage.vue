<template>
    <div id="app" v-cloak>
        <div class="header">
        	<van-nav-bar :title="title" left-text="取消" @click-left="OnclickLeft" @click-right="OnclickRight">
        		<template #right>
        			<div :style="{color:text.length>0?'#e60012':'#999'}">{{righttxt}}</div>
        		</template>
        	</van-nav-bar>
        </div>
        <div class="outside" v-if="flag==1||flag==4">
        	<!-- :style="{minHeight:flag==4?'1.7rem':'2.2rem'}" -->
        	<van-field v-model="text" :input="titleChange()" class="club-input" :rows="flag==4?2:3" autosize type="textarea"
        	 :maxlength="maxlength" :placeholder="flag==1?'请填写小组口号':'请填写小组名称'" show-word-limit />
        </div>
        <div class="outside" v-else>
        	<!-- :style="{minHeight:flag==4?'1.7rem':'2.2rem'}" -->
        	<van-field v-model="text" :input="titleChange()" class="club-input" rows="10" autosize type="textarea"
        	 maxlength="500" placeholder="请填写公告1-500字" show-word-limit />
        </div>
        
    </div>
</template>

<script>
    
    
    import {
        NavBar ,Icon ,Field
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Field.name]: Field,
            // [CellGroup.name]: CellGroup,
            // [Swipe.name]: Swipe,
            // [SwipeItem.name]: SwipeItem,
            // [GoodsAction.name]: GoodsAction,
            // [GoodsActionIcon.name]: GoodsActionIcon,
            // [GoodsActionButton.name]: GoodsActionButton
        },

        data() {
            return {
                flag: 1,
                text: '',
                title: '',
                righttxt: '',
                loading: false,
                finished: false,
                maxlength: 16,
            };
        },
        filters: {},
        mounted() {
            // this.getList()
        },
        created() {
			this.title = this.flag == 1 ? '小组口号' : this.flag == 2 ? '小组公告' : this.flag == 4 ?
				'小组名称' : '';
			this.maxlength = this.flag == 1 ? 100 : 16;
			this.righttxt = this.flag == 1 || this.flag == 4 ? '保存' : '发布';
		},
        methods: {
            getList(){
                listItem().then(()=>{
                    console.log("success")
                }).catch(()=>{
                    console.log("error")
                })
            },
            OnclickLeft() {
                // this.$interaction.closePage();
                this.$router.go(-1)
            },
            OnclickRight() { //跳转创建小组
			
            },
            titleChange() { //过滤
            	this.text = this.text.replace(
            		/[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。#￥$%\`~^？！@…—&$=()\-+\/*{}【】\\（）[\]]|\s/g, '')
            },
        }
    };
</script>
<style >
	.outside {
		padding: .3rem;
	}
	
	.club-input {
		background-color: #f5f5f5;
		border-radius: .08rem;
	}
</style>
