<template>
	<div id="app" v-cloak>
		<div class="header" v-if="isShare!=1">
			<van-nav-bar title="运动日历" right-text="打卡总览" @click-left="onClickLeft" @click-right="onClickRight"
				safe-area-inset-top fixed>
				<template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
				</template>
			</van-nav-bar>
		</div>
		<div class="calendaroutbox">
			<nCalendar ref="calendar"></nCalendar>
		</div>
		<!-- 打卡 -->
		<div class="" v-if="flag==1">
			<!-- 今日尚未打卡有打卡按钮 -->
			<div v-if="monthObj.sportClockMax>1" class="normaltxt"
				style="width: 4rem;text-align: center;margin: .4rem auto 1.2rem;">
				本月最大连续签到打卡<span class="ftbe">{{monthObj.sportClockMax||0}}</span>天！</br>
				继续加油哦～
			</div>
			<div v-else class="normaltxt" style="width: 4rem;text-align: center;margin: .4rem auto 1.2rem;">
				本月累计打卡<span class="ftbe">{{monthObj.sportClockSum||0}}</span>天！</br>
				继续加油哦～
			</div>
			<div class="clockBtn" @click="firstClick">
				运动打卡
			</div>
		</div>
		<div class="infobox" v-else-if="flag==2||flag==5">
			<!-- 打卡失败 一点都没有运动-->
			<div v-if="flag==2" class="normaltxt" style="width: 4rem;text-align: center;margin: .4rem auto .8rem;">
				本月累计打卡<span class="ftbe">{{monthObj.sportClockSum||0}}</span>天！</br>
				继续加油哦～
			</div>
			<div v-else class="ub ub-ac sportfinish">
				<img class="" :src="require('@i/sportunfinish.png')" alt="">
				<div>当日未达到目标运动量！请继续加油哦！</div>
			</div>
			<div style="margin:0 auto .2rem;text-align: center;">
				<img class="" style="width: 2.5rem;" :src="require('@i/none.png')" alt="">
				<div style="font-size: .28rem;color:#71717F;">{{flag==2?'您还没有运动，先去运动吧～':'无运动打卡记录'}}</div>
			</div>
		</div>
		<div class="infobox" v-else-if="flag==3||flag==4">
			<!-- 3打卡成功，没达标 打卡成功且达标-->
			<div class="ub ub-ac sportfinish">
				<img class="" v-if="flag==3" :src="require('@i/sportunfinish.png')" alt="">
				<img class="" v-else :src="require('@i/sportfinish.png')" alt="">
				<div>{{flag==3?((todayFlag?'今':'当')+'日未达到目标运动量！继续加油哦！'):((todayFlag?'今':'当')+'日已达到目标运动量～')}}</div>
			</div>
			<!-- 运动时长-运动消耗 -->
			<div class="ub ub-ac ub-pj sportinfo">
				<div class="sportbox sportItem">
					<div class="">
						运动时长
					</div>
					<div>
						{{formatSeconds(sportObj.takeMs||0)}}
					</div>
				</div>
				<div class="sportbox sportItem">
					<div class="">
						运动消耗
					</div>
					<div>
						{{(sportObj.burn/1000).toFixed(2)||0}}<span>kcal</span>
					</div>
				</div>
			</div>
			<!-- 运动详情 -->
			<div class="sportdetail" :class="{fixedpd:flag==3||flag==4}">
				<div class="title">运动详情</div>
				<div class="sportItem ub ub-ac ub-pj" v-for="(item,i) in sportObj.deviceDetail">
					<div class="ub ub-ac">
						<returnIcon :bgw="true" :name="i"></returnIcon>
						<!-- <img class="sporticon" :src="require('@i/sporticon/icon_skipping.png')" alt=""> -->
						<div class="iteminfo">
							<div>{{typeUtilStr(item,i,'name')}}
								<van-popover v-if="i=='steps'" theme="dark" v-model="showPopover" trigger="click"
								placement="right"
									>
									<div class="attentiontxt">
										步数不满2000步，不作为运动打卡数据；步数消耗不计入总消耗
									</div>
									<template #reference>
										<img class="attention" :src="require('@i/attention.png')">
									</template>
								</van-popover>
							</div>
							<div>{{typeUtilStr(item,i,'unit')}}</div>
						</div>
					</div>
					<img v-if="item.isFinish" class="iconselect" :src="require('@i/icon_select.png')" alt="">
					<img v-else-if="item.isFinish===0" class="iconselect" :src="require('@i/icon_unselect.png')" alt="">
				</div>
				<!-- 查看我的运动目标 -->
				<div class="ub ub-ac ub-ad target" @click="goTarget">
					<div>查看我的运动目标
						<van-icon size="10" name="arrow" />
					</div>
				</div>
			</div>
		</div>
		<!-- 更新打卡 -->
		<div class="updateclock" v-show="(isToday(sportObj.checkTime)&&(flag==3||flag==4))&&isShare!=1">
			<div class="btn" @click="reClick">
				更新打卡
			</div>
		</div>
		<!-- 时间选择 -->
		<van-popup position="bottom" round :style="{height: '45%'}" v-model="YMshow">
			<van-datetime-picker v-model="currentDate" type="year-month" title="" :min-date="minDate"
				@confirm="pickConfirm" :max-date="maxDate" :formatter="formatter">
			</van-datetime-picker>
		</van-popup>
		<!-- 打卡状态 -->
		<van-popup round :style="{height: '6.1rem'}" v-model="clockShow">
			<clockState :state="clockState" :maxday="monthObj.sportClockSum"></clockState>
		</van-popup>
	</div>
