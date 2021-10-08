<template>
  <div class="app-container">
    <!-- <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="课程名称">
          <el-input v-model="searchForm.className" clearable placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item label="目标">
          <el-select v-model="searchForm.classTarget" placeholder="" clearable>
            <el-option v-for="item in attribute['目标']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部位">
          <el-select v-model="searchForm.classPart" multiple placeholder="" clearable>
            <el-option v-for="item in attribute['部位']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="searchForm.classLevel" placeholder="" clearable>
            <el-option v-for="item in attribute['等级']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="器械">
          <el-select v-model="searchForm.classKit" placeholder="" clearable>
            <el-option v-for="item in attribute['器械']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="container-edit">
    	<el-button type="primary" size="mini" @click="btn_add()" >添加课程</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="课程id"></el-table-column>
      <el-table-column align="center" prop="smartClassName" label="课程名称">
      </el-table-column>
      <el-table-column align="center" prop="smartClassCover" label="课程封面">
        <template scope="scope">
          <img :src="scope.row.smartClassCover" style="width: 50px;height: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center"  label="类型">
        <template scope="scope">
          {{scope.row.isDefaultClass==1?'默认':'智能训练'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="课程目标">
        <template scope="scope">
          {{scope.row.smartClassTarget==1?'减脂':scope.row.smartClassTarget==2?'增肌':'塑型'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="课程部位">
        <template scope="scope">
          {{scope.row.smallClassBody==1?'全身':scope.row.smallClassBody==2?'上半身':'下半身'}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="课程等级">
        <template scope="scope">
          {{scope.row.smartClassLevel==1?'入门':scope.row.smartClassLevel==2?'初级':scope.row.smartClassLevel==3?'进阶':'强化'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="smartClassDes" label="课程详情">
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
        <el-form-item label="课程名称" prop="smartClassName">
          <el-input v-model="form.smartClassName"></el-input>
        </el-form-item>
        <el-form-item label="课程封面图" prop="classCover">
          <el-input v-model="form.smartClassCover"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.smartClassCover" :src="form.smartClassCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程目标" prop="smartClassTarget">
          <el-radio-group v-model="form.smartClassTarget" >
            <el-radio class="radio" :label="1">减脂</el-radio>
            <el-radio class="radio" :label="2">增肌</el-radio>
             <el-radio class="radio" :label="3">塑型</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="课程部位" prop="smallClassBody">
          <el-radio-group v-model="form.smallClassBody" >
            <el-radio class="radio" :label="1">全身</el-radio>
            <el-radio class="radio" :label="2">上半身</el-radio>
             <el-radio class="radio" :label="3">下半身</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="训练等级" prop="smartClassLevel">
          <el-radio-group v-model="form.smartClassLevel" >
            <el-radio class="radio" :label="1">入门</el-radio>
            <el-radio class="radio" :label="2">初级</el-radio>
             <el-radio class="radio" :label="3">进阶</el-radio>
             <el-radio class="radio" :label="4">强化</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="类型" prop="isDefaultClass">
          <el-radio-group v-model="form.isDefaultClass" >
            <el-radio class="radio" :label="0">智能训练</el-radio>
            <el-radio class="radio" :label="1">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="课程简介" prop="smartClassDes">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.smartClassDes"></el-input>
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
    allCourse,
    addCourse,
    updateCourse
  } from '@/api/intelligent/intelligent'
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
        dialogVisible: false,
        searchForm: {
          // className: "",
          // classTarget: null,
          // classLevel: null,
          // classKit: null,
          // classPart: []
        },
        dialogTitle:"",
        form: {},
        rules: {
          smartClassCover: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur,change'
          }, ],
          smartClassName: [{
            required: true,
            message: '请输入课程名称',
            trigger: 'blur,change'
          }, ],
          smartClassDes: [{
            required: true,
            message: '请填写课程详情',
            trigger: 'blur,change'
          }, ],
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        allCourse(this.searchForm).then(res => {
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
      				addCourse(this.form).then(response => {
      					this.getList()
      					this.$notify({
      						type: 'success',
      						message: '成功新增'
      					});
      				})
      			} else {
      				updateCourse(this.form).then(response => {
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
          smartClassName: "",
          smartClassCover: null,
          smartClassTarget: 1, //图片url
          smartClassDes: null,
          isDefaultClass: 0,
          smartClassLevel:1,
          smallClassBody:1
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
            this.form.smartClassCover = res.data.url;
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
