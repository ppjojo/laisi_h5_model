<template>
	<div id="calendarBox" v-cloak>
		<!-- 顶部日期 -->
		<div class="ub ub-ac ub-pj dateTitle">
			<van-icon name="arrow-left" size="15" />
			<div @click="openFatherPickYear()">{{dateTitle}}</div>
			<van-icon name="arrow" size="15" />
		</div>
		<div class="dateList">
			<div class="monthbox ub ub-ac" v-for="mitem in monthList">
				<div class="title">{{mitem.id}}月</div>
				<div class=" ub ub-ac">
					<template v-for="(item,index) in mitem.daylength">
						<div class="daybox">
							<dayBox :light="mitem.days.includes(index+1)"></dayBox>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import timeUtil from "@u/calendar";
	import dayBox from '@c/daybox';
	import {
		Icon,
	} from 'vant';
	export default {
		props: {
			showOnly: { //是否只是做显示，点击无效（为true情况是月度统计等）
				type: Boolean,
				default: () => false
			},
			monthbar:{
				type:Object,
				default: () => {}
			}
		},
		components: {
			[Icon.name]: Icon,
			dayBox
		},

		data() {
			return {
				dateTitle: '',
				list: [],
				monthList: []
			};
		},
		filters: {},
		mounted() {
			// this.getMonthList();
		},
		created() {
			this.dateTitleStr(new Date(), 'y');
		},
		methods: {
			openFatherPickYear() { //打开父组件选择年月调用
				this.$parent.fatherPickYearMonth();
			},
			dateTitleStr(date, id) {
				this.dateTitle = timeUtil.getTimeStr(date, id);
			},
			dateTitleStr2(str) {
				this.dateTitle = str;
				this.getMonthList();
			},
			getMonthList() {
				let arr = [];
				for (let i = 1; i < 13; i++) {
					let obj = {
						id: i,
						daylength: this.returnDaylength(i),
						days:[]
					}
					arr.push(obj);
				}
				for(let key in this.monthbar){
					let Mon = this.monthbar[key];
					Mon.forEach(d=>{
						arr[key-1].days.push(new Date(d.checkTime).getDate());
					})
				}
				// console.log(arr)
				this.monthList = arr;
			},
			returnDaylength(num) {//返回个月份的天数
				if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) {
					return 31
				} else if (num == 2) {
					let year = parseInt(this.dateTitle);
					return ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) ? 29 : 28
				} else {
					return 30;
				}
			}
		},
		watch: {
			monthbar(){
				this.getMonthList()
			}
		}
	};
</script>
<style lang="scss">
	#calendarBox {
		.dateTitle {
			padding: .4rem .48rem 0.4rem .48rem;
			color: #cfcfd2;
			font-size: .48rem;
			.van-icon{
				color:#71717f;
			}
		}

		.dateList {
			display: flex;
			flex-wrap: wrap;
			padding: 0 3% 0 3%;
			width: 100%;

			.monthbox {
				margin-bottom: .24rem;
				.title {
					color: #71717F;
					font-size: .24rem;
					margin-right: .1rem;
					width: .6rem;
				}

				.daybox {
					margin-right: .04rem;
				}

				.daybox:last-child {
					margin-right: 0;
				}
			}
			.monthbox:last-child{
				margin-bottom:0rem;
			}
		}
	}
</style>
