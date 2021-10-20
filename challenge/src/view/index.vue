<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar title="今日挑战" @click-left="onClickLeft" left-arrow safe-area-inset-top fixed>
				<template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
				</template>
			</van-nav-bar>
		</div>
		<!-- 今日挑战目标 -->
		<div class="centerbox fts14">
			今日挑战目标
		</div>
		<div class="centerbox befont fts20">
			{{returnTask(info.challengeType||info.challengeDetail)}}
		</div>
		<div class="centerbox fts12 c1f ub ub-ad">
			<div class="ub ub-ac" v-if="info.dateType==1" @click="goChallage">
				<div class="reflesh"></div><span style="text-decoration: underline;">不休息</span>
			</div>
			<div class="ub ub-ac" v-else-if="ischeck" @click="changeChallenge()">
				<div class="reflesh"></div><span style="text-decoration: underline;">换一个</span>
			</div>
		</div>
		<!-- 打卡按钮 -->
		<div class="clickBtn ub ub-ac ub-ad" @click="isChallage(info.type)" :class="{greyBtn:info.dateType==1||info.type==1}">
			<div>
				{{info.dateType==1?'今日休息':info.type==3?'迎战':info.type==1?'完成':info.type==2?'再次挑战':info.type==0?'迎战':'暂未触发'}}
			</div>
		</div>
		<!-- 战列表 -->
		<ul class="zhanlist">
			<li class="ub" v-if="info.textOne">
				<img :src="require('@i/zhan.png')" alt="">
				<div class="">{{info.textOne}}</div>
			</li>
			<li class="ub" v-if="info.textTwo">
				<img :src="require('@i/zhan.png')" alt="">
				<div class="">{{info.textTwo}}</div>
			</li>
			<li class="ub" v-if="info.textThree">
				<img :src="require('@i/zhan.png')" alt="">
				<div class="">{{info.textThree}}</div>
			</li>
		</ul>
		<div class="title">历史成绩</div>
		<ul class="historylist">
			<li class="ub ub-ac ub-pj" v-for="item in historyList">
				<div class="ub ub-ac">
					<returnIcon :type="flag"></returnIcon>
					<div class="">
						<div class="fts14">{{returnTask(item.challengeType||{})}}</div>
						<div class="fts12 c1f subtitle" >{{timeStamp2String('ymd',item.dateTime)}}</div>
					</div>
				</div>
				<img v-if="item.type==1" class="state" :src="require('@i/finish.png')" alt="">
				<img v-else class="state" :src="require('@i/unfinsh.png')" alt="">
			</li>
			<div v-if="historyList.length>0" class="finishtxt">全部成绩都在这里了</div>
		</ul>
		<div v-if="historyList.length==0&&isFinish" class="nullDataBox">
			<img :src="require('@i/noData.png')" alt="">
			<p>还没有挑战的记录哟！快去挑战吧！</p>
		</div>
	</div>
</template>

