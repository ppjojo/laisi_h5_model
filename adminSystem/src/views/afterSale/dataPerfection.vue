<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :inline="true" label-width="140px" :rules="rules">
      <el-form-item label="用户ID" prop="accountId">
        <el-input v-model="form.accountId"></el-input>
      </el-form-item>
      <el-form-item label="MAC(大写)" prop="deviceMac">
        <el-input v-model="form.deviceMac"></el-input>
      </el-form-item>
      <el-form-item label="设备类型" prop="deviceType">
        <el-select v-model="form.deviceType" placeholder="请选择设备类型">
          <el-option label="跳绳" value="skipping"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号" prop="deviceModel">
        <!-- <el-select v-model="form.deviceModel" placeholder="请选择设备型号">
                    <el-option label="t20" value="t20"></el-option>
                    <el-option label="t20l" value="t20l"></el-option>
                    <el-option label="t18" value="t18"></el-option>
                    <el-option label="t30" value="t30"></el-option>
                    <el-option label="t30l" value="t30l"></el-option>
                </el-select> -->
        <el-input v-model="form.deviceModel"></el-input>
      </el-form-item>
      <el-form-item label="数据类型" prop="dataType">
        <el-select v-model="form.dataType" placeholder="请选择数据类型">
          <el-option label="skip" value="skip"></el-option>
        </el-select>
      </el-form-item>

      <el-divider content-position="left">具体数据</el-divider>
      <div v-for="(item,index) in form.dataList">
        <el-form-item label="跳绳模式" :prop="'dataList.'+index+'.mode'" :rules="rules.mustChoose">
          <el-select v-model="item.mode" placeholder="请选择跳绳模式">
            <el-option label="自由跳" value="1"></el-option>
            <el-option label="倒计时" value="2"></el-option>
            <el-option label="倒计数" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" :prop="'dataList.'+index+'.number'" :rules="rules.mustInput">
          <el-input v-model="item.number" @input="numChange"></el-input>
        </el-form-item>


        <div v-if="item.mode==2">
          <el-form-item label="模式值(秒)" :prop="'dataList.'+index+'.mode_value'" :rules="rules.mustInput">
            <el-input v-model="item.mode_value" @input="timeChange"></el-input>
          </el-form-item>
          <el-form-item label="跳绳时长(毫秒)" :prop="'dataList.'+index+'.dura_ms'" :rules="rules.mustInput">
            <el-input v-model="item.dura_ms" @input="timeChange2"></el-input>
          </el-form-item>
          <!-- <el-form-item label="活动时长(毫秒)" :prop="'dataList.'+index+'.active_ms'" :rules="rules.mustInput">
                        <el-input v-model="item.active_ms"></el-input>
                    </el-form-item> -->

        </div>
        <div v-else>
          <el-form-item label="模式值(个)" v-if="item.mode==3" :prop="'dataList.'+index+'.mode_value'"
            :rules="rules.mustInput">
            <el-input v-model="item.mode_value"></el-input>
          </el-form-item>
          <el-form-item label="跳绳时长(毫秒)" :prop="'dataList.'+index+'.dura_ms'" :rules="rules.mustInput">
            <el-input v-model="item.dura_ms" @input="timeChange2"></el-input>
          </el-form-item>
          <!-- <el-form-item label="活动时长(毫秒)" :prop="'dataList.'+index+'.active_ms'" :rules="rules.mustInput">
                        <el-input v-model="item.active_ms"></el-input>
                    </el-form-item> -->

        </div>




        <el-form-item label="消耗(cal)" :prop="'dataList.'+index+'.burn'" :rules="rules.mustInput">
          <el-input v-model="item.burn"></el-input>
        </el-form-item>
        <el-form-item label="数据时间" :prop="'dataList.'+index+'.timestamp'" :rules="rules.mustChoose">
          <el-date-picker v-model="item.timestamp" type="datetime" value-format="timestamp" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <div style="height: 30px;text-align: center;">
          <el-button style="margin: 0 auto;" type="primary" size="mini" @click="submitForm()" v-if="checkPer('add')">添加
          </el-button>
        </div>

        <el-divider content-position="left">JSON数据</el-divider>
        <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="jsonForm">
        </el-input>
      </div>
    </el-form>




  </div>
</template>

