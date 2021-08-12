<template>
	<div id="app" v-cloak>
		<div class="header" v-show="!sheetImageStatus">
			<van-nav-bar title="打卡总览" @click-left="onClickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
				<template #right>
					<img style="width: .48rem;" :src="require('@i/navshare.png')" alt="">
				</template>
			</van-nav-bar>
		</div>
		<div class="ub ub-ac tab" v-show="!sheetImageStatus">
			<div class="subtab" @click="changeTab(1)">
				<div class="title" :class="{active:tabIndex==1}">月度统计</div>
				<img class="activeImg" v-show="tabIndex==1" :src="require('@i/tabselect.png')" alt="">
			</div>
			<div class="subtab" @click="changeTab(2)">
				<div class="title" :class="{active:tabIndex==2}">年度统计</div>
				<img class="activeImg" v-show="tabIndex==2" :src="require('@i/tabselect.png')" alt="">
			</div>
		</div>
		<!-- 月度统计 -->
		<div v-show="tabIndex==1">
			<div class="calendaroutbox">
				<nCalendar ref="calendar"></nCalendar>
			</div>
			<!-- 进度条 -->
			<div class="percent">
				<div class="percentoutbox">
					<div class="percentTip" :style="{left:'calc( '+50+'% - .35rem )'}">50%</div>
					<div class="inside" :style="{width:'50%'}"></div>
				</div>
			</div>
			<!-- 打卡目标 -->
			<div class="target">
				亲爱的爽歪歪～</br>
				本月已经完成了 <span style="font-size: .3rem;">48</span> %的打卡目标，要继续加油哦！
			</div>
			<!-- 完成程度 -->
			<div class="ub ub-ac ub-pj finishList">
				<div class="listItem">
					<returnIcon></returnIcon>
				</div>
				<div class="listItem">
					<returnIcon></returnIcon>
				</div>
				<div class="listItem">
					<returnIcon></returnIcon>
				</div>
			</div>
		</div>
		<!-- 年度统计 -->
		<div v-show="tabIndex==2">
			<div class="calendaroutbox">
				<year ref="year"></year>
			</div>
			<!-- 打卡目标 -->
			<div style="margin-top:.48rem;">
				<div class="target">
					亲爱的爽歪歪～</br>
					你本年度填满了<span style="font-size: .3rem;">128</span>个方块，太棒啦！
				</div>
				<!-- 完成程度 -->
				<div class="ub ub-ac ub-pj finishList">
					<div class="listItem">
						<returnIcon></returnIcon>
					</div>
					<div class="listItem">
						<returnIcon></returnIcon>
					</div>
					<div class="listItem">
						<returnIcon></returnIcon>
					</div>
				</div>
			</div>
		</div>
		<!-- 时间选择 -->
		<van-popup position="bottom" round :style="{height: '45%'}" v-model="YMshow">
			<van-datetime-picker v-show="tabIndex==1" v-model="currentDate" type="year-month" title="选择年月"
				:min-date="minDate" @confirm="pickConfirm" :max-date="maxDate" :formatter="formatter">
			</van-datetime-picker>
			<van-picker v-show="tabIndex==2" title="选择年份" show-toolbar :columns="columns" @confirm="onConfirmYear">
			</van-picker>
		</van-popup>
	</div>
</template>

