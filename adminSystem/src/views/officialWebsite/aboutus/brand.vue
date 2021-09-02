<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="medium" @click="addnew">新增</el-button>
      <el-form :model="form" label-width="100px">
        <div v-for="(item,index) in list">
          <el-form-item :label="'品牌'+(index+1)">
          </el-form-item>
          <el-form-item label="品牌标题1">
            <el-input v-model="item.titleTop" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品牌简介1">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="item.contentTop">
          </el-form-item>
          <el-form-item label="品牌标题2">
            <el-input v-model="item.titleBottom" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品牌介绍2" prop="companyProfileBottom">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="item.contentBottom">
            </el-input>
          </el-form-item>
          <el-form-item label="品牌logo">
            <el-input v-model="item.logo" readonly=""></el-input>
            <el-image
                  style="width: 200px; height: 100px;margin-top: 10px;"
                  :src="item.logo"
                  fit="cover"></el-image>
            <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
              <el-button type="primary" @click="nowIndex = index" size="mini" style="margin-top: 10px;">上传文件</el-button>
              <div slot="tip" class="el-upload__tip">图片尺寸696*318px 比例116:53</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" size="mini" @click="editItem(index)">更新</el-button>
            <el-button type="danger" size="mini" @click="delItem(item.id)">删除</el-button>
          </el-form-item>
        </div>
      </el-form>

    </div>

  </div>
</template>

<script>
  import {
    getWebsiteBrandIntroduction,
    addWebsiteBrandIntroduction,
    deleteWebsiteBrandIntroduction,
    updateWebsiteBrandIntroduction
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
        list: [{}],
        nowIndex:null,
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getWebsiteBrandIntroduction({}).then(res=>{
          this.list = res.data;
        })
      },
      addnew(){
        this.list.unshift({logo:''});
      },
      editItem(index){
        if(this.list[index].id){
          updateWebsiteBrandIntroduction(this.list[index]).then(res=>{
            this.$notify({
              type: 'success',
              message: '编辑成功'
            });
          })
        }else{
          addWebsiteBrandIntroduction(this.list[index]).then(res=>{
            this.$notify({
              type: 'success',
              message: '新增成功'
            });
          })
        }
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.rateTimeRange = JSON.stringify(this.form.rateTimeRangeArr);
            this.form.rateName = this.form.rateCatalog == 1 ? '好友赛' : '匹配赛'
            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增在线PK赛'
                });
                this.dialogVisible = false
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改在线PK赛'
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
      //删除
      delItem(id) {
        if(!id)return
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWebsiteBrandIntroduction({
            id: id,
          }).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功删除!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除',
            type: 'info'
          });
        });
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.list[this.nowIndex].logo = res.data.url;
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
