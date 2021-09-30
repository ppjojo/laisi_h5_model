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
      <el-button type="primary" size="mini" @click="btn_add()">添加食物</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="课程id"></el-table-column>
      <el-table-column align="center" prop="foodName" label="食物名称">
      </el-table-column>
      <el-table-column align="center" prop="foodHeat" label="食物热量">
      </el-table-column>
      <el-table-column align="foodKind" label="类型">
        <template scope="scope">
          {{scope.row.foodKind==1?'主食':scope.row.foodKind==2?'辅食':'汤'}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="食物所属">
        <template scope="scope">
          {{returnIDS(scope.row.foodMealIds,2)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="食物分类">
        <template scope="scope">
          {{returnIDS(scope.row.foodTypeIds,1)}}
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
        <el-form-item label="食物名称" prop="foodName">
          <el-input v-model="form.foodName"></el-input>
        </el-form-item>
        <el-form-item label="食用单位" prop="foodUnit">
          <el-input v-model="form.foodUnit"></el-input>
        </el-form-item>
        <el-form-item label="食物热量" prop="foodHeat">
          <el-input v-model.number="form.foodHeat"></el-input>
        </el-form-item>
        <el-form-item label="食物类型" prop="foodKind">
          <el-radio-group v-model="form.foodKind">
            <el-radio class="radio" :label="1">主食</el-radio>
            <el-radio class="radio" :label="2">辅食</el-radio>
            <el-radio class="radio" :label="3">汤</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="食物所属">
          <el-checkbox-group v-model="foodMeal">
            <el-checkbox :label="1" :key="1">早餐</el-checkbox>
            <el-checkbox :label="2" :key="2">午餐</el-checkbox>
            <el-checkbox :label="3" :key="3">晚餐</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="食物种类">
          <el-checkbox-group v-model="foodType">
            <el-checkbox v-for="item in typeList" :label="item.id" :key="item.id">{{item.foodType}}</el-checkbox>
          </el-checkbox-group>
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
    allFood,
    addFood,
    updateFood,
    allFoodType
  } from '@/api/intelligent/intelligent'
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
    watch: {
      foodMeal(val, old) {
        this.form.foodMealIds = [];
        val.forEach(d => {
          this.form.foodMealIds.push({
            foodMeals: d
          });
        })
      },
      foodType(val, old) {
        console.log(old)
        this.form.foodTypeIds = [];
        val.forEach(d => {
          this.form.foodTypeIds.push({
            foodTypeId: d
          });
        })
      },
    },
    data() {
      return {
        list: [],
        typeList: [],
        foodMeal: [],
        foodType: [],
        loading: false,
        dialogVisible: false,
        searchForm: {
          // className: "",
          // classTarget: null,
          // classLevel: null,
          // classKit: null,
          // classPart: []
        },
        dialogTitle: "",
        form: {},
        rules: {
          foodName: [{
            required: true,
            message: '请填写食物名称',
            trigger: 'blur,change'
          }, ],
          foodUnit: [{
            required: true,
            message: '请输入食用单位',
            trigger: 'blur,change'
          }, ],
          foodHeat: [{
            required: true,
            message: '请填写食物热量',
            trigger: 'blur,change'
          }, ],
        },
      }
    },
    mounted() {
      this.getList();
      allFoodType({}).then(res => {
        this.typeList = res.data;
      })
    },
    methods: {
      getList() {
        allFood(this.searchForm).then(res => {
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
              addFood(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增'
                });
              })
            } else {
              updateFood(this.form).then(response => {
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
        this.foodMeal = [1,2,3];
        this.foodType = [this.typeList[0].id];
        this.form = {
          foodName: "",
          foodTypeIds: [],
          foodMealIds: [],
          foodUnit: null,
          foodKind: 1,
          foodHeat: null,
        }
      },
      btn_edit(row) {
        this.dialogTitle = "编辑";
        this.foodMeal = [];
        this.foodType = [];
        row.foodMealIds.forEach(d => {
          this.foodMeal.push(d.foodMeals);
        })
        row.foodTypeIds.forEach(d => {
          this.foodType.push(d.foodTypeId);
        })
        this.form = Object.assign({}, row);
        this.dialogVisible = true;
      },
      returnIDS(list, flag) {
        let arr = [];
        if (flag == 1) {
          //types
          list.forEach(d => {
            arr.push(d.foodTypeName)
          })
        } else {
          list.forEach(d => {
            arr.push(d.foodMeals == 1 ? '早餐' : d.foodMeals == 2 ? '午餐' : '晚餐')
          })
        }
        return arr.toString();
      },
      // requestFile(param) { //
      //   var fileForm = new FormData()
      //   fileForm.append('file', param.file)
      //   fileUpload(fileForm).then(res => {
      //     if (res.code == 0) {
      //       this.form.smartClassCover = res.data.url;
      //     }
      //   })
      // },
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
