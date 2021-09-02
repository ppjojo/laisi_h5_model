<template>
  <div class="app-container">
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
        <el-divider content-position="left">各国绑定数量</el-divider>
        <div class="divBox clearfix">
          <div v-for="item in countryList" v-if="item.country" class="divItem">
            <div class="dataBox">
              <p :title="item.country">{{item.country}}</p>
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
  </div>
</template>

<script>
  import {
    usaDeviceTotal,eurDeviceTotal,eurDeviceVerdion,
    usaDeviceVerdion,groupByCountry,
    deviceDayList
  } from '@/api/dataReport/overseasDeviceReport'
  import {
    listItem as productListItem
  } from '@/api/device/productList'

  export default {
    name: 'Dashboard',
    data() {
      return {
        totalList: [],
        versionList: [],
        loading: false,
        totalNum: 0,
        dayList: [],
        deviceTypeList: [],
        deviceList: [],
        countryList:[],
        searchForm: {
          currentFirmware: null,
          getFirmware: null,
          currentResoure: null,
          getResouce: null,
          platform: null
        }
      }
    },
    created() {
      this.getDeviceTotal();
      this.getDeviceVersion();
      this.getCountry();
      // this.searchDevice()
      // this.getProductList()
    },
    methods: {
      getDeviceTotal() {
        usaDeviceTotal().then(res => {
           eurDeviceTotal().then(res2 => {
             let allarr = []
               res.data.bindGroup.forEach(d=>{
                 res2.data.bindGroup.forEach(e=>{
                    if(d.deviceModel == e.deviceModel){
                      let obj = {};
                      obj.deviceModel = d.deviceModel;
                      obj.bindCount = d.bindCount + e.bindCount;
                      allarr.push(obj);
                    }
                 })
               })
               this.totalList = [];
               allarr.forEach(e => {
                 if (e.deviceModel == "") return
                 this.totalNum += e.bindCount
               });
               allarr.sort(function(a, b) {
                 let x = a["bindCount"]
                 let y = b["bindCount"]
                 return ((x < y) ? 1 : (x > y) ? -1 : 0)
               });
               this.totalList = allarr;

              let day1 = this.get20Day(res.data.bindGroup,res.data.bindDaily);
              let day2 = this.get20Day(res2.data.bindGroup,res2.data.bindDaily);
              day1.forEach(d=>{
                day2.forEach(e=>{
                  if(d.date == e.date){
                    for (var key in d ) {
                      if(key!='date'){
                        d[key] += e[key];
                      }
                    }
                  }
                })
              })
              this.dayList = day1;
           })
        })
        // usaDeviceTotal().then(res => {
        //   this.totalList = [];
        //   let bindGroup = res.data.bindGroup;
        //   bindGroup.forEach(e => {
        //     if (e.deviceModel == "") return
        //     this.totalNum += e.bindCount
        //   });

        //   bindGroup.sort(function(a, b) {
        //     let x = a["bindCount"]
        //     let y = b["bindCount"]
        //     return ((x < y) ? 1 : (x > y) ? -1 : 0)
        //   });
        //   this.totalList = bindGroup;
        //   this.get20Day(res.data.bindGroup,res.data.bindDaily);
        // })
      },
      getCountry(){
        groupByCountry({}).then(res=>{
          let datalist = JSON.parse(JSON.stringify(res.data));
          let obj = {country:null,count:0};
          datalist.forEach(d=>{
            if(!d.country)obj.count+=d.count;
          })
          if(obj.count>0)obj.country = '其他';
          datalist.push(obj);
          this.countryList = datalist;
        })
      },
      getDeviceVersion() {
        usaDeviceVerdion().then(res => {
          eurDeviceVerdion().then(res2 => {
            var array1 = res.data;
            var array2 = res2.data;
            var a2length = res2.data.length;
            var a1length = res.data.length;
            var result = [];
            for(var i = 0; i < a2length; i++){
                var obj = array2[i];
                var num = obj.currentFirmware;
                var isExist = false;
                for(var j = 0; j < a1length; j++){
                    var aj = array1[j];
                    var n = aj.currentFirmware;
                    if(n == num){
                        isExist = true;
                        aj.versionCount += obj.versionCount;
                        break;
                    }
                }
                if(!isExist){
                    result.push(obj);
                }
            }
            result.forEach(d=>{
              array1.push(d);
            });
            this.versionList = array1;
          })
          // this.versionList = res.data;
        })
      },
      searchDevice() {
        let para = this.searchForm;
        usasearchDevice(para).then(res => {
          this.deviceList = res.data;
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
      get20Day(group,daily) {
        let objarr = [];
        daily.forEach(d=>{
          let obj = {};
          obj.date = d.date;
          obj.bindCount = 0;
          obj.unbindCount = 0;
          group.forEach((e) => {
            for(var key in e){
              if(key!='bindCount'){
                obj[e[key]] = d[e[key]]?d[e[key]].bindCount:0;
                obj.bindCount += d[e[key]]?d[e[key]].bindCount:0;
                obj.unbindCount += d[e[key]]?d[e[key]].unbindCount:0;
              }
            }
          })
          objarr.push(obj);
        })
        return objarr;
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
      }
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
