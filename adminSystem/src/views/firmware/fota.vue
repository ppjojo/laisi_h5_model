<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="appPlatform" label="平台类型">
        <template slot-scope="scope">
          {{ scope.row.appPlatform==1?"Android":scope.row.appPlatform==2?"IOS":"All"}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="firmwareType" label="产品类型">
      </el-table-column>
      <el-table-column align="center" prop="version" label="固体版本">
      </el-table-column>
      <el-table-column align="center" prop="versionCode" label="固件版本号">
      </el-table-column>
      <el-table-column align="center" prop="hardwareCode" label="硬件平台">
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enable | statusFilter" size="mini">
            {{ scope.row.enable==0?"不可用":"可用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="交管状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.checkStatus | statusFilter" size="mini">
            {{ scope.row.checkStatus==0?"未交管":"已交管" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('delete')">删除
          </el-button>
          <el-button @click=" btn_grayInfo(scope.row)" type="text" style="color:#67C23A;" size="mini"
            v-if="checkPer('grayInfo')">灰度信息
          </el-button>
          <el-button @click=" btn_checkStatus(scope.row)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('checkStatus')&&scope.row.checkStatus==1">取消交管
          </el-button>
          <el-button @click=" btn_checkStatus(scope.row)" type="text" size="mini"
            v-if="checkPer('checkStatus')&& scope.row.checkStatus==0">交管
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="200px" :rules="rules" ref="form">
        <el-form-item label="平台类型：" prop="appPlatform">
          <el-radio-group v-model="form.appPlatform">
            <el-radio class="radio" :label="1">Android</el-radio>
            <el-radio class="radio" :label="2">IOS</el-radio>
            <el-radio class="radio" :label="3">All</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="固件对应的产品类型：" prop="firmwareType">
          <el-input v-model="form.firmwareType"></el-input>
        </el-form-item>
        <el-form-item label="固件版本：" prop="version">
          <el-input v-model="form.version" placeholder="例：W1_B0_V1.29_A00_1017_WB"></el-input>
        </el-form-item>
        <el-form-item label="固件版本号：" prop="versionCode">
          <el-input v-model="form.versionCode"></el-input>
        </el-form-item>

        <el-form-item label="硬件平台：" prop="hardwareCode">
          <el-input v-model="form.hardwareCode"></el-input>
        </el-form-item>

        <el-form-item label="是否可用" prop="enable">
          <el-radio-group v-model="form.enable">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否强制升级" prop="forceUpgrade">
          <el-radio-group v-model="form.forceUpgrade">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文件下载地址" prop="url">
          <el-input v-model="form.url"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :before-upload="beforeAvatarUpload"
            :show-file-list="false">
            <el-button size="small" type="primary">点击上传文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type='textarea'></el-input>
        </el-form-item>
        <el-form-item label="固件文件大小（KB）" prop="size">
          <el-input v-model="form.size"></el-input>
        </el-form-item>
        <el-form-item label="固件文件的MD5校验" prop="md5">
          <el-input v-model="form.md5"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!--灰度信息配置页面-->
    <el-dialog title='灰度信息' :visible.sync="whiteVisible">
      <el-form :model="whiteForm" label-width="120px" ref="whiteForm">
        <el-form-item label="平台类型：" prop="appPlatform">
          <el-radio-group v-model="whiteForm.appPlatform">
            <el-radio class="radio" :label="1">Android</el-radio>
            <el-radio class="radio" :label="2">IOS</el-radio>
            <el-radio class="radio" :label="3">All</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="IOS版本号" v-if="whiteForm.appPlatform==2||whiteForm.appPlatform==3" prop="appVersion">
          <el-input v-model="whiteForm.iosVersion"></el-input>
        </el-form-item>
        <el-form-item label="Android版本号" v-if="whiteForm.appPlatform==1||whiteForm.appPlatform==3" prop="appVersion">
          <el-input v-model="whiteForm.androidVersion"></el-input>
        </el-form-item>
        <el-form-item label="白名单组" prop="whiteListGroup">
          <!-- <el-select v-model="whiteForm.whiteListGroup" clearable placeholder="请选择">
                        <el-option v-for="item in allWhiteList" :label="item.groupName" :value="item.groupId">
                        </el-option>
                    </el-select> -->
          <el-checkbox-group v-model="whiteForm.groupNames">
            <el-checkbox v-for="item in allWhiteList" :label="item.groupName" :key="item.groupId" :value="item.groupId">
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="whiteVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click.native="whiteAddSubmit('whiteForm')">提交
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
    deleteItem,
    viewItem,
    changeCheckStatus
  } from '@/api/firmware/fota'
  import {
    fileUpload
  } from '@/utils/fileUpload'
  import {
    listItem as queryWhitelist
  } from '@/api/firmware/whiteList';
  import {
    grayInfoItem,
    grayInfoAddItem
  } from '@/api/firmware/fota';
  import {
    checkPermission
  } from '@/api/checkPermission'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
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

        dialogVisible: false,
        form: {},
        rules: {
          deviceTitle: [{
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          }, ],
          deviceType: [{
            required: true,
            message: '请输入产品类型',
            trigger: 'blur'
          }, ],
          deviceModel: [{
            required: true,
            message: '请输入产品型号',
            trigger: 'blur'
          }, ],
        },
        whiteVisible: false,
        whiteListGroup: [],
        allWhiteList: [],
        whiteVisible: false,
        whiteFormLoading: false,
        whiteForm: {
          groupNames: []
        },


      }
    },
    mounted() {
      this.getList()
      this.getAllWhiteList()
    },
    methods: {
      getList() {
        listItem({}).then(res => {
          this.list = res.data
          this.loading = false
        })
      },
      getAllWhiteList() {
        queryWhitelist().then(res => {
          this.allWhiteList = res.data
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
                  message: '成功新增' + this.form.version
                });
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.form.version
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
          appPlatform: 3, //appPlatform: android=1 ios=2 all=3, app平台类型
          firmwareType: '', //固件对应的产品类型
          version: '', //固件版本：根据产品类型（W1）、固件类型（B0）、版本号（1.29）来比较。如：W1_B0_V1.29_A00_1017_WB
          versionCode: '', //固件版本号
          hardwareCode: '', //硬件平台
          enable: 0, //默认为0，不可用。可以用为1
          url: '', //文件下载地址
          md5: '', //固件文件的MD5校验
          size: '', //固件文件大小（KB）
          forceUpgrade: 0, //是否强制升级，0：否、1：是
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
        viewItem({
          id: row.id
        }).then(res => {
          this.form = Object.assign(this.form, res.data)
          res.data.forceUpgrade ? this.form.forceUpgrade = 1 : this.form.forceUpgrade = 0;
        })

      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
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
              message: '成功删除所选数据!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除操作',
            type: 'info'
          });
        });
      },
      btn_grayInfo(row) {
        grayInfoItem({
          fotaId: row.id
        }).then(res => {
          this.whiteVisible = true
          if (res.data) {
            this.whiteForm = Object.assign({
              groupNames: []
            }, res.data)

            if (this.whiteForm.appPlatform == "android") {
              this.whiteForm.appPlatform = 1
            } else if (this.whiteForm.appPlatform == 'ios') {
              this.whiteForm.appPlatform = 2
            } else if (this.whiteForm.appPlatform == 'all') {
              this.whiteForm.appPlatform = 3
            }
            if (this.whiteForm.whiteListGroups) {
              this.whiteForm.whiteListGroups.split(",")
              this.whiteForm.whiteListGroups = this.whiteForm.whiteListGroups.split(",")
              this.whiteForm.whiteListGroups.forEach(item => {
                this.allWhiteList.forEach(wItem => {
                  if (item == wItem.groupId) this.whiteForm.groupNames.push(wItem.groupName)
                });
              });
            }

          } else {
            this.whiteForm = {
              appVersion: "",
              whiteListGroup: "",
              fotaId: row.id,
              appPlatform: 3,
              groupNames: []
            }
          }
        })
      },
      btn_checkStatus(row) {
          let checkStatus=0;
          if(row.checkStatus==0){
              checkStatus=1
          }
        this.$confirm('此操作将修改交管状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeCheckStatus({
            id: row.id,
            checkStatus:checkStatus
          }).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '已修改!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除操作',
            type: 'info'
          });
        });
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.url = res.data.url;
            this.form.size = res.data.size;
            this.form.md5 = res.data.md5;
          }
        })
      },
      whiteAddSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var ids = []
            this.whiteForm.groupNames.map(item => {
              this.allWhiteList.forEach(element => {
                if (element.groupName == item) {
                  ids.push(element.groupId)
                }
              });
            })
            if (this.whiteForm.appPlatform == 1) {
              this.whiteForm.appPlatform = 'android'
              this.whiteForm.iosVersion = ''
            } else if (this.whiteForm.appPlatform == 2) {
              this.whiteForm.appPlatform = 'ios'
              this.whiteForm.androidVersion = ''
            } else if (this.whiteForm.appPlatform == 3) {
              this.whiteForm.appPlatform = 'all'
            }
            this.whiteForm.whiteListGroups = ids.join(",")
            this.whiteVisible = false
            grayInfoAddItem(this.whiteForm).then(response => {
              this.getList()
              this.$notify({
                type: 'success',
                message: '成功新增灰度信息'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }

</script>
