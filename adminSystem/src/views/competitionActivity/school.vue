<template>
  <div class="app-container">
    <div class="container-edit">
      <el-upload ref='upload' action="" :http-request="submitSchool" :show-file-list="false" class="avatar-uploader">
        <el-button type="primary" size="mini">导入学校信息</el-button>
      </el-upload>
    </div>
    <el-table v-loading="loading" :data="school_list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="name" label="校名">
      </el-table-column>
      <el-table-column align="center" prop="province" label="省">
      </el-table-column>
      <el-table-column align="center" prop="city" label="市">
      </el-table-column>
      <el-table-column align="center" prop="county" label="区">
      </el-table-column>
      <el-table-column align="center" prop="liaison" label="联系人">
      </el-table-column>
      <el-table-column align="center" prop="liaisonPosition" label="职位">
      </el-table-column>
      <el-table-column align="center" prop="liaisonPhone" label="联系手机号">
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="注册时间">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button @click="btn_teacher(scope.row)" type="text" size="mini">教师相关
          </el-button>
          <el-button @click="btn_student(scope.row)" type="text" size="mini">学生相关
          </el-button>
          <!-- <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini">删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="教师管理" :visible.sync="teacherVisible" width="50%">
      <div class="container-edit">
        <el-upload ref='upload' action="" :http-request="submitTeacher" :show-file-list="false" class="avatar-uploader">
          <el-button type="primary" size="mini">导入老师信息</el-button>
        </el-upload>
      </div>
      <el-table :data="teacher_list" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
        <el-table-column align="center" prop="userId" label="userId">
        </el-table-column>
        <el-table-column align="center" prop="name" label="名字">
        </el-table-column>
        <el-table-column align="center" prop="identityId" label="身份证">
        </el-table-column>
        <el-table-column align="center" prop="phoneNumber" label="手机号">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="注册时间">
        </el-table-column>
      </el-table>

    </el-dialog>

    <el-dialog title="学生管理" :visible.sync="studentVisible" width="50%">
      <el-table :data="student_list" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="studentId" label="ID" width="65"></el-table-column>
        <el-table-column align="center" prop="userId" label="userId">
        </el-table-column>
        <el-table-column align="center" prop="studentCardId" label="学号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="名字">
        </el-table-column>
        <el-table-column align="center" prop="sex" label="性别">
        </el-table-column>
        <el-table-column align="center" prop="grade" label="年级">
        </el-table-column>
        <el-table-column align="center" prop="identityId" label="身份证">
        </el-table-column>
        <el-table-column align="center" prop="phoneNumber" label="手机号">
        </el-table-column>
        <el-table-column align="center" prop="competitionId" label="赛事ID">
        </el-table-column>
        <el-table-column align="center" prop="competitionName" label="赛事名">
        </el-table-column>

        <el-table-column align="center" prop="createTime" label="注册时间">
        </el-table-column>
      </el-table>

    </el-dialog>

  </div>
</template>

<script>
import {
  schoolList,
  teacherList,
  studentList,
  registerSchool,
  registerTeacher,
} from "@/api/competitionActivity";

export default {
  data() {
    return {
      school_list: [],
      loading: false,

      teacher_list: [],
      student_list: [],

      teacherVisible: false,
      teacherForm: {},

      studentVisible: false,
      studentForm: {},
    };
  },
  mounted() {
    this.getSchoolList();
  },
  methods: {
    getSchoolList() {
      schoolList({}).then((res) => {
        this.school_list = res.data;
        this.loading = false;
      });
    },
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
    //教师管理
    btn_teacher(row) {
      this.schoolForm = row;
      this.getTeacherList();
      this.teacherVisible = true;
    },
    getTeacherList() {
      teacherList({
        schoolId: this.schoolForm.id,
      }).then((res) => {
        this.teacher_list = res.data;
      });
    },
    submitTeacher(param) {
      var fileForm = new FormData();
      fileForm.append("multipartFile", param.file);
      fileForm.append("schoolId", this.schoolForm.id);
      registerTeacher(fileForm).then((res) => {
        if (res.code == 0) {
          this.getTeacherList();
          this.$notify({
            type: "success",
            message: "老师导入成功!",
          });
        } else {
          this.$notify({
            message: res.msg,
            type: "info",
          });
        }
      });
    },
    //学生管理
    btn_student(row) {
      this.schoolForm = row;
      this.getStudentList();
      this.studentVisible = true;
    },
    getStudentList() {
      studentList({
        schoolId: this.schoolForm.id,
      }).then((res) => {
        this.student_list = res.data;
      });
    },
  },
};
</script>