</template>

<script>
	import nCalendar from '@c/calendar';
	import clockState from '@c/clockState';
	import returnIcon from '@c/returnIcon';
	import {
		getQueryString
	} from "@u/tool";
	import {
		insertSportData,
		updateSportData,
		getSportByMonth,
		getDayData
	} from '@a/api'
	import {
		NavBar,
		Icon,
		Popup,
		DatetimePicker,Popover
	} from 'vant';
	import timeUtil from "@u/calendar";
	import typeUtil from "@u/type";
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			nCalendar,
			returnIcon,
			clockState,
			[Popup.name]: Popup,
			[DatetimePicker.name]: DatetimePicker,
			[Popover.name]: Popover,
			// [SwipeItem.name]: SwipeItem,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				isShare:getQueryString('isShare2'),
				minDate: new Date(2021, 0, 1),
				isClick: false,
				maxDate: new Date(),
				currentDate: new Date(),
				checkTime: new Date(new Date().toLocaleDateString()).getTime(),
				currentZero: new Date(new Date().toLocaleDateString()).getTime(),
				YMshow: false,
				clockShow: false,
				clockState: true,
				showPopover: false,
				actions: [{
					text: '连接手表状态下“步数不满2000步，不作为运动打卡数据”；未连接手表状态下“步数不满2000步时，不作为运动打卡数据，步数消耗不计入'
				}],
				flag: null, //1未打卡2打卡失败3打卡成功未达标4打卡成功已达标5当天无打卡记录
				todayFlag:true,
				sportObj: { //当日运动详情
				},
				monthObj: {
					sportClockMax: 0
				} //打卡详情
			};
		},
		filters: {},
		mounted() {
			// this.calindarList();
		},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				getDayData({
					checkTime: this.checkTime
				}).then(res => { //获取当天设备信息
					if (res.code == "0") {
						this.sportObj = Object.assign(this.sportObj, res.data);
						//this.sportObj.deviceDetail.steps={number:4188}
						this.flag = this.sportObj.isFinishDays == 1 ? 4 : 3;
						this.$forceUpdate();

					} else if (res.code == "1") {
						//打卡失败 相当于未打卡
						this.flag = 1;
					} else if (res.code == "2") {
						//过去未打卡
						this.flag = 5;
					}
				})
			},
			firstClick() {
				if (this.isClick) return;
				this.isClick = true;
				//首次打卡
				insertSportData({}).then(res => {
					this.isClick = false;
					this.clockState = (res.code == "0");
					this.clockShow = true;
					if (!this.clockState) {
						this.flag = 2;
					} else {
						this.getList()
						this.$refs.calendar.calindarList(null,true);
						// this.calindarList()
					}
				})
			},
			reClick() {
				if (this.isClick) return;
				this.isClick = true;
				//更新打卡
				updateSportData({}).then(res => {
					this.isClick = false;
					if (res.code == '1') {
						this.$toast('更新打卡失败');
						return;
					}
					if (res.code == '2') {
						this.$toast('你还没有新的运动数据');
						return;
					}
					this.getList()
					this.$refs.calendar.calindarList();
					this.$toast('更新打卡成功')
					// this.calindarList()
				})
			},
			clickBeforeDay(stamp,todayFlag) { //点击了过去的某个时间
				console.log(this.currentZero, stamp)
				this.checkTime = stamp;
				this.getList();
				this.todayFlag = todayFlag;
			},
			onClickLeft() {
				this.$interaction.closePage();
				// this.$router.go(-1)
			},
			onClickRight() { //跳转打卡总览
				this.$router.push({
					path: '/clockoverview',
				});
			},
			goTarget() {
				//LSH5APP_GoToMyTarget
				this.$interaction.appNative('LSH5APP_GoToMyTarget', {});
			},
			formatSeconds: timeUtil.formatSeconds,
			fatherSetMonthObj(obj) {
				this.$nextTick(() => {
					this.monthObj = Object.assign(this.monthObj, obj);
					// console.log(this.monthObj)
				})
			},
			fatherPickYearMonth() { //子组件调用打开时间选择
				this.YMshow = true;
			},
			pickConfirm(value) { //时间选择回调
				this.$refs.calendar.getList(value)
				this.$refs.calendar.dateTitleStr(value, 'ym')
				this.YMshow = false;
			},
			typeUtilStr(val, key, type) { //返回运动名称
				if (type == 'name') return typeUtil.formatStr(val, key);
				if (type == 'unit') return typeUtil.formatStrUnit(val, key);
			},
			formatter(type, val) {
				if (type === 'year') {
					return `${val}年`;
				} else if (type === 'month') {
					return `${val}月`;
				}
				return val;
			},
			isToday(str) {
				return (new Date(str).toDateString() === new Date().toDateString());
			}
		}
	};
