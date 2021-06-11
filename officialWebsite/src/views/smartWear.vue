<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
             <swiper :options="swiperOptions_bannner">
                <swiper-slide v-for="item in banner">
                    <div class="bannerImg_contain" :style="{'background-image':'url('+item.pictureVideo+')'}"></div>
                </swiper-slide>
            </swiper>
        </div>
        
      

        <div style="padding-bottom:1rem" class="mainContent">
            <div class="buyBoxList">
                <el-row  >
                    <el-col style="padding:0 10px ;box-sizing: border-box;">
                        <div class="buyBox buyBox2">
                            <div style="width:60%">
                                <div class="label">新品</div>
                                <div class="title">智能健腹轮</div>
                                <div class="content">和卡莎撒谎看见爱上看见了很大了</div>
                                <div class="colorBox">
                                    <span class="active" style="background-color:#333"></span>
                                    <span style="background-color:red"></span>
                                </div>
                                <div class="price">169</div>
                                <div class="buttonBox">
                                    <div class="buyNow">立即购买</div>
                                    <div class="moreInfo">了解更多</div>
                                </div>
                            </div>
                            <div class="picBox" style="width:40%">
                                <img src="../assets/img/ad.png" alt="">
                            </div>
                        </div>
                    </el-col>
                    <el-col>
                        <el-row class="" >
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding:0 10px ;box-sizing: border-box;">
                                <div class="buyBox">
                                    <div>
                                        <div class="title">智能健腹轮</div>
                                        <div class="content">和卡莎撒谎看见爱上看见了很大了</div>
                                        <div class="colorBox">
                                            <span class="active" style="background-color:#333"></span>
                                            <span style="background-color:red"></span>
                                        </div>
                                        <div class="price">169</div>
                                        <div class="buttonBox">
                                            <div class="buyNow">立即购买</div>
                                            <div class="moreInfo">了解更多</div>
                                        </div>
                                    </div>
                                    <div class="picBox">
                                        <img src="../assets/img/ad.png" alt="">
                                    </div>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="padding:0 10px ;box-sizing: border-box;">
                                <div class="buyBox">
                                    <div>
                                        <div class="title">智能健腹轮</div>
                                        <div class="content">和卡莎撒谎看见爱上看见了很大了</div>
                                        <div class="colorBox">
                                            <span class="active" style="background-color:#333"></span>
                                            <span style="background-color:red"></span>
                                        </div>
                                        <div class="price">169</div>
                                        <div class="buttonBox">
                                            <div class="buyNow">立即购买</div>
                                            <div class="moreInfo">了解更多</div>
                                        </div>
                                    </div>
                                    <div class="picBox">
                                        <img src="../assets/img/ad.png" alt="">
                                    </div>
                                </div>
                            </el-col>
                        </el-row>


                    </el-col>
                </el-row>
            </div>


        </div>






    </div>
</template>

<script>
import {
        getAllPicture
    } from "@a/picture";
    export default {
        name: 'index',
        props: {},
        data() {
            return {
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
        created(){
             this.getBanner()
        },
        methods: {
            getBanner() {
                getAllPicture({
                    pictureBelong: 6,
                    pictureType: 0
                }).then(res => {
                    this.banner = res.data;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    //大于992
    @media (min-width: 992px) {
        .contain {
            .mainContent {
                margin-top: -3rem;
                z-index: 2;
                position: relative;
            }
        }
    }

    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;
        }
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

        background-color: rgb(246, 248, 251);

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