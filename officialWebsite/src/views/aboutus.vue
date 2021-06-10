<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <!-- <div class="bannerImg_contain" :style="{'background-image':'url(../assets/img/banner.png)'}"></div> -->
            <div class="bannerImg_contain">
                <div class="child_nav">
                    <ul>
                        <li :class="active==1?'active':''" @click="active=1;goAnchor('aboutus_link')"><a>企业简介</a></li>
                        <li :class="active==2?'active':''" @click="active=2;goAnchor('brand_link')"><a>品牌介绍</a></li>
                        <li :class="active==3?'active':''" @click="active=3;goAnchor('culture_link')"><a>企业文化</a></li>
                        <li :class="active==4?'active':''" @click="active=4;goAnchor('thing_link')"><a>大事记</a></li>
                        <li :class="active==5?'active':''" @click="active=5;goAnchor('contact_link')"><a>联系我们</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <!-- 企业简介 -->
            <div id="aboutus_link">
                <div class="moduleTitleBox">
                    <img src="../assets/img/aboutus/aboutus.png" class="moduleTitleImg" alt="">
                </div>

                <div class="aboutusDiv">
                    <div class="title">上海铼锶信息技术有限公司</div>
                    <div class="content">
                        上海铼锶信息技术有限公司，高新技术企业，国内领先的智能硬件提供商及信息服务商，专注于AIoT、智能健康、智能运动、智能生活体验等领域的产品研发、生产与销售，也致力于配套软件产品的开发及运营。截止至2021年
                        上半年，已围绕产业开发申请专利及软件著作权100余项。
                        <br><br>
                        铼锶信息旨在搭建从生理健康向全面健康、从人机共融延伸到情感感知的运动健康平台，构建优质运动健康硬件互联网生态。秉承自主创新、持续创新的发展理念，旗下品牌75派、NK，坚持打造深度价值观念，凭借智慧科技与
                        数字平台助力消费者构建专属的大健康生态闭环，服务于整个智能运动健康领域。
                    </div>
                </div>


            </div>
            <!-- 品牌介绍 -->
            <div id="brand_link">
                <div class="moduleTitleBox">
                    <img src="../assets/img/aboutus/brand.png" class="moduleTitleImg" alt="">
                </div>
                <div class="brandBox">
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <div class="brandDiv">
                                <img src="../assets/img/ad.png" alt="">
                                <div class="title">中高端智能产品</div>
                                <div class="content">极力推崇科技改变运动形态，智能带来健康生活的理念，主要产品涵盖智能运动、智能健康、智能穿戴领域的硬件设备及其相关配件。</div>
                                <div class="title">科技及品质</div>
                                <div class="content">
                                    75派自诞生起就倾情研发、精准雕琢每一款着手的产品，秉承着以用户体验为导向，以质量求生存的匠人品质，致力于打造真正的智能运动品牌新生态。
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <div class="brandDiv">
                                <img src="../assets/img/ad.png" alt="">
                                <div class="title">全民运动器械</div>
                                <div class="content">
                                    旨在为更多敢于直面挑战自己并热衷于户外运动、居家运动的用户，创造出更加科学、舒适、自在的运动产品NK致力于大众运动领域，始终秉承着安全健康，智能时尚，高性价比的经营理念，通过专业高品质的户外运动产品、家庭运动器械及配件，为用户搭建时尚健康的运动生活方式。
                                </div>
                                <div class="title">高端品质 价格亲民</div>
                                <div class="content">
                                    NK着手多维空间纵向发展，以极力打造契合用户需求的产品、提供优质的品牌服务，博得更多用户的支持与喜爱，将理想生活与大众运动合二为一。
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>

            </div>
            <!-- 企业文化 -->
            <div id="culture_link">
                <img class="bg" src="../assets/img/ad.png" alt="">
                <div class="cultureDiv">
                    <div class="imgBox">
                        <img src="../assets/img/aboutus/culture1.png" alt="">
                        <img src="../assets/img/aboutus/culture2.png" alt="">
                        <img src="../assets/img/aboutus/culture3.png" alt="">
                    </div>
                </div>
            </div>
            <!-- 大事记 -->
            <div id="thing_link">
                <div class="thingBox">
                    <div class="title">
                        <img src="../assets/img/aboutus/thingTitle.jpg" alt="">
                    </div>
                    <div class="scrollBox">
                        <div class="shadowBox"></div>
                        <el-timeline>
                            <el-timeline-item v-for="(activity, index) in thingList" :key="index" color='red'
                                :timestamp="activity.timestamp">
                                {{activity.content}}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </div>
            <!-- 联系我们 -->
            <div id="contact_link">
                <img src="../assets/img/aboutus/contactPic.jpg" alt="">
            </div>

            <!-- 地图 -->
            <div id="map">
                <div class="moduleTitleBox">
                    <img src="../assets/img/aboutus/map.png" class="moduleTitleImg" alt="">
                </div>
                <div class="content">
                    <iframe height="500"
                        src="https://map.baidu.com/search/%E4%B8%8A%E6%B5%B7%E9%93%BC%E9%94%B6%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/@13507113.54,3624559.92,19z?querytype=s&da_src=shareurl&wd=%E4%B8%8A%E6%B5%B7%E9%93%BC%E9%94%B6%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&c=289&src=0&pn=0&sug=0&l=15&b=(13499547,3620889;13514907,3628225)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1"
                        frameborder="0" width="100%"></iframe>
                </div>
            </div>
        </div>










    </div>
