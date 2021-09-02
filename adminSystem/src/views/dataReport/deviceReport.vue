<template>
  <div class="app-container">
    <div class="totalNum">
      当前绑定的设备总数：
      <span>{{totalNum}}</span>
    </div>

    
    <el-divider content-position="left">{{skipCount}} 跳绳的细分</el-divider>
    <div class="divBox clearfix">
      
      <div  class="divItem" v-for="(item ,key,index) in skippingBindCount">
        <div class="dataBox">
          <p>{{key}}</p>
          <p>{{skippingBindCount[key]}}</p>
        </div>
      </div>
      
    </div>

<el-divider content-position="left">{{watchCount}} 手表的细分</el-divider>
    <div class="divBox clearfix">
      <div  class="divItem" v-for="(item ,key,index) in watchBindCount">
        <div class="dataBox">
          <p>{{key}}</p>
          <p>{{watchBindCount[key]}}</p>
        </div>
    </div>
    </div>

    <el-divider content-position="left">总绑定数据</el-divider>
    <div class="divBox clearfix">
      <div v-for="item in totalList" v-if="item.deviceType"  class="divItem">
        <div class="dataBox"
         @click="dialogTypeVisible = true"
         style="display: flex;align-items: center;justify-content: space-between;cursor: pointer;" v-if="item.deviceType=='skipping'">
          <div>
            <p>skipping</p>
            <p>{{item.total}}</p>
          </div>
          <div>
            <i style="font-size: 30px;color: #fff;" class="el-icon-arrow-right"></i>
          </div>
        </div>

        <div class="dataBox" v-else>
          <p>{{item.deviceType}}</p>
          <p>{{item.total}}</p>
        </div>
        
      </div>

    </div>
    <!--sheet详情-->
    <el-dialog  :visible.sync="dialogTypeVisible" width="75%">
      <el-table :data="sheetList" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="sheetName" label="品牌名">
        </el-table-column>
        <el-table-column align="center" prop="sheetNameCount" label="品牌销售数量">
        </el-table-column>
        <el-table-column align="center" prop="sheetCode" label="品牌code">
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTypeVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-divider content-position="left">版本统计</el-divider>
    <div class="divBox clearfix">
      <div v-for="item in versionList" v-if="item.currentFirmware" class="divItem">
        <div class="dataBox">
          <p :title="item.currentFirmware">{{item.currentFirmware}}</p>
          <p>{{item.count}}</p>
        </div>
      </div>
    </div>

    <el-divider content-position="left"> 最近30天的新增绑定日报表数据</el-divider>

    <el-table highlight-current-row :data="dayList" size="small" border >
      <el-table-column align="center" prop="date" label="日期" width="120px" >
      </el-table-column>
      <el-table-column align="center" prop="dayTotal" label="新增所有设备总数">
      </el-table-column>
      <el-table-column align="center" prop="skipping" label="跳绳总数">
      </el-table-column>
      
      <el-table-column align="center" prop="t20" label="t20">
      </el-table-column>
      <el-table-column align="center" prop="t30" label="t30">
      </el-table-column>
      <el-table-column align="center" prop="t30l" label="t30l">
      </el-table-column>
      <el-table-column align="center" prop="s20" label="s20">
      </el-table-column>
      <el-table-column align="center" prop="t18" label="t18">
      </el-table-column>
      
      <el-table-column align="center" prop="watch" label="手表总数">
      </el-table-column>
      <el-table-column align="center" prop="w20" label="w20">
      </el-table-column>
      <el-table-column align="center" prop="w20max" label="w20max">
      </el-table-column>
      <el-table-column align="center" prop="w20pro" label="w20pro">
      </el-table-column>
      

     
      
      <el-table-column v-for="item in deviceTypeList" align="center" v-if="item.deviceType!='skipping'&&item.deviceType!='watch'" :prop="item.deviceType" :label="item.deviceName">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {
    deviceTotal,
    deviceDayList,sheetName,skippingBindCount,watchBindCount
  } from '@/api/dataReport/deviceReport'
  import {
    deviceVerdion
  } from '@/api/dataReport/overseasDeviceReport'
  import {
    listItem as productListItem
  } from '@/api/device/productList'

  export default {
    name: 'Dashboard',
    data() {
      return {
        totalList: [],
        versionList:[],
        totalNum: 0,
        dayList: [],
        deviceTypeList: [],
        sheetList:[],
        dialogTypeVisible:false,
        skippingBindCount:{},
        skipCount:0,
        watchBindCount:{},
        watchCount:0
      }
    },
    created() {
      this.getProductList()
      this.getSheetList()
      this.getDeviceTotal()
      this.getSkippingBindCount()
      this.getWatchBindCount()
      this.getDeviceVersion()
    },
    methods: {
      getSkippingBindCount(){
        skippingBindCount({}).then(res=>{
          this.skippingBindCount = res.data;
        })
      },
      getWatchBindCount(){
        watchBindCount({}).then(res=>{
          this.watchBindCount = res.data;
        })
      },
      getSheetList(){
        sheetName({}).then(res=>{
          this.sheetList = res.data;
        })
      },
      getDeviceVersion() {
        deviceVerdion().then(res => {
          this.versionList = res.data;
        })
      },
      getDeviceTotal() {
        deviceTotal().then(res => {
          this.totalList =res.data
          this.totalList.forEach(item=>{
            this.totalNum+=item.total
            if(item.deviceType=='skipping'){
              this.skipCount+=item.total
            }else if( item.deviceType=='watch'){
              this.watchCount+=item.total
            }
          })
          this.totalList.sort(function(a, b) {
            let x = a["total"]
            let y = b["total"]
            return ((x < y) ? 1 : (x > y) ? -1 : 0)
          })

        })
      },
      getDeviceDayList() {
        deviceDayList().then(res => {
          this.dayList = [];
          for (var key in res.data) {
            var dayTotal = 0;
            var dataListItem = {};
            dataListItem.date = key;
            var keyList = res.data[key]
            keyList.forEach(e => {
              dataListItem[e.deviceType] = e.total
              if(e.deviceType=="watch"||e.deviceType=="skipping"||e.deviceType=="wristball"||e.deviceType=="wheel"||e.deviceType=="earphone"||e.deviceType=="balance"||e.deviceType=="blebalance"||e.deviceType=="airStick"||e.deviceType=="other"){
                dayTotal += e.total
              }
              
            })

            dataListItem.dayTotal = dayTotal;
            this.dayList.push(dataListItem)
          }

          this.dayList=this.dayList.slice(0,30)
          //console.log(this.dayList)
          
        })
      },
      getProductList() {
        productListItem({}).then(res => {
          var obj = {};
          this.deviceTypeList = res.data.reduce((arr, next) => {
            obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
            return arr;
          }, []);
          // console.log(this.deviceTypeList)

          
          this.getDeviceDayList()

        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .totalNum {
    padding: 20px 0;
    font-size: 20px;

    span {
      font-size: 40px;
      line-height: 50px;
      color: #F56C6C
    }
  }

  .divBox {
    min-height: 200px;
    clear: both;
  }

  .clearfix:after {
    /*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    *zoom: 1;
    /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
  }

  .divItem {
    padding: 5px;
    border-radius: 5px;
    background-color: #909399;
    width: 30%;
    margin-right: 3%;
    margin-bottom: 20px;
    float: left;
    min-height: 80px;

    p {
      margin: 0;
      padding: 0;

      &:first-child {
        font-size: 18px;
        line-height: 30px;
        color: #DCDFE6;
      }

      &:last-child {
        font-size: 35px;
        line-height: 40px;
        color: #ffffff;
      }
    }

  }
</style>
