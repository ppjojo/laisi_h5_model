<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px;" size="medium" @click="addnew">新增</el-button>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="pictureName" label="合作单位名称">
      </el-table-column>
      <el-table-column align="center" prop="pictureVideo" width="150px" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.pictureVideo" style="width: 100px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" width="150px" label="操作">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row,2)" type="text" size="mini">编辑
          </el-button>
          <el-button @click="delItem(scope.row.id)" type="text" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="合作单位名称" prop="pictureName">
          <el-input v-model="form.pictureName"></el-input>
        </el-form-item>
        <el-form-item label="图片路径">
          <el-input v-model="form.pictureVideo" readonly=""></el-input>
          <el-image style="width: 200px; height: 100px;margin-top: 10px;" :src="form.pictureVideo" fit="cover">
          </el-image>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
            <el-button type="primary" size="mini" style="margin-top: 10px;">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">图片尺寸269*122px 比例269:122</div>
          </el-upload>
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
  getPartnerAll,
  joinPartner,
} from "@/api/officialWebsite/businesscooperation/businesscooperation";
import {
  getAllPicture,
  delPicture,
  addPicture,
  updatePicture,
} from "@/api/officialWebsite/picture";
import { checkPermission } from "@/api/checkPermission";
import { formatDate } from "@/utils/date";
import { fileUpload } from "@/utils/fileUpload";
export default {
  components: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "danger",
      };
      return statusMap[status];
    },
    formatDate(time) {
      if (!time) return "";
      time = time;
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  computed: {
    checkPer() {
      return function (btn) {
        return checkPermission(this.$route.path + "/" + btn);
      };
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      dialogVisible: false,
      form: {
        pictureVideo: "",
        pictureName: "",
      },
      dialogTitle: "新增",
      rules: {
        pictureName: [
          {
            required: true,
            message: "请填写合作伙伴",
            trigger: "blur,change",
          },
        ],
        pictureVideo: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur,change",
          },
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getAllPicture({ pictureType: 2 })
        .then((res) => {
          this.list = res.data;
          this.loading = false;
        })
        .catch((error) => {
          this.list = [];
        });
    },
    addnew() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      this.form = {
        pictureName: "",
        pictureVideo: null,
        pictureType: 2,
      };
    },
    //保存
    btn_edit(row, flag) {
      this.dialogTitle = "编辑";
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    //删除
    delItem(id) {
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          delPicture({
            id: id,
          }).then((res) => {
            this.getList();
            this.$notify({
              type: "success",
              message: "成功删除",
            });
          });
        })
        .catch(() => {
          this.$notify({
            message: "已取消删除",
            type: "info",
          });
        });
    },
    //保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          if (this.dialogTitle == "新增") {
            addPicture(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功新增",
              });
            });
          } else {
            updatePicture(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功修改",
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.pictureVideo = res.data.url;
        }
      });
    },
  },
};
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
  border-color: #409eff;
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

.avatar-uploader-icon2 {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar2 {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
