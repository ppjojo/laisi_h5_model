<template>
	<div>
		<div class="header_phone">
			<div class="nav-header">
				<div class="logo" @click="menuChange('index')">铼锶 <span>LAISI</span></div>
				<div class="iconfont icon-weibiaoti15" @click="drawer=!drawer">
				</div>
			</div>
			<el-collapse-transition>
				<div class="nav-body" v-show="drawer">
					<ul>
						<li @click="menuChange('outdoorSport')">户外运动系列</li>
						<li>智能穿戴系列</li>
						<li>派健康</li>
						<li>行业解决方案</li>
						<li>商务合作</li>
						<li style="border: none;">关于铼锶</li>
					</ul>
				</div>
			</el-collapse-transition>
		</div>

		<div class="header_pc">
			<div class="navBox ub ub-ac ">
				<div class="title" @click="menuChange('index')">铼锶 <span>LAISI</span></div>
				<ul class="menulist ">
					<li>
						<a @click="menuChange('outdoorSport')">户外运动系列</a>
						<!-- 户外运动系列 -->
						<div class="menuTreeDiv">
							<div>
								<div class="firstTree">
									<div class="firstTree_title " :class="activeNum==1?'active':''"  @click="activeNum=1">智能跳绳</div>
									<div class="firstTree_title"  :class="activeNum==2?'active':''" @click="activeNum=2">智能腕力球</div>
									<div class="firstTree_title" :class="activeNum==3?'active':''" @click="activeNum=3">智能健腹轮</div>
								</div>
								<div class="secondTree">
									<div class="secondTreeBox" v-for="item in 5" v-if="activeNum==1">
										<img class="secondTree_img" src="../assets/img/ad.png" alt="">
										<div class="secondTree_title">T30l升级</div>
										<div class="secondTree_price">¥ 169</div>
									</div>
								</div>
								<div class="secondTree">
									<div class="secondTreeBox" v-if="activeNum==2">
										<img class="secondTree_img" src="../assets/img/ad.png" alt="">
										<div class="secondTree_title">T30l升级</div>
										<div class="secondTree_price">¥ 169</div>
									</div>
								</div>
								<div class="secondTree">
									<div class="secondTreeBox" v-if="activeNum==3">
										<img class="secondTree_img" src="../assets/img/ad.png" alt="">
										<div class="secondTree_title">T30l升级</div>
										<div class="secondTree_price">¥ 169</div>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>
						<a >智能穿戴系列</a>
						<div class="menuTreeDiv">
							<div>
								<div class="firstTree">
									<div class="firstTree_title " :class="activeNum2==4?'active':''"  @click="activeNum2=4">智能手表</div>
									<div class="firstTree_title"  :class="activeNum2==5?'active':''" @click="activeNum2=5">无线耳机</div>
								</div>
								<div class="secondTree" v-if="activeNum2==4">
									<div class="secondTreeBox" v-for="item in 2" >
										<img class="secondTree_img" src="../assets/img/ad.png" alt="">
										<div class="secondTree_title">T30l升级</div>
										<div class="secondTree_price">¥ 169</div>
									</div>
								</div>
								<div class="secondTree" v-if="activeNum2==5">
									<div class="secondTreeBox" >
										<img class="secondTree_img" src="../assets/img/ad.png" alt="">
										<div class="secondTree_title">T30l升级</div>
										<div class="secondTree_price">¥ 169</div>
									</div>
								</div>
							</div>
						</div>
					</li>
					<li>派健康</li>
					<li>行业解决方案</li>
					<li>商务合作</li>
					<li>关于铼锶</li>
				</ul>
				<div class="lang ub ub-ac" @click="changeLanguage">
					<img src="../assets/img/china.png" alt="">
					<span>{{$t('language.name')}}</span>
				</div>
			</div>


		</div>
	</div>
	</div>
</template>

