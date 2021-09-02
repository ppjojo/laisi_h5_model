<template>
    <div class="app-container">
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            
            <el-table-column align="center" prop="clientId" label="客户ID">
            </el-table-column>
            <el-table-column align="center" prop="mainId" label="主账号ID">
            </el-table-column>
            <el-table-column align="center" prop="nickName" label="主账号昵称">
            </el-table-column>
            <el-table-column align="center" prop="phone" label="手机号">
            </el-table-column>
            <el-table-column align="center" prop="school" label="学校">
            </el-table-column>
            <el-table-column align="center" prop="deviceCode" label="设备码">
            </el-table-column>

            <el-table-column align="center" prop="createTime" label="激活时间">
                <template slot-scope="scope">
                    {{scope.row.createTime.split(".")[0].replace("T"," ")}}
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="120">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('view')">查看
                    </el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog title="账号详情" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="学校名称">
                    <el-input v-model="form.schoolName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="使⽤次数">
                    <el-input v-model="form.usedCount"  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学⽣数量">
                    <el-input v-model="form.studentNumber"  :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">子账户列表</el-divider>
            <el-table border highlight-current-row :data="form.subAccount" size="small ">
                <el-table-column align="center" prop="accountId" label="⼦账户ID">
                </el-table-column>

                <el-table-column align="center" prop="nickName" label="子账号昵称">
                </el-table-column>

                <el-table-column align="center" prop="phone" label="手机号">
                </el-table-column>

                <el-table-column align="center" prop="deviceCode" label="设备码">
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click=" btn_delete_child(scope.row)" type="text" style="color:#f78989;" size="mini"
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

    </div>
</template>

<script>
    import { listItem, viewItem, deleteItem } from '@/api/baisuo/user'
    import { checkPermission } from '@/api/checkPermission'
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
                limit: 10,
                total: 20,

                dialogVisible: false,
                form: {
                    studentNumber: "",
                    subAccount: [],
                    usedCount: ""
                },
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
                    pageNumber: this.page,
                    pageSize: this.limit,
                }).then(res => {
                    this.list = res.data.content
                    this.total = res.data.total
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

            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form.mainId =row.mainId
                this.getDetail()
            },
            getDetail(){
                viewItem({
                    mainId:this.form.mainId,
                }).then(res => {
                    this.form = res.data
                    
                })
            },
            //删除
            btn_delete(row) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        accountId: row.mainId,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选用户!'
                        });
                    })
                }).catch((error) => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            btn_delete_child(row){
                this.$confirm('此操作将永久删除该子账户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        accountId: row.accountId,
                    }).then(response => {
                        this.getDetail()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选子账户!'
                        });
                    })
                }).catch((error) => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            }
        }
    }
</script>