</script>
<style lang="scss">
	.attention {
		width: .24rem;
		height: .24rem;
		margin-left: .1rem;
	}
	.van-popover--dark .van-popover__content{
		background-color: #292934;
		color: #71717f;
	}
	.van-popover--dark .van-popover__arrow{
		color:#292934;
	}
	.attentiontxt{
		font-size: .18rem;
		width: 3.7rem;
		padding:.05rem .1rem;
	}
	.infobox {
		padding: .48rem;

		.sportbox {
			width: 3.08rem;

			div:nth-child(1) {
				font-size: .28rem;
				margin-bottom: .32rem;
			}

			div:nth-child(2) {
				font-size: .48rem;

				span {
					font-size: .24rem;
				}
			}
		}

		.sportItem {
			background-color: #1e1e2a;
			font-size: .24rem;
			color: #cfcfd2;
			border-radius: .16rem;
			padding: .24rem;
			margin-bottom: .16rem;
		}

		.sportdetail {
			margin-top: .56rem;

			.target {
				color: #595962;
				font-size: .24rem;
				margin-top: .4rem;
			}

			.iteminfo {
				margin-left: .24rem;

				div:nth-child(1) {
					margin-bottom: .16rem;
				}
			}

			.sporticon {
				width: .64rem;
				height: .64rem;
			}

			.iconselect {
				width: .32rem;
				height: .32rem;
			}

			.title {
				font-size: .32rem;
				margin-bottom: .4rem;
			}
		}

		.sportfinish {
			margin-bottom: .54rem;

			div {
				font-size: .28rem;
				color: #cfcfd2;
			}

			img {
				width: .4rem;
				height: .4rem;
				margin-right: .2rem;
			}
		}
	}

	.calendaroutbox {
		border-bottom: 3px solid #1e1e2a;
		padding-bottom: .3rem;
	}

	.normaltxt {
		font-size: .28rem;

		span {
			font-size: .56rem;
		}
	}

	.fixedpd {
		padding-bottom: 1.84rem;
	}

	.updateclock {
		height: 1.84rem;
		width: 100%;
		background: linear-gradient(to bottom, rgba(18, 18, 31, 0) 10%, rgba(18, 18, 31, 1));
		position: fixed;
		bottom: 0;

		.btn {
			height: .88rem;
			width: 6.7rem;
			margin: 0 auto;
			background: linear-gradient(to left, #FF4E3E, #FFAA88);
			font-size: .4rem;
			color: #fff;
			line-height: .88rem;
			text-align: center;
			border-radius: .44rem;
		}
	}

	.clockBtn {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		line-height: 2rem;
		font-size: .4rem;
		text-align: center;
		background: linear-gradient(to bottom, #ffaa88, #ff4e3e);
		margin: 0 auto;
	}

	.van-picker__toolbar {
		border-bottom: 1px solid #1e1e2a;
	}

	.van-picker-column__item {
		color: #cfcfd2;
	}

	// .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
	// 	border-color: #595962;
	// }
</style>
