<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox pc_box">
            <el-carousel :interval="5000" height="10rem">
                <el-carousel-item v-for="item in 3" :key="item">
                    <!-- <div class="bannerImg_contain" :style="{'background-image':'url(../assets/img/banner.png)'}"></div> -->
                    <div class="bannerImg_contain"></div>
                </el-carousel-item>
            </el-carousel>
            <div class="productBox">
                <swiper :options="swiperOptions" ref="mySwiper">
                    <swiper-slide v-for="item in 5">
                        <img class="productImg" src="../assets/img/ad.png" alt="">
                        <p class="productTitle">t30</p>
                    </swiper-slide>
                </swiper>
                <div class="navgationBox">
                    <div class=" iconfont icon-shangyiye" @click="slidePrev">
                    </div>
                    <div class=" iconfont icon-xiayiye" @click="slideNext">
                    </div>
                </div>

            </div>

        </div>
        <div class="bannerBox phone_box">
            <el-carousel :interval="5000" height="8rem" trigger="click">
                <el-carousel-item v-for="item in 3" :key="item">
                    <div class="bannerImg_contain"></div>
                </el-carousel-item>
            </el-carousel>
            <div class="productBox">
                <swiper :options="swiperOptions_phone">
                    <swiper-slide v-for="item in 5">
                        <img class="productImg" src="../assets/img/ad.png" alt="">
                        <p class="productTitle">t30</p>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- 精选推荐 -->

        <div>
            <div class="moduleTitleBox">
                <div class="moduleTitle">精选推荐</div>
                <div class="moduleContent">士兵要的不是望远镜，而是地图</div>
            </div>
            <el-row>
                <el-col :xs="24" :sm="24"  :md="12" :lg="12" :xl="12">
                    <div class=""></div>
                </el-col>
                 <el-col :xs="24" :sm="24"  :md="12" :lg="12" :xl="12">
                     <div>2</div>
                     <div>3</div>
                </el-col>
            </el-row>


        </div>






    </div>
</template>

<script>
    export default {
        name: 'index',
        props: {},
        data() {
            return {
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
        methods: {
            slidePrev() {
                this.$refs.mySwiper.swiperInstance.slidePrev()
            },
            slideNext() {
                this.$refs.mySwiper.swiperInstance.slideNext()
            },
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

            .productBox {
                max-width: 14rem;
                padding: 0.5rem;
                margin: 0 auto;
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 3px 4px 20px 6px rgba(173, 173, 173, 0.06);
                position: relative;
                top: -3rem;
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

            .productBox {
                // margin: 0 15px;
                padding: 15px;

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
        //精选推荐
        .moduleTitleBox{
            text-align: center;
            .moduleTitle{
                color: #333;
                font-size: 0.7rem;
                font-weight: bold;
                position: relative;
                margin: 0 auto;
                width: 5rem;
                z-index: 2;
                &::before{
                    content: "";
                    position: absolute;
                    bottom: 5px;
                    border-bottom: 8px solid rgba(230, 0, 18, 0.8);
                    left: calc( 50% - .35rem);
                    width: 0.7rem;
                    z-index: 1;
                }
            }
            .moduleContent{
                font-size: 0.3rem;
                color: #666;
                line-height: 0.5rem;
            }
        }


    }
</style>