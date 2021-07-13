<template>
	<div id="app" class="groupMember" v-cloak>
		<div class="header">
			<van-nav-bar :title="title" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
				<template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.48rem;" />
				</template>
				<template #right>
					<div v-if="flag==3">移除({{memberResult.length}})</div>
				</template>
			</van-nav-bar>
		</div>
		<van-search v-model="searchval.nickNameOrId" @input="search" v-if="flag==3||flag==4" placeholder="请输入成员昵称或ID">
		</van-search>
		<van-checkbox-group v-model="memberResult" ref="checkboxGroup">
			<van-cell-group v-show="searchval.nickNameOrId&&searchList.length>0">
				<template v-if="searchList.length>0">
					<van-cell v-for="(memItem,index) in searchList" clickable :key="memItem.memberId"
						@click="toggle(index,null,memItem)">
						<template #icon v-if="showEXP(memItem)">
							<van-checkbox :name="memItem.memberId" ref="checkboxes"></van-checkbox>
						</template>
						<template #title>
							<ul class="ul_class">
								<li class="ub ub-ac ub-pj">
									<div class="ub ub-ac">
										<img class="headpic" :src="memItem.headPictureUrl" alt="">
										<div>
											<div class="ub ub-ac">
												<div class="nickname van-ellipsis">{{memItem.nickname}}</div>
												<div v-if="memItem.isGroupLeader" class="badage">组长</div>
											</div>
											<div class="time">加入时间：{{timeStamp2String('ymd',memItem.createTime)}}</div>
										</div>
									</div>
									<div v-if="flag==4&&userId!=memItem.memberId" @click.stop="takeFocus(memItem)"
										class="btn_member" :class="{btn_member_gray:memberStatus(1,memItem)}">
										{{memberStatus(2,memItem)}}</div>
								</li>
							</ul>
						</template>
					</van-cell>
				</template>
			</van-cell-group>
			<div v-show="!searchval.nickNameOrId||searchval.nickNameOrId==''">
				<van-cell-group>
					<template>
						<van-cell v-for="(memItem,index2) in dataList" clickable :key="memItem.memberId"
							@click="toggle(index2,{},memItem)">
							<template #icon v-if="showEXP(memItem,{})">
								<van-checkbox :name="memItem.memberId" ref="checkboxes"></van-checkbox>
							</template>
							<template #title>
								<ul class="ul_class">
									<li class="ub ub-ac ub-pj" @click.stop="gotoUserIndex(memItem.memberId)">
										<div class="ub ub-ac">
											<img class="headpic"  :src="memItem.headPictureUrl" alt="">
											<div>
												<div class="ub ub-ac">
													<div class="nickname van-ellipsis">{{memItem.nickname}}</div>
													<div v-if="memItem.isGroupLeader" class="badage">组长</div>
												</div>
												<div class="time">加入时间：{{timeStamp2String('ymd',memItem.createTime)}}
												</div>
											</div>
										</div>
										<div v-if="flag==4&&userId!=memItem.memberId" @click.stop="takeFocus(memItem)"
											class="btn_member" :class="{btn_member_gray:memberStatus(1,memItem)}">
											{{memberStatus(2,memItem)}}</div>
										<div v-if="(flag==1||flag==2)&&userId!=memItem.memberId"
											@click.stop="changeLeader(memItem)" class="btn_member btn_member_gray">转让
										</div>
									</li>
								</ul>
							</template>
						</van-cell>
					</template>
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
		listItem,
		TakeFocus,
		tansferGroupLeader,
		tansferGroupLeaderAndOut,
		removeMember
	} from '@a/groupMember'
	import {
		sjc2time,
		timeStamp2String
	} from '@u/Date.js'
	import {
		NavBar,
		Icon,
		Search,
		CheckboxGroup,
		CellGroup,
		Cell,
		Toast,
		Checkbox,
		Dialog
	} from 'vant';

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
			[Dialog.name]: Dialog
		},

		data() {
			return {
				//1组长转让 2 组长转让并退出  3移除成员  4 成员列表
				flag: parseInt(this.$route.query.flag),
				groupId: parseInt(this.$route.query.id),
				huanxinGroupId: this.$route.query.huanxinGroupId,
				showcheckbox: false,
				userId: JSON.parse(localStorage.getItem("appInfo")).userId,
				title: "成员列表",
				loading: true,
				showPopover: false,
				memberResult: [],
				searchval: {
					nickNameOrId: '',
					groupId: parseInt(this.$route.query.id),
					userId: JSON.parse(localStorage.getItem("appInfo")).userId
				},
				searchList: [],
				dataList: [],
			};
		},
		filters: {},
		mounted() {
			this.getList()
		},
		created() {
			this.title = (this.flag == 1 || this.flag == 2) ? '组长转让' : this.flag == 3 ? '移除成员' : '小组成员';
			if (this.flag == 3) this.showcheckbox = true;
		},
		methods: {
			sjc2time: sjc2time,
			timeStamp2String: timeStamp2String,
			getList() {
				listItem(this.searchval).then((res) => {
					this.dataList = res.data;
					if (this.flag == 4) {
						this.title = `小组成员(${res.data.length})`
					}
				}).catch(() => {
					console.log("error")
				})
			},
			showEXP(memItem) {
				return this.showcheckbox && this.flag == 3 && !memItem.isGroupLeader
			},
			toggle(index, item, mid) {
				if (this.flag != 3) return;
				this.$refs.checkboxes.forEach((d, f) => {
					if (d.name == mid.memberId) {
						this.$refs.checkboxes[f].toggle();
					}
				})
			},
			gotoUserIndex(memberId){//点击头像
				if(this.flag!=4)return;
				this.$interaction.visitPersonalHomepage(memberId);
			},
			changeLeader(item) {
				let str = "将组长职权转让给“" + item.nickname + "”并退出小组吗？";
				let confirmButtonText = "退出";
				if (this.flag == 1) {
					confirmButtonText = "转让";
					str = "将组长职权转让给“" + item.nickname + "”吗？"
				}
				Dialog.confirm({
					confirmButtonText: confirmButtonText,
					message: str
				}).then(() => {
					if (this.flag == 1) {
						tansferGroupLeader({
							groupId: this.groupId,
							leaderId: item.memberId
						}).then(res => {
							Toast('转让成功！');
							setTimeout(() => {
								this.$router.go(-1);
							}, 300)
							//this.getList();
						})
					} else {
						tansferGroupLeaderAndOut({
							groupId: this.groupId,
							leaderId: item.memberId
						}).then(res => {
							this.$router.replace({
								path: '/myGroupList',
							});
						})
					}
				}).catch(() => {

				});
			},
			memberStatus(flag, item) { //1返回是否灰色布尔值2返回后面数值
				if (!flag && item.memberId == this.userId) return false;
				if (flag == 1) {
					if (item.relation == 2 || item.relation == 3 || item.relation == 5 || item.relation == 7) {
						return true;
					} else {
						return false;
					}
				} else {
					if (item.relation == 2) {
						return "已关注";
					} else if (item.relation == 3) {
						return "相互关注";
					} else if (item.relation == 5) {
						return "已拉黑";
					} else if (item.relation == 7) {
						return "相互拉黑";
					} else {
						return "关注"
					}
				}
			},
			takeFocus(item) {
				if (item.relation == 2 || item.relation == 3 || item.relation == 5 || item.relation == 7) {
					return;
				} else {
					TakeFocus({
						targetId: item.memberId
					}).then(res => {
						if (res.code == 0) {
							item.relation = 2;
							// _self.$forceUpdate()
						} else {
							Toast(res.msg);
						}
					})
				}
			},
			search: debounce(function (e) {
				console.log(this.searchval.nickNameOrId)
				if (!this.searchval.nickNameOrId) return;
				listItem(this.searchval).then((res) => {
					this.searchList = res.data;
				}).catch(() => {
					console.log("error")
				})
			}),
			onclickLeft() {
				// this.$interaction.closePage();
				this.$router.go(-1)
			},
			onClickRight() { //移除
				if (this.flag != 3) return;
				if (this.memberResult.length == 0) return;
				let str = "确定要移除 ",
					namestr = [];
				this.memberResult.forEach(d => {
					this.dataList.forEach(e => {
						if (d == e.memberId) {
							namestr.push(e.nickname);
						}
					})
				});
				str += namestr.length <= 3 ? (namestr.toString() + '吗?') : (namestr.slice(0, 2).toString() +
					`等${namestr.length}人吗?`);
				// str += "移出小组吗?";
				Dialog.confirm({
					confirmButtonText: '移除',
					message: str
				}).then(() => {
					removeMember({
						groupId: this.groupId,
						memberIds: this.memberResult
					}).then(res => {
						this.getList();
						this.memberResult = []
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
<style scoped lang="scss">
	@import '@s/group.scss';

	.van-collapse-item__wrapper .van-cell {
		padding: 0;
	}

	.van-popover--dark .van-popover__arrow {
		color: #1f1f1f;
	}

	.van-cell::after {
		border-bottom: none;
	}

	.van-hairline--top-bottom::after,
	.van-hairline-unset--top-bottom::after {
		border: none;
	}

	.van-icon-arrow-down,
	.van-icon-arrow-up {
		color: #999;
	}

	.van-checkbox {
		margin-right: .2rem;
	}

	.boldtitle {
		font-weight: bold;
	}

	.van-collapse-item__title--disabled,
	.van-collapse-item__title--disabled .van-cell__right-icon {
		color: #1F1F1F;
	}

</style>