<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="设备型号">
                    <el-select v-model="searchForm.deviceModel" placeholder="全部" clearable>
                        <el-option v-for="item in deviceModelList" :label="item.deviceModel" :value="item.deviceModel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="searchForm.deviceType" placeholder="全部" clearable>
                        <el-option v-for="(item,index) in deviceTypeList" :label="item.deviceType"
                            :value="item.deviceType">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号">
                    <el-input v-model="searchForm.appVersion"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input v-model="searchForm.keyWord"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.processStatus" placeholder="全部" clearable>
                        <el-option v-for="item in processStatusList" :key="item.value" :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="反馈时间:">
                    <el-date-picker v-model="searchForm.timeStart" type="datetime" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至" label-width="25px">
                    <el-date-picker v-model="searchForm.timeEnd" type="datetime" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="savetoExcel">导出数据</el-button>
                </el-form-item> -->
            </el-form>
        </div>
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="ID:">{{ props.row.id }}</el-form-item>
                        <el-form-item label="产品型号:">{{ props.row.deviceModel }}</el-form-item>
                        <el-form-item label="产品类型:">{{ props.row.deviceType }}</el-form-item>
                        <el-form-item label="版本号:">{{ props.row.appVersion }}</el-form-item>
                        <el-form-item label="用户 Id:">{{ props.row.userId }}</el-form-item>
                        <el-form-item label="APP Id:">{{ props.row.appId }}</el-form-item>
                        <el-form-item label="电话号码:">{{ props.row.phoneNumber }}</el-form-item>
                        <el-form-item label="绑定的手机号码:">{{ props.row.bindPhoneNumber }}</el-form-item>
                        <el-form-item label="反馈详情:">{{ props.row.feedback }}</el-form-item>
                        <el-form-item label="反馈时间:">{{ props.row.createTime |formatDate }}</el-form-item>
                        <el-form-item label="处理结果:">{{ props.row.processResult }}</el-form-item>
                    </el-form>
                    <div style="font-size: 14px;color: #606266;line-height: 40px;padding: 0 12px 0 0;font-weight:700">
                        反馈图片:</div>
                    <div>
                        <el-image v-for="item in props.row.pictures" :preview-src-list="props.row.pictures"
                            style="width: 100px; height: 100px;margin-right: 10px;" :src="item" :fit="cover"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="产品型号" prop="deviceModel"></el-table-column>
            <el-table-column align="center" label="产品类型" prop="deviceType"></el-table-column>
            <el-table-column align="center" label="版本号" prop="appVersion"></el-table-column>
            <el-table-column align="center" label="电话号码" prop="phoneNumber"></el-table-column>
            <el-table-column align="center" label="绑定的手机号码" prop="bindPhoneNumber"></el-table-column>
            <el-table-column align="center" label="反馈详情" prop="feedback" :show-overflow-tooltip="true">
            </el-table-column>
            <!-- <el-table-column label="反馈时间" prop="createTime"></el-table-column> -->
            <el-table-column align="center" label="处理结果" prop="processResult" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column align="center" label="处理状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.processStatus | statusFilter" size="mini">
                        {{ scope.row.processStatus==1?"已处理":"未处理" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">处理
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'意见反馈'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" :rules="rules" label-width="100px" ref="form">
                <el-form-item label="处理结果:" prop="processResult">
                    <el-input v-model="form.processResult" placeholder="请输入处理结果" type="textarea" clearable>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, updateItem } from '@/api/feedback/feedbackList'
    import { checkPermission } from '@/api/checkPermission'
    import { listItem as productListItem } from '@/api/device/productList'
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
                total: 20,
                searchForm: {},


                dialogVisible: false,
                form: {},
                rules: {
                    processResult: [
                        { required: true, message: '请输入处理结果', trigger: 'blur' },
                    ],
                },
                deviceTypeList: [],
                deviceModelList: [],
                processStatusList: [
                    { name: "全部", value: "" },
                    { name: "已处理", value: 1 },
                    { name: "未处理", value: 0 },
                ],

            }
        },
        mounted() {
            this.getList()
            this.getProductList()
        },
        methods: {
            getList() {
                listItem({
                    page: this.page,
                    pageSize: this.limit,
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data.pageContent
                    this.total = res.data.totalNumber
                    this.loading = false
                })
            },
            getProductList() {
                productListItem({}).then(res => {
                    this.deviceModelList = res.data;
                    var obj = {};
                    this.deviceTypeList = res.data.reduce((arr, next) => {
                        obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
                        return arr;
                    }, []);

                })
            },

            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        updateItem(this.form).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功处理了意见反馈'
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "处理"
                this.form = {
                    processStatus: 1,
                    id: row.id,
                    processResult: row.processResult
                }
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

        }
    }
</script>
<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>