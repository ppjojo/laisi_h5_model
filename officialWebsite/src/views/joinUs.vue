<template>
    <div class="contain">
        <!-- banner图 -->
        <div class="bannerBox ">
            <!-- <div class="bannerImg_contain" :style="{'background-image':'url(../assets/img/banner.png)'}"></div> -->
        </div>

        <div class="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="合作类型" prop="type">
                            <el-select v-model="ruleForm.region" placeholder="请选择合作类型">
                                <el-option label="KOL/MCN机构合作" value="KOL/MCN机构合作"></el-option>
                                <el-option label="与派健康合作" value="与派健康合作"></el-option>
                                <el-option label="媒体合作" value="媒体合作"></el-option>
                                <el-option label="渠道及分销" value="渠道及分销"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系人名字" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入联系人名字"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人手机号" prop="phone">
                            <el-input v-model="ruleForm.name" placeholder="请输入联系人手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="公司名称">
                            <el-input v-model="ruleForm.name" placeholder="请输入公司名称"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人职位">
                            <el-input v-model="ruleForm.name" placeholder="请输入联系人职位"></el-input>
                        </el-form-item>
                        <el-form-item label="资源所属行业">
                            <el-input v-model="ruleForm.name" placeholder="请输入资源所属行业"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="主营产品">
                            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入主营产品"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-form-item label="您通过什么渠道了解到我们？">
                            <el-input v-model="ruleForm.name" placeholder="请输入渠道"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item>
                            <div class="buttonDiv" @click="submitForm('ruleForm')">提交</div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>













    </div>
</template>

<script>
    export default {
        name: 'index',
        props: {},
        data() {
            return {
                ruleForm: {},
                rules: {
                    type: [{
                        required: true,
                        message: '请选择合作类型',
                        trigger: 'change'
                    }],
                    name: [{
                        required: true,
                        message: '请输入联系人名字',
                        trigger: 'change'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入联系人手机号',
                        trigger: 'change'
                    }],
                }
            }
        },
        computed: {

        },
        mounted() {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        }
    }
</script>
<style>
    .el-form-item__label {
        display: block;
        float: none;
        text-align: left;
        color: #333;
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
    }


    .el-select {
        width: 100%;
    }

    @media (min-width: 992px) {
        .el-input__inner {
            height: 0.7rem;
            font-size: 0.2rem;
        }

        .el-form-item {
            margin-bottom: 0.3rem;
            padding-right: 0.5rem;
        }
    }


    @media (max-width: 992px) {}
</style>

<style lang="scss" scoped>
    .contain {
        text-align: left;
        background-color: rgb(246, 248, 251);

        .bannerBox {
            background-image: url('../assets/img/joinus/bg.png');
            width: 100%;
            height: 8.5rem;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
        }

        .content {
            max-width: 14rem;
            margin: 0 auto;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 3px 4px 20px 6px rgba(173, 173, 173, 0.06);
            position: relative;
            top: -1rem;

            .buttonDiv {
                height: 0.87rem;
                border-radius: 4px;
                background-color: rgba(37, 37, 37, 1);
                font-size: 0.34rem;
                text-align: center;
                line-height: 0.87rem;
                width: 100%;
                color: #fff;
                margin-top: 0.2rem;
            }
        }
    }



    //大于992
    @media (min-width: 992px) {
        .content {
            padding: 1rem;
        }
    }



    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;
        }

        .content {
            padding: 0.15rem;
        }
    }
</style>