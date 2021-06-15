<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <swiper :options="swiperOptions_bannner">
                <swiper-slide v-for="item in banner">
                    <div class="bannerImg_contain" :style="{'background-image':'url('+item.pictureVideo+')'}"></div>
                </swiper-slide>
            </swiper>

            <div class="productBox pc_box">
                <swiper :options="swiperOptions" ref="pcSwiper">
                    <swiper-slide v-for="item in list">
                        <img class="productImg" :src="item.productAllPictureList[0]?item.productAllPictureList[0].pictureVideo:''" alt="">
                        <p class="productTitle">{{item.productName}}</p>
                    </swiper-slide>
                </swiper>
                <div class="navgationBox">
                    <div class=" iconfont icon-shangyiye" @click="slidePrev">
                    </div>
                    <div class=" iconfont icon-xiayiye" @click="slideNext">
                    </div>
                </div>

            </div>
            <div class="productBox phone_box">
                <swiper :options="swiperOptions_phone" ref="phoneSwiper">
                    <swiper-slide v-for="item in list">
                        <img class="productImg" :src="item.productAllPictureList[0]?item.productAllPictureList[0].pictureVideo:''" alt="">
                        <p class="productTitle">{{item.productName}}</p>

                    </swiper-slide>
                </swiper>
            </div>

        </div>
        <!-- 精选推荐 -->

        <div >
            <div class="moduleTitleBox">
                <img class="moduleTitleImg" src="../assets/img/outdoorSport/jxtj.png" alt="">
            </div>
            <div class="buyBoxList">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="commandList.length>0"
                        style="padding:0 10px ;box-sizing: border-box;">
                        <div class="buyBox">
                            <div class="label" v-if="commandList[0].ifNewProduct==1" >新品</div>
                            <div class="title">{{commandList[0].productName}}</div>
                            <div class="content">{{commandList[0].productDes}}</div>
                            <div class="colorBox">
                                <span v-for="(item,index) in commandList[0].productAllPictureList"
								:class="index==colorIndex&&hoverIndex==0?'active':''"
								@mouseover="mouseOver(0,index)" @mouseleave="mouseLeave"
								  :style="{backgroundColor:item.pictureColor}"></span>
                            </div>
                            <div class="price">{{commandList[0].productPrice}}</div>
                            <div class="buttonBox">
                                <div class="buyNow">立即购买</div>
                                <div class="moreInfo">了解更多</div>
                            </div>
                            <div class="picBox">
                                <img :src="hoverIndex==0?commandList[0].productAllPictureList[colorIndex].pictureVideo:commandList[0].productPagePic" alt="">
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding:0 10px;box-sizing: border-box;">
						<template v-for="(item,index) in commandList">
							<div v-if="index>0" class="buyBox buyBox2">
							    <div style="width:60%">
									<div class="label" v-if="item.ifNewProduct==1" >新品</div>
							        <div class="title">{{item.productName}}</div>
							        <div class="content">{{item.productDes}}</div>
							        <div class="colorBox">
							           <span v-for="(color,cindex) in item.productAllPictureList"
									   :class="cindex==colorIndex&&hoverIndex==index?'active':''"
									   @mouseover="mouseOver(index,cindex)" @mouseleave="mouseLeave"
							             :style="{backgroundColor:color.pictureColor}"></span>
							        </div>
							        <div class="price">{{item.productPrice}}</div>
							        <div class="buttonBox">
							            <div class="buyNow">立即购买</div>
							            <div class="moreInfo">了解更多</div>
							        </div>
							    </div>
							    <div class="picBox" style="width:40%">
							        <img :src="hoverIndex==index?item.productAllPictureList[colorIndex].pictureVideo:item.productPagePic" alt="">
							    </div>
							</div>
						</template>
                        
                    </el-col>
                </el-row>
            </div>


        </div>






    </div>
</template>

