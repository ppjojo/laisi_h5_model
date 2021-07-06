<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar title="邀请好友" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
				<template #right>
					<div>邀请({{memberResult.length}})</div>
				</template>
			</van-nav-bar>
		</div>
		<van-search v-model="searchval.key" @input="search" placeholder="请输入成员昵称或ID"></van-search>
		<div class="ub ub-ac ub-ad invitebox" v-if="false">
			<div class="tx-c" @click="shareClub('wechat')">
				<img :src="require('../img/weixin-4.png')" alt="">
				<div class="">微信好友</div>
			</div>
			<div class="tx-c" @click="shareClub('wxcircle')">
				<img :src="require('../img/pyq.png')" alt="">
				<div>朋友圈</div>
			</div>
			<div class="tx-c">
				<img :src="require('../img/qq.png')" alt="" @click="shareClub('qq')">
				<div>QQ好友</div>
			</div>
			<div class="tx-c">
				<img :src="require('../img/qqzone.png')" alt="" @click="shareClub('qzone')">
				<div>QQ空间</div>
			</div>
		</div>
		<van-checkbox-group v-model="memberResult" ref="checkboxGroup">
			<van-cell-group v-show="searchval.key&&searchList.length>0">
				<template v-if="searchList.length>0">
					<van-cell v-for="(memItem,index) in searchList" clickable :key="memItem.userId"
						@click="toggle(index,memItem)">
						<template #icon>
							<van-checkbox :name="memItem.userId" ref="checkboxes" :disabled="memItem.isFriend==1">
							</van-checkbox>
						</template>
						<template #title>
							<ul class="ul_class">
								<li class="ub ub-ac ub-pj">
									<div class="ub ub-ac">
										<img class="headpic" :src="memItem.headPictureUrl" alt="">
										<div>
											<div class="ub ub-ac">
												<div class="nickname van-ellipsis">{{memItem.nickName}}</div>
											</div>
											<!-- <div class="time">关注时间：{{sjc2time('ymd',memItem.createTime)}}
											</div> -->
										</div>
									</div>
								</li>
							</ul>
						</template>
					</van-cell>
				</template>
			</van-cell-group>
			<div v-show="!searchval.key||searchval.key==''">
				<van-cell-group v-model="memberResult">
					<van-index-bar>
						<template v-if="Object.keys(dataList).length>0" v-for="(bigitem,key,index) in dataList">
							<van-index-anchor :index="key.toUpperCase()"></van-index-anchor>
							<van-cell v-for="(memItem,index2) in bigitem" clickable :key="memItem.userId"
								@click="toggle(index2,memItem)">
								<template #icon>
									<van-checkbox :name="memItem.userId" ref="checkboxes"
										:disabled="memItem.isFriend==1"></van-checkbox>
								</template>
								<!-- v-if="!memItem.isFriend" -->
								<template #title>
									<ul class="ul_class">
										<li class="ub ub-ac ub-pj">
											<div class="ub ub-ac">
												<img class="headpic" :src="memItem.headPictureUrl" alt="">
												<div>
													<div class="ub ub-ac">
														<div class="nickname van-ellipsis">{{memItem.nickName}}</div>
													</div>
													<!-- <div class="time">
														关注时间：{{sjc2time('ymd',memItem.createTime)}}</div> -->
												</div>
											</div>
										</li>
									</ul>
								</template>
							</van-cell>
						</template>
					</van-index-bar>
				</van-cell-group>
			</div>
		</van-checkbox-group>
	</div>
</template>

