<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="name" label="分类">
            </el-table-column>
            <el-table-column align="center" label="分类图标">
                <template slot-scope="scope">
                    <img :src="scope.row.image" alt="" width="80px">
                </template>
            </el-table-column>
            <el-table-column align="center" label="分类显示" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isShow | statusFilter" size="mini">{{ scope.row.isShow==0?"不显示":"显示" }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="orderNum" label="排序">
            </el-table-column>
            <el-table-column align="center" label="专区推荐展示" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.recommend | statusFilter" size="mini">
                        {{ scope.row.recommend==0?"不展示":"展示" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="showNum" label="专区数量">
            </el-table-column>


            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                    <el-button @click="btn_sortClass(scope.row)" type="text" size="mini" style="color:#67c23a;"
                        v-if="checkPer('sortClass')">课程排序
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'分类'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="分类名" prop="name">
                    <el-input v-model.trim="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分类图标" prop="image">
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.image" :src="form.image" class="avatar" width="80px">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="专区推荐" prop="recommend">
                    <el-radio-group v-model.number="form.recommend">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="分类显示" prop="isShow">
                    <el-radio-group v-model.number="form.isShow">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="分类排序" prop="orderNum">
                    <el-input v-model.number="form.orderNum"></el-input>
                </el-form-item>
                <el-form-item label="专区显示数量" prop="showNum">
                    <el-input v-model.number="form.showNum"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" width="60">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="dialogTitle+'分类下的课程排序'" :visible.sync="sortClassdialogVisible" width="50%">
            <div class="container-edit">
                <el-button type="primary" size="mini" @click="btn_add_sortClass()" v-if="checkPer('sortClass')">提交当前排序
                </el-button>
            </div>
            <el-table :data="sortClassList" highlight-current-row v-loading="sortClassloading">
                <el-table-column prop="id" label="ID" width="65">
                </el-table-column>
                <el-table-column prop="className" label="课程名称">
                </el-table-column>
                <el-table-column align="center" label="课程封面">
                    <template slot-scope="scope">
                        <img :src="scope.row.classCover" alt="" width="120px">
                    </template>
                </el-table-column>
                <el-table-column prop="orderNum" label="排序">
                    <template scope="scope">
                        <div class="inlineEdit">
                            <el-input v-model.number="scope.row.orderNum"></el-input>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    import { addItem, updateItem, deleteItem, queryAllBigByCatalogId, updateCatalogList } from '@/api/videoCourse/catalog'
    import { catalogListItem } from '@/api/videoCourse/course'
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
                    name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                    ],
                    image: [
                        { required: true, message: '请上传图标', trigger: 'blur' },
                    ]
                },
                sortClassdialogVisible: false,

                sortClassList: [],
                sortClassloading: false,
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                catalogListItem({}).then(res => {
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
                                    message: '成功新增' + this.form.name + '分类'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.name + '分类'
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
                    image: "",
                    isShow: 0,
                    name: "",
                    orderNum: "",
                    recommend: 0,
                    showNum: "0",
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
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
            btn_sortClass(row) {
                this.sortClassdialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
                this.sortClassloading = true
                queryAllBigByCatalogId({
                    catalogId: this.form.id,
                    status: 1
                }).then(res => {
                    this.sortClassloading = false
                    this.sortClassList = res.data
                    this.sortClassList.forEach(item => {
                        if (item.cbigClass) {
                            item.className = item.cbigClass.className
                        }
                    });
                })
            },
            btn_add_sortClass() {
                var para=[]
                this.sortClassList.forEach(item => {
                    let arr = {};
                    arr = {
                        catalogId: this.form.id,
                        bigClassId: item.id,
                        orderNum: item.orderNum,
                    }
                    para.push(arr)
                });
                this.$confirm('此操作将修改分类下的课程排序, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    updateCatalogList(para).then(response => {
                        this.sortClassdialogVisible=false
                        this.$notify({
                            type: 'success',
                            message: '成功修改排序!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消修改排序操作',
                        type: 'info'
                    });
                });

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
        height: 100px;
        display: block;
    }
</style>