<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="itemName" label="项目名">
      </el-table-column>
      <el-table-column align="center" prop="deviceModel" label="设备类型">
      </el-table-column>
      <el-table-column align="center" prop="itemDes" label="备注">
      </el-table-column>
      
      
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini">删除</el-button>
          <el-button @click="btn_addLevel(scope.row)" type="text" size="mini" style="color:#67c23a;">等级分类
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'项目'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="项目名" prop="itemName">
          <el-input v-model="form.itemName"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceModel">
          <el-input v-model="form.deviceModel"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="itemDes">
          <el-input v-model="form.itemDes" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="模板等级详情" :visible.sync="LeveldialogVisible" width="80%">
      <LevelList  v-if="LeveldialogVisible" :projectId="projectId"></LevelList>
    </el-dialog>

  </div>
</template>

<script>
  import {
    listItem,
    addItem,
    updateItem,
    deleteItem
  } from '@/api/operate/shareConfig/shareConfig'
  import {
    checkPermission
  } from '@/api/checkPermission'

  import LevelList from "./levelList.vue";

  export default {
    components: {
      LevelList,
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

        dialogVisible: false,
        form: {},
        rules: {

        },
        LeveldialogVisible:false,
        projectId:""


      }
    },
    mounted() {
      this.getList()

    },
    methods: {
      getList() {
        listItem({}).then(res => {
          this.list = res.data
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
                  message: '成功新增' + this.form.itemName
                });
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.form.itemName
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
        this.dialogTitle = "新增"
        this.form = {
          itemDes: "",
          itemName: "",
          deviceModel:""
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem({
            id: id,
          }).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功删除'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除',
            type: 'info'
          });
        });
      },
      btn_addLevel(row) {
        this.LeveldialogVisible=true;
        this.projectId=row.id
      }

    }
  }

</script>