<script>
	function debounce(func, wait = 800) { //可以放入项目中的公共方法中进行调用（鹅只是省事）
		let timeout;
		return function (event) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				func.call(this, event)
			}, wait)
		}
	}
	import {
		getMyFriend,
		inviteFriend
	} from '@a/groupMember'
	import {
		NavBar,
		Icon,
		Search,
		CheckboxGroup,
		CellGroup,
		Cell,
		Toast,
		Checkbox,
		Dialog,
		IndexBar,
		IndexAnchor
	} from 'vant';
	import {
		sjc2time,
		timeStamp2String
	} from '@u/Date.js'
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Search.name]: Search,
			[CheckboxGroup.name]: CheckboxGroup,
			[CellGroup.name]: CellGroup,
			[Cell.name]: Cell,
			[Toast.name]: Toast,
			[Checkbox.name]: Checkbox,
			[Dialog.name]: Dialog,
			[IndexBar.name]: IndexBar,
			[IndexAnchor.name]: IndexAnchor,
		},
		data() {
			return {
				groupId: this.$route.query.id,
				userId: JSON.parse(localStorage.getItem("appInfo")).userId,
				memberResult: [],
				searchval: {
					groupId: this.$route.query.id,
					key: '',
					userId: JSON.parse(localStorage.getItem("appInfo")).userId
				},
				searchList: [],
				dataList: [],
				allList: [],
				inviteObj: {
					huanxinGroupId: this.$route.query.huanxinGroupId,
					groupId: this.$route.query.id+'',
					groupOwnerId:this.$route.query.groupOwnerId+'',
					groupName:this.$route.query.groupName,
					groupInviteIds :null,
					invitedUserIds :null,
					invitedUserNames :null,
					inviteByUserName :JSON.parse(localStorage.getItem("appInfo")).nickname
				}
			};
		},
		filters: {},
		mounted() {
			this.getList()
		},
		created() {},
		methods: {
			sjc2time: sjc2time,
			timeStamp2String: timeStamp2String,
			getList() {
				getMyFriend(this.searchval).then(res => {
					this.dataList = res.data;
					for (let key in res.data) {
						res.data[key].forEach(d => {
							this.allList.push(d);
						})
					}
				}).catch(() => {})
			},
			search: debounce(function (e) {
				if (!this.searchval.key) return;
				getMyFriend(this.searchval).then(res => {
					let arr = [],
						resData = res.data;
					for (let key in resData) {
						resData[key].forEach(d => {
							arr.push(d);
						})
					}
					this.searchList = arr;
				}).catch(() => {})
			}),
			toggle(index, mid) {
				if (mid.isFriend) return
				this.$refs.checkboxes.forEach((d, f) => {
					if (d.name == mid.userId) {
						this.$refs.checkboxes[f].toggle();
					}
				})
			},
			onclickLeft() {
				// this.$interaction.closePage();
				this.$router.go(-1)
			},
			onClickRight() { //跳转创建小组
				if (this.memberResult.length == 0) return;
				Dialog.confirm({
					confirmButtonText: '邀请',
					confirmButtonColor: '#007aff',
					cancelButtonColor: '#999',
					message: '确定发出邀请？对方同意邀请才会加入小组～'
				}).then(() => {
					inviteFriend({
						beingInvitedUserIds: this.memberResult,
						groupId: this.groupId,
						groupUserId: this.inviteObj.groupOwnerId
					}).then(res => {
						let result = res.data;
						if (res.code == 0) {
							let ids = [],
								chatids = [],
								names = [];
							result.forEach(d => {
								for (let i = 0; i < this.allList.length; i++) {
									if (d.beingInvitedMember == this.allList[i].userId) {
										ids.push(d.beingInvitedMember);
										chatids.push(d.id);
										names.push(this.allList[i].nickName);
									}
								}
							});
							this.inviteObj.groupInviteIds = chatids.toString();
							this.inviteObj.invitedUserIds = ids.toString();
							this.inviteObj.invitedUserNames = names.toString();
							this.$interaction.appNative('LSTH5APP_GroupInvite', this.inviteObj).then(
						() => {
								Toast('邀请成功！');
								setTimeout(() => {
									this.$router.go(-1)
								}, 2000)
							})
						}else{
							Toast('邀请失败！');
						}
					})

				}).catch(() => {

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
<style scoped>
	@import '../styles/member.css';

	.van-collapse-item__wrapper .van-cell {
		padding: 0;
	}

	.van-hairline--top-bottom::after,
	.van-hairline-unset--top-bottom::after {
		border: none;
	}

	.van-checkbox {
		margin-right: .2rem;
	}

	.invitebox {
		padding: .4rem .4rem;
		font-size: .2rem;
		color: #999;
		border-bottom: .02rem solid #f5f5f5;
	}

	.tx-c {
		text-align: center;
	}

	.van-index-bar__sidebar {
		top: 60%;
	}
</style>