<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称">
      </el-table-column>

      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headImage" alt="" width="100px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="rateNum" label="场次">
      </el-table-column>
      <el-table-column align="center" prop="ratePercent" label="胜率">
      </el-table-column>

      

      

    

      <el-table-column align="center" label="操作" width="100">
        <template scope="scope">
          <el-button type="text" size="mini" @click=" btn_edit(scope.row)">编辑
          </el-button>
          <!-- <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button> -->
        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'pk赛'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">

        
        <el-form-item label="头像" prop="headImage">
             <el-input v-model="form.headImage" style="margin-bottom:15px"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.headImage" :src="form.headImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="比赛次数" prop="rateNum">
          <el-input v-model="form.rateNum"></el-input>
        </el-form-item>
        <el-form-item label="比赛胜率" prop="ratePercent">
          <el-input v-model="form.ratePercent"></el-input>
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
    deleteItem
  } from '@/api/operate/onlinePK/robot'
   import {
    fileUpload
  } from '@/utils/fileUpload'
  import {
    checkPermission
  } from '@/api/checkPermission'

  export default {
    computed: {
      checkPer() {
        return function (btn) {
          return (checkPermission(this.$route.path + '/' + btn))
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'success',
          // 1: 'gray',
          1: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: [],
        loading: false,

        dialogVisible: false,
        form: {},
        rules: {
          bindDeviceModel: [{
            required: true,
            message: '请输入绑定设备型号',
            trigger: 'blur'
          }, ],
        },


      }
    },
    mounted() {
      this.getList()

    },
    methods: {
      getList() {
        listItem({}).then(res => {
          this.list = res.data
          this.loading = false
        })
      },


      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增在线PK赛机器人'
                });
                this.dialogVisible = false
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改在线PK赛机器人'
                });
                this.dialogVisible = false
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
          nickName: "",
          headImage: "",
          rateNum:"",
          ratePercent:""
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
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
              message: '成功删除所选设备昵称!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除设备昵称操作',
            type: 'info'
          });
        });
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.headImage = res.data.url;
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
    width: 100px;
    height: 100px;
    display: block;
  }

</style>
