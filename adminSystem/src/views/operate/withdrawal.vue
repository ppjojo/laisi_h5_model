<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.key" placeholder="手机号、邮箱、昵称、ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getPersonList">查询用户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-search">
      <el-form :inline="true">
        <el-form-item label="审核状态：">
          <el-select v-model="status" placeholder="全部" clearable @change="getListByStatus">
            <el-option label="全部" value=""></el-option>
            <el-option label="审核中" value="0"></el-option>
            <el-option label="已打款" value="1"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row height=500
      size="small " >
      <el-table-column align="center" prop="id" label="ID"></el-table-column>
      <el-table-column align="center" prop="userWithdrawalId" label="提现ID"></el-table-column>
      <el-table-column align="center" prop="userId" label="申请用户ID"></el-table-column>
      <!-- <el-table-column align="center" prop="openid" label="微信openid">
      </el-table-column> -->
      <el-table-column align="center" prop="amount" label="金额(元)">
        <template scope="scope"> {{ scope.row.amount/100}}</template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="生成时间">
        <template scope="scope"> {{ scope.row.createTime | formatDate}}</template>
      </el-table-column>
      <el-table-column align="center" label="审核状态">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter" size="mini">
            {{ scope.row.status==1?"已打款":scope.row.status==0?"审核中":""}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="审核时间">
        <template scope="scope"> {{ scope.row.updateTime | formatDate}}</template>
      </el-table-column>
      <el-table-column align="center" prop="reviewer" label="审核用户ID">
      </el-table-column>

      <!-- <el-table-column align="center" prop="tradeId" label="微信交易号">
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click=" btn_agree(scope.row)" type="text" v-if="scope.row.status==0" style="color:#f78989;"
            size="mini">审核
          </el-button>
          <el-button @click=" btn_view(scope.row)" type="text" style="color:#f78989;" size="mini">余额明细
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-loading="loading" :data="peopleList" element-loading-text="Loading" border fit highlight-current-row
      size="small " >
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
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click=" btn_view(scope.row)" type="text" style="color:#f78989;" size="mini">余额明细
          </el-button>
        </template>
      </el-table-column>
    </el-table>



    <!--新增和编辑界面-->
    <el-dialog :title="'余额明细'+this.form.userId" :visible.sync="dialogVisible" width="70%">
      <div style="padding-bottom:20px">
        当前余额：{{this.userAmountTotal/100}}
      </div>
      <el-table :data="userAmountDetailList" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="trade_describe" label="描述">
        </el-table-column>
        <el-table-column align="center" prop="amount" label="金额(元)">
          <template scope="scope"> {{ scope.row.total_amount/100}}</template>
        </el-table-column>
        <el-table-column align="center" prop="amount" label="剩余金额(元)">
          <template scope="scope"> {{ scope.row.remain_amount/100}}</template>
        </el-table-column>

        <el-table-column align="center" prop="createTime" label="生成时间">
          <template scope="scope"> {{ scope.row.create_time | formatDate}}</template>
        </el-table-column>
      </el-table>
      <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
      </pagination>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>







  </div>
</template>

<script>
  import Pagination from "@/components/pagination";
  import {
    searchAccount as peopleListItem
  } from '@/api/dataSearch/dataSearch'
  import {
    listItem,
    withdrawalCashToWechat,
    listItemByStatus,
    userAmountDetail,
    userAmount
  } from '@/api/operate/withdrawal'
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
        if (!time) return ""
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
       
        peopleList: [],
        list: [],
        loading: false,

        searchForm: {
          key: ""
        },
        status: "",
        dialogVisible: false,
        form: {},
        userAmountTotal: 0,
        userAmountDetailList: [],
        page: 0,
        limit: 10,
        total: 0,

      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
       
        listItem({}).then(res => {
          this.list = res;
          this.loading = false
        })
      },
      getListByStatus(status) {
       
        if (status == "") {
          this.getList();
          return;
        }
        listItemByStatus({
          status: status
        }).then(res => {
          this.list = res;
          this.loading = false
        })
      },
      btn_agree(item) {
        var params = {
          userWithdrawalApplyId: item.id,
          amount: item.amount,
          userId: item.userId,
          openId: "",
        }
        withdrawalCashToWechat(params).then(res => {
          this.getList();
          this.loading = false
        })
      },
      btn_view(row) {
        this.dialogVisible = true;
        this.dialogTitle = "查看明细"
        this.form = Object.assign({}, row)
        this.getUserAmountDetail();
        this.getUserAmount()
      },
      getUserAmountDetail() {
        userAmountDetail({
          targetId: this.form.userId,
          page: this.page,
          pageSize: this.limit
        }).then(res => {
          this.userAmountDetailList = res.data.data;
          this.total = res.data.count;
        })
      },
      getUserAmount() {
        userAmount({
          targetId: this.form.userId,
        }).then(res => {
          this.userAmountTotal = res.data.totalAmount;
        })
      },
      getPersonList() {
          if(!this.searchForm.key)return;
        peopleListItem({
          page: 0,
          pageSize: 50,
          ...this.searchForm
        }).then(res => {
          this.peopleList = res.data.content;
        })
      },
      // 上下分页
      handleCurrentChange(val) {
        this.page = val - 1;
        this.getUserAmountDetail()
      },
      // 每页显示多少条
      handleSizeChange(val) {
        this.limit = val;
        this.getUserAmountDetail()
      },








    }
  }

</script>
