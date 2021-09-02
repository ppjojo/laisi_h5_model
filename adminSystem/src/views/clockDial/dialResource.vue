<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="firmwareVersion" label="固件版本号">
            </el-table-column>
            <!-- <el-table-column align="center" prop="name" label="资源名">
            </el-table-column> -->
            <el-table-column align="center" prop="deviceVer" label="设备版本">
            </el-table-column>
            <el-table-column align="center" prop="deviceModel" label="设备型号">
            </el-table-column>
            <el-table-column align="center" prop="iosVersion" label="ios版本">
            </el-table-column>
            <el-table-column align="center" prop="androidVersion" label="安卓版本">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_lan(scope.row)" type="text" style="color:#67c23a;" size="mini"
                        v-if="checkPer('lan')">语言配置
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'表盘资源'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                <el-form-item label="固件版本号：" prop="firmwareVersion">
                    <el-input v-model.trim="form.firmwareVersion" placeholder="R10_A0_V1.99_A00_0527_TX">
                    </el-input>
                </el-form-item>
                <!-- <el-form-item label="拨号盘号：" prop="dialId">
                    <el-input v-model.trim="form.dialId" type="number"></el-input>
                </el-form-item>
                <el-form-item label="拨号盘排序：" prop="dialOrder">
                    <el-input v-model.trim="form.dialOrder" type="number"></el-input>
                </el-form-item> -->
                <el-form-item label="android版本：">
                    <el-input v-model="form.androidVersion" placeholder="999"></el-input>
                </el-form-item>
                <el-form-item label="ios版本：">
                    <el-input v-model="form.iosVersion" placeholder="143"></el-input>
                </el-form-item>
                <!-- <el-form-item label="资源名" prop="name">
                    <el-input v-model.trim="form.name"></el-input>
                </el-form-item>
                <el-form-item label="资源文件" prop="deviceGroupBgUrl">
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.url" :src="form.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>


        <!--新增和编辑界面-->
        <el-dialog title="语言配置" :visible.sync="lanDialogVisible" width="50%">
            <el-form :model="lanForm" label-width="120px" :rules="rules" ref="lanForm">
                <el-form-item :label="item.description+'-'+item.languageType" v-for="item in languageList">
                    <el-input v-model="lanForm[item.languageType]"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="lanDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitLanForm('lanForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, updateItem, deleteItem } from '@/api/clockDial/dialResource'
    import { lanAddItem, lanUpdateItem, lanViewItem } from '@/api/clockDial/dialResource'
    import { listItem as languageListItem} from '@/api/device/appLanguage'
    import { checkPermission } from '@/api/checkPermission'
    import { fileUpload } from '@/utils/fileUpload'

    export default {
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

                dialogVisible: false,
                form: {},
                rules: {

                },
                lanDialogVisible: false,
                lanForm: {},
                languageList:[],

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
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.dialogTitle == "新增") {
                            addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增资源'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改资源'
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
                    firmwareVersion: "",
                    dialId: null,
                    dialOrder: null,
                    name: "",
                    url: "",
                    md5: "",
                    androidVersion: "",
                    iosVersion: ""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除资源, 是否继续?', '提示', {
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
                            message: '成功删除所选资源!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除资源操作',
                        type: 'info'
                    });
                });
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.url = res.data.url;
                        this.form.md5 = data.md5;
                    }
                })
            },
            //语言配置
            btn_lan(row) {
                languageListItem({
                    isSupport:"1"
                }).then(res=>{
                    this.languageList=res.data
                })
                this.lanForm = {
                    en: "",
                    zh: "",
                    cs: "",
                    fr: "",
                    ja: "",
                    pt: "",
                    ru: "",
                    sk: "",
                    it: "",
                    de: "",
                    deviceModel: row.deviceModel,
                    deviceVer : row.deviceVer,
                    firmwareVersion : row.firmwareVersion,
                    dialId : row.dialId
                }
                this.getLanDetail()
                this.lanDialogVisible=true
                
            },
            getLanDetail(){
                lanViewItem({
                    firmwareVersion:this.lanForm.firmwareVersion,
                    dialId: this.lanForm.dialId
                }).then(res=>{
                    if(res.data){
                        this.lanForm=Object.assign(this.lanForm,res.data)
                        this.dialogTitle="编辑"
                    }else{
                        this.dialogTitle="新增"
                    }


                })
            },
            submitLanForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.lanDialogVisible = false
                        if (this.dialogTitle == "新增") {
                            lanAddItem(this.lanForm).then(response => {
                                this.getLanDetail()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增翻译资源'
                                });
                            })
                        } else {
                            lanUpdateItem(this.lanForm).then(response => {
                                this.getLanDetail()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改翻译资源'
                                });
                            })
                        }
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
       
        display: block;
    }
</style>