<template>
	<div class="contain">
		<div class="bannerBox ">
			<swiper :options="swiperOptions_bannner" v-if="banner.length>0">
				<swiper-slide v-for="item in banner" @click-slide="bannerLink">
					<video v-if="item.pictureVideo.indexOf('.mp4')!='-1'" :src="item.pictureVideo" muted="" autoplay=""
						loop="" width="100%"></video>
					<div class="bannerImg_contain" v-else :style="{'background-image':'url('+item.pictureVideo+')'}">
					</div>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>

		<div class="hotProductBox">
			<div class="imgBox" v-for="(item, index) in hotproduct">
				<img :src="item.pictureVideo" alt="">
				<div class="buttonBox">
					<div class="detail" :class="index==1?'detail2':''">
						<p class="title">{{item.pictureName}}</p>
						<p class="descript">{{item.englishName}}</p>
					</div>
					<div class=" iconfont icon-jinrufasong" @click="pictureProductLink(item)">
					</div>
				</div>
			</div>
		</div>

		<div class="newsBox">
			<div class="moduleTitle">
				新闻与活动
			</div>
			<div class="pc_box">
				<swiper :options="swiperOptions" v-if="newsList.length>0">
					<swiper-slide v-for="item in newsList" :data-id="item.id">
						<div class="newsTag" v-if="item.newsTag==1">新闻</div>
						<div class="newsTag" v-else>活动</div>
						<div class="newsImg" :style="{'background-image':'url('+item.newsPicture+')'}"></div>
						<div class="textBox">
							<p class="title">
								{{item.newsTitle}}
							</p>
							<div class="label">
								<img v-if="item.newsTop==1" src="../assets/img/index/hot.png" alt="">
								<span>{{item.newsEditor}}</span>
								<span>{{item.updateTime | formatDate}}</span>
							</div>
							<div class="content" v-html="item.newsSimpleBody">

							</div>
							<div class="button_more">阅读全文</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
			<div class="phone_box" style="margin-bottom:0.3rem;border:1px solid #eee;margin:15px">
				<swiper :options="swiperOptions2" v-if="newsList.length>0">
					<swiper-slide v-for="item in newsList"  :data-id="item.id">
						<div class="newsTag" v-if="item.newsTag==1">新闻</div>
						<div class="newsTag" v-else>活动</div>
						<div class="newsImg" :style="{'background-image':'url('+item.newsPicture+')'}"></div>
						<div class="textBox">
							<p class="title">
								{{item.newsTitle}}
							</p>
							<div class="label">
								<img v-if="item.newsTop==1" src="../assets/img/index/hot.png" alt="">
								<span>{{item.newsEditor}}</span>
								<span>{{item.updateTime | formatDate}}</span>
							</div>
							<div class="content" v-html="item.newsSimpleBody">

							</div>
							<div class="button_more" >阅读全文</div>
						</div>

					</swiper-slide>
				</swiper>
			</div>
		</div>


	</div>
</template>

<script>
	import {
		formatDate
	} from '@/utils/tool'
	import {
		getAllPicture
	} from "@a/picture";
	import {
		getNews
	} from "@a/index";
	var  vm = null
	export default {
		filters: {
			formatDate(time) {
				time = time
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			},
		},
		name: 'index',
		props: {},
		data() {
			return {
				banner: [],
				hotproduct: [],
				newsList: [],
				swiperOptions_bannner: {
					spaceBetween: 0,
					loop: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper 
					observeParents: true, //修改swiper的父元素时，自动初始化swiper 
					// autoplay: {
					// 	delay: 3000,
					// 	stopOnLastSlide: false,
					// 	disableOnInteraction: true,
					// },
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},

				},
				swiperOptions: {
					slidesPerView: 3,
					spaceBetween: 0,
					centeredSlides: true,
					loop: true,
					observer: true,
					observeParents: true,
					on: {
						click: function () {
							vm.gotoNewsList(this.clickedSlide.attributes["data-id"].nodeValue);

						}
					}


					// autoplay: {
					// 	delay: 3000,
					// },
				},
				swiperOptions2: {
					slidesPerView: 1,
					spaceBetween: 0,
					observer: true,
					observeParents: true,
					loop: true,
					autoplay: {
						delay: 3000,
					},
					on: {
						click: function () {
							vm.gotoNewsList(this.clickedSlide.attributes["data-id"].nodeValue);

						}
					}
				}
			}
		},
		created(){
			vm=this
		},
		computed: {},
		mounted() {
			this.getBanner()
			this.getHotproduct()
			this.news()
		},
		methods: {
			getBanner() {
				getAllPicture({
					pictureBelong: 2,
					pictureType: 0
				}).then(res => {
					this.banner = res.data;
				})
			},
			getHotproduct() {
				getAllPicture({
					pictureBelong: 1,
					pictureType: 1
				}).then(res => {
					this.hotproduct = res.data;
				})
			},
			news() {
				getNews({
					pageSize: 5,
					pageNum: 0
				}).then(res => {
					this.newsList = res.data.websiteNewsList;
				})
			},
			gotoNewsList(id) {
				this.$router.push({
					path: "newsList",
					query: {
						id: id
					}
				})
			},
			gotoProductDetail(item) {
				this.$router.push({
					path: "productDetail",
					query: {
						id: item.id
					}
				})
			},
			bannerLink(index, realIndex) {
				let item = this.banner[realIndex]
				if (item.pictureProductLink) {
					window.location.href = item.pictureProductLink
				}
			},
			
			pictureProductLink(item) {
				if (item.pictureProductLink) window.location.href = item.pictureProductLink
			}

		}
	}
