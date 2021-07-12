<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <div class="bannerImg_contain" :style="{'background-image':'url('+banner.pictureVideo+')'}">
                <!-- <div class="child_nav">
                    <ul>
                        <li :class="active==1?'active':''" @click="active=1;goAnchor('aboutus_link')"><a>企业简介</a></li>
                        <li :class="active==2?'active':''" @click="active=2;goAnchor('brand_link')"><a>品牌介绍</a></li>
                        <li :class="active==3?'active':''" @click="active=3;goAnchor('culture_link')"><a>企业文化</a></li>
                        <li :class="active==4?'active':''" @click="active=4;goAnchor('thing_link')"><a>大事记</a></li>
                        <li :class="active==5?'active':''" @click="active=5;goAnchor('contact_link')"><a>联系我们</a></li>
                    </ul>
                </div> -->
            </div>
        </div>
        <div>
            <!-- 企业简介 -->
            <div id="aboutus_link">

                <div class="aboutusDiv">
                    <div class="moduleTitleBox">
                        <img src="../assets/img/aboutus/aboutus.png" class="moduleTitleImg" alt="">
                    </div>
                    <div class="title"><img style="width:0.2rem;margin-right:0.1rem;"
                            src="../assets/img/aboutus/dot.png" alt="">上海铼锶信息技术有限公司</div>
                    <div class="content">
                        {{companyInfo.companyProfileTop}}
                        <br><br>
                        {{companyInfo.companyProfileBottom}}
                    </div>
                </div>


            </div>
            <!-- 品牌介绍 -->
            <div id="brand_link">
                
                <div class="brandBox">
                    <div class="moduleTitleBox">
                    <img src="../assets/img/aboutus/brand.png" class="moduleTitleImg" alt="">
                </div>
                    <el-row>
                        <el-col v-for="item in brandList" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <div class="brandDiv">
                                <img :src="item.logo" alt="">
                                <div class="title">{{item.titleTop}}</div>
                                <div class="content">{{item.contentTop}}</div>
                                <div class="title">{{item.titleBottom}}</div>
                                <div class="content">{{item.contentBottom}}</div>
                            </div>
                        </el-col>

                    </el-row>
                </div>

            </div>
            <!-- 企业文化 -->
            <div id="culture_link">
                <img class="bg" src="../assets/img/aboutus/culture-bg.png" alt="">
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
                        <el-timeline class="phone_box">
                            <el-timeline-item v-for="(activity, index) in eventList" :key="index" color='red'
                                :timestamp="activity.eventTime">
                                {{activity.eventContent}}
                            </el-timeline-item>
                        </el-timeline>

                        <div class="timelineBox">
                            <ul v-for="item in newEventList">
                                <div class="year">{{item.year}}</div>
                                <li v-for="(lItem ,index) in item.event" :class="index%2==0?'left':'right'">
                                    <img src="../assets/img/aboutus/dot.png" v-if="index%2==1" alt="">
                                    <div class="time" v-if="index%2==1">{{parseInt(lItem.eventTime.split('-')[1]) }}月
                                    </div>
                                    <div class="content">{{lItem.eventContent}}</div>
                                    <div class="time" v-if="index%2==0">{{parseInt(lItem.eventTime.split('-')[1]) }}月
                                    </div>
                                    <img src="../assets/img/aboutus/dot.png" v-if="index%2==0" alt="">
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            <!-- 联系我们 -->
            <div id="contact_link">
                <img src="../assets/img/aboutus/contactPic.jpg" alt="">
            </div>

            <!-- 地图 -->
            <div id="map">
                
                <div class="content">
                    <div class="moduleTitleBox">
                    <img src="../assets/img/aboutus/map.png" class="moduleTitleImg" alt="">
                </div>
                    <!-- <iframe height="600"
                        src="https://www.amap.com/search?id=B0FFK6RPXC&city=310117&geoobj=120.635518%7C30.759509%7C122.788128%7C31.739702&query_type=IDQ&query=%E4%B8%8A%E6%B5%B7%E9%93%BC%E9%94%B6%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&zoom=9.88"
                        frameborder="0" width="100%"></iframe> -->
                    <iframe height="520" src="https://oss.laisitech.com/47d86d63-4895-41e6-860d-e38916f4d1a2.html"
                        frameborder="0" width="100%"></iframe>
                </div>
            </div>
        </div>










    </div>
