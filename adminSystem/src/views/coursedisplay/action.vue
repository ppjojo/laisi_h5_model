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
      <el-button type="primary" size="mini" @click="btn_add()">添加动作</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="className" label="动作名称"></el-table-column>
      <el-table-column align="center" prop="pictureUrl" label="动作封面">
        <template scope="scope">
          <img :src="scope.row.classCover" style="width: 50px;height: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="动作归属">
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
          <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="动作名称" prop="className">
          <el-input v-model="form.className"></el-input>
        </el-form-item>
        <el-form-item label="动作封面图" prop="classCover">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.classCover" :src="form.classCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="动作类型" prop="bigAttributeId">
          <el-radio-group v-model="form.actionSmallClass">
            <el-radio class="radio" :label="0">动作</el-radio>
            <el-radio class="radio" :label="1">内容</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="动作地址" prop="classCover">
          <el-input v-model="form.classVod"></el-input>
        </el-form-item>
        <el-form-item label="课程选择">
          <el-select v-model="form.bigClassId" placeholder="" filterable clearable>
            <el-option v-for="item in courseList" :key="item.bigClassId" :label="item.className"
              :value="item.bigClassId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动作归属">
          <el-select v-model="form.actionBelong" placeholder="" clearable>
            <el-option :key="0" label="热身" :value="0"></el-option>
            <el-option :key="1" label="训练" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时长" prop="duration">
          <el-input v-model.number="form.duration"></el-input>
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
    allAction,
    updateAction,
    addAction,
    allCourse
  } from '@/api/coursedisplay/coursedisplay'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
  import { fileUpload } from '@/utils/fileUpload'
  export default {
    filters: {
      formatDate(time) {
        time = time
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    computed: {
      checkPer() {
        return function(btn) {
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
          bigClassId:[{
            required: true,
            message: '请选择关联课程',
            trigger: 'blur,change'
          }, ],
          actionBelong:[{
            required: true,
            message: '请选择动作归属',
            trigger: 'blur,change'
          }, ],
          duration: [{
            required: true,
            message: '请填写时长',
            trigger: 'blur,change'
          },{
						pattern: /^\+?[0-9]\d*$/,
						message: "请输入大于等于0的正整数",
						trigger: "blur"
					}, ],
        },
      }
    },
    mounted() {
      this.getList();
      allCourse({}).then(res => {
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
          className: "",
          classCover: null,
          actionBelong: null, //图片url
          classVod: "",
          bigClassId: null,
          duration: null,
          smallClassDay: null,
          classPart: [],
          classLabel: [],
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      requestFile(param) { //
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.classCover = res.data.url;
          }
        })
      },
      requestFile2(param) { //
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.classVod = res.data.url;
          }
        })
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