<script>
  import {
    addLostData
  } from '@/api/afterSale/dataPerfection'
  import {
    checkPermission
  } from '@/api/checkPermission'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
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
        form: {
          accountId: "",
          deviceType: "",
          deviceModel: "",
          deviceMac: "",
          dataType: "",
          dataList: [{
            category: 0,
            sub_category: 0,
            mode: "1", //1自由跳  2倒计时 3倒计数
            mode_value: "", //毫秒 或者倒计数量
            number: "",
            dura_ms: "",
            active_ms: "",
            burn: "",
            section: 1,
            real_section: 1,
            section_list: [{
              order: 0,
              count: "",
              duration: ""
            }, ],
            avg_number: 0,
            most_freq: 0,
            most_holding: 0,
            timestamp:new Date(),
            version: 2
          }]
        },
        jsonForm: {},
        rules: {
          accountId: [{
            required: true,
            message: '请输入用户ID',
            trigger: 'blur'
          }, ],
          deviceMac: [{
            required: true,
            message: '请输入蓝牙地址',
            trigger: 'blur'
          }, ],
          deviceType: [{
            required: true,
            message: '请选择设备类型',
            trigger: 'blur'
          }, ],
          deviceModel: [{
            required: true,
            message: '请选择设备型号',
            trigger: 'blur'
          }, ],
          dataType: [{
            required: true,
            message: '请选择数据类型',
            trigger: 'blur'
          }, ],
          mode: [{
            required: true,
            message: '请选择跳绳模式',
            trigger: 'blur'
          }, ],
          mode_value: [{
            required: true,
            message: '请输入模式值',
            trigger: 'blur'
          }, ],
          mustChoose: [{
            required: true,
            message: '必选',
            trigger: 'blur'
          }, ],
          mustInput: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }, ],


        },
      }
    },
    watch: {
      form: {
        handler(newName, oldName) {
          this.jsonForm = Object.assign({}, this.form);
          this.jsonForm = JSON.stringify(this.jsonForm, null, 4)

        },
        deep: true,
        immediate: true
      },

    },
    methods: {
      timeChange(value) {
        this.$set(this.form.dataList[0], "dura_ms", value * 1000);
        this.$set(this.form.dataList[0], "active_ms", value * 1000);
        this.$set(this.form.dataList[0], "burn", parseInt(value * 200));
        this.$set(this.form.dataList[0].section_list[0], "duration", value * 1000);
      },
      timeChange2(value) {
        this.$set(this.form.dataList[0], "active_ms", value);
        this.$set(this.form.dataList[0], "burn", parseInt(value * 0.2));
        this.$set(this.form.dataList[0].section_list[0], "duration", value);

        var avg_number = parseInt(this.form.dataList[0].number / (value / 60000));
        var most_freq = parseInt(avg_number * 1.4);

        this.$set(this.form.dataList[0], "avg_number", avg_number);
        this.$set(this.form.dataList[0], "most_freq", most_freq);

      },
      numChange(value) {
        var bpm = 150
        var time = parseInt(value / bpm * 60 * 1000)
        this.$set(this.form.dataList[0], "dura_ms", time);
        this.$set(this.form.dataList[0], "active_ms", time);
        this.$set(this.form.dataList[0], "burn", parseInt(time * 0.2));
        this.$set(this.form.dataList[0].section_list[0], "duration", time);
        this.$set(this.form.dataList[0], "avg_number", bpm);
        this.$set(this.form.dataList[0], "most_freq", bpm * 1.4);

        this.$set(this.form.dataList[0].section_list[0], "count", value);
        this.$set(this.form.dataList[0], "most_holding", value);
      },

      //保存
      submitForm(formName) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            var para = JSON.parse(this.jsonForm);
            if (para.dataList[0].avg_number > 379) {
              this.$message({
                showClose: true,
                message: "BPM必须小于379，请检查时间和个数",
                type: "error"
              });
              return;
            }
            para.userId = para.accountId;
            para.deviceMac = para.deviceMac.toUpperCase();
            para.dataList = JSON.stringify(para.dataList);

            addLostData(para)
              .then(res => {
                this.$notify({
                  type: 'success',
                  message: '成功完善' +para.userId + "的数据"
                });
                setTimeout(()=>{
                     this.$router.go(0)
                },1000)

              })

          }
        })

      },
    }
  }

</script>
<style>
  .el-form-item {
    width: 40%;
  }

</style>
