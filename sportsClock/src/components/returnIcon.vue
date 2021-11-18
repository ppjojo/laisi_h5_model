<template>
  <div id="" v-cloak>
    <div id="" v-if="bgw" class="sporticon">
      <img :src="url" alt="">
    </div>
    <div v-else class="sporticon2">
      <div class="imgBox">
        <img :src="url" alt="">
      </div>
      <div class="numBox">
        <span class="num">{{typeUtilStr(itemObj,name,'unit')}}</span><span>{{typeUtilStr(itemObj,name,'val')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import typeUtil from "@u/type";
export default {
  props: {
    name: {
      type: String,
      default: () => "",
    },
    bgw: {
      type: Boolean,
      default: () => false,
    },
    taskNum: {
      type: Number,
      default: () => 0,
    },
    isoverClock: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {},

  data() {
    return {
      url: "",
      itemObj: {
        number: 0,
        takeMs: 0,
      },
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.url = typeUtil.returnImg(this.name, this.isoverClock);
    if (!this.bgw) {
      this.itemObj.number = this.itemObj.takeMs = this.taskNum;
    }
  },
  methods: {
    typeUtilStr(val, key, type) {
      //返回运动名称
      if (type == "val") return typeUtil.returnUnit(val, key, "time");
      if (type == "unit") return typeUtil.formatStrUnit2(val, key);
    },
  },
  watch: {
    taskNum(val) {
      this.itemObj.number = this.itemObj.takeMs = val;
    },
    name(val) {
      this.name = val;
      this.url = typeUtil.returnImg(this.name, this.isoverClock);
    },
  },
};
</script>
<style lang="scss">
.sporticon img {
  width: 0.64rem;
  height: 0.64rem;
}
.num {
  font-family: BebasNeue;
  font-size: 0.48rem !important;
}
.sporticon2 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .imgBox {
    width: 0.56rem;
    height: 0.56rem;
    border-radius: 50%;
    margin-right: 0.16rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--borderColor);
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }

  .numBox {
    color: var(--textColor);
    font-size: 0.43rem;
    white-space: nowrap;

    span {
      font-size: 0.24rem;
    }
  }
}
</style>
