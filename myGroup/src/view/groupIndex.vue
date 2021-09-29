<template>
	<div id="app" class="groupIndex" v-cloak>
		<div class="header" v-if="isShare!=1">
			<van-nav-bar @click-left="onclickLeft" :title="groupItem.name" left-arrow safe-area-inset-top fixed>
				<template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
				</template>
				<template #right>
					<div style="margin-right: 0.25rem;" @click="shareGroup()">
						<span class="icon iconfont icon-fenxianganniu" style="font-size: 0.48rem;" />
					</div>
					<div @click="goSetting()">
						<span class="icon iconfont icon-shezhi" style="font-size: 0.48rem;" />
					</div>
				</template>
			</van-nav-bar>
		</div>
		<div style="height:1rem" v-else></div>

		<div style="height: 4.6rem;">
			<div class="groupInfoBox">
				<div class="blackBGBox"></div>
				<img class="bannerBg" :src="groupItem.portrait" alt="">
				<div class="groupBox">
					<div class="groupImg" :style="{'background-image':'url('+groupItem.portrait+')'}"></div>
					<div class="groupInfo">
						<div class="nameBox"><span class="name">{{groupItem.name}}</span>
						</div>
						<div class="desc">{{groupItem.slogon}}</div>
						<div class="labelBox">
							<div v-for="labelItem in labelFun(groupItem.labelId)" class="labelItem"
								:class="labelItem[0]">{{labelItem[1]}}</div>

						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="containBox">
			<div class="noticeBox" @click="goNotice()">
				<div class="noticeBoxLeft">
					<img class="iconNotice" :src="require('../img/iconNotice.png')" alt="">
					<van-notice-bar class="noticeContent" :text="groupItem.content||''" />
				</div>
				<span class="icon iconfont icon-tongyong-gengduo" style="font-size: 0.25rem;" />
			</div>
			<div class="memberBox">
				<div class="title">成员</div>
				<div class="memberListDiv"  @click="goMemberlist()">
					<div class="memberPersonPic">
						<template v-for="(item ,index) in memberIcon">
							<img :src="item.headPictureUrl" v-if="index<=5" :style="{left:''+index*0.5+'rem'}">
						</template>

					</div>
					<div class="memberPersonNum">
						<div class="numP">{{groupItem.count}}人</div>
						<span class="icon iconfont icon-tongyong-gengduo" style="font-size: 0.25rem;" />
					</div>
				</div>
			</div>

			<div class="sportBox">
				<div class="dateBox">
					<div class="dateTitle">
						{{currentDatestr}}
					</div>
					<span class="chooseDate icon iconfont icon-tongyong-rili "
						@click="dateshow = isShare?false:true"></span>
				</div>
				<div class="personBox">
					<ul>
						<li v-for="item in userIdData">
							<div class="personInfoBox">
								<div class="personInfo">
									<img :src="item.headPictureUrl" class="personImg"></img>
									<div>
										<div class="name van-ellipsis">{{item.nickName}}</div>
										<div class="idInfo">ID:{{item.userId}}</div>
									</div>
								</div>
								<span class="icon iconfont icon-tongyong-gengduo" @click="goMemberDataDetail(item)" />
							</div>
							<div class="deviceList">
								<div v-for="item2 in item.dataList">
									<div class="deviceItem" v-if="item2.deviceType=='balance'">
										<img class="deviceImg" :src="require('../img/group_tzc.png')" alt="">
										<div class="deviceData">
											<span>体重:</span>
											<span class="num">{{item2.weight}}</span>
											<span>kg</span>
										</div>
										<div class="deviceData">
											<span>体脂:</span>
											<span class="num">{{item2.bfr.toFixed(1)}}</span>
											<span>%</span>
										</div>
									</div>
									<div class="deviceItem" v-else-if="item2.deviceType=='skipping'">
										<img class="deviceImg" :src="require('../img/group_ts.png')" alt="">
										<div class="deviceData">
											<span>个数:</span>
											<span class="num">{{item2.number}}</span>
											<span>个</span>
										</div>
										<div class="deviceData">
											<span>用时:</span>
											<span class="num">{{returnTime(item2.takeMs)}}</span>
										</div>
									</div>
									<div class="deviceItem" v-else-if="item2.deviceType=='wristball'">
										<img class="deviceImg" :src="require('../img/group_wlq.png')" alt="">
										<div class="deviceData">
											<span>圈数:</span>
											<span
												class="num">{{ item2.number?(item2.number/10000).toFixed(3):0 }}</span>
											<span>万</span>
										</div>
										<div class="deviceData">
											<span>用时:</span>
											<span class="num">{{returnTime(item2.takeMs)}}</span>
										</div>
									</div>

									<div class="deviceItem" v-else-if="item2.deviceType=='wheel'">
										<img class="deviceImg" :src="require('../img/group_jfl.png')" alt="">
										<div class="deviceData">
											<span>次数:</span>
											<span class="num">{{item2.number}}</span>
											<span>个</span>
										</div>
										<div class="deviceData">
											<span>用时:</span>
											<span class="num">{{returnTime(item2.takeMs)}}</span>
										</div>
									</div>
									<div class="deviceItem" v-else-if="item2.deviceType=='watch'">
										<img class="deviceImg" :src="require('../img/group_step.png')" alt="">
										<div class="deviceData">
											<span>步数:</span>
											<span class="num">{{item2.steps}}</span>
											<span>个</span>
										</div>
										<div class="deviceData">
											<span>距离:</span>
											<span class="num">{{returnTime(item2.distance)}}</span>
										</div>
									</div>
								</div>
							</div>

						</li>
					</ul>
					<div v-if="userIdData.length==0" class="nullDataBox">
						<img style="width:2rem" :src="require('../img/noData.png')" alt="">
						<p>今日无运动</p>
					</div>
				</div>
			</div>

			<div class="btn_box">
				<div class="btn" v-if="isShare" @click="goInto">立即加入</div>
				<div class="btn" v-else-if="ownerUserId" @click="goToGroupChat">
					{{isGrouptMember?'小组群聊':groupItem.isInviteConfirm?'申请加入':'立即加入'}}
				</div>

			</div>

			<van-popup v-model="dateshow" position="bottom" style="z-index: 9999;">
				<van-datetime-picker v-model="currentDate" type="date" title="" :min-date="minDate" :max-date="maxDate"
					:formatter="formatter" swipe-duration=100 @confirm="dateConfirm" @cancel="dateshow = false" />
			</van-popup>


		</div>
		<img id="leadToBrowser" src="https://oss.laisitech.com/01c21e85-22db-4a2b-8f4f-500fca31b25d.png"
			style="display: none; position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 99;" alt="">
	</div>
