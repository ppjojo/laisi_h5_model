<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <!-- <el-form-item label="MAC">
					<el-input v-model="searchForm.mac" placeholder="MAC"></el-input>
				</el-form-item> -->
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.userId" placeholder="用户ID" @input="userIdChange"></el-input>
                </el-form-item>
                <el-form-item label="memberId">
                    <el-select v-model="searchForm.memberId" placeholder="请选择子账户" clearable>
                        <el-option v-for="item in memberList" :key="item.memberId" :label="item.memberId"
                            :value="item.memberId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间类型">
                    <el-select v-model="searchForm.type" placeholder="请选择时间类型" clearable>
                        <el-option label="DAY" value="DAY"></el-option>
                        <el-option label="WEEK" value="WEEK"></el-option>
                        <el-option label="MONTH" value="MONTH"></el-option>
                        <el-option label="YEAR" value="YEAR"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="mac" v-if="searchForm.type=='DAY'">
                    <el-select  v-model="searchForm.mac" placeholder="请选择mac" clearable>
                        <el-option v-for="item in macList" :key="item" :label="item"
                            :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker v-model="searchForm.startTime" type="date" placeholder="选择日期"
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="设备型号">
                    <el-select v-model="searchForm.deviceModel" placeholder="请选择设备型号" clearable>
                        <el-option v-for="item in deviceModelList" :label="item.deviceName" :value="item.deviceModel">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="searchData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" label="开始时间">
                <template slot-scope="scope">
                    {{ scope.row.startStamp |  formatDate}}</span>
                </template>
            </el-table-column>
			<el-table-column align="center" prop="sportType" label="运动类型">
			</el-table-column>
			<el-table-column align="center" prop="avgPace" label="平均速率">
			</el-table-column>
			<el-table-column align="center" prop="calory" label="卡路里">
			</el-table-column>
			<el-table-column align="center" prop="distance" label="距离">
			</el-table-column>
			<el-table-column align="center" prop="usedTime" label="使用时长">
			</el-table-column>
			<el-table-column align="center" prop="deviceModel" label="设备型号">
			</el-table-column>
			<el-table-column align="center" prop="userId" label="userID">
			</el-table-column>
			<el-table-column align="center" prop="mac" label="mac地址">
			</el-table-column>
            <el-table-column align="center" prop="totalCalory" label="总卡路里">
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    import { memberList, watchListInfo,MacList } from '@/api/dataSearch/dataSearch'
    import { checkPermission } from '@/api/checkPermission'
    import { formatDate } from '@/utils/date'
    import { listItem as productListItem } from '@/api/device/productList'

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
                memberList: [],
                macList:[],
                searchForm: {
                    userId: "",
					memberId: "",
					startTime: "",
					type: "",
					mac: "C0:85:92:D7:16:49",
					deviceModel: ""
                },

            }
        },
        mounted() {
            this.getProductList()
        },
        methods: {
            userIdChange(value) {
                if (value.length == 8) {
                    this.getMemberList()
                    this.getMacList();
                }
            },
            getMemberList() {
                memberList({
                    uid: this.searchForm.userId
                }).then(res => {
                    this.memberList = res.data;
                    this.loading = false
                })
            },
            getMacList(){
              MacList({userId:this.searchForm.userId}).then(res=>{
                this.macList = res.data;
              })
            },
            getProductList() {
                productListItem({}).then(res => {
                    let data = res.data;
                    this.deviceModelList = data.reduce(function (item, next) {
                        if (next.deviceType == 'watch') item.push(next)
                        return item;
                    }, []);
                })
            },
            searchData() {
                let para = this.searchForm;
                para.timeStamp = new Date().getTime();
                watchListInfo(para).then(res => {
                    this.loading = false;
                    if (!res.data) return;
                    this.list = res.data;
                })
            }
        }
    }
</script>