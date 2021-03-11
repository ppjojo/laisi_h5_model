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
				<div class="detail">{{groupItem.count}}人</div>
				<van-icon color="#999" name="arrow" />
			</div>
		</div>
		<div class="cellbox ub ub-ac border-bottom2" style="height: auto;">
			<template v-for="(item,index) in memberIcon">
				<div class="groupMember ub-ac" v-if="index<=(isCurrentUser?2:3)">
					<div class="imgbox ub ub-ac ub-pc">
						<img class="headImg" :src="item.headPictureUrl" alt="">
					</div>
					<div class="van-ellipsis detail">{{item.nickname}}</div>
				</div>
			</template>
			<div class="groupMember ub-ac" @click="goInvite()">
				<div class="imgbox ub ub-ac ub-pc" style="background-color: #f5f5f5;">
					<img :src="require('../img/plus.png')" alt="">
				</div>
				<div class="van-ellipsis detail">邀请</div>
			</div>
			<div class="groupMember ub-ac" v-if="isCurrentUser" @click="goMember(3)">
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
				<template v-if="isCurrentUser">
					<van-uploader :after-read="afterRead">
						<img class="headpic" :src="groupItem.portrait" />
					</van-uploader>
					<van-icon color="#999" name="arrow" />
				</template>
				<img v-else class="headpic" :src="groupItem.portrait" />
			</div>
		</div>
		<!-- 小组名称 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeMult(4)">
			<div class="title">小组名称</div>
			<div class="ub ub-ac">
				<div class="van-ellipsis detail">{{groupItem.name}}</div>
				<van-icon v-if="isCurrentUser" color="#999" name="arrow" />
			</div>
		</div>
		<!-- 小组口号 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeMult(1)">
			<div class="title">小组口号</div>
			<div class="ub ub-ac">
				<div class="van-ellipsis detail">{{groupItem.slogon}}</div>
				<van-icon v-if="isCurrentUser" color="#999" name="arrow" />
			</div>
		</div>
		<!-- 小组公告 -->
		<div class="cellbox border-bottom ub ub-ac ub-pj" style="height: auto;" @click="goChangeMult(2)">
			<div class="">
				<div class="title" style="margin-bottom: .2rem;">小组公告</div>
				<div class="van-multi-ellipsis--l3 detail" style="max-width: 6.6rem">{{groupItem.content}}</div>
			</div>
			<van-icon color="#999" name="arrow" />
		</div>
		<!-- 小组标签 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeMult(3)">
			<div class="title">小组标签</div>
			<div class="ub ub-ac">
				<div class="ub ub-ac">
					<div class="labelBox ub ub-ac">
						<div v-for="labelItem in labelFun(groupItem.labelId)" class="labelItem" :class="labelItem[0]">{{labelItem[1]}}</div>
					</div>
				</div>
				<van-icon v-if="isCurrentUser" color="#999" name="arrow" />
			</div>
		</div>
		<!-- 小组qr -->
		<div class="cellbox border-bottom2 ub ub-ac ub-pj" @click="groupQR">
			<div class="title">小组二维码</div>
			<van-icon color="#999" name="arrow" />
		</div>
		<!-- 设为置顶 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom">
			<div class="title">设为置顶</div>
			<van-switch active-color="#07c160" @change="switchChange(1)" :active-value="1" :inactive-value="0" v-model="groupItem.isTop"
			 size="20"></van-switch>
		</div>
		<!-- 消息免打扰 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom">
			<div class="title">消息免打扰</div>
			<van-switch active-color="#07c160" @change="switchChange(2)" :active-value="1" :inactive-value="0" v-model="groupItem.isSilent"
			 size="20"></van-switch>
		</div>
		<!-- 小组邀请确认 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom2" v-if="isCurrentUser">
			<div class="title">小组邀请确认</div>
			<van-switch active-color="#07c160" @change="switchChange(false)" :active-value="1" :inactive-value="0" v-model="groupItem.isInviteConfirm"
			 size="20"></van-switch>
		</div>
		<!-- 我在小组中昵称 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom" @click="goChangeNickname">
			<div class="title">我在小组中昵称</div>
			<div class="ub ub-ac">
				<div class="van-ellipsis detail">{{groupItem.nickname}}</div>
				<van-icon color="#999" name="arrow" />
			</div>
		</div>
		<!-- 转让组长 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom2" v-if="isCurrentUser" @click="goMember(1)">
			<div class="title">转让组长</div>
			<van-icon color="#999" name="arrow" />
		</div>
		<!-- 删除聊天记录 -->
		<div class="cellbox ub ub-ac ub-pj border-bottom2" @click="delChatRecord">
			<div class="title">删除聊天记录</div>
			<van-icon color="#999" name="arrow" />
		</div>
		<!-- 退出 -->
		<div class="cellbox quit" v-if="isCurrentUser" @click="goMember(2)">
			转让并退出小组
		</div>
		<div class="border-bottom2" v-if="isCurrentUser"></div>
		<!-- 退出 -->
		<div class="cellbox quit" @click="cancelGroup">
			{{isCurrentUser?'解散小组':'退出小组'}}
		</div>
	</div>
