<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="appid" label="AppID"></el-table-column>
            <el-table-column align="center" prop="appName" label="App名称"></el-table-column>
            <el-table-column align="center" label="OS类型">
                <template scope="scope">
                    {{scope.row.osType == 1?"Android":"IOS"}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="packageName" label="App包名"></el-table-column>
            <el-table-column align="center" prop="appInfo" label="App信息"></el-table-column>
            <el-table-column align="center" label="操作" width="250">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.appid)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                    <el-button @click=" btn_channels(scope.row)" type="text" style="columns: #67c23a;" size="mini"
                        v-if="checkPer('channels')">渠道管理
                    </el-button>
                    <el-button @click=" btn_download(scope.row.appid)" type="text" style="color:#67c23a;" size="mini"
                        v-if="checkPer('download')">APP下载页
                    </el-button>

                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'APP'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="200px" :rules="rules" ref="form">
                <el-form-item label="AppID" prop="appid">
                    <el-input v-model="form.appid" :disabled="dialogTitle == '编辑' "></el-input>
                </el-form-item>
                <el-form-item label="App名称" prop="appName">
                    <el-input v-model="form.appName"></el-input>
                </el-form-item>
                <el-form-item label="平台类型" prop="osType">
                    <el-radio-group v-model="form.osType" :disabled="dialogTitle == '编辑' ">
                        <el-radio class="radio" :label="1">Android</el-radio>
                        <el-radio class="radio" :label="2">IOS</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="App包名" prop="packageName">
                    <el-input v-model="form.packageName"></el-input>
                </el-form-item>

                <el-form-item label="App信息" prop="appInfo">
                    <el-input v-model="form.appInfo" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" prop="notes">
                    <el-input v-model="form.notes" type="textarea"></el-input>
                </el-form-item>

                <!-- 下载服务器地址信息 -->
                <el-form-item label="默认存储根路径" prop="rootPath">
                    <el-input v-model="form.rootPath"></el-input>
                </el-form-item>

                <el-form-item label="服务器主机域名或ip地址" prop="host">
                    <el-input v-model="form.host"></el-input>
                </el-form-item>
                <el-form-item label="http协议头" prop="urlPrex">
                    <el-input v-model="form.urlPrex"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="dialogTitle+'APP下载页面'" :visible.sync="AppDownloadPageFormVisible">
            <el-form :model="AppDownloadPageForm" label-width="150px" :rules="rules" ref="AppDownloadPageForm">
                <el-form-item label="下载页标题" prop="downloadTitle">
                    <el-input v-model="AppDownloadPageForm.downloadTitle"></el-input>
                </el-form-item>
                <el-form-item label="背景图" prop="downloadBgUrl">
                    <el-upload ref='upload' action="" :http-request="requestFile_Bg" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="AppDownloadPageForm.downloadBgUrl" :src="AppDownloadPageForm.downloadBgUrl"
                            class="avatar2">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="logo" prop="downloadLogoUrl">
                    <el-upload ref='upload' action="" :http-request="requestFile_Logo" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="AppDownloadPageForm.downloadLogoUrl" :src="AppDownloadPageForm.downloadLogoUrl"
                            class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="logo说明" prop="downloadLogoNotes">
                    <el-input v-model="AppDownloadPageForm.downloadLogoNotes"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AppDownloadPageFormVisible = false" size="mini">取消</el-button>
                <el-button type="primary" @click="downloadpage_submitForm('AppDownloadPageForm')" size="mini"> 提交
                </el-button>
            </div>
        </el-dialog>

        <el-dialog title="渠道管理" :visible.sync="publicChannelListVisible" width="80%">
            <AppChannel :appInfo="form" v-if="publicChannelListVisible" ></AppChannel>
        </el-dialog>


    </div>
</template>

<script>
    import { listItem, addItem, updateItem, deleteItem } from '@/api/software/appList'
    import { addItem as downloadpageAddItem, updateItem as downloadpageUpdateItem, viewItem as downloadpageViewItemm } from '@/api/software/appDownload'
    import { checkPermission } from '@/api/checkPermission'
    import { getUInfo } from '@/utils/auth'
    import { fileUpload } from '@/utils/fileUpload'
    import AppChannel from "./appChannel.vue";

    export default {
        components: {
            AppChannel
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    // 1: 'gray',
                    0: 'danger'
                }
                return statusMap[status]
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
                dialogTitle: "新增",
                dialogVisible: false,
                form: {},
                rules: {
                    appid: [
                        { required: true, message: '请输入APPID', trigger: 'blur' },
                        {
                            required: true,
                            pattern: /^\+?[1-9]\d*$/,
                            message: 'APPID只能输入数字',
                            trigger: 'blur'
                        }
                    ],
                    appName: [
                        { required: true, message: '请输入APP名称', trigger: 'blur' },
                    ],
                    osType: [
                        { required: true, message: '请选择平台类型', trigger: 'change' }
                    ],
                    packageName: [
                        { required: true, message: '请输入App包名', trigger: 'blur' },
                    ],
                    appInfo: [
                        { required: true, message: '请输入APP信息', trigger: 'blur' },
                    ],
                    notes: [
                        { required: true, message: '请输入备注信息', trigger: 'blur' },
                    ],
                },

                AppDownloadPageFormVisible: false,
                AppDownloadPageForm: {},

                publicChannelListVisible:false

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            //appinfo
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.dialogTitle == "新增") {
                            addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.appName
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.appName
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
                    appid: null,
                    appName: null,
                    osType: 1,
                    packageName: null,
                    rootPath: null,
                    notes: null,
                    host: null,
                    urlPrex: null,
                    appInfo: null,
                    //userid: JSON.parse(getUInfo()).id,
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            btn_delete(appId) {
                this.$confirm('此操作将永久删除APP, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        appIds: appId
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选APP!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除APP操作',
                        type: 'info'
                    });
                });
            },
           //渠道
            btn_channels(row) {
                
                this.form = Object.assign({}, row)
                this.publicChannelListVisible=true
                
            },
           
            
            //下载页
            btn_download(appid) {
                this.AppDownloadPageFormVisible = true
                downloadpageViewItemm({
                    appId: appid
                }).then(res => {
                    if (res.data) {
                        this.dialogTitle = "编辑"
                        this.AppDownloadPageForm = res.data
                    } else {
                        this.AppDownloadPageForm = {
                            appId: null,
                            downloadBgUrl: null,
                            downloadLogoNotes: null,
                            downloadLogoUrl: null,
                            downloadTitle: null
                        }
                        this.dialogTitle = "新增"
                    }
                    this.AppDownloadPageForm.appId = appid
                })
            },
            downloadpage_submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.AppDownloadPageFormVisible = false
                        if (this.dialogTitle == "新增") {
                            downloadpageAddItem(this.AppDownloadPageForm).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增APPID为' + this.AppDownloadPageForm.appId +'的下载页'
                                });
                            })
                        } else {
                            downloadpageUpdateItem(this.AppDownloadPageForm).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改APPID为' + this.AppDownloadPageForm.appId +'的下载页'
                                });
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            requestFile_Logo(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.AppDownloadPageForm.downloadLogoUrl = res.data.url;
                    }
                })
            },
            requestFile_Bg(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.AppDownloadPageForm.downloadBgUrl = res.data.url;
                    }
                })
            },

        }
    }
</script>
<style >
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
        width: 100px;
        height: 100px;
        display: block;
    }

    .avatar2 {
        width: 100px;
        height: auto;
        display: block;
    }
</style>