</template>

<script>
    import Utils from "@u/callUtil";
    // import defaultSetting from "../../settings.js";
    // import Map from "./map.vue";
    import {
        getAllPicture
    } from "@a/picture";
    import {
        getCompanyProfile,
        getWebsiteBrandIntroduction,
        getWebsiteBigEvent
    } from '@/api/aboutus'
    export default {
        //  components:{
        //     Map
        // },
        name: 'index',
        props: {},
        data() {
            return {
                banner: [],
                companyInfo: {},
                brandList: [],
                active: 1,
                eventList: [],
                newEventList: []
            }
        },
        mounted() {
            Utils.$on('goAnchor', (flag) => {
                this.goAnchor(flag);
            })

        },
        created() {
            this.getBanner()
            this.companyProfile()
            this.brand()
            this.event()

        },
        methods: {
            goAnchor(selector) {
                window.scrollTo({
                    top: document.getElementById(selector).offsetTop - 100,
                    behavior: "smooth"
                });
            },
            getBanner() {
                getAllPicture({
                    pictureBelong: 4,
                    pictureType: 0
                }).then(res => {
                    this.banner = res.data[0];
                })
            },
            companyProfile() {
                getCompanyProfile().then(res => {
                    this.companyInfo = res.data;
                })
            },
            brand() {
                getWebsiteBrandIntroduction().then(res => {
                    this.brandList = res.data;
                })
            },
            event() {
                getWebsiteBigEvent().then(res => {
                    this.eventList = res.data;
                    let newArr = [];
                    res.data.forEach((item, i) => {
                        let index = -1;
                        let alreadyExists = newArr.some((newAddress, j) => {
                            if (item.eventTime.split('-')[0] === newAddress.year) {
                                index = j;
                                return true;
                            }
                        });
                        if (!alreadyExists) {
                            newArr.push({
                                year: item.eventTime.split('-')[0],
                                event: [item]
                            });
                        } else {
                            newArr[index].event.push(item);
                        }
                    });
                    this.newEventList = newArr;

                })
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

        .timelineBox {
            display: block;
        }
    }

    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;

            .bannerImg_contain {
                width: 100%;
                height: 7.68rem;
                background-size: cover !important;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                position: relative;
            }
        }

        .phone_box {
            display: block;
        }

        .timelineBox {
            display: none;
        }
    }

    .contain {

        .bannerBox {
            .bannerImg_contain {
                width: 100%;
                height: 7.68rem;
                background-size: contain;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                position: relative;

                .child_nav {
                    height: 1.1rem;
                    width: 100%;
                    background-color: rgba($color: #000000, $alpha: 0.45);
                    position: absolute;
                    bottom: 0;

                    ul {
                        max-width: 12rem;
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

            .aboutusDiv {
                max-width: 12rem;
                margin: 0 auto;
                padding: 0 0.2rem;
                text-align: left;

                .title {
                    font-size: 0.3rem;
                    color: #333;
                    line-height: 0.8rem;
                    font-weight: bold;
                }

                .content {
                    font-size: 0.23rem;
                    color: #666;
                    line-height: 0.45rem;
                }
            }
        }

        #brand_link {
            margin: 0.5rem 0;

            .brandBox {
                max-width: 12rem;
                margin: 0 auto;

                .el-col {
                    padding: 0.2rem;
                    background-color: #fff;
                }

                .brandDiv {
                    min-height: 6.11rem;
                    padding: 0.5rem;
                    box-sizing: border-box;
                    text-align: center;
                    box-shadow: 3px 4px 20px 6px rgba(0, 0, 0, 0.06);


                    img {
                        height: 0.95rem;
                    }

                    .title {
                        font-size: 0.24rem;
                        color: #333;
                        line-height: 0.6rem;
                        font-weight: bold;
                        margin-top: 0.2rem;
                    }

                    .content {
                        text-align: left;
                        font-size: 0.17rem;
                        color: #999;
                        line-height: 0.3rem;
                    }
                }
            }
        }

        #culture_link {
            margin: 1rem 0;

            .bg {
                width: 100%;
                height: 4.3rem;
            }

            .cultureDiv {
                max-width: 12rem;
                margin: 0 auto;
                position: relative;


                .imgBox {
                    width: 100%;
                    margin-top: -1.2rem;
                    display: flex;
                    justify-content: space-between;

                    img {
                        transition: all 0.3s;
                        // box-shadow: 3px 4px 20px 6px rgba(61, 82, 197, 0.1);

                        &:hover {
                            transform: scale(1.2);
                        }

                        width: 33.33%;
                        height: auto;
                    }
                }



            }
        }

        #thing_link {
            margin: 1rem 0;

            .thingBox {
                max-width: 12rem;
                margin: 0 auto;
                position: relative;
                background-color: rgba(255, 255, 255, 1);
                box-shadow: 3px 4px 20px 6px rgba(61, 82, 197, 0.1);
                height: 7.52rem;
                box-sizing: border-box;
                padding: 0.64rem 0;
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
                    padding: 0 0 0 1rem;
                    overflow: auto;
                    text-align: left;

                    .shadowBox {
                        position: absolute;
                        bottom: 0rem;
                        left: 0;
                        width: 100%;
                        height: 2rem;
                        // opacity: 0.8;
                        background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
                        z-index: 2;
                    }

                    .timelineBox {
                        position: relative;
                        padding-bottom: 0.5rem;

                        ul {
                            .year {
                                margin: 0 auto;
                                width: 0.95rem;
                                height: 0.45rem;
                                background-color: #E60012;
                                color: #eee;
                                font-size: 0.24rem;
                                line-height: 0.45rem;
                                text-align: center;
                            }

                            li {
                                display: flex;
                                align-items: center;
                                padding-top: 0.2rem;

                                .time {
                                    font-size: 0.2rem;
                                    color: #333;
                                    line-height: 0.4rem;
                                    width: 0.6rem;
                                }

                                img {
                                    width: 0.2rem;
                                    height: 0.2rem;
                                    // margin: 0 0.1rem;
                                }

                                .content {
                                    font-size: 0.2rem;
                                    color: #666;
                                    line-height: 0.4rem;
                                    margin: 0 0.2rem;
                                    width: 3rem;
                                    box-sizing: border-box;
                                }
                            }

                            .left {
                                justify-content: flex-start;
                                position: relative;
                                text-align: right;

                                &:after {
                                    width: 2px;
                                    background-color: red;
                                    content: "";
                                    position: absolute;
                                    height: 100%;
                                    top: 0;
                                    right: calc(50% - 1px);
                                }

                                img {
                                    position: relative;
                                    left: 0.18rem;
                                    z-index: 2;
                                }

                                .time {
                                    text-align: right;
                                }
                            }

                            .right {
                                justify-content: flex-end;
                                position: relative;

                                &:after {
                                    width: 2px;
                                    background-color: red;
                                    content: "";
                                    position: absolute;
                                    height: 100%;
                                    top: 0;
                                    left: calc(50% - 1px);
                                }

                                img {
                                    position: relative;
                                    right: 0.18rem;
                                    z-index: 2;
                                }
                            }
                        }
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
            max-width: 12rem;

            .content {
                // margin-top: 1rem;
            }
        }




    }
</style>