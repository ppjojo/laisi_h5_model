<template>
	<div id="app" v-cloak>
		<div class="header" v-if="!getQueryString('isShare')">
			<van-nav-bar title="测评结果" safe-area-inset-top fixed>
				<!-- <template #right>
					<van-icon name="plus" style="font-size: 0.4rem;" />
				</template> -->
			</van-nav-bar>
		</div>
		<div class="content" style="padding-top:0;">
			<div class="fts14" style="padding: .1rem 0;">您的好友{{chartData.nickName}}在派健康完成跳绳训练7日计划后测评结果。——{{timeStamp2String('ymd2',chartData.createTime)}}</div>
			<div class="title">7日计划训练效果看的见</div>
			<div class="fts14" style="text-align: center;padding: .1rem 0;">各项指标全面提升，训练更高效</div>
			<ul class="barline" >
				<li v-for="(item,key ,index) in nwArr">
					<div class="fts14">{{item[0]}}  <span v-if="item[1]<item[2]" class="redlarge">(+{{item[2]-item[1]}})</span><span v-else-if="item[1]==item[2]">(+0)</span> <span v-else>(-{{item[1]-item[2]}})</span> </div>
					<div class="underbox">
						<div class="colorbox" :style="{width:returnColorBar(item[2])+'%'}"></div>
						<div class="whitebox" v-if="item[1]>0" :style="{left:returnColorBar(item[1])+'%'}"></div>
						<div class="oldnum fts12" v-if="item[1]!=item[2]" :style="{left:returntxtBar(item,2)+'%'}">{{item[1]}}</div>
						<div class="newnum redsmall" :style="{left:returntxtBar(item,1)+'%'}">
						{{item[2]}}
						<!-- <div style="display: contents;" class="oldnum fts12" v-if="item[1]==item[2]" >  ({{item[1]}})</div> -->
						</div>
					</div>
				</li>
			</ul>
			<div class="fts12">声明：所有的数据仅供参考，不建议以此数据作为医疗或者健康状况的判断依据。</div>
			<div>
			<div class="buttonTry" @click="goInto">我也试试</div>
			 <img id="leadToBrowser" src="https://oss.laisitech.com/01c21e85-22db-4a2b-8f4f-500fca31b25d.png"
            style="display: none; position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 99;" alt="">
		</div>
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
	import {
		timeStamp2String
	} from '../utils/Date.js';
	import { getQueryString } from "@u/tool";
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
				nwArr:{
					harmony:['协调性'],
					heart:['心肺'],
					skill:['技巧'],
					stamina:['耐力'],
					bmi:['BMI指数']
				},
				left:1.9
			};
		},
		filters: {},
		mounted() {},
		created() {
			this.getList()
		},
		methods: {
			timeStamp2String: timeStamp2String,
			getQueryString:getQueryString,
			getList() {
				seeTestResult({
					memberId: getQueryString("memberId"),
					type: 0
				}).then((res) => {
					if (res.data) this.chartData = Object.assign({}, res.data)
					//获取老数据
					for (let key in this.nwArr) {
						this.nwArr[key].push(res.data[key]);
					}
					seeTestResult({
						memberId: getQueryString("memberId"),
						type: 1
					}).then((res2) => {
						//获取新数据
						for (let key in this.nwArr) {
							this.nwArr[key].push(res2.data[key]);
						}
						console.log(this.nwArr)
					}).catch(() => {})
				}).catch(() => {})
			},
			goInto() {
                let linkUrl = ""
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
                    linkUrl = "https://lstemp.laisitech.com?actionType=weekplan"
                } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
                    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) { //微信
                        document.getElementById("leadToBrowser").style.display = "block";
                        setTimeout(function(){
                            document.getElementById("leadToBrowser").style.display = "none";
                        },2000)
                        return
                    } else {
                        linkUrl = "rehealth://weekplan"
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
			returnColorBar(num){
				return num>100?100:num;
			},
			returntxtBar(item,flag){//flag1new  2old
				// if(item[1]==item[2]){
				// 	if(item[1]>=95){
				// 		return 85;
				// 	}
				// 	return flag==1?(item[1]-this.left):item[1];
				// }
				return flag==1?(item[2]-(item[2]>=100?3.2:this.left)):(item[1]-(item[2]>=100?3.2:this.left));
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
		}

		.fts12 {
			font-size: .24rem;
			color: #999;
		}

		.title {
			font-size: .4rem;
			font-weight: bold;
			text-align: center;
			margin-top: .4rem;
		}

		.barline {
			margin-top: .4rem;

			li {
				margin-bottom: .5rem;

				.redlarge {
					color: #E60012;
					font-size: .4rem;
				}

				.redsmall {
					color: #E60012;
					font-size: .28rem;
				}

				.underbox {
					width: 100%;
					height: .16rem;
					border-radius: .08rem;
					background-color: rgba(245, 245, 245, 1);
					position: relative;
					margin: .2rem 0;

					.colorbox {
						background: linear-gradient(to right, #FF6A88, #FF5136);
						height: 100%;
						border-radius: .08rem;
						position: absolute;
						left: 0;
						top: 0;
						width: 0;
						transition:all 1s ease-in-out;
					}

					.whitebox {
						width: 1%;
						height: 100%;
						background-color: #fff;
						position: absolute;
						z-index: 99;
					}

					.newnum,
					.oldnum {
						position: absolute;
						top: .25rem;
					}
					.newnum{
						top: .22rem;
					}
				}
			}
		}
	}
	.buttonTry{
		width: 6.3rem;
		height: 0.88rem;
		color: #fff;
		font-size: 0.36rem;
		line-height: 0.88rem;
		text-align: center;
		background-image: linear-gradient(to right, #FF6A88 ,#FF5136);
		margin: 1rem auto;
		border-radius: 0.44rem;
	}
</style>
