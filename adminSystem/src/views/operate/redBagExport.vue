<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="统计时间段">
                     <el-date-picker
                          v-model="searchForm.time"
                          type="daterange"
                          range-separator="至"
                          value-format="timestamp"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="downLoadList">下载</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
             <el-table-column align="center" prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column align="center" prop="userId" label="用户Id" width="100">
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="昵称" >
            </el-table-column>
            <el-table-column align="center" prop="tradeDescribe" label="类型" >
            </el-table-column>
            <el-table-column align="center" prop="tradeDescribe" label="金额（元）" >
                <template slot-scope="scope">
                    {{scope.row.totalAmount /100}}
                </template>
            </el-table-column>
            
           
            <el-table-column align="center" label="时间" width="140">
                <template slot-scope="scope">
                    {{scope.row.createTime | formatDate}}
                </template>
            </el-table-column>
            

            <!-- <el-table-column align="center" label="操作" width="160">
                <template scope="scope">
                    <el-button @click="btn_view(scope.row)" type="text" size="mini">查看详情</el-button>
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" style="color:#67c23a">输入物流单号
                    </el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>




    </div>
</template>

<script>
    import { listItem } from '@/api/operate/redBagExport'
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
                    // 1: 'gray',
                    0: 'danger'
                }
                return statusMap[status]
            },
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
                form: {},
                value1:null,
                searchForm: {
                  time:[]
                },
            }
        },
        mounted() {
            //this.getList()
        },
        methods: {
            getList() {
                if(!this.searchForm.time[0]){
                  return this.$notify({
                        message: '请选择时间段',
                        type: 'info'
                    });
                }
                listItem({
                    beginQueryTime: this.searchForm.time[0],
                    endQueryTime: this.searchForm.time[1],
                }).then(res => {
                    this.list = res.data
                    this.total = res.data.total
                    this.loading = false
                })
            },
            downLoadList(){
                if(!this.searchForm.time[0]){
                  return this.$notify({
                        message: '请选择时间段',
                        type: 'info'
                    });
                }
                window.open(process.env.VUE_APP_BASE_API + "notSignNeedShare/get/money/in/out/download?beginQueryTime="+this.searchForm.time[0]+"&endQueryTime="+this.searchForm.time[1])
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
