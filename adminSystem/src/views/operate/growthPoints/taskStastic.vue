<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <!-- <el-form-item label="任务标识码">
                    <el-input v-model="searchForm.actionType"  clearable></el-input>
                </el-form-item> -->
                <el-form-item label="模块名">
                    <el-input v-model="searchForm.modelName"  clearable></el-input>
                </el-form-item>
                <!-- <el-form-item label="任务名">
                    <el-input v-model="searchForm.actionName"  clearable></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="success" @click="getList()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="actionType" label="任务标识码"  width="150">
            </el-table-column>
            <el-table-column align="center" prop="modelName" label="模块名">
            </el-table-column>
            <el-table-column align="center" prop="actionName" label="任务名">
            </el-table-column>
            <el-table-column align="center" prop="actionCount" label="完成统计">
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


       

    </div>
</template>

<script>
    import { listItem, addItem, viewItem } from '@/api/growthPoints/taskStastic'
    import { checkPermission } from '@/api/checkPermission'
    import Pagination from "@/components/pagination";
    import {formatDate} from "@/utils/date";
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
        filters: {
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }

        },
        data() {
            return {
                list: [],
                loading: false,
                page: 0,
                limit: 10,
                total: 0,

                dialogVisible: false,
                form: {},
                searchForm: {},
                rules: {},
                

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val-1;
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