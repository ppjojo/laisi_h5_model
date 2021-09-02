<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
              <el-form-item label="UserId" required>
                  <el-input v-model="searchForm.userId" placeholder="用户ID" @input="userIdChange"></el-input>
              </el-form-item>
              <el-form-item label="memberId">
                  <el-select v-model="searchForm.memberId" placeholder="请选择子账户" clearable>
                      <el-option v-for="item in memberList" :key="item.memberId" :label="item.memberId"
                          :value="item.memberId"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item label="MAC">
					<el-input v-model="searchForm.mac" placeholder="MAC"></el-input>
				</el-form-item>

                <el-form-item label="开始时间">
					<el-date-picker v-model="searchForm.startTime" type="date" placeholder="选择日期" value-format="timestamp">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker v-model="searchForm.endTime" type="date" placeholder="选择日期" value-format="timestamp">
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
            <el-table-column align="center" prop="userId" label="userId">
			</el-table-column>
			<el-table-column align="center" prop="memberId" label="memberId">
			</el-table-column>
			<el-table-column align="center" prop="deviceModel" label="设备型号">
			</el-table-column>
			<el-table-column align="center" prop="mac" label="mac地址">
			</el-table-column>
            <el-table-column align="center" label="记录时间">
				<template slot-scope="scope">
                    {{scope.row.checkTime | formatDate}}
				</template>
			</el-table-column>
			<el-table-column align="center" prop="morningHr" label="晨脉">
			</el-table-column>
			<el-table-column align="center" prop="restingHr" label="静息">
			</el-table-column>
			<el-table-column align="center" prop="maxHr" label="最大心率">
			</el-table-column>
			<el-table-column align="center" prop="minHr" label="最小心率">
			</el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="downLoad(scope.row)" type="text" size="mini">下载详情
          </el-button>
        </template>
      </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { memberList, backgroundHeartSearch,downloadHeart } from '@/api/dataSearch/dataSearch'
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
                deviceModelList: [],

                searchForm: {
                    userId: "",
					memberId: "",
					startTime: "",
					endTime: "",
					mac: "",
					deviceModel: "",
					pageNumber: 0,
					pageSize: 99999
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
                backgroundHeartSearch(para).then(res => {
                    this.loading = false;
                    if (!res.data) return;
                    this.list = res.data.dayResult || res.data.monthOfYearResult || res.data.dayOfWeekResult || res.data.weekOfMonthResult ||res.data;
                })
            },
            downLoad(row) {
              let param = {
                userId: row.userId,
                mac: row.mac,
                startTime: row.checkTime,
                memberId: row.memberId,
                type: "download"
              }
              downloadHeart(param).then(res => {
                let fileName = row.checkTime + ".zip";
                var blob = new Blob([res], {
                  type: 'aplication/zip;charset=utf-8'
                })
                if (window.navigator.msSaveOrOpenBlob) { //msSaveOrOpenBlob方法返回bool值
                  navigator.msSaveBlob(blob, fileName); //本地保存
                } else {
                  var link = document.createElement('a'); //a标签下载
                  link.href = window.URL.createObjectURL(blob);
                  link.download = fileName;
                  link.click();
                  window.URL.revokeObjectURL(link.href);
                }
              })
            },
        }
    }
</script>
