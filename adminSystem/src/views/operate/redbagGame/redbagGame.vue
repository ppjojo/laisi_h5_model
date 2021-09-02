<template>
  <div class="app-container">
    <div class="container-search">
      <!-- <el-form :inline="true" :model="searchForm">
        <el-form-item label="红包赛名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchList()">查询</el-button>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">新增红包赛</el-button>
    </div>
    <div style="padding-bottom: 20px;" class="">
      总余额：{{(leftAmount.totalAmountAll/100).toFixed(2)}}  待兑换总余额：{{(leftAmount.availableTotalAmountAll/100).toFixed(2)}}
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column align="center" prop="name" label="红包赛名称">
      </el-table-column>
      <el-table-column align="center" prop="totalAttend" label="报名人数">
      </el-table-column>
      <el-table-column align="center" prop="totalAmount" label="奖池金额(元)">
        <template slot-scope="scope">
          {{scope.row.totalAmount/100}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间">
        <template slot-scope="scope">
          {{scope.row.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结束时间">
        <template slot-scope="scope">
          {{scope.row.endTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center"  label="一元体验组人数">
        <template slot-scope="scope">
          {{freeGroup(scope.row.priceAndCountList)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini"
            v-if="checkPer('edit')&&scope.row.startTime>=nowDate">编辑
          </el-button>
          <el-button @click="btn_typeDetail(scope.row)" type="text" style="color:#90a4ff;" size="mini"
            v-if="checkPer('edit')">期数详情
          </el-button>
          <el-button @click="btn_redbagDetail(scope.row)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('edit')&&(nowDate>scope.row.endTime)">瓜分详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'红包赛'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="红包赛名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="startTime">
          <el-date-picker v-model.number="form.startTime" :disabled="dialogTitle=='编辑'" type="datetime"
            format="yyyy-MM-dd HH:mm" :picker-options="pickerOptions" value-format="timestamp" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime">
          <el-date-picker v-model.number="form.endTime" :disabled="dialogTitle=='编辑'" type="datetime"
            format="yyyy-MM-dd HH:mm" value-format="timestamp" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <template v-for="(item,index) in form.priceAndCountList">
          <el-row type="flex" align="top">
            <el-col :span="7">
              <div class="grid-content">
                <el-form-item :label="'档位'+(index+1)+'金额'" :prop="'priceAndCountList.'+index+'.price'"
                  :rules="rules.price">
                  <el-input placeholder="" v-model="item.price"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content">
                <el-form-item :label="'档位'+(index+1)+'数量'" :prop="'priceAndCountList.'+index+'.ropeCount'"
                  :rules="rules.ropeCount">
                  <el-input placeholder="" v-model.number="item.ropeCount"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-form-item :label="'档位'+(index+1)+'类型'" :prop="'priceAndCountList.'+index+'.type'"
                  :rules="rules.type">
                  <el-select v-model="item.type" clearable placeholder="请选择">
                    <el-option  label="付费" :value="0"></el-option>
                    <el-option  label="免费" :value="1"></el-option>
                  </el-select>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4" style="padding-left: 20px;padding-top: 5px;text-align: right;">
              <el-button @click="delType(index)" v-if="form.priceAndCountList.length>1" type="danger" size="mini">删除档位
              </el-button>
            </el-col>
          </el-row>
        </template>
        <div style="text-align: right;">
          <el-button type="primary" size="mini" @click="addType">新增档位</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--期数详情-->
    <el-dialog :title="dialogTitle+'详情'" :visible.sync="dialogTypeVisible" width="75%">
      <el-button type="danger" style="margin-bottom: 20px;" v-if="checkPer('finished')&&(nowDate<form.endTime)"
        size="mini" @click="setALL()">全员完成比赛</el-button>
      <el-table :data="typeDetailList" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="name" label="组别名称">
        </el-table-column>
        <el-table-column align="center" prop="totalAttend" label="报名人数">
        </el-table-column>
        <el-table-column align="center" prop="totalAmount" label="组别奖池金额(元)">
          <template slot-scope="scope">
            {{scope.row.totalAmount/100}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="okCount" label="完成人数">
        </el-table-column>
        <el-table-column align="center" prop="failCount" label="失败人数">
        </el-table-column>
        <el-table-column align="center" prop="getEndPrice" label="瓜分金额(元)">
          <template slot-scope="scope">
            {{scope.row.getEndPrice/100}}
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTypeVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--瓜分详情-->
    <el-dialog :title="dialogTitle+'瓜分详情'" :visible.sync="dialogRedbagVisible" width="75%">
      <div class="container-search">
          <el-form :inline="true" :model="searchForm">
              <el-form-item label="用户ID：">
                  <el-input v-model="searchForm.uid"  clearable></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="success" @click="searchUid()">查询</el-button>
              </el-form-item>
          </el-form>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <div style="margin-bottom: 10px;">
          <el-button size="mini" type="primary" @click="btn_select(1)">全部({{this.allArr.length}})</el-button>
          <el-button type="success" size="mini" @click="btn_select(2)">筛选成功({{this.successArr.length}})</el-button>
          <el-button type="danger" size="mini" @click="btn_select(3)">筛选失败({{this.faildArr.length}})</el-button>
        </div>
        <el-tab-pane v-for="(item,index) in redbagDetailList.priceAndCountList" :label="item.name" :name="item.id">
          <el-table :data="showArr" element-loading-text="Loading" border fit highlight-current-row size="small ">
            <el-table-column align="center" prop="userId" label="用户ID">
            </el-table-column>
            <el-table-column align="center" label="昵称">
              <template slot-scope="scope">
                {{scope.row.userAccount.nickName}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="ropeSkippingCount" label="跳绳个数">
            </el-table-column>
            <el-table-column align="center" label="完成情况">
              <template slot-scope="scope">
                {{scope.row.status==1?'完成':'失败'}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="完成时间">
              <template slot-scope="scope" v-if="scope.row.status==1">
                {{scope.row.updateTime | formatDate}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="totalAmount" label="投入金额(元)">
              <template slot-scope="scope">
                {{item.price?item.price/100:0}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="totalAmount" label="瓜分金额(元)">
              <template slot-scope="scope" v-if="scope.row.status==1">
                {{scope.row.bonus?scope.row.bonus/100:0}}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogRedbagVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    ropeRedPoolInsert as addItem,
    ropeRedPoolAll as listItem,
    ropeRedPoolUpdate as updateItem,
    poolTypeDetail,typeDel,redbagDetail,setAllOk,queryUserAmountAll
  } from '@/api/operate/redbagGame/redbagGame'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
  import Pagination from "@/components/pagination";

  export default {
    components: {
      Pagination
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          // 1: 'gray',
          0: 'danger'
        }
        return statusMap[status]
      },
      formatDate(time) {
        time = time
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }

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
        page: 0,
        limit: 10,
        total: 0,
        dialogVisible: false,
        dialogTypeVisible: false, //期数
        typeDetailList: [], //期数详情
        dialogRedbagVisible: false, //瓜分
        redbagDetailList: {
          priceAndCountList: []
        }, //瓜分详情
        showArr: [],
        allArr: [],
        successArr: [],
        faildArr: [],
        activeName: null,
        activeIndex: 0,
        resetRedBagList: {
          priceAndCountList: []
        },
        form: {
          name: '',
          startTime: null,
          endTime: null,
          priceAndCountList: [],
        },
        leftAmount:{
          availableTotalAmountAll:0,
          totalAmountAll:0
        },
        nowDate: new Date().getTime(),
        pickerOptions: {
          disabledDate(time) {
            //如果没有后面的-8.64e7就是不可以选择今天的
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        searchForm: {uid:null},
        rules: {
          ropeCount: [{
              required: true,
              message: '请填写跳绳数量',
              trigger: 'blur,change'
            },
            {
              pattern: /^\+?[0-9]\d*$/,
              message: "请输入大于等于0的正整数",
              trigger: "blur"
            },
          ],
          price: [{
            required: true,
            message: '请填写金额',
            trigger: 'blur,change'
          }, ],
          startTime: [{
            required: true,
            message: '请选择开始时间',
            trigger: 'blur,change'
          }, ],
          endTime: [{
            required: true,
            message: '请选择结束时间',
            trigger: 'blur,change'
          }, ],
          name: [{
            required: true,
            message: '请填写名称',
            trigger: 'blur,change'
          }, ],
          type: [{
            required: true,
            message: '请选择类型',
            trigger: 'blur,change'
          }, ],

        },

      }
    },
    mounted() {
      this.getList();
      this.getLeftAmount();
    },
    methods: {
      getList() {
        listItem({
          offset: this.page,
          limit: this.limit
        }).then(res => {
          this.list = res.data.collect
          this.total = res.data.count
          this.loading = false
        })
      },
      searchList() {
        searchListItem({
          offset: this.page,
          limit: this.limit,
          ...this.searchForm
        }).then(res => {
          this.list = res.data.collect
          this.total = res.data.count
          this.loading = false
        })
      },
      searchUid(){
        if(!this.searchForm.uid){
          this.showArr = this.allArr;
          return;
        }
        let obj = this.showArr.find((element) => (element.userId == this.searchForm.uid));
        if(obj)this.showArr = [obj]
        else this.showArr = []
      },
      getLeftAmount(){
        queryUserAmountAll({}).then(res=>{
          this.leftAmount = res.data;
        })
      },
      // 上下分页
      handleCurrentChange(val) {
        this.page = val - 1;
        this.getList()
      },
      // 每页显示多少条
      handleSizeChange(val) {
        this.limit = val;
        this.getList()
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            this.form.priceAndCountList.forEach(d => {
              d.price = d.price * 100;
            })
            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {
                this.getList();
                this.$notify({
                  type: 'success',
                  message: '成功新增' + this.form.name
                });
              })
            } else {
              updateItem(this.form).then(response => {
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.form.name
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
          name: '',
          startTime: null,
          endTime: null,
          priceAndCountList: [{
            price:1,
            ropeCount:500,
            type:1
          },{
            price:3,
            ropeCount:1000,
            type:0
          },{
            price:5,
            ropeCount:3000,
            type:0
          },{
            price:10,
            ropeCount:5000,
            type:0
          },{
            price:20,
            ropeCount:10000,
            type:0
          }],
        }
      },
      btn_edit(row) {
        this.dialogTitle = "编辑"
        this.form = JSON.parse(JSON.stringify(row));
        this.form.priceAndCountList.forEach(d => {
          d.price = d.price / 100;
        })
        this.dialogVisible = true;
      },
      //每期详情
      btn_typeDetail(row) {
        poolTypeDetail({
          poolId: row.id,
        }).then(response => {
          let detail = response.data;
          this.dialogTitle = row.name;
          detail.forEach(d => {
            row.priceAndCountList.forEach(e => {
              if (d.typeId == e.id) {
                d.name = e.name;
              }
            })
          });
          this.typeDetailList = detail;
          this.form = JSON.parse(JSON.stringify(row));
          this.dialogTypeVisible = true;
        })
      },
      //删除档位
      delType(index) {
        this.$confirm('确认删除该档位吗?', '提示', {
          type: 'warning'
        }).then(() => {
          if (!this.form.priceAndCountList[index].id) {
            this.form.priceAndCountList.splice(index, 1);
            return;
          }
          typeDel({
            id: this.form.priceAndCountList[index].id
          }).then(res => {
            this.form.priceAndCountList.splice(index, 1);
            this.getList();
          })
        }).catch(() => {

        });
      },
      //新增档位
      addType() {
        this.form.priceAndCountList.push({
          type:0
        });
      },
      //瓜分详情
      btn_redbagDetail(row) {
        redbagDetail({
          poolId: row.id
        }).then(res => {
          this.resetRedBagList = JSON.parse(JSON.stringify(res.data));
          this.redbagDetailList = JSON.parse(JSON.stringify(res.data));
          this.dialogTitle = row.name;
          this.activeName = this.resetRedBagList.priceAndCountList[0].id;
          // this.showArr = this.resetRedBagList.priceAndCountList[0].ropeRedTypeInfoList;
          this.handleClick({
            index: 0
          }, null);
          this.dialogRedbagVisible = true;
        });
      },
      handleClick(tab, event) {
        this.showArr = [];
        this.successArr = [];
        this.faildArr = [];
        this.activeIndex = parseInt(tab.index);
        this.showArr = this.resetRedBagList.priceAndCountList[this.activeIndex].ropeRedTypeInfoList;
        this.allArr = this.resetRedBagList.priceAndCountList[this.activeIndex].ropeRedTypeInfoList;
        this.resetRedBagList.priceAndCountList[this.activeIndex].ropeRedTypeInfoList.forEach(d => {
          if (d.status == 1) this.successArr.push(d)
          else this.faildArr.push(d);
        });
      },
      //瓜分详情
      btn_select(flag) { //1-全部2-成功3-失败
        if (flag == 1) {
          this.showArr = this.allArr;
        } else if (flag == 2) {
          this.showArr = this.successArr;
        } else {
          this.showArr = this.faildArr;
        }
      },
      setALL() {
        this.$confirm('确认要全员一键完成吗?', '提示', {
          type: 'warning'
        }).then(() => {
          setAllOk({
            poolId: this.form.id
          }).then(res => {

          })
        }).catch(() => {

        });
      },
      freeGroup(item){
        let str = "无";
        item.forEach(d=>{
          if(d.type==1){
            str = d.totalAttend;
          }
        })
        return str;
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

  /deep/.el-tabs__item.is-active {
    color: #E60707 !important;
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
