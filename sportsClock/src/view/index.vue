<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar title="运动日历" right-text="打卡总览" @click-left="onClickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
			</van-nav-bar>
		</div>
		<nCalendar ref="calendar"></nCalendar>
		<!-- 时间选择 -->
		<van-popup position="bottom" round :style="{height: '45%'}" v-model="YMshow">
			<van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate"
			@confirm="pickConfirm"
				:max-date="maxDate" :formatter="formatter">
			</van-datetime-picker>
		</van-popup>
		<!-- 打卡状态 -->
		<van-popup  round :style="{height: '45%'}" v-model="clockShow">
			<clockState></clockState>
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
				clockShow:true,
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
			onClickRight() { //跳转创建小组
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
	.van-picker__mask{
		display: none;
	}
</style>
