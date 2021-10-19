<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="课程名称">
          <el-input v-model="searchForm.className" clearable placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item label="目标">
          <el-select v-model="searchForm.classTargetAttributes2" multiple placeholder="" clearable>
            <el-option v-for="item in attribute['目标']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部位">
          <el-select v-model="searchForm.classPart2" multiple placeholder="" clearable>
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
          <el-select v-model="searchForm.classKitAttributes2" multiple placeholder="" clearable>
            <el-option v-for="item in attribute['器械']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="getList()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-edit">
    	<el-button type="primary" size="mini" @click="btn_add()" >添加课程</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="bigClassId" label="课程id"></el-table-column>
      <el-table-column align="center" prop="className" label="课程名称">
      </el-table-column>
      <el-table-column align="center" prop="pictureUrl" label="课程封面">
        <template scope="scope">
          <img :src="scope.row.classCover" style="width: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="classTargetName" label="课程目标">
        <template scope="scope">
          {{returnClassPart(scope.row.classTargetAttributes,2)}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="deviceType" label="课程部位">
        <template scope="scope">
          {{returnClassPart(scope.row.classPart,1)}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="classLevelName" label="课程等级">
      </el-table-column>
      <el-table-column align="center" prop="classKitName" label="器械">
        <template scope="scope">
          {{returnClassPart(scope.row.classKitAttributes,3)}}
        </template>
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
          <el-button @click=" btn_on(scope.row)" type="text" style="color:#f78989;" size="mini">
            {{scope.row.status==1?'下架':'上架'}}
          </el-button>
          <!-- <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
          </el-button> -->
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
          <el-input v-model="form.classCover"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.classCover" :src="form.classCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
         <el-form-item label="课程性别" prop="classSex">
          <el-radio-group v-model="form.classSex" >
            <el-radio class="radio" :label="0">女性</el-radio>
            <el-radio class="radio" :label="1">男性</el-radio>
            <el-radio class="radio" :label="2">通用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目标">
          <el-select v-model="form.classTarget2" placeholder="" multiple clearable>
            <el-option v-for="item in attribute['目标']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部位">
          <el-select v-model="form.classPart2" multiple placeholder="" clearable>
            <el-option v-for="item in attribute['部位']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级">
          <el-select v-model="form.classLevel" placeholder="" clearable>
            <el-option v-for="item in attribute['等级']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="器械">
          <el-select v-model="form.classKit2" placeholder="" multiple clearable>
            <el-option v-for="item in attribute['器械']" :key="item.id" :label="item.attribute" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.classLabel2" placeholder="" multiple clearable>
            <el-option  label="1个热度" :value="10"></el-option>
            <el-option  label="2个热度" :value="20"></el-option>
            <el-option  label="3个热度" :value="30"></el-option>
            <el-option  label="最新" :value="40"></el-option>
            <el-option  label="官方推荐" :value="50"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程简介" prop="classDes">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.classDes"></el-input>
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
    allGAttribute,
    addCourse,
    updateCourse
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
        dialogVisible: false,
        attribute: {
        },
        searchForm: {
          className: "",
          classTargetAttributes: [],
          classTargetAttributes2: [],
          classLevel: null,
          classKitAttributes: [],
          classKitAttributes2: [],
          classPart: [],
          classPart2: []
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
    watch:{
      'form.classLabel2'(val,old){
        this.form.classLabel=[];
        val.forEach(d=>{
          this.form.classLabel.push({classLabel:d})
        })
      },
      'form.classPart2'(val,old){
        this.form.classPart=[];
        val.forEach(d=>{
          this.form.classPart.push({classPart:d})
        })
      },
      'form.classTarget2'(val,old){
        this.form.classTargetAttributes=[];
        val.forEach(d=>{
          this.form.classTargetAttributes.push({classTarget:d})
        })
      },
      'form.classKit2'(val,old){
        this.form.classKitAttributes=[];
        val.forEach(d=>{
          this.form.classKitAttributes.push({classKit:d})
        })
      },

      'searchForm.classPart2'(val,old){
        this.searchForm.classPart=[];
        val.forEach(d=>{
          this.searchForm.classPart.push({classPart:d})
        })
      },
      'searchForm.classTargetAttributes2'(val,old){
        this.searchForm.classTargetAttributes=[];
        val.forEach(d=>{
          this.searchForm.classTargetAttributes.push({classTarget:d})
        })
      },
      'searchForm.classKitAttributes2'(val,old){
        this.searchForm.classKitAttributes=[];
        val.forEach(d=>{
          this.searchForm.classKitAttributes.push({classKit:d})
        })
      },
    },
    mounted() {
      this.getList()
      this.getAttribute()
    },
    methods: {
      getList() {
        allCourse(this.searchForm).then(res => {
          this.list = res.data;
          this.loading = false
        })
      },
      getAttribute() {
        allGAttribute({}).then(res => {
          this.attribute = res.data;
        })
      },
      returnClassPart(arr, flag) { //返回课程部位
        let str = [];
        arr.forEach(d => {
          if (flag == 1){
            str.push(d.classPartName)
          }else if(flag==2){
            str.push(d.classTargetName)
          }else if(flag==3){
            str.push(d.classKitName)
          }else{
            str.push(d.classLabelName)
          }
        });
        return str.toString();
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
        row.classPart2=[];
        row.classLabel2 = [];
        row.classTarget2=[];
        row.classKit2 = [];
        row.classPart.forEach(d=>{
          row.classPart2.push(d.classPart)
        })
        row.classLabel.forEach(d=>{
          row.classLabel2.push(d.classLabel)
        })
        row.classTargetAttributes.forEach(d=>{
          row.classTarget2.push(d.classTarget)
        })
        row.classKitAttributes.forEach(d=>{
          row.classKit2.push(d.classKit)
        })
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      btn_on(row){
        this.$confirm('是否要'+(row.status==1?'下架':'上架')+'该课程?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          row.status = row.status==1?0:1;
          updateCourse(row).then(response => {
          	this.getList()
          	this.$notify({
          		type: 'success',
          		message: '成功修改'
          	});
          })
        }).catch(() => {
            this.$notify({
                message: '已取消',
                type: 'info'
            });
        });
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
