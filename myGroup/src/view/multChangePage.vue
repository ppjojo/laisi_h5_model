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
			<van-field v-model="text" :input="titleChange()" class="club-input" rows="10" autosize type="textarea" maxlength="500"
			 placeholder="请填写公告1-500字" show-word-limit />
		</div>

	</div>
</template>

<script>
	import {
		NavBar,
		Icon,
		Field,
		Toast,Dialog
	} from 'vant';
	import {
		groupSettingInfo
	} from '@a/groupIndex';
	import {
		textReview
	} from '@u/tool';
	import {
		upDateGroup
	} from '@a/createGroup';
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Field.name]: Field,
			[Toast.name]: Toast,
			[Dialog.name]: Dialog,
			// [SwipeItem.name]: SwipeItem,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				flag: parseInt(this.$route.query.flag),
				text: this.$route.query.text || '',
				groupId: parseInt(this.$route.query.id),
				isCurrentUser: parseInt(this.$route.query.isCurrentUser),
				title: '',
				righttxt: '',
				loading: false,
				finished: false,
				maxlength: 16,
				groupItem: {
					name: '',
					portrait: '',
					slogon: '',
					labelId: '',
					isTop: 0,
					isSilent: 0,
					isInviteConfirm: 0,
					nickname: '',
				}
			};
		},
		filters: {},
		watch: {
			text(val, oldVal) { //普通的watch监听
				this.flag == 1 ? this.groupItem.slogon = val : this.flag == 2 ? this.groupItem.content = val : this.groupItem.name =
					val;
			},
		},
		mounted() {},
		created() {
			this.title = this.flag == 1 ? '小组口号' : this.flag == 2 ? '小组公告' : this.flag == 4 ?
				'小组名称' : '';
			this.maxlength = this.flag == 1 ? 100 : 16;
			this.righttxt = this.flag == 1 || this.flag == 4 ? '保存' : '发布';
			this.getList();
		},
		methods: {
			getList() {
				groupSettingInfo({
					groupId: this.groupId,
				}).then(res => {
					this.groupItem = Object.assign(this.groupItem, res.data.myteamGroupInfo);
					this.groupItem = Object.assign(this.groupItem, res.data.myteamGroupMember);
				});
			},
			OnclickLeft() {
				if (this.flag == 2) {
					Dialog.confirm({
						confirmButtonText: '确定',
						confirmButtonColor: '#007aff',
						cancelButtonColor: '#999',
						message: '退出本次编辑？'
					}).then(() => {
						this.$router.go(-1);
					}).catch(() => {

					});
				} else {
					this.$router.go(-1);
				}
			},
			OnclickRight() {
				if (!this.text) return;
				if (this.flag == 2) {
					Dialog.confirm({
						confirmButtonText: '发布',
						confirmButtonColor: '#007aff',
						cancelButtonColor: '#999',
						message: '该公告会通知全部小组成员，是否发布？'
					}).then(() => {
						this.checkAndSubmit();
					}).catch(() => {
					
					});
				} else {
					this.checkAndSubmit()
				}
			},
			checkAndSubmit(){
				textReview(this.text, res => {
					if (res.code == 0) {
						upDateGroup(this.groupItem).then(res => {
							Toast('修改成功！');
							setTimeout(() => {
								this.$router.go(-1);
							}, 1500)
						})
					}
				})
			},
			titleChange() { //过滤
				this.text = this.text.replace(
					/[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。#￥$%\`~^？！@…—&$=()\-+\/*{}【】\\（）[\]]|\s/g, '')
			},
		}
	};
</script>
<style>
	.outside {
		padding: .3rem;
	}

	.club-input {
		background-color: #f5f5f5;
		border-radius: .08rem;
	}
</style>
