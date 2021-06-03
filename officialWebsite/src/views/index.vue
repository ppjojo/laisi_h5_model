<template>
	<div class="contain">
		<div class="bannerBox pc_box">
			<el-carousel :interval="5000" height="10rem">
				<el-carousel-item v-for="item in 3" :key="item">
					<!-- <div class="bannerImg_contain" :style="{'background-image':'url(../assets/img/banner.png)'}"></div> -->
					<div class="bannerImg_contain"></div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="bannerBox phone_box">
			<el-carousel :interval="5000" height="8rem" trigger="click">
				<el-carousel-item v-for="item in 3" :key="item">
					<div class="bannerImg_contain"></div>
				</el-carousel-item>
			</el-carousel>
		</div>

		<div class="hotProductBox">
			<div class="imgBox">
				<img src="../assets/img/ad.png" alt="">
				<div class="buttonBox">
					<div class="detail">
						<p class="title">智能跳绳</p>
						<p class="descript">Smart Rope</p>
					</div>
					<div class=" iconfont icon-jinrufasong">
					</div>
				</div>
			</div>
			<div class="imgBox">
				<img src="../assets/img/ad.png" alt="">
				<div class="buttonBox">
					<div class="detail detail2">
						<p class="title">智能腕力球</p>
						<p class="descript">Smart Wrist Force Ball</p>
					</div>
					<div class=" iconfont icon-jinrufasong">
					</div>
				</div>
			</div>

		</div>

		<div class="newsBox">
			<div class="moduleTitle">
				新闻与活动
			</div>
			<div class="pc_box">
				<swiper :options="swiperOptions">
					<swiper-slide v-for="item in 5">
						<img  class="newsImg" src="../assets/img/ad.png" alt="">
						<div class="textBox">
							<p class="title">
								热烈祝贺铼锶成为二类重点扶持企业
							</p>
							<div class="label">
								<span>研发部</span>
								<span>67人已看</span>
								<span>2021-06-01</span>
							</div>
							<div class="content">
								白明传候它统东代现年问阶在规取生识生用需史议化美事手全识写人节思米按总成观节他见快较经用想老维地交见出习书立给还需算给养一条十。
							</div>
							<div class="button_more">阅读全文</div>
						</div>

					</swiper-slide>
				</swiper>
			</div>
			<div class="phone_box" style="margin-bottom:0.3rem;border:1px solid #eee;margin:15px">
				<el-carousel :interval="5000" indicator-position="none" height="8rem">
					<el-carousel-item v-for="item in 4" :key="item" >
						<img class="newsImg" src="../assets/img/ad.png" alt="">
						<div class="textBox">
							<p class="title">
								热烈祝贺铼锶成为二类重点扶持企业
							</p>
							<div class="label">
								<span>研发部</span>
								<span>67人已看</span>
								<span>2021-06-01</span>
							</div>
							<div class="content">
								白明传候它统东代现年问阶在规取生识生用需史议化美事手全识写人节思米按总成观节他见快较经用想老维地交见出习书立给还需算给养一条十。
							</div>
							<div class="button_more">阅读全文</div>
						</div>
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>


	</div>
</template>

<script>
	import {
		isAndroid,
		isIOS
	} from "@u/tool";
	export default {
		name: 'index',
		props: {},
		data() {
			return {
				bgc: require('../assets/img/banner.png'),
				cardType: (isAndroid || isIOS) ? "" : "card",
				swiperOptions: {
					slidesPerView: 3,
					spaceBetween: 0,
					centeredSlides: true,
					loop: true,
					autoplay: {
						delay: 1000,
						stopOnLastSlide: false,
						disableOnInteraction: true,
					},
				}
			}
		},
		computed: {
			// swiper() {
			// 	return this.$refs.mySwiper.$swiper
			// }
		},
		mounted() {


		},
		methods: {

		}
	}
