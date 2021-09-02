<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.uid" placeholder="用户ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="searchForm.key" placeholder="用户昵称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="page=0;getList()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="uid" label="用户ID">
            </el-table-column>
            <el-table-column align="center" prop="phoneNumber" label="用户账号">
                <template scope="scope" >
                    <span v-if="scope.row.phoneNumber"> {{scope.row.phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="用户昵称">
            </el-table-column>
            <el-table-column align="center" prop="coinCount" label="逗币数">
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog title="派币详情" :visible.sync="dialogVisible" width="60%">
            <el-table :data="detailList" highlight-current-row style="width: 100%;">
                <el-table-column prop="actionSource" label="逗币获取途径"></el-table-column>
                <el-table-column prop="count" label="获取时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="actionChange" label="数量">
                    <template scope="scope">
                        <el-input v-if="scope.row.status!=2&&checkPer('changeCoins')" @change="handleInputBlur(scope.row)" type="number"
                            v-model="scope.row.actionChange"></el-input>
                        <div v-else-if="scope.row.status!=2">{{scope.row.actionChange}}</div>
                        <div v-else>-{{scope.row.actionChange}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageTotal="total2" @handleCurrentChange="handleCurrentChange2" @handleSizeChange="handleSizeChange2">
            </pagination>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, updateItem, viewItem } from '@/api/operate/pointLottery/userCoins'
    import { checkPermission } from '@/api/checkPermission'
    import { formatDate } from '@/utils/date'
    import Pagination from "@/components/pagination";

    export default {
        components: {
            Pagination
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    // 1: 'gray',
                    2: 'danger'
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
                page: 0,
                limit: 10,
                total: 0,

                detailList: [],
                page2: 0,
                limit2: 10,
                total2: 0,

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
                listItem({
                    pageNumber: this.page,
                    pageSize: this.limit,
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data.listResult
                    this.total = res.data.count
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

            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = row
                this.getDetail()
            },
            getDetail() {
                viewItem({
                    userId: this.form.uid,
                    pageNum: this.page2,
                    pageSize: this.limit2
                }).then(res => {
                    this.detailList = res.data.listRecord;
                    this.total2 = res.data.count;
                })
            },
            handleInputBlur(row) {
                updateItem({
                    uid: row.uid,
                    id: row.id,
                    actionChange: parseInt(row.actionChange),
                    claimTime: row.claimTime
                }).then(res => {
                    this.getDetail()
                    this.$notify({
                        type: 'success',
                        message: '成功修改逗币值'
                    });

                })
            },
             // 上下分页
             handleCurrentChange2(val) {
                this.page2 = val - 1;
                this.getDetail()
            },
            // 每页显示多少条
            handleSizeChange2(val) {
                this.limit2 = val;
                this.getDetail()
            },


        }
    }
</script>