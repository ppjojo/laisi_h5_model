<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <!-- <div class="bannerImg_contain" :style="{'background-image':'url(../assets/img/banner.png)'}"></div> -->
        </div>

        <div class="newsContent">
            <el-row >
                <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <div class="newsDetail">
                <div class="title">热烈祝贺铼锶成为二类重点扶持企业</div>
                <div class="descript">
                    <span>2021年5月5日</span>
                </div>
                <div class="content">
                    受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大
                    受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大
                    受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大
                    受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大
                    受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大
                    受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大
                    受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大
                </div>
                <div class="buttonBox">
                    <div class="button"> 上一篇</div>
                    <div class="button"> 下一篇</div>

                </div>
            </div>
                </el-col>
               <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="newsNav">
                <div class="navTitle">
                    <img src="../assets/img/paiactive/Aiot-1.png" alt="">
                    更多新闻
                </div>
                <div class="listBox">
                    <ul>
                        <li v-for="item in 8">
                            <div class="cover"></div>
                            <div class="newsBody">
                                <p class="title">受到法国军事科技大法官撒旦感觉啥都法国凯撒的科技股份十大</p>
                                <div class="dateBox">
                                    <span>2021年5月5日</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
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
                active: 1,

            }
        },
        computed: {

        },
        mounted() {

        },
        methods: {


        }
    }
</script>

<style lang="scss" scoped>
    .contain {
        text-align: left;

        .bannerBox {
            background-image: url('../assets/img/banner.png');
            width: 100%;
            height: 8.5rem;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;

        }

        .newsContent {
            margin: 1rem auto;
            padding: 0 0.2rem;
            box-sizing: border-box;
            max-width: 14.4rem;
            position: relative;

            .newsDetail {
                margin-bottom: 1rem;
                .title {
                    color: #333;
                    font-size: 0.48rem;
                    line-height: 0.8rem;
                    font-weight: bold;
                }

                .descript {
                    color: #777;
                    font-size: 0.18rem;
                    line-height: 0.5rem;
                }

                .content {
                    color: #333;
                    font-size: 0.24rem;
                    line-height: 0.4rem;
                }

                .buttonBox{
                    text-align: center;
                    margin-top: 1rem ;
                    .button{
                        display: inline-block;
                        font-size: 0.24rem;
                        color: #1A59B7 ;
                        line-height: 0.5rem;
                        padding: 0 0.5rem;
                    }

                }
            }

            .newsNav {
                .navTitle {
                    color: #333;
                    font-size: 0.38rem;
                    line-height: 0.6rem;

                    img {
                        width: 0.44rem;
                        height: 0.44rem;
                        margin-right: 0.2rem;
                    }
                }


                .listBox {
                    margin-top: 0.2rem;

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

                    ul {
                        max-height: 8.5rem;
                        overflow: auto;

                        li {
                            padding-right: 0.2rem;
                            margin-top: 0.35rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .cover {
                                background-image: url('../assets/img/paiactive/Aiot-1.png');
                                background-size: cover;
                                width:35% ;
                                height: 1rem;
                                margin-right: 0.1rem;
                            }

                            .newsBody {
                                max-width: 65%;

                                .title {
                                    color: #333;
                                    font-size: 0.22rem;
                                    line-height: 0.35rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: box;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                }

                                .dateBox {
                                    font-size: 0.18rem;
                                    color: #777;
                                    line-height: 0.4rem;
                                }
                            }

                        }
                    }
                }

            }
        }
    }

    //大于992
    @media (min-width: 992px) {
        
    }

    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;

           
        }
    }
</style>