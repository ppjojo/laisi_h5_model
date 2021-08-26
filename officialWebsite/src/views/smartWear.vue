<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <swiper :options="swiperOptions_bannner" @click-slide="bannerLink">
                <swiper-slide v-for="item in banner">
                    <video v-if="item.pictureVideo.indexOf('.mp4')!='-1'" :src="item.pictureVideo" muted="" autoplay="" loop="" width="100%"></video>
					<div class="bannerImg_contain" v-else  :style="{'background-image':'url('+item.pictureVideo+')'}"></div>
                </swiper-slide>
            </swiper>
        </div>



        <div style="padding-bottom:1rem" class="mainContent">
            <div class="buyBoxList">
                <el-row>
                    <el-col class="oneDiv" v-if="list.length>0">
                        <div class="buyBox buyBox2">
                            <div style="width:50%;" class="textBox">
                                <div class="title">
                                     <div class="label" v-if="list[0].ifNewProduct==1">新品</div>{{list[0].productName}}</div>
                                <div class="content">{{list[0].productDes}}</div>
                                <div class="colorBox">
                                    <span v-for="(item,index) in list[0].productAllPictureList"
                                        :class="index==colorIndex&&hoverIndex==0?'active':''"
                                        @mouseover="mouseOver(0,index)" @mouseleave="mouseLeave"
                                        :style="{backgroundColor:item.pictureColor}"></span>
                                </div>
                                <div class="price">{{list[0].productPrice}}</div>
                                <div class="buttonBox">
                                    <div class="buyNow" @click="buyNow(list[0])">立即购买</div>
                                    <div class="moreInfo" @click="gotoProductDetail(list[0])">了解更多</div>
                                </div>
                            </div>
                            <div class="picBox" style="width:50%">
                                <img :src="hoverIndex==0?list[0].productAllPictureList[colorIndex].pictureVideo:list[0].productPagePic"
                                    alt="">
                            </div>
                        </div>
                    </el-col>
                    <el-col>
                        <el-row class="">
                            <template v-for="(item,index) in list">
                                <el-col v-if="index>0" :xs="24" :sm="24" :md="12" :lg="12" :xl="12"
                                    style="padding:0 0.1rem ;box-sizing: border-box;">
                                    <div class="buyBox">
                                        <div class="textBox">
                                            <div class="title">
                                                 <div class="label" v-if="item.ifNewProduct==1">新品</div>{{item.productName}}</div>
                                            <div class="content">{{item.productDes}}</div>
                                            <div class="colorBox">
                                                <span v-for="(color,cindex) in item.productAllPictureList"
                                                    :class="cindex==colorIndex&&hoverIndex==index?'active':''"
                                                    @mouseover="mouseOver(index,cindex)" @mouseleave="mouseLeave"
                                                    :style="{backgroundColor:color.pictureColor}"></span>
                                            </div>
                                            <div class="price">{{item.productPrice}}</div>
                                            <div class="buttonBox">
                                                <div class="buyNow" @click="buyNow(item)">立即购买</div>
                                                <div class="moreInfo" @click="gotoProductDetail(item)">了解更多</div>
                                            </div>
                                        </div>
                                        <div class="picBox" style="width:100%">
                                            <img :src="hoverIndex==index?item.productAllPictureList[colorIndex].pictureVideo:item.productPagePic"
                                                alt="">
                                        </div>
                                    </div>
                                </el-col>
                            </template>

                        </el-row>


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
                hoverIndex: null,
                colorIndex: null,
                banner: [],
                swiperOptions_bannner: {
                    spaceBetween: 0,
                    loop: true,
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper 
                    observeParents: true //修改swiper的父元素时，自动初始化swiper 

                },
            }
        },
        computed: {

        },
        mounted() {


        },
        created() {
            this.getBanner()
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
            getGoods() {
                getAllProduct({
                    productBelong: '1'
                }).then(res => {
                    this.list = res.data;
                })
            },
            getBanner() {
                getAllPicture({
                    pictureBelong: 6,
                    pictureType: 0
                }).then(res => {
                    this.banner = res.data;
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
        .contain {
            .mainContent {
                z-index: 2;
                position: relative;
            }

            .bannerBox {
                .bannerImg_contain {
                    background-image: url('../assets/img/banner.png');
                    width: 100%;
                    height: 9.75rem;
                    background-size: contain;
                    background-position: 50% 50%;
                    background-repeat: no-repeat;
                }
            }
        }
    }

    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;

            .bannerBox {
                .bannerImg_contain {
                    background-image: url('../assets/img/banner.png');
                    width: 100%;
                    height: 9.75rem;
                    background-size: cover;
                    background-position: 50% 50%;
                    background-repeat: no-repeat;
                }
            }
        }
    }

    .contain {


        background-color: rgb(246, 248, 251);

        .buyBoxList {
            max-width: 12rem;
            margin: 0 auto;
            margin-top: -4rem;
            position: relative;
            z-index: 2;

            .buyBox {
                
                background-color: #fff;
                text-align: left;
                margin-bottom: 0.2rem;
                min-height: 7.8rem;
                padding-right: 0.5rem;
                .textBox{
                    padding: 0.5rem;
                }


                .title {
                    display: flex;
                    align-items: center;

                    .label {
                        padding: 0rem 0.05rem;
                        line-height: 0.3rem;
                        height: 0.3rem;
                         min-width: 0.4rem;
                        border-radius: 0.08rem;
                        background-color: #fff4f4;
                        color: #e60012;
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
                        box-shadow: 2px 2px 5px 1px #999;

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
                    text-align: right;

                    img {

                        width: 4.2rem;
                    }
                }
            }

            .buyBox2 {
                display: flex;
                justify-content: space-between;
                height: 5rem;
                min-height: 5rem;

                .picBox {
                    img {
                        max-width: 100%;
                        width: 5rem;
                    }
                }

                // align-items: flex-end;
            }

            .oneDiv {
                padding: 0 0.1rem;
                box-sizing: border-box;

                .buyBox {
                    background-color: transparent;
                    background-image: url("../assets/img/smartWear/bg.png");
                    background-size: cover;
                }
            }

        }




    }
</style>