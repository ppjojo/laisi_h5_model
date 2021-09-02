<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px;" size="medium" @click="addnew">新增</el-button>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="eventTime" width="150px" label="时间年月">
      </el-table-column>
      <el-table-column align="center" prop="eventContent" label="事件">
      </el-table-column>
      <el-table-column align="center" width="150px" label="操作">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row,2)" type="text" size="mini">编辑
          </el-button>
          <el-button @click="delItem(scope.row.id)" type="text" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="事件名称" prop="eventContent">
          <el-input v-model="form.eventContent"></el-input>
        </el-form-item>
        <el-form-item label="事件时间:" prop="eventTime">
          <el-date-picker v-model="form.eventTime" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间">
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
    getWebsiteBigEvent,
    addWebsiteBigEvent,
    deleteWebsiteBigEvent,
    updateWebsiteBigEvent
  } from '@/api/officialWebsite/aboutus/aboutus'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
  import {
    fileUpload
  } from '@/utils/fileUpload'
  export default {
    components: {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
      },
      formatDate(time) {
        if (!time) return ''
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
        dialogVisible: false,
        form: {},
        dialogTitle: '新增',
        rules: {
          eventTime: [{
            required: true,
            message: '请选择时间',
            trigger: 'blur,change'
          }, ],
          eventContent: [{
            required: true,
            message: '请填写事件名称',
            trigger: 'blur,change'
          }, ],
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getWebsiteBigEvent({}).then(res => {
          this.list = res.data;
          this.loading = false
        }).catch(error => {
          this.list = []
        })
      },
      addnew() {
        this.dialogVisible = true;
        this.dialogTitle = "新增";
        this.form = {
          eventTime: '',
          eventContent: null,
        }
      },
      //保存
      btn_edit(row, flag) {
        this.dialogTitle = "编辑";
        this.form = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },
      //删除
      delItem(id) {
        this.$confirm('确认删除该事件吗?', '提示', {
          type: 'warning'
        }).then(() => {
          deleteWebsiteBigEvent({
            id: id
          }).then(res => {
            this.getList();
            this.$notify({
              type: 'success',
              message: '成功删除'
            });
          })
        }).catch(() => {
            this.$notify({
              message: '已取消删除',
              type: 'info'
            });
        });
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            if (this.dialogTitle == "新增") {
              addWebsiteBigEvent(this.form).then(response => {
                this.getList();
                this.$notify({
                  type: 'success',
                  message: '成功新增'
                });
              })
            } else {
              updateWebsiteBigEvent(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改'
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
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
