<template>
  <div id="app" v-cloak>
    <div style="height: 1.32rem;" v-if="isIos&&(isShare==1||sheetImageStatus)"></div>
    <div class="header" v-show="!sheetImageStatus&&isShare!=1">
      <van-nav-bar title="打卡总览" @click-left="onClickLeft" @click-right="onClickRight" left-arrow safe-area-inset-top fixed>
        <template #left>
          <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
        </template>
        <template #right>
          <span class="icon iconfont icon-fenxianganniu" style="font-size: 0.48rem;" />
        </template>
      </van-nav-bar>
    </div>
    <div v-show="!sheetImageStatus&&isShare!=1">
      <div class="ub ub-ac tab">
        <div class="subtab" @click="changeTab(1)">
          <div class="title" :class="{active:tabIndex==1}">月度统计</div>
          <img class="activeImg" v-show="tabIndex==1" :src="require('@i/tabselect.png')" alt="">
        </div>
        <div class="subtab" @click="changeTab(2)">
          <div class="title" :class="{active:tabIndex==2}">年度统计</div>
          <img class="activeImg" v-show="tabIndex==2" :src="require('@i/tabselect.png')" alt="">
        </div>
      </div>
    </div>
    <!-- 月度统计 -->
    <div v-show="tabIndex==1">
      <div class="calendaroutbox">
        <nCalendar ref="calendar" :showOnly="true"></nCalendar>
      </div>
      <!-- 进度条 -->
      <div class="percent">
        <div class="percentoutbox">
          <div class="percentTip" :style="{left:'calc( '+rate[0]+'% - .35rem )'}">{{rate[0]}}%</div>
          <div class="inside" :style="{width:rate[0]+'%'}"></div>
        </div>
      </div>
      <!-- 打卡目标 -->
      <div class="target">
        亲爱的{{nickname}}～</br>
        本月已经完成了 <span style="font-size: .3rem;">{{rate[0]}}</span> %的打卡目标，要继续加油哦！
      </div>
      <!-- 完成程度 -->
      <div class="ub ub-ac ub-pj finishList">
        <template v-for="(item,i) in monthObj">
          <div class="listItem" v-if="item!=0">
            <returnIcon :isoverClock="true" :name="i" :taskNum="item"></returnIcon>
          </div>
        </template>
      </div>
    </div>
    <!-- 年度统计 -->
    <div v-show="tabIndex==2">
      <div class="calendaroutbox">
        <year ref="year" :monthbar="yearDetail.checkTimeMap||{}"></year>
      </div>
      <!-- 打卡目标 -->
      <div style="margin-top:.48rem;">
        <div class="target">
          亲爱的{{nickname}}～</br>
          <div v-if="yearDetail.yearCount>=50">你本年度填满了<span style="font-size: .3rem;">{{yearDetail.yearCount||0}}</span>个方块，太棒啦！</div>
          <div v-else-if="yearDetail.yearCount<50">你本年度填满了<span style="font-size: .3rem;">{{yearDetail.yearCount||0}}</span>个方块，请继续加油哦！</div>
          <div v-else-if="yearDetail.yearCount==0||!yearDetail.yearCount">很遗憾，本年度你没有填满方块</div>
        </div>
        <!-- 完成程度 -->
        <div class="ub ub-ac ub-pj finishList">
          <template v-for="(item,i) in yearObj">
            <div class="listItem" v-if="item!=0">
              <returnIcon :isoverClock="true" :name="i" :taskNum="item"></returnIcon>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 时间选择 -->
    <van-popup position="bottom" round :style="{height: '45%'}" v-model="YMshow">
      <van-datetime-picker v-show="tabIndex==1" v-model="currentDate" type="year-month" title="" :min-date="minDate" @cancel="YMshow=false" @confirm="pickConfirm" :max-date="maxDate" :formatter="formatter">
      </van-datetime-picker>
      <van-picker v-show="tabIndex==2" @cancel="YMshow=false" title="选择年份" show-toolbar :columns="columns" @confirm="onConfirmYear">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import nCalendar from "@c/calendar";
