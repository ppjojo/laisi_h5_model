<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar title="测评结果" safe-area-inset-top fixed>
				<!-- <template #right>
					<van-icon name="plus" style="font-size: 0.4rem;" />
				</template> -->
			</van-nav-bar>
		</div>
		<div class="content" style="padding-top:0;">
			<div class="fts16">您的好友用户的昵称用户的昵称2021年03月06日测评结果：</div>
			<div class="title">初级</div>
		</div>
		<div id="pentagon">

		</div>
		<div class="content">
			<div class="fts14">综上结果说明，你的跳绳水平较差/一般/很棒，你的协调性/心肺/技巧/肌肉耐力/BMI指数（选最差的两个因素分析建议）较差，
				建议多做无绳和有绳交叉练习/建议适当增加跳绳时间和频次/建议注重正确动作细节进行练习/
				建议提高下肢肌肉耐力训练/建议适当增加跳绳时间和频次。</div>
			<div class="fts12">声明：所有的数据仅供参考，不建议以此数据作为医疗或者健康状况的判断依据。</div>
		</div>
	</div>
</template>

<script>
	import {
		listItem
	} from '@a/api'
	import {
		NavBar,
		Icon
	} from 'vant';
	import * as echarts from 'echarts';
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			// [Cell.name]: Cell,
			// [CellGroup.name]: CellGroup,
			// [Swipe.name]: Swipe,
			// [SwipeItem.name]: SwipeItem,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {

			};
		},
		filters: {},
		mounted() {
			this.initEchart()
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
			initEchart() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('pentagon'));
				var option = {
					title: {
						text: ''
					},
					tooltip: {},
					radar: {
						// shape: 'circle',
						radius: 95, //大小
						splitLine: {
							show: true,
							lineStyle: {
								width: 1,
								color: 'rgba(151,151,151,1)', // 设置网格的颜色
							},
						},
						splitArea: {
							show: false,
							areaStyle: {
								color: 'rgba(255,0,0,0)', // 图表背景的颜色
							},
						},
						name: {
							 formatter: "{value}",
							// formatter:(d)=>{
							// 	console.log(d)
							// 	return d+'</br>'+80
							// },
							textStyle: {
								color: '#333',
								backgroundColor: '#fff',
								borderRadius: 3,
								padding: [0, 0],
							},
						},
						indicator: [{
								name: '协调性80',
								max: 100
							},
							{
								name: 'BMI指数2.5',
								max: 100
							},
							{
								name: '耐力50',
								max: 100
							},
							{
								name: '技巧66',
								max: 100
							},
							{
								name: '心肺44',
								max: 100
							},
						]
					},
					series: [{
						type: 'radar',
						symbolSize: 2, // 拐点的大小
						areaStyle: {
							normal: {
								width: 1,
								color: 'rgba(230,0,18,.6)',
								opacity: 0.2,
							},
						},
						data: [{
							value: [55, 44, 77, 88, 12],
						}, ],
						itemStyle: {
							normal: {
								color: 'rgba(230,0,18,.3)',
								lineStyle: {
									color: 'rgba(230,0,18,.3)',
								},
							},
						},
					}]
				};
				// 绘制图表
				myChart.setOption(option);
			}
		}
	};
</script>
<style lang="scss" scoped="scoped">
	@import '@/styles/weekPlan.scss';

	.content {
		padding: .3rem;

		.fts16 {
			font-size: .32rem;
		}

		.fts14 {
			font-size: .28rem;
			margin-bottom: .2rem;
		}

		.fts12 {
			font-size: .24rem;
			color: #999;
		}

		.title {
			font-size: .52rem;
			font-weight: bold;
		}
	}

	#pentagon {
		width: 100%;
		height: 5rem;
		border-bottom: .2rem solid #f5f5f5;
	}
</style>
