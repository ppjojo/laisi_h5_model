<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="设备型号">
          <el-input v-model="searchForm.deviceModel" placeholder="N20L  T40L  F20L  F20 Pro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="deviceModel" label="设备型号">
      </el-table-column>
      <el-table-column align="center" prop="audioIndex" label="序列索引">
      </el-table-column>
      <el-table-column align="center" prop="audioName" label="音频名称">
      </el-table-column>
      <el-table-column align="center" prop="devicePreviewAudio" label="预览语音">
      </el-table-column>
      <el-table-column align="center" prop="deviceCompleteAudio" label="完整语音">
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
    <el-dialog :title="dialogTitle+'语音'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="设备型号" prop="deviceModel">
          <el-input v-model="form.deviceModel" placeholder="N20L  T40L  F20L  F20 Pro"></el-input>
        </el-form-item>
        <el-form-item label="序列索引" prop="audioIndex">
          <el-input v-model="form.audioIndex"></el-input>
        </el-form-item>
        <el-form-item label="音频名称" prop="audioName">
          <el-input v-model="form.audioName"></el-input>
        </el-form-item>
        <el-form-item label="预览语音" prop="devicePreviewAudio">
          <el-input v-model.trim="form.devicePreviewAudio" :readonly=true></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="完整语音" prop="deviceCompleteAudio">
          <el-input v-model.trim="form.deviceCompleteAudio" :readonly=true></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile2" :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
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
  listItem,
  addItem,
  updateItem,
  deleteItem,
} from "@/api/device/deviceAudio";
import { fileUpload } from "@/utils/fileUpload";
import { checkPermission } from "@/api/checkPermission";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "danger",
      };
      return statusMap[status];
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
      form: {},
      searchForm: {},
      rules: {
        deviceModel: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
        ],
        audioIndex: [
          { required: true, message: "请输入序列索引", trigger: "blur" },
        ],
        audioName: [
          { required: true, message: "请输入音频名称", trigger: "blur" },
        ],
        devicePreviewAudio: [
          { required: true, message: "请上传预览语音文件", trigger: "blur" },
        ],
        deviceCompleteAudio: [
          { required: true, message: "请上传完整语音文件", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      listItem(this.searchForm)
        .then((res) => {
          this.list = res.data;
          this.loading = false;
        })
        .catch((error) => {
          this.list = [];
        });
    },
    //保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          if (this.dialogTitle == "新增") {
            addItem(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功新增",
              });
            });
          } else {
            updateItem(this.form).then((response) => {
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
    btn_add() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      this.form = {
        deviceModel: "",
        devicePreviewAudio: "",
        deviceCompleteAudio: "",
        audioName: "",
        audioIndex: "",
      };
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.form = Object.assign({}, row);
    },
    //删除
    btn_delete(id) {
      this.$confirm("此操作将永久删除该语音, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteItem({
            id: id,
          }).then((response) => {
            this.getList();
            this.$notify({
              type: "success",
              message: "成功删除!",
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
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.devicePreviewAudio = res.data.url;
        }
      });
    },
    requestFile2(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.deviceCompleteAudio = res.data.url;
        }
      });
    },
  },
};
</script>