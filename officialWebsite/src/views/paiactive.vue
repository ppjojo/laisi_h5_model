<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <div class="bannerImg_contain" v-if="banner.length>0"
                :style="{'background-image':'url('+banner[0].pictureVideo+')'}"></div>
        </div>

        <!-- AIOT时代下 -->
        <div class="aiotbg">
            <div class="bg"></div>
            <div class="aiotBox">
                <div class="moduleTitleBox">
                    <img src="../assets/img/paiactive/aiotTitle.png" class="moduleTitleImg" alt="">
                </div>
                <div class="aiot_imgBox">
                    <el-row>
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="padding:0 0.1rem">
                            <img src="../assets/img/paiactive/Aiot-1.png"
                                class="wow  animate__animated animate__bounceInUp  " data-wow-duration="1s" alt="">
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="padding:0 0.1rem">
                            <img src="../assets/img/paiactive/Aiot-2.png"
                                class="wow  animate__animated animate__bounceInUp " data-wow-duration="1s" alt="">
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="padding:0 0.1rem">
                            <img src="../assets/img/paiactive/Aiot-3.png"
                                class="wow  animate__animated animate__bounceInUp " data-wow-duration="1s" alt="">
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="padding:0 0.1rem">
                            <img src="../assets/img/paiactive/Aiot-4.png"
                                class="wow  animate__animated animate__bounceInUp " data-wow-duration="1s" alt="">
                        </el-col>
                    </el-row>

                </div>
            </div>
        </div>

        <!-- app界面展示 -->
        <div class="InterfaceBox pc_box">
            <div class="Interface_Contain">
                <div class="imgBox">
                    <swiper :options="swiperOptions">
                        <swiper-slide v-for="item in 3">
                            <img src="../assets/img/paiactive/appshow-1.png" alt="">
                        </swiper-slide>
                    </swiper>
                </div>
                <!-- <div class="typeBox">
                    <div class="type_botton">跳绳</div>
                    <div class="type_botton">手表</div>
                    <div class="type_botton">腕力球</div>
                    <div class="type_botton">健腹轮</div>

                </div> -->
                <div class="dataBox">
                    <div class="title">搭配手机，掌握身体精准数据</div>
                    <div class="numBox">
                        <div class="numDiv">
                            <div class="num">42.2</div>
                            <div class="explain">
                                消耗（千卡）
                            </div>
                        </div>
                        <div class="numDiv">
                            <div class="num">9999</div>
                            <div class="explain">
                               跳绳个数
                            </div>
                        </div>
                        <div class="numDiv">
                            <div class="num">168</div>
                            <div class="explain">
                                速率（BPM）
                            </div>
                        </div>
                        <div class="numDiv">
                            <div class="num">1:28:56</div>
                            <div class="explain">
                               跳绳时长
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="phone_box  InterfaceBox_phone">
            <swiper :options="swiperOptions2">
                <swiper-slide v-for="item in 3">
                    <img src="../assets/img/paiactive/appshow-1.png" alt="">
                </swiper-slide>
            </swiper>
        </div>

        <!-- 运营模块展示 -->
        <div class="activityBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/paiactive/operatTitle.png" class="moduleTitleImg" alt="">
            </div>
            <div class="activity_imgBox">
                <el-row>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <img src="../assets/img/paiactive/activity-1.png" alt="">
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <img src="../assets/img/paiactive/activity-2.png" alt="">
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <img src="../assets/img/paiactive/activity-3.png" alt="">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/paiactive/activity-4.png" alt="">
                    </el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/paiactive/activity-5.png" alt="">
                    </el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/paiactive/activity-6.png" alt="">
                    </el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/paiactive/activity-7.png" alt="">
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 地图 -->
        <div class="mapBox">
            <img src="../assets/img/paiactive/map.png" alt="">
        </div>

        <!-- 成为合作伙伴 -->
        <div class="parterBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/paiactive/panterTitle.png" class="moduleTitleImg" alt="">
            </div>
            <div class="parter_contentBox">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6 " style="padding:0 0.1rem">
                        <div class="detailBox">
                            <div class="label">01</div>
                            <div class="bg">
                                <img src="../assets/img/paiactive/bg-parter.png" alt="">
                            </div>
                            <div class="title">合作宗旨<span>.</span></div>
                            <div class="content">为第三方厂商产品赋值
                                提升其产品附加值，实
                                现双方互利共赢。</div>
                            <div class="iconBox">
                                <img class="img2" src="../assets/img/paiactive/1-2.png" alt="">
                                <img class="img1" src="../assets/img/paiactive/1-1.png" alt="">
                            </div>
                        </div>

                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="padding:0 0.1rem">
                        <div class="detailBox">
                            <div class="label">02</div>
                            <div class="bg">
                                <img src="../assets/img/paiactive/bg-parter.png" alt="">
                            </div>
                            <div class="title">我们能提供什么<span>.</span></div>
                            <div class="content">设备基础接入，并进行
                                设备管理，以及对厂商
                                资源的优先配置。</div>
                            <div class="iconBox">
                                <img class="img2" src="../assets/img/paiactive/2-2.png" alt="">
                                <img class="img1" src="../assets/img/paiactive/2-1.png" alt="">
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="padding:0 0.1rem">
                        <div class="detailBox">
                            <div class="label">03</div>
                            <div class="bg">
                                <img src="../assets/img/paiactive/bg-parter.png" alt="">
                            </div>
                            <div class="title">我们的优势<span>.</span></div>
                            <div class="content">百万健身运动爱好者的首先健康管理平台。</div>
                            <div class="iconBox">
                                <img class="img2" src="../assets/img/paiactive/3-2.png" alt="">
                                <img class="img1" src="../assets/img/paiactive/3-1.png" alt="">
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" style="padding:0 0.1rem">
                        <div class="detailBox">
                            <div class="label">04</div>
                            <div class="bg">
                                <img src="../assets/img/paiactive/bg-parter.png" alt="">
                            </div>
                            <div class="title">我们的合作伙伴<span>.</span></div>
                            <div class="content">75派、联升创投
                                alves、Ray Nigel
                                BESTRAY
                                …
                            </div>
                            <div class="iconBox">
                                <img class="img2" src="../assets/img/paiactive/4-2.png" alt="">
                                <img class="img1" src="../assets/img/paiactive/4-1.png" alt="">
                            </div>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>

        <!-- 加入我们 -->
        <div class="joinUsBox">
            <div class="buttonBox" @click="joinUs">
                加入我们
            </div>
        </div>






    </div>
