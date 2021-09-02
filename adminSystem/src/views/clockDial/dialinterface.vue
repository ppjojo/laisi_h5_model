<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="表盘名">
          <el-input v-model="searchForm.picName" placeholder="表盘名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="picName" label="图片名称"></el-table-column>
      <el-table-column align="center" prop="picUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="" width="80px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="picPixel" label="图片像素"></el-table-column>

      <el-table-column align="center" prop="type" label="表盘类型">
        <template scope="scope">
          {{scope.row.type==0?"自定义表盘":"预置表盘"}}
        </template>
      </el-table-column>
      
       <el-table-column align="center" prop="firmVersion" label="固件版本号"></el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('delete')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'表盘'" :visible.sync="dialogVisible" width="60%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="图片名称:" prop="picName">
          <el-input v-model="form.picName"></el-input>
        </el-form-item>

        <el-form-item label="小图片像素:" prop="picPixel">
          <el-input v-model="form.picPixel"></el-input>
        </el-form-item>
        <el-form-item label="小图片" prop="picUrl">
          <el-upload ref='upload' action="" :http-request="requestFile_small" :show-file-list="false"
            class="avatar-uploader">
            <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="资源ID:" prop="picResourceId">
          <el-input v-model="form.picResourceId" @focus="RVisible=true"></el-input>
        </el-form-item>
        <el-form-item label="拨号盘号：" prop="dialId">
          <el-input v-model="form.dialId" type="number"></el-input>
        </el-form-item>
        <el-form-item label="拨号盘排序：" prop="orderId">
          <el-input v-model="form.orderId" type="number"></el-input>
        </el-form-item>
        <el-form-item label="表盘类型:">
          <el-select placeholder="表盘类型" v-model="form.type">
            <el-option key="1" label="预置表盘" :value="1"></el-option>
            <el-option key="0" label="自定义表盘" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="form.type==0">
          <el-divider>若想把预置表盘改成自定义表盘 请删除重新添加</el-divider>

          <el-form-item label="详情图片" prop="picUrl2">
            <el-upload ref='upload' action="" :http-request="requestFile_big" :show-file-list="false"
              class="avatar-uploader">
              <img v-if="form.picUrl2" :src="form.picUrl2" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="资源选择" :visible.sync="RVisible" top="10%" width="60%">
      <el-form :model="RForm" label-width="210px" ref="RForm" :rules="AddorEditFormRules">
        <el-form-item label="固件版本号：" prop="firmwareVersion">
          <el-input v-model.trim="RForm.firmwareVersion" placeholder="R10_A0_V1.99_A00_0527_TX"></el-input>
        </el-form-item>
        <!-- <el-form-item label="拨号盘号：" prop="dialId">
                    <el-input v-model.trim="RForm.dialId" type="number"></el-input>
                </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="RFormSubmit('RForm')">确定
        </el-button>
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
  } from '@/api/clockDial/dialinterface'
  import {
    customizeInsert,
    customizeUpdate,
    customizeDetail
  } from '@/api/clockDial/dialinterface'
  import {
    queryDial
  } from '@/api/clockDial/dialResource'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    listItem as productListItem
  } from '@/api/device/productList'
  import {
    fileUpload
  } from '@/utils/fileUpload'

  export default {
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
        searchForm:{
            picName:""
        },
        dialogVisible: false,
        form: {},
        rules: {
          firmwareVersion: [{
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          }, ],
          firmwareVersion2: [{
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          }, ],
          deviceModel: [{
            required: true,
            message: '请选择设备型号',
            trigger: 'blur'
          }, ],
          dialId: [{
            required: true,
            message: '请输入拨号盘号',
            trigger: 'blur'
          }, ],
          picResourceId: [{
            required: true,
            message: '请去选择资源',
            trigger: 'blur'
          }, ],
          picUrl: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }, ],
          picUrl2: [{
            required: true,
            message: '请上传表盘界面详情图',
            trigger: 'blur'
          }, ],
          picPixel: [{
            required: true,
            message: '请输入像素',
            trigger: 'blur'
          }, ],
        },
        RVisible: false,
        RForm: {
          deviceVer: "",
          deviceModel: "",
          dialId: "",
        },
        deviceModelList: [],

      }
    },
    mounted() {
      this.getList()
      //this.getProductList()
    },
    methods: {
      getList() {
        this.loading = true
        listItem({
          offset: 0,
          limit: 999,
          ...this.searchForm
        }).then(res => {
          this.list = res.data
          this.loading = false
        })
      },
      getProductList() {
        productListItem({}).then(res => {
          this.deviceModelList = [];
          res.data.forEach(item => {
            if (item.deviceType == "watch") {
              this.deviceModelList.push(item)
            }
          })
        })
      },

      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {})
              if (this.form.type == 0) {
                customizeInsert([{
                  picName: this.form.picName,
                  picUrl: this.form.picUrl2,
                  picPixel: this.form.picPixel,
                  firmwareVersion: this.form.firmwareVersion2,
                  isDefault: "1"
                }]).then(response => {
                  this.getList()
                  this.$notify({
                    type: 'success',
                    message: '成功新增资源'
                  });
                })
              } else {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增资源'
                });
              }

            } else {
              updateItem(this.form).then(response => {})
              if (this.form.type == 0) {
                customizeUpdate({
                  picName: this.form.picName,
                  picUrl: this.form.picUrl2,
                  picPixel: this.form.picPixel,
                  firmwareVersion: this.form.firmwareVersion2,
                  isDefault: "1"
                }).then(response => {
                  this.getList()
                  this.$notify({
                    type: 'success',
                    message: '成功修改资源'
                  });
                })
              } else {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改资源'
                });
              }

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
          picName: null,
          picPixel: null,
          picUrl: null,
          picVersion: null,
          picStatus: 1,
          picResourceId: "",
          type: "",
          picName2: null,
          picPixel2: null,
          picUrl2: null,
          dialId: "",
          orderId: ""
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
        if (row.type == 0) {
          customizeDetail({
            resourceId: row.picResourceId
          }).then(res => {
            this.$set(this.form, "id2", res.data.id)
            this.$set(this.form, "picName2", res.data.picName)
            this.$set(this.form, "picPixel2", res.data.picPixel)
            this.$set(this.form, "firmwareVersion2", res.data.firmwareVersion)
            this.$set(this.form, "picUrl2", res.data.picUrl)
          })
        }
      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除资源, 是否继续?', '提示', {
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
              message: '成功删除所选资源!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除资源操作',
            type: 'info'
          });
        });
      },
      requestFile_small(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.picUrl = res.data.url;
          }
        })
      },
      requestFile_big(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.picUrl2 = res.data.url;
          }
        })
      },
      //选择资源的后的确定操作
      RFormSubmit() {
        queryDial(this.RForm).then(res => {
          if (res.data) {
            this.$set(this.form, "firmwareVersion2", this.RForm.firmwareVersion)
            this.$set(this.form, "picResourceId", res.data.id)
            this.RVisible = false;
          } else {
            this.$message({
              showClose: true,
              message: "设备型号,设备版本或拨号盘号参数错误",
              type: "error"
            });
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;

    display: block;
  }

</style>
