<template>
  <div class="app-container">
    <div class="totalNum">
      当前用户数：
      <span>{{form.totalUsers}}</span>
    </div>
    <el-divider content-position="left">
      <svg-icon icon-class="salesDept_date" /> 今日数据</el-divider>
    <div>
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <div class="dataBox" style="background-color: #409EFF;">
            <p>新增用户</p>
            <p>{{form.todayNewUsers}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="dataBox" style="background-color: #67C23A;">
            <p>活跃用户</p>
            <p>{{form.todayActivityUsers}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <div class="dataBox" style="background-color: #E6A23C;">
              <p>启动次数</p>
              <p>{{form.todayLaunches}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider content-position="left">
      <svg-icon icon-class="salesDept_historyDate" /> 昨日数据</el-divider>
    <div>
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <div class="dataBox" style="background-color: #909399;">
            <p>新增用户</p>
            <p>{{form.yesterdayNewUsers}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="dataBox" style="background-color: #909399;">
            <p>活跃用户</p>
            <p>{{form.yesterdayActivityUsers}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <div class="dataBox" style="background-color: #909399;">
              <p>启动次数</p>
              <p>{{form.yesterdayLaunches}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider content-position="left">
      <svg-icon icon-class="dashboard_app" /> APP</el-divider>

    <el-table highlight-current-row :data="list" size="small">
      <el-table-column align="center"label="平台" prop="platform">
      </el-table-column>
      <!-- 
        <el-table-column label="App名称" prop="name">
        </el-table-column> -->

      <el-table-column align="center" label="今日新增" prop="data.todayData.newUsers">
      </el-table-column>

      <el-table-column align="center" label="昨日新增" prop="data.yesterdayData.newUsers">
      </el-table-column>

      <el-table-column align="center" label="今日活跃" prop="data.todayData.activityUsers">
      </el-table-column>

      <el-table-column align="center" label="昨日活跃" prop="data.yesterdayData.activityUsers">
      </el-table-column>

      <el-table-column align="center" label="今日启动" prop="data.todayData.launches">
      </el-table-column>

      <el-table-column align="center" label="昨日启动" prop="data.yesterdayData.launches">
      </el-table-column>

      <el-table-column align="center" label="今日总用户数" prop="data.todayData.totalUsers">
      </el-table-column>

      <el-table-column align="center" label="昨日总用户数" prop="data.yesterdayData.totalUsers">
      </el-table-column>

    </el-table>

    <el-divider content-position="left">日活数据</el-divider>
    <el-table highlight-current-row :data="userDataList" size="small">
      <el-table-column align="center" label="日期" prop="createDate" width="150">
      </el-table-column>

      <el-table-column align="center" label="今日新增" prop="newUsers">
      </el-table-column>

      <el-table-column align="center" label="活跃用户" prop="activityUsers">
      </el-table-column>

      <el-table-column align="center" label="总用户" prop="totalUsers">
      </el-table-column>

      

     

    </el-table>


    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>

    <el-dialog title="密码为初始密码时必须修改密码" :visible.sync="dialogVisible" width="50%" :show-close="false"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <pwd @dialogVisibleChange="dialogVisibleChange"></pwd>
    </el-dialog>

  </div>
</template>

<script>
  import { todayYesterdayData, allAppData, userDataDay, userReportCount } from '@/api/dashboard/dashboard'
  import Pwd from "@/views/login/pwd.vue";
  import { getUInfo } from '@/utils/auth'
  import Pagination from "@/components/pagination";

  export default {
    components: {
      Pwd, Pagination
    },
    name: 'Dashboard',
    data() {
      return {
        form: {},
        list: [],
        dialogVisible: false,
        md5Pwd: "",
        userDataList: [],
        page: 1,
        limit: 10,
        total: 0,
      }
    },
    mounted() {
      this.md5Pwd = JSON.parse(getUInfo()).password
      if (this.md5Pwd == 'e10adc3949ba59abbe56e057f20f883e') this.dialogVisible = true

      if (process.env.VUE_APP_INTERFACEADDRESS == 'usa' || process.env.VUE_APP_INTERFACEADDRESS == 'eur') return
      this.getAllAppData()
      this.getTodayYesterdayData()
      this.getUserDataDay()
      this.getUserReportCount()
    },
    methods: {
      getAllAppData() {
        allAppData().then(res => {
          this.form = JSON.parse(res.data).allAppData[0]
        })
      },
      getTodayYesterdayData() {
        todayYesterdayData().then(res => {
          this.list = JSON.parse(res.data)
        })
      },
      getUserDataDay() {
        userDataDay({
          pageNo: this.page,
          pageSize: this.limit
        }).then(res => {
          this.userDataList = res.data
        })
      },
      getUserReportCount() {
        userReportCount().then(res => {
          this.total = res.data
        })
      },
      // 上下分页
      handleCurrentChange(val) {
        this.page = val;
        this.getUserDataDay()
      },
      // 每页显示多少条
      handleSizeChange(val) {
        this.limit = val;
        this.getUserDataDay()
      },
      dialogVisibleChange() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .totalNum {
    padding: 20px 0;
    font-size: 20px;

    span {
      font-size: 40px;
      line-height: 50px;
      color: #F56C6C
    }
  }

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