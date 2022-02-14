<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加组织</el-button>
      <el-upload ref='upload' action="" :http-request="submitSchool" :show-file-list="false" class="avatar-uploader">
        <el-button type="primary" size="mini">导入组织信息</el-button>
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
        <el-form-item label="人员名">
          <el-input v-model="searchForm.name" placeholder="人员名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="mini" @click="searchStudent">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="name" label="组织名称">
      </el-table-column>
      <el-table-column align="center" prop="icon" label="组织logo">
        <template scope="scope">
          <el-image style="width: 60px; height: 60px;" :src=" scope.row.icon" fit="fit">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="leaderName" label="领队"></el-table-column>
      <el-table-column align="center" prop="leaderPhoneNumber" label="领队号码"></el-table-column>
      <el-table-column align="center" prop="schoolAddress" label="地址"></el-table-column>
      <el-table-column align="center" prop="popularity" label="人气值"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button @click="btn_view(scope.row)" type="text" size="mini">查看人员
          </el-button>
          <el-button @click="form=scope.row;dialogTitle='编辑';dialogVisible=true;" type="text" size="mini">编辑
          </el-button>
          <el-upload ref='upload' action="" accept=".xls, .xlsx" :http-request="requestlistExcelFile" style="display: inline-block;margin:0 10px;" :show-file-list="false">
            <el-button type="text" style="color:#67C23A;" size="mini" @click="schoolId=scope.row.id">导入人员
            </el-button>
          </el-upload>
          <el-button @click="getGroupList(scope.row)" type="text" size="mini">查看分组
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'组织'" :visible.sync="dialogVisible" width="50%" append-to-body>
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="组织名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="校徽" prop="icon">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.icon" :src="form.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="领队名字" prop="leaderName">
          <el-input v-model="form.leaderName"></el-input>
        </el-form-item>
        <el-form-item label="领队号码" prop="leaderPhoneNumber">
          <el-input v-model="form.leaderPhoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="schoolAddress">
          <el-input v-model="form.schoolAddress"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title='"人员详情("+detailList.length+"人)"' :visible.sync="DetailVisible" width="70%" append-to-body>
      <el-button type="primary" size="mini" @click.native="btn_addStu">新增人员
      </el-button>
      <el-table :data="detailList" highlight-current-row style="width: 100%;">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="studentCardId" label="学号"></el-table-column>
        <!-- <el-table-column prop="headPic" label="头像">
          <template scope="scope">
            <el-image style="width: 100px; height: 100px" :src=" scope.row.headPic" fit="fit">
            </el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>

        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="competitorFlag" label="是否参与比赛排名"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template scope="scope">
            <el-button @click="btn_editStu(scope.row)" type="text" size="mini">编辑人员
            </el-button>
            <el-button @click="btn_deleteTestData(scope.row)" type="text" v-if="dev=='test'" size="mini" style="color:#f78989;">删除测试环境的数据
            </el-button>
            <el-popover placement="right" width="500" trigger="click">
              <el-table :data="competitionList">
                <el-table-column property="competitionId" label="ID"></el-table-column>
                <el-table-column property="name" label="比赛名"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template scope="scope2">
                    <el-button @click="btn_searchStuDaily(scope2.row.competitionId)" type="text" size="mini">该比赛数据详情
                    </el-button>
                    <el-button @click="btn_statistics(scope2.row)" type="text" style="color:red" size="mini">重新统计该比赛数据
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference" @click="studentId=scope.row.userId;getCompetitionList()" style="color:#67C23A;" type="text" size="mini">人员的数据详情
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="DetailVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

    <!-- 查询的列表结果 -->
    <el-dialog title='人员详情' :visible.sync="searchVisible" width="70%" append-to-body>
      <el-table :data="searchList" highlight-current-row style="width: 100%;">
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="schoolName" label="组织"></el-table-column>
        <el-table-column prop="totalCount" label="总个数"></el-table-column>
        <el-table-column prop="totalTime" label="总时长（秒）">
          <template scope="scope">
            {{scope.row.totalTime/1000}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template scope="scope">
            <el-popover placement="right" width="400" trigger="click">
              <el-table :data="competitionList">
                <el-table-column property="competitionId" label="ID"></el-table-column>
                <el-table-column property="name" label="比赛名"></el-table-column>
                <el-table-column align="center" label="操作">
                  <template scope="scope2">
                    <el-button @click="btn_searchStuDaily(scope2.row.competitionId)" type="text" size="mini">该比赛数据详情
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference" @click="studentId=scope.row.userId;getCompetitionList()" type="text" size="mini">人员的数据详情
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="searchVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title='人员跳绳数据详情' :visible.sync="searchStuListVisible" width="70%" append-to-body>

      <el-button type="primary" size="mini" @click="btn_add_loseData">添加丢失数据</el-button>

      <el-table :data="searchStuDailyList" highlight-current-row style="width: 100%;">
        <el-table-column label="上传日期">
          <template scope="scope">
            {{scope.row.dateTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="day" label="数据日期">
          <template scope="scope">
            {{scope.row.timestamp | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="数据ID"></el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="number" label="总个数" sortable></el-table-column>
        <el-table-column prop="avgNumber" label="平均数" sortable>
        </el-table-column>
        <el-table-column prop="roundTimes" label="跳绳的次数" sortable></el-table-column>
        <el-table-column prop="isChild" label="isChild"></el-table-column>
        <el-table-column prop="isStoryOk" label="isStoryOk"></el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template scope="scope">
            <el-button @click="deleteSkipData(scope.row)" type="text" style="color:red;" size="mini">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="searchStuListVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title='人员详情编辑' :visible.sync="stuVisible" width="70%" append-to-body>
      <el-form :model="stuForm" label-width="100px" :rules="rules" ref="stuForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="stuForm.name"></el-input>
        </el-form-item>
        <div>修改手机号后需要点击下方的‘修改手机号’按钮</div>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="stuForm.phoneNumber" maxLength=11></el-input>
        </el-form-item>
        <el-form-item label="学生号">
          <el-input v-model="stuForm.studentCardId"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="stuForm.grade" placeholder="1年级"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="stuForm.sex">
            <el-radio class="radio" label="boy">男</el-radio>
            <el-radio class="radio" label="girl">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否代表学校排名">
          <el-radio-group v-model="stuForm.competitorFlag">
            <el-radio class="radio" :label="0">不代表</el-radio>
            <el-radio class="radio" :label="1">代表</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stuVisible = false">取消
        </el-button>
        <el-button type="primary" size="mini" @click="submitStuForm('stuForm')">确 定</el-button>
        <el-button type="primary" size="mini" v-if="stuflag=='edit'" @click="updatePhoneNumber('stuForm')">修改手机号码</el-button>
      </div>
    </el-dialog>

    <el-dialog title='组别列表' :visible.sync="groupVisible" width="70%" append-to-body>
      <el-table :data="groupList" highlight-current-row style="width: 100%;">
        <el-table-column prop="name" label="比赛组名"></el-table-column>
        <el-table-column prop="id" label="比赛ID"></el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-button @click="getGroupDetail(scope.row)" type="text" size="mini">查看分组数据
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="groupVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title='组别详情' :visible.sync="groupDetailVisible" width="70%" append-to-body>
      <el-table :data="groupListDetail" highlight-current-row style="width: 100%;">
        <el-table-column prop="rank" label="排名"></el-table-column>
        <el-table-column prop="userId" label="userId"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>

        <el-table-column prop="sportDay" label="运动天数">
          <template scope="scope">
            {{scope.row.sportDay ||scope.row.frequency}}
          </template>
        </el-table-column>
        <el-table-column prop="bestDailyValue" label="今日最佳">
          <template scope="scope">
            {{scope.row.bestDailyValue ||scope.row.bestDailyCount}}
          </template>
        </el-table-column>
        <el-table-column prop="bestValue" label="最佳">
          <template scope="scope">
            {{scope.row.bestValue ||scope.row.bestTotalCount}}
          </template>
        </el-table-column>

      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="groupDetailVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title='添加丢失的数据' :visible.sync="addLoseDataVisible" width="70%" append-to-body>
      <el-form :model="loseDataForm" label-width="100px" :rules="rules" ref="stuForm">
        <el-form-item label="组织ID">
          <el-input v-model="loseDataForm.campId"></el-input>
        </el-form-item>
        <el-form-item label="比赛ID">
          <el-input v-model="loseDataForm.competitionId"></el-input>
        </el-form-item>
        <el-form-item label="userId">
          <el-input v-model="loseDataForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="跳绳个数">
          <el-input v-model="loseDataForm.number"></el-input>
        </el-form-item>
        <el-form-item label="跳绳平均数">
          <el-input v-model="loseDataForm.avgNumber"></el-input>
        </el-form-item>
        <el-form-item label="跳绳次数">
          <el-input v-model="loseDataForm.roundTimes"></el-input>
        </el-form-item>
        <el-form-item label="isChild">
          <el-input v-model="loseDataForm.isChild"></el-input>
        </el-form-item>
        <el-form-item label="数据日期">
          <el-date-picker v-model="loseDataForm.timestamp" type="datetime" value-format="timestamp" placeholder="选择有效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上传日期">
          <el-date-picker v-model="loseDataForm.dateTime" type="datetime" value-format="timestamp" placeholder="选择有效时间">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitLoseData('loseDataForm')">确 定</el-button>
        <el-button size="mini" @click="addLoseDataVisible=false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  registerSchool,
  listItem,
  addItem,
  updateItem,
  importStudent,
  deleteItem,
  studentListItem,
  updateStuItem,
  insertStuItem,
  searchStudent,
  studentDaily,
  dataRevert,
  deleteTestData,
  statistics,
  groupList,
  singleRankData,
  twinRankData,
  goDeleteSkipData,
  goUpdatePhoneNumber,
  insertLoseData,
} from "@/api/competitionActivity/jingan/jingan_school";

import { queryByUserIdAndCampId as competitionListApi } from "@/api/competitionActivity/jingan/jingan_competition";
import { checkPermission } from "@/api/checkPermission";
import { fileUpload } from "@/utils/fileUpload";
import { formatDate } from "@/utils/date";

export default {
  props: {
    campId: String,
  },
  watch: {
    campId(oldValue, newValue) {
      this.campId = this.campId;
      this.getList();
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
  computed: {
    checkPer() {
      return function (btn) {
        return checkPermission(this.$route.path + "/" + btn);
      };
    },
  },
  data() {
    return {
      studentId: "",
      competitionId: "",

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
      loseDataForm: {},
      addLoseDataVisible: false,

      competitionList: [],
      dev: "",
      groupList: [],
      groupVisible: false,
      groupDetailVisible: false,
      stuflag: "",
    };
  },
  mounted() {
    this.dev = process.env.VUE_APP_INTERFACEADDRESS;
    this.getList();
  },
  methods: {
    getCompetitionList() {
      competitionListApi({
        campId: this.campId,
        studentId: this.studentId,
      }).then((res) => {
        this.competitionList = res.data;
      });
    },
    submitSchool(param) {
      var fileForm = new FormData();
      fileForm.append("campId", this.campId);
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
      searchStudent({
        campId: this.campId,
        ...this.searchForm,
      }).then((res) => {
        this.searchVisible = true;
        this.searchList = res.data;
      });
    },
    btn_searchStuDaily(competitionId) {
      this.competitionId = competitionId;
      studentDaily({
        competitionId: competitionId,
        studentId: this.studentId,
        campId: this.campId,
      }).then((res) => {
        this.searchStuListVisible = true;
        this.searchStuDailyList = res.data;
      });
    },
    btn_add_loseData() {
      this.loseDataForm = {
        userId: this.studentId,
        number: "",
        avgNumber: "",
        timestamp: "",
        competitionId: this.competitionId,
        roundTimes: "",
        dateTime: "",
        isChild: "",
        campId: this.campId,
      };
      this.addLoseDataVisible = true;
    },

    btn_statistics(row) {
      statistics({
        competitionId: row.competitionId,
        studentId: this.studentId,
        campId: this.campId,
      }).then((res) => {
        this.$notify({
          type: "success",
          message: "重新统计",
        });
      });
    },
    //学生的数据找回
    dataRevert(row) {
      dataRevert({
        studentId: row.studentId,
        day: row.day,
        campId: this.campId,
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
      this.stuflag = "edit";
      this.stuForm = Object.assign({}, row);
      this.stuForm.campId = this.campId;
    },
    btn_addStu(row) {
      this.stuVisible = true;
      this.stuflag = "add";
      this.stuForm = {
        campId: this.campId,
        name: "",
        phoneNumber: "",
        schoolId: this.schoolId,
        sex: "",
      };
    },
    submitStuForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.stuflag == "edit") {
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
            if (this.stuForm.sex == "boy") {
              this.stuForm.sex = "男";
            } else {
              this.stuForm.sex = "女";
            }
            insertStuItem(this.stuForm).then((response) => {
              this.stuForm.id = this.stuForm.schoolId;
              this.btn_view(this.stuForm);
              this.$notify({
                type: "success",
                message: "成功新增",
              });
              this.stuVisible = false;
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updatePhoneNumber() {
      goUpdatePhoneNumber({
        phoneNumber: this.stuForm.phoneNumber,
        target: this.stuForm.userId,
        campId: this.campId,
      }).then((response) => {
        this.stuForm.id = this.stuForm.schoolId;
        this.btn_view(this.stuForm);
        this.$notify({
          type: "success",
          message: "成功修改",
        });
        this.stuVisible = false;
      });
    },
    submitLoseData() {
      insertLoseData(this.loseDataForm).then((response) => {
        this.$notify({
          type: "success",
          message: "成功新增",
        });
        this.btn_searchStuDaily(this.loseDataForm.competitionId);
        this.addLoseDataVisible = false;
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
    btn_view(row) {
      this.schoolId = row.id;
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
      form.append("multipartFile", param.file);
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
    btn_deleteTestData(item) {
      deleteTestData({
        schoolId: this.schoolId,
        campId: this.campId,
        deleteUid: item.userId,
      }).then((res) => {
        this.$notify({
          type: "success",
          message: "成功所选学生数据!",
        });
      });
    },

    //获取分组详情
    getGroupList(row) {
      groupList({
        campId: this.campId,
        schoolId: row.id,
        uderId: 10000,
      }).then((res) => {
        this.groupList = res.data;
        this.groupVisible = true;
      });
    },

    getGroupDetail(row) {
      if (row.mode_value == 60) {
        singleRankData({
          openId: 10000,
          campId: this.campId,
          competitionId: row.id,
        }).then((res) => {
          this.groupListDetail = res.data;
          this.groupDetailVisible = true;
        });
      } else {
        twinRankData({
          openId: 10000,
          campId: this.campId,
          competitionId: row.id,
        }).then((res) => {
          this.groupListDetail = res.data;
          this.groupDetailVisible = true;
        });
      }
    },
    deleteSkipData(row) {
      goDeleteSkipData({
        skippingDateId: row.id,
      }).then((res) => {
        this.searchStuListVisible = false;
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
