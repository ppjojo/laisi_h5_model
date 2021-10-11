<template>
  <div class="app-container">
    <el-button type="primary" size="mini" style="margin-top: 10px;" @click="addPrivacyAgreement">隐私协议版本更新</el-button>
    <el-form :model="form" label-width="100px">
      <el-form-item label="跳转链接">
        <el-input v-model="form.target" placeholder="跳转链接"></el-input>
      </el-form-item>
      <el-form-item label="文件地址">
        <el-input v-model="form.url" readonly=""></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
          <el-button type="primary" size="mini" style="margin-top: 10px;">上传文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch v-model="form.status" active-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-button type="primary" size="mini" style="margin-top: 10px;" @click="submitForm">保存配置</el-button>
    </el-form>

  </div>
</template>

<script>
import {
  listItem,
  updateItem,
  privacyAgreement,
} from "@/api/operate/activityConfig";
import { fileUpload } from "@/utils/fileUpload";
export default {
  data() {
    return {
      form: {
        target: null,
        url: null,
        id: null,
        status: null,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    addPrivacyAgreement() {
      privacyAgreement({}).then((res) => {});
    },
    getList() {
      listItem({}).then((res) => {
        res.data.status = res.data.status == 1 ? true : false;
        this.form = res.data;
      });
    },
    submitForm() {
      if (!this.form.target) {
        this.$message({
          showClose: true,
          message: "未填写跳转链接",
          type: "error",
        });
        return;
      }
      if (!this.form.url) {
        this.$message({
          showClose: true,
          message: "未上传文件",
          type: "error",
        });
        return;
      }
      this.form.status = this.form.status ? 1 : 0;
      updateItem(this.form).then((res) => {
        this.form.status = res.data.status == 1 ? true : false;
        this.$message({
          message: "提交成功",
          type: "success",
        });
      });
    },
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.url = res.data.url;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>