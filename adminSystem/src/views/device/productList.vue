<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="deviceName" label="产品名">
      </el-table-column>
      <el-table-column align="center" label="产品图">
        <template slot-scope="scope">
          <img :src="scope.row.deviceIconSmallUrl" alt="" width="100px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="deviceModel" label="产品具体型号">
      </el-table-column>
      <el-table-column align="center" prop="bindRule" label="绑定规则">
      </el-table-column>
      <el-table-column align="center" prop="deviceOrderNumber" label="排序">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'产品'" :visible.sync="dialogVisible" width="70%" append-to-body>
      <el-form :model="form" label-width="150px" :rules="rules" ref="form">
        <!-- <el-form-item label="所属语言:" prop="languageType">
                    <el-select v-model="form.languageType">
                        <el-option v-for="item in languageList" :label="item.languageType" :value="item.languageType">
                            {{item.languageType + '-' +item.description}}
                        </el-option>
                    </el-select>
                </el-form-item> -->
        <el-form-item label="产品名称:" prop="deviceName">
          <el-input v-model="form.deviceName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="产品分类：" prop="deviceGroupId" v-if=" dev!= 'eur' && dev != 'usa'">
          <el-select v-model="form.deviceGroupId" placeholder="请选择产品分类" clearable>
            <el-option v-for="item in groupList" :key="item.groupId" :label="item.deviceGroupName"
              :value="item.groupId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品类型：" prop="deviceType">
          <el-input v-model="form.deviceType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品型号：" prop="deviceModel">
          <el-input v-model="form.deviceModel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品供应商：" prop="deviceVendor">
          <el-input v-model="form.deviceVendor" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备支持的协议:" prop="protocolType">
          <el-input v-model="form.protocolType" placeholder="laisi || hilink"></el-input>
        </el-form-item>
        <el-form-item label="IOS支持版本号:">
          <el-input v-model="form.iosVersion"></el-input>
        </el-form-item>
        <el-form-item label="Android支持版本号:">
          <el-input v-model="form.androidVersion"></el-input>
        </el-form-item>
        <el-form-item label="首页卡片标题:" prop="homePageTitle">
          <el-input v-model="form.homePageTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备排序号" prop="deviceOrderNumber">
          <el-input v-model="form.deviceOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="蓝牙扫描名" prop="deviceScanName">
          <el-input v-model="form.deviceScanName"></el-input>
        </el-form-item>
        <el-form-item label="设备供应商Logo" prop="deviceVendorLogo">
          <el-upload ref='upload' action="" :http-request="requestFile_logo" :show-file-list="false"
            class="avatar-uploader">
            <img v-if="form.deviceVendorLogo" :src="form.deviceVendorLogo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品外观图（小）" prop="deviceIconSmallUrl">
          <el-upload ref='upload' action="" :http-request="requestFile_small" :show-file-list="false"
            class="avatar-uploader">
            <img v-if="form.deviceIconSmallUrl" :src="form.deviceIconSmallUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品外观图（大）" prop="deviceIconLargeUrl">
          <el-upload ref='upload' action="" :http-request="requestFile_big" :show-file-list="false"
            class="avatar-uploader">
            <img v-if="form.deviceIconLargeUrl" :src="form.deviceIconLargeUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="绑定页动画" prop="deviceBindAnimation">
          <el-input v-model="form.deviceBindAnimation" style="margin-bottom:10px;"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile_animation" :show-file-list="false"
            class="avatar-uploader">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品描述：" prop="description">
          <el-input type="textarea" v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="绑定规则：" prop="bindRule">
          <el-select v-model="form.bindRule" placeholder="请选择绑定规则" clearable @change="selectLimit_edit">
            <el-option v-for="item in bindRuleList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定策略：" prop="bindStrategy">
          <el-select v-model="form.bindStrategy" placeholder="请选择绑定策略" clearable>
            <el-option v-for="item in bindStrategyList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备可绑定的用户数：" prop="bindUserLimit">
          <el-input v-model.number="form.bindUserLimit" :disabled="form.bindRule=='1:1'"></el-input>
        </el-form-item>
        <el-form-item label="用户可绑定的设备数：" prop="bindDeviceLimit">
          <el-input v-model.number="form.bindDeviceLimit" :disabled="form.bindRule=='1:1' "></el-input>
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
    deleteItem
  } from '@/api/device/productList'
  import {
    listItem as languageListItem
  } from '@/api/device/appLanguage'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    fileUpload
  } from '@/utils/fileUpload'

  export default {
    props: {
      groupList: Array,
      groupId: String
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
        languageList: [],

        dialogVisible: false,
        form: {},
        rules: {
          languageType: [{
            required: true,
            message: '请选择所属语言类型',
            trigger: 'change'
          }],
          deviceName: [{
              required: true,
              message: '请输入产品名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 50,
              message: '长度在 1 到 50 个字符',
              trigger: 'blur'
            }
          ],
          deviceType: [{
              required: true,
              message: '请输入产品类型',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 50,
              message: '长度在 1 到 50 个字符',
              trigger: 'blur'
            }
          ],
          deviceVendor: [{
              required: true,
              message: '请输入产品供应商',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 50,
              message: '长度在 1 到 50 个字符',
              trigger: 'blur'
            }
          ],
          deviceModel: [{
              required: true,
              message: '请输入产品型号',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 30,
              message: '长度在 1 到 30 个字符',
              trigger: 'blur'
            }
          ],
          deviceIconSmallUrl: [{
            required: true,
            message: '请输入产品图片（小）地址',
            trigger: 'blur'
          }, ],
          deviceIconLargeUrl: [{
            required: true,
            message: '请输入产品图片（大）地址',
            trigger: 'blur'
          }, ],
          description: [{
            required: true,
            message: '请填写产品描述',
            trigger: 'blur'
          }, ],

          bindRule: [{
            required: true,
            message: '请选择绑定规则',
            trigger: 'change'
          }, ],
          bindStrategy: [{
            required: true,
            message: '请选择绑定策略',
            trigger: 'change'
          }],
          deviceGroupDescription: [{
            required: true,
            message: '请填写产品分类描述',
            trigger: 'change'
          }],
          homePageTitle: [{
            required: true,
            message: '请填写首页卡片标题',
            trigger: 'change'
          }],
          deviceGroupBgUrl: [{
            required: true,
            message: '请上传产品分类背景图',
            trigger: 'change'
          }],
          deviceGroupId: [{
            required: true,
            message: '请选择产品分类',
            trigger: 'change'
          }],
          deviceScanName: [{
            required: true,
            message: '请输入设备扫描型号',
            trigger: 'change'
          }],
          deviceVendorLogo: [{
            required: true,
            message: '请上传品牌供应商的logo',
            trigger: 'blur'
          }, ],
          // deviceBindAnimation:[
          //     { required: true, message: '请上传绑定动画', trigger: 'blur' },
          // ],
          bindDeviceLimit: [{
              required: true,
              message: '请输入设备可绑定的用户数：',
              trigger: 'blur'
            },
            {
              pattern: /^\+?[1-9]\d*$/,
              message: "请输入正整数",
              trigger: "blur"
            }
          ],
          bindUserLimit: [{
              required: true,
              message: '请输入用户可绑定的设备数',
              trigger: 'blur'
            },
            {
              pattern: /^\+?[1-9]\d*$/,
              message: "请输入正整数",
              trigger: "blur"
            }
          ]
        },

        bindRuleList: [{
            name: '1:1',
            value: '1:1'
          },
          {
            name: '1:n',
            value: '1:n'
          },
          {
            name: 'n:n',
            value: 'n:n'
          },
        ],
        bindStrategyList: [{
            name: 'bt_mac',
            value: 'bt_mac'
          },
          {
            name: 'wifi_mac',
            value: 'wifi_mac'
          }
        ],
        dev: "production"

      }
    },
    mounted() {
      this.getLanguageList()
      this.getList()
      this.dev = process.env.VUE_APP_INTERFACEADDRESS;
    },
    methods: {
      getList() {
        listItem({}).then(res => {
          if (res.code == 0) {
            this.list = []
            res.data.forEach(item => {
              if (item.deviceGroupId == this.groupId) {
                this.list.push(item)
              }
            });
          }
        })
      },
      getLanguageList() {
        languageListItem({
          isSupport: 1
        }).then(res => {
          this.languageList = res.data
        })
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.bindRule == 'n:n') {
              if (this.form.bindDeviceLimit == 1 || this.form.bindUserLimit == 1) {
                return this.$message({
                  showClose: true,
                  message: '绑定规则是 n:n , 用户可绑定的设备数 或 设备可绑定的用户数 有误',
                  type: 'error'
                });
              }

            } else if (this.form.bindRule == '1:n') {
              if (this.form.bindDeviceLimit == 1 && this.form.bindUserLimit == 1) {
                return this.$message({
                  showClose: true,
                  message: '绑定规则是 1:n, 用户可绑定的设备数 或 设备可绑定的用户数 有误',
                  type: 'error'
                });
              }
            }

            addItem(this.form).then(response => {
              if (response.code == 0) {
                if (this.dialogTitle == "新增") {
                  this.$notify({
                    type: 'success',
                    message: '成功新增' + this.form.deviceName
                  });
                } else {
                  this.$notify({
                    type: 'success',
                    message: '成功修改' + this.form.deviceName
                  });
                }
                this.dialogVisible = false;
                this.getList()
              }
            })

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
          languageType: null, //所属语言类型
          deviceName: "",
          deviceType: "",
          deviceVendor: '',
          deviceModel: "",
          deviceIconSmallUrl: "",
          deviceIconLargeUrl: "",
          description: "",
          bindRule: "",
          bindStrategy: '',
          bindDeviceLimit: 1,
          bindUserLimit: 1,
          androidVersion: "",
          iosVersion: "",
          homePageTitle: "",
          deviceVendorLogo: "",
          deviceScanName: "",
          deviceBindAnimation: "",
          protocolType:""
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除产品, 是否继续?', '提示', {
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
              message: '成功删除所选产品!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除产品操作',
            type: 'info'
          });
        });
      },
      requestFile_logo(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.deviceVendorLogo = res.data.url;
          }
        })
      },
      requestFile_small(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.deviceIconSmallUrl = res.data.url;
          }
        })
      },
      requestFile_big(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.deviceIconLargeUrl = res.data.url;
          }
        })
      },
      requestFile_animation(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.deviceBindAnimation = res.data.url;
          }
        })
      }
    }
  }

</script>

<style scoped>
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
