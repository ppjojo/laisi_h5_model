<template>
  <div class="app-container">
    <div class="container-edit">
    	<el-button type="primary" size="mini" @click="btn_add()" >添加大类</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="bigClassId" label="课程id"></el-table-column>
      <el-table-column align="center" prop="className" label="课程名称">
      </el-table-column>
      <el-table-column align="center" prop="pictureUrl" label="课程封面">
        <template scope="scope">
          <img :src="scope.row.classCover" style="width: 50px;height: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="classTargetName" label="课程目标">
      </el-table-column>
      <el-table-column align="center" prop="deviceType" label="课程部位">
        <template scope="scope">
          {{returnClassPart(scope.row.classPart,1)}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="classLevelName" label="课程等级">
      </el-table-column>
      <el-table-column align="center" prop="classKitName" label="器械">
      </el-table-column>
      <el-table-column align="center" prop="actionSize" label="动作个数">
      </el-table-column>
      <el-table-column align="center" prop="deviceModel" label="下载/收藏/分享">
        <template scope="scope">
          {{scope.row.allCount.download+"/"+scope.row.allCount.collectCount+"/"+scope.row.allCount.shareCount}}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="deviceModel" label="标签">
        <template scope="scope">
          {{returnClassPart(scope.row.classLabel,2)}}
        </template>
      </el-table-column> -->
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
        <el-form-item label="课程名称" prop="className">
          <el-input v-model="form.className"></el-input>
        </el-form-item>
        <el-form-item label="课程封面图" prop="classCover">
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.classCover" :src="form.classCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
    listItem, addItem, updateItem
  } from '@/api/helpCenter/bigQuestion'
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
        attribute: {
        },
        searchForm: {
          className: "",
          classTarget: null,
          classLevel: null,
          classKit: null,
          classPart: []
        },
        dialogTitle:"",
        form: {},
        rules: {
          classCover: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur,change'
          }, ],
          classDes: [{
            required: true,
            message: '请输入课程简介',
            trigger: 'blur,change'
          }, ],
          className: [{
            required: true,
            message: '请输入课程名称',
            trigger: 'blur,change'
          }, ],
          name: [{
            required: true,
            message: '请填写奖品名称',
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
        listItem({}).then(res => {
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
      				addItem(this.form).then(response => {
      					this.getList()
      					this.$notify({
      						type: 'success',
      						message: '成功新增'
      					});
      				})
      			} else {
      				updateItem(this.form).then(response => {
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
          classSex: null, //图片url
          classDes: "",
          classTarget: null,
          classKit: null,
          classLevel: null,
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
