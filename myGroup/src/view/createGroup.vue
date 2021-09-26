<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar :title="titleText" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
				<template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
				</template>
				<template #right>
					<div v-if="edit&&labelArray.length>0" :style="{color:'#cfcfd2',fontSize:'.32rem'}">完成</div>
					<div v-if="edit&&labelArray.length==0" :style="{color:'#595962',fontSize:'.32rem'}">完成</div>
				</template>
			</van-nav-bar>
		</div>
		<div class="createGroup" v-if="flag==1">
			<div class="labelTitle">小组形象</div>
			<div class="uploaderBox">
				<van-uploader :deletable="false" :max-count="1" :after-read="afterRead">
					<div class="uploadLoadIconBox">
						<div class="uploadLoadIconBG" v-if="groupItem.portrait"
							:style="{'background-image':'url('+groupItem.portrait+')'}"></div>
						<van-icon v-else name="plus" />
					</div>

				</van-uploader>
			</div>
			<div class="uploaderTxt">请选择一张图片作为小组头像</div>
			<van-button round class="nextStep" block @click="goNext1()" :color="groupItem.portrait?bgc:bgcgrey">下一步
			</van-button>
			<!-- <van-loading type="spinner" vertical v-show="overlayShow"></van-loading> -->
		</div>
		<div class="createGroup" v-if="flag==2">
			<div class="labelTitle">小组名称</div>
			<div>
				<van-field v-model="groupItem.name" style="background-color: #1E1E2A;" rows="1" autosize type="textarea"
					maxlength="16" placeholder="请为您的小组取个响亮的名称吧～" show-word-limit />
			</div>
			<div class="labelTitle" style="margin-top: 0.5rem;">小组口号</div>
			<div>
				<van-field v-model="groupItem.slogon" rows="5" autosize style="background-color: #1E1E2A;"
					type="textarea" maxlength="100" placeholder="为你的小组取一个响亮的口号吧~" show-word-limit />
			</div>



			<van-button round class="nextStep" block @click="goNext2()"
				:color="groupItem.name&&groupItem.slogon?bgc:bgcgrey">下一步
			</van-button>

			<!-- <van-loading type="spinner" vertical v-show="overlayShow"></van-loading> -->
		</div>
		<div class="createGroup" v-if="flag==3">
			<div class="labelTitle">小组标签</div>
			<div>
				<ul class="labelBox">

					<li v-for="item in labelConfig" @click="labelChange(item.id)">
						<div class="embedImgBox " :class="inArray(item.id)?item.class:''">
							<span class="icon iconfont embedIcon" :class="item.icon"></span>
						</div>
						<div class="labelTxt">{{item.name}}</div>
					</li>

				</ul>
			</div>
			<van-button round class="nextStep" v-if="!edit" block @click="create(labelArray.length>0)"
				:color="labelArray.length>0?bgc:bgcgrey">创建
			</van-button>

			<!-- <van-loading type="spinner" vertical v-show="overlayShow"></van-loading> -->
		</div>

	</div>
</template>

<script>
	import {
		createGroup,
		upDateGroup,
		checkGroupName
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
		Toast,
		Icon
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Uploader.name]: Uploader,
			[Button.name]: Button,
			[Loading.name]: Loading,
			[Field.name]: Field,
			[Toast.name]: Toast,
			[Icon.name]: Icon,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				flag: 1,
				groupId: this.$route.query.id || null,
				labelId: this.$route.query.labelId || '',
				edit: this.$route.query.edit || null,
				bgc: "linear-gradient(to left, #FF6A88, #FF4E3E )",
				bgcgrey: '#74747E',
				previewImg: "",
				overlayShow: false,
				isClick: false,
				groupItem: {
					portrait: "",
					name: "",
					content: "",
					labelId: "",
					slogon: ''
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
			onClickRight() {
				if (!this.edit) return;
				if (this.labelArray.length == 0) {
					Toast('小组标签最少需要一个！');
					return;
				}
				upDateGroup(this.groupItem).then(res => {
					Toast('编辑小组标签成功！');
					setTimeout(() => {
						this.onclickLeft();
					}, 1500)
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
				this.groupItem.portrait = ""
				pictureReview(file, res => {
					this.overlayShow = false;
					if (res.code == 0) {
						this.groupItem.portrait = res.url;
					}
				})
			},
			goNext1() {
				if (!this.groupItem.portrait) return;
				this.flag = 2
			},
			goNext2() { //去下一步
				if (!this.groupItem.name || !this.groupItem.slogon) return;
				checkGroupName({
					groupName: this.groupItem.name
				}).then(res => {
					if (res.code == 0) {
						this.overlayShow = true;
						textReview(this.groupItem.name + this.groupItem.slogon, res => {
							this.overlayShow = false;
							if (res.code == 0) {
								this.flag = 3
							}
						})
					} else {
						Toast('小组名不可以重复！');
					}
				})

			},
			inArray: function (id) { //判断该标签是否选中
				if (!id) return ''
				var index = this.labelArray.findIndex(item => parseInt(item) === id)
				return index == -1 ? false : true
			},
			labelChange(id) {
				var index = this.labelArray.findIndex(item => parseInt(item) === id)
				if (index == -1) {
					if (this.labelArray.length == 3) {
						Toast('小组标签最多选三个！');
						return;
					} else {
						this.labelArray.push(id);
					}
				} else {

					this.labelArray.splice(index, 1);


				}
			},


			create(flag) {
				if (!flag) return;
				if (this.isClick) return;
				this.isClick = true;
				createGroup(this.groupItem).then(res => {
					if (res.code == 0) {
						Toast('创建小组成功！');
						setTimeout(() => {
							this.$store.commit("setData", {
								key: "myGroupListRefresh",
								val: true
							})
							this.$router.replace({
								path: '/groupIndex',
								query: {
									id: res.data.id,
								}
							});
						}, 1500)
					} else {
						Toast(res.msg || '创建失败');
						this.isClick = false;
					}
				}).catch(res => {
					this.isClick = false;
				})
			}
		}
	};
</script>
<style lang="scss" scoped >
	@import '@s/group.scss';
</style>
<style scoped="scoped">
	.van-cell {
		border-radius: .05rem;
	}

	/deep/ textarea::-webkit-input-placeholder {
		font-size: 0.24rem;
	}
</style>