</template>

<script>
	var vm;
	import {
		getGroupInfo,
		joinGroup,
		applyOnly
	} from '@a/groupIndex';
	const defaultSettings = require('../settings.js');
	import {
		NavBar,
		Icon,
		NoticeBar,
		Popup,
		DatetimePicker,
		Toast
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[NoticeBar.name]: NoticeBar,
			[Popup.name]: Popup,
			[DatetimePicker.name]: DatetimePicker,
			[Toast.name]: Toast,
		},

		data() {
			return {
				fromList: 1,
				loading: false,
				finished: false,
				groupId: parseInt(this.$route.query.id),
				isShare: this.$route.query.isShare || 0,
				documentTitle: "小组主页",
				dateshow: false,
				minDate: new Date("2021", "00", "01"),
				maxDate: new Date(),
				currentDate: new Date(),
				currentDatestr: "今日运动",
				isCurrentUser: 0,
				isGrouptMember: 0,
				memberIcon: [],
				userIdData: [],
				huanxinGroupId: null,
				ownerUserId: null,
				groupItem: {
					name: '',
					portrait: '',
					slogon: '',
					labelId: '',
					isInviteConfirm: 0
				}
			}
		},
		filters: {},
		mounted() {
			if (this.isShare != 1) {
				window.addEventListener('scroll', this.scrollFn);
			}

		},

		beforeRouteEnter(to, from, next) {
			next(vm => { //vm为vue的实例,代替this
				if (!from.meta.index) {
					vm.fromList = 0
				}
			})
		},

		beforeRouteLeave(to, from, next) {
			this.destroyed();
			next() //一定不要忘记写
		},
		created() {
			vm = this;
			this.initData()
			this.groupItem = Object.assign(this.groupItem, this.$store.state.group.groupInfo);
			if (this.isShare != 1) {
				window.addEventListener('scroll', this.scrollFn);
			}
		},

		methods: {
			initData() {
				if (this.$store.state.searchTime ) {
					var year = new Date(this.$store.state.searchTime).getFullYear(),
				month = new Date(this.$store.state.searchTime).getMonth() + 1,
				dates = new Date(this.$store.state.searchTime).getDate();
				month = month > 9 ? month : "0" + month;
				dates = dates > 9 ? dates : "0" + dates;
				this.currentDatestr = year + '年' + month + '月' + dates + '日';
				}
				if(parseInt(this.$store.state.searchTime/1000)==parseInt(new Date().getTime()/1000)){
					this.currentDatestr="今日运动"
				}

				getGroupInfo({
					groupId: this.groupId,
					searchTime: this.$store.state.searchTime||new Date().getTime()
				}).then(res => {
					this.groupItem = res.data.groupInfo;
					this.memberIcon = res.data.memberIcon;

					this.userIdData = res.data.userIdData;
					let userId = this.$route.query.isShare == 1 ? (this.$route.query.userId ? this.$route.query
						.userId : 10) : JSON.parse(localStorage.getItem("appInfo")).userId
					if (parseInt(userId) == res.data.ownerUserId) this.isCurrentUser = 1;
					this.isGrouptMember = res.data.isGrouptMember;
					this.ownerUserId = res.data.ownerUserId + '';
					this.huanxinGroupId = res.data.huanxinGroupId;
					this.$store.commit("setData", {
						key: "group",
						val: res.data
					})
				})
			},
			labelFun(id) {
				return defaultSettings.RETURN_LABEL(id)
			},
			scrollFn() {
				var t = document.documentElement.scrollTop || document.body.scrollTop;
				var rate = t / 100
				if (rate > 1) {
					rate = 1
				}
				var colorValue = `rgba(18,18,31,${rate})`
				document.getElementsByClassName("van-nav-bar")[0].style.background = colorValue
				document.getElementsByClassName("van-nav-bar__title")[0].style.opacity = rate;
				document.getElementsByClassName("van-nav-bar")[0].style.color =
					`rgb(${255-48*rate},${255-48*rate},${255-45*rate})`

			},
			destroyed() {
				window.removeEventListener('scroll', this.scrollFn); // 销毁监听
			},
			onclickLeft() {
				this.destroyed();
				if (this.fromList) {
					this.$router.go(-1)
				} else {
					this.$interaction.closePage();
				}
			},
			shareGroup() {
				if (!this.isGrouptMember) return;
				this.$interaction.sharePage({
					title: this.groupItem.name,
					description: this.groupItem.slogon,
					url: defaultSettings.host + 'h5/h5V3/myGroup/#/groupIndex?id=' + this.groupId + '&isShare=1'
				})
			},
			goInto() {
				let linkUrl = ""
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
					linkUrl = "https://lstemp.laisitech.com?actionType=groupDetail&id=" + this.groupId
				} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
					if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) { //微信
						document.getElementById("leadToBrowser").style.display = "block";
						setTimeout(function () {
							document.getElementById("leadToBrowser").style.display = "none";
						}, 2000)
						return
						//linkUrl = "https://a.app.qq.com/o/simple.jsp?pkgname=com.lstech.rehealth"
					} else {
						linkUrl = "rehealth://groupdetail?id=" + this.groupId
					}
				}
				var a = document.createElement('a');
				a.setAttribute('href', linkUrl);
				a.setAttribute('id', 'js_a');
				//防止反复添加
				if (document.getElementById('js_a')) {
					document.body.removeChild(document.getElementById('js_a'));
				}
				document.body.appendChild(a);
				a.click();
			},
			goSetting() { //去设置页面
				if (!this.isGrouptMember) return;
				this.$router.push({
					path: '/groupSetting',
					query: {
						id: this.groupId,
						huanxinGroupId: this.huanxinGroupId,
						groupOwnerId: this.ownerUserId,
					}
				});
			},
			formatter(type, val) {
				if (type === 'year') {
					return `${val}年`;
				} else if (type === 'month') {
					return `${val}月`;
				} else if (type === 'day') {
					return `${val}日`;
				}
				return val;
			},
			// 确定时间回调
			dateConfirm(val) {
				var year = new Date(val).getFullYear(),
					month = new Date(val).getMonth() + 1,
					dates = new Date(val).getDate();
				month = month > 9 ? month : "0" + month;
				dates = dates > 9 ? dates : "0" + dates;
				this.currentDatestr = year + '年' + month + '月' + dates + '日';
				this.dateshow = false;
				this.$store.commit("setData", {
					key: "searchTime",
					val: new Date(val).getTime()
				})
				this.initData();
			},
			goNotice() {
				if (!this.isGrouptMember || this.isShare) return;
				this.$router.push({
					path: '/multChangePage',
					query: {
						flag: 2,
						id: this.groupId,
						isCurrentUser: this.isCurrentUser,
						text: this.groupItem.content
					}
				});
			},
			goMemberlist() {
				if (this.isShare) return;
				this.$router.push({
					path: '/groupMember',
					query: {
						flag: 4,
						id: this.groupId,
					}
				});
			},
			goToGroupChat() {
				if (this.isGrouptMember) {
					this.$interaction.appNative("LSTH5APP_goToGroupChat", {
						chatGroupId: this.huanxinGroupId
					});
				} else {
					//分享进来需要审核，给组长弹消息
					let userId = JSON.parse(localStorage.getItem("appInfo")).userId
					if (this.groupItem.isInviteConfirm) {
						applyOnly({
							groupId: this.groupId,
							groupUserId: this.ownerUserId,
							invitedUserId: userId
						}).then(res => {
							if (res.code == 0) {
								this.$interaction.appNative("LSTH5APP_ApplyJoinGroup", {
									groupInviteId: res.data.id + '',
									groupId: this.groupId + '',
									groupOwnerId: this.ownerUserId,
									groupName: this.groupItem.name,
									invitedUserId: userId,
									invitedUserName: JSON.parse(localStorage.getItem("appInfo")).nickname
								}).then(() => {
									Toast('已提交审核，等待组长确认');
								})
							} else if (res.code == 2963) {
								Toast('小组成员已满！');
							} else if (res.code == '1001') {
								Toast('已提交审核，等待组长确认!');
							}
						})

					} else {
						//分享进来不需要审核，直接加入小组
						joinGroup({
							groupId: this.groupId,
							userId: userId,
							nickName: JSON.parse(localStorage.getItem("appInfo")).nickname
						}).then(res => {
							if (res.code == 0) {
								this.initData();
							} else if (res.code == 2963) {
								Toast('小组成员已满！');
							}
						})
					}
				}
			},
			returnTime(unit) {
				if (!unit) return '00:00:00';
				unit = Math.round(unit / 1000);
				let hour = Math.floor(unit / 3600) >= 10 ? Math.floor(unit / 3600) : '0' + Math.floor(unit / 3600);
				unit -= 3600 * hour;
				let min = Math.floor(unit / 60) >= 10 ? Math.floor(unit / 60) : '0' + Math.floor(unit / 60);
				unit -= 60 * min;
				let sec = unit >= 10 ? unit : '0' + unit;
				return hour + ':' + min + ':' + sec;
			},
			goMemberDataDetail(item) {
				this.$router.push({
					path: '/memberDataDetail',
					query: {
						searchUserId: item.userId,
						groupId: this.groupId,
					}
				});
			}

		}
	};
</script>
<style lang="scss" >
	@import '@s/group.scss';
</style>
<style scoped>
	.nullDataBox {
		padding-top: 0;
	}

	.van-nav-bar {
		background-color: transparent;
		z-index: 999;
	}

	/deep/ .van-picker__mask {
		display: none;
	}
</style>