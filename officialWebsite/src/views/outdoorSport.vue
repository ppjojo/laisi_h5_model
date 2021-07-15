<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <swiper :options="swiperOptions_bannner" @click-slide="bannerLink">
                <swiper-slide v-for="item in banner"   >
                    <video v-if="item.pictureVideo.indexOf('.mp4')!='-1'" :src="item.pictureVideo" muted="" autoplay="" loop="" width="100%"></video>
					<div class="bannerImg_contain"  v-else :style="{'background-image':'url('+item.pictureVideo+')'}"></div>
                </swiper-slide>
            </swiper>

            <div class="productBox pc_box">
                <swiper :options="swiperOptions" ref="pcSwiper" v-if="list.length>1"  @click-slide="swipergotoProductDetail">
                    <swiper-slide v-for="item in list" >
                        <div >
                            <img class="productImg"
                                :src="item.navPic"
                                alt="">
                            <p class="productTitle">{{item.productName}}</p>
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="navgationBox">
                    <div class=" iconfont " @click="slidePrev">
                        <img style="width:0.36rem;" src="../assets/img/outdoorSport/iconLeft.png" alt="">
                    </div>
                    <div class=" iconfont " @click="slideNext">
                        <img style="width:0.36rem;" src="../assets/img/outdoorSport/iconRight.png" alt="">
                    </div>
                </div>

            </div>
            <div class="productBox phone_box">
                <swiper :options="swiperOptions_phone" ref="phoneSwiper" v-if="list.length>1"
                    style="background-color:#fff">
                    <swiper-slide v-for="item in list" @click-slide="swipergotoProductDetail">
                        <div>
                            <img class="productImg"
                                :src="item.navPic"
                                alt="">
                            <p class="productTitle">{{item.productName}}</p>
                        </div>


                    </swiper-slide>
                </swiper>
            </div>

        </div>
        <!-- 精选推荐 -->

        <div>

            <div class="buyBoxList">
                <div class="moduleTitleBox">
                    <img class="moduleTitleImg" src="../assets/img/outdoorSport/jxtj.png" alt="">
                </div>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="commandList.length>0"
                        style="padding:0 10px ;box-sizing: border-box;">
                        <div class="buyBox">
                            
                            <div class="title">
                                <div class="label" v-if="commandList[0].ifNewProduct==1">新品</div>
                                {{commandList[0].productName}}
                            </div>
                            <div class="content">{{commandList[0].productDes}}</div>
                            <div class="colorBox">
                                <span v-for="(item,index) in commandList[0].productAllPictureList"
                                    :class="index==colorIndex&&hoverIndex==0?'active':''"
                                    @mouseover="mouseOver(0,index)" @mouseleave="mouseLeave"
                                    :style="{backgroundColor:item.pictureColor}"></span>
                            </div>
                            <div class="price">{{commandList[0].productPrice}}</div>
                            <div class="buttonBox">
                                <div class="buyNow" @click="buyNow(commandList[0])">立即购买</div>
                                <div class="moreInfo" @click="gotoProductDetail(commandList[0])">了解更多</div>
                            </div>
                            <div class="picBox">
                                <img style="max-height:3.9rem;"
                                    :src="hoverIndex==0?commandList[0].productAllPictureList[colorIndex].pictureVideo:commandList[0].productPagePic"
                                    alt="">
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                        style="padding:0 0.1rem;box-sizing: border-box;">
                        <template v-for="(item,index) in commandList">
                            <div v-if="index>0" class="buyBox buyBox2">
                                <div style="width:60%">

                                    <div class="title">
                                        <div class="label" v-if="item.ifNewProduct==1">新品</div>{{item.productName}}
                                    </div>
                                    <div class="content">{{item.productDes}}</div>
                                    <div class="colorBox">
                                        <span v-for="(color,cindex) in item.productAllPictureList"
                                            :class="cindex==colorIndex&&hoverIndex==index?'active':''"
                                            @mouseover="mouseOver(index,cindex)" @mouseleave="mouseLeave"
                                            :style="{backgroundColor:color.pictureColor}"></span>
                                    </div>
                                    <div class="price">{{item.productPrice}}</div>
                                    <div class="buttonBox">
                                        <div class="buyNow"  @click="buyNow(item)">立即购买</div>
                                        <div class="moreInfo" @click="gotoProductDetail(item)">了解更多</div>
                                    </div>
                                </div>
                                <div class="picBox" style="width:40%">
                                    <img :src="hoverIndex==index?item.productAllPictureList[colorIndex].pictureVideo:item.productPagePic"
                                        alt="">
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
                list: [],
                banner: [],
                commandList: [],
                hoverIndex: null,
                colorIndex: null,
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
                    // autoplay: {
                    //     delay: 1000,
                    // },
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
            mouseOver(index, cindex) { //sku小图鼠标移进移出
                this.colorIndex = cindex;
                this.hoverIndex = index;
            },
            mouseLeave() {
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
            getGoods() {
                getAllProduct({
                    productBelong: '2'
                }).then(res => {
                    this.list = res.data || [];
                    res.data.forEach(d => {
                        if (d.ifShow == 1) {
                            this.commandList.push(d);
                        }
                    })
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
            swipergotoProductDetail(index,realIndex) {
                 let item=this.list[realIndex]
                this.$router.push({
                    path: "productDetail",
                    query: {
                        id: item.id
                    }
                })
            },
             buyNow(item){
                 if(item.productTianmaoLink)
                 window.location.href=item.productTianmaoLink
             },
             bannerLink(index,realIndex){
                let item=this.banner[realIndex]
				if(item.pictureProductLink) {
                    window.location.href=item.pictureProductLink 
                }
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
            .bannerImg_contain {
                background-image: url('../assets/img/banner.png');
                width: 100%;
                height: 9.54rem;
                background-size: contain;
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }

            .productBox {
                max-width: 12rem;
                padding: 0.6rem;
                margin: 0 auto;
                height: 4.08rem;
                box-sizing: border-box;
                position: absolute;
                bottom: -0rem;
                left: calc(50% - 6rem);
                z-index: 8;
                background-image: url("../assets/img/outdoorSport/product-bg.png");
                background-size: cover;


                .productImg {
                    width: 1.7rem;
                    height: 1.7rem;
                }

                .productTitle {
                    color: #333;
                    font-size: 0.18rem;
                    line-height: 0.3rem;
                }

                .navgationBox {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-top: 0.5rem;

                    .iconfont {

                        padding:0 0.35rem;
                    }
                }
            }



        }
    }

    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;

            .bannerImg_contain {
                background-image: url('../assets/img/banner.png');
                width: 100%;
                height: 9.54rem;
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }

            .phone_box {
                display: block;
            }

            .pc_box {
                display: none;
            }

            .productBox {
                // background-image: url("../assets/img/outdoorSport/product-bg.png");
                // background-size: cover;
                background-color: #fff;
                padding: 15px;
                height: 4.76rem;
                margin-top: -1rem;
                position: relative;
                z-index: 2;
                box-sizing: border-box;


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


        }



        .buyBoxList {
            max-width: 12rem;
            margin: 0 auto;
            margin-top: 0.5rem;
            padding-bottom: 1rem;
        }

        .buyBox {
            padding: 0.5rem;
            background-color: #fff;
            text-align: left;
            box-sizing: border-box;
            margin-bottom: 0.2rem;
            height: 7.8rem;
            padding-bottom: 0;

            .title {
                display: flex;
                align-items: center;

                .label {
                    padding: 0rem 0.05rem;
                    line-height: 0.3rem;
                    height: 0.3rem;
                    min-width: 0.4rem;
                    border-radius: 0.08rem;
                    background-color: rgba(255, 244, 244, 1);
                    color: rgba(230, 0, 18, 100);
                    font-size: 0.13rem;
                    text-align: center;
                    margin-right: 0.1rem;
                }

                color: rgba(51, 51, 51, 100);
                font-size: 0.28rem;
                line-height: 0.5rem;
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .content {
                color: rgba(102, 102, 102, 100);
                font-size: 0.16rem;
                line-height: 0.4rem;
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
                height: 0.6rem;

                 span {
                        width: 18px;
                        height: 18px;
                        border-radius: 9px;
                        display: block;
                        position: relative;
                        margin-right: 0.2rem;
                        cursor: pointer;

                    }

                    .active {
                        &:after {
                            border: 1px solid #232323;
                            content: "";
                            width: 24px;
                            height: 24px;
                            border-radius: 24px;;
                            position: absolute;
                            top: -4px;
                            left: -4px;
                        }
                    }

            }

            .price {
                color: rgba(51, 51, 51, 100);
                font-size: 0.24rem;
                line-height: 0.65rem;
                font-weight: bold;
            }

            .buttonBox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 0.25rem 0;

                .buyNow {
                    text-align: center;
                    min-width: 0.8rem;
                    height: 0.32rem;
                    border-radius: 0.2rem;
                    background-color: rgba(37, 37, 37, 1);
                    color: rgba(255, 255, 255, 100);
                    font-size: 0.12rem;
                    line-height: 0.32rem;
                    border: 1px solid #252525;
                    margin-right: 0.28rem;
                }

                .moreInfo {
                    text-align: center;
                    min-width: 0.8rem;
                    height: 0.32rem;
                    border-radius: 0.2rem;
                    background-color: #fff;
                    color: #252525;
                    font-size: 0.12rem;
                    line-height: 0.32rem;
                    border: 1px solid #252525;
                }
            }

            .picBox {
                img {
                    width: 4.4rem;
                }
            }
        }

        .buyBox2 {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 3.8rem;
            padding-bottom: 0.5rem;
            .picBox {
                img {
                    width: 2.15rem;
                }
            }
        }


    }
</style>