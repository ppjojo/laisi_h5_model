<template>
  <div id="app" v-cloak>
    <div class="header">
      <van-nav-bar title="比赛详情" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
        <template #left>
          <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
        </template>
      </van-nav-bar>
    </div>
    <div class="teamDetailContain">
      <div class="teamInfoBox">
        <div class="activeTeam">
          <div class="teamName">{{teamList[0].name}} </div>
          <div v-if="competitionItem.mode==2"> 总个数：<span class="bigNumberSpan">{{teamList[0].totalBestValue||'--'}}</span>个</div>
          <div v-else> 总时长：
            <span v-html="countTimeAll(teamList[0].totalBestValue*1000)"></span>
          </div>
        </div>
        <div class="powerTeam">
          <div class="teamName">{{teamList[1].name}} </div>
          <div v-if="competitionItem.mode==2"> 总个数：<span class="bigNumberSpan">{{teamList[1].totalBestValue||'--'}}</span>个</div>
          <div v-else> 总时长：
            <span v-html="countTimeAll(teamList[1].totalBestValue*1000)"></span>
          </div>

        </div>
      </div>
      <div class="listBox">
        <van-pull-refresh v-model="refreshing" :head-height="90" @refresh="onRefresh" class="monkey-pull-refresh">
          <template #pulling="props">
            <div class="monkeyBox">
              <div class="monkey"></div>
              <p>下拉刷新</p>
            </div>
          </template>
          <!-- 释放提示 -->
          <template #loosing>
            <div class="monkeyBox">
              <div class="monkey"></div>
              <p>释放刷新</p>
            </div>
          </template>
          <!-- 加载提示 -->
          <template #loading>
            <div class="monkeyBox">
              <div class="monkey"></div>
              <p>正在刷新</p>
            </div>
          </template>
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check=false>
            <div class="leftRightBox">
              <div class="left">
                <div v-if="teamList[0].dataDetail.length>0">
                  <div class="listItem" v-for="item in teamList[0].dataDetail" :class="currentUserId==item.userId?'self':''" @click="$interaction.visitPersonalHomepage(item.userId)">
                    <div class="border" style="width:2px"></div>
                    <img class="headerPic" :src="item.headerPicUrl" alt="">
                    <div class="scoreBox">
                      <div class="nickName">{{item.nickName}}</div>
                      <div v-if="competitionItem.mode==2">个数：<span class="bigNumberSpan">{{item.bestValue||'--'}}</span>个</div>
                      <div v-else>时长：
                        <span v-html="countTimeAll(item.bestValue*1000)"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="noPeople-div" v-else>
                  <img class="noPeoplePic" src="../img/noPeople.png" />
                  <p class="noPeopleP">队伍竟然没有人</p>
                </div>
              </div>
              <div class="right">
                <div v-if="teamList[1].dataDetail.length>0">
                  <div class="listItem" :class="currentUserId==item.userId?'self':''" v-for="item in teamList[1].dataDetail" @click="$interaction.visitPersonalHomepage(item.userId)">
                    <div class="border" style="width:2px"></div>
                    <img class="headerPic" :src="item.headerPicUrl" alt="">
                    <div class="scoreBox">
                      <div class="nickName">{{item.nickName}}</div>
                      <div v-if="competitionItem.mode==2">个数：<span class="bigNumberSpan">{{item.bestValue||'--'}}</span>个</div>
                      <div v-else>时长：
                        <span v-html="countTimeAll(item.bestValue*1000)"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="noPeople-div" v-else>
                  <img class="noPeoplePic" src="../img/noPeople.png" />
                  <p class="noPeopleP">队伍竟然没有人</p>
                </div>
              </div>
            </div>

          </van-list>

        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, PullRefresh, List } from "vant";

import { DateTime, getQueryString } from "@u/tool";

