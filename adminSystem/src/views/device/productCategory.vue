<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="groupId" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="deviceGroupName" label="分类名">
      </el-table-column>
      <el-table-column align="center" label="分类背景图">
        <template slot-scope="scope">
          <img :src="scope.row.deviceGroupBgUrl" alt="" width="120px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="deviceGroupDescription" label="分类描述">
      </el-table-column>
      <el-table-column align="center" prop="deviceGroupOrder" label="排序">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.groupId)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('delete')">删除
          </el-button>
          <el-button @click="btn_view(scope.row)"  type="text" size="mini" style="color:#67c23a;"
            v-if="checkPer('view')&&scope.row.isThirdMenu==0">查看产品
          </el-button>
          <el-button @click="btn_view2(scope.row)"  type="text" size="mini" style="color:#67c23a;"
            v-if="checkPer('view')&&scope.row.isThirdMenu==1">三级分类
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'分类'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="分类名" prop="deviceGroupName">
          <el-input v-model.trim="form.deviceGroupName"></el-input>
        </el-form-item>
        <el-form-item label="分类背景图" prop="deviceGroupBgUrl">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.deviceGroupBgUrl" :src="form.deviceGroupBgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="设备类型："  prop="deviceGroupType">
          <el-select v-model="form.deviceGroupType" placeholder="请选择设备型号" clearable>
            <el-option v-for="item in deviceTypeList" :key="item.deviceType" :label="item.deviceType"
              :value="item.deviceType">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="排序" prop="deviceGroupOrder">
          <el-input v-model.number="form.deviceGroupOrder"></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="deviceGroupDescription">
          <el-input v-model="form.deviceGroupDescription" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="dialogTitle" :visible.sync="productListdialogVisible" width="80%">
      <productList :groupList="list" v-if="productListdialogVisible" :groupId="chooseGroupId"></productList>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="productListdialogVisible2" width="80%">
      <productThirdMenu :groupList="list" v-if="productListdialogVisible2" :groupId="chooseGroupId"></productThirdMenu>
    </el-dialog>



  </div>
</template>

<script>
  import {
    listItem,
    addItem,
    updateItem,
    deleteItem
  } from '@/api/device/productCategory'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    fileUpload
  } from '@/utils/fileUpload'
  import ProductList from "./productList.vue";
  import {
    listItem as productListItem
  } from '@/api/device/productList'
 import ProductThirdMenu from "./productThirdMenu.vue";
  export default {
    components: {
      ProductList,
      ProductThirdMenu
    },
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
          1: 'success',
          // 1: 'gray',
          0: 'danger'
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
          deviceGroupName: [{
            required: true,
            message: '请输入产品分类名称',
            trigger: 'blur'
          }, ],
          deviceGroupDescription: [{
            required: true,
            message: '请输入产品分类描述',
            trigger: 'blur'
          }, ],
          deviceGroupBgUrl: [{
            required: true,
            message: '请上传产品分类背景图',
            trigger: 'change'
          }],
          deviceGroupType: [{
            required: true,
            message: '请选择设备类型',
            trigger: 'change'
          }],
        },
        productListdialogVisible: false,
        chooseGroupId: "",
        deviceTypeList: [],
        productListdialogVisible2: false,
      }
    },
    mounted() {
      this.getList()
      this.getProductList()
    },
    methods: {
      getList() {
        listItem({
          platform: "ios",
          appVersion: "v2.0.9999"
        }).then(res => {
          this.list = res.data
          this.loading = false
        })
      },
      getProductList() {
        productListItem({}).then(res => {
          this.deviceModelList = res.data
          var obj = {};
          this.deviceTypeList = res.data.reduce(function (item, next) {
            obj[next.deviceType] ? '' : obj[next.deviceType] = true && item.push(next);
            return item;
          }, []);
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
                  message: '成功新增' + this.form.deviceGroupName + '分类'
                });
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.form.deviceGroupName + '分类'
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
          deviceGroupName: "",
          deviceGroupBgUrl: "",
          deviceGroupDescription: "",
          deviceGroupOrder: "",
          deviceGroupType: ""
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
        this.form.id = this.form.groupId
      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除分类, 是否继续?', '提示', {
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
              message: '成功删除所选分类!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除分类操作',
            type: 'info'
          });
        });
      },
      btn_view(row) {
        this.dialogTitle = row.deviceGroupName
        this.productListdialogVisible = true
        this.chooseGroupId = row.groupId
      },
      btn_view2(row) {
        this.dialogTitle = row.deviceGroupName
        this.productListdialogVisible2 = true
        this.chooseGroupId = row.groupId
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.deviceGroupBgUrl = res.data.url;
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

</style>
