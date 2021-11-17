<template>
  <div id="clockstate" v-cloak>
    <div class="">
      <img v-if="state" class="stateImg" :src="require('@i/clockstate1.png')" alt="">
      <img v-else class="stateImg" :src="require('@i/clockstate2.png')" alt="">
    </div>
    <div v-if="state">
      <div class="" style="width: 2.8rem;color: #959598;font-size: .24rem;margin: .34rem auto;">
        你已累计运动打卡{{maxday}}天啦～
        继续加油呀！
      </div>
      <div>
        <img class="" style="width: 4rem;margin-bottom: .32rem;" :src="require('@i/clockaward.png')" alt="">
      </div>
      <div class="unit ub ub-ad">
        <div class="ub ub-aend">
          <div class="num">5</div>
          <div style="padding-bottom: .2rem;padding-left: .1rem;">逗币</div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="" style="width: 2.8rem;color: #959598;font-size: .24rem;margin: .34rem auto;">
        你今天还没有运动诶～
        现在去运动！
      </div>
      <div>
        <div class="noDataBox" style="padding-top: 0;">
          <div class="noDataImg"></div>
        </div>
      </div>
    </div>
    <div class="bottomBtn" @click="bottomBTN">
      {{state?'分享到朋友圈+5逗币':'去运动'}}
    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    // [Cell.name]: Cell,
    // [CellGroup.name]: CellGroup,
    // [Swipe.name]: Swipe,
    // [SwipeItem.name]: SwipeItem,
    // [GoodsAction.name]: GoodsAction,
    // [GoodsActionIcon.name]: GoodsActionIcon,
    // [GoodsActionButton.name]: GoodsActionButton
  },
  props: {
    state: {
      type: Boolean,
      default: () => true,
    },
    maxday: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {};
  },
  filters: {},
  mounted() {
    this.getList();
  },
  created() {},
  methods: {
    getList() {
      if (this.state) {
        //告诉原生打卡成功
        this.$interaction.appNative("LSTH5APP_SportClockSuccess", {});
      }
    },
    bottomBTN() {
      if (this.state) {
        //打卡
        this.$interaction.appNative("LSTH5APP_UrlAndSheetImageShareModel", {
          shareTitle: "运动日历打卡",
          isShareUrl: true,
          shareContent: "派健康-爱自己，爱生活",
          shareUrl:
            "sportsClock/#/index?isShare2=1&userId=" +
            JSON.parse(localStorage.getItem("appInfo")).userId,
        });
      } else {
        this.$interaction.closePage();
      }
    },
    onClickLeft() {
      this.$interaction.closePage();
      // this.$router.go(-1)
    },
    onClickRight() {
      //跳转创建小组
      this.$router.push({
        path: "/groupIndex",
        query: {
          id: item,
        },
      });
    },
  },
};
</script>
<style lang="scss" >
#clockstate {
  padding: 0.52rem 0.72rem 0.4rem 0.72rem;
  text-align: center;
  position: relative;
  height: 100%;
  width: 5.66rem;
  .stateImg {
    width: 2.6rem;
  }
  .unit {
    color: var(--textColor);
    font-size: 0.28rem;
    .num {
      font-size: 0.8rem;
    }
  }
  .bottomBtn {
    position: absolute;
    width: 4.22rem;
    height: 0.8rem;
    bottom: 0.4rem;
    left: calc(50% - 2.11rem);
    line-height: 0.8rem;
    color: #fff;
    font-size: 0.32rem;
    text-align: center;
    background: linear-gradient(to right, #ff4e3e, #ffaa88);
    border-radius: 0.4rem;
  }
}
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