import { competitionDetail, detailInfo } from "@a/detail";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    // [Cell.name]: Cell,
    // [CellGroup.name]: CellGroup,
    // [Swipe.name]: Swipe,
    // [SwipeItem.name]: SwipeItem,
    // [GoodsAction.name]: GoodsAction,
    // [GoodsActionIcon.name]: GoodsActionIcon,
    // [GoodsActionButton.name]: GoodsActionButton
  },

  data() {
    return {
      type: this.$route.query.type,
      currentUserId: getQueryString("userId"),
      DateTime: DateTime,
      competitionId: getQueryString("id"),
      competitionItem: {},
      loading: false,
      finished: false,
      refreshing: false,
      page: 0,
      pageSize: 7,
      total: 0,
      list: [],
      teamList: [
        {
          name: "",
          dataDetail: [],
          average: "",
        },
        {
          name: "",
          dataDetail: [],
          average: "",
        },
      ],
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.initData();
    this.onRefresh();
  },
  methods: {
    onclickLeft() {
      this.$router.go(-1);
    },
    countTimeAll(time) {
      if (!time) return "<span class='bigNumberSpan'>--</span>";
      time = parseInt(time / 1000);
      var h = Math.floor(time / 60 / 60);
      var m = (Array(2).join(0) + Math.floor((time - h * 60 * 60) / 60)).slice(
        -2
      );
      var s = (Array(2).join(0) + (time - h * 60 * 60 - m * 60)).slice(-2);
      if (Math.floor(time / 60 / 60)) {
        // return h + 'h' + m + 'min' + s +'s'
        if (
          !Math.floor((time - h * 60 * 60) / 60) &&
          !(time - h * 60 * 60 - m * 60)
        ) {
          return "<span class='bigNumberSpan'>" + h + "</span>" + "时";
        } else if (
          Math.floor((time - h * 60 * 60) / 60) &&
          !(time - h * 60 * 60 - m * 60)
        ) {
          return (
            "<span class='bigNumberSpan'>" +
            h +
            "</span>" +
            "时" +
            "<span class='bigNumberSpan'>" +
            m +
            "</span>" +
            "分"
          );
        } else {
          return (
            "<span class='bigNumberSpan'>" +
            h +
            "</span>" +
            "时" +
            "<span class='bigNumberSpan'>" +
            m +
            "</span>" +
            "分" +
            "<span class='bigNumberSpan'>" +
            s +
            "</span>" +
            "秒"
          );
        }
      } else if (
        !Math.floor(time / 60 / 60) &&
        Math.floor((time - h * 60 * 60) / 60)
      ) {
        if (time - h * 60 * 60 - m * 60) {
          return (
            "<span class='bigNumberSpan'>" +
            Math.floor((time - h * 60 * 60) / 60) +
            "</span>" +
            "分" +
            "<span class='bigNumberSpan'>" +
            s +
            "</span>" +
            "秒"
          );
        } else {
          return (
            "<span class='bigNumberSpan'>" +
            Math.floor((time - h * 60 * 60) / 60) +
            "</span>" +
            "秒"
          );
        }
      } else {
        return (
          "<span class='bigNumberSpan'>" +
          (time - h * 60 * 60 - m * 60) +
          "</span>" +
          "秒"
        );
      }
    },
    //初始化比赛详情
    initData() {
      competitionDetail({
        id: this.competitionId,
      }).then((res) => {
        if (res.code == 0) {
          this.competitionItem = res.data[1];
          //   this.detailInitData();
        }
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.refreshing = false;
        this.page = 0;
      } else {
        this.page++;
      }
      this.detailInitData();
    },
    //刷新
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.refreshing = true;
      this.onLoad();
    },
    //比赛的直播
    detailInitData() {
      detailInfo({
        competitionId: this.competitionId,
        page: this.page,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.code == 0) {
          var rows = res.data.content;
          var maxNum = res.data.total;
          if (this.page + 1 > maxNum / this.pageSize) {
            this.finished = true;
          }

          if (this.page == 0) {
            this.teamList = [];
            this.teamList = rows;
          } else {
            this.teamList[0].dataDetail = this.teamList[0].dataDetail.concat(
              rows[0].dataDetail
            );
            this.teamList[1].dataDetail = this.teamList[1].dataDetail.concat(
              rows[1].dataDetail
            );
          }
        }
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/index.scss";
</style>