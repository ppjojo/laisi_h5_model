<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="musicName" label="音乐名称">
            </el-table-column>
            <el-table-column align="center" prop="musicUrl" label="音乐地址">
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


        <!--新增和编辑界面-->
        <el-dialog title='新增音乐' :visible.sync="dialogVisible">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="音乐名称" prop="musicName">
                    <el-input v-model.trim="form.musicName"></el-input>
                </el-form-item>
                <el-form-item label="音乐文件" prop="musicUrl">
                    <el-input v-model.trim="form.musicUrl" :readonly=true></el-input>
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" width="60">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, deleteItem } from '@/api/videoCourse/music'
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
                    musicName: [
                        { required: true, message: '请输入音乐名称', trigger: 'blur' },
                    ],
                    musicUrl: [
                        { required: true, message: '请上传音乐', trigger: 'blur' },
                    ]
                },
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
                        addItem(this.form).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功新增' + this.form.musicName
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除音乐, 是否继续?', '提示', {
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
                            message: '成功删除所选音乐!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除音乐操作',
                        type: 'info'
                    });
                });
            },
            //添加
            btn_add() {
                this.dialogVisible = true;
                this.form = {
                    musicName: "",
                    musicUrl: ""
                }
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.musicUrl = res.data.url;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    img {
        width: 1rem
    }
</style>