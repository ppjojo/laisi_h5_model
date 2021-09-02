<template>
    <div class="app-container">
        <!-- <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="注册时间">
                    <el-date-picker v-model="searchForm.startTime1" type="date" placeholder="开始日期"
                        value-format="timestamp">
                    </el-date-picker> 至
                    <el-date-picker v-model="searchForm.endTime1" type="date" placeholder="结束日期"
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div> -->
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" label="时间" width="140">
                <template slot-scope="scope">
                    {{scope.row.checkTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="newAttendCount" label="新增用户数">
            </el-table-column>
            <el-table-column align="center" prop="count" label="参与用户数">
            </el-table-column>
            
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>
    </div>
</template>

<script>
    import { getEveryDayNewUser as listItem } from '@/api/operateReport/operateReport'
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
                return formatDate(date, 'yyyy-MM-dd')
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
                    deviceType: null,
                    deviceModel: null,
                    endTime: "",
                    startTime: ""
                },
                deviceModelList: [],
                deviceTypeList: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                  pageNum:this.page,
                  pageSize:this.limit
                }).then(res => {
                    this.list = res.data.listResult;
                    this.total = res.data.count;
                    this.loading = false
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val ;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val) {
                this.limit = val;
                this.getList()
            },
        }
    }
</script>
