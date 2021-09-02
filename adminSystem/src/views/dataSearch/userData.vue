<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.key" placeholder="手机号、邮箱、昵称、ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="userId" label="UserId"></el-table-column>
      <el-table-column align="center" prop="bindPhoneNumber" label="手机号">
        <template scope="scope">
          <span v-if="scope.row.bindPhoneNumber">
            {{scope.row.bindPhoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="gender" label="性别">
        <template scope="scope">
          {{scope.row.gender==1?"男":"女"}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="headPictureUrl" label="头像">
        <template scope="scope">
          <el-image style="width: 60px; height: 60px" :src=" scope.row.headPictureUrl" fit="fit">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称">
      </el-table-column>
      <el-table-column align="center" prop="city" label="城市">
      </el-table-column>
      <el-table-column align="center" prop="provider" label="注册来源">
      </el-table-column>
      <el-table-column align="center" label="用户状态">
        <template scope="scope">
          <el-tag :type="scope.row.accountStatus | statusFilter" size="mini">
            {{ scope.row.accountStatus==1?"正常":scope.row.accountStatus==0?"锁定":scope.row.accountStatus=='D'?"注销":"" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click=" btn_version(scope.row)" type="text" size="mini">版本信息
          </el-button>
          <el-button @click=" btn_member(scope.row)" type="text" size="mini">成员信息
          </el-button>
          <el-button @click=" btn_bind(scope.row)" type="text" size="mini">绑定信息
          </el-button>
          <el-button @click=" btn_delete(scope.row)" v-if="scope.row.accountStatus!='D'" type="text"
            v-if="checkPer('delete')" style="color:#f78989;" size="mini">删除账户
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>

    <el-dialog title="绑定信息" :visible.sync="bindVisible" width="50%">
      <el-table :data="bindList" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="deviceId" label="Mac"></el-table-column>
        <el-table-column align="center" prop="deviceNickName" label="设备昵称">
        </el-table-column>
        <el-table-column align="center" prop="deviceType" label="设备类型">
        </el-table-column>
        <el-table-column align="center" prop="deviceModel" label="设备型号">
        </el-table-column>
        <el-table-column align="center" prop="lastBindTime" label="绑定时间">
          <template slot-scope="scope">
            {{(scope.row.lastBindTime||scope.row.operatingTime) | formatDate}}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="版本信息" :visible.sync="versionVisible" width="50%">
      <div style="margin:10px 0">
          APP版本
      </div>
      <el-table :data="appVersionList" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="channel" label="channel"></el-table-column>
        <el-table-column align="center" prop="currentVersion" label="当前版本">
        </el-table-column>
        <el-table-column align="center" prop="getVersion" label="获取版本">
        </el-table-column>
        <el-table-column align="center" prop="userId" label="用户Id">
        </el-table-column>
        <el-table-column align="center" prop="lastBindTime" label="版本时间">
          <template slot-scope="scope">
            {{(scope.row.lastBindTime||scope.row.updateTime) | formatDate}}
          </template>
        </el-table-column>
      </el-table>
      
      <div style="margin:10px 0">
          设备版本
      </div>
      <el-table :data="deviceVersionList" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="currentFirmware" label="设备版本"></el-table-column>
        <el-table-column align="center" prop="platform" label="平台">
        </el-table-column>
        <el-table-column align="center" prop="userId" label="用户Id">
        </el-table-column>
        <el-table-column align="center" prop="lastBindTime" label="用户查询时间">
          <template slot-scope="scope">
            {{(scope.row.lastBindTime||scope.row.updateTime) | formatDate}}
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>

    <el-dialog title="成员信息" :visible.sync="memberVisible" width="50%">
      <el-table :data="memberList" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="memberId" label="memberId">
        </el-table-column>
        <el-table-column align="center" prop="nickname" label="昵称">
        </el-table-column>
        <el-table-column align="center" prop="myself" label="是否主账号">
          <template scope="scope">
            {{scope.row.myself==1?"是":""}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="gender" label="性别">
          <template scope="scope">
            {{scope.row.gender==1?"男":"女"}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="headPictureUrl" label="头像">
          <template scope="scope">
            <el-image style="width: 60px; height: 60px" :src=" scope.row.headPictureUrl" fit="fit">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="deleteFlag" label="是否删除">
        </el-table-column>
        <el-table-column align="center" prop="lastBindTime" label="绑定时间">
          <template slot-scope="scope">
            {{scope.row.createTime | formatDate}}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from "@/components/pagination";
  import {
    searchAccount as listItem,
    accountDelete as deleteItem,
    bindListByUserId,
    memberList,
    deviceVersionInfo,
    appVersionInfo
  } from '@/api/dataSearch/dataSearch'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'

  export default {
    components: {
      Pagination
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'gray',
          'D': 'danger'
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
        total: 0,
        searchForm: {
          key: ""
        },
        dev: "production",
        bindVisible: false,
        versionVisible: false,
        memberVisible: false,
        bindList: [],
        memberList: [],
        deviceVersionList: [],
        appVersionList: []

      }
    },
    mounted() {
      this.dev = process.env.VUE_APP_INTERFACEADDRESS;
    },
    methods: {
      getList() {
        listItem({
          page: this.page,
          pageSize: this.limit,
          ...this.searchForm
        }).then(res => {
          this.list = res.data.content;
          this.total = res.data.total;
          this.loading = false
        })
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
      btn_delete(row) {
        this.$confirm('此操作将永久账户相关信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem({
            accountId: row.userId,
          }).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功删除所选账户相关信息!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除操作',
            type: 'info'
          });
        });
      },

      btn_bind(item) {
        bindListByUserId({
          userId: item.userId
        }).then(res => {
          this.bindList = res.data;
          this.bindVisible = true
        })
      },
      btn_member(item) {
        memberList({
          uid: item.userId
        }).then(res => {
          this.memberList = res.data;
          this.memberVisible = true
        })
      },
      btn_version(item) {
        deviceVersionInfo({
          userId: item.userId
        }).then(res => {
          this.deviceVersionList = res.data;
          this.versionVisible = true
        })
        appVersionInfo({
          userId: item.userId
        }).then(res => {
          this.appVersionList = res.data;
          this.versionVisible = true
        })
      },





    }
  }

</script>
