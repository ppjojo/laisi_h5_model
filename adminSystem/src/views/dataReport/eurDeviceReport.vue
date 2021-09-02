<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="绑定数据">
        <div class="totalNum">
          当前绑定的设备总数：
          <span>{{totalNum}}</span>
        </div>
        <el-divider content-position="left">总绑定数据</el-divider>
        <div class="divBox clearfix">
          <div v-for="item in totalList" v-if="item.deviceModel" class="divItem">
            <div class="dataBox">
              <p>{{item.deviceModel}}</p>
              <p>{{item.bindCount}}</p>
            </div>
          </div>
        </div>
        <el-divider content-position="left">版本统计</el-divider>
        <div class="divBox clearfix">
          <div v-for="item in versionList" v-if="item.currentFirmware" class="divItem">
            <div class="dataBox">
              <p :title="item.currentFirmware">{{item.currentFirmware}}</p>
              <p>{{item.count}}</p>
            </div>
          </div>
        </div>
        <el-divider content-position="left"> 最近20天的新增绑定日报表数据</el-divider>
        <el-table highlight-current-row :data="dayList" size="small" border>
          <el-table-column align="center" prop="date" label="日期" width="120px">
          </el-table-column>
          <el-table-column align="center" prop="bindCount" label="新增绑定数">
          </el-table-column>
          <el-table-column align="center" prop="unbindCount" label="新增解绑数">
          </el-table-column>
          <el-table-column v-for="item in totalList" align="center" :prop="item.deviceModel" :label="item.deviceModel">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="设备查询">
        <div class="container-search">
          <el-form :inline="true" :model="searchForm" ref="search">
            <el-form-item label="当前版本">
              <el-input v-model="searchForm.currentFirmware" placeholder="当前版本"></el-input>
            </el-form-item>
            <el-form-item label="下发版本">
              <el-input v-model="searchForm.getFirmware" placeholder="下发版本"></el-input>
            </el-form-item>
            <el-form-item label="当前资源">
              <el-input v-model="searchForm.currentResoure" placeholder="当前资源"></el-input>
            </el-form-item>
            <el-form-item label="下发资源">
              <el-input v-model="searchForm.getResouce" placeholder="下发资源"></el-input>
            </el-form-item>
            <el-form-item label="平台选择">
              <el-select v-model="searchForm.platform" placeholder="请选择" clearable>
                <el-option key="" label="请选择" value="">
                </el-option>
                <el-option key="android" label="android" value="android">
                </el-option>
                <el-option key="ios" label="ios" value="ios">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="searchDevice">查询</el-button>
              <el-button type="" @click="resetForm('search')">重置</el-button>
              <el-button type="primary" @click="exportExcel()">导出EXCEL</el-button>
              <!-- <JsonExcel class="export-excel-wrapper" :data="deviceList" :fields="json_fields" name="欧洲设备报表明细导出.xls" style="display: inline-block;margin-left: 10px;">
              </JsonExcel> -->
            </el-form-item>
          </el-form>
        </div>
        <el-table v-loading="loading" :data="deviceList" element-loading-text="Loading" border fit
          highlight-current-row size="small ">
          <el-table-column align="center" prop="userId" label="UserId"></el-table-column>
          <el-table-column align="center" prop="currentFirmware" label="当前版本"></el-table-column>
          <el-table-column align="center" prop="currentResoure" label="当前资源"></el-table-column>
          <el-table-column align="center" prop="getFirmware" label="下发版本"></el-table-column>
          <el-table-column align="center" prop="getResouce" label="下发资源"></el-table-column>
          <el-table-column align="center" prop="platform" label="平台"></el-table-column>
          <el-table-column align="center" prop="updateTime" label="修改日期"></el-table-column>
          <el-table-column align="center" prop="province" label="地域"></el-table-column>
          <el-table-column align="center" prop="country" label="国家"></el-table-column>
          <el-table-column align="center" prop="city" label="城市"></el-table-column>
          <el-table-column align="center" prop="county" label="地区"></el-table-column>
          <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
  import {
    eurDeviceTotal,
    eursearchDevice,
    eurDeviceVerdion,
    downloadEurExcel,
    deviceDayList
  } from '@/api/dataReport/overseasDeviceReport'
  import {
    listItem as productListItem
  } from '@/api/device/productList'
  import Pagination from "@/components/pagination";
  export default {
    name: 'Dashboard',
    components: {
    	Pagination
    },
    data() {
      return {
        totalList: [],
        versionList: [],
        loading: false,
        totalNum: 0,
        dayList: [],
        pageInfo:{
          page:0,
          pageSize:10,
        },
        total:0,
        deviceTypeList: [],
        deviceList: [],
        searchForm: {
          currentFirmware: null,
          getFirmware: null,
          currentResoure: null,
          getResouce: null,
          platform: null
        },
        json_fields: {
          "userId": "userId", //支持嵌套属性
          "当前版本": "currentFirmware", //常规字段
          "当前资源": "currentResoure", //支持嵌套属性
          "下发版本": "getFirmware", //常规字段
          "下发资源": "getResouce", //支持嵌套属性
          "平台": "platform", //常规字段
          "修改时间": "updateTime", //常规字段
        },

      }
    },
    created() {
      this.getDeviceTotal();
      this.getDeviceVersion();
      // this.searchDevice()
      // this.getProductList()
    },
    methods: {
      getDeviceTotal() {
        eurDeviceTotal().then(res => {
          this.totalList = [];
          let bindGroup = res.data.bindGroup;
          bindGroup.forEach(e => {
            if (e.deviceModel == "") return
            this.totalNum += e.bindCount
          });

          bindGroup.sort(function(a, b) {
            let x = a["bindCount"]
            let y = b["bindCount"]
            return ((x < y) ? 1 : (x > y) ? -1 : 0)
          });
          this.totalList = bindGroup;
          this.get20Day(res.data.bindGroup, res.data.bindDaily);
        })
      },
      getDeviceVersion() {
        eurDeviceVerdion().then(res => {
          this.versionList = res.data;
        })
      },
      searchDevice() {
        let para = this.searchForm;
        eursearchDevice(para,this.pageInfo).then(res => {
          this.deviceList = res.data.data;
          this.total = res.data.total
        })
      },
      exportExcel(){
        downloadEurExcel(this.searchForm).then(res=>{
          let fileName = "欧洲设备报表明细导出.xls";
          var blob = new Blob([res], {
            type: 'aplication/zip;charset=utf-8'
          })
          if (window.navigator.msSaveOrOpenBlob) { //msSaveOrOpenBlob方法返回bool值
            navigator.msSaveBlob(blob, fileName); //本地保存
          } else {
            var link = document.createElement('a'); //a标签下载
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
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
              dayTotal += e.total
            })

            dataListItem.dayTotal = dayTotal;
            this.dayList.push(dataListItem)
          }
        })
      },
      get20Day(group, daily) {
        let objarr = [];
        daily.forEach(d => {
          let obj = {};
          obj.date = d.date;
          obj.bindCount = 0;
          obj.unbindCount = 0;
          group.forEach((e) => {
            for (var key in e) {
              if (key != 'bindCount') {
                obj[e[key]] = d[e[key]] ? d[e[key]].bindCount : 0;
                obj.bindCount += d[e[key]] ? d[e[key]].bindCount : 0;
                obj.unbindCount += d[e[key]] ? d[e[key]].unbindCount : 0;
              }
            }
          })
          objarr.push(obj);
        })
        this.dayList = objarr
      },
      getProductList() {
        productListItem({}).then(res => {
          var obj = {};
          this.deviceTypeList = res.data.reduce((arr, next) => {
            obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
            return arr;
          }, []);

          this.getDeviceTotal()
          this.getDeviceDayList()

        })
      },
      resetForm(formName) {
        this.searchForm = {
          currentFirmware: null,
          getFirmware: null,
          currentResoure: null,
          getResouce: null,
          platform: null
        }
      },
      // 上下分页
      handleCurrentChange(val) {
      	this.pageInfo.page = val - 1;
      	this.searchDevice()
      },
      // 每页显示多少条
      handleSizeChange(val) {
      	this.pageInfo.pageSize = val;
      	this.searchDevice()
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

  /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #E60707 !important;
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
    width: 32%;
    margin-right: 1.2%;
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
        overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
      }

      &:last-child {
        font-size: 35px;
        line-height: 40px;
        color: #ffffff;
      }
    }

  }
</style>
