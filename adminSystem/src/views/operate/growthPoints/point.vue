<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="handleAddModel" v-if="checkPer('add')">新增任务模块</el-button>
      <el-button type="primary" size="mini" @click="handleAddActionDic" v-if="checkPer('add')">新增小任务</el-button>
      <el-button type="primary" size="mini" @click="handleAddTime" v-if="checkPer('add')">设置任务时间段</el-button>
    </div>
    <div v-for="item in list">
      <el-divider content-position="left">{{item.modelName}}
        <el-button style="margin-left: 20px;" size="mini" @click="handleEditModel(item)">编辑</el-button>
        <el-button size="mini" @click="handleDeleteModel(item)">{{ item.status!=1?'设置不可用':'设置可用' }}</el-button>
      </el-divider>

      <el-table v-loading="loading" :data="item.list" element-loading-text="Loading" border fit highlight-current-row
        size="small ">
        <el-table-column align="center" prop="actionType" width="100" label="任务编码">
        </el-table-column>
        <el-table-column align="center" prop="actionName" label="任务">
        </el-table-column>
        <el-table-column align="center" prop="timeSettingId" width="75" label="时间段">
          <template scope="scope">
            {{scope.row.timeSettingId?timeList[scope.row.timeSettingId-1].timeFormat:'暂无'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="integralChange" width="65" label="积分值">
        </el-table-column>
        <el-table-column align="center" prop="dayIntegralLimited" width="65" label="日上限">
        </el-table-column>
        <el-table-column align="center" prop="totalIntegralLimited" width="65" label="总上限">
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template scope="scope">
            <el-button @click="handleEditActionDic(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
            </el-button>
            <el-button @click=" handleDeleteActionDic(scope.row)" type="text" style="color:#f78989;" size="mini" v-if="checkPer('delete')">删除
            </el-button>
            <el-button @click=" handleHiddenActionDic(scope.row)" type="text" style="color:#999;" size="mini" v-if="checkPer('delete')">{{ scope.row.status==0?'隐藏':'显示' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


  <!--新增和编辑时间段界面-->
  <el-dialog  :visible.sync="timeDialog">
    <el-form :model="timeForm" label-width="120px" >
    <template v-for="(item,index) in timeList">
      <el-form-item :label="'时间段'+(index+1)+'开始时间'" >
        <el-input v-model.number="timeList[index].startTime"></el-input>
      </el-form-item>
      <el-form-item :label="'时间段'+(index+1)+'结束时间'">
        <el-input v-model.number="timeList[index].endTime"></el-input>
      </el-form-item>
    </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="timeDialog = false">取消</el-button>
      <el-button type="primary" @click.native="submitTime()">
        提交</el-button>
    </div>
  </el-dialog>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'任务模块'" :visible.sync="modelDialog">
      <el-form :model="modelForm" label-width="120px" :rules="rules" ref="modelForm">

        <el-form-item label="模块名称" prop="modelName">
          <el-input :readonly="dialogTitle!='新增'" v-model="modelForm.modelName"></el-input>
        </el-form-item>

        <el-form-item label="模块类型" prop="modelType">
          <el-input :readonly="dialogTitle!='新增'" v-model="modelForm.modelType"></el-input>
        </el-form-item>
        <el-form-item label="任务上限" prop="taskCount">
          <el-input v-model.number="modelForm.taskCount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="modelDialog = false">取消</el-button>
        <el-button type="primary" @click.native="submitModel('modelForm')">
          提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="dialogTitle+'小任务'" :visible.sync="actionDicDialog">
      <el-form :model="actionDicForm" label-width="120px" :rules="rules" ref="actionDicForm">

        <el-form-item label="任务名称" prop="actionName">
          <el-input v-model="actionDicForm.actionName"></el-input>
        </el-form-item>

        <el-form-item label="模块类型" prop="modelType">
          <el-select v-model="actionDicForm.modelType" clearable>
            <el-option v-for="item in modelList" :key="item.modelType" :label="item.modelName+'-'+item.modelType"
              :value="item.modelType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间段选择" prop="timeSettingId">
          <el-select v-model="actionDicForm.timeSettingId" clearable>
            <el-option v-for="item in timeList" :key="item.id" :label="item.startTime+'-'+item.endTime"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类型" prop="actionType">
          <el-input v-model="actionDicForm.actionType"></el-input>
        </el-form-item>

        <el-form-item label="积分" prop="integralChange">
          <el-input v-model="actionDicForm.integralChange"></el-input>
        </el-form-item>

        <el-form-item label="每天限制" prop="dayIntegralLimited">
          <el-input v-model="actionDicForm.dayIntegralLimited"></el-input>
        </el-form-item>
        <el-form-item label="总限制" prop="totalIntegralLimited">
          <el-input v-model="actionDicForm.totalIntegralLimited"></el-input>
        </el-form-item>
        <el-form-item label="是否开启" prop="status">
          <el-switch v-model="actionDicForm.status" :active-value="0" :inactive-value="1" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="actionDicDialog = false">取消</el-button>
        <el-button type="primary" @click.native="submitActionDic('actionDicForm')">
          提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryList,
    listModel,
    insertModel,
    updateModel,
    deleteModel,
    listActionDic,
    insertActionDic,
    updateActionDic,
    deleteActionDic,
    timeGetAll,updateTime
  } from '@/api/growthPoints/point'
  import {
    checkPermission
  } from '@/api/checkPermission'

  export default {
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
        modelList: [],
        actionDicList: [],

        modelDialog: false,
        modelForm: {},

        timeDialog: false,
        timeForm: {},
        timeList:[],
        actionDicDialog: false,
        actionDicForm: {},

        rules: {
          modelName: [{
            required: true,
            message: '请输入模块名称',
            trigger: 'blur'
          }, ],
          modelType: [{
            required: true,
            message: '请输入模块类型',
            trigger: 'blur'
          }],
          taskCount: [{
            required: true,
            message: '请输入任务上限',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择模块状态',
            trigger: 'blur'
          }],

          actionName: [{
            required: true,
            message: '请输入任务名称',
            trigger: 'blur'
          }, ],
          actionType: [{
            required: true,
            message: '请输入任务类型',
            trigger: 'blur'
          }],
        },

      }
    },
    mounted() {
      timeGetAll({}).then(res=>{
        this.timeList = res.data;
        this.getListModel()
      })
    },
    methods: {
      //获取模块列表
      getListModel() {
        listModel().then(res => {
          this.modelList = res.data;
          this.getListActionDic()
        })
      },
      //获取任务列表
      getListActionDic() {
        listActionDic().then(res => {
          this.actionDicList = res.data;
          this.modelList.forEach(mItem => {
            mItem.list = [];
            this.actionDicList.forEach(aItem => {
              // if (aItem.status == 1) return
              if (mItem.modelType == aItem.modelType) {
                mItem.list.push(aItem)
              }
            });
          });
          this.list = this.modelList
        })

      },
      //新增 积分模块
      handleAddModel() {
        this.modelDialog = true;
        this.dialogTitle = "新增";
        this.modelForm = {
          modelName: null,
          modelType: null,
          status: 0,
        };
      },
      //时间段选择
      handleAddTime(){
        this.timeDialog = true;
      },
      //编辑时间
      submitTime(){
        updateTime(this.timeList).then(res=>{
          this.timeDialog = false;
          timeGetAll({}).then(res=>{
            this.timeList = res.data;
          })
          this.$notify({
            type: 'success',
            message: '成功修改'
          });
        })
      },

      //编辑 积分模块
      handleEditModel(row) {
        this.modelDialog = true;
        this.dialogTitle = "编辑";
        this.modelForm = Object.assign({}, row)
      },

      //新增 积分行为
      handleAddActionDic() {
        this.actionDicDialog = true;
        this.dialogTitle = "新增";
        this.actionDicForm = {
          actionName: null,
          actionType: null,
          modelType: null,
          integralChange: null,
          dayIntegralLimited: null,
          totalIntegralLimited: null,
          timeSettingId:null
        };
      },
      //编辑 积分行为
      handleEditActionDic(row) {
        this.actionDicDialog = true;
        this.dialogTitle = "编辑";
        this.actionDicForm = Object.assign({}, row)
      },
      //保存
      submitModel(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.modelDialog = false
            if (this.dialogTitle == "新增") {
              insertModel(this.modelForm).then(response => {
                this.getListModel()
                this.$notify({
                  type: 'success',
                  message: '成功新增' + this.modelForm.modelName
                });
              })
            } else {
              updateModel(this.modelForm).then(response => {
                this.getListModel()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.modelForm.modelName
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //保存
      submitActionDic(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.actionDicDialog = false
            if (this.dialogTitle == "新增") {
              insertActionDic(this.actionDicForm).then(response => {
                this.getListModel()
                this.$notify({
                  type: 'success',
                  message: '成功新增' + this.actionDicForm.actionName
                });
              })
            } else {
              updateActionDic(this.actionDicForm).then(response => {
                this.getListModel()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.actionDicForm.actionName
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      //删除
      handleDeleteActionDic(row) {
        this.$confirm('此操作将永久删除任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteActionDic({
            actionId: row.actionId,
          }).then(response => {
            this.getListModel()
            this.$notify({
              type: 'success',
              message: '成功删除所选任务!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除操作',
            type: 'info'
          });
        });
      },
      //显示隐藏
      handleHiddenActionDic(row) {
        let str = row.status == 0 ? '此操作将暂时隐藏模块, 是否继续?' : '此操作将开放模块, 是否继续?'
        let param = JSON.parse(JSON.stringify(row));
        param.status = row.status == 0 ? 1 : 0;
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateActionDic(param).then(response => {
            this.getListModel()
            this.$notify({
              type: 'success',
              message: '成功修改'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消操作',
            type: 'info'
          });
        });

      },
      handleDeleteModel(row) {
        let str = row.status == 0 ? '此操作将暂时隐藏模块, 是否继续?' : '此操作将开放模块, 是否继续?'
        let param = JSON.parse(JSON.stringify(row));
        param.status = row.status == 0 ? 1 : 0;
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateModel(param).then(response => {
            this.getListModel()
            this.$notify({
              type: 'success',
              message: '操作成功!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消操作',
            type: 'info'
          });
        });
      },


    }
  }
</script>