import year from "@c/year";
import returnIcon from "@c/returnIcon";
import { getQueryString } from "@u/tool";
import { NavBar, Icon, Sticky, Popup, Picker, DatetimePicker } from "vant";
import {
  getMonthDeviceTotal,
  getYearDeviceTotal,
  getSportByYear,
} from "@a/api";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    nCalendar,
    returnIcon,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    year,
    [Sticky.name]: Sticky,
  },

  data() {
    return {
      isShare: getQueryString("isShare2"),
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      checkTime: new Date().getTime(),
      YMshow: false,
      tabIndex: 1, //1月度2年度
      columns: [],
      sheetImageStatus: false,
      monthObj: {
        skipping: "",
      },
      yearObj: {},
      rate: [0, 0], //index0月1年
      yearDetail: {},
      nickname: localStorage.getItem("appInfo")
        ? JSON.parse(localStorage.getItem("appInfo")).nickname
        : getQueryString("nickname"),
      userId: localStorage.getItem("appInfo")
        ? JSON.parse(localStorage.getItem("appInfo")).userId
        : "",
      isIos: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    };
  },
  filters: {},
  mounted() {
    window.sheetImageHideHeader = this.sheetImageHideHeader;
    window.sheetImageshowHeader = this.sheetImageshowHeader;
    this.getList(1);
    this.getList(2);
  },
  created() {
    if (getQueryString("isShare2")) {
      this.tabIndex = parseInt(getQueryString("tabIndex"));
    }
    for (var i = new Date().getFullYear(); i > 2020; i--) {
      this.columns.push(i);
    }
  },
  methods: {
    getList(flag, checkTime) {
      if (!flag) flag = this.tabIndex;
      if (flag == 1) {
        this.monthAPI(checkTime);
      } else {
        this.yearAPI(checkTime);
      }
    },
    monthAPI(checkTime) {
      if (!checkTime) checkTime = this.checkTime;
      getMonthDeviceTotal({
        checkTime: checkTime,
      }).then((res) => {
        this.monthObj = res.data;
        this.$forceUpdate();
      });
    },
    yearAPI(checkTime) {
      if (!checkTime) checkTime = this.checkTime;
      getSportByYear({
        checkTime: checkTime,
      }).then((res) => {
        this.yearDetail = res.data;
      });
      getYearDeviceTotal({
        checkTime: checkTime,
      }).then((res) => {
        this.yearObj = res.data;
        this.$forceUpdate();
      });
    },
    changeTab(index) {
      //点击切换tab
      this.tabIndex = index;
    },
    onClickLeft() {
      // this.$interaction.closePage();
      this.$router.go(-1);
    },
    onClickRight() {
      this.sharePage();
    },

    fatherSetMonthObj(obj, index) {
      this.rate[index] = obj.standardRate;
      this.$forceUpdate();
    },
    fatherPickYearMonth() {
      //子组件调用打开时间选择
      this.YMshow = true;
    },
    pickConfirm(value) {
      //时间选择回调
      this.$refs.calendar.getList(value);
      this.$refs.calendar.dateTitleStr(value, "ym");
      this.checkTime = new Date(value).getTime();
      this.getList(1);
      this.YMshow = false;
    },
    onConfirmYear(value) {
      //选择年份确定
      this.$refs.year.dateTitleStr2(value);
      this.checkTime = new Date(value, 0, 1).getTime();
      this.getList(2);
      this.YMshow = false;
    },
    valRate(arr) {
      //赋值进度
      this.rate = arr;
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    sharePage() {
      this.$interaction.appNative("LSTH5APP_UrlAndSheetImageShareModel", {
        shareTitle: "运动日历打卡",
        isShareUrl: false,
        shareContent: "",
        shareUrl: `sportsClock/#/clockoverview?isShare2=1&tabIndex=${this.tabIndex}&userId=${this.userId}&nickname=${this.nickname}`,
      });
    },
    sheetImageHideHeader() {
      this.sheetImageStatus = true;
    },
    sheetImageshowHeader() {
      this.sheetImageStatus = false;
    },
  },
};
</script>
<style lang="scss">
.tab {
  .subtab {
    width: 50%;
    text-align: center;
    height: 1.28rem;
    line-height: 1.28rem;
    color: var(--sportsClock_weekTextColor);
    font-size: 0.32rem;
    position: relative;

    .activeImg {
      position: absolute;
      width: 0.46rem;
      height: 0.14rem;
      left: calc(50% - 0.23rem);
      bottom: 0.2rem;
    }

    > .active {
      font-size: 0.36rem;
      color: var(--textColor);
    }
  }
}

.finishList {
  padding: 0 0.48rem;
  flex-wrap: wrap;

  .listItem {
    width: 40%;
    padding: 0.24rem 0;
    &:nth-child(2n) {
      .sporticon2 {
        // justify-content: flex-end;
      }
    }
  }
}

.target {
  color: var(--textColor);
  font-size: 0.24rem;
  text-align: center;
  padding: 0 0.3rem;
  line-height: 0.36rem;
  margin-bottom: 0.4rem;
}

.percent {
  padding: 0.92rem 0.48rem 0.32rem 0.48rem;
  width: 100%;

  .percentoutbox {
    width: 100%;
    border-radius: 0.12rem;
    background-color: var(--sportsClock_boxBgColor);
    height: 0.16rem;
    position: relative;

    .percentTip {
      position: absolute;
      border-radius: 0.04rem;
      background: linear-gradient(to right, #3ad266, #8ed2b0);
      width: 0.7rem;
      height: 0.36rem;
      line-height: 0.36rem;
      text-align: center;
      color: var(--textColor);
      font-size: 0.2rem;
      bottom: 0.3rem;
    }

    .percentTip:after {
      content: "";
      border-top: 0.15rem solid transparent;
      border-left: 0.15rem solid transparent;
      border-right: 0.15rem solid #8ed2b0;
      position: absolute;
      top: 0.2rem;
      transform: rotate(45deg);
      left: 0.2rem; //这里的top:27px，left:-7px是为了遮盖住.c-main:before生成的箭头，使箭头边框呈现颜色
    }

    .inside {
      height: 100%;
      border-radius: 0.12rem;
      background: linear-gradient(to right, #3ad266, #8ed2b0);
    }
  }
}

.calendaroutbox {
  border-top: 3px solid var(--borderColor);
  border-bottom: 3px solid var(--borderColor);
  padding-bottom: 0.3rem;
}

.normaltxt {
  font-size: 0.28rem;

  span {
    font-size: 0.56rem;
  }
}
// .van-sticky--fixed {
//   top: 1rem;
//   top: calc(1rem + constant(safe-area-inset-top));
//   top: calc(1rem + env(safe-area-inset-top));
// }
</style>
