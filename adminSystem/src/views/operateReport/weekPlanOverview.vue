<template>
    <div class="app-container">
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" label="时间" width="140">
                <template slot-scope="scope">
                    {{scope.row.nowDay | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="testSum" label="参与七日计划总人数">
            </el-table-column>
            <el-table-column align="center" prop="smallFatSum" label="初级减脂参与人数">
            </el-table-column>
            <el-table-column align="center" prop="bigFatSum" label="中级减脂参与人数">
            </el-table-column>
            <el-table-column align="center" prop="smallPhySum" label="初级体能参与人数">
            </el-table-column>
             <el-table-column align="center" prop="bigPhySum" label="中级体能参与人数">
            </el-table-column>
            <el-table-column align="center" prop="smallFatClass" label="初级减脂课程每天参与人数">
            </el-table-column>
            <el-table-column align="center" prop="bigFatClass" label="中级减脂课程每天参与人数">
            </el-table-column>
            <el-table-column align="center" prop="smallPhyClass" label="初级体能课程每天参与人数">
            </el-table-column>
             <el-table-column align="center" prop="bigPhyClass" label="中级体能课程每天参与人数">
            </el-table-column>
            <el-table-column align="center" prop="twoClassNotFinish" label="1节课程参与人数">
            </el-table-column>
            <el-table-column align="center" prop="twoClassFinish" label="解锁2节课以上（完成第二节课）">
            </el-table-column>
            <el-table-column align="center" prop="sevenAllFinish" label="七日计划全部完成的人">
            </el-table-column>
             <el-table-column align="center" prop="againTest" label="七日计划完成再次测评的人数">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getWeekPlanData as listItem } from '@/api/operateReport/operateReport'
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
                    this.list = res.data;
                    this.loading = false
                })
            },
        }
    }
</script>
