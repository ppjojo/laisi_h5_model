<template>
    <div class="contain">
        <div class="bannerBox ">
            <img class="qr" src="../assets/img/cooprate/qr.png" alt="">
            <el-carousel :interval="5000" height="10rem">
                <el-carousel-item v-for="item in banner" :key="item">
                    <div class="bannerImg_contain" :style="{'background-image':'url('+item.pictureVideo+')'}"></div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="typeBox">
            <img src="../assets/img/cooprate/be-1.png" alt="">
            <img src="../assets/img/cooprate/be-2.png" alt="">
            <img src="../assets/img/cooprate/be-3.png" alt="">
        </div>

        <div class="beparterBox">
            <div class="beparterDiv">
                <img src="../assets/img/cooprate/bePater-1.png" alt="">
                <img src="../assets/img/cooprate/bePater-2.png" alt="">
            </div>
        </div>

        <div class="giveBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/cooprate/give-title.png" class="moduleTitleImg" alt="">
            </div>
            <div class="giveDiv">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-1.png" alt="">
                            <div>
                                <p class="china">多设备管理</p>
                                <p class="en">Multi-device management</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-2.png" alt="">
                            <div>
                                <p class="china">运动数据云存储</p>
                                <p class="en">Cloud storage of sports data</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-3.png" alt="">
                            <div>
                                <p class="china">厂商资源优先配置</p>
                                <p class="en">Vendor resources are allocated first</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-4.png" alt="">
                            <div>
                                <p class="china">专业团队拍摄运动AI课程</p>
                                <p class="en">A professional team shoots a sports AI course</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-5.png" alt="">
                            <div>
                                <p class="china">健身达人集结分享经验</p>
                                <p class="en">Fitness enthusiasts gather to share experiences</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-6.png" alt="">
                            <div>
                                <p class="china">网络红人带货种草</p>
                                <p class="en">On the Celebrity Spokeperson</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-7.png" alt="">
                            <div>
                                <p class="china">超丰富趣味玩法免费体验</p>
                                <p class="en">Super rich fun gameplay free experience</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="giveDetail">
                            <img src="../assets/img/cooprate/give-8.png" alt="">
                            <div>
                                <p class="china">定制云端PK赛事活动</p>
                                <p class="en"> Customize cloud PK events</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="advantageBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/cooprate/advantage-title.png" class="moduleTitleImg" alt="">
            </div>
            <div class="contentBox">
                <el-row :gutter="20">
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="detailBox">
                            <div class="label">01</div>
                            <div class="title">运动健康行业<br>发展空间大 <span>。</span></div>

                        </div>

                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="detailBox">
                            <div class="label">02</div>
                            <div class="title">智能运动健康<br>市场排名靠前<span>。</span></div>

                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="detailBox">
                            <div class="label">03</div>
                            <div class="title">较强的产品研发和资源优势<span>。</span></div>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <div class="detailBox">
                            <div class="label">04</div>
                            <div class="title">拥有百万健身达人喜爱的平台<span>。</span></div>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>

        <div class="parterBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/cooprate/parter-title.png" class="moduleTitleImg" alt="">
            </div>
            <div class="parterDiv">
                <img v-for="item in parterList" :src="item.pictureVideo" alt="">
                
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getAllPicture
    } from "@a/picture";
   
    export default {
        name: 'HelloWorld',
        props: {},
        data() {
            return {
                banner: [],
                parterList:[]
            }
        },
        mounted() {},
        created() {
            this.getBanner()
            this.getParter()
        },
        methods: {
            getBanner() {
                getAllPicture({
                    pictureBelong: 3,
                    pictureType: 0
                }).then(res => {
                    this.banner = res.data;
                })
            },
            getParter() {
                getAllPicture({
                    // pictureBelong: 3,
                    pictureType: 2
                }).then(res => {
                    this.parterList = res.data;
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

    .contain {
        background: linear-gradient(to bottom, #FFFFFF, #EEF3FC, #F9FDFF, #E6FBFF, #EEF3FD);

        .bannerBox {
            .bannerImg_contain {
                background-image: url('../assets/img/banner.png');
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
            }

            .qr {
                position: fixed;
                top: 6.7rem;
                right: 10%;
                width: 3.2rem;
                z-index: 3;
            }
        }


        .typeBox {
            max-width: 14rem;
            margin: 0 auto;

            img {
                margin-top: 1.5rem;
                width: 100%;
            }
        }

        .beparterBox {
            margin-top: 1rem;
            background-image: url('../assets/img/cooprate/bePater-bg.png');
            width: 100%;
            height: 6rem;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;

            .beparterDiv {
                max-width: 14rem;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                position: relative;
                bottom: -4.5rem;

                img {
                    width: 48%;
                }
            }
        }

        .giveBox {
            max-width: 14rem;
            margin: 0 auto;
            margin-top: 3rem;

            .giveDiv {
                margin-top: 1rem;
                background-color: #FFFFFF;
                box-shadow: 3px 4px 20px 6px rgba(173, 173, 173, 0.06);
                padding: 0.8rem;
                width: 100%;

                // .el-row {
                //     margin-bottom: 0.4rem;

                //     &:last-child {
                //         margin-bottom: 0;
                //     }
                // }

                .giveDetail {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    text-align: left;
                    margin-bottom: 0.6rem;

                    img {
                        width: 1rem;
                        height: 1rem;
                        margin-right: 0.5rem
                    }

                    ;

                    .china {
                        color: #333333;
                        font-size: 0.34rem;
                        line-height: 0.5rem;
                    }

                    .en {
                        color: #999;
                        font-size: 0.2rem;
                        line-height: 0.3rem;
                    }
                }
            }
        }

        .advantageBox {
            max-width: 14.2rem;
            margin: 0 auto;
            margin-top: 1rem;

            .contentBox {
                padding: 1rem 0.1rem;

                .detailBox {
                    text-align: left;
                    height: 3.36rem;
                    box-shadow: 3px 4px 20px 6px rgba(173, 173, 173, 0.06);
                    background-color: rgba(255, 255, 255, 1);
                    padding: 0.4rem;
                    padding-bottom: 20px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.4rem;

                    .label {
                        position: absolute;
                        top: 0.5rem;
                        left: 0.3rem;
                        font-size: 1.15rem;
                        color: #F4F4F4;
                        z-index: 2;
                        font-family: DINCondensed-Bold;
                    }


                    .title {
                        font-size: 0.34rem;
                        color: #000;
                        line-height: 0.5rem;
                        position: relative;
                        z-index: 2;

                        span {
                            color: red;
                        }
                    }

                }
            }
        }

        .parterBox {
            max-width: 14.2rem;
            margin: 0 auto;
            padding-bottom: 1rem;

            .parterDiv {
                background-color: rgba(255, 255, 255, 1);
                box-shadow: 3px 4px 20px 6px rgba(173, 173, 173, 0.06);
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-top: 1rem;
                padding: 1rem 1rem 0.5rem 1rem;

                img {
                    width: 21%;
                    height: 1rem;
                    margin-bottom: 0.5rem;
                }

            }
        }





    }
</style>