<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <!-- <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column> -->
      <el-table-column align="center" prop="rateid" label="比赛编号(唯一)">
      </el-table-column>
      <el-table-column align="center" prop="rateType" label="比赛分类">
      </el-table-column>

      <el-table-column align="center" prop="rateCatalog" label="比赛类型">
        <template slot-scope="scope">
          {{scope.row.rateCatalog==1?"好友赛":"匹配赛"}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="rateModel" label="比赛模式">
        <template slot-scope="scope">
          {{scope.row.rateModel==1?"倒计数":"倒计时"}}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="rateLimit" label="比赛限制">
      </el-table-column>

      <el-table-column align="center" prop="rateLimitUser" label="参赛人数">
      </el-table-column>

      <el-table-column align="center" prop="rateLimitAudience" label="观赛人数">
      </el-table-column>
      <el-table-column align="center" prop="matchtime" label="匹配时长">
      </el-table-column>

      <el-table-column align="center" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.flag | statusFilter" size="mini">{{ scope.row.flag==0?"正常":"禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="cratetime" label="创建时间">
            </el-table-column>
            <el-table-column align="center" prop="updatetime" label="更新时间">
            </el-table-column> -->

      <el-table-column align="center" label="操作" width="100">
        <template scope="scope">
          <el-button type="text" size="mini" @click=" btn_edit(scope.row)">编辑
          </el-button>
          <!-- <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button> -->
        </template>
      </el-table-column>
    </el-table>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'pk赛'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="比赛编号(唯一)" prop="rateid">
          <el-input v-model="form.rateid"></el-input>
        </el-form-item>
        <el-form-item label="比赛类型" prop="rateCatalog">
          <el-select v-model="form.rateCatalog" placeholder="请选择比赛类型">
            <el-option label="匹配赛" :value="0"></el-option>
            <el-option label="好友赛" :value="1"></el-option>
          </el-select>
        </el-form-item>
        
        
        <el-form-item label="比赛分类" prop="rateType">
          <el-select v-model="form.rateType" placeholder="请选择设备类型" @change="deviceTypeChange">
            <el-option label="跳绳" value="skipping"></el-option>
            <el-option label="腕力球" value="WristBall" disabled></el-option>
            <el-option label="健腹轮" value="XXX" disabled></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛模式" prop="rateModel">
          <el-select v-model="form.rateModel" placeholder="请选择比赛模式">
            <el-option label="倒计时" :value="0"></el-option>
            <el-option label="倒计数" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛限制" prop="rateLimit">
          <el-select v-model="form.rateLimit" placeholder="请选择比赛限制">
            <el-option v-if="form.rateModel==0" label="一分钟" :value="60"></el-option>
            <el-option v-if="form.rateModel==0" label="五分钟" :value="300"></el-option>
            <el-option v-if="form.rateModel==0" label="十分钟" :value="600"></el-option>
            <el-option v-if="form.rateModel==1" label="200" :value="200"></el-option>
            <el-option v-if="form.rateModel==1" label="500" :value="500"></el-option>
            <el-option v-if="form.rateModel==1" label="1000" :value="1000"></el-option>
            <!-- <el-option v-if="form.rateModel==1" label="3000" :value="3000"></el-option> -->
            
          </el-select>
        </el-form-item>
        <el-form-item label="参赛人数" prop="rateLimitUser">
          <el-input v-model="form.rateLimitUser" type="number"></el-input>
        </el-form-item>
        <el-form-item label="观赛人数" prop="rateLimitAudience">
          <el-input v-model="form.rateLimitAudience" type="number"></el-input>
        </el-form-item>
        <el-form-item label="匹配时长(秒)" prop="matchtime">
          <el-input v-model="form.matchtime" type="number"></el-input>
        </el-form-item>
        <el-form-item label="倒数几秒开始(秒)" prop="watchdown">
          <el-input v-model="form.watchdown" type="number"></el-input>
        </el-form-item>
        <el-form-item label="比赛超时时长(秒)" prop="ratetimeout">
          <el-input v-model="form.ratetimeout" type="number"></el-input>
        </el-form-item>
        <el-form-item label="初始加入人数" prop="rateJoinNum">
          <el-input v-model="form.rateJoinNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="最大进度条" prop="rateMax">
          <el-input v-model="form.rateMax" type="number"></el-input>
        </el-form-item>
        <el-form-item label="背景图" prop="backgroundImage">
             <el-input v-model="form.backgroundImage" style="margin-bottom:15px"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.backgroundImage" :src="form.backgroundImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="比赛时间段">
          <el-row v-for="(item,index) in form.rateTimeRangeArr" style="margin-bottom:15px">
            <el-col :span="10">
              <el-form-item label="开始时间" :prop="'rateTimeRangeArr.'+index+'.startTime'" :rules="rules.endTime">
                <el-input placeholder="12:00" v-model="item.startTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="结束时间" :prop="'rateTimeRangeArr.'+index+'.endTime'" :rules="rules.endTime">
                <el-input placeholder="15:00" v-model="item.endTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="padding-left:10px">
              <el-button @click="deleteTimeRange(index)" v-if="form.rateTimeRangeArr.length>1" type="danger"
                size="mini">
                删除时间段
              </el-button>
            </el-col>
          </el-row>



          <div style="text-align: right;">
            <el-button type="primary" size="mini" @click="addTimeRange">新增比赛时间段</el-button>
          </div>

        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch v-model="form.flag" :active-value="0" :inactive-value="1" inactive-color="#ff4949">
          </el-switch>
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
    listItem,
    addItem,
    updateItem,
    deleteItem
  } from '@/api/operate/onlinePK/onlinePKList'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    fileUpload
  } from '@/utils/fileUpload'

  export default {
    computed: {
      checkPer() {
        return function (btn) {
          return (checkPermission(this.$route.path + '/' + btn))
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'success',
          // 1: 'gray',
          1: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        timeValue1: "",
        list: [],
        loading: false,

        dialogVisible: false,
        form: {},
        rules: {
          startTime: [{
            required: true,
            message: '请输入开始时间',
            trigger: 'blur,change'
          }, ],
          endTime: [{
            required: true,
            message: '请输入结束时间',
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
          this.list = res.data
          this.loading = false
        })
      },
      timePickerChange(value) {
        console.log(value)
      },
      addTimeRange() {
        console.log(this.form.rateTimeRangeArr)
        this.form.rateTimeRangeArr.push({
          startTime: "",
          endTime: ""
        });
      },
      deleteTimeRange(index) {
        this.form.rateTimeRangeArr.splice(index, 1);
      },

      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.rateTimeRange = JSON.stringify(this.form.rateTimeRangeArr);
            this.form.rateName=this.form.rateCatalog==1?'好友赛':'匹配赛'
            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增在线PK赛'
                });
                this.dialogVisible = false
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改在线PK赛'
                });
                this.dialogVisible = false
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
          rateCatalog: 0,
          rateLimitAudience: "0",
          rateLimitUser: 0,
          rateLimit: "",
          rateModel: 0,
          rateType: "skipping",
          flag: 0,
          rateId: "",
          matchtime: 0,
          watchdown: 3,
          ratetimeout: 600,
          rateTimeRangeArr: [{
            startTime: "",
            endTime: ""
          }],
          rateName:"匹配赛",
          backgroundImage:"",
          rateJoinNum:0,
          rateMax:80
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
        if (this.form.rateTimeRange) {
          this.$set(this.form, "rateTimeRangeArr", JSON.parse(this.form.rateTimeRange))
        } else {
          this.$set(this.form, "rateTimeRangeArr", [{
            startTime: "",
            endTime: ""
          }])

        }


      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
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
              message: '成功删除所选设备昵称!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除设备昵称操作',
            type: 'info'
          });
        });
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.backgroundImage = res.data.url;
          }
        })
      },

    }
  }

</script>
<style>
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

</style>