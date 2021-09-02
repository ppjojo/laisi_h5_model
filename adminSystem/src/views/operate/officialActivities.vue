<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="name" label="标题">
            </el-table-column>
            <el-table-column align="center" prop="subTitle" label="描述">
            </el-table-column>
            <el-table-column align="center" prop="orderNum" label="排序" width="65">
            </el-table-column>
            <el-table-column align="center" prop="iosVersion" label="ios版本">
            </el-table-column>
            <el-table-column align="center" prop="androidVersion" label="android版本" >
            </el-table-column>
            <el-table-column align="center" label="图标">
                <template slot-scope="scope">
                    <img :src="scope.row.logoUrl" alt="" width="60px">
                </template>
            </el-table-column>
            <el-table-column align="center" label="背景图">
                <template slot-scope="scope">
                    <img :src="scope.row.backgroundUrl" alt="" width="120px">
                </template>
            </el-table-column>
            <el-table-column align="center" prop="jumpTo" label="链接">
            </el-table-column>

            <el-table-column align="center" prop="deviceModel" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">
                        {{ scope.row.status==1?"正常":"失效" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <!-- <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'官方活动'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="subTitle">
                    <el-input v-model="form.subTitle"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="jumpTo">
                    <el-input v-model="form.jumpTo"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="orderNum">
                    <el-input v-model="form.orderNum"></el-input>
                </el-form-item>
                <el-form-item label="android版本" prop="androidVersion">
                    <el-input placeholder="144" v-model="form.androidVersion"></el-input>
                </el-form-item>
                <el-form-item label="ios版本" prop="iosVersion">
                    <el-input placeholder="168" v-model="form.iosVersion"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="logoUrl">
                    <el-input v-model="form.logoUrl" style="margin-bottom: 10px;"></el-input>
                    <el-upload ref='upload' action="" :http-request="requestFile2" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar2">
                        <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="背景图" prop="backgroundUrl">
                    <el-input v-model="form.backgroundUrl" style="margin-bottom: 10px;"></el-input>
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.backgroundUrl" :src="form.backgroundUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="状态">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0" inactive-color="#ff4949">
                    </el-switch>
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
    import { listItem, addItem, updateItem } from '@/api/operate/officialActivities'
    import { checkPermission } from '@/api/checkPermission'
    import { fileUpload } from '@/utils/fileUpload'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
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

                dialogVisible: false,
                form: {},
                searchForm: {},
                rules: {

                },

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {

                listItem(this.searchForm).then(res => {
                    this.list = res.data
                    this.loading = false
                }).catch(error => {
                    this.list = []
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
                                    message: '成功新增' + this.form.name
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.name
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
                    "backgroundUrl": "",
                    "createTime": "",
                    "id": 0,
                    "jumpTo": process.env.VUE_APP_BASE_API+"h5/h5V2/",
                    "logoUrl": "",
                    "name": "",
                    "ordernum": 0,
                    "status": 1,
                    "subTitle": "",
                    "androidVersion": "",
                     "iosVersion": ""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
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
                            message: '成功删除所选活动!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除活动操作',
                        type: 'info'
                    });
                });
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.backgroundUrl = res.data.url;
                    }
                })
            },
            requestFile2(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.logoUrl = res.data.url;
                    }
                })
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
        width: 170px;
        height: 80px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 170px;
        height: 80px;
        display: block;
    }

    .avatar-uploader-icon2 {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }

    .avatar2 {
        width: 80px;
        height: 80px;
        display: block;
    }
</style>