<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加奖池</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="奖池ID" width="65">
        <template slot-scope="scope">
          {{ scope.row.AwardPool.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="奖池名称">
        <template slot-scope="scope">
          {{ scope.row.AwardPool.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="奖池商品及数量">
        <template slot-scope="scope">
          <span v-for="item in scope.row.Award">
            {{item.name+"*"+item.count+"、"}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" width="140">
        <template slot-scope="scope">
          {{scope.row.AwardPool.startTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" width="140">
        <template slot-scope="scope">
          {{scope.row.AwardPool.endTime | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑</el-button>
          <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>



    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'奖池'" :visible.sync="dialogVisible" width="70%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="奖池名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入奖池名称"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="startTime">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.startTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效期(天)：" prop="term">
          <el-input v-model="form.term" type="number" placeholder="兑换或开奖后几天有效"></el-input>
        </el-form-item>
        <el-divider content-position="left">奖品</el-divider>
        <el-form-item v-for="(domain, index) in form.activityAwardPoolItemList" v-if="domain.awardStatus!=0" :label="'奖品' + (index+1)"
          :key="domain.key">
          <el-row type="flex" justify="space-between">
            <el-col :span="6">
              <el-form-item :prop="'activityAwardPoolItemList.'+index+'.awardClass'" :rules="rules.awardClass">
                <el-select v-model="domain.awardClass" @change="AwardSelect(index)" filterable placeholder="请选择" prop="id">
                  <el-option v-for="(item,sindex) in awardList" :key="item.awardClass" :label="item.name" :value="item.awardClass">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :prop="'activityAwardPoolItemList.'+index+'.awardCount'" :rules="rules.awardCount">
                <el-input @input="dataRender()" v-model.number="domain.awardCount" placeholder="奖品数量" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button size="mini" @click.prevent="removeItem(domain,index,1)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="addAward(1)">新增奖品</el-button>
        </el-form-item>
        <el-divider content-position="left">红包（红包金额单位为分！）红包个数---红包总金额---红包最小金额---红包最大金额</el-divider>

        <el-form-item v-for="(domain, index) in form.activityRedPacketPoolList" v-if="domain.awardStatus!=0" :label="'红包' + (index+1)"
          :key="domain.key">
          <el-row type="flex" justify="space-between">
            <el-col :span="4">
              <el-form-item :prop="'activityRedPacketPoolList.'+index+'.totalSize'" :rules="rules.awardCount">
                <el-input @input="redbagcount(domain)" v-model.number="domain.totalSize" placeholder="红包个数" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'activityRedPacketPoolList.'+index+'.totalMoney'" :rules="rules.awardCount">
                <el-input @input="dataRender()" v-model.number="domain.totalMoney" placeholder="红包总金额" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'activityRedPacketPoolList.'+index+'.lowerLimit'" :rules="rules.awardCount">
                <el-input @input="dataRender()" v-model.number="domain.lowerLimit" placeholder="红包最小金额" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'activityRedPacketPoolList.'+index+'.upperLimit'" :rules="rules.awardCount">
                <el-input @input="dataRender()" v-model.number="domain.upperLimit" placeholder="红包最大金额" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button size="mini" @click.prevent="removeItem(domain,index,2)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" v-if="addnewRedbagFlag()" @click="addAward(2)">新增红包
          </el-button>
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
    deleteItem,
    viewItem
  } from '@/api/operate/pointLottery/awardPool'
  import {
    listItem as awardListItem
  } from '@/api/operate/pointLottery/awardSet'
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
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
        awardList: [],

        dialogVisible: false,
        form: {

        },
        rules: {
          name: [{
            required: true,
            message: '请填写奖池名称',
            trigger: 'blur,change'
          }, ],
          startTime: [{
            required: true,
            message: '请选择时间',
            trigger: 'blur,change'
          }, ],
          endTime: [{
            required: true,
            message: '请选择时间',
            trigger: 'blur,change'
          }, ],
          term: [{
            required: true,
            message: '请选择有效期',
            trigger: 'blur,change'
          }, {
            pattern: /^\+?[1-9]\d*$/,
            message: "请输入大于等于1的正整数",
            trigger: "blur"
          }, ],
          awardClass: [{
            required: true,
            message: '请填写',
            trigger: 'blur,change'
          }],
          awardCount: [{
            required: true,
            message: '请填写',
            trigger: 'blur,change'
          }, {
            pattern: /^\+?[1-9]\d*$/,
            message: "请输入大于等于1的正整数",
            trigger: "blur"
          }, ]

        },


      }
    },
    mounted() {
      this.getList()
      this.getExchangeAwardList()
    },
    methods: {
      getList() {
        listItem({
          page: this.page,
          pageSize: this.limit
        }).then(res => {
          this.list = res.data
          this.loading = false
        })
      },
      getExchangeAwardList() {
        awardListItem({}).then(res => {
          res.data.data.forEach((item, index) => {
            if (item.type == 5 || item.type == 4 || item.type == 3) {
              item.awardClass = item.id;
              this.awardList.push(item)
            }
          })
        })
      },

      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogTitle == "新增") {
              addItem(this.form).then(response => {
                this.dialogVisible = false
                this.getList()
                this.$notify({
                  type: 'success',
                  message: '成功新增' + this.form.name
                });
              })
            } else {
              updateItem(this.form).then(response => {
                this.dialogVisible = false
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
          activityAwardPoolItemList: [{
            awardClass: '',
            awardCount: 0
          }],
          activityVoucherPoolList: [],
          activityRedPacketPoolList: [],
          id: null,
          name: null,
          endTime: null,
          startTime: null,
        }
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        viewItem({
          id: row.AwardPool.id
        }).then(res => {
          this.form = Object.assign({}, res.data)
        })

      },
      //删除
      btn_delete(row) {
        this.$confirm('此操作将永久删除该奖池, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem({
            id: row.AwardPool.id,
          }).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功删除所选奖池!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除操作',
            type: 'info'
          });
        });
      },
      removeItem(item, index, type) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          if (type == 1) {
            this.form.activityAwardPoolItemList[index].awardStatus = 0;
            if (!this.form.activityAwardPoolItemList[index].id) this.form.activityAwardPoolItemList.splice(index, 1)
          } else if (type == 2) {
            this.form.activityRedPacketPoolList[index].awardStatus = 0;
            if (!this.form.activityRedPacketPoolList[index].id) this.form.activityRedPacketPoolList.splice(index, 1);

            this.addnewRedbagFlag();
          } else {
            this.form.activityVoucherPoolList[index].awardStatus = 0;
            if (!this.form.activityVoucherPoolList[index].id) this.form.activityVoucherPoolList.splice(index, 1)
          }
          this.getList()
        }).catch(() => {

        });

      },
      addAward(type) { //新增红包或者奖品
        if (type == 2) { //红包
          if (!this.form.activityRedPacketPoolList) this.form.activityRedPacketPoolList = [];
          this.form.activityRedPacketPoolList.push({
            awardStatus: 1
          });
        } else if (type == 1) { //奖品
          if (!this.form.activityAwardPoolItemList) this.form.activityAwardPoolItemList = [];
          this.form.activityAwardPoolItemList.push({
            awardStatus: 1
          });
        } else { //代金券
          if (!this.form.activityVoucherPoolList) this.form.activityVoucherPoolList = [];
          this.form.activityVoucherPoolList.push({
            awardStatus: 1,
            // awardClass: 3,
            endTime: "2021-10-16 00:00:00",
            voucherActivityId: 111
          });
        }
        this.$forceUpdate();
      },
      AwardSelect(index, iscoupon) { //选择奖品后的回调要穿一下默认参数
        if (iscoupon) {
          let arr = this.couponList.filter(item => [this.form.activityVoucherPoolList[index].awardClass].indexOf(
            item.id) > -1);
          this.form.activityVoucherPoolList[index].awardType = arr[0].type;
          this.form.activityVoucherPoolList[index].awardClass = arr[0].id;
          this.form.activityVoucherPoolList[index].leftCount = parseInt(arr[0].leftCount);
        } else {
          let arr = this.awardList.filter(item => [this.form.activityAwardPoolItemList[index].awardClass].indexOf(
            item.id) > -1);
          this.form.activityAwardPoolItemList[index].awardType = arr[0].type;
          this.form.activityAwardPoolItemList[index].leftCount = parseInt(arr[0].leftCount);
          if (arr[0].type == 3) this.form.activityAwardPoolItemList[index].awardGroupId = arr[0].voucherGroupId;
        }

      },
      redbagcount(item) { //添加红包时候剩余数量就是总量
        item.leftCount = item.count;
      },
      dataRender() {
        this.$forceUpdate()
      },
      awardstr(arr) { //返回列表奖池的数量
        let strarr = [];
        arr.forEach((item, index) => {
          let str = "";
          str += item.name + "*" + item.count;
          strarr.push(str);
        })
        return strarr.toString();
      },
      addnewRedbagFlag() {
        let flag = true;
        if (!this.form.activityRedPacketPoolList) return true;
        this.form.activityRedPacketPoolList.forEach((item, index) => {
          if (item.awardStatus != 0) flag = false;
        });
        return flag;
      }
    },
  }
</script>
