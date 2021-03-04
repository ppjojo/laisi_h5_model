<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar :title="title" @click-left="onclickLeft" @click-right="onClickRight" left-arrow safe-area-inset-top
			 fixed>
				<template #right>
					<div v-if="flag==3">移除({{memberResult.length}})</div>
				</template>
			</van-nav-bar>
		</div>
		<van-search v-model="searchval.searchKey" @input="search" v-if="flag==3||flag==4" placeholder="请输入成员昵称或ID"></van-search>
		<van-checkbox-group v-model="memberResult" ref="checkboxGroup">
			<van-cell-group v-show="searchval.searchKey&&searchList.length>0">
				<template v-if="searchList.length>0">
					<van-cell v-for="(memItem,index) in searchList" clickable :key="memItem.memberId" @click="toggle(index,null,memItem)">
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
												<div class="nickname van-ellipsis">{{memItem.clubGroupNickname||memItem.accountNickname}}{{memItem.clubGroupNickname?('('+memItem.accountNickname+')'):''}}</div>
												<div v-if="memItem.isMinister=='Y'||memItem.isSubMinister=='Y'" class="badage">组长</div>
											</div>
											<div class="time">加入时间：{{sjc2time('ymd',memItem.createTime)}}</div>
										</div>
									</div>
									<div v-if="(flag!=2||flag!=4)&&memberStatus(false,memItem)&&settingflag==1" @click.stop="takeFocus(memItem)"
									 class="btn_member" :class="{btn_member_gray:memberStatus(1,memItem)}">{{memberStatus(2,memItem)}}</div>
								</li>
							</ul>
						</template>
					</van-cell>
				</template>
			</van-cell-group>
			<div v-show="!searchval.searchKey||searchval.searchKey==''">
				<van-cell-group>
					<template>
						<van-cell v-for="(memItem,index2) in dataList" clickable :key="memItem.memberId" @click="toggle(index2,{},memItem)">
							<template #icon v-if="showEXP(memItem,{})">
								<van-checkbox :name="memItem.memberId" :disabled="settingflag==3&&memItem.isMinister=='Y'" ref="checkboxes"></van-checkbox>
							</template>
							<template #title>
								<ul class="ul_class">
									<li class="ub ub-ac ub-pj">
										<div class="ub ub-ac">
											<img class="headpic" :src="memItem.headPictureUrl" alt="">
											<div>
												<div class="ub ub-ac">
													<div class="nickname van-ellipsis">{{memItem.clubGroupNickname||memItem.accountNickname}}</div>
													<div class="badage">组长</div>
												</div>
												<div class="time">加入时间：{{sjc2time('ymd',memItem.createTime)}}</div>
											</div>
										</div>
										<div v-if="flag==4" @click.stop="takeFocus(memItem)" class="btn_member" :class="{btn_member_gray:memberStatus(1,memItem)}">{{memberStatus(2,memItem)}}</div>
										<div v-if="flag==3&&userId!=memItem.memberId" @click.stop="changeLeader(memItem)" class="btn_member btn_member_gray">转让</div>
									</li>
								</ul>
							</template>
						</van-cell>
					</template>
				</van-cell-group>
			</div>
		</van-checkbox-group>
		<van-button round class="submit" block v-if="flag==7" :color="memberResult.length>0?bgc:bgcgrey" @click="chooseBack">确定</van-button>

	</div>
</template>

