<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="medium" @click="addnew">新增</el-button>
      <el-form :model="form" label-width="120px">
        <div v-for="(item,index) in list" style="border-bottom: 1px solid #ccc;">
          <el-form-item :label="'户外运动产品'+(index+1)">
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="item.productName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="产品价格">
            <el-input v-model="item.productPrice" placeholder="产品价格"></el-input>
          </el-form-item>
          <!-- <el-form-item label="产品单页链接">
            <el-input v-model="item.productLink" placeholder="跳转链接"></el-input>
          </el-form-item> -->
          <el-form-item label="产品详情页">
            <el-input v-model="item.productLink" readonly=""></el-input>
            <el-image style="width: 200px; height: 100px;margin-top: 10px;" :src="item.productLink" fit="cover">
            </el-image>
            <el-upload ref='upload' action="" :http-request="requestFileLink" :show-file-list="false">
              <el-button type="primary" @click="nowIndex = index" size="mini" style="margin-top: 10px;">上传文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="天猫购买链接">
            <el-input v-model="item.productTianmaoLink" placeholder="跳转链接"></el-input>
          </el-form-item>
          <el-form-item label="是否新品" prop="ifNewProduct">
            <el-radio v-model="item.ifNewProduct" :label="1">是</el-radio>
            <el-radio v-model="item.ifNewProduct" :label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="是否推荐新品" prop="ifShow">
            <el-radio v-model="item.ifShow" :label="1">是</el-radio>
            <el-radio v-model="item.ifShow" :label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="产品小类" prop="ifShow">
            <el-radio v-model="item.productDeviceType" label="3">智能跳绳</el-radio>
            <el-radio v-model="item.productDeviceType" label="4">智能健腹轮</el-radio>
            <el-radio v-model="item.productDeviceType" label="5">智能腕力球</el-radio>
          </el-form-item>
          <el-form-item label="产品简介" prop="productDes">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="item.productDes"></el-input>
          </el-form-item>
          <el-form-item label="产品主图">
            <el-input v-model="item.productPagePic" ></el-input>
            <el-image style="width: 200px; height: 100px;margin-top: 10px;" :src="item.productPagePic" fit="cover">
            </el-image>
            <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
              <el-button type="primary" @click="nowIndex = index" size="mini" style="margin-top: 10px;">上传文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="导航栏产品图">
            <el-input v-model="item.navPic" ></el-input>
            <el-image style="width: 200px; height: 100px;margin-top: 10px;" :src="item.navPic" fit="cover">
            </el-image>
            <el-upload ref='upload' action="" :http-request="requestFileNavPic" :show-file-list="false">
              <el-button type="primary" @click="nowIndex = index" size="mini" style="margin-top: 10px;">上传文件</el-button>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="sku分类">
            <el-button type="danger" size="medium" @click="addnewsku(index)">新增sku</el-button>

            <div style="display: flex;justify-content: flex-start;">
              <div v-for="(sku,sindex) in item.productAllPictureList" style="margin-right: 10px;">
                <div style="display: flex;align-items: center;">
                  <span class="demonstration">{{sku.pictureColor?sku.pictureColor:'请选择颜色'}}</span>
                   <el-color-picker v-model="sku.pictureColor"></el-color-picker>
                </div>
                <el-image style="width: 100px; height: 100px;margin-top: 10px;" :src="sku.pictureVideo" fit="cover">
                </el-image>
                <el-upload ref='upload' action="" :http-request="requestFileSku" :show-file-list="false">
                  <el-button type="danger" @click="nowIndex = index;skuIndex=sindex" size="mini" style="margin-top: 10px;">上传sku图
                  </el-button>
                </el-upload>
                <!-- <el-button type="danger" size="mini" @click="submit(index)">更新</el-button> -->
                <el-button type="danger" size="mini" @click="btn_deleteSku(index,sindex)">删除sku</el-button>
              </div>
            </div>


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
    getAllProduct,
    delProduct,
    addProduct,
    updateProduct
  } from '@/api/officialWebsite/product'
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
        nowIndex: null,
        skuIndex:null,
        userId: JSON.parse(localStorage.getItem('Laisi_info')).id
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getAllProduct({
          productBelong: '2',//1智能穿戴2户外运动
        }).then(res => {
          let list = res.data;
          this.list = list;
        })
      },
      addnew() {
        this.list.unshift({
          productPagePic: '',
          productAllPictureList:[]
        });
      },
      addnewsku(index){//新增sku
        this.list[index].productAllPictureList.unshift({
          pictureVideo: ''
        });
      },
      //保存
      submit(index) {
        this.list[index].updateUser = this.userId;
        this.list[index].productBelong = '2'; //图片属于首页小图更换
        if (this.list[index].id) { //编辑
          updateProduct(this.list[index]).then(res => {
            this.$notify({
              type: 'success',
              message: '编辑成功'
            });
          })
        } else {
          addProduct(this.list[index]).then(res => {
            this.$notify({
              type: 'success',
              message: '新增成功'
            });
          })
        }
      },
      //删除
      btn_delete(index) {
        if (this.list[index].id) {
          this.$confirm('此操作将删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delProduct({
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
        } else {
          this.list[index] = {};
        }
      },
      btn_deleteSku(index ,sindex){
        this.$confirm('此操作将删除sku, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.list[index].productAllPictureList.splice(sindex,1);
            this.$notify({
              type: 'success',
              message: '成功删除!'
            });
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
            this.list[this.nowIndex].productPagePic = res.data.url;
          }
        })
      },
      requestFileNavPic(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.list[this.nowIndex].navPic = res.data.url;
          }
        })
      },
      requestFileLink(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.list[this.nowIndex].productLink = res.data.url;
          }
        })
      },
      requestFileSku(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.list[this.nowIndex].productAllPictureList[this.skuIndex].pictureVideo = res.data.url;
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
