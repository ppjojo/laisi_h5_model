<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="UserId" clearable>
          <el-input v-model="searchForm.targetId" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="searchForm.type" placeholder="请选择支付方式" clearable>
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList">查询</el-button>
          <el-button type="danger" @click="setByorder(2)">批量设置两者皆可</el-button>
          <el-button type="primary" @click="setByorder(1)">批量设置微信支付</el-button>
        </el-form-item>
        <el-form-item >
            <span>累计参与跳绳红包赛用户数:{{redBagInfo.userCount}}</span>&nbsp;&nbsp;
            <span>红包赛奖池累计金额:{{redBagInfo.totalAmountAll}}</span>&nbsp;&nbsp;
            <span>取消比例:{{redBagInfo.cancellationRatio}}%</span>&nbsp;
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange" element-loading-text="Loading"
      border fit highlight-current-row size="small ">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="userId" label="UserID" width="100"></el-table-column>
      <el-table-column align="center" prop="nickName" label="用户昵称">
      </el-table-column>
      <el-table-column align="center" prop="joinDays" label="参加次数">
      </el-table-column>
      <el-table-column align="center" prop="recentWeekUserCount" label="近一周参加次数">
      </el-table-column>
      <el-table-column align="center" label="红包赛支付方式">
        <template slot-scope="scope">
          {{ returnPayTypeStr(scope.row.ropeRedPayType.type)  }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="取消余额支付时间" width="140">
        <template slot-scope="scope">
          {{scope.row.ropeRedPayType.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式修改时间" width="140">
        <template slot-scope="scope">
          {{scope.row.ropeRedPayType.updateTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row,1)" type="text" size="mini" v-if="scope.row.ropeRedPayType.type!=1">微信支付
          </el-button>
          <!-- <el-button @click="btn_edit(scope.row,0)" type="text" size="mini" v-if="scope.row.ropeRedPayType.type!=0">余额支付
                    </el-button> -->
          <el-button @click="btn_edit(scope.row,2)" type="text" size="mini" v-if="scope.row.ropeRedPayType.type!=2">两者皆可
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>


  </div>
</template>

<script>
  import {
    listItem,
    addItem,
    updateItem,dataGetMapping
  } from '@/api/operate/payControl'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
  import {
    fileUpload
  } from '@/utils/fileUpload'
  import Pagination from "@/components/pagination";
  export default {
    components: {
      Pagination
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
      },
      formatDate(time) {
        if(!time)return ''
        time = time
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    computed: {
      checkPer() {
        return function(btn) {
          return (checkPermission(this.$route.path + '/' + btn))
        }
      }
    },
    data() {
      return {
        list: [],
        loading: false,
        total: 0,
        dialogVisible: false,
        form: {},
        searchForm: {
          type: null,
          targetId: null,
          dateTime: null,
          page: 0,
          pageSize: 10
        },
        typeList: [{
          name: '微信支付',
          id: 1
        }, {
          name: '两者皆可',
          id: 2
        }],
        multipleSelection: [],
        redBagInfo:{
          cancellationRatio:'',
          totalAmountAll:'',
          userCount:''
        }
      }
    },
    mounted() {
      // this.getList()
      dataGetMapping({}).then(res=>{
        this.redBagInfo = res.data;
      })
    },
    methods: {
      getList() {
        listItem(this.searchForm).then(res => {
          this.list = res.data.data;
          this.total = res.data.total
          this.loading = false
        }).catch(error => {
          this.list = []
        })
      },
      returnPayTypeStr(id) {
        return id == 0 ? '余额支付' : id == 1 ? '微信支付' : id == 2 ? '两者皆可' : '未设置过';
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      setByorder(flag) {
        if (this.multipleSelection.length == 0) return;
        let str = flag == 0 ? '余额支付' : flag == 1 ? '微信支付' : '两者皆可';
        let arr = [];
        this.multipleSelection.forEach(d => {
          let obj = {};
          obj.userId = d.userId;
          obj.type = flag;
          arr.push(obj);
        });
        this.$confirm('此操作将用户支付方式改为' + str + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateItem(arr).then(response => {
            this.getList()
            this.multipleSelection = [];
            this.$notify({
              type: 'success',
              message: '操作成功!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消操作',
            type: 'info'
          });
        });
      },
      //保存
      btn_edit(row, flag) {
        let str = flag == 0 ? '余额支付' : flag == 1 ? '微信支付' : '两者皆可';
        this.$confirm('此操作将用户支付方式改为' + str + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateItem([{
            userId: row.userId,
            type: flag
          }]).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '操作成功!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消操作',
            type: 'info'
          });
        });
      },
      // 上下分页
      handleCurrentChange(val) {
        this.searchForm.page = val - 1;
        this.getList()
      },
      // 每页显示多少条
      handleSizeChange(val) {
        this.searchForm.pageSize = val;
        this.getList()
      },
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 80px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 170px;
    height: 80px;
    display: block;
  }

  .avatar-uploader-icon2 {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .avatar2 {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
