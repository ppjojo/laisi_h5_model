<template>
  <div id="app" class="memberDataDetail" v-cloak>
    <div class="header">
      <van-nav-bar title="小组成员数据" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
        <template #left>
          <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
        </template>
      </van-nav-bar>
    </div>
    <div class="chooseBox">
      <div class="peopleBox" @click="peopleListshow=true">
        <img class="imgBox" :src="userItem.headPictureUrl" alt="">
        <span>{{userItem.nickname}}</span>
        <span class="icon iconfont icon-xialaxuanxiang" />
      </div>
      <div class="dateBox" @click="dateshow=true">
        <span>{{currentDatestr}}</span>
        <span class="icon iconfont icon-xialaxuanxiang" />
      </div>
    </div>
    <div class="dataBox">
      <div v-for="(value,key) in recordData">
        <!-- 跳绳 -->
        <div class="dataItem" v-if="key=='skipRecord'&&value">
          <div class="typeBox">
            <img src="../img/group_ts.png" alt="">
            <span>跳绳</span>
          </div>
          <div class="detail">
            <div class="detailItem">
              <div class="numBox">{{recordData[key].number.toLocaleString()}}</div>
              <div class="numDesc">跳绳个数(个)</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{returnTime(recordData[key].takeMs)}}</div>
              <div class="numDesc">用时</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{parseInt(recordData[key].burn/1000).toLocaleString()}}</div>
              <div class="numDesc">消耗(kcal)</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{recordData[key].maxBpm||0}}</div>
              <div class="numDesc">最快频次(次/分)</div>
            </div>
            <div class="detailItem"></div>
            <div class="detailItem" v-if="recordData[key].doubleJump>0||recordData[key].tripleJump>0">
              <div class="numBox">{{(recordData[key].doubleJump||"--")+'/'+(recordData[key].tripleJump||"--")}}
              </div>
              <div class="numDesc">双/三摇</div>
            </div>

          </div>
        </div>
        <!-- 腕力球 -->
        <div class="dataItem" v-else-if="key=='wristBallRecord'&&value">
          <div class="typeBox">
            <img src="../img/group_wlq.png" alt="">
            <span>腕力球</span>
          </div>
          <div class="detail">
            <div class="detailItem">
              <div class="numBox">{{recordData[key].count.toLocaleString()}}</div>
              <div class="numDesc">圈数(圈)</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{returnTime(recordData[key].takeMs)}}</div>
              <div class="numDesc">用时</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{parseInt(recordData[key].burn/1000).toLocaleString()}}</div>
              <div class="numDesc">消耗(kcal)</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{(recordData[key].maxStrength/1000).toFixed(1)}}</div>
              <div class="numDesc">最大力量(kg)</div>
            </div>
            <div class="detailItem"></div>
            <div class="detailItem">
              <div class="numBox">{{recordData[key].maxRate.toLocaleString()}}</div>
              <div class="numDesc">最大转速(rpm)</div>
            </div>
          </div>
        </div>
        <!-- 健腹轮 -->
        <div class="dataItem" v-else-if="key=='abrollerRecord'&&value">
          <div class="typeBox">
            <img src="../img/group_jfl.png" alt="">
            <span>健腹轮</span>
          </div>
          <div class="detail">
            <div class="detailItem">
              <div class="numBox">{{(recordData[key].finishCount).toLocaleString()}}</div>
              <div class="numDesc">次数(次)</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{returnTime(recordData[key].takeMs)}}</div>
              <div class="numDesc">用时</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{parseInt(recordData[key].burn/1000).toLocaleString()}}</div>
              <div class="numDesc">消耗(kcal)</div>
            </div>
            <div class="detailItem">
              <div class="numBox">{{recordData[key].distanceTotal}}</div>
              <div class="numDesc">距离(米)</div>
            </div>
            <div class="detailItem"></div>
            <div class="detailItem">
              <div class="numBox">{{recordData[key].standardRateTotal}}</div>
              <div class="numDesc">达标率</div>
            </div>
          </div>
        </div>
        <!-- 步数 -->
        <div class="dataItem" v-else-if="key=='stepRecord'&&value">
          <div class="typeBox">
            <img src="../img/group_step.png" alt="">
            <span>步数</span>
          </div>
          <div class="detail">
            <div class="detailItem">
              <div class="numBox">{{recordData[key].steps.toLocaleString()}}</div>
              <div class="numDesc">步数(步)</div>
            </div>
            <div class="detailItem">

            </div>
            <div class="detailItem">
              <div class="numBox">{{(recordData[key].distance/1000).toFixed(1)}}</div>
              <div class="numDesc">距离(公里)</div>
            </div>
          </div>
        </div>
        <!-- 体脂秤 -->
        <div class="dataItem" v-else-if="key=='balanceRecord'&&value">
          <div class="typeBox">
            <img src="../img/group_tzc.png" alt="">
            <span>体脂秤</span>
          </div>
          <div class="detail">
            <div class="detailItem">
              <div class="numBox">{{recordData[key].weight||'- -'}}</div>
              <div class="numDesc">体重(kg)</div>
            </div>
            <div class="detailItem">

            </div>
            <div class="detailItem">
              <div class="numBox">{{recordData[key].bfr||'- -'}}</div>
              <div class="numDesc">体脂(%)</div>
            </div>
          </div>
          <!-- <div class="balanceDetail">
						<div id="weight" style="width:100%; height:200px"></div>
						<div id="fat" style="width:100%; height:200px"></div>
					</div> -->
        </div>
      </div>

    </div>

    <div v-if="!recordData.skipRecord&&!recordData.balanceRecord&&!recordData.stepRecord&&!recordData.abrollerRecord&&!recordData.wristBallRecord" class="nullDataBox" style="padding-top:2rem;">
      <img style="width:4rem" :src="require('../img/noData.png')" alt="">
      <p>暂无相关数据</p>
    </div>

    <van-popup v-model="dateshow" position="bottom" style="z-index: 9999;">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" :formatter="formatter" swipe-duration=100 @confirm="dateConfirm" @cancel="dateshow = false" />
    </van-popup>
    <van-popup v-model="peopleListshow" position="bottom" round style="z-index: 9999;">
      <div class="peopleListBox">
        <div class="peopleBox" v-for="item in memberList" @click="changeMemberUserId(item)">
          <img class="imgBox" :src="item.headPictureUrl" alt="">
          <span>{{item.nickname}}</span>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
