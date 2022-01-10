<template>
  <div class="app-container">
    <div class="container-edit">
      <!-- <el-button type="primary" size="mini" @click="btn_add()">添加学校</el-button> -->
      <el-upload ref='upload' action="" :http-request="submitSchool" :show-file-list="false" class="avatar-uploader">
        <el-button type="primary" size="mini">导入学校信息</el-button>
      </el-upload>
    </div>
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="UserId">
          <el-input v-model="searchForm.userId" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phoneNumber" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="学生名">
          <el-input v-model="searchForm.name" placeholder="学生名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="mini" @click="searchStudent">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="name" label="学校名称">
      </el-table-column>
      <el-table-column align="center" prop="icon" label="校徽">
        <template scope="scope">
          <el-image style="width: 60px; height: 60px;" :src=" scope.row.icon" fit="fit">
          </el-image>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="leaderName" label="领队"></el-table-column>
      <el-table-column align="center" prop="leaderPhoneNumber" label="领队号码"></el-table-column> -->
      <el-table-column align="center" prop="popularity" label="人气值"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button @click="btn_view(scope.row)" type="text" size="mini">查看学生
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
          <el-upload ref='upload' action="" accept=".xls, .xlsx" :http-request="requestlistExcelFile" style="display: inline-block;margin:0 10px;" :show-file-list="false">
            <el-button type="text" style="color:#67C23A;" size="mini" @click="schoolId=scope.row.id">导入学生
            </el-button>
          </el-upload>

        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'学校'" :visible.sync="dialogVisible" width="50%" append-to-body>
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="学校名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="校徽" prop="icon">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.icon" :src="form.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="领队名字" prop="leaderName">
          <el-input v-model="form.leaderName"></el-input>
        </el-form-item>
        <el-form-item label="领队号码" prop="leaderPhoneNumber">
          <el-input v-model="form.leaderPhoneNumber"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title='学生详情' :visible.sync="DetailVisible" width="70%" append-to-body>
      <el-table :data="detailList" highlight-current-row style="width: 100%;">
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <!-- <el-table-column prop="headPic" label="头像">
          <template scope="scope">
            <el-image style="width: 100px; height: 100px" :src=" scope.row.headPic" fit="fit">
            </el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <!-- <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column> -->
        <el-table-column align="center" label="操作" width="120">
          <template scope="scope">
            <el-button @click="btn_editStu(scope.row)" type="text" size="mini">编辑学生
            </el-button>
            <el-button @click="btn_searchStuDaily(scope.row)" type="text" size="mini">学生的数据详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="DetailVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

    <!-- 查询的列表结果 -->
    <el-dialog title='学生详情' :visible.sync="searchVisible" width="70%" append-to-body>
      <el-table :data="searchList" highlight-current-row style="width: 100%;">
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="totalCount" label="总个数"></el-table-column>
        <el-table-column prop="totalTime" label="总时长（秒）">
          <template scope="scope">
            {{scope.row.totalTime/1000}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template scope="scope">
            <el-button @click="btn_searchStuDaily(scope.row)" type="text" size="mini">学生的数据详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="searchVisible = false">取消
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title='学生跳绳数据详情' :visible.sync="searchStuListVisible" width="70%" append-to-body>
      <el-table :data="searchStuDailyList" highlight-current-row style="width: 100%;">
        <el-table-column prop="day" label="日期"></el-table-column>
        <el-table-column prop="studentId" label="用户ID"></el-table-column>
        <el-table-column prop="totalNumber" label="总个数"></el-table-column>
        <el-table-column prop="totalTime" label="总时长（秒）">
          <template scope="scope">
            {{scope.row.totalTime/1000}}
          </template>
        </el-table-column>
        <el-table-column prop="totalBurn" label="总消耗"></el-table-column>

        <el-table-column prop="state" label="状态">
          <template scope="scope">
            <el-tag :type="scope.row.state | statusFilter" size="mini">
              {{ scope.row.state==0?"正常":"作弊" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template scope="scope">
            <el-button @click="dataRevert(scope.row)" type="text" size="mini">数据找回
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="searchStuListVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title='学生详情编辑' :visible.sync="stuVisible" width="70%" append-to-body>
      <el-form :model="stuForm" label-width="100px" :rules="rules" ref="stuForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="stuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="stuForm.phoneNumber"></el-input>
        </el-form-item>
        <!-- <el-form-item label="头像">
          <el-image style="width: 100px; height: 100px" :src=" stuForm.headPic" fit="fit">
          </el-image>
        </el-form-item> -->
        <!-- <el-form-item label="昵称" prop="nickName">
          <el-input v-model="stuForm.nickName" :disabled="true"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stuVisible = false">取消
        </el-button>
        <el-button type="primary" size="mini" @click="submitStuForm('stuForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  registerSchool,
  listItem,
  addItem,
  importStudent,
  deleteItem,
  studentListItem,
  updateStuItem,
  searchStudent,
  studentDaily,
  dataRevert,
} from "@/api/competitionActivity/jingan_school";
import { checkPermission } from "@/api/checkPermission";
import { fileUpload } from "@/utils/fileUpload";

export default {
  props: {
    campId: String,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "danger",
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
      page: 1,

      dialogVisible: false,
      form: {},
      rules: {},
      DetailVisible: false,
      detailList: [],
      schoolId: "",
      stuForm: {},
      stuVisible: false,
      rules: {
        phoneNumber: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
      },
      searchVisible: false,
      searchForm: {
        phoneNumber: null,
        name: null,
        userId: null,
      },
      searchList: [],
      searchStuListVisible: false,
      searchStuDailyList: [],
    };
  },
  mounted() {
    console.log(this.campId);
    this.getList();
  },
  methods: {
    submitSchool(param) {
      var fileForm = new FormData();
      fileForm.append("multipartFile", param.file);
      registerSchool(fileForm).then((res) => {
        if (res.code == 0) {
          this.getSchoolList();
          this.$notify({
            type: "success",
            message: "学校导入成功!",
          });
        } else {
          this.$notify({
            message: res.msg,
            type: "info",
          });
        }
      });
    },
    getList() {
      listItem({
        page: this.page,
        pageSize: 10,
        campId: this.campId,
      }).then((res) => {
        this.list = res.data;
        this.loading = false;
      });
    },
    //c查询学生
    searchStudent(row) {
      searchStudent(this.searchForm).then((res) => {
        this.searchVisible = true;
        this.searchList = res.data;
      });
    },
    btn_searchStuDaily(row) {
      studentDaily({
        studentId: row.userId,
      }).then((res) => {
        this.searchStuListVisible = true;
        this.searchStuDailyList = res.data;
      });
    },
    //学生的数据找回
    dataRevert(row) {
      dataRevert({
        studentId: row.studentId,
        day: row.day,
        campId: row.campId,
      }).then((res) => {
        row.userId = row.studentId;
        this.btn_searchStuDaily(row);
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
        name: "",
        icon: "",
        leaderName: "",
        leaderPhoneNumber: "",
        campId: this.campId,
      };
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.form = Object.assign({}, row);
    },
    btn_editStu(row) {
      this.stuVisible = true;
      this.stuForm = Object.assign({}, row);
      this.stuForm.campId = this.campId;
    },
    submitStuForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateStuItem(this.stuForm).then((response) => {
            this.stuForm.id = this.stuForm.schoolId;
            this.btn_view(this.stuForm);
            this.$notify({
              type: "success",
              message: "成功修改" + this.stuForm.userName,
            });
            this.stuVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    btn_delete(id) {
      this.$confirm("此操作将永久删除学校, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteItem({
            schoolId: id,
            campId: this.campId,
          }).then((response) => {
            this.getList();
            this.$notify({
              type: "success",
              message: "成功删除所选学校!",
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
    btn_import() {
      this.schoolId = row.id;
    },
    btn_view(row) {
      this.DetailVisible = true;
      studentListItem({
        schoolId: row.id,
        campId: this.campId,
      }).then((res) => {
        this.detailList = res.data;
      });
    },
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.icon = res.data.url;
          this.form.md5 = res.data.md5;
        }
      });
    },
    requestlistExcelFile(param) {
      let form = new FormData();
      form.append("schoolId", this.schoolId);
      form.append("campId", this.campId);
      form.append("file", param.file);
      importStudent(form).then((res) => {
        if (res.code == 0) {
          this.getList();
          this.$notify({
            type: "success",
            message: "学生导入成功!",
          });
        } else {
          this.$notify({
            message: res.msg,
            type: "info",
          });
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
  height: 80px;
  display: block;
}
</style>
