<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="title" label="广告标题">
            </el-table-column>
            <el-table-column align="center" label="广告位置">
                <template scope="scope">
                    {{scope.row.location == 1?"首页":scope.row.location == 2?"设备页":scope.row.location == 3?"课程页":scope.row.location == 4?"发现页":""}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="广告类型">
                <template scope="scope">
                    {{scope.row.type == 1?"banner":scope.row.type == 2?"开屏":scope.row.type == 3?"弹窗":""}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="可用状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.enable | statusFilter" size="mini">{{ scope.row.enable==1?"正常":"禁用" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sequence" label="排序"></el-table-column>

            <el-table-column label="开始时间">
                <template scope="scope">
                    {{scope.row.startTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column label="结束时间">
                <template scope="scope">
                    {{scope.row.endTime | formatDate}}
                </template>
            </el-table-column>


            <el-table-column align="center" label="操作" width="160">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                    <el-button @click=" btn_top(scope.row)" type="text" style="color:#67c23a;" size="mini"
                        v-if="checkPer('top')">置顶
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'banner'" :visible.sync="dialogVisible" width="60%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="广告位置" prop="location">
                    <el-radio-group v-model="form.location">
                        <el-radio class="radio" :label="1">首页</el-radio>
                        <!-- <el-radio class="radio" :label="2">设备页</el-radio> -->
                        <el-radio class="radio" :label="3">课程页</el-radio>
                        <el-radio class="radio" :label="4">发现页</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="广告类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio class="radio" :label="1">banner</el-radio>
                        <el-radio class="radio" :label="2">开屏</el-radio>
                        <el-radio class="radio" :label="3">弹窗</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否可用" prop="enable">
                    <el-radio-group v-model="form.enable">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="投放策略" prop="adsCustomer">
                    <el-radio-group v-model="form.adsCustomer">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="适用设备" prop="deviceType" v-if="form.adsCustomer==1">
                    <el-radio-group v-model="form.deviceType ">
                        <el-radio v-for="item in deviceTypeList" :label="item.deviceType" :disabled="item.disabled">
                            {{item.deviceType}}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="android版本">
                    <el-input v-model="form.androidVersion" placeholder="999"></el-input>
                </el-form-item>
                <el-form-item label="ios版本">
                    <el-input v-model="form.iosVersion" placeholder="143"></el-input>
                </el-form-item>

                <el-form-item label="排序" prop="sequence">
                    <el-input v-model.number="form.sequence"></el-input>
                </el-form-item>

                <el-form-item label="广告标题：" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="form.description" type='textarea'></el-input>
                </el-form-item>


                <el-form-item label="广告图片" prop="adUrl">
                    <el-input v-model="form.adUrl" style="margin-bottom: 10px;"></el-input>
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.adUrl" :src="form.adUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="跳转类型" v-if="dialogTitle=='新增'">
                    <el-select v-model="form.linktype" clearable @change='selectLinkTypeChange'>
                        <el-option v-for="item in linktypeList" :key="item.value" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>

                </el-form-item>
                
                <el-form-item label="落地页地址" prop="landingUrl">
                    <el-input v-model.trim="form.landingUrl"></el-input>
                </el-form-item>
                <div style="line-height: 25px;padding: 10px 20px;">
                    链接地址后面拼接参数说明<br>
                    https:xxx.com?aaa=1&bbb=1<br>
                    hideStatusBarHeight=1 android页面从手机状态栏开始显示 隐藏标题栏<br>
                    reservedStatusBarHeight=1 ios页面从手机状态栏下面开始显示 隐藏标题栏<br>
                    hideTitle=1 页面从手机状态栏下面开始显示并隐藏标题栏(ios 会在状态栏上面显示)<br>

                    isFullScreen=1 页面隐藏手机状态栏以及标题栏<br>
                   
                    
                </div>
                <el-form-item label="图片大小" prop="size">
                    <el-input v-model="form.size" placeholder="广告图片大小表示方法： 540x380"></el-input>
                </el-form-item>

                <el-form-item label="广告时间" prop="endTime">
                    <el-date-picker v-model="timeArr" type="datetimerange" range-separator="至" start-placeholder="生效日期"
                        end-placeholder="失效日期" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, topItem, addUpdateItem, deleteItem } from '@/api/ad/banner'
    import { checkPermission } from '@/api/checkPermission'
    import { listItem as productListItem } from '@/api/device/productList'
    import { fileUpload } from '@/utils/fileUpload'
    import { formatDate } from '@/utils/date'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    // 1: 'gray',
                    0: 'danger'
                }
                return statusMap[status]
            },
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }

        },
        computed: {
            checkPer() {
                return function (btn) {
                    return (checkPermission(this.$route.path + '/' + btn))
                }
            }
        },
        data() {
            return {
                list: [],
                loading: false,
                timeArr: "",

                dialogVisible: false,
                form: {},
                rules: {
                    title: [
                        { required: true, message: '请输入广告标题', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    adUrl: [
                        { required: true, message: '请上传广告图片', trigger: 'blur,change' },
                    ],
                    sequence: [
                        { required: true, message: '请填写该广告的排序号', trigger: 'blur,change' },
                        {
                            pattern: /^\+?[1-9]\d*$/,
                            message: "请输入大于等于1的正整数",
                            trigger: "blur"
                        },
                    ],
                },
                linktypeList: [
                    { name: '正常网页跳转', value: 0 },
                    { name: '跳转PK指定比赛详情页面', value: 1 },
                    // { name: '跳转跳绳官方赛活动页面', value: 3 },
                ],
                deviceTypeList: [],//设备类型

            }
        },
        mounted() {
            this.getList()
            this.getProductList()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            getProductList() {
                productListItem({}).then(res => {
                    var obj = {};
                    this.deviceTypeList = res.data.reduce((arr, next) => {
                        obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
                        return arr;
                    }, []);
                    //20200506 目前广告定制需求只支持balance
                    this.deviceTypeList.forEach(item => {
                        if (item.deviceType != "balance"&&item.deviceType != "skipping") {
                            item.disabled = true
                        } else {
                            item.disabled = false
                        }
                    });
                })
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        this.form.endTime = this.timeArr[1]
                        this.form.startTime = this.timeArr[0]
                        if (this.dialogTitle == "新增") {
                            addUpdateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增广告' + this.form.title
                                });
                            })
                        } else {
                            addUpdateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改广告' + this.form.title
                                });
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            btn_add() {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    location: 1, //广告位置1：首页2：设备页
                    sequence: null, //多个广告时，用于排序
                    type: 1, //广告类型1：banner 2：开屏 3:横屏
                    title: '', //广告标题
                    description: '', //广告描述
                    adUrl: null, //广告图片地址
                    landingUrl: '', //广告落地页地址
                    size: null, //广告图片大小表示方法： 540x380
                    enable: 1,
                    startTime: '', //广告生效的时间
                    endTime: '', //广告失效的时间
                    adsCustomer: 0,

                    linktype: 0, //广告跳转类型
                    androidVersion: "",
                    iosVersion: ""
                }
                this.timeArr = []
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
                this.timeArr = []
                this.timeArr.push(row.startTime)
                this.timeArr.push(row.endTime)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除卡片标题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        id: id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选banner!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除banner操作',
                        type: 'info'
                    });
                });
            },
            //置顶
            btn_top(row) {
                if (row.sequence == 1) {
                    return this.$message({
                        showClose: true,
                        message: '当前该广告已经处于置顶状态！'
                    });
                }
                topItem({
                    id: row.id
                }).then(res => {
                    this.getList()
                    this.$notify({
                        type: 'success',
                        message: '置顶成功!'
                    });
                })
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.adUrl = res.data.url;
                    }
                })
            },
            selectLinkTypeChange(){
                if(this.form.linktype==1&&!this.form.landingUrl){
                    let url=process.env.VUE_APP_BASE_API+"h5/h5V2/skipPK/competitionDetail.html?id=比赛ID&name=比赛名称&matchId=比赛ID"
                    this.$set(this.form,"landingUrl", url)
                }
            }

        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 170px;
        /* height: 80px; */
        display: block;
    }
</style>