// import * as echarts from 'echarts/core';
// import {
//     LineChart
// } from 'echarts/charts';
// import {
//     TitleComponent,
//     GridComponent,
//     MarkPointComponent,
//     TooltipComponent
// } from 'echarts/components';
// // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import {
//     CanvasRenderer
// } from 'echarts/renderers';
// // 注册必须的组件
// echarts.use(
//     [TitleComponent, TooltipComponent, MarkPointComponent, GridComponent, LineChart, CanvasRenderer]
// );

import { personalInfo } from "@a/groupIndex";

import { listItem } from "@a/groupMember";

import {
  NavBar,
  Icon,
  Popup,
  DatetimePicker,
  // Sticky
} from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    // [Sticky.name]: Sticky,
  },

  data() {
    return {
      dateshow: false,
      peopleListshow: false,

      searchTime: "",
      searchUserId: this.$route.query.searchUserId,
      groupId: this.$route.query.groupId,

      currentDatestr: "",
      currentDate: "",
      minDate: new Date("2019", "00", "01"),
      maxDate: new Date(),

      memberList: [],
      userItem: {},

      recordData: {},
    };
  },
  filters: {},
  mounted() {
    this.initData();
    this.getMemberList();
  },
  created() {},
  methods: {
    onclickLeft() {
      this.$router.go(-1);
    },
    initData() {
      this.currentDate = new Date(parseInt(this.$store.state.searchTime));
      var year = this.currentDate.getFullYear(),
        month = new Date(this.currentDate).getMonth() + 1,
        dates = new Date(this.currentDate).getDate();
      month = month.toString().padStart(2, "0");
      dates = dates.toString().padStart(2, "0");
      this.currentDatestr = year + "/" + month + "/" + dates;
      personalInfo({
        searchTime: this.$store.state.searchTime,
        searchUserId: this.searchUserId,
        groupId: this.groupId,
      }).then((res) => {
        this.recordData = res.data;
      });
      //this.weight()
      //this.fat()
    },
    getMemberList() {
      listItem({
        groupId: this.groupId,
      }).then((res) => {
        if (res.code == 0) {
          this.memberList = res.data;
          this.memberList.forEach((item) => {
            if (item.memberId == this.searchUserId) {
              this.userItem = item;
              return;
            }
          });
        }
      });
    },

    weight() {
      var myChart = echarts.init(document.getElementById("weight"));
      var option = {
        title: {
          text: "体重（kg）",
          textStyle: {
            color: "#CFCFD2",
            fontSize: "14",
            fontWeight: "normal",
            height: "30",
            lineHeight: "30",
          },
        },
        grid: {
          left: "10%",
          width: "90%",
          height: "60%",
        },
        tooltip: {
          alwaysShowContent: true,
          trigger: "axis", //item
          confine: true,
          formatter: "{c0}kg",
          backgroundColor: "#2E80F3",
          borderWidth: 0,
          textStyle: {
            color: "#ffffff",
            lineHeight: 15,
            height: 15,
            width: 40,
            fontSize: 10,
          },
          padding: [2, 3, 2, 3],
          extraCssText: "",
          axisPointer: {
            lineStyle: {
              color: "#F36176",
            },
          },
        },

        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            splitNumber: 4,
            axisPointer: {
              value: "2016-10-7",
              snap: true,
              label: {
                show: true,
              },

              handle: {
                show: true,
              },
              lineStyle: {
                color: "#F36176",
              },
            },
            data: [
              "7/1",
              "7/2",
              "7/3",
              "7/4",
              "7/5",
              "7/6",
              "7/7",
              "7/1",
              "7/2",
              "7/3",
              "7/4",
              "7/5",
              "7/6",
              "7/7",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            splitNumber: 2,
            // min:30,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#595962",
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            type: "line",
            smooth: true,
            showSymbol: true,
            lineStyle: {
              color: "#2E80F3",
            },
            itemStyle: {
              normal: {
                color: "#2E80F3",
              },
            },

            data: [51, 55, 65, 45, 65, 92, 75, 51, 55, 65, 45, 65, 92, 75],
          },
        ],
      };
      myChart.setOption(option);
    },
    fat() {
      var myChart = echarts.init(document.getElementById("fat"));
      var option = {
        title: {
          text: "体重（kg）",
          textStyle: {
            color: "#CFCFD2",
            fontSize: "14",
            fontWeight: "normal",
            height: "30",
            lineHeight: "30",
          },
        },
        grid: {
          left: "10%",
          width: "90%",
          height: "60%",
        },
        tooltip: {
          alwaysShowContent: true,
          trigger: "axis", //item
          confine: true,
          formatter: "{c0}%",
          backgroundColor: "#2ECD70",
          borderWidth: 0,
          textStyle: {
            color: "#ffffff",
            lineHeight: 15,
            height: 15,
            width: 40,
            fontSize: 10,
          },
          padding: [2, 3, 2, 3],
          extraCssText: "",
          axisPointer: {
            lineStyle: {
              color: "#F36176",
            },
          },
        },

        xAxis: [
          {
            type: "category",
            axisLine: {
              show: false,
            },
            splitNumber: 4,
            axisPointer: {
              value: "2016-10-7",
              snap: true,
              label: {
                show: true,
              },

              handle: {
                show: true,
              },
              lineStyle: {
                color: "#F36176",
              },
            },
            data: [
              "7/1",
              "7/2",
              "7/3",
              "7/4",
              "7/5",
              "7/6",
              "7/7",
              "7/1",
              "7/2",
              "7/3",
              "7/4",
              "7/5",
              "7/6",
              "7/7",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            splitNumber: 2,
            // min:30,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#595962",
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            type: "line",
            smooth: true,
            showSymbol: true,
            lineStyle: {
              color: "#2ECD70",
            },
            itemStyle: {
              normal: {
                color: "#2ECD70",
              },
            },
            data: [51, 55, 65, 45, 65, 92, 75, 51, 55, 65, 45, 65, 92, 75],
          },
        ],
      };
      myChart.setOption(option);
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    returnTime(unit) {
      if (!unit) return "00:00:00";
      unit = Math.round(unit / 1000);
      let hour =
        Math.floor(unit / 3600) >= 10
          ? Math.floor(unit / 3600)
          : "0" + Math.floor(unit / 3600);
      unit -= 3600 * hour;
      let min =
        Math.floor(unit / 60) >= 10
          ? Math.floor(unit / 60)
          : "0" + Math.floor(unit / 60);
      unit -= 60 * min;
      let sec = unit >= 10 ? unit : "0" + unit;
      return hour + ":" + min + ":" + sec;
    },
    // 确定时间回调
    dateConfirm(val) {
      var year = new Date(val).getFullYear(),
        month = new Date(val).getMonth() + 1,
        dates = new Date(val).getDate();
      month = month.toString().padStart(2, "0");
      dates = dates.toString().padStart(2, "0");
      this.currentDatestr = year + "/" + month + "/" + dates;
      this.dateshow = false;
      this.$store.commit("setData", {
        key: "searchTime",
        val: new Date(val).getTime(),
      });
      this.initData();
    },
    //成员选择回调
    changeMemberUserId(item) {
      this.peopleListshow = false;
      this.searchUserId = item.memberId;
      this.memberList.forEach((item) => {
        if (item.memberId == this.searchUserId) {
          this.userItem = item;
          return;
        }
      });
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@s/group.scss";
</style>
