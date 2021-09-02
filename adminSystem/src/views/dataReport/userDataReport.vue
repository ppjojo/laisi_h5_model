<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <!-- <el-form-item label="设备型号">
                    <el-select v-model="searchForm.deviceModel" placeholder="请选择设备型号" clearable>
                        <el-option v-for="item in deviceModelList" :key="item.deviceModel" :label="item.deviceModel"
                            :value="item.deviceModel">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="所属设备类型：">
                    <el-select v-model="searchForm.deviceType" clearable>
                        <el-option v-for="item in deviceTypeList" :key="item.deviceType" :label="item.deviceType"
                            :value="item.deviceType">
                        </el-option>
                    </el-select>
                </el-form-item>
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
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="userId" label="用户ID" width="120">
            </el-table-column>
            <el-table-column align="center" prop="nickName" label="用户昵称">
            </el-table-column>
            <el-table-column align="center" prop="city" label="城市">
            </el-table-column>
            <!-- <el-table-column align="center" prop="bindTime" label="绑定时间">
                <template scope="scope">
                    {{scope.row.bindTime.split('T')[0]}}
                </template>
            </el-table-column> -->
            <el-table-column align="center" prop="deviceType" label="设备类型">
            </el-table-column>
            <el-table-column align="center" prop="deviceModel" label="设备型号">
            </el-table-column>

        </el-table>

        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>






    </div>
</template>

<script>
    import { listItem as productListItem } from '@/api/device/productList'
    import { listItem } from '@/api/dataReport/userDataReport'
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
            this.getProductList()
            this.getList()
        },
        methods: {
            getList() {
                if (this.searchForm.startTime1) this.searchForm.startTime = this.searchForm.startTime1 / 1000
                if (this.searchForm.endTime1) this.searchForm.endTime = this.searchForm.endTime1 / 1000
                listItem({
                    pageNum: this.page,
                    pageSize: this.limit,
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data.list;
                    this.total = res.data.total;
                    this.loading = false
                })
            },
            getProductList() {
                productListItem({}).then(res => {
                    this.deviceModelList = res.data
                    var obj = {};
                    this.deviceTypeList = res.data.reduce(function (item, next) {
                        obj[next.deviceType] ? '' : obj[next.deviceType] = true && item.push(next);
                        return item;
                    }, []);
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