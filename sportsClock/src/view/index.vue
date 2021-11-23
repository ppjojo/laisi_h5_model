<template>
  <div id="app" v-cloak>
    <div class="header" v-if="isShare!=1">
      <van-nav-bar title="运动日历" right-text="打卡总览" @click-left="onClickLeft" @click-right="onClickRight" safe-area-inset-top fixed>
        <template #left>
          <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
        </template>
      </van-nav-bar>
    </div>
    <div class="calendaroutbox">
      <nCalendar ref="calendar"></nCalendar>
    </div>
    <!-- 打卡 -->
    <div class="" v-if="flag==1">
      <!-- 今日尚未打卡有打卡按钮 -->
      <div v-if="monthObj.sportClockMax>1" class="normaltxt" style="width: 4rem;text-align: center;margin: .4rem auto 1.2rem;">
        本月最大连续签到打卡<span class="ftbe">{{monthObj.sportClockMax||0}}</span>天！</br>
        继续加油哦～
      </div>
      <div v-else class="normaltxt" style="width: 4rem;text-align: center;margin: .4rem auto 1.2rem;">
        本月累计打卡<span class="ftbe">{{monthObj.sportClockSum||0}}</span>天！</br>
        继续加油哦～
      </div>
      <div class="clockBtn" @click="firstClick">
        运动打卡
      </div>
    </div>
    <div class="infobox" v-else-if="flag==2||flag==5">
      <!-- 打卡失败 一点都没有运动-->
      <div v-if="flag==2" class="normaltxt" style="width: 4rem;text-align: center;margin: .4rem auto .8rem;">
        本月累计打卡<span class="ftbe">{{monthObj.sportClockSum||0}}</span>天！</br>
        继续加油哦～
      </div>
      <div v-else class="ub ub-ac sportfinish">
        <img class="" :src="require('@i/sportunfinish.png')" alt="">
        <div>当日未达到目标运动量！请继续加油哦！</div>
      </div>
      <div style="margin-bottom:0.5rem;text-align: center;">
        <div class="noDataBox" style="padding-top: 0;margin-bottom:0.5rem;">
          <div class="noDataImg" style="width: 2.5rem;height:2.5rem;"></div>
        </div>
        <div style="font-size: .28rem;color:var(--textColor2);">{{flag==2?'您还没有运动，先去运动吧～':'无运动打卡记录'}}</div>
      </div>
    </div>
    <div class="infobox" v-else-if="flag==3||flag==4">
      <!-- 3打卡成功，没达标 打卡成功且达标-->
      <div class="ub ub-ac sportfinish">
        <img class="" v-if="flag==3" :src="require('@i/sportunfinish.png')" alt="">
        <img class="" v-else :src="require('@i/sportfinish.png')" alt="">
        <div>{{flag==3?((todayFlag?'今':'当')+'日未达到目标运动量！继续加油哦！'):((todayFlag?'今':'当')+'日已达到目标运动量～')}}</div>
      </div>
      <!-- 运动时长-运动消耗 -->
      <div class="ub ub-ac ub-pj sportinfo">
        <div class="sportbox sportItem">
          <div class="">
            运动时长
          </div>
          <div class="sportItemNum">
            {{formatSeconds(sportObj.takeMs||0)}}
          </div>
        </div>
        <div class="sportbox sportItem">
          <div class="">
            运动消耗
          </div>
          <div>
            <span class="sportItemNum">{{(sportObj.burn/1000).toFixed(2)||0}}</span><span>kcal</span>
          </div>
        </div>
      </div>
      <!-- 运动详情 -->
      <div class="sportdetail" :class="{fixedpd:flag==3||flag==4}">
        <div class="title">运动详情</div>
        <div class="sportItem ub ub-ac ub-pj" v-for="(item,i) in sportObj.deviceDetail">
          <div class="ub ub-ac">
            <returnIcon :bgw="true" :name="i"></returnIcon>
            <!-- <img class="sporticon" :src="require('@i/sporticon/icon_skipping.png')" alt=""> -->
            <div class="iteminfo">
              <div>{{typeUtilStr(item,i,'name')}}
                <van-popover v-if="i=='steps'" theme="dark" v-model="showPopover" trigger="click" placement="right">
                  <div class="attentiontxt">
                    步数不满2000步，不作为运动打卡数据；步数消耗不计入总消耗
                  </div>
                  <template #reference>
                    <img class="attention" :src="require('@i/attention.png')">
                  </template>
                </van-popover>
              </div>
              <div>{{typeUtilStr(item,i,'unit')}}</div>
            </div>
          </div>
          <img v-if="item.isFinish" class="iconselect" :src="require('@i/icon_select.png')" alt="">
          <img v-else-if="item.isFinish===0" class="iconselect" :src="require('@i/icon_unselect.png')" alt="">
        </div>
        <!-- 查看我的运动目标 -->
        <div class="ub ub-ac ub-ad target" @click="goTarget">
          <div>查看我的运动目标
            <van-icon size="10" name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <!-- 更新打卡 -->
    <div class="updateclock" v-show="(isToday(sportObj.checkTime)&&(flag==3||flag==4))&&isShare!=1">
      <div class="btn" @click="reClick">
        更新打卡
      </div>
    </div>
    <!-- 时间选择 -->
    <van-popup position="bottom" round :style="{height: '45%'}" v-model="YMshow">
      <van-datetime-picker @cancel="YMshow=false" v-model="currentDate" type="year-month" title="" :min-date="minDate" @confirm="pickConfirm" :max-date="maxDate" :formatter="formatter">
      </van-datetime-picker>
    </van-popup>
    <!-- 打卡状态 -->
    <van-popup round :style="{height: '6.1rem'}" v-model="clockShow">
      <clockState :state="clockState" :maxday="monthObj.sportClockSum"></clockState>
    </van-popup>
  </div>
