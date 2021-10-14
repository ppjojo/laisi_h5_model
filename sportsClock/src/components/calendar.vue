<template>
	<div id="calendarBox" v-cloak>
		<!-- 顶部日期 -->
		<div class="ub ub-ac ub-pj dateTitle">
			<van-icon @click="changeMonth(1)" name="arrow-left" size="10" />
			<div @click="openFatherPickYearMonth()">{{dateTitle}}</div>
			<van-icon @click="changeMonth(2)" name="arrow" size="10" />
		</div>
		<div class="dateList ub-ad">
			<!-- 1-7 -->
			<div class="wh_content_item greystate" v-for="tag in textTop">
				<div class="wh_top_tag">{{tag}}</div>
			</div>
			<div class="wh_content_item" v-for="(item,index) in list" @click="dayDetail(index)">
				<div class="wh_item_date"
					:class="{greystate:item.otherMonth!='nowMonth',isToday:(item.isToday||clickIndex==index),isToday2:(item.isToday&&clickIndex!=null)}">
					<span>{{item.id}}</span>
					<!--这里是控制异常、正常的那个小圆点-->
					<div class="spot" v-if="item.timeStamp<=nowZero" :class="{successdot:item.finished}"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import timeUtil from "@u/calendar"
	import {
		NavBar,
		Icon
	} from 'vant';
	import {
		getSportByMonth,
	} from '@a/api'
	export default {
		props: {
			showOnly: { //是否只是做显示，点击无效（为true情况是月度统计等）
				type: Boolean,
				default: () => false
			},
			textTop: {
				type: Array,
				default: () => ["一", "二", "三", "四", "五", "六", "日"]
			},
		},
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
		},

		data() {
			return {
				dateTitle: '',
				list: [],
				nowDate: new Date().getTime(),
				nowZero: new Date(new Date().toLocaleDateString()).getTime(),
				clickIndex: null,
			};
		},
		filters: {},
		mounted() {
			this.getList()
		},
		created() {
			this.dateTitleStr(new Date(), 'ym');
		},
		methods: {
			dayDetail(index) { //过往某一天
				if (this.list[index].isToday || (this.list[index].timeStamp > this.nowDate || this
					.showOnly)) { //如果点的是今天或者今天以后的没反应
					if (this.list[index].isToday && this.clickIndex != null) { //重新点回来
						this.clickIndex = null;
						this.$parent.clickBeforeDay(this.list[index].timeStamp);
					}
					return;
				}
				this.$parent.clickBeforeDay(this.list[index].timeStamp);
				this.clickIndex = index;
			},
			calindarList(arr) {
				if (!arr) arr = this.list;
				let timeObj = {
					startTime: arr[0].timeStamp,
					endTime: arr[arr.length - 1].timeStamp,
					checkTime: null
				}
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].otherMonth == "nowMonth" || arr[i].otherMonth == "othermonth") {
						timeObj.checkTime = arr[i].timeStamp;
						break;
					}
				}
				getSportByMonth(timeObj).then(res => {
					this.$parent.fatherSetMonthObj(res.data, 0);
					res.data.checkTimeList.forEach(d => { //给上小绿点
						arr.forEach(e => {
							if (d.checkTime == e.timeStamp) e.finished = true;
						})
					})
					this.list = arr;
					console.log(arr);
				})
			},
			openFatherPickYearMonth() { //打开父组件选择年月调用
				this.$parent.fatherPickYearMonth();
			},
			getList(date) {
				let arr = timeUtil.getMonthList(date ? date : new Date());
				// console.log(arr)
				this.calindarList(arr);
			},
			goGroupIndex(item) {
				this.$router.push({
					path: '/groupIndex',
					query: {
						id: item
					}
				});
			},
			dateTitleStr(date, id) {
				this.dateTitle = timeUtil.getTimeStr(date, id);
			},
			changeMonth(flag) { //1减一月2加一月
				let year = parseInt(this.dateTitle.split('.')[0]);
				let month = parseInt(this.dateTitle.split('.')[1]);
				if (flag == 1) {
					if (month == 1) {
						year -= 1;
						month = 12;
					} else {
						month -= 1;
					}
				} else {
					if (month == 12) {
						year += 1;
						month = 1;
					} else {
						month += 1;
					}
				}
				this.dateTitleStr(new Date(year+'/'+month+'/1'), 'ym');
				this.getList(new Date(year+'/'+month+'/1'));
			}
		},
		watch: {}
	};
</script>
<style lang="scss">
	#calendarBox {
		.dateTitle {
			padding: .4rem .48rem 0 .48rem;
			color: #cfcfd2;
			font-size: .48rem;
			font-family: "BebasNeue";
		}

		.dateList {
			display: flex;
			flex-wrap: wrap;
			padding: 0 3% 0 3%;
			width: 100%;

			.wh_top_tag {
				font-size: .28rem;
			}

			.wh_content_item,
			.wh_content_item_tag {
				font-size: .4rem;
				width: 13.4%;
				text-align: center;
				color: #fff;
				position: relative;
				height: .8rem;
				font-family: "BebasNeue";
			}

			.wh_content_item {
				display: flex;
				align-items: center;
				justify-content: center;

				.wh_item_date {
					position: relative;
					text-align: center;

					.spot {
						position: absolute;
						width: .08rem;
						height: .08rem;
						border-radius: 100%;
						background-color: #71717F;
						left: calc(50% - .04rem);
						bottom: -.2rem;
					}

					.successdot {
						background-color: #3AD266;
					}
				}

				.isToday {
					background-color: #FF4E3E;
					color: #fff;
					display: flex;
					flex-wrap: wrap;
					border-radius: 100%;
					width: .48rem;
					height: .48rem;
					align-items: center;
					justify-content: center;
					padding-right: .05rem;
				}

				.isToday2 {
					background-color: #70292B;
				}

			}

			.greystate {
				color: #71717F;
			}
		}
	}
</style>
