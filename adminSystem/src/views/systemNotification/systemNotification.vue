<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="notifyType" label="通知类型">
        <template scope="scope">
          {{scope.row.notifyType==0?"软件":scope.row.notifyType==1?"硬件":"活动"}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="platformType" label="平台类型">
      </el-table-column>
      <el-table-column align="center" prop="deviceType" label="通知对象类型">
      </el-table-column>
      <el-table-column align="center" prop="notifyTitle" label="通知标题">
      </el-table-column>
      <el-table-column align="center" prop="notifyPic" label="通知图片地址">
      </el-table-column>
      <el-table-column align="center" prop="notifyPic" label="通知图片">
        <template slot-scope="scope">
          <img :src="scope.row.notifyPic" alt="" width="120px">
        </template>
      </el-table-column>

      <el-table-column align="center" prop="startTime" label="通知开始时间">
        <template scope="scope">
          {{scope.row.startTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="endTime" label="通知结束时间">
        <template scope="scope">
          {{scope.row.endTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')&&scope.row.isPush==0">
            编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('delete')">删除
          </el-button>
          <el-button @click=" btn_release(scope.row)" type="text" style="color:#67C23A;" size="mini"
            v-if="checkPer('release')&&scope.row.isPush==0">发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'卡片标题'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="通知类型" prop="notifyType">
          <el-select v-model="form.notifyType" placeholder="请选择" @change="notifyTypeChange">
            <el-option label="软件" :value="0"></el-option>
            <el-option label="硬件" :value="1"></el-option>
            <el-option label="活动" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台类型" prop="platformType">
          <el-select v-model="form.platformType" placeholder="请选择平台类型">
            <el-option v-if="form.notifyType!=0" label="all" value="all"></el-option>
            <el-option label="ios" value="ios"></el-option>
            <el-option label="android" value="android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬件通知对象" v-if="form.notifyType==1">
          <el-select placeholder="请选择" v-model="form.deviceModel" @change="deviceModelChange">
            <el-option label="all" value="all"></el-option>
            <el-option v-for="item in deviceModelList" :key="item.deviceModel" :label="item.deviceModel"
              :value="item.deviceModel">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动通知对象" v-if="form.notifyType==2">
          <el-select placeholder="请选择" v-model="form.deviceType" @change="deviceTypeChange">
            <el-option label="all" value="all"></el-option>
            <el-option v-for="item in deviceTypeList" :key="item.deviceType" :label="item.deviceType"
              :value="item.deviceType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知标题" prop="notifyTitle">
          <el-input placeholder="请输入标题" v-model="form.notifyTitle">
          </el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="notifyContent">
          <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入内容" v-model="form.notifyContent">
          </el-input>
        </el-form-item>

        <el-form-item label="白名单" prop="isWriteList">
          <el-radio v-model="form.isWriteList" :label=1>是</el-radio>
          <el-radio v-model="form.isWriteList" :label=0>否</el-radio>
        </el-form-item>



        <el-form-item label="白名单组" v-if="form.isWriteList==1" prop="groupId">
          <el-select placeholder="请选择白名单组" v-model="form.groupId">
            <el-option v-for="item in allWhiteList" :key="item.groupId" :label="item.groupName" :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发布按钮" prop="isPush">
          <el-radio v-model="form.isPush" :label=1>无</el-radio>
          <el-radio v-model="form.isPush" :label=0>有</el-radio>
        </el-form-item>

        <el-form-item label="内部链接" prop="isInner">
          <el-radio v-model="form.isInner" :label=1>是</el-radio>
          <el-radio v-model="form.isInner" :label=0>否</el-radio>
        </el-form-item>

        <el-form-item label="默认链接" prop="defaultUrl">
          <el-input v-model.trim="form.defaultUrl"></el-input>
        </el-form-item>
        <el-form-item label="IOS链接" prop="iosUrl">
          <el-input v-model.trim="form.iosUrl"></el-input>
        </el-form-item>
        <el-form-item label="通知图片" prop="notifyPic">
          <el-input v-model.trim="form.notifyPic" style="margin-bottom:10px"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.notifyPic" :src="form.notifyPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="通知时间">
          <el-date-picker v-model="startTime_endTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    listItem,
    addItem,
    updateItem,
    deleteItem,
    releaseItem
  } from '@/api/systemNotification/systemNotification'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    listItem as productListItem
  } from '@/api/device/productList'
  import {
    listItem as whiteListItem
  } from '@/api/firmware/whiteList'
  import {
    formatDate
  } from '@/utils/date'
  import {
    fileUpload
  } from '@/utils/fileUpload'
  import {
    getUInfo
  } from '@/utils/auth'
  import Pagination from "@/components/pagination";


  export default {
    components: {
      Pagination
    },
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
        page: 0,
        limit: 10,
        total: 20,

        dialogVisible: false,
        form: {},
        rules: {
          notifyType: [{
            required: true,
            message: '请选择通知类型',
            trigger: 'blur'
          }, ],
          startTime_endTime: [{
            required: true,
            message: '请选择通知时间',
            trigger: 'blur'
          }, ],
          groupId: [{
            required: true,
            message: '请选择白名单组',
            trigger: 'blur'
          }, ],
          isPush: [{
            required: true,
            message: '请选择发布选项',
            trigger: 'blur'
          }, ],
        },
        deviceTypeList: [], //设备类型
        deviceModelList: [], //所有设备型号
        allWhiteList: [], //白名单组
        startTime_endTime: []

      }
    },
    mounted() {
      this.getList()
      this.getProductList()
      this.getAllWhiteList();
    },
    methods: {
      getList() {
        listItem({
          offset: this.page,
          limit: this.limit
        }).then(res => {
          this.list = res.data.listResult
          this.total = res.data.count
          this.loading = false
        })
      },
      getProductList() {
        productListItem({}).then(res => {
          this.deviceModelList = res.data
          var obj = {};
          this.deviceTypeList = res.data.reduce((arr, next) => {
            obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
            return arr;
          }, []);
        })
      },
      getAllWhiteList() {
        whiteListItem({}).then(res => {
          this.allWhiteList = res.data
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
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            this.form.startTime = this.startTime_endTime[0]
            this.form.endTime = this.startTime_endTime[1]
            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增' + this.form.notifyTitle
                });
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.form.notifyTitle
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      btn_add() {
        this.dialogVisible = true;
        this.dialogTitle = "新增"
        this.form = {
          userId: JSON.parse(getUInfo()).id,
          notifyType: 0, //通知类型 str
          notifyContent: "", //通知内容 str
          isInner: 1, //是否为内部连接 1 0
          defaultUrl: "", //默认链接
          iosUrl: "", //ios对应的连接
          notifyPic: "",
          deviceType: "software",
          deviceModel: "all",
          isWriteList: 0,
          notifyTitle: "",
          isPush: 0,
          startTime_endTime: []
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"

        this.form = Object.assign({}, row)
        this.startTime_endTime = [];
        this.startTime_endTime.push(this.form.startTime)
        this.startTime_endTime.push(this.form.endTime)

      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除通知, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem({
            id: id,
          }).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功删除所选通知!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除通知操作',
            type: 'info'
          });
        });
      },
      btn_release(row) {
        this.$confirm('此操作将发布通知, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          releaseItem(row).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功发布所选通知!'
            });
          })
        })
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.notifyPic = res.data.url;
          }
        })
      },
      //通知类型改变后重置设备型号
      notifyTypeChange(value) {
        if (value == 0) {
          this.$set(this.form, "deviceType", "software")
          this.$set(this.form, "deviceModel", "all")
        } else {
          this.$set(this.form, "deviceType", "")
          this.$set(this.form, "deviceModel", "")
        }
      },
      //设备类型改变
      deviceTypeChange(value) {
        this.$set(this.form, "deviceModel", "all")
        //console.log(this.form)
      },
      //设备型号改变
      deviceModelChange(value) {
        this.deviceModelList.forEach(item => {
          if (item.deviceModel == value) {
            this.$set(this.form, "deviceType", item.deviceType)
          }
        })
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 200px;
    /* height: 80px; */
    display: block;
  }

</style>
