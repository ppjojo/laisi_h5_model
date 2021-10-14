<template>
  <div class="app-container">
    <!-- <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.userId" placeholder="用户ID" ></el-input>
                </el-form-item>
                <el-form-item label="memberId">
                    <el-select v-model="searchForm.memberId" placeholder="请选择子账户" clearable>
                        <el-option v-for="item in memberList" :key="item.memberId" :label="item.memberId"
                            :value="item.memberId"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="">查询主账户</el-button>
                </el-form-item>
            </el-form>
        </div> -->
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加分类</el-button>
    </div>
    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="属性大类" prop="bigAttributeId">
          <el-radio-group v-model="form.bigAttributeId" @change="bigAttribute">
            <el-radio class="radio" :label="1">目标</el-radio>
            <el-radio class="radio" :label="2">部位</el-radio>
            <el-radio class="radio" :label="3">等级</el-radio>
            <el-radio class="radio" :label="4">器械</el-radio>
            <el-radio class="radio" :label="5">标签</el-radio>
            <el-radio class="radio" :label="6">时长</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性名称" prop="attribute">
          <el-input v-model="form.attribute"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="bigAttribute" label="属性大类">
      </el-table-column>
      <el-table-column align="center" prop="attribute" label="属性名称">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click="btn_visible(scope.row)" type="text" style="color:#f78989;" size="mini">
            {{scope.row.status==0?'隐藏':'显示'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    allAttribute,
    addAttribute,
    updateAttribute
  } from '@/api/coursedisplay/coursedisplay'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
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
        dialogTitle: "",
        dialogVisible: false,
        form: {},
        rules: {
          attribute: [{
            required: true,
            message: '请填写属性名称',
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
        allAttribute({}).then(res => {
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
              addAttribute(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增'
                });
              })
            } else {
              updateAttribute(this.form).then(response => {
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
          attribute: "",
          bigAttributeId: 1,
          bigAttribute: "目标",
          status: 0,
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      bigAttribute(val) {
        switch (val) {
          case 1:
            this.form.bigAttribute = "目标"
            break;
          case 2:
            this.form.bigAttribute = "部位"
            break;
          case 3:
            this.form.bigAttribute = "等级"
            break;
          case 4:
            this.form.bigAttribute = "器械"
            break;
          case 5:
            this.form.bigAttribute = "标签"
            break;
        }
      },
      btn_visible(form){
        this.$confirm('此操作将'+(form.status==0?'隐藏':'显示')+'除该属性, 是否继续?', '提示', {
        	confirmButtonText: '确定',
        	cancelButtonText: '取消',
        	type: 'warning'
        }).then(() => {
          form.status = form.status==0?1:0;
        	updateAttribute(form).then(response => {
        		this.getList()
        		this.$notify({
        			type: 'success',
        			message: '成功!'
        		});
        	})
        }).catch(() => {
        	this.$notify({
        		message: '已取消操作',
        		type: 'info'
        	});
        });
      }
    }
  }
</script>
