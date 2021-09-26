<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="动作名称">
          <el-input v-model="searchForm.className" clearable placeholder="动作名称"></el-input>
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
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="smartActionName" label="动作名称"></el-table-column>
      <el-table-column align="center" prop="smartActionCover" label="动作封面">
        <template scope="scope">
          <img :src="scope.row.smartActionCover" style="width: 50px;height: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="smartActionDifficulty" label="动作难度">
      </el-table-column>
      <el-table-column align="center" label="时长">
        <template slot-scope="scope">
          {{scope.row.smartActionDuration+'s'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :modal="false" :visible="dialogVisible" width="70%">


      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="选择动作视频" prop="smartActionName">
          <el-select @change="choosesmartActionName" v-model="form.action" filterable placeholder="可查询">
              <el-option
                v-for="(item,index) in courseList"
                :key="index"
                :label="item.videoName"
                :value="index">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="训练动作名" prop="smartActionName">
          <el-input :readonly="true" v-model="form.smartActionName"></el-input>
        </el-form-item>
        <el-form-item label="动作播放地址" prop="smartActionVod">
          <el-input :readonly="true" v-model="form.smartActionVod"></el-input>
        </el-form-item>
        <el-form-item label="动作播放时长" prop="smartActionDuration">
          <el-input :readonly="true" v-model="form.smartActionDuration"></el-input>
        </el-form-item>
        <el-form-item label="动作视频大小" prop="actionSize">
          <el-input :readonly="true" v-model="form.actionSize"></el-input>
        </el-form-item>
        <el-form-item label="视频封面图" prop="smartActionCover">
          <el-input v-model="form.smartActionCover"></el-input>
          <img v-if="form.smartActionCover" :src="form.smartActionCover" class="avatar">
          <!-- <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.smartActionCover" :src="form.smartActionCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>

        <el-form-item label="动作难度" prop="smartActionDifficulty">
          <el-radio-group v-model="form.smartActionDifficulty">
            <el-radio class="radio" :label="1">1</el-radio>
            <el-radio class="radio" :label="2">2</el-radio>
            <el-radio class="radio" :label="3">3</el-radio>
            <el-radio class="radio" :label="4">4</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="动作身体部位" prop="smartActionBody">
          <el-radio-group v-model="form.smartActionBody">
            <el-radio class="radio" :label="1">全身</el-radio>
            <el-radio class="radio" :label="2">上半身</el-radio>
            <el-radio class="radio" :label="3">下半身</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="动作讲解音频" prop="actionExplainAudio">
          <el-input :readonly="true" v-model="form.actionExplainAudio"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="动作旁白音频" prop="actionAsideAudio">
          <el-input :readonly="true" v-model="form.actionAsideAudio"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile2" :show-file-list="false" class="avatar-uploader">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-button type="primary" size="mini" @click="dialogVisible2 = true">添加属性</el-button>
        <template v-for="(item,index) in form.smartActionAttributeList">
          <div style="padding: 20px;display: inline-block;">
              <span>{{item.actionBigAttribute=='part'?'动作部位':item.actionBigAttribute=='belong'?'动作归属':'动作目标'}}:
              <span v-if="item.actionBigAttribute=='part'">
                {{item.actionSmallAttribute==1?'腰腹':item.actionSmallAttribute==2?'背部':item.actionSmallAttribute==3?'肩部':item.actionSmallAttribute==4?'手臂':item.actionSmallAttribute==5?'胸部':item.actionSmallAttribute==6?'腿部':'臀部'}}
              </span>
              <span v-if="item.actionBigAttribute=='belong'">
                {{item.actionSmallAttribute==1?'训练':item.actionSmallAttribute==2?'热身':"拉伸"}}
              </span>
              <span v-if="item.actionBigAttribute=='target'">
                {{item.actionSmallAttribute==1?'减脂':item.actionSmallAttribute==2?'增肌':"塑型"}}
              </span>
              </span>
              <el-button type="danger" size="mini" @click="delattr(index)">删除</el-button>
          </div>
        </template>
        <el-dialog :title="'属性集合'" :modal="false" :visible="dialogVisible2" width="50%">
          <el-form-item label="动作属性分类" prop="actionBigAttribute">
            <el-radio-group v-model="form.actionBigAttribute">
              <el-radio class="radio" :label="'part'">动作部位</el-radio>
              <el-radio class="radio" :label="'belong'">动作归属</el-radio>
              <el-radio class="radio" :label="'target'">动作目标</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="动作属性分类" prop="actionSmallAttribute">
            <el-radio-group v-model="form.actionSmallAttribute">
              <template v-if="form.actionBigAttribute=='part'">
                <el-radio class="radio" :label="1">腰腹</el-radio>
                <el-radio class="radio" :label="2">背部</el-radio>
                <el-radio class="radio" :label="3">肩部</el-radio>
                <el-radio class="radio" :label="4">手臂</el-radio>
                <el-radio class="radio" :label="5">胸部</el-radio>
                <el-radio class="radio" :label="6">腿部</el-radio>
                <el-radio class="radio" :label="7">臀部</el-radio>
              </template>
              <template v-if="form.actionBigAttribute=='belong'">
                <el-radio class="radio" :label="1">训练</el-radio>
                <el-radio class="radio" :label="2">热身</el-radio>
                <el-radio class="radio" :label="3">拉伸</el-radio>
              </template>
              <template v-if="form.actionBigAttribute=='target'">
                <el-radio class="radio" :label="1">减脂</el-radio>
                <el-radio class="radio" :label="2">增肌</el-radio>
                <el-radio class="radio" :label="3">塑型</el-radio>
              </template>
            </el-radio-group>
          </el-form-item>



          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" size="mini" @click="addAttributeList">确 定</el-button>
          </div>
        </el-dialog>


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
    allCourse,getActionMovie
  } from '@/api/intelligent/intelligent'
  import {
    getPlayAuth
  } from '@/api/videoCourse/course'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
  import {
    fileUpload
  } from '@/utils/fileUpload'
  export default {
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    computed: {
      checkPer() {
        return function (btn) {
          return (checkPermission(this.$route.path + '/' + btn))
        }
      }
    },
    data() {
      return {
        list: [],
        loading: false,
        courseList: [],
        form: {},
        searchForm: {
          className: "",
          duration: null,
        },
        dialogTitle: "",
        dialogVisible: false,
        dialogVisible2:false,
        playShow: false,
        rules: {
          classCover: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur,change'
          }, ],
          classVod: [{
            required: true,
            message: '请上传地址',
            trigger: 'blur,change'
          }, ],
          className: [{
            required: true,
            message: '请输入动作名称',
            trigger: 'blur,change'
          }, ],
          bigClassId: [{
            required: true,
            message: '请选择关联课程',
            trigger: 'blur,change'
          }, ],
          actionBelong: [{
            required: true,
            message: '请选择动作归属',
            trigger: 'blur,change'
          }, ],
          duration: [{
            required: true,
            message: '请填写时长',
            trigger: 'blur,change'
          }, {
            pattern: /^\+?[0-9]\d*$/,
            message: "请输入大于等于0的正整数",
            trigger: "blur"
          }, ],
        },
      }
    },
    mounted() {
      this.getList();
      getActionMovie({}).then(res => {
        this.courseList = res.data;
      })
    },
    methods: {
      getList() {
        allAction(this.searchForm).then(res => {
          this.list = res.data;
          this.loading = false
        })
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.dialogTitle == "新增") {
              addAction(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增'
                });
              })
            } else {
              updateAction(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改'
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      btn_add() {
        this.dialogVisible = true;
        this.dialogTitle = "新增";
        this.form = {
          smartActionName: "",
          smartActionCover: null,
          smartActionVod: null, //图片url
          smartActionDifficulty: 1,
          smartActionDuration: null,
          smartActionBody: 1,
          actionExplainAudio:'',
          actionAsideAudio:'',
          smartActionAttributeList: [],
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      choosesmartActionName(index){//下拉选择视频
        this.form.smartActionName = this.courseList[index].videoName;
        this.form.actionSize = this.courseList[index].videoSize||0;
        this.form.smartActionCover = this.courseList[index].videoCover;
        this.form.smartActionVod = this.courseList[index].videoId;
        this.form.smartActionDuration = this.courseList[index].duration||0;
      },
      addAttributeList(){
        //属性集合
        this.form.smartActionAttributeList.push({actionBigAttribute:this.form.actionBigAttribute,actionSmallAttribute:this.form.actionSmallAttribute});
        this.dialogVisible2 = false;
      },
      delattr(index){//删除属性
        this.form.smartActionAttributeList.splice(index, 1);
      },
      requestFile(param) { //
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.actionExplainAudio = res.data.url;
          }
        })
      },
      requestFile2(param) { //
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.actionAsideAudio = res.data.url;
          }
        })
      },
      //视频id添加进来需要去获取视频图片
      classVodChange(str) {
        getPlayAuth({
          videoId: str
        }).then(res => {
          if (res.code == 0) {
            this.$set(this.form, 'classCover', res.data.videoMeta.coverURL)
            this.$set(this.form, 'duration', Math.round(res.data.videoMeta.duration))
            this.$set(this.form, 'className', res.data.videoMeta.title.split('.')[0])
            this.$set(this.form, 'classSize', res.data.videoMeta.classSize)
          } else {
            this.$message({
              showClose: true,
              message: '视频ID不正确',
              type: 'error'
            });
          }

        }).catch(e=>{
          this.$message({
              showClose: true,
              message: '视频ID不正确',
              type: 'error'
            });
        })
      },
      //获取视频播放凭证
      goPlayer() {
        this.playShow = true
        getPlayAuth({
          videoId: this.form.classVod,
        }).then(res => {
          if (res.code == 0) {
            this.playShow = true
            this.player = new Aliplayer({
              id: 'J_prismPlayer',
              width: '100%',
              autoplay: true,
              vid: this.form.classVod,
              playauth: res.data.playAuth,
              cover: res.data.videoMeta.coverURL,
              encryptType: 1,
            }, function (player) {
              console.log('播放器创建好了。')
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
          }

        })

      },
      //视频关闭
      closeDialog() {
        this.player.dispose()
      },
    }
  }

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
    border-color: #409EFF;
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
