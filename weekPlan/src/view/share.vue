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
			<div class="fts16">您的好友{{ chartData.nickName }} {{timeStamp2String('ymd2',chartData.createTime)}}测评结果：</div>
			<div class="title">初级</div>
		</div>
		<div id="pentagon">

		</div>
		<div class="content">
			<div class="fts14">{{chartData.resultDes}}</div>
			<div class="fts12">声明：所有的数据仅供参考，不建议以此数据作为医疗或者健康状况的判断依据。</div>
		</div>
	</div>
</template>

<script>
	import {
		seeTestResult
	} from '@a/api'
	import {
		NavBar,
		Icon
	} from 'vant';
	import * as echarts from 'echarts';
	import {timeStamp2String} from '../utils/Date.js';
	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
		},

		data() {
			return {
				chartData: {
					bmi: 0,
					createTime: null,
					harmony: 0, //协调
					heart: 0, //心肺
					memberId: null,
					resultDes: '',
					skill: 0, //技巧
					stamina: 0, //耐力
					testEndTime: null,
					testType: null,
					testTypeLevel: null,
					type: null,
					updateTime: null
				},
				type:parseInt(this.$route.query.type)||0
			};
		},
		filters: {},
		mounted() {
			this.getList();
		},
		created() {
			
		},
		methods: {
			timeStamp2String: timeStamp2String,
			getList() {
				seeTestResult({
					memberId: JSON.parse(localStorage.getItem("appInfo")).memberId,
					type: this.type
				}).then((res) => {
					if (res.code == 0) {
						if (res.data) this.chartData = Object.assign({}, res.data)
						let option = {
							name: [{
									name: '协调性',
									max: 100
								},
								{
									name: 'BMI指数',
									max: 100
								},
								{
									name: '耐力',
									max: 100
								},
								{
									name: '技巧',
									max: 100
								},
								{
									name: '心肺',
									max: 100
								},
							],
							data:[],
							apiName:[this.chartData.harmony,this.chartData.bmi,this.chartData.stamina,this.chartData.skill,this.chartData.heart]
						}
						option.name.forEach((d,i)=>{
							option.name[i].name+=option.apiName[i];
							option.data.push(option.apiName[i]);
						})
						this.initEchart(option);
					}
				}).catch(() => {
					console.log("error")
				})
			},
			initEchart(data) {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('pentagon'));
				var option = {
					title: {
						text: ''
					},
					tooltip: {},
					grid:{
						top:'10%'
					},
					radar: {
						grid:{
							top:'10%'
						},
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
						indicator: data.name
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
							value: data.data,
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
		height: 5.3rem;
		border-bottom: .2rem solid #f5f5f5;
	}
</style>
