<template>
  <div class="app-container">
    <div class="container-edit">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="关于我们" prop="companyProfileTop">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.companyProfileTop"></el-input>
        </el-form-item>
        <el-form-item label="关于我们第二段" prop="companyProfileBottom">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.companyProfileBottom">
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="mini" @click="submitForm('form')">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    getCompanyProfile,
    updateCompanyProfile,
  } from '@/api/officialWebsite/aboutus/aboutus'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    fileUpload
  } from '@/utils/fileUpload'

  export default {
    computed: {
      checkPer() {
        return function(btn) {
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
        form: {},
        list: [{}, {}, {}],
        rules: {
          companyProfileTop: [{
              required: true,
              message: '有未填写项',
              trigger: 'blur'
            },
          ],
          companyProfileBottom: [{
              required: true,
              message: '有未填写项',
              trigger: 'blur'
            },
          ],
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getCompanyProfile({}).then(res => {
          this.form = res.data
        }).catch(() => {});
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateCompanyProfile(this.form).then(res=>{
              this.$notify({
                type: 'success',
                message: '编辑成功!'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
            this.form.backgroundImage = res.data.url;
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