</script>


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
					height: 8.38rem;
					background-size: contain;
					background-position: 50% 50%;
					background-repeat: no-repeat;
				}
			}

			.hotProductBox {
				color: #fff;
				display: flex;
				justify-content: space-between;
				max-width: 12rem;
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
						width: 3rem;
						display: flex;
						justify-content: space-between;
						align-items: center;
						background-color: rgba($color: #000000, $alpha: 0.55);
						position: absolute;
						bottom: 0.6rem;
						padding: 0.18rem 0.2rem 0.18rem 0.2rem;
						text-align: left;

						.detail {
							border-left: 0.1rem solid #00A7E6;
							padding-left: 0.2rem;

							.title {
								font-size: 0.22rem;
								line-height: 0.3rem;
								font-weight: bold;
							}

							.descript {
								font-size: 0.12rem;
								line-height: 0.25rem;
							}

						}

						.detail2 {
							border-left: 0.1rem solid #E60012;
						}

						.iconfont {
							font-size: 0.28rem;
						}


					}

				}
			}

			.newsBox {
				max-width: 13rem;
				margin: 0 auto;
				margin-bottom: 1.5rem;

				.moduleTitle {
					color: #333333;
					font-size: 0.53rem;
					line-height: 2rem;
				}

				.swiper-container {
					width: 100%;
					height: 5rem;
				}

				.swiper-slide {
					text-align: left;
					// font-size: 18px;
					background: #fff;
					box-shadow: 3px 4px 20px 6px rgba(0, 0, 0, 0.06);
					transition: 300ms;
					transform: scale(0.8);

					.newsTag {
						width: 0.73rem;
						height: 0.73rem;
						position: absolute;
						top: 0;
						left: 0;
						background-image: url('../assets/img/index/newsTag.png');
						background-size: cover;
						color: #fff;
						font-size: 0.18rem;
						line-height: 0.73rem;
						text-align: center;
					}

					.newsImg {
						width: 100%;
						height: 50%;
						background-size: cover;
						background-position: 100% 100%;
					}
				}

				.swiper-slide-active,
				.swiper-slide-duplicate-active {
					transform: scale(0.95);
				}

				.textBox {
					padding: 0.3rem;

					.title {
						font-size: 0.18rem;
						color: #333333;
						font-weight: bold;
						line-height: 0.3rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.label {
						img {
							width: 0.35rem;
							margin-right: 0.2rem;
						}

						span {
							margin-right: 0.2rem;
						}

						display: flex;
						align-items: center;
						font-size: 0.14rem;
						color: #777;
						line-height: 0.4rem;
					}

					.content {
						font-size: 0.12rem;
						color: #777;
						line-height: 0.3rem;
						height: 0.9rem;
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
						padding: 0.04rem 0.1rem;
						float: right;
						text-align: center;
						font-family: PingFangSC-Medium;
						margin-top: 0.05rem;
					}
				}
			}
		}
	}

	//小于992
	@media (max-width: 992px) {
		.contain {
			.bannerBox {
				.bannerImg_contain {
					background-image: url('../assets/img/banner.png');
					width: 100%;
					height: 8.38rem;
					background-size: cover;
					background-position: 50% 50%;
					background-repeat: no-repeat;
				}
			}

			margin-top: 0.66rem;

			.phone_box {
				display: block;
			}

			.pc_box {
				display: none;
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
								font-weight: bold;
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
				.swiper-slide {
					padding-bottom: 0.5rem;
				}

				.newsTag {
					width: 0.73rem;
					height: 0.73rem;
					position: absolute;
					top: 0;
					left: 0;
					background-image: url('../assets/img/index/newsTag.png');
					background-size: cover;
					color: #fff;
					font-size: 0.18rem;
					line-height: 0.73rem;
					text-align: center;
				}

				.newsImg {
					width: 100%;
					height: 50%;
					min-height: 3rem;
					background-size: cover;
					background-position: 100% 100%;
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

						img {
							width: 0.5rem;
							margin-right: 0.2rem;
						}
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