</template>

<script>
    import WOW from '../../node_modules/wowjs/dist/wow';
    import {
        getAllPicture
    } from "@a/picture";
    export default {
        name: 'index',
        props: {},
        data() {
            return {
                banner: [],
                swiperOptions: {
                    spaceBetween: 0,
                    centeredSlides: true,
                    loop: true,
                    observer: true,
                    observeParents: true,
                    autoplay: {
                        delay: 1000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                },
                swiperOptions2: {
                    spaceBetween: 0,
                    centeredSlides: true,
                    loop: true,
                    observer: true,
                    observeParents: true,
                    autoplay: {
                        delay: 1000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                }

            }
        },
        computed: {

        },
        mounted() {
            this.getBanner()
            let wow = new WOW.WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            });
            wow.init();

        },
        created() {

        },
        methods: {
            getBanner() {
                getAllPicture({
                    pictureBelong: 9,
                    pictureType: 0
                }).then(res => {
                    this.banner = res.data;
                })
            },
            joinUs() {
                this.$router.push({
                    path: "joinUs"
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: "DINCondensed-Bold";
        src: url("../font/DINCondensed-Bold/DINCondensed-Bold.woff2") format("woff2"),
            url("../font/DINCondensed-Bold/DINCondensed-Bold.woff") format("woff"),
            url("../font/DINCondensed-Bold/DINCondensed-Bold.ttf") format("truetype"),
            url("../font/DINCondensed-Bold/DINCondensed-Bold.eot") format("embedded-opentype"),
            url("../font/DINCondensed-Bold/DINCondensed-Bold.svg") format("svg");
        font-weight: normal;
        font-style: normal;
    }

    //大于992
    @media (min-width: 992px) {
        .pc_box {
            display: block;
        }

        .phone_box {
            display: none;
        }

        .bannerBox {
            .bannerImg_contain {
                background-image: url('../assets/img/banner.png');
                width: 100%;
                height: 9.34rem;
                background-size: contain;
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }
        }
    }

    //小于992
    @media (max-width: 992px) {


        .pc_box {
            display: none;
        }

        .phone_box {
            display: block;
        }

        .bannerBox {
            .bannerImg_contain {
                background-image: url('../assets/img/banner.png');
                width: 100%;
                height: 9.34rem;
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }
        }

        .InterfaceBox_phone {
            height: 16rem;

            .swiper-container {
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

        }
    }

    .contain {

        .aiotbg {
            position: relative;
            z-index: 2;

            // .bg {
            //     position: absolute;
            //     top: 0;
            //     right: 0;
            //     width: 100%;
            //     height: 20.8rem;
            //     background-image: url("../assets/img/paiactive/aiot-bg.png");
            //     z-index: 1;
            //     background-size: cover;
            //     background-repeat: no-repeat;
            // }
        }

        .aiotBox {
            max-width: 12.4rem;
            margin: 0 auto;
            margin-top: 0.5rem;
            position: relative;
            z-index: 2;


            .aiot_imgBox {
                margin: 0rem 0.2rem;
                // display: flex;
                // justify-content: space-between;

                img {
                    width: 100%;
                    box-shadow: 2px 2px 10px #eee;
                    margin-bottom: 0.2rem;
                }
            }
        }

        .InterfaceBox {
            background-image: url('../assets/img/paiactive/app-bg.png');
            width: 100%;
            height: 6.38rem;
            background-size: cover;
            margin-top: 4rem;
            background-repeat: no-repeat;

            .Interface_Contain {
                max-width: 12rem;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;

                .imgBox {
                    width: 3.75rem;
                    position: relative;

                    .swiper-container {
                        width: 100%;
                        position: absolute;
                        height: 8.22rem;
                        top: -2.5rem;
                        left: 0;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .typeBox {
                    width: 10%;
                    margin-top: 2.5rem;

                    .type_botton {
                        width: 1.05rem;
                        height: 0.55rem;
                        line-height: 0.55rem;
                        border-radius: 8px;
                        border: 1px solid rgba(255, 255, 255, 1);
                        color: rgba(255, 255, 255, 100);
                        font-size: 0.24rem;
                        margin-bottom: 0.48rem;
                    }
                }

                .dataBox {
                    width: 50%;
                    padding-top: 1rem;
                    

                    .title {
                        color: #fff;
                        font-size: 0.32rem;
                        font-weight: bold;
                        text-align: left;
                        line-height: 0.5rem;
                    }

                    .numBox {
                        text-align: left;
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;

                        .numDiv {
                            width: 25%;
                            margin-right: 25%;
                            margin-top: 0.5rem;
                            text-align: center;

                            .num {
                                color: #fff;
                                font-size: 0.57rem;
                                font-weight: bold;
                                line-height: 0.8rem;
                            }

                            .explain {
                                // display: flex;
                                // justify-content: flex-start;
                                color: #fff;
                                font-size: 0.16rem;
                                line-height: 0.3rem;
                            }
                        }

                    }
                }
            }

        }


        .activityBox {
            max-width: 12.4rem;
            margin: 0 auto;
            margin-top: 0.5rem;

            .activity_imgBox {

                margin: 0rem 0.2rem;
                margin-bottom: 0.5rem;

                .el-col {
                    overflow: hidden;
                    border-radius: 5px;
                    padding: 0 0.1rem;
                    margin-bottom: 0.1rem;
                }

                img {
                    width: 100%;
                    box-shadow: 2px 2px 10px #999;
                    transition: all 1s;

                    &:hover {
                        transform: scale(1.2);


                    }
                }

            }
        }

        .mapBox {
            margin-top: 1rem;

            img {
                width: 100%;
            }
        }

        .parterBox {
            max-width: 12.4rem;
            margin: 0 auto;
            margin-top: 0.5rem;

            .parter_contentBox {
                margin: 0rem 0.2rem;

                .detailBox {
                    text-align: left;
                    height: 3.96rem;
                    box-shadow: 3px 4px 20px 6px rgba(0, 0, 0, 0.06);
                    padding:0.6rem 0.35rem;
                    margin-bottom: 0.2rem;
                    position: relative;

                    .bg {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 1;
                        opacity: 0;

                        img {
                            width: 100%;
                            height: 100%;
                        }

                    }

                    .label {
                        position: absolute;
                        top: 0.1rem;
                        left: 0.3rem;
                        font-size: 1.15rem;
                        color: rgba(244, 244, 244, 0.8);
                        z-index: 2;
                        font-family: DINCondensed-Bold;
                    }


                    .title {
                        font-size: 0.25rem;
                        color: #000;
                        font-weight: bold;
                        line-height: 1rem;
                        position: relative;
                        z-index: 2;

                        span {
                            color: red;
                        }
                    }

                    .content {
                        font-size: 0.19rem;
                        color: #666;
                        line-height: 0.4rem;
                        position: relative;
                        z-index: 2;
                    }

                    .iconBox {
                        position: absolute;
                        right: 0.45rem;
                        bottom: 0.45rem;
                        width: 0.5rem;
                        z-index: 2;

                        img {
                            width: 100%;
                            height: 100%;
                        }

                        .img2 {
                            display: block;
                        }

                        .img1 {
                            display: none;
                        }
                    }

                    &:hover {

                        .title,
                        .content {
                            color: #fff;
                        }
                        .label{
                            color: rgba(244, 244, 244, 0.3);
                        }

                        .bg {
                            transition: all 0.5s;
                            opacity: 1;
                        }

                        .img1 {
                            display: block;
                        }

                        .img2 {
                            display: none;
                        }
                    }
                }
            }
        }

        .joinUsBox {
            .buttonBox {
                width: 2rem;
                height: 0.6rem;
                border-radius: 0.3rem;
                background-color: rgba(37, 37, 37, 1);
                color: #fff;
                font-size: 0.24rem;
                line-height: 0.6rem;
                margin: 0.2rem auto;
                margin-bottom: 1.5rem;
            }
        }
    }
</style>