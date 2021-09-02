<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.ownerId" placeholder="用户ID"></el-input>
                </el-form-item>
                <el-form-item label="MAC">
                    <el-input v-model="searchForm.mac" placeholder="蓝牙地址"></el-input>
                </el-form-item>
                <el-form-item label="跳绳时间段：" prop="startTime_endTime">
                    <el-date-picker v-model="startTime_endTime" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column  align="center" prop="userId" label="UserId"></el-table-column>
            <el-table-column  align="center" prop="mac" label="MAC"></el-table-column>
            <!-- <el-table-column prop="memberId" label="成员ID"></el-table-column> -->
            <el-table-column     align="center" prop="count" sortable label="总圈数"></el-table-column>
            <el-table-column  align="center" prop="mode" label="模式">
                <template scope="scope">
                    {{scope.row.mode==1?"自由转":scope.row.mode==2?"倒计时":""}}
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="duration" sortable label="持续时间(秒)">
                <template scope="scope">
                    {{scope.row.duration/1000}}
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="avgRate" label="平均转速"></el-table-column>
            <el-table-column  align="center" prop="maxRate" sortable label="最大转速"></el-table-column>
            <el-table-column  align="center" prop="avgStrength" label="平均力量"></el-table-column>
            <el-table-column  align="center" prop="maxStrength" sortable label="最大力量"></el-table-column>
            <el-table-column  align="center" prop="deviceModel" label="设备型号"></el-table-column>
            <el-table-column  align="center" prop="startTime" sortable label="数据时间">
                <template scope="scope">
                    {{scope.row.startTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="createTime" sortable label="上报时间">
                <template scope="scope">
                    {{scope.row.createTime | formatDate}}
                </template>
            </el-table-column>

            
        </el-table>


        <el-dialog title='数据详情' :visible.sync="dialogVisible" width="50%">
            <el-table :data="detailList" highlight-current-row style="width: 100%;">
                <el-table-column align="center" prop="order" label="序号"></el-table-column>
                <el-table-column align="center" prop="count" label="数量"></el-table-column>
                <el-table-column align="center" prop=" duration" label="时长(秒)">
                    <template scope="scope">
                        {{scope.row.duration/1000}}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>

      

    </div>
</template>

<script>
    import { wristballSearch as listItem  } from '@/api/dataSearch/dataSearch'
    import { checkPermission } from '@/api/checkPermission'
    import { formatDate } from '@/utils/date'

    export default {
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
                startTime_endTime: "",
                searchForm: {
                    ownerId: "",
                    mac: "",
                    endTimeStamp: "",
                    startTimeStamp: ""
                },
                
            }
        },
        mounted() {
            //this.getList()
        },
        methods: {
            getList() {
                let para = this.searchForm;
                if (this.startTime_endTime) {
                    para.startTimeStamp = this.startTime_endTime[0]
                    para.endTimeStamp =this.startTime_endTime[1]
                } else {
                    para.startTimeStamp = ""
                    para.endTimeStamp = ""
                }
                listItem(para).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            
           
           
           
            
        }
    }
</script>

