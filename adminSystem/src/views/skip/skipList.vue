<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="设备类型：">
          <el-select v-model="deviceType" @change='getList'>
            <el-option label="跳绳" value="skipping"></el-option>
            <el-option label="腕力球" value="wristball"></el-option>
            <el-option label="健腹轮" value="wheel"></el-option>
            <el-option label="手表" value="watch"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="发起人">
          <el-input v-model="searchForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="比赛状态：">
          <el-select v-model="searchForm.competitionState" placeholder="全部" clearable>
            <el-option v-for="item in matchStatuesList" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛模式：">
          <el-select v-model="searchForm.mode" placeholder="全部" clearable>
            <el-option v-for="item in matchModelList" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛类型：">
          <el-select v-model="searchForm.type" placeholder="全部" clearable>
            <el-option v-for="item in matchTypeList" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="page=1;getList();">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add" v-if="checkPer('add')">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65">
        <template slot-scope="scope">
          <svg-icon icon-class="skip_official" v-if="scope.row.isOfficial" />
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="发起人">
      </el-table-column>
      <el-table-column align="center" prop="name" label="赛事名称">
      </el-table-column>
      <el-table-column align="center" prop="dname" label="赛事状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter" size="mini">
            {{ scope.row.status==0?"正在进行":scope.row.status==1?"即将开始":"已经结束" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="mode" align="center" label="模式">
        <template scope="scope">
          {{scope.row.mode == 2?"倒计时":scope.row.mode == 3?"倒计数":""}}
        </template>
      </el-table-column>

      <el-table-column prop="type" align="center" label="类型">
        <template scope="scope">
          {{scope.row.type == 'team'?"团队赛":scope.row.type == 'multiTeam'?"多团队赛":scope.row.type == 'personal'?"个人赛":""}}
        </template>
      </el-table-column>

      <el-table-column prop="registerCount" align="center" label="报名人数">
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')&&scope.row.isOfficial">编辑
          </el-button>
          <el-button @click=" btn_view(scope.row)" type="text" style="color:#67C23A;" size="mini" v-if="checkPer('view')">查看赛况
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini" v-if="checkPer('delete')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>

    <el-dialog :title="dialogTitle+'比赛'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="比赛名称" prop="name">
          <el-input v-model="form.name" maxlength="16" show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="比赛模式：">
          <el-select v-model="form.mode" :disabled="dialogTitle=='编辑'" clearable>
            <el-option v-for="item in matchModelList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          <el-select v-if="form.mode==2" :disabled="dialogTitle=='编辑'" v-model="form.modeValue" clearable filterable>
            <el-option v-for="item in limitNumList_counttime" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          <el-input-number v-if="form.mode==3" :disabled="dialogTitle=='编辑'" v-model="form.modeValue" controls-position="right" :min="50" :max="9999"></el-input-number>
        </el-form-item>

        <el-form-item label="比赛次数：">
          <el-select v-model="form.matchTimesType" clearable :disabled="dialogTitle=='编辑'" @change='selectMatchTimesChange'>
            <el-option v-for="item in matchTimesList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-select filterable v-show="form.repeatTimes!= -1" :disabled="dialogTitle=='编辑'" v-model="form.repeatTimes" clearable>
            <el-option v-for="item in matchTimesNumList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="比赛类型：">
          <el-select v-model="form.type" :disabled="dialogTitle=='编辑'" clearable @change='selectMatchTypeChange'>
            <el-option v-for="item in matchTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-select v-show="form.type=='team'" :disabled="dialogTitle=='编辑'" v-model="form.teamPersonLimit" clearable filterable>
            <el-option v-for="item in limitNumList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="团队数：" v-if="form.type=='multiTeam'" prop="teamNum">
          <el-input-number v-model="form.teamNum" controls-position="right" @change="handleChange" :min="2" :max="52"></el-input-number>
        </el-form-item>
        <!-- 团队数，上线 52  2-52-->
        <el-form-item label="团队人数：" v-if="form.type=='multiTeam'" prop="teamPersonLimit">
          <el-input-number v-model="form.teamPersonLimit" controls-position="right" @change="handleChange" :min="5" :max="50"></el-input-number>
        </el-form-item>
        <!-- 人数，5 — 50 -->

        <el-form-item label="比赛邀请码：">
          <el-select v-model="form.isVerify" clearable @change='selectMatchNatureChange'>
            <el-option v-for="item in matchNatureList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-input style="width:30%;" v-model.trim="form.invitationCode" v-if="form.isVerify==1"></el-input>
        </el-form-item>

        <el-form-item label="比赛时间：">
          <el-date-picker v-model="timeRange" type="datetimerange" start-placeholder="开始时间" @change="datetimerangeChange" end-placeholder="结束时间" value-format="timestamp">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="比赛图片：" prop="picUrl">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="比赛奖励：" prop="gameReward">
          <el-input v-model="form.gameReward" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="比赛规则：" prop="rule">
          <el-input v-model="form.rule" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="赛况详情" :visible.sync="joinVisible" width="70%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="比赛名称" prop="name">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>

        <el-form-item label="比赛模式：">
          <el-select v-model="form.mode" disabled>
            <el-option v-for="item in matchModelList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          <el-select v-if="form.mode==2" disabled v-model="form.modeValue" filterable>
            <el-option v-for="item in limitNumList_counttime" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          <el-input-number v-if="form.mode==3" disabled v-model="form.modeValue" controls-position="right" :min="50" :max="999"></el-input-number>
        </el-form-item>

        <el-form-item label="比赛次数：">
          <el-select v-model="form.matchTimesType" disabled @change='selectMatchTimesChange'>
            <el-option v-for="item in matchTimesList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-select filterable v-show="form.repeatTimes!= -1" disabled v-model="form.repeatTimes">
            <el-option v-for="item in matchTimesNumList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="比赛类型：">
          <el-select v-model="form.type" disabled @change='selectMatchTypeChange'>
            <el-option v-for="item in matchTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-select v-show="form.type=='team'" disabled v-model="form.teamPersonLimit">
            <el-option v-for="item in limitNumList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="团队数：" v-if="form.type=='multiTeam'" prop="teamNum">
          <el-input-number v-model="form.teamNum" controls-position="right" @change="handleChange" :min="2" disabled :max="52"></el-input-number>
        </el-form-item>
        <!-- 团队数，上线 52  2-52-->
        <el-form-item label="团队人数：" v-if="form.type=='multiTeam'" prop="teamPersonLimit">
          <el-input-number v-model="form.teamPersonLimit" controls-position="right" @change="handleChange" disabled :min="5" :max="50"></el-input-number>
        </el-form-item>
        <!-- 人数，5 — 50 -->

        <el-form-item label="比赛邀请码：">
          <el-select v-model="form.isVerify" disabled>
            <el-option v-for="item in matchNatureList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-input style="width:30%;" v-model.trim="form.invitationCode" disabled v-if="form.isVerify==1"></el-input>
        </el-form-item>

        <el-form-item label="比赛时间：">
          <el-date-picker v-model="timeRange" type="datetimerange" start-placeholder="开始时间" disabled @change="datetimerangeChange" end-placeholder="结束时间" value-format="timestamp">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="比赛图片：" prop="picUrl">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" disabled class="avatar-uploader">
            <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="比赛奖励：" prop="gameReward">
          <el-input v-model="form.gameReward" type="textarea" disabled></el-input>
        </el-form-item>

        <el-form-item label="比赛规则：" prop="rule">
          <el-input v-model="form.rule" type="textarea" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">
        <svg-icon icon-class="salesDept_date" /> 参与用户
      </el-divider>
      <div class="container-search">
        <el-form :inline="true" :model="joinSearchForm">
          <el-form-item label="报名人ID：">
            <el-input v-model.trim="joinSearchForm.competitorId" placeholder="请输入报名人ID/账号" clearable></el-input>
          </el-form-item>
          <el-form-item label="报名人昵称：">
            <el-input v-model.trim="joinSearchForm.nickName" placeholder="请输入报名人昵称" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="排名：">
                        <el-input v-model.number="joinSearchForm.rank"
                                placeholder="请输入比赛排名"
                                clearable></el-input>
                    </el-form-item> -->
          <el-form-item>
            <el-button type="success" @click="page2=1;getJoinList();">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="joinList" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="userId" label="userId">
        </el-table-column>
        <el-table-column align="center" prop="nickName" label="昵称">
        </el-table-column>
        <el-table-column align="center" prop="registerTime" label="报名时间">
        </el-table-column>
        <el-table-column align="center" prop="repeatNumber" label="运动次数">
        </el-table-column>
        <el-table-column align="center" prop="rank" label="排名">
        </el-table-column>
        <!-- <el-table-column  label="跳绳时间">
                    <template scope="scope">
                        <p v-for="(item,index) in scope.row.detail" :key='index'>{{item.startTime}} — {{item.endTime}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column  label="成绩">
                    <template scope="scope">
                        <p v-for="(item,index) in scope.row.detail" :key='index'>{{item.score}}</p>
                    </template>
                </el-table-column> -->
      </el-table>
      <pagination :pageTotal="total2" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
      </pagination>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="joinVisible = false">取 消</el-button>
      </span>

    </el-dialog>

  </div>

</template>
<script>
import Pagination from "@/components/pagination";
import {
  listItem,
  addItem,
  updateItem,
  deleteItem,
  detailItem,
  joinItem,
} from "@/api/skip/skip";
import { checkPermission } from "@/api/checkPermission";
import { fileUpload } from "@/utils/fileUpload";

export default {
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "gray",
        2: "danger",
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
      matchModelList: [
        { name: "倒计时", value: 2 },
        { name: "倒计数", value: 3 },
      ],
      matchStatuesList: [
        { name: "即将开始", value: "TODO" },
        { name: "正在进行", value: "DOING" },
        { name: "已经结束", value: "DONE" },
      ],
      matchTypeList: [
        { name: "个人赛", value: "personal" },
        { name: "团队赛", value: "team" },
        { name: "多团队赛", value: "multiTeam" },
      ],
      matchModelNumList: [],
      limitNumList_counttime: [],

      // 比赛次数
      matchTimesList: [
        { name: "不限次数", value: -1 },
        { name: "指定次数", value: 2 },
      ],
      matchTimesNumList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

      // 比赛性质:是否需要邀请码
      matchNatureList: [
        { name: "公开赛", value: 0 },
        { name: "私人赛", value: 1 },
      ],
      deviceType: "skipping",
      searchForm: {},
      list: [],
      loading: true,
      page: 1,
      limit: 10,
      total: 0,
      multipleSelection: [],
      dialogVisible: false,
      dialogTitle: "新增",
      form: {
        userId: 1,
      },
      timeRange: "",
      rules: {
        name: [
          { required: true, message: "请输入比赛名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      joinList: [],
      joinVisible: false,
      page2: 1,
      limit2: 10,
      total2: 20,
      joinSearchForm: {},
    };
  },
  created() {
    this.getList();
    this.initSelectData();
  },
  methods: {
    getList() {
      this.loading = true;
      var data = Object.assign(
        {
          pageNumber: this.page - 1,
          pageSize: this.limit,
        },
        this.searchForm
      );
      listItem(data, this.deviceType).then((response) => {
        if (response.code != 0) return;
        this.list = response.data.content;
        this.list = this.list.map((item) => {
          if (item.startTime > new Date().getTime()) {
            item.status = 1;
          } else if (item.endTime < new Date().getTime()) {
            item.status = 2;
          } else {
            item.status = 0;
          }
          return item;
        });
        this.loading = false;
        this.total = response.data.total;
      });
    },

    // 上下分页
    handleCurrentChange(val) {
      if (this.joinVisible) {
        this.page2 = val;
        this.getJoinList();
        return;
      }
      this.page = val;
      this.getList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      if (this.joinVisible) {
        this.page2 = val;
        this.getJoinList();
        return;
      }
      this.limit = val;
      this.getList();
    },
    //添加
    btn_add() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      this.form = {
        userId: 1,
        endTime: "",
        gameReward: null,
        invitationCode: null,
        isOfficial: 1,
        isVerify: null,
        mode: "",
        modeValue: "",
        name: "",
        nickName: "官方",
        picUrl: "",
        promoterId: "10000000",
        repeatTimes: "",
        rule: "",
        startTime: "",
        teamNum: "",
        teamPersonLimit: "",
        type: "",
      };
      this.timeRange = "";
    },
    btn_view(row) {
      this.joinVisible = true;
      this.joinSearchForm.competitionId = row.id;
      detailItem(
        {
          id: row.id,
        },
        this.deviceType
      ).then((res) => {
        this.form = Object.assign({}, res.data[1]);
        this.form.matchTimesType = row.repeatTimes == -1 ? -1 : 2;
        this.form.isVerify = row.isVerify ? 1 : 0;
        this.timeRange = [row.startTime, row.endTime];
      });
      this.getJoinList();
    },
    getJoinList() {
      var data = Object.assign(
        {
          page: this.page2 - 1,
          pageSize: this.limit2,
        },
        this.joinSearchForm
      );
      joinItem(data, this.deviceType).then((res) => {
        this.joinList = res.data.content;
        this.total2 = res.data.total;
      });
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      detailItem(
        {
          id: row.id,
        },
        this.deviceType
      ).then((res) => {
        this.form = Object.assign({}, res.data[1]);
        this.form.matchTimesType = row.repeatTimes == -1 ? -1 : 2;
        this.form.isVerify = row.isVerify ? 1 : 0;
        this.timeRange = [row.startTime, row.endTime];
      });
    },
    btn_delete(id) {
      this.$confirm("此操作将永久删除比赛, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteItem(
            {
              id: id,
            },
            this.deviceType
          ).then((response) => {
            this.getList();
            this.$notify({
              type: "success",
              message: "成功删除所选比赛!",
            });
          });
        })
        .catch(() => {
          this.$notify({
            message: "已取消删除比赛操作",
            type: "info",
          });
        });
    },
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          if (this.dialogTitle == "新增") {
            addItem(this.form, this.deviceType).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功新增" + this.form.name + "比赛!",
              });
            });
          } else {
            this.form.userId = 1;
            updateItem(this.form, this.deviceType).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功编辑" + this.form.name + "比赛!",
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单验证
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    initSelectData() {
      this.limitNumList_counttime = [{ name: "30秒", value: 30 }];
      for (let i = 1; i <= 60; i++) {
        this.limitNumList_counttime.push({ name: i + "分", value: i * 60 });
      }

      // 选择团队赛时，呼出人数下拉框，页面默认不限（人数可选不限、2、3、4...48、49、50）；

      this.limitNumList = [{ name: "不限", value: -1 }];
      for (let i = 2; i <= 50; i++) {
        this.limitNumList.push({ name: i, value: i });
      }
    },
    // 比赛类型的change事件
    selectMatchTypeChange(value) {
      if (value == "team") {
        this.limitNumList = [{ name: "不限", value: -1 }];
        for (let i = 2; i <= 50; i++) {
          this.limitNumList.push({ name: i, value: i });
        }
        this.form.teamPersonLimit = -1;
        this.form.teamNum = 0;
      } else if (value == "multiTeam") {
        this.form.teamPersonLimit = 10;
        this.form.teamNum = 10;
      } else {
        this.form.teamPersonLimit = -1;
        this.form.teamNum = 0;
      }
    },
    //比赛次数的chang事件
    selectMatchTimesChange(value) {
      if (value == 2) {
        this.form.repeatTimes = 3;
      }
      if (value == -1) {
        this.form.repeatTimes = -1;
      }
    },
    // 比赛邀请码的change 事件
    selectMatchNatureChange(value) {
      if (value == 1) {
        this.form.invitationCode = Math.random().toString(36).substr(2, 4);
      }
    },
    //比赛时间的change事件
    datetimerangeChange(value) {
      this.form.startTime = value[0];
      this.form.endTime = value[1];
    },
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.picUrl = res.data.url;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  text-align: left;
  margin-top: 10px;
}
</style>
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>