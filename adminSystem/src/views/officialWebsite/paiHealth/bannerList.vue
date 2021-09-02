<template>
  <div class="app-container">
    <div class="container-edit">
      <el-form :model="form" label-width="100px">
        <div v-for="(item,index) in list">
          <el-form-item :label="'banner图'+(index+1)">
          </el-form-item>
          <el-form-item label="文件地址">
            <el-input v-model="item.pictureVideo" readonly=""></el-input>
            <el-image style="width: 200px; height: 100px;margin-top: 10px;" :src="item.pictureVideo" fit="cover">
            </el-image>
            <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
              <el-button type="primary" @click="nowIndex = index" size="mini" style="margin-top: 10px;">上传文件</el-button>
              <div slot="tip" class="el-upload__tip">图片尺寸3840*1868px 比例960:467</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" size="mini" @click="submit(index)">更新</el-button>
            <el-button type="primary" size="mini" @click="btn_delete(index)">删除</el-button>
          </el-form-item>
        </div>
      </el-form>

    </div>

  </div>
</template>

<script>
  import {
    getAllPicture,
    delPicture,
    addPicture,
    updatePicture
  } from '@/api/officialWebsite/picture'
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
        nowIndex: null,
        userId: JSON.parse(localStorage.getItem('Laisi_info')).id
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getAllPicture({
          pictureBelong: '9',
          pictureType: 0
        }).then(res => {
          let list = res.data;
          if (list.length < 1) {
            let lengths = list.length;
            for (let i = 0; i < (1 - lengths); i++) {
              list.push({
                pictureVideo: ''
              });
            }
          }
          this.list = list;
        })
      },
      //保存
      submit(index) {
        this.list[index].updateUser = this.userId;
        this.list[index].pictureBelong = '9'; //图片属于派健康baneer更换
        this.list[index].pictureType = 0;
        if (this.list[index].id) { //编辑
          updatePicture(this.list[index]).then(res => {
            this.$notify({
              type: 'success',
              message: '编辑成功'
            });
          })
        } else {
          addPicture(this.list[index]).then(res => {
            this.$notify({
              type: 'success',
              message: '新增成功'
            });
          })
        }
      },
      //删除
      btn_delete(index) {
        if(this.list[index].id){
          this.$confirm('此操作将删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delPicture({
              id: this.list[index].id,
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
        }else{
          this.list[index] = {};
        }
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.list[this.nowIndex].pictureVideo = res.data.url;
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
