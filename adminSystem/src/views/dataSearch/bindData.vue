<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.bgUserId" placeholder="用户ID" @input="userIdChange"></el-input>
                </el-form-item>
                <el-form-item label="memberId">
                    <el-select v-model="searchForm.memberId" placeholder="请选择子账户" clearable>
                        <el-option v-for="item in memberList" :key="item.memberId" :label="item.memberId"
                            :value="item.memberId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getBindListByMemberId">查询子账户的绑定设备</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="getBindListByUserId">查询主账户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column  align="center" prop="deviceId" label="Mac"></el-table-column>
            <el-table-column  align="center" prop="deviceNickName" label="设备昵称">
            </el-table-column>
            <el-table-column  align="center" prop="deviceType" label="设备类型">
            </el-table-column>
            <el-table-column  align="center" prop="deviceModel" label="设备型号">
            </el-table-column>
            <el-table-column  align="center" prop="lastBindTime" label="绑定时间">
                <template slot-scope="scope">
                    {{(scope.row.lastBindTime||scope.row.operatingTime) | formatDate}}
				</template>
            </el-table-column>
        </el-table>







    </div>
</template>

<script>
    import { bindListByUserId, memberList,bindListByMemberId } from '@/api/dataSearch/dataSearch'
    import { checkPermission } from '@/api/checkPermission'
    import { formatDate } from '@/utils/date'
    export default {
       filters: {
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
                memberList:[],
                
                searchForm: {
                    bgUserId: '',
                    memberId: ""
                },
                dev: "production"

            }
        },
        mounted() {
           //this.getMemberList()
        },
        methods: {
            userIdChange(value) {
                if (value.length == 8) {
                    this.getMemberList()
                }
            },
            getMemberList() {
                memberList({
                    uid: this.searchForm.bgUserId
                }).then(res => {
                    this.memberList = res.data;
                    this.loading = false
                })
            },
            getBindListByUserId(){
                if (!this.searchForm.bgUserId) {
                    this.$message({
                        showClose: true,
                        message: "请输入UserId",
                        type: "error"
                    });
                    return
                }
                bindListByUserId(this.searchForm).then(res => {
                    this.list = res.data;
                    this.loading = false
                })
            },
            getBindListByMemberId(){
                if (!this.searchForm.memberId || !this.searchForm.bgUserId) {
                    this.$message({
                        showClose: true,
                        message: "请输入UserId或者选择memberId",
                        type: "error"
                    });
                    return
                }
                bindListByMemberId(this.searchForm).then(res => {
                    this.list = res.data;
                    this.loading = false
                })
            }
           
            





        }
    }
</script>