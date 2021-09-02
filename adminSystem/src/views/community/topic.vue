<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="topicId" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="name" label="标题">
            </el-table-column>
            <el-table-column align="center" prop="logo" label="图标">
                <template scope="scope">
                    <el-image style="width: 80px; height: 80px" :src=" scope.row.logo" fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="introduction" label="描述">
            </el-table-column>
            <el-table-column align="center" prop="readCount" label="阅读数">
            </el-table-column>
            <el-table-column align="center" prop="participation" label="参与人数">
            </el-table-column>
            <el-table-column align="center" prop="score" label="排行分数">
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination> -->


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'话题'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="标题" prop="name" v-if="">
                    <el-input :disabled="dialogTitle=='编辑'" v-model.trim="form.name"></el-input>
                </el-form-item>
                <el-form-item label="排行分数" prop="score">
                    <el-input v-model.trim="form.score"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="logo">
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.logo" :src="form.logo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="背景" prop="background">
                    <el-upload ref='upload' action="" :http-request="requestFile_bg" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.background" :src="form.background" class="avatar2">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="描述" prop="introduction">
                    <el-input type="textarea" :rows="2" v-model.trim="form.introduction"></el-input>
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
    import { listItem, addItem, updateItem } from '@/api/community/topic'
    import { checkPermission } from '@/api/checkPermission'
    import { fileUpload } from '@/utils/fileUpload'
    import Pagination from "@/components/pagination";

    export default {
        components: {
            Pagination
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
                page: 0,
                limit: 9999,
                total: 20,

                dialogVisible: false,
                form: {},
                rules: {
                    deviceTitle: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                    ],
                    deviceType: [
                        { required: true, message: '请输入产品类型', trigger: 'blur' },
                    ],
                    deviceModel: [
                        { required: true, message: '请输入产品型号', trigger: 'blur' },
                    ],
                },

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                    pageSize: this.limit,
                    index: this.page
                }).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val - 1;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val) {
                this.limit = val;
                this.getList()
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
                    name: "",
                    introduction:"",
                    logo:"",
                    background:"",
                    type:"1",
                    score:""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
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
                            message: '成功删除所选卡片标题!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除卡片标题操作',
                        type: 'info'
                    });
                });
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.logo = res.data.url;
                    }
                })
            },
            requestFile_bg(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.background = res.data.url;
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
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }

    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
    .avatar2 {
        width: 170px;
        /* height: 80px; */
        display: block;
    }
</style>