<script>
	import returnIcon from '@c/returnIcon';
	import {
		sjc2time,
		timeStamp2String
	} from '@u/Date.js'
	import {
		getQueryString
	} from "@u/tool";
	import {
		HomeInfo,
		typeCheck,
		challengeHistory,
		changeRopeChallage,
		acceptChallage
	} from '@a/api'
	import {
		NavBar,
		Icon,
		Popup,
		DatetimePicker,
		Dialog
	} from 'vant';
	export default {
		components: {
			[Dialog.name]: Dialog,
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Popup.name]: Popup,
			[DatetimePicker.name]: DatetimePicker,
			returnIcon
		},

		data() {
			return {
				flag: 3, //1腕力球，2跳绳，3健腹轮
				state: null, //1未挑战迎战，2挑战成功完成，3挑战失败-再次迎战,
				ischeck:false,
				page: {
					page: 0,
					pageSize: 200
				},
				info: {
					challengeType: {

					}
				},
				historyList: [],
				isFinish: false
			};
		},
		filters: {},
		mounted() {
			this.getList();
			this.getHistory();
			window.initData = this.RefreshFunction;
		},
		created() {
			let type = getQueryString('type') || "wristball";
			type == 'skipping' ? this.flag = 2 : type == 'wristball' ? this.flag = 1 : type == 'wheel' ? this.flag = 3 :
				null;
		},
		methods: {
			timeStamp2String: timeStamp2String,
			RefreshFunction(){
				this.getList();
				this.getHistory();
			},
			getList() { //加载首页
				typeCheck({}, this.flag).then(res => {
					if ((res.hasOwnProperty('data') && res.data && res.code == 0) || (!res.hasOwnProperty(
							'data') && res.code == 0)) {
								this.ischeck = true;
						HomeInfo({}, this.flag).then(res2 => {

							this.info = Object.assign({}, res2.data);
						}).catch(() => {
							console.log("error")
						})
					} else {
						this.checkBox()
					}
				})
			},
			changeChallenge() { //换个目标
				changeRopeChallage({}, this.flag).then(res => {
					this.info.challengeType = res.data;
				})
			},
			isChallage(type) { //判断是否应占
				if (type == 2  || type == 0|| type == 3) {
					this.goChallage()
				}
			},
			goChallage() {
				//app迎战
				this.info.challengeType.category = 6;
				if (!this.info.challengeType.bpm) this.info.challengeType.bpm = 0;
				this.info.challengeType.deviceType = getQueryString('type') || 'wristball';
				this.info.challengeType.title = this.returnTask(this.info.challengeType).split(",")[0];
				acceptChallage(this.info.challengeType || this.info.challengeDetail, this.flag).then(res => {
					this.$interaction.appNative('LSTH5APP_SelectedDeviceForChallenge', this.info.challengeType);
				})
			},
			getHistory() {
				challengeHistory(this.page, this.flag).then(res => {
					if (this.flag == 2) this.historyList =  res.data.content
					else this.historyList =  res.data;
					this.isFinish = true;
				}).catch(() => {
					this.isFinish = true;
				});
			},
			returnTask(obj) {
				if (!obj.conditionMode) return '';
				let str = '';
				if (this.flag == 2) { //跳绳
					if (obj.conditionMode == 1 || obj.conditionMode == 5 || obj.conditionMode == 6) {
						str += ('单次运动' + obj.count + '次');
						if (obj.conditionMode == 5 || obj.conditionMode == 6) str += (',且BPM≥' + obj.bpm)
					} else {
						str += ('运动满' + obj.duration + '秒');
						if (obj.conditionMode == 3 || obj.conditionMode == 4) str += (',且BPM≥' + obj.bpm)
					}
				} else {
					if(this.flag==3){
						//健腹轮
						if (obj.conditionMode == 1 || obj.conditionMode == 3) {
							str += ('单次运动' + obj.count + '次');
							if (obj.conditionMode == 3) str += (',且达标率≥' + obj.standardRate + '%')
						} else {
							str += ('运动满' + obj.duration + '秒');
							if (obj.conditionMode == 4) str += (',且达标率≥' + obj.standardRate + '%')
						}
					}else{
						let min = 0;
						if(obj.duration<60)min=1
						else min = parseInt(obj.duration/60);
						str += ('运动满' + min + '分钟');
					}
				}
				return str;
			},
			checkBox() {
				let str = "您的腕力球总数还未达到10000圈，无法开启今日挑战";
				if (this.flag == 3) str = '您的健腹轮总数还未达到50个，无法开启今日挑战'
				if (this.flag == 2) str = '您的跳绳总数还未达到1000个，无法开启今日挑战'
				Dialog.confirm({
					title: '',
					width: '5.4rem',
					confirmButtonText: '去运动',
					cancelButtonText: '取消',
					confirmButtonColor: '#CFCFD2',
					cancelButtonColor: '#CFCFD2',
					message: str,
				}).then(() => {
					// on close
					//this.info.type = 3;
					this.$interaction.appNative('LSTH5APP_SelectDeviceAndPushToSport', {
						isPK: 0,
						deviceType: getQueryString('type')
					});
				}).catch(() => {
					// on cancel
					this.$interaction.closePage();
				});
			},
			onClickLeft() {
				this.$interaction.closePage();
				// this.$router.go(-1)
			},
			goGroupIndex(item) {
				this.$router.push({
					path: '/groupIndex',
					query: {
						id: item
					}
				});

			},
		}
	};
</script>
<style lang="scss">
	.van-dialog__message{
		padding: .62rem .48rem;
		line-height: 0.5rem;
	}
	.fts14 {
		font-size: .28rem;
	}
	.befont{
		font-family: "BebasNeue";
	}
	.fts20 {
		font-size: .4rem;
	}

	.fts12 {
		font-size: .24rem;
	}

	.centerbox {
		color: #cfcfd2;
		margin: .24rem auto;
		text-align: center;
	}

	.c1f {
		color: #71717f;
	}

	.title {
		color: #cfcfd2;
		font-size: .32rem;
		padding: .4rem;
	}

	.nullDataBox {
		img {
			width: 3.8rem;
			margin: .2rem auto;
			display: block;
		}

		p {
			color: #71717f;
			font-size: .28rem;
			text-align: center;
		}
	}

	.clickBtn {
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
		font-size: .44rem;
		color: #fff;
		background: linear-gradient(to bottom, #ffaa88, #ff4e3e);
		text-align: center;
		margin: .48rem auto;
		
		div {
			width: 1rem;
			font-weight: bold;
		}
	}

	.greyBtn {
		background: rgba(113, 113, 127, 1);
		color: #cfcfd2;
	}

	.van-dialog__message {
		color: #CFCFD2;
	}

	.zhanlist {
		padding: 0 .4rem;
		border-bottom: .08rem solid #1E1E2A;

		li {
			margin-bottom: .32rem;

			img {
				width: .8rem;
				height: .8rem;
				margin-right: .24rem;
			}

			div {
				max-width: 4.94rem;
				color: #CFCFD2;
				background-color: #1E1E2A;
				font-size: .28rem;
				padding: .24rem;
				border-radius: .16rem;
			}
		}
	}

	.historylist {
		padding: 0 .4rem;
		.finishtxt{
			margin-top: .45rem;
			text-align: center;
			color: #71717f;
			font-size: .24rem;
		}
		li {
			background-color: #1E1E2A;
			padding: .3rem .24rem;
			border-radius: .16rem;
			margin-bottom: .16rem;
			color: #CFCFD2;
		}
		.subtitle{
			margin-top: .1rem;
		}
		.state {
			width: .4rem;
			height: .4rem;
		}
	}

	.reflesh {
		background-image: url("../assets/img/reflesh.png");
		width: .26rem;
		height: .26rem;
		background-size: cover;
		margin-right: .08rem;
	}
	.van-dialog,.van-button--default{
		background-color: #292934;
	}
	[class*='van-hairline']::after{
		border-color: #1E1E2A;
	}
	@supports ((height: constant(safe-area-inset-top)) or (height: env(safe-area-inset-top))) and (-webkit-overflow-scrolling: touch) {
	  .finishtxt {
	    padding-bottom: .5rem;
	  }
	}
</style>
