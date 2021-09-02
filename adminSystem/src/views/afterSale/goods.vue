<template>
    <div class="app-container">
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="itemId" label="商品ID"></el-table-column>
            <el-table-column align="center" prop="title" label="标题">
            </el-table-column>
            <el-table-column align="center" prop="image" label="图标">
                <template scope="scope">
                    <el-image style="width: 80px; height: 80px" :src=" scope.row.image" fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="detailUrl" label="详情地址">
            </el-table-column>
            <el-table-column align="center" prop="sortNum" label="排序">
            </el-table-column>
            <el-table-column align="center" prop="price" label="价格">
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'商品'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="标题" prop="title">
                    <el-input v-model.trim="form.title"></el-input>
                </el-form-item>
                
                <el-form-item label="商品图" prop="deviceGroupBgUrl">
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.image" :src="form.image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="详情页地址">
                    <el-input :disabled="true" v-model="form.detailUrl"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sortNum"></el-input>
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
    import { listItem, updateItem } from '@/api/afterSale/goods'
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
                    pageSize: 0,
                    pageNum: 99999
                }).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        updateItem(this.form).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功修改' + this.form.title 
                            });
                        })
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
                    deviceTitle: "",
                    deviceType: "",
                    deviceModel: "",
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.image = res.data.url;
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