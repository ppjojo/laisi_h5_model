<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="统计日期">
                    <el-date-picker v-model="searchForm.statisticalTime" type="date" placeholder="统计日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <!-- <el-date-picker v-model="searchForm.endTime1" type="date" placeholder="结束日期"
                        value-format="timestamp">
                    </el-date-picker> -->
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="bindTime" label="统计时间">
                <template scope="scope">
                    {{scope.row.statisticalTime.split('T')[0]}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="activityCount" label="创建活动数">
            </el-table-column>
            <el-table-column align="center" prop="activityJoinCount" label="活动加入人数">
            </el-table-column>
            <el-table-column align="center" prop="competitionCount" label="创建比赛数">
            </el-table-column>
            <el-table-column align="center" prop="competitionJoinCount" label="比赛加入人数">
            </el-table-column>
            <el-table-column align="center" prop="taskCount" label="创建任务数">
            </el-table-column>
            <el-table-column align="center" prop="taskJoinCount" label="任务加入人数">
            </el-table-column>
            <el-table-column align="center" prop="clubCount" label="创建俱乐部数">
            </el-table-column>
            <el-table-column align="center" prop="clubUsersCount" label="俱乐部新增人数">
            </el-table-column>
        </el-table>

        <!-- <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>
 -->





    </div>
</template>

<script>
    import { clubListItem as listItem } from '@/api/operateReport/operateReport'
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
                page: 1,
                limit: 10,
                total: 0,
                searchForm: {
                    statisticalTime: '',
                },
                deviceModelList: [],
                deviceTypeList: []
            }
        },
        mounted() {
            // this.getList()
        },
        methods: {
            getList() {
                // if (this.searchForm.startTime1) this.searchForm.startTime = this.searchForm.startTime1 / 1000
                // if (this.searchForm.endTime1) this.searchForm.endTime = this.searchForm.endTime1 / 1000
                listItem(this.searchForm).then(res => {
                    this.list = res.data;
                    // this.total = res.data.total;
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
