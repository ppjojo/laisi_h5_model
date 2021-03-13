<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar :title="titleText" @click-left="onclickLeft" @click-right="onClickRight" left-arrow safe-area-inset-top
			 fixed>
				<template #right>
					<div v-if="edit" :style="{color:'#e60012',fontSize:'.32rem'}">完成</div>
				</template>
			</van-nav-bar>
		</div>
		<div class="createGroup" v-if="flag==1">
			<div class="labelTitle">小组形象</div>
			<div class="uploaderBox">
				<van-uploader upload-icon="plus" v-model="fileList" :deletable="false" :max-count="1" :after-read="afterRead" />
			</div>
			<div class="uploaderTxt">请选择一张图片作为小组头像</div>
			<van-button round class="nextStep" block @click="goNext1()" :color="groupItem.portrait?bgc:bgcgrey">下一步
			</van-button>
			<van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
		</div>
		<div class="createGroup" v-if="flag==2">
			<div class="labelTitle">小组名称</div>
			<div>
				<van-field v-model="groupItem.name" :input="titleChange()" style="background-color: #f5f5f5;" rows="1" autosize
				 type="textarea" maxlength="16" placeholder="请为您的小组取个响亮的名称吧～" show-word-limit />
			</div>
			<div class="labelTitle" style="margin-top: 0.5rem;">小组口号</div>
			<div>
				<van-field v-model="groupItem.slogon" :input="contentChange()" rows="5" autosize style="background-color: #f5f5f5;"
				 type="textarea" maxlength="100" placeholder="简单介绍一下您的小组～" show-word-limit />
			</div>



			<van-button round class="nextStep" block @click="goNext2()" :color="groupItem.name&&groupItem.slogon?bgc:bgcgrey">下一步
			</van-button>

			<van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
		</div>
		<div class="createGroup" v-if="flag==3">
			<div class="labelTitle">小组标签</div>
			<div>
				<ul class="labelBox">

					<li v-for="item in labelConfig" @click="labelChange(item.id)">
						<div class="embedImgBox " :class="inArray(item.id)?item.class:''">
							<img class="embedImg " :src="inArray(item.id)?item.activeImg:item.img" />
						</div>
						<div class="labelTxt">{{item.name}}</div>
					</li>

				</ul>
			</div>
			<van-button round class="nextStep" v-if="!edit" block @click="create(labelArray.length>0)" :color="labelArray.length>0?bgc:bgcgrey">创建
			</van-button>

			<van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
		</div>

	</div>
</template>

<script>
	import {
		createGroup,
		upDateGroup
	} from '@a/createGroup'
	import {
		groupSettingInfo
	} from '@a/groupIndex';
	import {
		pictureReview,
		textReview
	} from '@u/tool';
	const defaultSettings = require('../settings.js')
	import {
		NavBar,
		Uploader,
		Button,
		Loading,
		Field,
		Toast
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Uploader.name]: Uploader,
			[Button.name]: Button,
			[Loading.name]: Loading,
			[Field.name]: Field,
			[Toast.name]: Toast,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				flag: 1,
				groupId: this.$route.query.id || null,
				labelId: this.$route.query.labelId || '',
				edit: this.$route.query.edit || null,
				bgc: "linear-gradient(to right, #FF6A88, #FF5136 )",
				bgcgrey: '#999',
				previewImg: "",
				overlayShow: false,
				fileList: [],
				groupItem: {
					portrait: "",
					name: "",
					content: "",
					labelId: "",
					slogon:''
				},
				labelArray: this.$route.query.labelId ? this.$route.query.labelId.split(",") : [],
				labelConfig: defaultSettings.label,
				titleText: '',
			};
		},
		watch: {
			labelArray(val, oldVal) { //普通的watch监听
				this.groupItem.labelId = val.toString();
			},
			flag(val, oldVal) {
				if (!this.edit) {
					this.titleText = '创建小组(' + val + '/3)';
				}
			}
		},
		filters: {},
		mounted() {},
		created() {
			if (this.edit) { //来修改标签的
				// this.labelArray = this.labelId.split(",");
				this.flag = 3;
				this.titleText = "小组标签";
				groupSettingInfo({
					groupId: this.groupId,
				}).then(res => {
					this.groupItem = Object.assign(this.groupItem, res.data.myteamGroupInfo);
					this.groupItem = Object.assign(this.groupItem, res.data.myteamGroupMember);
				});
			} else {
				this.titleText = '创建小组(' + this.flag + '/3)';
			}
		},
		methods: {
			onClickRight() { //
				if (this.labelArray.length == 0) return;
				upDateGroup(this.groupItem).then(res => {
					Toast('编辑小组标签成功！');
					setTimeout(()=>{
						this.onclickLeft();	
					},1500)
				})
			},
			onclickLeft() {
				if (this.flag > 1 && !this.edit) {
					this.flag--
				} else {
					this.$router.go(-1)
				}
			},
			afterRead(file) {
				this.overlayShow = true;
				pictureReview(file, res => {
					this.overlayShow = false;
					if (res.code == 0) {
						this.groupItem.portrait = res.url;
						this.fileList[0].url = res.url
					}
				})
			},
			goNext1() {
				if (!this.groupItem.portrait) return;
				this.flag = 2
			},
			goNext2() { //去下一步
				if (!this.groupItem.name || !this.groupItem.slogon) return;
				this.overlayShow = true;
				textReview(this.groupItem.name + this.groupItem.slogon, res => {
					this.overlayShow = false;
					if (res.code == 0) {
						this.flag = 3
					}
				})
			},
			inArray: function(id) { //判断该标签是否选中
				if (!id) return ''
				var index = this.labelArray.findIndex(item => parseInt(item) === id)
				return index == -1 ? false : true
			},
			labelChange(id) {
				var index = this.labelArray.findIndex(item => parseInt(item) === id)
				if (index == -1){
					if(this.labelArray.length==3){
						Toast('小组标签最多选三个！');
						return;
					}else{
						this.labelArray.push(id);
					}
				}else{
					this.labelArray.splice(index, 1);
				} 
			},
			contentChange() {
				// if (this.groupItem.content) this.groupItem.content = this.groupItem.content.replace(
				//     /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。#￥$%\`~^？！@…—&$=()\-+\/*{}【】\\（）[\]]|\s/g, '')
			},
			titleChange() {
				// if (this.groupItem.name) this.groupItem.name = this.groupItem.name.replace(
				//     /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。#￥$%\`~^？！@…—&$=()\-+\/*{}【】\\（）[\]]|\s/g, '')
			},

			create(flag) {
				if (!flag) return;
				createGroup(this.groupItem).then(res => {
					Toast('创建小组成功！');
					setTimeout(() => {
						this.$router.replace({
							path: '/groupIndex',
							query: {
								id: res.data.id,
								isFromList:1
							}
						});
					}, 1500)
				})
			}
		}
	};
</script>
<style scoped="scoped">
	@import '../styles/css/myGroupList.css';
</style>