<script>
	function debounce(func, wait = 800) { //可以放入项目中的公共方法中进行调用（鹅只是省事）
		let timeout;
		return function(event) {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				func.call(this, event)
			}, wait)
		}
	}
	import {
		listItem,TakeFocus
	} from '@a/groupMember'
	import {sjc2time} from '@u/Date.js'
	import {
		NavBar,
		Icon,
		Search,
		CheckboxGroup,
		CellGroup,Cell,Toast
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
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				//1组长转让 2 组长转让并退出  3移除成员  4 成员列表
				flag: parseInt(this.$route.query.flag),
				showcheckbox: false,
				settingflag: 1, //1icon2变更3移除
				clubId: '',
				userId: JSON.parse(localStorage.getItem("appInfo")).userId,
				title: "成员列表",
				loading: true,
				showPopover: false,
				memberResult: [],
				searchval: {
					searchKey: '',
					clubId: '',
					userId: JSON.parse(localStorage.getItem("appInfo")).userId
				},
				searchList: [],
				List: [],
				dataList: [],
				bgc: "linear-gradient(to right, #FF6A88, #FF5136 )",   
				bgcgrey: '#999',
			};
		},
		filters: {},
		mounted() {
			this.getList()
		},
		created() {
			this.title = (this.flag == 1 || this.flag == 2) ? '组长转让' : this.flag == 3 ? '移除成员' : '小组成员';
		},
		methods: {
			sjc2time:sjc2time,
			getList() {
				listItem({
					clubId: 10000219,
					clubGroupId: 1
				}).then((res) => {
					this.dataList = res.data.clubGroupList;
				}).catch(() => {
					console.log("error")
				})
			},
			showEXP(memItem) {
				return this.showcheckbox && (this.settingflag == 3 && memItem.isMinister != 'Y' && this.flag == 3) ||
					(this.settingflag == 3 && memItem.isMinister != 'Y' && (this.flag == 6 && this.clubGroupId == memItem.clubGroupId &&
						memItem.memberId != this.userId)) || (this.settingflag == 2) || (this.flag == 7)
			},
			initGroupMember() {
				let _self = this;
				ajax({
					type: "get",
					url: "club/clubGroupInfo",
					data: {
						clubId: 10000219,
						clubGroupId: 1
					},
					success: function(res) {
						if (res.code == 0) {
							_self.dataList = res.data.clubGroupList;
						} else {
							_self.$toast(res.msg);
						}
					},
					error: function() {
						console.log("error")
					}
				})
			},
			toggle(index, item, mid) {
				if (this.flag == 2 || this.flag == 9) {
					if (mid.isSubMinister == "Y" && this.flag == 9 && mid.memberId == this.userId) {
						this.$toast("分部长不可转让给自己！");
						return;
					}
					if (mid.isSubMinister == "Y") {
						this.$toast("不可设置为其他分部在职分部长！");
						return;
					}
					if (mid.clubGroupId == this.clubGroupId && mid.isSubMinister == "Y" && this.flag == 2) {
						this.$toast("该成员已经是该部门分部长了！");
						return;
					}
					if (mid.clubGroupId != this.clubGroupId && (mid.clubGroupId)) {
						this.$toast("不可设置其他部门成员为分部长！");
						return;
					}
					//选择分部长
					this.chooseSubMinister(mid.memberId)
				} else if (this.flag == 4) { //装让部长
					if (mid.isSubMinister == "Y") {
						this.$toast("部长不可转让给分部长");
						return;
					}
					if (mid.isMinister == "Y") {
						this.$toast("您已经是部长了");
						return;
					}
					this.$dialog.confirm({
						// title: '标题',
						message: '您确定要转让部长给 ' + (mid.clubGroupNickname || mid.accountNickname) + ' 吗？'
					}).then(() => {
						this.transferMinister(mid.memberId);
					}).catch(() => {

					});
				} else {
					this.$refs.checkboxes.forEach((d, f) => {
						if (d.name == mid.memberId) {
							this.$refs.checkboxes[f].toggle();
						}
					})
				}

			},
			changeMember() {
				if (this.memberResult.length == 0) return;
				if (this.settingflag == 2) { //变更
					localStorage.setItem('memberResult', JSON.stringify(this.memberResult));
					window.location.href = 'inviateTo.html?isMinister=' + (this.flag == 3 ? 1 : 0) + '&clubId=' + this.clubId +
						'&flag=1';
				} else {
					let arr = [];
					this.memberResult.forEach(d => {
						let obj = {
							clubId: this.clubId,
							memberId: d
						}
						this.dataList.forEach(e => {
							e.member.forEach(f => {
								if (f.memberId == d) {
									obj.name = f.clubGroupNickname || f.accountNickname;
								}
							})
						})
						arr.push(obj);
					});
					let namestr = [],
						len = arr.length >= 4 ? 3 : arr.length;
					for (let i = 0; i < len; i++) {
						namestr.push(arr[i].name)
					}
					namestr = arr.length > 3 ? (namestr.toString() + '等人') : namestr.toString()
					this.$dialog.confirm({
						// title: '标题',
						message: '您确定要将' + namestr + '移除出俱乐部吗？'
					}).then(() => {
						this.deleteMember(arr);
					}).catch(() => {

					});
				}
			},
			deleteObj(arry) {
				var newAeey = [];
				for (var i = 0; i < arry.length; i++) {
					if (arry[i] != undefined) newAeey.push(arry[i])
				}
				return newAeey
			},
			deleteMember(arr) {
				var _self = this;
				// return;
				ajax({
					type: "post",
					url: "club/deleteMember",
					data: arr,
					success: function(res) {
						if (res.code == 0) {
							_self.$toast("成员删除成功");
							_self.settingflag = 1;
							_self.dataList.forEach(d => {
								let len = d.member.length;
								if (len > 0) {
									arr.forEach(e => {
										d.member.forEach((f, i) => {
											if (f.memberId == e.memberId) {
												delete d.member[i];
											}
										})
									})
									d.member = _self.deleteObj(d.member);
									console.log(d.member)
								}
							})
						} else {
							_self.$toast(res.msg);
						}
					},
					error: function() {
						console.log("error")
					}
				})
			},
			
			chooseSubMinister(mid) {
				let _self = this;
				if (mid == this.ministerInfo.memberId) {
					_self.$toast("部长！");
					return;
				}
				let param = {
					clubId: _self.clubId,
					clubGroupId: _self.clubGroupId,
					memberId: mid,
					isSubMinister: "Y"
				}
				if (_self.flag == 2) {
					param = [param];
				}
				ajax({
					type: "post",
					url: _self.flag == 2 ? 'club/updateClubGroupMember' : "club/transferSubMinister",
					data: param,
					success: function(res) {
						if (res.code == 0) {
							_self.$toast("设置分部长成功！");
							setTimeout(() => {
								if (_self.flag != 2) {
									localStorage.setItem('transfered', 1);
								}
								// Interaction.closePage();
								window.history.back(-1);
							}, 1000)
						} else {
							_self.$toast(res.msg);
						}
					},
					error: function() {
						console.log("error")
					}
				})
			},
			transferMinister(mid) {
				var _self = this;
				ajax({
					type: "post",
					url: "club/transferMinister",
					data: {
						clubId: _self.clubId,
						memberId: mid,
						ministerId: JSON.parse(localStorage.getItem("appInfo")).userId
					},
					success: function(res) {
						if (res.code == 0) {
							_self.$toast("部长转让成功");
							setTimeout(function() {
								// window.history.back(-1);
								localStorage.setItem('transfered', 1);
								// Interaction.closePage();
								window.history.back(-1);

							}, 1000)
						} else {
							_self.$toast(res.msg);
						}
					},
					error: function() {
						console.log("error")
					}
				})
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
					TakeFocus({targetId: item.memberId}).then(res=>{
						if (res.code == 0) {
							item.relation = 2;
							// _self.$forceUpdate()
						} else {
							Toast(res.msg);
						}
					})
				}
			},
			search: debounce(function(e) {
				let _self = this;;
				if (!_self.searchval.searchKey) return;
				ajax({
					type: "get",
					url: "club/searchUsers",
					data: _self.searchval,
					success: function(res) {
						if (res.code == 0) {
							_self.searchList = res.data;
						} else {
							_self.$toast(res.msg);
						}
					},
					error: function() {
						console.log("error")
					}
				})
			}),
			onclickLeft() {
				this.$interaction.closePage();
				// this.$router.go(-1)
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
<style>
	@import '../styles/member.css';

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

	.submit {
		position: fixed;
		bottom: 0;
		left: calc(50% - 3.15rem);
		opacity: 1;
		margin: .2rem 0;
	}

	.boldtitle {
		font-weight: bold;
	}

	.van-collapse-item__title--disabled,
	.van-collapse-item__title--disabled .van-cell__right-icon {
		color: #1F1F1F;
	}

	.ul_class li .badage {
		background-color: #327FFF;
	}
</style>
