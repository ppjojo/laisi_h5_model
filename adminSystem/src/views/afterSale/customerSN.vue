<template>
    <div class="app-container">
        <div class="container-edit">
            <el-upload ref='upload' v-if="checkPer('import')" action="" accept=".xls, .xlsx" :http-request="requestFile"
                style="display: inline-block;margin:0 10px;" :show-file-list="false">
                <el-button type="primary" size="mini">
                    导入
                </el-button>
            </el-upload>
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="客户">
                    <el-input v-model="searchForm.sheetName"></el-input>
                </el-form-item>
                <el-form-item label="Mac">
                    <el-input v-model="searchForm.mac"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="page=1;getList()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="sheetName" label="客户名">
            </el-table-column>
            <el-table-column align="center" prop="sheetCode" label="客户标识码">
            </el-table-column>
            <el-table-column align="center" prop="sn" label="SN">
            </el-table-column>
            <el-table-column align="center" prop="mac" label="MAC">
            </el-table-column>
            <el-table-column align="center" prop="deviceModel" label="设备型号">
            </el-table-column>

            <el-table-column align="center" label="操作" width="120">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click="btn_delete(scope.row)" type="text" size="mini" style="color:#f78989"
                        v-if="checkPer('delete')">删除
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'品牌'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="客户名">
                    <el-input v-model="form.sheetName"></el-input>
                </el-form-item>
                <el-form-item label="客户标识码">
                    <el-input v-model="form.sheetCode"></el-input>
                </el-form-item>
                <el-form-item label="SN">
                    <el-input v-model="form.sn"></el-input>
                </el-form-item>
                <el-form-item label="Mac">
                    <el-input v-model="form.mac"></el-input>
                </el-form-item>
                <el-form-item label="设备型号">
                    <el-input v-model="form.deviceModel"></el-input>
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
    import Pagination from "@/components/pagination";
    import { listItem, addItem, updateItem, deleteItem, importExcel } from '@/api/afterSale/customerSN'
    import { checkPermission } from '@/api/checkPermission'
    import { fileUpload } from '@/utils/fileUpload'
    import { formatDate } from '@/utils/date'

    export default {
        components: {
            Pagination
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    2: 'success',
                    // 1: 'gray',
                    // 1: 'danger'
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
                page: 1,
                limit: 10,
                total: 0,

                dialogVisible: false,
                form: {},
                rules: {

                },
                searchForm: {
                    sheetName:"",
                    mac:""
                },

            }
        },
        mounted() {
            this.getList()
        },
        methods: {

            getList() {
                listItem({
                    offset: this.page - 1,
                    limit: this.limit,
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data.queryAllList
                    this.total = res.data.count
                    this.loading = false
                })
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.dialogTitle == "新增") {
                            addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.sn
                                });
                                this.dialogVisible = false
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.sn
                                });
                                this.dialogVisible = false
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
                    sn: "",
                    mac: "",
                    deviceModel: "LS-T20L",
                    sheetName: "",
                    sheetCode:""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        userId: row.id,
                    }).then(response => {
                        this.page = 1;
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                importExcel(fileForm).then(res => {
                    if (res.code == 0) {
                        this.getList()
                    }
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val) {
                this.limit = val;
                this.getList()
            }

        }
    }
</script>