</script>
<style lang="scss">
	.el-carousel__button {
		width: 0.1rem;
		height: 0.1rem;
		border-radius: 5px;
		background-color: rgba(182, 207, 248, 0.35);
	}

	.is-active {
		.el-carousel__button {
			width: 0.1rem;
			height: 0.2rem;
			border-radius: 5px;
			background-color: #9ABBFF;
		}
	}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	//大于992
	@media (min-width: 992px) {
		.phone_box {
			display: none;
		}

		.pc_box {
			display: block;
		}

		.contain {
			.bannerBox {
				.bannerImg_contain {
					background-image: url('../assets/img/banner.png');
					width: 100%;
					height: 10rem;
					background-size: cover;
					background-position: 50% 50%;
					background-repeat: no-repeat;
				}
			}

			.hotProductBox {
				color: #fff;
				display: flex;
				justify-content: space-between;
				max-width: 14rem;
				margin: 1.5rem auto;
				margin-bottom: 1rem;

				.imgBox {
					position: relative;
					width: 47%;
					overflow: hidden;

					img {
						width: 100%;
						height: auto;
						transition: all 0.6s;

						&:hover {
							transform: scale(1.2);
						}
					}

					.buttonBox {
						width: 3.8rem;
						display: flex;
						justify-content: space-between;
						align-items: center;
						background-color: rgba($color: #000000, $alpha: 0.55);
						position: absolute;
						bottom: 0.6rem;
						padding: 0.25rem 0.3rem 0.25rem 0.2rem;
						text-align: left;

						.detail {
							border-left: 0.16rem solid #00A7E6;
							padding-left: 0.2rem;

							.title {
								font-size: 0.38rem;
								line-height: 0.45rem;
							}

							.descript {
								font-size: 0.2rem;
								line-height: 0.3rem;
							}

						}

						.detail2 {
							border-left: 0.16rem solid #E60012;
						}

						.iconfont {
							font-size: 0.43rem;
						}


					}

				}
			}

			.newsBox {
				max-width: 15rem;
				margin: 0 auto;
				margin-bottom: 2rem;

				.moduleTitle {
					color: #333333;
					font-size: 0.53rem;
					line-height: 2rem;
				}

				.swiper-container {
					width: 100%;
					height: 5.85rem;
				}

				.swiper-slide {
					text-align: left;
					font-size: 18px;
					background: #fff;
					box-shadow: 3px 4px 20px 6px rgba(0, 0, 0, 0.06);
					transition: 300ms;
					transform: scale(0.8);

					.newsImg {
						width: 100%;
						height: 50%;
					}
				}

				.swiper-slide-active,
				.swiper-slide-duplicate-active {
					transform: scale(0.95);
				}

				.textBox {
					padding: 0.3rem;

					.title {
						font-size: 0.28rem;
						color: #333333;
						font-weight: bold;
						line-height: 0.4rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.label {
						font-size: 0.14rem;
						color: #777;
						line-height: 0.4rem;
					}

					.content {
						font-size: 0.15rem;
						color: #777;
						line-height: 0.3rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: box;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}

					.button_more {
						border-radius: 0.2rem;
						border: 1px solid rgba(229, 0, 18, 1);
						color: rgba(232, 44, 59, 100);
						font-size: 0.14rem;
						line-height: 0.3rem;
						padding: 3px 5px;
						float: right;
						text-align: center;
						font-family: PingFangSC-Medium;
						margin-top: 0.1rem;
					}
				}
			}
		}
	}

	//小于992
	@media (max-width: 992px) {
		.contain {
			margin-top: 0.66rem;

			.phone_box {
				display: block;
			}

			.pc_box {
				display: none;
			}

			.bannerBox {
				.bannerImg_contain {
					background-image: url('../assets/img/banner.png');
					width: 100%;
					height: 100%;
					background-size: cover;
					background-position: 50% 50%;
					background-repeat: no-repeat;
				}
			}

			.hotProductBox {
				color: #fff;
				display: flex;
				justify-content: space-between;
				margin: 20px auto;

				.imgBox {
					position: relative;
					width: 47%;

					img {
						width: 100%;
						height: auto;
					}

					.buttonBox {
						min-width: 60%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						background-color: rgba($color: #000000, $alpha: 0.55);
						position: absolute;
						bottom: 20px;
						padding: 8px;
						text-align: left;

						.detail {
							border-left: 4px solid #00A7E6;
							padding-left: 5px;

							.title {
								font-size: 15px;
								line-height: 25px;
							}

							.descript {
								font-size: 12px;
								line-height: 20px;
							}

						}

						.detail2 {
							border-left: 4px solid #E60012;
						}

						.iconfont {
							font-size: 15px;
						}


					}

				}
			}

			.newsBox {
				.newsImg {
					width: 100%;
					height: 50%;
				}

				.moduleTitle {
					color: #333333;
					font-size: 0.5rem;
					line-height: 2rem;
				}

				.textBox {
					text-align: left;
					padding: 0.2rem;
					

					.title {
						font-size: 0.4rem;
						color: #333333;
						font-weight: bold;
						line-height: 0.6rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.label {
						font-size: 0.24rem;
						color: #777;
						line-height: 0.5rem;
					}

					.content {
						font-size: 0.24rem;
						color: #777;
						line-height: 0.4rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: box;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}

					.button_more {
						border-radius: 17px;
						border: 1px solid rgba(229, 0, 18, 1);
						color: rgba(232, 44, 59, 100);
						font-size: 0.24rem;
						line-height: 0.4rem;
						padding: 3px 5px;
						float: right;
						text-align: center;
						font-family: PingFangSC-Medium;
						margin-top: 10px;
					}
				}
			}
		}
	}

	.contain {
		background-color: #fff;



	}
</style>