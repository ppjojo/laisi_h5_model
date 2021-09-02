<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.userId" placeholder="用户ID" @input="userIdChange"></el-input>
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
                <el-form-item label="运动类型">
                    <el-select v-model="searchForm.sportType" placeholder="请选择运动类型" clearable>
                        <el-option  label="室内跑" value="runin"></el-option>
                        <el-option  label="户外跑" value="runout"></el-option>
                        <el-option  label="健走" value="walk"></el-option>
                        <el-option  label="户外骑行" value="ride"></el-option>
                        <el-option  label="室内骑行" value="rideIndoor"></el-option>
                        <el-option  label="徒步" value="onFoot"></el-option>
                        <el-option  label="爬山" value="mountaineering"></el-option>
                        <el-option  label="羽毛球" value="badminton"></el-option>
                        <el-option  label="足球" value="football"></el-option>
                        <el-option  label="篮球" value="basketball"></el-option>
                        <el-option  label="网球" value="tennis"></el-option>
                        <el-option  label="跳舞" value="dancing"></el-option>
                        <el-option  label="瑜伽" value="yoga"></el-option>
                        <el-option  label="自由训练" value="freeTraining"></el-option>
                        <el-option  label="越野跑" value="trailRun"></el-option>
                        <el-option  label="户外骑行" value="swimming"></el-option>
                        <el-option  label="室内游泳" value="rideIndoor"></el-option>
                        <el-option  label="室内健走" value="walkIn"></el-option>
                        <el-option  label="划船机" value="rower"></el-option>
                        <el-option  label="椭圆机" value="elliptical"></el-option>
                    </el-select>
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
					{{ scope.row.startStamp | formatDate }}
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

        </el-table>
    </div>
</template>

<script>
    import {  watchGetHistory,MacList } from '@/api/dataSearch/dataSearch'
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
                    memberId: "1",
                    startTime: "",
                    type: "",
                    mac:"",
                    deviceModel:""
                },

            }
        },
        mounted() {
            this.getProductList()
        },
        methods: {
          userIdChange(value) {
              if (value.length == 8) {
                  this.getMacList();
              }
          },
          getMacList(){
            MacList({userId:this.searchForm.userId}).then(res=>{
              this.macList = res.data;
            })
          },
            getMemberList() {
                memberList({
                    uid: this.searchForm.userId
                }).then(res => {
                    this.memberList = res.data;
                    this.loading = false
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
                watchGetHistory(para).then(res => {
                    this.loading = false;
                    if (!res.data) return;
                    this.list = res.data.lastedInfo
                })
            }
        }
    }
</script>
