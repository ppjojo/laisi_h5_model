<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <!-- <div class="bannerImg_contain" :style="{'background-image':'url(../assets/img/banner.png)'}"></div> -->
        </div>

        <div class="newsContent">
            <el-row>
                <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <div class="newsDetail">
                        <div class="title">{{detail.newsTitle}}</div>
                        <div class="descript">
                            <img v-if="detail.newsTop==1"  style="width:0.3rem;margin-right:0.2rem" src="../assets/img/index/hot.png" alt="">
                            <span>{{detail.newsEditor}}</span>
                            <span>{{detail.updateTime | formatDate}}</span>
                        </div>
                        <div class="content" v-html="detail.newsBody">
                        </div>
                        <div class="buttonBox">
                            <div class="button" @click="changeNews(-1)"> 上一篇</div>
                            <div class="button" @click="changeNews(1)"> 下一篇</div>

                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <div class="newsNav">
                        <div class="navTitle">
                            <img src="../assets/img/news/hot.png" alt="">
                            更多新闻
                        </div>
                        <div class="listBox">
                            <ul>
                                <li v-for="item in newsList" @click="newsDetail(item.id)">
                                    <div class="cover" :style="{'background-image':'url('+item.newsPicture+')'}"></div>
                                    <div class="newsBody">
                                        <p class="title">{{item.newsTitle}}</p>
                                        <div class="dateBox">
                                            <span>{{item.updateTime | formatDate}}</span>
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
    import {
        formatDate
    } from '@/utils/tool'
    import {
        getNews
    } from "@a/index";
    import {
        getNewsDetail
    } from "@a/news";
    
    export default {
        filters: {
			formatDate(time) {
				time = time
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			},
		},
        name: 'index',
        props: {},
        data() {
            return {
                active: 1,
                newsList: [],
                detail:{},
                activeId:""

            }
        },
        computed: {

        },
        mounted() {
            this.news()
            this.newsDetail(this.$route.query.id)
        },
        methods: {
            news() {
                getNews({
                    pageSize: 99,
                    pageNum: 0
                }).then(res => {
                    this.newsList = res.data.websiteNewsList;
                })
            },
            newsDetail(id) {
                this.activeId=id
                getNewsDetail({
                    id:id
                }).then(res => {
                    this.detail = res;
                })
            },
            changeNews(type){
                var index=this.newsList.findIndex((item)=>{
                    return item.id==this.activeId
                })
                let len=this.newsList.length
                let to= (index+type+len)%len
                this.newsDetail(this.newsList[to].id)

              
            }

        }
    }
</script>


<style lang="scss" scoped>
	
    .contain {
        text-align: left;

        .bannerBox {
            background-image: url('../assets/img/news/newsBg.png');
            width: 100%;
            height: 7.67rem;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            background-position: 50% 50%;

        }

        .newsContent {
            margin: 1rem auto;
            padding: 0 0.2rem;
            box-sizing: border-box;
            max-width: 12.4rem;
            position: relative;

            .newsDetail {
                margin-bottom: 1rem;

                .title {
                    color: #333;
                    font-size: 0.4rem;
                    line-height: 0.6rem;
                    font-weight: bold;
                }

                .descript {
                    color: #777;
                    font-size: 0.15rem;
                    line-height: 0.5rem;
                    display: flex;
                    align-items: center;
                    span{
                        margin-right: 0.2rem;
                    }
                }

                .content {
                    color: #333;
                    font-size: 0.16rem;
                    line-height: 0.4rem;
                }

                .buttonBox {
                    text-align: center;
                    margin-top: 1rem;

                    .button {
                        display: inline-block;
                        font-size: 0.18rem;
                        color: #1A59B7;
                        line-height: 0.4rem;
                        padding: 0 0.5rem;
                    }

                }
            }

            .newsNav {
                .navTitle {
                    color: #333;
                    font-size: 0.25rem;
                    line-height: 0.45rem;
                    display: flex;
                    align-items: center;

                    img {
                        width: 0.4rem;
                        height: 0.4rem;
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
                            justify-content: flex-start;
                            align-items: center;

                            .cover {
                                background-image: url('../assets/img/paiactive/Aiot-1.png');
                                background-size: cover;
                                width: 35%;
                                height: 0.8rem;
                                margin-right: 0.1rem;
                            }

                            .newsBody {
                                max-width: 65%;

                                .title {
                                    color: #333;
                                    font-size: 0.18rem;
                                    line-height: 0.3rem;
                                    overflow: hidden;
                                    height: 0.6rem;
                                    text-overflow: ellipsis;
                                    display: box;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                }

                                .dateBox {
                                    font-size: 0.15rem;
                                    color: #777;
                                    line-height: 0.25rem;
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
        .newsDetail{
            padding-right: 0.5rem;
        }
    }

    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;
            .bannerBox{
                background-size: cover;
            }

        }
    }
</style>