<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="组名">
      </el-table-column>
      <el-table-column align="center" label="赛事logo">
        <template slot-scope="scope">
          <img :src="scope.row.logo" alt="" width="120px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="赛事名">
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题">
      </el-table-column>
      <el-table-column label="开始时间">
        <template scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template scope="scope">
          {{scope.row.endTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
          <el-button @click="btn_view(scope.row)" type="text" size="mini" style="color:#67c23a;">查看组织
          </el-button>
          <el-button @click="btn_view_competition(scope.row)" type="text" size="mini" style="color:#67c23a;">比赛
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'组'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="唯一标识" prop="id">
          <el-input v-model.trim="form.id"></el-input>
        </el-form-item>
        <el-form-item label="赛事logo" prop="logo">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.logo" :src="form.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="赛事名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="小标题" prop="subTitile">
          <el-input v-model="form.subTitile"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="form.startTime" type="datetime" value-format="timestamp" placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime">
          <el-date-picker v-model="form.endTime" type="datetime" value-format="timestamp" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="schoolListdialogVisible" width="80%">
      <schoolList :campId="campId"></schoolList>
    </el-dialog>

    <el-dialog :title="dialogTitle" :visible.sync="competitonListdialogVisible" width="80%">
      <Competition :campId="campId"></Competition>
    </el-dialog>

  </div>
</template>

<script>
import {
  listItem,
  addItem,
  updateItem,
  deleteItem,
} from "@/api/competitionActivity/jingan/jingan_camp";
import { checkPermission } from "@/api/checkPermission";
import { fileUpload } from "@/utils/fileUpload";
import SchoolList from "./jingan_school.vue";
import Competition from "./jingan_competition.vue";
import { formatDate } from "@/utils/date";

export default {
  components: {
    SchoolList,
    Competition,
  },
  computed: {
    checkPer() {
      return function (btn) {
        return checkPermission(this.$route.path + "/" + btn);
      };
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
    formatDate(time) {
      time = time;
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  data() {
    return {
      list: [],
      loading: false,

      dialogVisible: false,
      form: {},
      rules: {
        id: [
          {
            required: true,
            message: "请输入唯一标识",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入赛事名",
            trigger: "blur",
          },
        ],
        startTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "blur",
          },
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "blur",
          },
        ],
      },
      schoolListdialogVisible: false,
      campId: "",
      competitonListdialogVisible: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      listItem().then((res) => {
        this.list = res.data;
        this.loading = false;
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
                message: "成功新增" + this.form.name,
              });
            });
          } else {
            updateItem(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功修改" + this.form.name,
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
        endTime: "",
        logo: "",
        id: "",
        name: "",
        startTime: "",
        subTitile: "",
        title: "",
      };
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.form = Object.assign({}, row);
    },
    //删除
    btn_delete(row) {
      this.$confirm("此操作将永久删除该组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteItem({
            id: row.id,
          }).then((response) => {
            this.getList();
            this.$notify({
              type: "success",
              message: "成功删除所选组!",
            });
          });
        })
        .catch(() => {
          this.$notify({
            message: "已取消删除操作",
            type: "info",
          });
        });
    },
    btn_view(row) {
      this.dialogTitle = row.name;
      this.schoolListdialogVisible = true;
      this.campId = row.id;
    },
    btn_view_competition(row) {
      this.dialogTitle = row.name;
      this.competitonListdialogVisible = true;
      this.campId = row.id;
    },
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.logo = res.data.url;
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
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar {
  width: 80px;
  display: block;
}
</style>
