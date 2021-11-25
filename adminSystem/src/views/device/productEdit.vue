<template>
  <div class="app-container">
    <el-form :model="form" label-width="150px" :rules="rules" ref="form">
      <el-form-item label="产品名称:" prop="deviceName">
        <el-input v-model="form.deviceName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="产品分类：" prop="deviceGroupId" v-if=" dev!= 'eur' && dev != 'usa'">
        <el-select v-model="form.deviceGroupId" placeholder="请选择产品分类" clearable>
          <el-option v-for="item in groupList" :key="item.groupId" :label="item.deviceGroupName" :value="item.groupId"></el-option>
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
      <el-form-item label="设备供应商Logo_black" prop="deviceVendorLogo">
        <el-input v-model="form.deviceVendorLogo" style="margin-bottom:10px;"></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile_logo" :show-file-list="false" class="avatar-uploader">
          <img v-if="form.deviceVendorLogo" :src="form.deviceVendorLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="设备供应商Logo_white" prop="deviceWhiteVendorLogo">
        <el-input v-model="form.deviceWhiteVendorLogo" style="margin-bottom:10px;"></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile_logo_white" :show-file-list="false" class="avatar-uploader">
          <img v-if="form.deviceWhiteVendorLogo" :src="form.deviceWhiteVendorLogo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品外观图（小）" prop="deviceIconSmallUrl">
        <el-input v-model="form.deviceIconSmallUrl" style="margin-bottom:10px;"></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile_small" :show-file-list="false" class="avatar-uploader">
          <img v-if="form.deviceIconSmallUrl" :src="form.deviceIconSmallUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品外观图（大）" prop="deviceIconLargeUrl">
        <el-input v-model="form.deviceIconLargeUrl" style="margin-bottom:10px;"></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile_big" :show-file-list="false" class="avatar-uploader">
          <img v-if="form.deviceIconLargeUrl" :src="form.deviceIconLargeUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="绑定页动画_black" prop="deviceBindAnimation">
        <el-input v-model="form.deviceBindAnimation" style="margin-bottom:10px;"></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile_animation" :show-file-list="false" class="avatar-uploader">
          <img v-if="form.deviceBindAnimation" :src="form.deviceBindAnimation" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="绑定页动画_white" prop="deviceBindAnimation_white">
        <el-input v-model="form.deviceWhiteBindAnimation" style="margin-bottom:10px;"></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile_animation_white" :show-file-list="false" class="avatar-uploader">
          <img v-if="form.deviceWhiteBindAnimation" :src="form.deviceWhiteBindAnimation" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button size="mini" @click="$emit('refresh')">取 消</el-button>
      <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { addItem } from "@/api/device/productList";
import { fileUpload } from "@/utils/fileUpload";

export default {
  props: {
    formItem: Object,
  },
  watch: {
    formItem() {
      this.form = this.formItem;
    },
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        // 1: 'gray',
        0: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      rules: {
        languageType: [
          {
            required: true,
            message: "请选择所属语言类型",
            trigger: "change",
          },
        ],
        deviceName: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        deviceType: [
          {
            required: true,
            message: "请输入产品类型",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        deviceVendor: [
          {
            required: true,
            message: "请输入产品供应商",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        deviceModel: [
          {
            required: true,
            message: "请输入产品型号",
            trigger: "blur",
          },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        deviceIconSmallUrl: [
          {
            required: true,
            message: "请输入产品图片（小）地址",
            trigger: "blur",
          },
        ],
        deviceIconLargeUrl: [
          {
            required: true,
            message: "请输入产品图片（大）地址",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请填写产品描述",
            trigger: "blur",
          },
        ],

        bindRule: [
          {
            required: true,
            message: "请选择绑定规则",
            trigger: "change",
          },
        ],
        bindStrategy: [
          {
            required: true,
            message: "请选择绑定策略",
            trigger: "change",
          },
        ],
        deviceGroupDescription: [
          {
            required: true,
            message: "请填写产品分类描述",
            trigger: "change",
          },
        ],
        homePageTitle: [
          {
            required: true,
            message: "请填写首页卡片标题",
            trigger: "change",
          },
        ],
        deviceGroupBgUrl: [
          {
            required: true,
            message: "请上传产品分类背景图",
            trigger: "change",
          },
        ],
        deviceGroupId: [
          {
            required: true,
            message: "请选择产品分类",
            trigger: "change",
          },
        ],
        deviceScanName: [
          {
            required: true,
            message: "请输入设备扫描型号",
            trigger: "change",
          },
        ],
        deviceVendorLogo: [
          {
            required: true,
            message: "请上传品牌供应商的logo",
            trigger: "blur",
          },
        ],
        deviceWhiteVendorLogo: [
          {
            required: true,
            message: "请上传品牌供应商的logo",
            trigger: "blur",
          },
        ],
        // deviceBindAnimation:[
        //     { required: true, message: '请上传绑定动画', trigger: 'blur' },
        // ],
        bindDeviceLimit: [
          {
            required: true,
            message: "请输入设备可绑定的用户数：",
            trigger: "blur",
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "请输入正整数",
            trigger: "blur",
          },
        ],
        bindUserLimit: [
          {
            required: true,
            message: "请输入用户可绑定的设备数",
            trigger: "blur",
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "请输入正整数",
            trigger: "blur",
          },
        ],
      },

      bindRuleList: [
        {
          name: "1:1",
          value: "1:1",
        },
        {
          name: "1:n",
          value: "1:n",
        },
        {
          name: "n:n",
          value: "n:n",
        },
      ],
      bindStrategyList: [
        {
          name: "bt_mac",
          value: "bt_mac",
        },
        {
          name: "wifi_mac",
          value: "wifi_mac",
        },
      ],
    };
  },
  mounted() {
    this.form = this.formItem;
  },
  methods: {
    //保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.bindRule == "n:n") {
            if (
              this.form.bindDeviceLimit == 1 ||
              this.form.bindUserLimit == 1
            ) {
              return this.$message({
                showClose: true,
                message:
                  "绑定规则是 n:n , 用户可绑定的设备数 或 设备可绑定的用户数 有误",
                type: "error",
              });
            }
          } else if (this.form.bindRule == "1:n") {
            if (
              this.form.bindDeviceLimit == 1 &&
              this.form.bindUserLimit == 1
            ) {
              return this.$message({
                showClose: true,
                message:
                  "绑定规则是 1:n, 用户可绑定的设备数 或 设备可绑定的用户数 有误",
                type: "error",
              });
            }
          }

          addItem(this.form).then((response) => {
            if (response.code == 0) {
              if (!this.form.id) {
                this.$notify({
                  type: "success",
                  message: "成功新增" + this.form.deviceName,
                });
              } else {
                this.$notify({
                  type: "success",
                  message: "成功修改" + this.form.deviceName,
                });
              }
              this.$emit("refresh");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    requestFile_logo(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.deviceVendorLogo = res.data.url;
        }
      });
    },
    requestFile_logo_white(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.deviceWhiteVendorLogo = res.data.url;
        }
      });
    },

    requestFile_small(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.deviceIconSmallUrl = res.data.url;
        }
      });
    },
    requestFile_big(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.deviceIconLargeUrl = res.data.url;
        }
      });
    },
    requestFile_animation(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.deviceBindAnimation = res.data.url;
        }
      });
    },
    requestFile_animation_white(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.deviceWhiteBindAnimation = res.data.url;
        }
      });
    },
  },
};
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
  border-color: #409eff;
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