</template>

<script>
	import {
		groupSettingInfo,
		memberExit,
		relieveGroup
	} from '@a/groupIndex';
	import {
		upDateGroup
	} from '@a/createGroup';
	const defaultSettings = require('../settings.js');
	import {
		NavBar,
		Icon,
		Loading,
		Tag,
		Switch,
		Uploader,
		Dialog,Toast
	} from 'vant';
	import {
		pictureReview
	} from '@u/tool';
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Loading.name]: Loading,
			[Tag.name]: Tag,
			[Switch.name]: Switch,
			[Uploader.name]: Uploader,
			[Dialog.name]: Dialog,
			[Toast.name]: Toast,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				overlayShow: false,
				loading: false,
				finished: false,
				groupId: this.$route.query.id,
				huanxinGroupId: this.$route.query.huanxinGroupId,
				groupOwnerId:this.$route.query.groupOwnerId,
				isCurrentUser: 0,
				memberIcon: [],
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
		mounted() {
			this.initData()
		},
		created() {},
		methods: {
			initData() {
				groupSettingInfo({
					groupId: this.groupId,
				}).then(res => {
					this.isCurrentUser = res.data.myteamGroupMember ? res.data.myteamGroupMember.isGroupLeader : 0;
					this.groupItem = Object.assign(this.groupItem, res.data.myteamGroupInfo);
					this.groupItem = Object.assign(this.groupItem, res.data.myteamGroupMember);
					this.memberIcon = res.data.myteamGroupMemberList;
				});
			},
			afterRead(file) {
				this.overlayShow = true;
				pictureReview(file, res => {
					this.overlayShow = false;
					this.groupItem.portrait = res.url;
					upDateGroup(this.groupItem).then(res => {

					})
				})
			},
			goMember(flag) {
				//1组长转让 2 组长转让并退出  3移除成员  4 成员列表
				this.$router.push({
					path: '/groupMember',
					query: {
						flag: flag,
						id: this.groupId,
						huanxinGroupId: this.huanxinGroupId,
					}
				});
			},
			goChangeNickname() { //修改昵称
				this.$router.push({
					path: '/changeNickname',
					query: {
						name: this.groupItem.nickname,
						id: this.groupId
					}
				});
			},
			goInvite() { //邀请好友
				this.$router.push({
					path: '/inviteList',
					query: {
						id: this.groupId,
						huanxinGroupId: this.huanxinGroupId,
						groupOwnerId:this.groupOwnerId,
						groupName :this.groupItem.name
					}
				});
			},
			goChangeMult(flag) { //1小组口号--2小组公告---3小组标签--4小组名称
				if (!this.isCurrentUser && (!this.isCurrentUser && flag != 2)) return;
				if (flag == 3) { //前往标签
					this.$router.push({
						path: '/createGroup',
						query: {
							id: this.groupId,
							labelId: this.groupItem.labelId,
							edit: 1,
						}
					});
					return;
				}
				this.$router.push({
					path: '/multChangePage',
					query: {
						flag: flag,
						id: this.groupId,
						isCurrentUser: this.isCurrentUser,
						text: flag == 1 ? this.groupItem.slogon : flag == 2 ? this.groupItem.content : this.groupItem.name
					}
				});
			},
			labelFun(id) {
				return defaultSettings.RETURN_LABEL(id)
			},
			delChatRecord() {
				Dialog.confirm({
					confirmButtonText: '确定',
					confirmButtonColor: '#e62000',
					cancelButtonColor: '#999',
					message: '确定要删除聊天记录吗？'
				}).then(() => {
					this.$interaction.appNative('LSTH5APP_DeletChatContent', {
						huanxinGroupId: this.huanxinGroupId
					});
					setTimeout(() => {
						Toast('删除成功!');
					}, 500);
				}).catch(() => {

				});
			},
			cancelGroup() { //解散小组
				let str = "确定退出小组？";
				if (this.isCurrentUser) str = '确定解散小组？';
				Dialog.confirm({
					confirmButtonText: '确定',
					confirmButtonColor: '#e62000',
					cancelButtonColor: '#999',
					message: str
				}).then(() => {
					if (this.isCurrentUser) {
						relieveGroup({
							groupId: this.groupId
						}).then(res => {
							this.$router.replace({
								path: '/myGroupList',
							});
						})
						return;
					}
					//成员退出
					memberExit({
						groupId: this.groupId
					}).then(res => {
						this.$router.replace({
							path: '/myGroupList',
						});
					})
				}).catch(() => {

				});
			},
			switchChange(flag) {
				upDateGroup(this.groupItem).then(res => {
					if (!flag) return;
					let methodstr = 'LSTH5APP_MessageDoNotDisturb'; //免打扰huanxinGroupId= "环信的群聊ID",isOpen: int类型 1免打扰开启，0免打扰关闭
					if (flag == 1) methodstr = 'LSTH5APP_ConversationSetIsTop'; //置顶huanxinGroupId= "环信的群聊ID",isOpen: int类型 1开启置顶，0关闭置顶
					this.$interaction.appNative(methodstr, {
						huanxinGroupId: this.huanxinGroupId,
						isOpen: flag == 1 ? this.groupItem.isTop : this.groupItem.isSilent
					})
				})
			},
			onclickLeft() {
				// this.$interaction.closePage();
				this.$router.go(-1)
			},
			onClickRight() { //跳转创建小组
				localStorage.removeItem("groupItem")
				this.$router.push({
					path: '/groupIndex',
					query: {
						id: item
					}
				});
			},
			groupQR() { //二维码
				this.$interaction.appNative('LSTH5APP_goToGroupQR', {
					name: this.groupItem.name,
					imageUrl: this.groupItem.portrait,
					qrShareUrl: defaultSettings.host + "h5/h5V2/myGroup/#/groupIndex?id=" + this.groupId + '&isShare=1'
				})
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
<style scoped="scoped">
	@import '../styles/groupSetting/groupSetting.css';
	@import '../styles/css/myGroupList.css';

	.border-bottom .detail {
		max-width: 4.8rem;
	}

	.groupMember .van-ellipsis {
		max-width: .92rem;
	}

	.labelBox .labelItem {
		color: #999999;
		font-size: 0.2rem;
		line-height: 0.32rem;
		padding: 0 0.08rem;
		margin-right: 0.2rem;
		height: 0.32rem;
		border-radius: 0.1rem;
		white-space: nowrap;
	}

	.labelBox .labelItem:last-child {
		margin-right: 0;
	}
</style>
