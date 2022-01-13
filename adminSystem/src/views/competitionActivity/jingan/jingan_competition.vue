<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" style="margin-left:15px;" size="mini" @click='btn_add'>新增赛事</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="name" label="比赛名">
      </el-table-column>
      <el-table-column prop="mode" align="center" label="模式">
        <template scope="scope">
          {{scope.row.mode == 2?"倒计时":scope.row.mode == 3?"倒计数":""}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="modeValue" label="模式值">
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

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'比赛'" :visible.sync="dialogVisible" width="50%" append-to-body>
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">

        <el-form-item label="比赛名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="模式" prop="mode">
          <el-select v-model="form.mode" placeholder="请选择模式">
            <el-option label="自由跳" :value="1">
            </el-option>
            <el-option label="倒计时" :value="2">
            </el-option>
            <el-option label="倒计数" :value="3">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模式值">
          <el-input v-model="form.modeValue" placeholder="秒或个"> </el-input>
        </el-form-item>
        <el-form-item label="组别" prop="groupType">
          <el-select v-model="form.groupType" placeholder="请选择组别">
            <el-option label="不限" :value="0">
            </el-option>
            <el-option label="1-3年级" :value="1">
            </el-option>
            <el-option label="4-5年级" :value="2">
            </el-option>
            <el-option label="6-7年级" :value="3">
            </el-option>
            <el-option label="8-9年级" :value="4">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.genderMode">
            <el-radio class="radio" :label="0">女</el-radio>
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="2">男女不限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否需要Vlog">
          <el-radio-group v-model="form.isVlogMust">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="跳后是否有奖励">
          <el-radio-group v-model="form.isAward">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Bpm限制" prop="maxBpmLimit">
          <el-input v-model="form.maxBpmLimit"></el-input>
        </el-form-item>
        <el-form-item label="最大一轮跳绳次数" prop="maxRoundTimes">
          <el-input v-model="form.maxRoundTimes"></el-input>
        </el-form-item>
        <el-form-item label="logo" prop="logo">
          <el-input v-model="form.logo" style="margin-bottom:10px;"> </el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.deviceGroupBgUrl" :src="form.deviceGroupBgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="开始时间:" prop="startTime">
          <el-date-picker v-model.number="form.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" value-format="timestamp" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime">
          <el-date-picker v-model.number="form.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="奖励">
          <el-input v-model="form.gameReward" type="textarea" placeholder=""> </el-input>
        </el-form-item> -->
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
} from "@/api/competitionActivity/jingan/jingan_competition";
import { formatDate } from "@/utils/date";
import { fileUpload } from "@/utils/fileUpload";

export default {
  watch: {
    campId(oldValue, newValue) {
      this.campId = this.campId;
      this.getList();
    },
  },
  props: {
    campId: String,
  },
  filters: {
    formatDate(time) {
      time = time;
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  data() {
    return {
      list: [],
      rankList: {},
      loading: false,
      dialogVisible: false,
      form: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      listItem({
        campId: this.campId,
      }).then((res) => {
        this.list = res.data;
        this.loading = false;
      });
    },

    btn_add() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      this.form = {
        mode: 2,
        groupType: 0,
        genderMode: 2,
        isVlogMust: 0,
        isAward: 0,
      };
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.form = Object.assign({}, row);
    },
    //保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          if (this.dialogTitle == "新增") {
            addItem({
              campId: this.campId,
              ...this.form,
            }).then((response) => {
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
<style scoped>
.container-edit {
  display: flex;
}
</style>