</template>

<script>
import nCalendar from "@c/calendar";
import clockState from "@c/clockState";
import returnIcon from "@c/returnIcon";
import { getQueryString } from "@u/tool";
import {
  insertSportData,
  updateSportData,
  getSportByMonth,
  getDayData,
} from "@a/api";
import { NavBar, Icon, Popup, DatetimePicker, Popover } from "vant";
import timeUtil from "@u/calendar";
import typeUtil from "@u/type";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    nCalendar,
    returnIcon,
    clockState,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Popover.name]: Popover,
    // [SwipeItem.name]: SwipeItem,
    // [GoodsAction.name]: GoodsAction,
    // [GoodsActionIcon.name]: GoodsActionIcon,
    // [GoodsActionButton.name]: GoodsActionButton
  },

  data() {
    return {
      isShare: getQueryString("isShare2"),
      minDate: new Date(2021, 0, 1),
      isClick: false,
      maxDate: new Date(),
      currentDate: new Date(),
      checkTime: new Date(new Date().toLocaleDateString()).getTime(),
      currentZero: new Date(new Date().toLocaleDateString()).getTime(),
      YMshow: false,
      clockShow: false,
      clockState: true,
      showPopover: false,
      actions: [
        {
          text: "连接手表状态下“步数不满2000步，不作为运动打卡数据”；未连接手表状态下“步数不满2000步时，不作为运动打卡数据，步数消耗不计入",
        },
      ],
      flag: null, //1未打卡2打卡失败3打卡成功未达标4打卡成功已达标5当天无打卡记录
      todayFlag: true,
      sportObj: {
        //当日运动详情
      },
      monthObj: {
        sportClockMax: 0,
      }, //打卡详情
    };
  },
  filters: {},
  mounted() {
    // this.calindarList();
  },
  created() {
    this.getList();
  },
  methods: {
    getList(flag, checkTime) {
      if (!checkTime) checkTime = this.checkTime;
      getDayData({
        checkTime: checkTime,
      }).then((res) => {
        //获取当天设备信息
        if (res.code == "0") {
          this.sportObj = {};
          this.sportObj = Object.assign(this.sportObj, res.data);
          this.flag = this.sportObj.isFinishDays == 1 ? 4 : 3;
          this.$forceUpdate();
          if (!res.data) {
            this.monthObj.sportClockSum = 0;
            this.flag = 2;
          }
        } else if (res.code == "1") {
          //打卡失败 相当于未打卡
          this.flag = 1;
        } else if (res.code == "2") {
          //过去未打卡
          this.flag = 5;
        }
      });
    },
    firstClick() {
      if (this.isClick) return;
      this.isClick = true;
      //首次打卡
      insertSportData({}).then((res) => {
        this.isClick = false;
        this.clockState = res.code == "0";
        this.clockShow = true;
        if (!this.clockState) {
          this.flag = 2;
        } else {
          this.getList();
          this.$refs.calendar.calindarList(null, true);
          // this.calindarList()
        }
      });
    },
    reClick() {
      if (this.isClick) return;
      this.isClick = true;
      //更新打卡
      updateSportData({}).then((res) => {
        this.isClick = false;
        if (res.code == "1") {
          this.$toast("更新打卡失败");
          return;
        }
        if (res.code == "2") {
          this.$toast("你还没有新的运动数据");
          return;
        }
        this.getList();
        this.$refs.calendar.calindarList();
        this.$toast("更新打卡成功");
        // this.calindarList()
      });
    },
    clickBeforeDay(stamp, todayFlag) {
      //点击了过去的某个时间

      this.checkTime = stamp;
      this.getList();
      this.todayFlag = todayFlag;
    },
    onClickLeft() {
      this.$interaction.closePage();
      // this.$router.go(-1)
    },
    onClickRight() {
      //跳转打卡总览
      this.$router.push({
        path: "/clockoverview",
      });
    },
    goTarget() {
      //LSH5APP_GoToMyTarget
      this.$interaction.appNative("LSH5APP_GoToMyTarget", {});
    },
    formatSeconds: timeUtil.formatSeconds,
    fatherSetMonthObj(obj) {
      this.$nextTick(() => {
        this.monthObj = Object.assign(this.monthObj, obj);
        // console.log(this.monthObj)
      });
    },
    fatherPickYearMonth() {
      //子组件调用打开时间选择
      this.YMshow = true;
    },
    pickConfirm(value) {
      //时间选择回调
      this.$refs.calendar.getList(value);
      this.$refs.calendar.dateTitleStr(value, "ym");
      this.YMshow = false;
    },
    typeUtilStr(val, key, type) {
      //返回运动名称
      if (type == "name") return typeUtil.formatStr(val, key);
      if (type == "unit") return typeUtil.formatStrUnit(val, key);
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    isToday(str) {
      return new Date(str).toDateString() === new Date().toDateString();
    },
  },
};
</script>
<style lang="scss">
.attention {
  width: 0.24rem;
  height: 0.24rem;
  margin-left: 0.1rem;
}
.van-popover--dark .van-popover__content {
  background-color: var(--popBgColor);
  color: var(--textColor2);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
}
.van-popover--dark .van-popover__arrow {
  color: var(--popBgColor);
}
.attentiontxt {
  font-size: 0.18rem;
  width: 3.7rem;
  padding: 0.05rem 0.1rem;
}
.infobox {
  padding: 0.48rem;

  .sportbox {
    width: 3.08rem;

    div:nth-child(1) {
      font-size: 0.28rem;
      margin-bottom: 0.32rem;
    }
    span {
      font-size: 0.24rem;
    }
    .sportItemNum {
      font-size: 0.48rem;
      font-family: "BebasNeue";
    }
  }

  .sportItem {
    background-color: var(--specialBorderColor);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
    font-size: 0.24rem;
    color: var(--textColor);
    border-radius: 0.16rem;
    padding: 0.24rem;
    margin-bottom: 0.16rem;
  }

  .sportdetail {
    margin-top: 0.56rem;

    .target {
      color: #595962;
      font-size: 0.24rem;
      margin-top: 0.4rem;
    }

    .iteminfo {
      margin-left: 0.24rem;

      div:nth-child(1) {
        margin-bottom: 0.16rem;
      }
    }

    .sporticon {
      width: 0.64rem;
      height: 0.64rem;
    }

    .iconselect {
      width: 0.32rem;
      height: 0.32rem;
    }

    .title {
      font-size: 0.32rem;
      margin-bottom: 0.4rem;
    }
  }

  .sportfinish {
    margin-bottom: 0.54rem;

    div {
      font-size: 0.28rem;
      color: var(--textColor);
    }

    img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.2rem;
    }
  }
}