<script>
	export default {
		name: 'TopMenu',
		props: {},
		data() {
			return {
				drawer: false,
				menuShow: false,
				activeNum:1,
				activeNum2:4
			}
		},
		mounted() {},
		created() {
			window.addEventListener('scroll', this.scrollFn);
		},
		methods: {
			changeLanguage() {
				this.isDrawDown = !this.isDrawDown
				this.$i18n.locale == 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh' //设置中英文模式
				localStorage.setItem('languageSet', this.$i18n.locale) //将用户设置存储到localStorage以便用户下次打开时使用此设置
			},
			scrollFn() {
				var t = document.documentElement.scrollTop || document.body.scrollTop;
				var rate = t / 200
				if (rate > 1) rate = 1
				var colorValue = `rgba(255,255,255,${rate})`
				var val = parseInt(255 - rate * 255)
				var colorValue2 = `rgba(${val},${val},${val})`
				document.getElementsByClassName("header_pc")[0].style.background = colorValue
				document.getElementsByClassName("header_pc")[0].style.color = colorValue2


			},
			destroyed() {
				window.removeEventListener('scroll', this.scrollFn); // 销毁监听
			},
			menuChange(str){
				this.$router.push({
					path:str
				})
				this.drawer=false
			}

		}
	}
</script>


<style lang="scss" scoped>
	@media (min-width: 992px) {
		.header_phone {
			display: none !important;
		}

		.header_pc {
			display: block !important;
		}
	}

	@media (max-width: 992px) {
		.header_phone {
			display: block !important;
		}

		.header_pc {
			display: none !important;
		}
	}

	.header_phone {
		.nav-header {
			position: relative;
			z-index: 10;
			height: 1.32rem;
			box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 15px;

			.logo {
				font-size: 0.4rem;

				span {
					font-size: 0.32rem;
				}
			}

		}

		.nav-body {
			box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
			background-color: #fff;

			ul {
				padding: 0 15px 15px 15px;

				li {
					font-size: 0.32rem;
					line-height: 45px;
					text-align: left;
					border-bottom: 1px solid #d4d4d4;
				}

			}
		}
	}

	//pc导航栏
	.header_pc {
		&:hover{
			transition: all 0.5s;
			background-color: rgba($color: #fff, $alpha: 1.0)!important;
			color: #000!important;
		}
		color: #FFF;
		.navBox {
			max-width: 14rem;
			justify-content: space-between;
			margin: 0 auto;

			.title {
				padding: 0.5rem 0;
				font-size: .3rem;
				font-weight: bold;

				span {
					font-size: 0.25rem;
				}
			}

			.menulist {
				display: flex;
				justify-content: space-between;
				align-items: center;

				li {
					padding: 0.5rem 0;
					padding-right: .6rem;
					cursor: pointer;
					font-size: 0.22rem;
					line-height: 0.45rem;

					&:hover {
						font-size: 0.24rem;
						color: red;
						.menuTreeDiv {
							display: block;
						}
					}

					.menuTreeDiv {
						display: none;
						position: fixed;
						top: 1.4rem;
						left: 0;
						z-index: 10;
						width: 100%;
						border-top: 1px solid #F1F1F1;
						border-bottom: 1px solid #F1F1F1;
						background-color: #FFF;

						.firstTree {
							margin-top: 0.5rem;
							display: flex;
							align-items: center;
							justify-content: center;

							.firstTree_title {
								font-size: 0.22rem;
								color: #666;
								padding: 0.2rem 0.8rem;
							}

							.active {
								position: relative;
								color: #333;
								font-size: 0.28rem;

								&::after {
									content: "";
									position: absolute;
									border-bottom: 3px solid #e60012;
									width: 0.17rem;
									bottom: 0;
									left: calc(50% - 0.085rem);

								}
							}

						}

						.secondTree {
							max-width: 14rem;
							width: 100%;
							margin: 0 auto;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-wrap: wrap;

							.secondTreeBox {
								margin: 0.5rem 0.2rem 0.5rem 0.2rem;

								.secondTree_img {
									width: 2.4rem;
									height: 2.4rem;
								}

								.secondTree_title {
									font-size: 0.22rem;
									color: #333;
									line-height: 0.5rem;
									font-weight: bold;
								}

								.secondTree_price {
									color: #E60012;
									font-size: 0.18rem;
									line-height: 0.4rem;
								}
							}


						}
					}
				}

				li:last-child {
					margin-right: 0;
				}
			}

			.lang {
				font-size: 0.22rem;

				img {
					height: 0.24rem;
					width: 0.24rem;
					border-radius: 100%;
					margin-right: 0.1rem;
				}
			}
		}


	}
</style>