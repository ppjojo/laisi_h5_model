<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox " :style="{'background-image':'url('+banner.pictureVideo+')'}">
        </div>
        <!-- 核心功能 -->
        <div class="keyBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/solution/key-title.png" class="moduleTitleImg" alt="">
            </div>
            <div>
                <el-row>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-1.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-2.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-3.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-4.png" alt="">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-5.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-6.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-7.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/key-8.png" alt="">
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 系统架构 -->
        <div class="systemBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/solution/xtjg.png" class="moduleTitleImg" alt="">
            </div>
            <div class="systemDiv">
                <img style="margin-bottom:1rem;" src="../assets/img/solution/xtjg-1.png" alt="">
                <img src="../assets/img/solution/xtjg-2.png" alt="">
            </div>
        </div>
        <!-- 产品优势 -->
        <div class="advantageBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/solution/advantage.png" class="moduleTitleImg" alt="">
            </div>
            <div>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>学生生信息一键导入，最多可支持48根智能跳绳同时运行 <span>。</span> </p>
                            <div class="label">01</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>蓝牙实时传输数据，可覆盖200平方米训练场地 <span>。</span> </p>
                            <div class="label">02</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>支持倒计时、倒计数训练模式 <span>。</span> </p>
                            <div class="label">03</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>支持批量管理75派跳绳设备 <span>。</span> </p>
                            <div class="label">04</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>历史数据云端存储，随时查看学生成绩及趋势图 <span>。</span> </p>
                            <div class="label">05</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>数据实时传输至专有APP、可视化管理分析学生成绩 <span>。</span> </p>
                            <div class="label">06</div>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>
        <!-- 产品定制 -->
        <div class="customizedBox">
            <div class="bg">
                <div class="customizedDiv">
                    <img src="../assets/img/solution/cpdz.png" alt="">
                </div>
            </div>
        </div>
        <!-- 合作案例 -->
        <div class="cooperationBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/solution/cooperate-title.png" class="moduleTitleImg" alt="">
            </div>
            <div>
                <el-row>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-1.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-2.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-3.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-4.png" alt="">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-5.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-6.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-7.png" alt="">
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                        <img src="../assets/img/solution/cooperate-8.png" alt="">
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 定制样式 -->
        <div class="styleBox">
            <div class="moduleTitleBox">
                <img src="../assets/img/solution/style-title.png" class="moduleTitleImg" alt="">
            </div>
            <div>
                <div class="smallTitle">基于T20</div>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
                        <img src="../assets/img/solution/style-1.png" alt="">
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <div class="info">
                            <div class="infoTitle">联合品牌</div>
                            <div class="infoContent">直接使用我司型号核准正号（CMIIT)
                                及CMA检测报告；机身需保留75派logo
                                亚克力盖板颜色按客户需求配色。</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <div class="info">
                            <div class="infoTitle">单品牌</div>
                            <div class="infoContent">机身logo按客户需求定制、亚克力盖板
                                颜色按客户需求配色<br>注：需重新认证（无委认证型号核准、
                                CMA认证，预计时间约40-45天）</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
                        <img src="../assets/img/solution/style-2.png" alt="">
                    </el-col>
                </el-row>
            </div>
            <div>
                <div class="smallTitle">基于T20</div>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
                        <img src="../assets/img/solution/style-3.png" alt="">
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <div class="info">
                            <div class="infoTitle">联合品牌</div>
                            <div class="infoContent">直接使用我司型号核准正号（CMIIT)
                                及CMA检测报告；机身需保留75派logo
                                （尾塞部分），机身颜色可选铁灰、红
                                色、蓝色、黑色</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <div class="info">
                            <div class="infoTitle">单品牌</div>
                            <div class="infoContent">机身logo按客户需求定制、机身颜色
                                可选铁灰、红色、蓝色、黑色，尾塞
                                logo按客人需求定制（需新开磨具，
                                磨具费用约32000（定制方承担）<br>注：需重新认证（无委认证型号核准、
                                CMA认证，预计时间约40-45天）</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
                        <img src="../assets/img/solution/style-4.png" alt="">
                    </el-col>
                </el-row>
            </div>
            <div>
                <div class="smallTitle">基于T18</div>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">

                        <img src="../assets/img/solution/style-5.png" alt="">
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <div class="info">
                            <div class="infoTitle">联合品牌</div>
                            <div class="infoContent">直接使用我司型号核准正号（CMIIT)
                                及CMA检测报告；机身需保留75派logo
                                （电池尾盖），可选黑色、白色、粉色
                                蓝色、黄色</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <div class="info">
                            <div class="infoTitle">单品牌</div>
                            <div class="infoContent">机身logo按客户需求定制（移印）、
                                可选黑色、白色、粉色、蓝色、黄色
                                尾塞logo按客人需求定制（需新开磨
                                具，磨具费用约32000（定制方承担）<br>注：需重新认证（无委认证型号核准
                                CMA认证，预计时间约40-45天）</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
                        <img src="../assets/img/solution/style-6.png" alt="">
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
        name: 'HelloWorld',
        props: {},
        data() {
            return {
                banner:[]
            }
        },
        mounted() {},
        created() {
            this.getBanner()
        },
        methods: {
             getBanner() {
                getAllPicture({
                    pictureBelong: 10,
                    pictureType: 0
                }).then(res => {
                    this.banner = res.data[0]
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
            background-image: url('../assets/img/banner.png');
            width: 100%;
            height: 9rem;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
        }

        .keyBox {
            max-width: 14.2rem;
            margin: 0 auto;
            margin-top: 1rem;

            .el-col {
                padding: 0 0.1rem 0.2rem 0.1rem;

                img {
                    width: 100%;
                }
            }
        }

        .systemBox {
            max-width: 14.4rem;
            margin: 0 auto;
            margin-top: 1rem;

            .systemDiv img {
                width: 100%;
                padding: 0 0.2rem;
            }
        }

        .advantageBox {
            max-width: 14.2rem;
            margin: 0 auto;
            margin-top: 1rem;

            .el-row {
                .el-col {
                    padding: 0 0.1rem 0.2rem 0.1rem;
                }
            }

            .advantageDiv {
                overflow: hidden;
                padding: 0.75rem 0;
                background-color: #fff;
                position: relative;

                p {
                    text-align: left;
                    font-size: 0.3rem;
                    padding: 0 0.75rem;
                    color: #333;
                    line-height: 0.5rem;
                    border-left: 0.1rem solid transparent;


                    span {
                        font-size: 0.3rem;
                        color: red;
                    }
                }

                .label {
                    font-family: DINCondensed-Bold;
                    position: absolute;
                    font-size: 2rem;
                    color: #F4F4F4;
                    right: -0.3rem;
                    bottom: -1rem;
                    transform: rotate(-45deg);
                }

                &:hover {
                    background: linear-gradient(to right, #FFFFFF, rgba(255, 255, 255, 0.5), #E1FEFF);

                    p {
                        border-left: 0.1rem solid red;
                    }

                    .label {
                        color: #fff;
                    }
                }

                &:after {}
            }

        }

        .customizedBox {
            padding: 1rem 0 3rem 0;

            .bg {
                background-image: url('../assets/img/solution/cpdz-bg.png');
                width: 100%;
                height: 6.5rem;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
                position: relative;

                .customizedDiv {
                    width: 100%;
                    margin: 0 auto;
                    position: absolute;
                    bottom: -1.5rem;
                    text-align: center;

                    img {
                        max-width: 90%;
                        width: 14rem;
                    }
                }
            }
        }

        .cooperationBox {
            max-width: 14.2rem;
            margin: 0 auto;
            // margin-top: 1rem;

            .el-row {
                .el-col {
                    padding: 0 0.1rem 0.2rem 0.1rem;

                    img {
                        width: 100%;
                    }
                }
            }
        }

        .styleBox {
            max-width: 14.2rem;
            margin: 0 auto;
            margin-top: 1rem;

            .smallTitle {
                color: #333;
                font-size: 0.58rem;
                line-height: 1rem;
                margin-bottom: 1rem;
            }

            .info {
                padding: 0.2rem 0.5rem;
                text-align: left;

                .infoTitle {
                    font-size: 0.3rem;
                    line-height: 1rem;
                    color: #333;
                    font-weight: bold;
                }

                .infoContent {
                    font-size: 0.28rem;
                    line-height: 0.4rem;
                    color: #333;
                }
            }

            .el-row {
                padding-bottom: 1rem;

                .el-col {
                    padding: 0 0.1rem 0.2rem 0.1rem;

                    img {
                        width: 100%;
                        box-shadow: 0px 0px 10px #999;
                    }
                }
            }
        }


    }
</style>