</template>

<script>
    const goAnchor = (selector) => {
        // 移动距离
        let top = 0;
        // 当前滚动条位置
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // 若为指定距离
        if (typeof selector === 'number') {
            top = selector - scrollTop;
            console.log(top)
        } else {
            const anchor = document.getElementById(selector) || {
                offsetTop: 0
            };
            top = anchor.offsetTop - scrollTop;
            console.log(top)
        }
        window.scrollTo({
            top: top,
            behavior: "smooth"
        });
    };
    export default {
        name: 'index',
        props: {},
        data() {
            return {
                active: 1,
                thingList: [{
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }],
                linkId: this.$route.query.id
            }
        },
        computed: {

        },
        watch:{
            linkId(newv,old){
                console.log(newv)
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.goAnchor(this.$route.query.id)
            })
        },
        methods: {
            goAnchor: goAnchor

        }
    }
</script>

<style lang="scss" scoped>
    //大于992
    @media (min-width: 992px) {}

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
                height: 8.5rem;
                background-size: cover;
                background-repeat: no-repeat;
                position: relative;

                .child_nav {
                    height: 1.1rem;
                    width: 100%;
                    background-color: rgba($color: #000000, $alpha: 0.45);
                    position: absolute;
                    bottom: 0;

                    ul {
                        max-width: 14rem;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;

                        li {
                            a {
                                color: #fff;
                                display: block;
                                text-decoration: none;
                            }

                            font-size: 0.28rem;
                            line-height: 1.1rem;
                        }

                        .active {
                            position: relative;

                            &:after {
                                content: "";
                                position: absolute;
                                width: 0.4rem;
                                height: 0.06rem;
                                bottom: 0;
                                left: calc(50% - 0.2rem);
                                background-color: red;
                            }
                        }

                    }
                }
            }
        }



        #aboutus_link {
            margin: 1rem 0;

            .aboutusDiv {
                max-width: 14rem;
                margin: 0 auto;
                margin-top: 1rem;
                padding: 0 0.2rem;
                text-align: left;

                .title {
                    font-size: 0.38rem;
                    color: #333;
                    line-height: 1rem;
                    font-weight: bold;
                }

                .content {
                    font-size: 0.28rem;
                    color: #666;
                    line-height: 0.5rem;
                }
            }
        }

        #brand_link {
            margin: 1rem 0;

            .brandBox {
                max-width: 14rem;
                margin: 0 auto;
                margin-top: 1rem;

                .el-col {
                    padding: 0.2rem;
                    background-color: #fff;
                }

                .brandDiv {
                    min-height: 10rem;
                    padding: 0.6rem;
                    box-sizing: border-box;
                    text-align: center;
                    box-shadow: 3px 4px 20px 6px rgba(0, 0, 0, 0.06);


                    img {
                        height: 0.95rem;
                    }

                    .title {
                        font-size: 0.3rem;
                        color: #333;
                        line-height: 1rem;
                        font-weight: bold;
                        margin-top: 0.5rem;
                    }

                    .content {
                        text-align: left;
                        font-size: 0.2rem;
                        color: #999;
                        line-height: 0.5rem;
                    }
                }
            }
        }

        #culture_link {
            margin: 1rem 0;

            .bg {
                width: 100%;
                height: 6rem;
            }

            .cultureDiv {
                max-width: 14rem;
                margin: 0 auto;
                position: relative;


                .imgBox {
                    width: 100%;
                    margin-top: -1.4rem;
                    display: flex;
                    justify-content: space-between;

                    img {
                        transition: all 0.3s;
                        box-shadow: 3px 4px 20px 6px rgba(61, 82, 197, 0.1);

                        &:hover {
                            transform: scale(1.2);
                        }

                        width: 30%;
                        height: 2.8rem;
                    }
                }



            }
        }

        #thing_link {
            margin: 1rem 0;

            .thingBox {
                max-width: 14rem;
                margin: 0 auto;
                position: relative;
                background-color: rgba(255, 255, 255, 1);
                box-shadow: 3px 4px 20px 6px rgba(61, 82, 197, 0.1);
                height: 8.77rem;
                box-sizing: border-box;
                padding: 0.75rem;
                display: flex;
                justify-content: center;
                position: relative;


                .title {
                    align-items: center;
                    display: flex;

                    img {
                        width: 1.5rem;
                    }
                }

                ::-webkit-scrollbar {
                    width: 3px;
                }

                ::-webkit-scrollbar-track {
                    border-radius: 10px;
                    background-color: rgba(0, 0, 0, 0.1);
                }

                ::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
                    background-color: rgba(0, 0, 0, 0.1);
                }

                .scrollBox {
                    width: 80%;
                    padding: 0 1rem;
                    overflow: auto;
                    text-align: left;

                    .shadowBox {
                        position: absolute;
                        bottom: 0.75rem;
                        left: 0;
                        width: 100%;
                        height: 1rem;
                        opacity: 0.8;
                        background-color: #fff;
                        z-index: 2;
                    }
                }
            }
        }

        #contact_link {
            margin: 1rem 0;

            img {
                width: 100%;
            }
        }

        #map {
            margin: 1rem auto;
            max-width: 14rem;

            .content {
                margin-top: 1rem;
            }
        }




    }
</style>