.calendaroutbox {
  border-bottom: 3px solid var(--borderColor);
  padding-bottom: 0.3rem;
}

.normaltxt {
  font-size: 0.28rem;

  span {
    font-size: 0.56rem;
  }
}

.fixedpd {
  padding-bottom: 1.84rem;
}

.updateclock {
  height: 1.84rem;
  width: 100%;
  background: var(--linearColor);
  position: fixed;
  bottom: 0;

  .btn {
    height: 0.88rem;
    width: 6.7rem;
    margin: 0 auto;
    background: linear-gradient(to left, #ff4e3e, #ffaa88);
    font-size: 0.4rem;
    color: #fff;
    line-height: 0.88rem;
    text-align: center;
    border-radius: 0.44rem;
  }
}

.clockBtn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  line-height: 2rem;
  font-size: 0.4rem;
  text-align: center;
  background: linear-gradient(to bottom, #ffaa88, #ff4e3e);
  margin: 0 auto;
  color: #fff;
}

.van-picker__toolbar {
  border-bottom: 1px solid var(--borderColor);
}

.van-picker-column__item {
  color: var(--textColor);
}

// .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
// 	border-color: #595962;
// }

.noDataBox {
  text-align: center;
  padding-top: 3rem;
  .noDataImg {
    width: 2rem;
    height: 2rem;
    background-image: var(--noData);
    background-size: cover;
    margin: 0 auto;
  }
  .noDataInfo {
    color: var(--textColor2);
    line-height: 0.8rem;
    font-size: 0.28rem;
  }
}
</style>
