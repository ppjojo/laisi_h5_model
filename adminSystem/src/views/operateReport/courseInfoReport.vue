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
            <el-table-column align="center" prop="id" label="ID" width="120">
            </el-table-column>
            <el-table-column align="center" label="时间" width="140">
                <template slot-scope="scope">
                    {{scope.row.dayTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="dayCommentSum" label="日评论数">
            </el-table-column>
            <el-table-column align="center" prop="dayJoinSum" label="日课程加入人数">
            </el-table-column>
            <el-table-column align="center" prop="dayTrainSum" label="日课程训练人数">
            </el-table-column>
            <el-table-column align="center" prop="dayShareSum" label="日课程分享人数">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getSeeClassDate as listItem } from '@/api/operateReport/operateReport'
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
                }).then(res => {
                    this.list = res;
                    this.loading = false
                })
            },
        }
    }
</script>
