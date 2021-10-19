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
      <el-table-column align="center" prop="defaultName" label="默认课程名称">
      </el-table-column>
      <el-table-column align="center" prop="defaultCover" label="默认课程封面">
        <template scope="scope">
          <img :src="scope.row.defaultCover" style="width: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="defaultDays" label="默认课程天数">
      </el-table-column>
      <el-table-column align="center" prop="deviceType" label="类型">
        <template scope="scope">
          {{scope.row.isDefault==1?'默认':'智能训练'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="defaultLossWeight" label="目标减重">
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
        <el-form-item label="默认课程名称" prop="defaultName">
          <el-input v-model="form.defaultName"></el-input>
        </el-form-item>
        <el-form-item label="默认课程封面图" prop="classCover">
          <el-input v-model="form.defaultCover"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.defaultCover" :src="form.defaultCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
         <el-form-item label="类型" prop="classSex">
          <el-radio-group v-model="form.isDefault" >
            <el-radio class="radio" :label="0">智能训练</el-radio>
            <el-radio class="radio" :label="1">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目标减重" prop="defaultLossWeight">
          <el-input v-model.number="form.defaultLossWeight"></el-input>
        </el-form-item>
        <el-form-item label="训练天数" prop="defaultDays">
            <el-input v-model.number="form.defaultDays"></el-input>
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
    allDefaultCourse,
    addDefaultCourse,
    updateDefaultCourse
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
          defaultCover: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur,change'
          }, ],
          defaultLossWeight: [{
            required: true,
            message: '请输入目标减重',
            trigger: 'blur,change'
          }, ],
          defaultName: [{
            required: true,
            message: '请输入课程名称',
            trigger: 'blur,change'
          }, ],
          defaultDays: [{
            required: true,
            message: '请填写训练天数',
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
        allDefaultCourse(this.searchForm).then(res => {
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
      				allDefaultCourse(this.form).then(response => {
      					this.getList()
      					this.$notify({
      						type: 'success',
      						message: '成功新增'
      					});
      				})
      			} else {
      				updateDefaultCourse(this.form).then(response => {
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
          defaultName: "",
          defaultCover: null,
          defaultDays: null, //图片url
          defaultLossWeight: null,
          isDefault: 1,
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
            this.form.defaultCover = res.data.url;
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
