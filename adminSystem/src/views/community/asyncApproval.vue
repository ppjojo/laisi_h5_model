<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true">
                <el-form-item label="举报类型">
                    <el-select v-model="reportContentId" @change="reportContentChange">
                        <el-option v-for="item in reportContentList" :key="item.id" :label="item.reportContent"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="dialogVisible=true" v-if="checkPer('add')">举报类型</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="reportContent" label="举报类型">
            </el-table-column>
            <el-table-column align="center" prop="beingReporterId" label="被举报者UserId">
            </el-table-column>
            <el-table-column align="center" prop="nickName" label="被举报者昵称">
            </el-table-column>
            <el-table-column align="center" prop="reportCount" label="被举报次数">
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog title="举报类型管理" :visible.sync="dialogVisible" width="50%">
            <div class="container-edit">
                <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加举报类型</el-button>
            </div>
            <el-table :data="reportContentList" highlight-current-row v-loading="listLoading" style="width: 100%;">
                <el-table-column align="center" prop="id" label="ID"></el-table-column>
                <el-table-column align="center" prop="orderNumber" label="排序号">
                </el-table-column>
                <el-table-column align="center" prop="reportContent" label="举报类型">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                        </el-button>
                        <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                            v-if="checkPer('delete')">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'举报类型'" :visible.sync="reportVisible" append-to-body>
            <el-form :model="form" label-width="150px" :rules="rules" ref="form"
                v-loading="formLoading">
                <el-form-item label="举报类型：" prop="reportContent">
                    <el-input v-model.trim="form.reportContent"></el-input>
                </el-form-item>
                <el-form-item label="排序号：" prop="orderNumber">
                    <el-input type="number" v-model.trim="form.orderNumber"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="reportVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { userListItem, listItem, addItem, updateItem, deleteItem } from '@/api/community/report'
    import { checkPermission } from '@/api/checkPermission'

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
                    reportContent: [
                        { required: true, message: '请输入举报类型', trigger: 'blur' },
                    ],
                    orderNumber: [
                        { required: true, message: '请输入排序号', trigger: 'blur' },
                    ],
                },
                reportContentList: [],
                reportContentId: "",
                reportVisible:false,

            }
        },
        mounted() {
            this.getTypeList()
        },
        methods: {
            getTypeList() {
                listItem({
                    oﬀset: 0,
                    limit: 99999
                }).then(res => {
                    this.reportContentList = res.data
                    this.getUserList(res.data[0])
                    this.loading = false
                })
            },
            getUserList(item) {
                userListItem({
                    reportId: item.id,
                    oﬀset: 0,
                    limit: 99999
                }).then(res => {
                    this.reportContentId=item.id
                    this.list = res.data
                    this.list.map(element => {
                        element.reportContent = item.reportContent
                    });
                    this.loading = false
                })
            },
            //选择类型改变
            reportContentChange(value) {
                this.reportContentList.forEach(item => {
                    if (item.id == value) {
                        this.getUserList(item)
                    }
                })
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.reportVisible = false
                        if (this.dialogTitle == "新增") {
                            addItem(this.form).then(response => {
                                this.getTypeList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.reportContent 
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getTypeList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.reportContent
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
                this.reportVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    reportContent: ""
                }
            },
            btn_edit(row) {
                this.reportVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除该举报类型, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        id: id,
                    }).then(response => {
                        this.getTypeList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选举报类型!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },

        }
    }
</script>