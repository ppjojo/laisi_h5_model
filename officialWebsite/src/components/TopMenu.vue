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
					<li :class="navActive==1?'active':''" @mouseover="swiperStart=true;menuTreeShow(0)"
						@mouseleave="menuTreeHide">
						<a @click="menuChange('outdoorSport',1)">户外运动系列</a>
					</li>
					<li :class="navActive==2?'active':''" @mouseover="swiperStart=false;menuTreeShow(1)" @mouseleave="menuTreeHide">
						<a @click="menuChange('smartWear',2)">智能穿戴系列</a>
					</li>
					<li :class="navActive==3?'active':''">
						<a @click="menuChange('paiactive',3)">派健康</a>

					</li>
					<li :class="navActive==4?'active':''" @mouseover="swiperStart=false;menuTreeShow(2)" @mouseleave="menuTreeHide">
						<a @click="menuChange('solution',4)">行业解决方案</a>
					</li>
					<li :class="navActive==5?'active':''">
						<a @click="menuChange('business',5)">商务合作</a>
					</li>
					<li :class="navActive==6?'active':''" @mouseover="menuTreeShow(3)" @mouseleave="menuTreeHide">
						<a @click="menuChange('aboutus',6)">关于铼锶</a>
					</li>
				</ul>
				<div>
					<!-- 户外运动系列 -->
					<div class="menuTreeDiv ">
						<div>
							<div class="firstTree">
								<div class="firstTree_title " :class="activeNum==1?'active':''" @click="activeNum=1">
									智能跳绳</div>
								<div class="firstTree_title" :class="activeNum==2?'active':''" @click="activeNum=2">
									智能腕力球</div>
								<div class="firstTree_title" :class="activeNum==3?'active':''" @click="activeNum=3">
									智能健腹轮</div>
							</div>
							<div class="secondTree"  v-if="activeNum==1">
								<div class=" iconfont " @click="slidePrev">
									<img style="width:0.36rem;" src="../assets/img/outdoorSport/iconLeft.png" alt="">
								</div>
								<swiper :options="swiperOptions_nav" v-if="swiperStart&&outdoorlist.length>0"
									ref="pcSwiper" @click-slide="swipergotoProductDetail">
									<swiper-slide v-for="item in outdoorlist" style="width:auto;"
										v-if="item.productDeviceType=='3'">
										<div class="secondTreeBox " >
											<img class="secondTree_img" :src="item.navPic" alt="">
											<div class="secondTree_title">{{item.productName}}</div>
											<div class="secondTree_price">¥ {{item.productPrice}}</div>
										</div>
									</swiper-slide>
								</swiper>
								<div class=" iconfont " @click="slideNext">
									<img style="width:0.36rem;" src="../assets/img/outdoorSport/iconRight.png" alt="">
								</div>
							</div>
							<div class="secondTree" v-if="activeNum==2">
								<template v-for="item in outdoorlist">
									<div class="secondTreeBox" v-if="item.productDeviceType=='5'"
										@click="gotoProductDetail(item)">
										<img class="secondTree_img" :src="item.navPic" alt="">
										<div class="secondTree_title">{{item.productName}}</div>
										<div class="secondTree_price">¥ {{item.productPrice}}</div>
									</div>
								</template>
							</div>
							<div class="secondTree" v-if="activeNum==3">
								<template v-for="item in outdoorlist">
									<div class="secondTreeBox" v-if="item.productDeviceType=='4'"
										@click="gotoProductDetail(item)">
										<img class="secondTree_img" :src="item.navPic" alt="">
										<div class="secondTree_title">{{item.productName}}</div>
										<div class="secondTree_price">¥ {{item.productPrice}}</div>
									</div>
								</template>
							</div>
						</div>
					</div>
					<!-- 智能穿戴 -->
					<div class="menuTreeDiv">
						<div>
							<div class="firstTree">
								<div class="firstTree_title " :class="activeNum2==4?'active':''" @click="activeNum2=4">
									智能手表</div>
								<div class="firstTree_title" :class="activeNum2==5?'active':''" @click="activeNum2=5">
									无线耳机</div>
							</div>
							<div class="secondTree" v-if="activeNum2==4">
								<template v-for="item in smartwearlist">
									<div class="secondTreeBox" v-if="item.productDeviceType=='1'"
										@click="gotoProductDetail(item)">
										<img class="secondTree_img" :src="item.navPic" alt="">
										<div class="secondTree_title">{{item.productName}}</div>
										<div class="secondTree_price">¥ {{item.productPrice}}</div>
									</div>
								</template>
							</div>
							<div class="secondTree" v-if="activeNum2==5">
								<template v-for="item in smartwearlist">
									<div class="secondTreeBox" v-if="item.productDeviceType=='2'"
										@click="gotoProductDetail(item)">
										<img class="secondTree_img" :src="item.navPic" alt="">
										<div class="secondTree_title">{{item.productName}}</div>
										<div class="secondTree_price">¥ {{item.productPrice}}</div>
									</div>
								</template>
							</div>
						</div>
					</div>
					<!-- 行业解决方案 -->
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
					<!-- 关于铼锶 -->
					<div class="menuTreeDiv">
						<div>
							<div class="firstTree">
								<div class="firstTree_title " :class="activeNum4==1?'active':''"
									@click="gotoAboutus(1)">企业简介</div>
								<div class="firstTree_title" :class="activeNum4==2?'active':''" @click="gotoAboutus(2)">
									品牌介绍</div>
								<div class="firstTree_title " :class="activeNum4==3?'active':''"
									@click="gotoAboutus(3)">企业文化</div>
								<div class="firstTree_title" :class="activeNum4==4?'active':''" @click="gotoAboutus(4)">
									大事记</div>
								<div class="firstTree_title" :class="activeNum4==5?'active':''" @click="gotoAboutus(5)">
									联系我们</div>
							</div>
						</div>
					</div>
				</div>

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
	// import WOW from '../../node_modules/wowjs/dist/wow';
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
				swiperStart: false,
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
		mounted() {
			// let wow = new WOW.WOW({
			//     boxClass: 'wow',
			//     animateClass: 'animated',
			//     offset: 0,
			//     mobile: true,
			//     live: true
			// });
			// wow.init();
		},
		created() {
			//window.addEventListener('scroll', this.scrollFn);
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
				// this.$i18n.locale == 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh' //设置中英文模式
				// localStorage.setItem('languageSet', this.$i18n.locale) //将用户设置存储到localStorage以便用户下次打开时使用此设置
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
				this.menuTreeHide()
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
				this.menuTreeHide()
			},
			gotoSolution(flag) {
				this.navActive = 4
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
				this.menuTreeHide()
			},
			gotoProductDetail(item) {
				this.$router.push({
					path: "productDetail",
					query: {
						id: item.id
					}
				})
				this.menuTreeHide()
			},
			swipergotoProductDetail(index,realIndex) {
                 let item=this.outdoorlist[realIndex]
                this.$router.push({
                    path: "productDetail",
                    query: {
                        id: item.id
                    }
                })
            },
			menuTreeShow(flag) {
				let len = document.getElementsByClassName("menuTreeDiv").length
				for (let i = 0; i < len; i++) {
					document.getElementsByClassName("menuTreeDiv")[i].classList.remove("menuTreeDivActive")
				}
				document.getElementsByClassName("menuTreeDiv")[flag].classList.add("menuTreeDivActive")
			},
			menuTreeHide() {
				let len = document.getElementsByClassName("menuTreeDiv").length
				for (let i = 0; i < len; i++) {
					document.getElementsByClassName("menuTreeDiv")[i].classList.remove("menuTreeDivActive")
				}
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
			// transition: all 0.2s;
			background-color: rgba($color: #fff, $alpha: 1.0) !important;
			color: #000 !important;
		}

	

		.navBox {
			padding-top: 0.2rem;
			max-width: 12rem;
			justify-content: space-between;
			margin: 0 auto;

			.title {
				font-size: .2rem;
				font-weight: bold;
				position: relative;
				z-index: 4;

				span {
					font-size: 0.18rem;
				}
			}

			.menulist {
				height: 0.6rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				z-index: 4;

				li {
					cursor: pointer;
					padding: 0 0.3rem;
					font-size: 0.16rem;
					line-height: 0.6rem;
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
							transition: top ease 3s;
							top: 0rem !important;
						}

						a {
							&::after {
								content: "";
								position: absolute;
								border-bottom: 2px solid #e60012;
								width: 0.34rem;
								bottom: 0;
								left: calc(50% - 0.17rem);
							}
						}
					}


				}

				li.active {
					position: relative;

					// &::after {
					// 	content: "";
					// 	position: absolute;
					// 	border-bottom: 3px solid #e60012;
					// 	width: 0.34rem;
					// 	bottom: -0rem;
					// 	left: calc(50% - 0.17rem);
					// }
				}

				li:last-child {
					margin-right: 0;
				}


			}

			.menuTreeDiv {
				&:hover {
					top: 0;
					.firstTree {
						opacity: 1;
					}
					.secondTree {
						opacity: 1;
						bottom: 0;
					}
				}

				padding-top: 0.8rem;
				position: fixed;
				top: -5rem;
				left: 0;
				z-index: 3;
				width: 100%;
				border-bottom: 1px solid #F1F1F1;
				background-color: #FFF;
				box-sizing: border-box;
				overflow: hidden;

				.firstTree {
					border-top: 1px solid #F1F1F1;
					opacity: 0;
					
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0.1rem 0;
					.firstTree_title {
						font-size: 0.16rem;
						color: #666;
						padding: 0.2rem 0.4rem 0.1rem 0.4rem;
					}

					.active {
						position: relative;
						color: #333;
						font-size: 0.16rem;

						&::after {
							content: "";
							position: absolute;
							border-bottom: 2px solid #e60012;
							width: 0.17rem;
							bottom: 0;
							left: calc(50% - 0.085rem);

						}
					}

				}

				// ::-webkit-scrollbar {
				// 	height: 8px;
				// }

				// ::-webkit-scrollbar-track {
				// 	border-radius: 10px;
				// 	background-color: rgba(0, 0, 0, 0.1);
				// }

				// ::-webkit-scrollbar-thumb {
				// 	border-radius: 10px;
				// 	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
				// 	background-color: rgba(0, 0, 0, 0.1);
				// }

				.secondTree {
					padding-top: 0.2rem;
					position: relative;
					bottom: -3rem;
					opacity: 0;
					max-width: 12rem;
					width: 100%;
					overflow-x: auto;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					// border-top: 1px solid #eee;

					// flex-wrap: wrap;
					.iconfont {
						color: #666;
						font-size: 0.5rem;
						padding: 0 0.5rem;
					}

					.secondTreeBox {
						margin: 0.1rem 0.2rem 0.3rem 0.2rem;

						.secondTree_img {
							width: 100%;
							max-width: 1.8rem;
							// height: 2rem;
						}

						.secondTree_title {
							font-size: 0.14rem;
							color: #333;
							line-height: 0.3rem;
							font-weight: bold;
						}

						.secondTree_price {
							color: #E60012;
							font-size: 0.14rem;
							line-height: 0.25rem;
						}
					}


				}
			}

			.menuTreeDivActive {
				top: 0;
				transition: all ease 0.3s;

				.firstTree {
					transition: all ease 0.6s;
					opacity: 1;
				}

				.secondTree {
					transition: all ease 0.6s;
					opacity: 1;
					bottom: 0
				}
			}

			.lang {
				position: relative;
				z-index: 4;
				font-size: 0.16rem;

				img {
					height: 0.2rem;
					width: 0.2rem;
					border-radius: 100%;
					margin-right: 0.1rem;
				}
			}
		}


	}
</style>