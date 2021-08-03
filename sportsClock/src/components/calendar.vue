<template>
	<div id="calendarBox" v-cloak>
		<!-- 顶部日期 -->
		<div class="ub ub-ac ub-pj dateTitle">
			<van-icon name="arrow-left" size="10" />
			<div @click="openFatherPickYearMonth()">{{dateTitle}}</div>
			<van-icon name="arrow" size="10" />
		</div>
		<div class="dateList ub-ad">
			<!-- 1-7 -->
			<div class="wh_content_item greystate" v-for="tag in textTop">
				<div class="wh_top_tag">{{tag}}</div>
			</div>
			<div class="wh_content_item" v-for="(item,index) in list">
				<div class="wh_item_date" :class="{greystate:item.otherMonth!='nowMonth',isToday:item.isToday}">
					{{item.id}}
					<!--这里是控制异常、正常的那个小圆点-->
					<div class="spot"></div>	
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
			openFatherPickYearMonth() {//打开父组件选择年月调用
				this.$parent.fatherPickYearMonth();
			},
			getList(date) {
				console.log(date)
				let arr = timeUtil.getMonthList(date?date:new Date());
				this.list = arr;
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
			}
		},
		watch: {}
	};
</script>
<style lang="scss">
	#calendarBox {
		.dateTitle {
			padding: .4rem .48rem 0 .48rem;
			color: #595962;
			font-size: .48rem;
		}

		.dateList {
			display: flex;
			flex-wrap: wrap;
			padding: 0 3% 0 3%;
			width: 100%;
			.wh_top_tag{
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
			}

			.wh_content_item {
				display: flex;
				align-items: center;
				justify-content: center;
				.wh_item_date {
					position: relative;
					text-align:center;
					.spot{
						position:absolute;
						width:.08rem;
						height:.08rem;
						border-radius:100%;
						background-color:#71717F;
						left:calc( 50% - .04rem );
						bottom:-.2rem;
					}
					.successdot{
						background-color:#3AD266;
					}
				}
				.isToday {
					background-color: #FF4E3E;
					display: flex;
					flex-wrap: wrap;
					border-radius: 100%;
					width: .48rem;
					height: .48rem;
					align-items: center;
					justify-content: center;
				}
				
			}

			.greystate {
				color: #71717F;
			}
		}
	}
</style>
