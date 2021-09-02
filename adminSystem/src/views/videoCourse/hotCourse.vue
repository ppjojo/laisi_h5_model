<template>
    <div class="app-container">
        <el-divider content-position="left">同时只能有两个小图和一个大图处于上架状态</el-divider>
        <el-divider content-position="left">排序号（1,2）对应小图，（3）对应大图。</el-divider>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="name" label="课程名">
            </el-table-column>
            <el-table-column align="center" prop="musicName" label="封面">
                <template slot-scope="scope">
                    <img :class=" scope.row.orderNum===3 ? 'imgLoc3':'imgLoc2' " :src="scope.row.hotCover" alt="">
                </template>
            </el-table-column>
            <el-table-column align="center" prop="orderNum" label="排序">
            </el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"下架":"已上架" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


        <!--新增和编辑界面-->
        <el-dialog title='修改热门' :visible.sync="dialogVisible">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="课程名" >
                    <el-input v-model.trim="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="热门封面" prop="classCover">
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.hotCover" :src="form.hotCover" class="avatar" :class=" form.orderNum===3 ? 'imgLoc3':'imgLoc2' ">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0" inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.orderNum"></el-input>
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
    import { listItem, updateItem, deleteItem } from '@/api/videoCourse/hotCourse'
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
                    this.list.forEach(item => {
                        if (item.cbigClass) {
                            item.name = item.cbigClass.className
                        }
                    });
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
                                message: '成功修改' + this.form.name
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
                this.$confirm('此操作将永久删除热门, 是否继续?', '提示', {
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
                            message: '成功删除所选热门!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除热门操作',
                        type: 'info'
                    });
                });
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
                        this.form.hotCover = res.data.url;
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    img.imgLoc2 {
        width: 100px
    }

    img.imgLoc3 {
        width: 170px
    }
</style>