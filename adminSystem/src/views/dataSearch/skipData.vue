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
          <el-date-picker v-model="startTime_endTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider content-position="left" v-if="userTotalShow">
      <svg-icon icon-class="salesDept_date" /> {{searchForm.ownerId}}的跳绳总个数：{{userTotal}}</el-divider>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      height="700" size="small ">
      <el-table-column align="center" prop="userId" label="UserId"></el-table-column>
      <el-table-column align="center" prop="mac" label="MAC"></el-table-column>
      <el-table-column align="center" prop="number" label="总个数"></el-table-column>
      <el-table-column align="center" prop="duraMs" label="总时长">
        <template scope="scope">
          {{scope.row.duraMs/1000}}秒
        </template>
      </el-table-column>
      <el-table-column align="center" prop="realSection" label="绊绳次数"> </el-table-column>

      <el-table-column align="center" prop="mode" label="模式">
        <template scope="scope">
          {{scope.row.mode==1?"自由跳":scope.row.mode==2?"倒计时":scope.row.mode==3?"倒计数":""}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="modeValue" label="模式值(个数/秒)"></el-table-column>
      <el-table-column align="center" prop="number" label="总个数"></el-table-column>
      <el-table-column align="center" prop="mostHolding" label="最大连续数量"></el-table-column>
      <el-table-column align="center" prop="mostFreq" label="最大频次"></el-table-column>
      <el-table-column align="center" prop="avgNumber" label="BPM"></el-table-column>
      <el-table-column align="center" prop="deviceModel" label="设备型号"></el-table-column>
      <el-table-column align="center" prop="timestamp" sortable label="数据时间">
        <template scope="scope">
          {{scope.row.timestamp | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" sortable label="上报时间">
        <template scope="scope">
          {{scope.row.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="130">
        <template scope="scope">
          <el-button @click="btn_view(scope.row)" type="text" size="mini">查看
          </el-button>
          <el-button @click="btn_edit(scope.row)" type="text" v-if="checkPer('edit')" size="mini">修改数据
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title='数据详情' :visible.sync="dialogVisible" width="50%">
      <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="jsonForm">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title='数据修改' :visible.sync="editDialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="userId">
          <el-input v-model="form.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="mac">
          <el-input v-model="form.mac" disabled></el-input>
        </el-form-item>
        <el-form-item label="模式">
             {{form.mode==1?"自由跳":form.mode==2?"倒计时":form.mode==3?"倒计数":""}}
        </el-form-item>
        <el-form-item label="模式值">
          <el-input v-model="form.modeValue" disabled></el-input>
        </el-form-item>

        <el-form-item label="个数">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="时长(毫秒)">
          <el-input v-model="form.duraMs"></el-input>
        </el-form-item>
        <el-form-item label="消耗(卡)">
          <el-input v-model="form.burn"></el-input>
        </el-form-item>
        <el-form-item label="数据时间">
          <el-date-picker v-model="form.timestamp" type="datetime" value-format="timestamp" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm()">确定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
  import {
    skipSearch as listItem,
    skipUpdate
  } from '@/api/dataSearch/dataSearch'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'

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
        dialogVisible: false,
        form: {},
        detailList: [],
        userTotal: 0,
        userTotalShow: false,
        jsonForm: {},
        editDialogVisible: false,
      }
    },
    mounted() {
      //this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        this.userTotalShow = false
        let para = this.searchForm;
        if (this.startTime_endTime) {
          para.startTimeStamp = this.startTime_endTime[0]
          para.endTimeStamp = this.startTime_endTime[1]
        } else {
          para.startTimeStamp = ""
          para.endTimeStamp = ""
        }
        listItem(para).then(res => {
          this.list = res.data
          this.userTotal = 0
          this.list.map(item => {
            this.userTotal += item.number
          })
          this.loading = false
          this.userTotalShow = true
        })
      },
      btn_view(row) {
        this.dialogVisible = true
        this.jsonForm = JSON.stringify(row, null, 4);
      },
      btn_edit(row) {
        this.editDialogVisible = true
        this.form = row;
      },
      submitForm() {
        this.form.activeMs = this.form.duraMs;
        skipUpdate(this.form).then(res => {
          if (res.code == 0) {
            this.$notify({
              type: 'success',
              message: '修改成功'
            });
             this.editDialogVisible = false
          } else {
            this.$notify({
              type: 'error',
              message: '修改失败'
            });
          }
        })
      },
    }
  }

</script>
