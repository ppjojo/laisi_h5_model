<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.userId" placeholder="用户ID"></el-input>
                </el-form-item>
                <el-form-item label="设备型号：">
                    <el-select v-model="searchForm.deviceModel" placeholder="请选择设备型号" clearable>
                        <el-option v-for="item in deviceModelList" :key="item.deviceModel" :label="item.deviceModel"
                            :value="item.deviceModel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="MAC">
                    <el-input v-model="searchForm.deviceMac" placeholder="蓝牙地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID"></el-table-column>
            <el-table-column align="center" prop="userId" label="UserId"></el-table-column>
            <el-table-column align="center" prop="deviceMac" label="MAC"></el-table-column>
            <el-table-column align="center" prop="deviceModel" label="设备型号"></el-table-column>
            <el-table-column align="center" prop="platform" label="平台"></el-table-column>
            <el-table-column align="center" prop="timeZone" label="时区"></el-table-column>
            <el-table-column align="center" prop="setSuss" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.setSuss | statusFilter" size="mini">{{ scope.row.setSuss==1?"成功":"失败" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column    align="center"  prop="failReason" label="失败原因">
            </el-table-column>

            <el-table-column align="center" prop="setTime" sortable label="上报时间">
                <template slot-scope="scope">
                    {{scope.row.setTime | formatDate}}
                </template>
            </el-table-column>
           
        </el-table>

        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>






    </div>
</template>

<script>
    import { listItem as productListItem } from '@/api/device/productList'
    import { trackingUploadDtatus as listItem } from '@/api/dataSearch/dataSearch'
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
                    1: 'success',
                    // 0: 'gray',
                    0: 'danger'
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
                searchForm: {
                    userId: "",
                    deviceMac: "",
                    deviceModel: "",
                },
                deviceModelList: []

            }
        },
        mounted() {
            this.getProductList()
        },
        methods: {
            getList() {
                listItem({
                    page: this.page,
                    pageSize: this.limit,
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data.list2;
                    this.total = res.data.count;
                    this.loading = false
                })
            },
            getProductList() {
                productListItem({}).then(res => {
                    this.deviceModelList = res.data
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
            btn_delete(row) {
                this.$confirm('此操作将永久账户相关信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        accountId: row.userId,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选账户相关信息!'
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