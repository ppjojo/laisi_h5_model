<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="动作名称">
          <el-input v-model="searchForm.className" clearable placeholder="动作名称"></el-input>
        </el-form-item>
        <el-form-item label="关联课程">
          <el-input v-model="searchForm.bigClassName" clearable placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="时长">
          <el-input v-model.number="searchForm.duration" clearable placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加视频</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="smallClassDay" width="80" label="排序"></el-table-column>
      <el-table-column align="center" prop="id" width="80" label="ID"></el-table-column>
      <el-table-column align="center" prop="className" label="视频名称"></el-table-column>
      <el-table-column align="center" prop="pictureUrl" label="视频封面">
        <template scope="scope">
          <img :src="scope.row.classCover" style="width: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="视频类型">
        <template scope="scope">
          {{scope.row.actionSmallClass==1?'动作':'内容'}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="视频归属">
        <template scope="scope">
          {{scope.row.actionBelong==0?'训练':scope.row.actionBelong==1?'热身':'拉伸'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="bigClassName" label="关联课程">
      </el-table-column>
      <el-table-column align="center" label="时长">
        <template slot-scope="scope">
          {{scope.row.duration+'s'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <!-- <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">

      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="选择动作视频" prop="smartActionName">
          <el-select @change="choosesmartActionName" v-model="form.action" filterable placeholder="可查询">
            <el-option v-for="(item,index) in movieList" :key="index" :label="item.videoName" :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频地址" prop="classVod">
          <el-input v-model="form.classVod" @change="classVodChange"></el-input>
          <el-button size="small" type="primary" v-if="form.classVod" @click="goPlayer()">查看视频
          </el-button>
        </el-form-item>

        <el-form-item label="视频名称" prop="className">
          <el-input v-model="form.className"></el-input>
        </el-form-item>

        <el-form-item label="视频封面图" prop="classCover">
          <el-input v-model="form.classCover"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.classCover" :src="form.classCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="视频类型" prop="bigAttributeId">
          <el-radio-group v-model="form.actionSmallClass">
            <el-radio class="radio" :label="1">动作</el-radio>
            <el-radio class="radio" :label="0">内容</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="form.actionSmallClass==1" label="训练次数" prop="actionNum">
          <el-input v-model.number="form.actionNum"></el-input>
        </el-form-item>

        <el-form-item label="所属课程选择">
          <el-select v-if="dialogTitle=='新增'" v-model="form.bigClassId" placeholder="" filterable clearable>
            <el-option v-for="item in courseList" :key="item.bigClassId" :label="item.className" :value="item.bigClassId">
            </el-option>
          </el-select>
          <el-select v-else v-model="form.newBigClassIdByUpdate" placeholder="" filterable clearable>
            <el-option v-for="item in courseList" :key="item.bigClassId" :label="item.className" :value="item.bigClassId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="视频归属">
          <el-select v-model="form.actionBelong" placeholder="" clearable>
            <el-option :key="0" label="训练" :value="0"></el-option>
            <el-option :key="1" label="热身" :value="1"></el-option>
            <el-option :key="2" label="拉伸" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时长" prop="duration">
          <el-input v-model.number="form.duration"></el-input>
        </el-form-item>

        <el-form-item label="视频大小" prop="classSize">
          <el-input v-model.trim="form.classSize">
          </el-input>
        </el-form-item>

        <el-form-item label="休息时长" prop="stopDuration">
          <el-input v-model.trim="form.stopDuration">
          </el-input>
        </el-form-item>

        <el-form-item label="动作排序" prop="smallClassDay">
          <el-input v-model.trim="form.smallClassDay">
          </el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title='视频预览' :visible.sync="playShow" @close="closeDialog" width="50%">
      <div class="prism-player" id="J_prismPlayer"></div>
    </el-dialog>
  </div>
</template>

<script>
import {
  allAction,
  updateAction,
  addAction,
  allCourse,
} from "@/api/coursedisplay/coursedisplay";
import {
    getActionMovie
  } from '@/api/intelligent/intelligent'
import { getPlayAuth } from "@/api/videoCourse/course";
import { checkPermission } from "@/api/checkPermission";
import { formatDate } from "@/utils/date";
import { fileUpload } from "@/utils/fileUpload";
export default {
  filters: {
    formatDate(time) {
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
      list: [],
      loading: false,
      courseList: [],
      movieList:[],
      form: {},
      searchForm: {
        className: "",
        bigClassName:'',
        duration: null,
      },
      dialogTitle: "",
      dialogVisible: false,
      playShow: false,
      rules: {
        classCover: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur,change",
          },
        ],
        classVod: [
          {
            required: true,
            message: "请上传地址",
            trigger: "blur,change",
          },
        ],
        className: [
          {
            required: true,
            message: "请输入动作名称",
            trigger: "blur,change",
          },
        ],
        bigClassId: [
          {
            required: true,
            message: "请选择关联课程",
            trigger: "blur,change",
          },
        ],
        actionBelong: [
          {
            required: true,
            message: "请选择动作归属",
            trigger: "blur,change",
          },
        ],
        duration: [
          {
            required: true,
            message: "请填写时长",
            trigger: "blur,change",
          },
          {
            pattern: /^\+?[0-9]\d*$/,
            message: "请输入大于等于0的正整数",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getList();
    allCourse({}).then((res) => {
      this.courseList = res.data;
    });
    getActionMovie({cateId:1000344712}).then(res => {
      this.movieList = res.data;
    })
  },
  methods: {
    getList() {
      allAction(this.searchForm).then((res) => {
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
            addAction(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功新增",
              });
            });
          } else {
            updateAction(this.form).then((response) => {
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
        className: "",
        classCover: null,
        actionBelong: null, //图片url
        classVod: "",
        bigClassId: null,
        duration: null,
        smallClassDay: null,
        classPart: [],
        classLabel: [],
      };
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      row.newBigClassIdByUpdate = row.bigClassId;
      this.form = Object.assign({}, row);
      this.classVodChange(this.form.classVod)
    },
    requestFile(param) {
      //
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.classCover = res.data.url;
        }
      });
    },
    choosesmartActionName(index) { //下拉选择视频
      this.form.className = this.movieList[index].videoName;
      this.form.classSize = this.movieList[index].videoSize || 0;
      this.form.classCover = this.movieList[index].videoCover;
      this.form.classVod = this.movieList[index].videoId;
      this.form.duration = this.movieList[index].duration || 0;
    },
    requestFile2(param) {
      //
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.classVod = res.data.url;
        }
      });
    },
    //视频id添加进来需要去获取视频图片
    classVodChange(str) {
      getPlayAuth({
        videoId: str,
      })
        .then((res) => {
          if (res.code == 0) {
            this.$set(this.form, "classCover", res.data.videoMeta.coverURL);
            this.$set(
              this.form,
              "duration",
              Math.round(res.data.videoMeta.duration)
            );
            let n1 = res.data.videoMeta.title.split(".")[0];
            let n2 = n1.split("_")[0]
            this.$set(
              this.form,
              "className",
              n2
            );
            this.$set(this.form, "classSize", res.data.videoMeta.classSize);
          } else {
            this.$message({
              showClose: true,
              message: "视频ID不正确",
              type: "error",
            });
          }
        })
        .catch((e) => {
          this.$message({
            showClose: true,
            message: "视频ID不正确",
            type: "error",
          });
        });
    },
    //获取视频播放凭证
    goPlayer() {
      this.playShow = true;
      getPlayAuth({
        videoId: this.form.classVod,
      }).then((res) => {
        if (res.code == 0) {
          this.playShow = true;
          this.player = new Aliplayer(
            {
              id: "J_prismPlayer",
              width: "100%",
              autoplay: true,
              vid: this.form.classVod,
              playauth: res.data.playAuth,
              cover: res.data.videoMeta.coverURL,
              encryptType: 1,
            },
            function (player) {
              console.log("播放器创建好了。");
            }
          );
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    //视频关闭
    closeDialog() {
      this.player.dispose();
    },
  },
};
</script>
<style type="text/css">
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
