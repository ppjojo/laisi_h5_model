<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar title="运动日历" right-text="打卡总览" @click-left="onClickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
			</van-nav-bar>
		</div>
		<div class="calendaroutbox">
			<nCalendar ref="calendar"></nCalendar>
		</div>
		<!-- 打卡 -->
		<div class="" v-if="flag==1">
			<!-- 今日尚未打卡有打卡按钮 -->
			<div class="normaltxt" style="width: 4rem;text-align: center;margin: .4rem auto 1.2rem;">
				本月最大连续签到打卡<span>7</span>天！
				继续加油哦～
			</div>
			<div class="clockBtn">
				运动打卡
			</div>
		</div>
		<div v-else-if="flag==2">
			<!-- 打卡失败 一点都没有运动-->
			<div class="normaltxt" style="width: 4rem;text-align: center;margin: .4rem auto .8rem;">
				本月最大连续签到打卡<span>7</span>天！
				继续加油哦～
			</div>
			<div style="margin:0 auto .2rem;text-align: center;">
				<img class="" style="width: 2.5rem;" :src="require('@i/none.png')" alt="">
				<div style="font-size: .28rem;color:#71717F;">您还没有运动，先去运动吧～</div>
			</div>
		</div>
		<div class="infobox" v-else-if="flag==3||flag==4">
			<!-- 3打卡成功，没达标 打卡成功且达标-->
			<div class="ub ub-ac sportfinish">
				<img class="" v-if="flag==3" :src="require('@i/sportunfinish.png')" alt="">
				<img class="" v-else :src="require('@i/sportfinish.png')" alt="">
				<div>{{flag==3?'今日未达到目标运动量！继续加油哦！':'今日已达到目标运动量～'}}</div>
			</div>
			<!-- 运动时长-运动消耗 -->
			<div class="ub ub-ac ub-pj sportinfo">
				<div class="sportbox sportItem">
					<div class="">
						运动时长
					</div>
					<div>
						00:56:55
					</div>
				</div>
				<div class="sportbox sportItem">
					<div class="">
						运动消耗
					</div>
					<div>
						5555<span>kcal</span>
					</div>
				</div>
			</div>
			<!-- 运动详情 -->
			<div class="sportdetail" :class="{fixedpd:flag==3||flag==4}">
				<div class="title">运动详情</div>
				<div class="sportItem ub ub-ac ub-pj">
					<div class="ub ub-ac">
						<img class="sporticon" :src="require('@i/sporticon/icon_skipping.png')" alt="">
						<div class="iteminfo">
							<div>跳绳</div>
							<div>1,200个</div>
						</div>
					</div>
					<img class="iconselect" :src="require('@i/icon_select.png')" alt="">
				</div>
				<div class="sportItem ub ub-ac ub-pj">
					<div class="ub ub-ac">
						<img class="sporticon" :src="require('@i/sporticon/icon_wristball.png')" alt="">
						<div class="iteminfo">
							<div>腕力球</div>
							<div>1,200个</div>
						</div>
					</div>
					<img class="iconselect" :src="require('@i/icon_select.png')" alt="">
				</div>
				<!-- 训练课程 -->
				<div class="sportItem ub ub-pj">
					<div class="ub">
						<img class="sporticon" :src="require('@i/icon_course.png')" alt="">
						<div class="iteminfo">
							<div>训练课程</div>
							<div>1,200个</div>
							<div>1,200个</div>
							<div>1,200个</div>
						</div>
					</div>
				</div>
				<!-- 查看我的运动目标 -->
				<div class="ub ub-ac ub-ad target">
					<div>查看我的运动目标<van-icon size="10" name="arrow" /></div>
				</div>
			</div>
		</div>
		<!-- 更新打卡 -->
		<div class="updateclock" v-if="flag==3||flag==4">
			<div class="btn">
				更新打卡
			</div>
		</div>
		<!-- 时间选择 -->
		<van-popup position="bottom" round :style="{height: '45%'}" v-model="YMshow">
			<van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate"
			@confirm="pickConfirm"
				:max-date="maxDate" :formatter="formatter">
			</van-datetime-picker>
		</van-popup>
		<!-- 打卡状态 -->
		<van-popup  round :style="{height: '6.1rem'}" v-model="clockShow">
			<clockState :state="clockState"></clockState>
		</van-popup>
	</div>
</template>

<script>
	import nCalendar from '@c/calendar';
	import clockState from '@c/clockState';
	import {
		listItem
	} from '@a/test'
	import {
		NavBar,
		Icon,
		Popup,
		DatetimePicker
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			nCalendar,clockState,
			[Popup.name]: Popup,
			[DatetimePicker.name]: DatetimePicker,
			// [Swipe.name]: Swipe,
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
				clockShow:false,
				clockState:true,
				flag:3,//1未打卡2打卡失败3打卡成功未达标4打卡成功已达标
			};
		},
		filters: {},
		mounted() {
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
			onClickLeft() {
				this.$interaction.closePage();
				// this.$router.go(-1)
			},
			onClickRight() { //跳转打卡总览
				this.$router.push({
					path: '/clockoverview',
				});
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
			pickConfirm(value){//时间选择回调
				this.$refs.calendar.getList(value)
				this.$refs.calendar.dateTitleStr(value,'ym')
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
		}
	};
</script>
<style lang="scss">
	.infobox{
		padding: .48rem;
		.sportbox{
			width: 3.08rem;
			div:nth-child(1){
				font-size: .28rem;
				margin-bottom: .32rem;
			}
			div:nth-child(2){
				font-size: .48rem;
				span{
					font-size: .24rem;
				}
			}
		}
		.sportItem{
			background-color: #1e1e2a;
			font-size: .24rem;
			color:#cfcfd2;
			border-radius: .16rem;
			padding: .24rem;
			margin-bottom: .16rem;
		}
		.sportdetail{
			margin-top: .56rem;
			.target{
				color:#595962;
				font-size: .24rem;
				margin-top: .4rem;
			}
			.iteminfo{
				margin-left: .24rem;
				div:nth-child(1){
					margin-bottom: .16rem;
				}
			}
			.sporticon{
				width: .64rem;
				height: .64rem;
			}
			.iconselect{
				width: .32rem;
				height: .32rem;
			}
			.title{
				font-size: .32rem;
				margin-bottom: .4rem;
			}
		}
		.sportfinish{
			margin-bottom: .54rem;
			div{
				font-size: .28rem;
				color:#cfcfd2;
			}
			img{
				width: .4rem;
				height: .4rem;
				margin-right: .2rem;
			}
		}
	}
	.calendaroutbox{
		border-bottom: 3px solid #1e1e2a;
		padding-bottom: .3rem;
	}
	.normaltxt{
		font-size: .28rem;
		span{
			font-size: .56rem;
		}
	}
	.fixedpd{
		padding-bottom: 1.84rem;
	}
	.updateclock{
		height: 1.84rem;
		width: 100%;
		background: linear-gradient(to bottom, rgba(18, 18, 31, 0) 10%, rgba(18, 18, 31, 1) );
		position: fixed;
		bottom: 0;
		.btn{
			height: .88rem;
			width: 6.7rem;
			margin: 0 auto;
			background: linear-gradient(to right, #ffaa88, #ff4e3e );
			font-size: .4rem;
			color: #fff;
			line-height: .88rem;
			text-align: center;
			border-radius: .44rem;
		}
	}
	.clockBtn{
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		line-height: 2rem;
		font-size: .4rem;
		text-align: center;
		background: linear-gradient(to bottom, #ffaa88, #ff4e3e );
		margin: 0 auto;
	}
</style>
