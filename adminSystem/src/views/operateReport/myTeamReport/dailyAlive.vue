<template>
  <div class="app-container">
    <!-- <div class="container-search">
            <el-form :inline="true" :model="searchForm">
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
        </div> -->
    <div class="container-search" style="margin-bottom:20px">
      <el-divider content-position="left">
        <svg-icon icon-class="salesDept_date" /> 总数据</el-divider>
      <div>
        <el-row type="flex" justify="space-between">
          <el-col :span="5">
            <div class="dataBox" style="background-color: #409EFF;">
              <p>小组总数</p>
              <p>{{teamTotalData.groupCount}}</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="dataBox" style="background-color: #67C23A;">
              <p>小组成员总数</p>
              <p>{{teamTotalData.memberCount}}</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div>
              <div class="dataBox" style="background-color: #E6A23C;">
                <p>去重后小组成员</p>
                <p>{{teamTotalData.distinctCount}}</p>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <div>
              <div class="dataBox" style="background-color:grey ;">
                <p>小组平均人数</p>
                <p>{{(teamTotalData.memberCount/teamTotalData.groupCount).toFixed(2)}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" label="时间" width="140">
        <template slot-scope="scope">
          {{scope.row.checkTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="groupCount" label="新增小组数量">
      </el-table-column>
      <el-table-column align="center" prop="activtyGroupCount" label="活跃小组数量">
      </el-table-column>
      
      <el-table-column align="center" prop="memberCount" label="新增成员数量">
      </el-table-column>
      <!-- <el-table-column align="center" prop="activtyMemberCount" label="活跃成员数量">
      </el-table-column> -->

    </el-table>
  </div>
</template>

<script>
  import {
    teamTotal,
    groupDateActivty,
    groupDateCount
  } from '@/api/operateReport/myTeam'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
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
        return formatDate(date, 'yyyy-MM-dd ')
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
        teamTotalData: {}
      }
    },
    mounted() {
      this.getTotal()
      this.getGroupDateCount()
      this.getGroupDateActivty()
    },
    methods: {
      getTotal() {
        teamTotal().then(res => {
          this.teamTotalData = res.data;
        })
      },
      getGroupDateCount() {
        groupDateCount().then(res => {
          this.list = res.data;
          this.loading = false
        })
      },
      getGroupDateActivty() {
        groupDateActivty().then(res => {
          this.list.forEach(item => {
              res.data.forEach(item2=>{
                  if(item.checkTime==item2.checkTime){
                      item.activtyGroupCount=item2.groupCount
                      item.activtyMemberCount=item2.memberCount
                  }
              })
              
          });
          this.loading = false
        })
      },
      // 上下分页
      handleCurrentChange(val) {
        this.page = val;
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


<style lang="scss">
  .dataBox {
    padding: 5px;
    border-radius: 5px;

    p {
      margin: 0;
      padding: 0;

      &:first-child {
        font-size: 18px;
        line-height: 30px;
        color: #DCDFE6;
      }

      &:last-child {
        font-size: 35px;
        line-height: 40px;
        color: #ffffff;
      }
    }

  }

</style>