<script>
	import nCalendar from '@c/calendar';
	import year from '@c/year';
	import returnIcon from '@c/returnIcon';
	import {
		listItem
	} from '@a/test'
	import {
		NavBar,
		Icon,
		Popup,
		Picker,
		DatetimePicker,
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			nCalendar,
			returnIcon,
			[Popup.name]: Popup,
			[DatetimePicker.name]: DatetimePicker,
			[Picker.name]: Picker,
			year
			// [SwipeItem.name]: SwipeItem,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				minDate: new Date(2021, 0, 1),
				maxDate: new Date(),
				currentDate: new Date(),
				YMshow: false,
				tabIndex: 2, //1月度2年度
				columns: [2021, 2022],
				sheetImageStatus: false,
			};
		},
		filters: {},
		mounted() {
			window.sheetImageHideHeader = this.sheetImageHideHeader;
			window.sheetImageshowHeader = this.sheetImageshowHeader;
			this.getList()
		},
		created() {},
		methods: {
			getList() {
				listItem().then(() => {
					console.log("success")
				}).catch(() => {
					console.log("error")
				})
			},
			changeTab(index) { //点击切换tab
				this.tabIndex = index;
			},
			onClickLeft() {
				// this.$interaction.closePage();
				this.$router.go(-1)
			},
			onClickRight() { //跳转创建小组
				this.sharePage()
			},
			goGroupIndex(item) {
				this.$router.push({
					path: '/groupIndex',
					query: {
						id: item
					}
				});

			},
			fatherPickYearMonth() { //子组件调用打开时间选择
				this.YMshow = true;
			},
			pickConfirm(value) { //时间选择回调
				this.$refs.calendar.getList(value)
				this.$refs.calendar.dateTitleStr(value, 'ym')
				this.YMshow = false;
			},
			onConfirmYear(value) { //选择年份确定
				this.$refs.year.dateTitleStr2(value)
				this.YMshow = false;
			},
			formatter(type, val) {
				if (type === 'year') {
					return `${val}年`;
				} else if (type === 'month') {
					return `${val}月`;
				}
				return val;
			},
			sharePage() {
				Interaction.LSTH5APP_UrlAndSheetImageShareModel({
					title: "11",
					description: "22",
					url: "sportsClock/index.html",
				})
			},
			sheetImageHideHeader() {
				this.sheetImageStatus = true
			},
			sheetImageshowHeader() {
				this.sheetImageStatus = false
			},
		}
	};
</script>
<style lang="scss">
	.tab {
		.subtab {
			width: 50%;
			text-align: center;
			height: 1.28rem;
			line-height: 1.28rem;
			color: #71717F;
			font-size: .32rem;
			position: relative;

			.activeImg {
				position: absolute;
				width: .46rem;
				height: .14rem;
				left: calc(50% - .23rem);
				bottom: .2rem;
			}

			>.active {
				font-size: .36rem;
				color: #CFCFD2;
			}
		}
	}

	.finishList {
		flex-wrap: wrap;

		>.listItem {
			width: 45%;
			padding: .28rem .48rem;
		}
	}

	.target {
		color: #cfcfd2;
		font-size: .24rem;
		text-align: center;
		padding: 0 .3rem;
		line-height: .36rem;
		margin-bottom: .4rem;
	}

	.percent {
		padding: .92rem .48rem .32rem .48rem;
		width: 100%;

		.percentoutbox {
			width: 100%;
			border-radius: .12rem;
			background-color: rgba(30, 30, 42, 1);
			height: .16rem;
			position: relative;

			.percentTip {
				position: absolute;
				border-radius: .04rem;
				background: linear-gradient(to right, #3AD266, #8ED2B0);
				width: .7rem;
				height: .36rem;
				line-height: .36rem;
				text-align: center;
				color: #fff;
				font-size: .2rem;
				bottom: .3rem;
			}

			.percentTip:after {
				content: "";
				border-top: .15rem solid transparent;
				border-left: .15rem solid transparent;
				border-right: .15rem solid #8ED2B0;
				position: absolute;
				top: .2rem;
				transform: rotate(45deg);
				left: .2rem; //这里的top:27px，left:-7px是为了遮盖住.c-main:before生成的箭头，使箭头边框呈现颜色 
			}

			.inside {
				height: 100%;
				border-radius: .12rem;
				background: linear-gradient(to right, #3AD266, #8ED2B0);
			}
		}
	}

	.calendaroutbox {
		border-top: 3px solid #1e1e2a;
		border-bottom: 3px solid #1e1e2a;
		padding-bottom: .3rem;
	}

	.normaltxt {
		font-size: .28rem;

		span {
			font-size: .56rem;
		}
	}
</style>
