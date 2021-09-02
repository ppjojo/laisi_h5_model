<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="userId" label="userId" width="100"></el-table-column>
            <el-table-column align="center" prop="headPictureUrl" label="头像">
                <template scope="scope">
                    <el-image style="width: 60px; height: 60px" :src=" scope.row.headPictureUrl" fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="nickName" label="昵称">
            </el-table-column>
            <el-table-column align="center" prop="fansCount" label="粉丝数">
            </el-table-column>
            <el-table-column align="center" prop="storiesCount" label="发帖数">
            </el-table-column>
            <el-table-column align="center" prop="likesCount" label="获赞数">
            </el-table-column>
            <el-table-column align="center" prop="priority" label="优先级">
                <template scope="scope">
                    <el-input v-model="scope.row.priority" @change="priorityChange(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click=" btn_delete(scope.row.userId)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'达人账户'" :visible.sync="dialogVisible" width="50%">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input v-model="searchWord" placeholder="手机号、昵称、ID"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="queryAndAdd()">搜索</el-button>
                </el-col>
            </el-row>
            <el-table :data="searcLlist" highlight-current-row style="width: 100%;margin-top: 20px;">
                <el-table-column prop="userId" label="userId"></el-table-column>
                <el-table-column prop="headPictureUrl" label="头像">
                    <template scope="scope">
                        <el-image style="width: 60px; height: 60px" :src="scope.row.headPictureUrl" fit="fit">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="nickName" label="昵称">
                </el-table-column>
                <el-table-column prop="bindPhoneNumber" label="手机号">
                </el-table-column>
                <el-table-column prop="gender" label="性别">
                    <template scope="scope">
                        {{scope.row.gender==1?"男":"女"}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="submitForm(scope.row)">添加</el-button>
                        <el-button type="text" style="color:#f78989;" size="small" @click="btn_delete(scope.row.userId)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem,updateItem, queryUser, deleteItem } from '@/api/community/talent'
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
                form: {},
                rules: {

                },
                searcLlist: [],
                searchWord: "",


            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                    page: this.page,
                    pageSize: this.pageSize
                }).then(res => {
                    this.list = res.data.content
                    this.total = res.data.total
                    this.loading = false
                })
            },
            queryAndAdd() {
                queryUser({
                    page: 0,
                    pageSize: 99999,
                    key: this.searchWord,
                }).then(res => {
                    this.searcLlist = res.data.content;
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
            submitForm(row) {
                this.dialogVisible = false
                addItem(row).then(response => {
                    this.getList()
                    this.$notify({
                        type: 'success',
                        message: '成功新增达人账户'
                    });
                })
            },
            btn_add() {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.searchWord = "";
                this.searcLlist = [];
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除该达人账户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        userId: id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除该达人账户!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            priorityChange(obj){
                updateItem(obj).then(response => {
                    this.getList()
                    this.$notify({
                        type: 'success',
                        message: '成功修改达人优先级'
                    });
                })
            }
        }
    }
</script>