<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="banName" label="段位名称">
      </el-table-column>
      <el-table-column align="center" prop="banMax" label="段位上限">
      </el-table-column>
      <el-table-column align="center" prop="banMin" label="段位下限">
      </el-table-column>
      <el-table-column align="center" prop="banLog" label="段位图标">
        <template slot-scope="scope">
          <img :src="scope.row.banLog" alt="" width="120px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="banGround" label="段位背景图">
        <template slot-scope="scope">
          <img :src="scope.row.banGround" alt="" width="120px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="banLogGround" label="IOS图标和背景">
        <template slot-scope="scope">
          <img :src="scope.row.banLogGround" alt="" width="120px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini">删除</el-button>

        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'项目'" :visible.sync="dialogVisible" width="50%" append-to-body>
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="段位名称" prop="banName">
          <el-input v-model="form.banName"></el-input>
        </el-form-item>
        <el-form-item label="段位上限" prop="banMax">
          <el-input v-model="form.banMax"></el-input>
        </el-form-item>
        <el-form-item label="段位下限" prop="banMin">
          <el-input v-model="form.banMin"></el-input>
        </el-form-item>


        <el-form-item label="段位图标" prop="banLog">
          <el-input v-model="form.banLog" style="margin-bottom:10px"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile_logo" :show-file-list="false"
            class="avatar-uploader">
            <img v-if="form.banLog" :src="form.banLog" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


        <el-form-item label="段位背景图" prop="banGround">
          <el-input v-model="form.banGround" style="margin-bottom:10px"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile_backGround" :show-file-list="false"
            class="avatar-uploader">
            <img v-if="form.banGround" :src="form.banGround" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="IOS图标和背景" prop="banGround">
          <el-input v-model="form.banLogGround" style="margin-bottom:10px"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile_IOSbackGround" :show-file-list="false"
            class="avatar-uploader">
            <img v-if="form.banLogGround" :src="form.banLogGround" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注" prop="banDes">
          <el-input v-model="form.banDes" type="textarea" :rows="2"></el-input>
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
  } from '@/api/operate/shareConfig/levelList'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    fileUpload
  } from '@/utils/fileUpload'



  export default {
    props: {
      projectId: String
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

        dialogVisible: false,
        form: {},
        rules: {

        },



      }
    },
    mounted() {
      this.getList()

    },
    methods: {
      getList() {
        listItem({
          banItemId: this.projectId,
        }).then(res => {
          this.list = res.data
          this.loading = false
        })
      },


      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增' + this.form.banName
                });
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.form.banName
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
          banName: "",
          banType: "",
          banMin: "",
          banMax: "",
          banLog: "",
          banGround: "",
          banLogGround: "",
          banItemId: this.projectId,
          banDes: "",
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
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
      requestFile_logo(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.banLog = res.data.url;
          }
        })
      },
      requestFile_backGround(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.banGround = res.data.url;
          }
        })
      },
      requestFile_IOSbackGround(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.banLogGround = res.data.url;
          }
        })
      }


    }
  }

</script>

<style scoped>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  .avatar {
    width: 200px;
    display: block;
  }

</style>
