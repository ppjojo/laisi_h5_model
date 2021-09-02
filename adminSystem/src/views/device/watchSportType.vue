<template>
  <div class="app-container">
    <div>
      <el-table :data="options" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="label" width="100" label="手表名称">
        </el-table-column>
        <el-table-column align="center" label="运动类型">
          <template scope="scope">
            {{scope.row.sportType?scope.row.sportType.toString():''}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template scope="scope">
            <el-button @click="btn_view(scope.row)" type="text" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增和编辑界面-->
    <el-dialog :title="'编辑'" :visible.sync="dialogVisible" width="80%">
      <el-transfer v-model="sportType" target-order="push" :titles="['运动类型','按顺序加入']" :data="list"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listItem,
    addItem,
    deleteItem
  } from '@/api/device/watchSportType'
  import {
    listItem as productListItem
  } from '@/api/device/productList'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    getUInfo
  } from '@/utils/auth'

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
        deviceModel: '',
        sportType: [],
        calorySportType: [],
        options: [{
          value: 'other',
          label: 'other'
        }, ],
        list: [{
            label: '跳绳-ropeSkipping',
            key: 'ropeSkipping',
            disabled: false
          },
          {
            label: '健走-walk',
            key: 'walk'
          }, {
            label: '户外跑-runout',
            key: 'runout'
          }, {
            label: '室内跑-runin',
            key: 'runin'
          }, {
            label: '户外骑行-ride',
            key: 'ride'
          }, {
            label: '室内骑行-rideIndoor',
            key: 'rideIndoor'
          }, {
            label: '徒步-onFoot',
            key: 'onFoot'
          }, {
            label: '爬山-mountaineering',
            key: 'mountaineering'
          }, {
            label: '羽毛球-badminton',
            key: 'badminton'
          }, {
            label: '足球-football',
            key: 'football'
          }, {
            label: '篮球-basketball',
            key: 'basketball'
          }, {
            label: '网球-tennis',
            key: 'tennis'
          }, {
            label: '跳舞-dancing',
            key: 'dancing'
          }, {
            label: '瑜伽-yoga',
            key: 'yoga'
          }, {
            label: '自由训练-freeTraining',
            key: 'freeTraining'
          }, {
            label: '越野跑-trailRun',
            key: 'trailRun'
          }, {
            label: '室内游泳-swimming',
            key: 'swimming'
          }, {
            label: '室内健走-walkIn',
            key: 'walkIn'
          }, {
            label: '划船机-rower',
            key: 'rower'
          }, {
            label: '椭圆机-elliptical',
            key: 'elliptical'
          }, {
            label: '室外游泳-swimmingOut',
            key: 'swimmingOut'
          }
        ],
        allDevice: [],
        choosedDevice: {
          deviceModel: null,
          sportType: [],
          calorySportType: []
        },
        loading: false,
        form: {},
        dialogVisible:false,
      }
    },
    mounted() {
      this.getWatchList();
      // this.getList()
    },
    methods: {
      getList() {
        listItem({}).then(res => {
          this.allDevice = res.data;
        })
      },
      getWatchList() {
        productListItem({}).then(res => {
          listItem({}).then(res2 => {
            this.allDevice = res2.data;
            let allarr = res.data;
            allarr.forEach(d => {
              if (d.deviceType == 'watch') {
                let obj = {};
                obj.value = obj.label = d.deviceModel;
                this.options.unshift(obj);
              }
            })
            this.allDevice.forEach(d => {
              this.options.forEach(e => {
                if (e.label == d.deviceModel) {
                  e.sportType = d.sportType
                }
              })
            });
          })
        })
      },
      btn_view(row) {
        let flag = false;
        this.allDevice.forEach(d => {
          if (row.label == d.deviceModel) {
            flag = true;
            this.choosedDevice = d;
            this.sportType = d.sportType;
            // this.calorySportType = d.calorySportType;
          }
        });
        if (!flag) {
          this.sportType = [];
          // this.calorySportType = [];
          this.choosedDevice = {
            deviceModel: null,
            sportType: [],
            calorySportType: []
          }
          this.choosedDevice.deviceModel = row.label;
        }
        this.dialogVisible = true;
      },
      //保存
      submitForm() {
        // if (this.sportType.length == 0) return;
        this.choosedDevice.sportType = this.sportType;
        // this.choosedDevice.calorySportType = this.calorySportType;
        addItem(this.choosedDevice).then(response => {
          this.options = [{
          value: 'other',
          label: 'other'
        }];
          this.getWatchList()
          this.$notify({
            type: 'success',
            message: '操作成功'
          });
          this.dialogVisible = false;
        })
      },
    }
  }
</script>
