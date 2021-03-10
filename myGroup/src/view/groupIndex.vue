<template>
	<div id="app" class="groupIndex" v-cloak>
		<div class="header">
			<van-nav-bar :title="documentTitle" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
				<template #right>
					<div style="margin-right: 0.2rem;" @click="shareGroup()">
						<van-icon name="icon-tongyong-fenxiang" style="font-size: 0.4rem;" />
					</div>
					<div @click="goSetting()">
						<van-icon name="setting-o" style="font-size: 0.4rem;" />
					</div>
				</template>
			</van-nav-bar>
		</div>
		<div style="height: 4.6rem;">
			<div class="groupInfoBox">
				<img class="bannerBg" :src="groupItem.portrait" alt="">
				<div class="groupBox">
					<div class="groupImg" :style="{'background-image':'url('+groupItem.portrait+')'}"></div>
					<div class="groupInfo">
						<div class="nameBox"><span class="name">{{groupItem.name}}</span>
						</div>
						<div class="desc">{{groupItem.slogon}}</div>
						<div class="labelBox">
							<div v-for="labelItem in labelFun(groupItem.labelId)" class="labelItem" :class="labelItem[0]">{{labelItem[1]}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="containBox">
			<div class="noticeBox" @click="goNotice()">
				<div class="noticeBoxLeft">
					<img class="iconNotice" :src="require('../img/iconNotice.png')" alt="">
					<van-notice-bar class="noticeContent" background="#fff" :text="groupItem.content||''" />
				</div>
				<img class="iconRight" :src="require('../img/iconRight.png')" alt="">
			</div>
			<div class="memberBox">
				<div class="title">成员</div>
				<div class="memberListDiv">
					<div class="memberPersonPic">
						<template v-for="(item ,index) in memberIcon">
							<img :src="item.headPictureUrl" v-if="index<=5" :style="{left:''+index*0.5+'rem'}">
						</template>

					</div>
					<div class="memberPersonNum" @click="goMemberlist()">
						<div class="numP">{{groupItem.count}}人</div>
						<img class="iconRight" :src="require('../img/iconRight.png')" alt="">
					</div>
				</div>
			</div>

			<div class="sportBox">
				<div class="dateBox">
					<div class="dateTitle">
						{{currentDatestr}}
					</div>
					<img class="chooseDate" @click="dateshow = true" :src="require('../img/canlindar.png')" alt="">
				</div>
				<div class="personBox">
					<ul>
						<li v-for="item in userIdData">
							<div class="personInfo">
								<img :src="item.headPictureUrl" class="personImg"></img>
								<div>
									<div class="name van-ellipsis">{{item.nickName}}</div>
									<div class="idInfo">ID:{{item.userId}}</div>
								</div>
							</div>
							<div class="deviceList">
								<div class="deviceItem" v-if="returnUserData('balance',item.dataList)">
									<img class="deviceImg" :src="require('../img/group_tzc.png')" alt="">
									<div class="deviceData">
										<span>体重:</span>
										<span class="num"> {{returnUserData('balance',item.dataList).weight}}</span>
										<span>kg</span>
									</div>
									<div class="deviceData">
										<span>体脂:</span>
										<span class="num"> {{returnUserData('balance',item.dataList).bfr}}</span>
										<span>%</span>
									</div>
									<img class="iconRight" :src="require('../img/iconRight.png')" alt="">
								</div>
								<div class="deviceItem" v-if="returnUserData('wristball',item.dataList)">
									<img class="deviceImg" :src="require('../img/group_wlq.png')" alt="">
									<div class="deviceData">
										<span>圈数:</span>
										<span class="num">
											{{ returnUserData('wristball',item.dataList).totalNumber?(returnUserData('wristball',item.dataList).totalNumber/10000).toFixed(3):0 }}
										</span>
										<span>万</span>
									</div>
									<div class="deviceData">
										<span>用时:</span>
										<span class="num">{{returnTime(returnUserData('wristball',item.dataList).totalTime)}}</span>
									</div>
									<img class="iconRight" :src="require('../img/iconRight.png')" alt="">
								</div>
								<div class="deviceItem" v-if="returnUserData('skipping',item.dataList)">
									<img class="deviceImg" :src="require('../img/group_ts.png')" alt="">
									<div class="deviceData">
										<span>个数:</span>
										<span class="num">{{returnUserData('skipping',item.dataList).totalNumber}}</span>
										<span>个</span>
									</div>
									<div class="deviceData">
										<span>用时:</span>
										<span class="num">{{returnTime(returnUserData('skipping',item.dataList).totalTime)}}</span>
									</div>
									<img class="iconRight" :src="require('../img/iconRight.png')" alt="">
								</div>
							</div>

						</li>
					</ul>
					<div v-if="userIdData.length==0" class="nullDataBox" style="margin-top: 0;">
						<img :src="require('../img/noData.png')" alt="">
						<p>今日无运动</p>
					</div>
				</div>
			</div>

			<div class="btn_box">
				<div class="btn" v-if="!isShare" @click="goToGroupChat">{{isGrouptMember?'小组群聊':groupItem.isInviteConfirm?'申请加入':'立即加入'}}</div>
				<div class="btn" v-else @click="goInto">立即加入</div>
			</div>

			<van-popup v-model="dateshow" position="bottom" style="z-index: 9999;">
				<van-datetime-picker v-model="currentDate" type="date" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter"
				 swipe-duration=100 @confirm="dateConfirm" @cancel="dateshow = false" />
			</van-popup>
		</div>

	</div>
</template>

<script>
	import {
		getGroupInfo,
		joinGroup
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
			// [CellGroup.name]: CellGroup,
			// [Swipe.name]: Swipe,
			// [SwipeItem.name]: SwipeItem,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				loading: false,
				finished: false,
				groupId: parseInt(this.$route.query.id),
				isFromList: this.$route.query.isFromList || null,
				isShare: this.$route.query.isShare || 0,
				userId: JSON.parse(localStorage.getItem("appInfo")).userId,
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
			window.addEventListener('scroll', this.scrollFn);
		},
		beforeRouteLeave(to, from, next) {
			this.destroyed();
			next() //一定不要忘记写
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
		},
		created() {
			this.initData();
		},
		methods: {
			initData() {
				getGroupInfo({
					groupId: this.groupId,
					searchTime: 1565166618000 || new Date().getTime()
				}).then(res => {
					this.groupItem = res.data.groupInfo;
					this.memberIcon = res.data.memberIcon;
					this.userIdData = res.data.userIdData;
					if (parseInt(this.userId) == res.data.ownerUserId) this.isCurrentUser = 1;
					this.isGrouptMember = res.data.isGrouptMember;
					this.ownerUserId = res.data.ownerUserId;
					this.huanxinGroupId = res.data.huanxinGroupId;
				})
			},
			labelFun(id) {
				return defaultSettings.RETURN_LABEL(id)
			},
			scrollFn() {
				var t = document.documentElement.scrollTop || document.body.scrollTop;
				var rate = t / 100
				if (rate > 1) rate = 1
				var colorValue = `rgba(255,255,255,${rate})`
				var val = parseInt(255 - rate * 255)
				var colorValue2 = `rgba(${val},${val},${val})`
				document.getElementsByClassName("van-nav-bar")[0].style.background = colorValue
				document.getElementsByClassName("van-nav-bar__title")[0].style.color = colorValue2
				document.getElementsByClassName("van-nav-bar__arrow")[0].style.color = colorValue2
				document.getElementsByClassName("van-icon-icon-tongyong-fenxiang")[0].style.color = colorValue2
				document.getElementsByClassName("van-icon-setting-o")[0].style.color = colorValue2
			},
			destroyed() {
				console.log('destory')
				window.removeEventListener('scroll', this.scrollFn); // 销毁监听
			},
			onclickLeft() {
				if (parseInt(this.isFromList) == 1) {
					this.$router.go(-1);
				} else {
					this.$interaction.closePage();
				}
			},
			shareGroup() {
				if(!this.isGrouptMember)return;
				this.$interaction.sharePage({
					title: this.groupItem.name,
					description: this.groupItem.slogon,
					url: defaultSettings.host + 'h5/h5V2/myGroup/#/groupIndex?id=' + this.groupId + '&isShare=1'
				})
			},
			goInto() {
				let linkUrl = '';
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
					linkUrl = "https://lstemp.laisitech.com?actionType=groupDetail&id=" + this.groupId
				} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
					if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) { //微信
						linkUrl = "https://a.app.qq.com/o/simple.jsp?pkgname=com.lstech.rehealth"
					} else {
						linkUrl = "rehealth://groupDetail?id=" + this.groupId
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
				// this.getSchoolrank();
				this.dateshow = false;
			},
			returnUserData(id, list) {
				let obj = null;
				list.forEach(d => {
					if (id == d.deviceType) {
						obj = d;
					}
				});
				return obj
			},
			goNotice() {
				if (!this.isGrouptMember) return;
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
				this.$router.push({
					path: '/groupMember',
					query: {
						flag: 4,
						id: this.groupId
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
					if (this.groupItem.isInviteConfirm) {
						this.$interaction.appNative("LSTH5APP_ApplyJoinGroup", {
							groupId: this.groupId,
							groupOwnerId: this.ownerUserId,
							groupName: this.groupItem.name,
							invitedUserId: this.userId,
							invitedUserName: JSON.parse(localStorage.getItem("appInfo")).nickname
						}).then(() => {
							Toast('已提交审核，等待组长确认');
						})
					} else {
						//分享进来不需要审核，直接加入小组
						joinGroup({
							groupId: this.groupId,
							userId: this.userId,
							nickName: JSON.parse(localStorage.getItem("appInfo")).nickname
						}).then(res => {
							this.initData();
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
			}

		}
	};
</script>
<style>
	@import '../styles/css/myGroupList.css';
	@import "../font/iconfont.css";
</style>
<style scoped>
	@font-face {
		font-family: 'icon-tongyong-fenxiang';
		src: url('../font/iconfont.ttf') format('truetype');
	}

	.van-icon-icon-tongyong-fenxiang {
		font-family: 'icon-tongyong-fenxiang';
	}

	.van-nav-bar {
		background-color: transparent;
		z-index: 999;
	}
</style>