<script>
    import {
        getAllProduct
    } from "@a/product";
	import {
	    getAllPicture
	} from "@a/picture";
    export default {
        name: 'index',
        props: {},
        data() {
            return {
				list:[],
                banner: [],
				commandList:[],
				hoverIndex:null,
				colorIndex:null,
                swiperOptions_bannner: {
                    spaceBetween: 0,
                    loop: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper 
                    observeParents: true //修改swiper的父元素时，自动初始化swiper 

                },
                swiperOptions: {
                    slidesPerView: 5,
                    spaceBetween: 0,
                    centeredSlides: true,
                    loop: true,
                },
                swiperOptions_phone: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    centeredSlides: true,
                    loop: true,
                }
            }
        },
        computed: {

        },
        mounted() {


        },
        created() {
            this.getBanner();
			this.getGoods()
        },
        methods: {
			mouseOver(index,cindex){//sku小图鼠标移进移出
				this.colorIndex = cindex;
				this.hoverIndex = index;
			},
			mouseLeave(){
				this.hoverIndex = this.colorIndex = null;
			},
            slidePrev() {
                this.$refs.pcSwiper.swiperInstance.slidePrev()
            },
            slideNext() {
                this.$refs.pcSwiper.swiperInstance.slideNext()
            },
            getBanner() {
                getAllPicture({
                    pictureBelong: 5,
                    pictureType: 0
                }).then(res => {
                    this.banner = res.data;
                })
            },
			getGoods(){
				getAllProduct({
				    productBelong: '2'
				}).then(res => {
					this.list = res.data||[];
					res.data.forEach(d=>{
						if(d.ifShow==1){
							this.commandList.push(d);
						}
					})
				})
			}
        }
    }
</script>

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
            .productBox {
                width: 14rem;
                padding: 0.5rem;
                margin: 0 auto;
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 3px 4px 20px 6px rgba(173, 173, 173, 0.06);
                position: absolute;
                bottom: 2.1rem;
                left: calc(50% - 7rem);
                z-index: 8;


                .productImg {
                    width: 2rem;
                    height: 2rem;
                }

                .productTitle {
                    color: #333;
                    font-size: 0.22rem;
                    line-height: 0.5rem;
                }

                .navgationBox {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-top: 0.1rem;

                    .iconfont {
                        font-size: 0.43rem;
                        line-height: 0.5rem;
                        margin-right: 0.4rem;
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

            .productBox {
                // margin: 0 15px;
                padding: 15px;
                margin-top: -4rem;

                .productImg {
                    width: 100%;
                    height: auto;
                }

                .productTitle {
                    color: #333;
                    font-size: 18px;
                    line-height: 22px;
                }
            }

        }
    }

    .contain {
        background-color: rgb(246, 248, 251);

        .bannerBox {
            position: relative;

            .bannerImg_contain {
                background-image: url('../assets/img/banner.png');
                width: 100%;
                height: 14.5rem;
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }
        }



        .buyBoxList {
            max-width: 14rem;
            margin: 0 auto;
            margin-top: 1rem;
        }

        .buyBox {
            padding: 0.6rem;
            background-color: #fff;
            text-align: left;
            margin-bottom: 20px;

            .label {
                padding: 0.05rem 0.1rem;
                line-height: 0.3rem;
                width: 0.8rem;
                border-radius: 0.08rem;
                background-color: rgba(255, 244, 244, 1);
                color: rgba(230, 0, 18, 100);
                font-size: 0.16rem;
                text-align: center;
            }

            .title {
                color: rgba(51, 51, 51, 100);
                font-size: 0.36rem;
                line-height: 0.8rem;
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .content {
                color: rgba(102, 102, 102, 100);
                font-size: 0.22rem;
                line-height: 0.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: box;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .colorBox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 1rem;

                span {
                    width: 0.2rem;
                    height: 0.2rem;
                    border-radius: 0.1rem;
                    display: block;
                    position: relative;
                    margin-right: 0.5rem;
					cursor: pointer;

                }

                .active {
                    &:after {
                        border: 1px solid #232323;
                        content: "";
                        width: 0.26rem;
                        height: 0.26rem;
                        border-radius: 0.26rem;
                        position: absolute;
                        top: -0.03rem;
                        left: -0.03rem;
                    }
                }

            }

            .price {
                color: rgba(51, 51, 51, 100);
                font-size: 0.3rem;
                line-height: 0.65rem;
                font-weight: bold;
            }

            .buttonBox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 0.5rem 0;

                .buyNow {
                    padding: 0.05rem 0.2rem;
                    border-radius: 0.2rem;
                    background-color: rgba(37, 37, 37, 1);
                    color: rgba(255, 255, 255, 100);
                    font-size: 0.24rem;
                    line-height: 0.4rem;
                    border: 1px solid #252525;
                    margin-right: 0.3rem;
                }

                .moreInfo {
                    padding: 0.05rem 0.2rem;
                    border-radius: 0.2rem;
                    background-color: #fff;
                    color: #252525;
                    font-size: 0.24rem;
                    line-height: 0.4rem;
                    border: 1px solid #252525;
                }
            }

            .picBox {
                img {
                    width: 100%;
                }
            }
        }

        .buyBox2 {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }


    }
</style>