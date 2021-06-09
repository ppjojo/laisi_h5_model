<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <!-- <div class="bannerImg_contain" :style="{'background-image':'url(../assets/img/banner.png)'}"></div> -->
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
                            <p>学生生信息一键导入，最多可支持48根智能跳绳同时运行   <span>.</span>    </p>
                            <div class="label">01</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>蓝牙实时传输数据，可覆盖200平方米训练场地。   <span>.</span>    </p>
                            <div class="label">02</div>
                        </div>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>支持倒计时、倒计数训练模式。   <span>.</span>    </p>
                            <div class="label">01</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>支持批量管理75派跳绳设备。   <span>.</span>    </p>
                            <div class="label">02</div>
                        </div>
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>历史数据云端存储，随时查看学生成绩及趋势图。   <span>.</span>    </p>
                            <div class="label">01</div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <div class="advantageDiv">
                            <p>数据实时传输至专有APP、可视化管理分析学生成绩。   <span>.</span>    </p>
                            <div class="label">02</div>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {},
        data() {
            return {

            }
        },
        mounted() {},
        created() {},
        methods: {

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
                padding:0  0.1rem 0.2rem 0.1rem;

                img {
                    width: 100%;
                }
            }
        }

        .systemBox {
            max-width: 14.4rem;
            margin: 0 auto;
            margin-top: 1rem;

            .systemDiv img{
                width: 100%;
                padding: 0 0.2rem;
            }
        }

        .advantageBox {
            max-width: 14.2rem;
            margin: 0 auto;
            margin-top: 1rem;
            .el-row{
               
                .el-col{
                    padding:0  0.1rem 0.2rem 0.1rem;
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
                        font-size: 0.5rem;
                        color: red;
                    }
                }

                .label {
                    font-family: DINCondensed-Bold;
                    position: absolute;
                    font-size: 2rem;
                    color:#F4F4F4 ;
                    right: -0.3rem;
                    bottom: -1rem;
                    transform:rotate(-45deg);
                }

                &:hover {
                    background: linear-gradient(to right, #FFFFFF, rgba(255, 255, 255, 0.5), #E1FEFF);
                    p{
                        border-left: 0.1rem solid red;
                    }
                    .label{
                        color: #fff;
                    }
                }

                &:after {}
            }

        }


    }
</style>