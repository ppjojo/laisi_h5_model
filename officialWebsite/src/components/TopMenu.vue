<template>
	<div>

		<div class="header_phone">
			<div class="nav-header">
				<div class="logo" @click="menuChange('index',0)">铼锶 <span>LAISI</span></div>
				<div class="iconfont icon-weibiaoti15" @click="drawer=!drawer">
				</div>
			</div>
			<el-collapse-transition>
				<div class="nav-body" v-show="drawer">
					<ul>
						<li @click="menuChange('outdoorSport',1)" :class="navActive==1?'active':''">户外运动系列</li>
						<li @click="menuChange('smartWear',2)" :class="navActive==2?'active':''">智能穿戴系列</li>
						<li @click="menuChange('paiactive',3)" :class="navActive==3?'active':''">派健康</li>
						<li @click="menuChange('solution',4)" :class="navActive==4?'active':''">行业解决方案</li>
						<li @click="menuChange('business',5)" :class="navActive==5?'active':''">商务合作</li>
						<li @click="menuChange('aboutus',6)" style="border: none;" :class="navActive==6?'active':''">
							关于铼锶</li>
					</ul>
				</div>
			</el-collapse-transition>
		</div>

		<div class="header_pc">
			<div class="navBox ub ub-ac ">
				<div class="title" @click="menuChange('index',0)">铼锶 <span>LAISI</span></div>
				<ul class="menulist ">
					<li :class="navActive==1?'active':''" @mouseover="swiperStart=true">
						<a @click="menuChange('outdoorSport',1)">户外运动系列</a>
						<!-- 户外运动系列 -->
						<div class="menuTreeDiv" >
							<div>
								<div class="firstTree">
									<div class="firstTree_title " :class="activeNum==1?'active':''"
										@click="activeNum=1">智能跳绳</div>
									<div class="firstTree_title" :class="activeNum==2?'active':''" @click="activeNum=2">
										智能腕力球</div>
									<div class="firstTree_title" :class="activeNum==3?'active':''" @click="activeNum=3">
										智能健腹轮</div>
								</div>
								<div class="secondTree" >
									<div class=" iconfont icon-shangyiye" v-if="activeNum==1" @click="slidePrev"></div>
									<swiper :options="swiperOptions_nav" v-if="swiperStart&&outdoorlist.length>0" ref="pcSwiper">
										<swiper-slide v-for="item in outdoorlist" style="width:auto;"
											v-if="activeNum==1&&item.productDeviceType=='3'">
											<div class="secondTreeBox" @click="gotoProductDetail(item)">
												<img class="secondTree_img" :src="item.productPagePic" alt="">
												<div class="secondTree_title">{{item.productName}}</div>
												<div class="secondTree_price">¥ {{item.productPrice}}</div>
											</div>
										</swiper-slide>
									</swiper>
									<div class=" iconfont icon-xiayiye" v-if="activeNum==1" @click="slideNext"></div>
								</div>
								<div class="secondTree">
									<template v-for="item in outdoorlist">
										<div class="secondTreeBox" v-if="activeNum==2&&item.productDeviceType=='5'"
											@click="gotoProductDetail(item)">
											<img class="secondTree_img" :src="item.productPagePic" alt="">
											<div class="secondTree_title">{{item.productName}}</div>
											<div class="secondTree_price">¥ {{item.productPrice}}</div>
										</div>
									</template>
								</div>
								<div class="secondTree">
									<template v-for="item in outdoorlist">
										<div class="secondTreeBox" v-if="activeNum==3&&item.productDeviceType=='4'"
											@click="gotoProductDetail(item)">
											<img class="secondTree_img" :src="item.productPagePic" alt="">
											<div class="secondTree_title">{{item.productName}}</div>
											<div class="secondTree_price">¥ {{item.productPrice}}</div>
										</div>
									</template>
								</div>
							</div>
						</div>
					</li>
					<li :class="navActive==2?'active':''">
						<a @click="menuChange('smartWear',2)">智能穿戴系列</a>
						<div class="menuTreeDiv">
							<div>
								<div class="firstTree">
									<div class="firstTree_title " :class="activeNum2==4?'active':''"
										@click="activeNum2=4">智能手表</div>
									<div class="firstTree_title" :class="activeNum2==5?'active':''"
										@click="activeNum2=5">无线耳机</div>
								</div>
								<div class="secondTree">
									<template v-for="item in smartwearlist">
										<div class="secondTreeBox" v-if="activeNum2==4&&item.productDeviceType=='1'"
											@click="gotoProductDetail(item)">
											<img class="secondTree_img" :src="item.productPagePic" alt="">
											<div class="secondTree_title">{{item.productName}}</div>
											<div class="secondTree_price">¥ {{item.productPrice}}</div>
										</div>
									</template>
								</div>
								<div class="secondTree">
									<template v-for="item in smartwearlist">
										<div class="secondTreeBox" v-if="activeNum2==5&&item.productDeviceType=='2'"
											@click="gotoProductDetail(item)">
											<img class="secondTree_img" :src="item.productPagePic" alt="">
											<div class="secondTree_title">{{item.productName}}</div>
											<div class="secondTree_price">¥ {{item.productPrice}}</div>
										</div>
									</template>
								</div>
							</div>
						</div>
					</li>
					<li :class="navActive==3?'active':''">
						<a @click="menuChange('paiactive',3)">派健康</a>

					</li>
					<li :class="navActive==4?'active':''">
						<a @click="menuChange('solution',4)">行业解决方案</a>
						<div class="menuTreeDiv">
							<div>
								<div class="firstTree">
									<div class="firstTree_title " :class="activeNum3==1?'active':''"
										@click="gotoSolution(1)">百索系统</div>
									<div class="firstTree_title" :class="activeNum3==2?'active':''"
										@click="gotoSolution(2)">产品定制</div>
								</div>
							</div>
						</div>
					</li>
					<li :class="navActive==5?'active':''">
						<a @click="menuChange('business',5)">商务合作</a>
					</li>
					<li :class="navActive==6?'active':''">
						<a @click="menuChange('aboutus',6)">关于铼锶</a>
						<div class="menuTreeDiv">
							<div>
								<div class="firstTree">
									<div class="firstTree_title " :class="activeNum4==1?'active':''"
										@click="gotoAboutus(1)">企业简介</div>
									<div class="firstTree_title" :class="activeNum4==2?'active':''"
										@click="gotoAboutus(2)">品牌介绍</div>
									<div class="firstTree_title " :class="activeNum4==3?'active':''"
										@click="gotoAboutus(3)">企业文化</div>
									<div class="firstTree_title" :class="activeNum4==4?'active':''"
										@click="gotoAboutus(4)">大事记</div>
									<div class="firstTree_title" :class="activeNum4==5?'active':''"
										@click="gotoAboutus(5)">联系我们</div>
								</div>
							</div>
						</div>
					</li>
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
	import Utils from "@u/callUtil"
	import {
		getAllProduct
	} from "@a/product";
	export default {
		name: 'TopMenu',
		props: {},
		data() {
			return {
				drawer: false,
				menuShow: false,
				navActive: 0,
				activeNum: 1,
				activeNum2: 4,
				activeNum3: 1,
				activeNum4: 1,
				outdoorlist: [],
				smartwearlist: [],
				swiperStart:false,
				swiperOptions_nav: {
					slidesPerView: 5,
					spaceBetween: 0,
					centeredSlides: true,
					loop: true,
					observer: true,
					observeParents: true,
					// autoplay: {
					// 	delay: 1000,
					// 	stopOnLastSlide: false,
					// 	disableOnInteraction: true,
					// },
					// 设置点击箭头
					// navigation: {
					// 	nextEl: ".swiper-button-next",
					// 	prevEl: ".swiper-button-prev"
					// }
				},
			}
		},
		mounted() {},
		created() {
			window.addEventListener('scroll', this.scrollFn);
			this.getGoods();
		},
		methods: {
			 slidePrev() {
			    this.$refs.pcSwiper.swiperInstance.slidePrev()
			},
			slideNext() {
			    this.$refs.pcSwiper.swiperInstance.slideNext()
			},
			getGoods() {
				getAllProduct({ //户外运动
					productBelong: '2'
				}).then(res => {
					this.outdoorlist = res.data;
				})
				getAllProduct({ //智能穿戴
					productBelong: '1'
				}).then(res => {
					this.smartwearlist = res.data;
				})
			},
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
			menuChange(str, navNum) {
				this.navActive = navNum
				this.$router.push({
					path: str
				})
				this.drawer = false
			},
			gotoAboutus(flag) {
				this.navActive = 6
				this.activeNum4 = flag
				let id = "aboutus_link"
				switch (flag) {
					case 1:
						id = "aboutus_link"
						break;
					case 2:
						id = "brand_link"
						break;
					case 3:
						id = "culture_link"
						break;
					case 4:
						id = "thing_link"
						break;
					case 5:
						id = "contact_link"
						break;

					default:
						id = "aboutus_link"
				}
				this.$router.push({
					path: "aboutus",
				})
				this.drawer = false
				setTimeout(() => {
					Utils.$emit("goAnchor", id)
				}, 300)
			},
			gotoSolution(flag) {
				this.navActive = 5
				this.activeNum3 = flag
				let id = "bannerBox"
				switch (flag) {
					case 1:
						id = "bannerBox"
						break;
					case 2:
						id = "customizedBox"
						break;
				}
				this.$router.push({
					path: "solution",
				})
				this.drawer = false
				// Utils.$emit("gocustomized",id)
				setTimeout(() => {
					Utils.$emit("gocustomized", id)
				}, 300)
			},
			gotoProductDetail(item) {
				this.$router.push({
					path: "productDetail",
					query: {
						id: item.id
					}
				})
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
			z-index: 99;
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

				.active {
					color: red;
				}

			}
		}
	}

	//pc导航栏
	.header_pc {
		&:hover {
			// transition: all 0.5s;
			background-color: rgba($color: #fff, $alpha: 1.0) !important;
			color: #000 !important;
		}

		color: #FFF;

		.navBox {
			max-width: 14rem;
			justify-content: space-between;
			margin: 0 auto;

			.title {
				font-size: .3rem;
				font-weight: bold;

				span {
					font-size: 0.25rem;
				}
			}

			.menulist {
				height: 1.25rem;
				display: flex;
				justify-content: space-between;
				align-items: center;

				li {
					cursor: pointer;
					padding: 0 0.4rem;
					font-size: 0.22rem;
					line-height: 0.45rem;
					height: 100%;
					display: flex;
					align-items: center;
					box-sizing: border-box;

					a {
						height: 100%;
						line-height: 100%;
						display: flex;
						align-items: center;
						position: relative;
						

					}

					&:hover {
						.menuTreeDiv {
							display: block;
						}

						a {
							&::after {
								content: "";
								position: absolute;
								border-bottom: 3px solid #e60012;
								width: 0.34rem;
								bottom: -0rem;
								left: calc(50% - 0.17rem);
							}
						}
					}

					.menuTreeDiv {
						display: none;
						position: fixed;
						top: 1.25rem;
						left: 0;
						z-index: 10;
						width: 100%;
						border-top: 1px solid #F1F1F1;
						border-bottom: 1px solid #F1F1F1;
						background-color: #FFF;
						box-sizing: border-box;

						.firstTree {
							padding: 0.2rem 0;
							display: flex;
							align-items: center;
							justify-content: center;

							.firstTree_title {
								font-size: 0.22rem;
								color: #666;
								padding: 0.2rem 0.4rem;
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

						::-webkit-scrollbar {
							height: 8px;
						}

						::-webkit-scrollbar-track {
							border-radius: 10px;
							background-color: rgba(0, 0, 0, 0.1);
						}

						::-webkit-scrollbar-thumb {
							border-radius: 10px;
							-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
							background-color: rgba(0, 0, 0, 0.1);
						}

						.secondTree {
							max-width: 14rem;
							width: 100%;
							overflow-x: auto;
							margin: 0 auto;
							display: flex;
							align-items: center;
							justify-content: center;

							// flex-wrap: wrap;
							.iconfont {
								color: #666;
								font-size: 0.5rem;
								padding: 0 0.5rem;
							}

							.secondTreeBox {
								margin: 0.5rem 0.2rem 0.5rem 0.2rem;

								.secondTree_img {
									width: 100%;
									max-width: 2rem;
									// height: 2rem;
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

				li.active {
					position: relative;

					&::after {
						content: "";
						position: absolute;
						border-bottom: 3px solid #e60012;
						width: 0.34rem;
						bottom: -0rem;
						left: calc(50% - 0.17rem);
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