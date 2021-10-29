<template>
  <div id="app" class="detailBox" v-cloak>
    <div class="header" v-if="!isShare" style="height:auto;">
      <van-nav-bar @click-left="onclickLeft" title="比赛详情" left-arrow safe-area-inset-top fixed>
        <template #left>
          <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
        </template>
        <template #right v-if="competitionStatus != 3">
          <div @click="goSetting()">
            <span class="icon iconfont icon-gengduo" style="font-size: 0.48rem;" />
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="shareBox" v-if="isShare">
      <div class="headPic" :style="{ 'background-image': 'url(' + userItem.headPictureUrl + ')' }"></div>
      <div class="personalName">{{ userItem.nickName }}</div>
      <div class="competitionName">
        我在派健康参与了比赛【{{ competitionItem.name }}】,快来和我battle吧
      </div>
      <div class="codeTitle" v-if="competitionItem.invitationCode">邀请码</div>
      <div class="invitationCode" v-if="competitionItem.invitationCode">
        {{ competitionItem.invitationCode }}
      </div>
    </div>
    <div>
      <div class="detailBgBox">
        <div class="detailBg" v-if="competitionItem && !competitionItem.picUrl" :style="{
            'background-image':
              'url(' +
              require('@/img/' + type + '/' + competitionItem.type + '.png') +
              ')',
          }"></div>

        <div v-else class="detailBg" :style="{
            backgroundImage: 'url(' + competitionItem.picUrl + ')',
            'background-size': 'contain',
            'background-position': 'center center',
          }"></div>
      </div>

      <!-- 比赛信息 -->
      <div class="detailContain">
        <div class="detailDiv">
          <van-row>
            <van-col span="5" class="laberTitle">
              <span>比</span><span>赛</span><span>名</span><span>称</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent">
              {{ competitionItem.name }}
              <div v-if="competitionItem.isOfficial" class="van-tag-official">
                官方
              </div>
              <img class="lock_img" v-if="competitionItem.isVerify" src="../img/is_public2.png" />
            </van-col>
          </van-row>

          <div v-if="type == 'skipping'">
            <van-row v-if="competitionItem.type != 'multiTeam'">
              <van-col span="5" class="laberTitle">
                <span>比</span><span>赛</span><span>模</span><span>式</span>
              </van-col>
              <van-col span="1" class="laberTitle">：</van-col>
              <van-col span="18" class="laberContent">
                {{modeName}}
              </van-col>
            </van-row>

            <van-row v-if="competitionItem.type == 'multiTeam'">
              <van-col span="5" class="laberTitle">
                <span>比</span><span>赛</span><span>模</span><span>式</span>
              </van-col>
              <van-col span="1" class="laberTitle">：</van-col>
              <van-col span="18" class="laberContent">
                {{modeName}}/{{
                  competitionItem.repeatTimes == -1
                    ? "不限次数"
                    : competitionItem.repeatTimes + "次内取最优"
                }}
              </van-col>
            </van-row>
          </div>
          <div v-else-if="type == 'steps'">
            <van-row>
              <van-col span="5" class="laberTitle">
                <span>比</span><span>赛</span><span>模</span><span>式</span>
              </van-col>
              <van-col span="1" class="laberTitle">：</van-col>
              <van-col span="18" class="laberContent">
                {{modeName}}
              </van-col>
            </van-row>
          </div>
          <div v-else-if="type == 'wristball'">
            <van-row>
              <van-col span="5" class="laberTitle">
                <span>比</span><span>赛</span><span>模</span><span>式</span>
              </van-col>
              <van-col span="1" class="laberTitle">：</van-col>
              <van-col span="18" class="laberContent">
                {{modeName}}
              </van-col>
            </van-row>
          </div>
          <div v-else-if="type == 'wheel'">
            <van-row>
              <van-col span="5" class="laberTitle">
                <span>比</span><span>赛</span><span>模</span><span>式</span>
              </van-col>
              <van-col span="1" class="laberTitle">：</van-col>
              <van-col span="18" class="laberContent">
                {{modeName}}
              </van-col>
            </van-row>
          </div>

          <van-row>
            <van-col span="5" class="laberTitle">
              <span>发</span><span>起</span><span>人</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent">{{
              userItem.nickName || ""
            }}</van-col>
          </van-row>
          <van-row v-if="competitionItem.type == 'multiTeam'">
            <van-col span="5" class="laberTitle">
              <span>团</span><span>队</span><span>数</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent">{{
              competitionItem.teamNum + "个" || ""
            }}</van-col>
          </van-row>
          <van-row v-if="competitionItem.type == 'multiTeam'">
            <van-col span="5" class="laberTitle">
              <span>团</span><span>队</span><span>人</span><span>数</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent">{{
              competitionItem.teamPersonLimit + "人" || ""
            }}</van-col>
          </van-row>
          <van-row v-if="competitionItem.type != 'multiTeam'">
            <van-col span="5" class="laberTitle">
              <span>已</span><span>参</span><span>赛</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent" v-if="joinDetailItem.registerCount">
              {{ joinDetailItem.registerCount + "人" || "" }}</van-col>
          </van-row>
          <van-row v-if="competitionItem.isVerify">
            <van-col span="5" class="laberTitle">
              <span>邀</span><span>请</span><span>码</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent">{{
              competitionItem.invitationCode
            }}</van-col>
          </van-row>
          <van-row v-if="competitionItem.type != 'multiTeam'">
            <van-col span="5" class="laberTitle">
              <span>比</span><span>赛</span><span>次</span><span>数</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent" v-if="competitionItem.repeatTimes">
              {{
                competitionItem.repeatTimes == -1
                  ? "不限次数，比赛期间取最好成绩"
                  : competitionItem.repeatTimes + "次内取最优"
              }}
            </van-col>
          </van-row>
          <van-row>
            <van-col span="5" class="laberTitle">
              <span>比</span><span>赛</span><span>时</span><span>间</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent" v-if="competitionItem.startTime">
              {{
                DateTime.needYearOrNot(
                  competitionItem.startTime,
                  competitionItem.endTime
                )
              }}</van-col>
          </van-row>
          <van-row v-if="competitionItem.gameReward != '无奖励(由发起人提供)'">
            <van-col span="5" class="laberTitle">
              <span>比</span><span>赛</span><span>奖</span><span>励</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent"><span v-html="competitionItem.gameReward"></span>
            </van-col>
          </van-row>
          <van-row v-if="competitionItem.isOfficial">
            <van-col span="5" class="laberTitle">
              <span>获</span><span>奖</span><span>规</span><span>则</span>
            </van-col>
            <van-col span="1" class="laberTitle">：</van-col>
            <van-col span="18" class="laberContent"><span style="color:#59b8ff" @click="officialRuleShow = true">点击查看详细规则</span></van-col>
          </van-row>
        </div>
      </div>

      <!-- 比赛详情数据 -->
      <div class="raceInformation" v-if="competitionItem.type">
        <div class="raceInformationTitle" v-if="competitionItem.type != 'team'">
          赛况直播
        </div>
        <!-- 个人赛 -->
        <div class="personnal" v-if="competitionItem.type == 'personal'">
          <van-pull-refresh v-model="refreshing" :head-height="90" @refresh="onRefresh">
            <van-list v-model="loading" v-if="list.length > 0" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
              <div class="listItem" v-for="(item, index) in list">
                <div class="rank">
                  <img v-if="item.rank == 1" class="sortPic" src="../img/no1.png" />
                  <img v-else-if="item.rank == 2" class="sortPic" src="../img/no2.png" />
                  <img v-else-if="item.rank == 3" class="sortPic" src="../img/no3.png" />
                  <span v-else>{{ item.rank }}</span>
                </div>
                <div class="user" @click="$interaction.visitPersonalHomepage(item.userId)">
                  <img class="headpic" :src="item.headerPicUrl" alt="" />
                  <p class="name">{{ item.nickName }}</p>
                </div>
                <div class="times">
                  <span class="bigNumberSpan">{{
                    item.repeatNumber || "--"
                  }}</span>次
                </div>
                <div class="num" v-if="competitionItem.mode == 2">
                  <span class="bigNumberSpan">{{ item.bestValue || "--" }}</span>{{
                    type == "skipping"
                      ? "个"
                      : type == "wristball"
                      ? "圈"
                      : type == "wheel"
                      ? "次"
                      : ""
                  }}
                </div>
                <div class="num" v-else v-html="
                    countTimeAll(item.bestValue || item.competitorRunTime)
                  "></div>
              </div>
            </van-list>
            <div class="noData-box" v-else-if="finished">
              <img class="noData-img" src="../img/noData.png" />
            </div>
          </van-pull-refresh>
        </div>

        <!-- 团队赛 -->
        <div class="team" v-else-if="competitionItem.type == 'team'">
          <div class="teamcount">
            <div class="leftBox" :style="{ width: teamList[0].lineWidth + '%' }">
              <div class="skipImg"><img src="../img/skipimg.png" /></div>
              <div class="line lineLeft" v-if="competitionItem.mode == 2">
                <span>{{ teamList[0].average || "--" }}</span>
              </div>
              <div class="line lineLeft" v-else v-html="countTimeAll(teamList[0].average)"></div>
            </div>
            <div class="pkImg" :style="{ left: teamList[0].lineWidth + '%' }">
              <img class="centerimg" src="../img/team_center_pk.png" />
            </div>
            <div class="rightBox" :style="{ width: teamList[1].lineWidth + '%' }">
              <div class="line lineRight" v-if="competitionItem.mode == 2">
                <span>{{ teamList[1].average || "--" }}</span>
              </div>
              <div class="line lineRight" v-else v-html="countTimeAll(teamList[1].average)"></div>
              <div class="skipImg"><img src="../img/skipimg.png" /></div>
            </div>
          </div>

          <van-row type="flex" justify="space-between">
            <van-col span="11" class="activeTeam" :class="
                competitionStatus == 3 && teamList[0].rank > teamList[1].rank
                  ? 'loserTeam'
                  : ''
              " @click="gotoTeamDetail">
              <div v-if="competitionStatus == 3">
                <img src="../img/winner.png" v-if="teamList[0].rank == 1 && teamList[1].rank != 1" class="resultPic" />
                <img src="../img/draw.png" v-else-if="teamList[1].rank == 1 && teamList[0].rank == 1" class="resultPic" />
              </div>

              <p class="teamName">
                {{ teamList[0].name }} <img src="../img/teaMore.png" />
              </p>
              <p v-if="competitionItem.mode == 2">
                总个数：<span class="bigNumberSpan">{{
                  teamList[0].totalBestValue || "--"
                }}</span>个
              </p>
              <p v-else>
                总时长：
                <span v-html="countTimeAll(teamList[0].totalBestValue)"></span>
              </p>
            </van-col>
            <van-col span="11" class="powerTeam" :class="
                competitionStatus == 3 && teamList[1].rank > teamList[0].rank
                  ? 'loserTeam'
                  : ''
              " @click="gotoTeamDetail">
              <div v-if="competitionStatus == 3">
                <img src="../img/winner.png" v-if="teamList[1].rank == 1 && teamList[0].rank != 1" class="resultPic" />
                <img src="../img/draw.png" v-else-if="teamList[1].rank == 1 && teamList[0].rank == 1" class="resultPic" />
              </div>

              <p class="teamName">
                {{ teamList[1].name }} <img src="../img/teaMore.png" />
              </p>
              <p v-if="competitionItem.mode == 2">
                总个数：<span class="bigNumberSpan">{{
                  teamList[1].totalBestValue || "--"
                }}</span>个
              </p>
              <p v-else>
                总时长：
                <span v-html="countTimeAll(teamList[1].totalBestValue)"></span>
              </p>
            </van-col>
          </van-row>
        </div>

        <!-- 多团队赛 -->
        <div v-else-if="competitionItem.type == 'multiTeam'" class="multiTeamBox">
          <div class="multiTeamDiv " v-for="item in list" @click="multiTeamShowChange(item)" :class="item.self ? 'haveSelf' : ''">
            <div class="resultBox">
              <img src="../img/winner.png" v-if="competitionStatus == 3 && item.rank == 1 && !drawStatus" class="resultPic" />
              <img src="../img/draw.png" v-else-if="competitionStatus == 3 && item.rank == 1" class="resultPic" />
            </div>
            <div class="">
              <van-row class="multiTeamTitle ">
                <van-col span="12" class="name">{{ item.name }}</van-col>
                <van-col span="12" class="score" v-if="competitionItem.mode == 2">
                  <span class="bigNumberSpan">{{ item.totalBestValue }}</span>个
                </van-col>
                <van-col span="12" class="score" v-else v-html="countTimeAll(item.totalBestValue)">
                </van-col>
              </van-row>
              <div v-if="item.dataDetail.length > 0">
                <van-row v-for="(item, index) in item.dataDetail" class="multiTeamItem" v-if="index < 3">
                  <van-col span="12" class="name" :class="item.userId == currentUserId ? 'selfName' : ''">
                    {{ item.nickName }}</van-col>
                  <van-col span="12" class="score" v-if="competitionItem.mode == 2">
                    <span class="bigNumberSpan">{{
                      item.bestValue || "--"
                    }}</span>个
                  </van-col>
                  <van-col span="12" class="score" v-else v-html="countTimeAll(item.bestValue)">
                  </van-col>
                </van-row>
              </div>
              <div v-else>
                <div class="noTeam-div">
                  <img class="noTeamPic" src="../img/noData.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn_box" v-if="!isShare">
        <van-button class="btn" size="large" v-if="
            isSign == 0 && (competitionStatus == 1 || competitionStatus == 2)
          " @click="getPowertoSign()">去报名
        </van-button>
        <van-button class="btn " size="large" v-else-if="isSign == 2 && (competitionStatus == 2 || competitionStatus == 1)" @click="$toast('您已经有报名的比赛')">
          去报名
        </van-button>
        <van-button class="btn " size="large" v-else-if="isSign == 1 && competitionStatus == 1 && timesRemain != 0" @click="gotoSkip">
          {{ type == "skipping" ? "去跳绳" : "去运动" }}
        </van-button>
        <van-button class="btn btn2" size="large" v-else-if="isSign == 1 && competitionStatus == 2">
          {{ type == "skipping" ? "去跳绳" : "去运动" }}
        </van-button>
        <van-button class="btn btn2" size="large" v-else-if="isSign == 1 && competitionStatus == 1 && timesRemain == 0">
          {{ type == "skipping" ? "去跳绳" : "去运动" }}
        </van-button>

        <van-button class="btn btn2" size="large" v-else-if="competitionStatus == 3">已结束
        </van-button>
      </div>
      <div class="btn_box" v-if="isShare">
        <van-button class="btn" size="large" @click="goApp">去派健康查看更多 </van-button>
      </div>
    </div>

    <!-- 右上角的设置按钮 -->
    <van-action-sheet v-model="setting" @select="settingSelect" :actions="settingActions" cancel-text="取消" close-on-click-action />

    <!-- 比赛规则的弹出框 -->
    <van-popup v-model="officialRuleShow" class="officialRulePopup" :style="{ height: '55%', width: '85%' }" closeable close-icon="close" round>
      <p class="officalRule" v-html="competitionItem.rule"></p>
    </van-popup>

    <!-- 选择团队赛的团队 -->
    <van-action-sheet v-model="chooseTeamShow" @select="teamSelect" :actions="teamList_choose" cancel-text="取消" close-on-click-action />

    <!-- 多团队赛的详情数据 -->
    <van-popup v-model="multiTeamShow" class="multiTeamPopup">
      <div class="scoreListBox">
        <div class="title">{{modeName}}</div>
        <div class="scoreListDiv">
          <div>
            <div class="scoreBg">
              <van-row>
                <van-col span="24" class="scoreListTile">{{ multiTeamChoose.name }}赛况直播</van-col>
              </van-row>
              <van-row class="scoreListDetail">
                <van-col span="12" class="name">
                  当前排名:第{{
                    chineseRank[multiTeamChoose.rank - 1]
                  }}名</van-col>

                <van-col span="12" class="score" v-if="competitionItem.mode == 2">总个数:<span class="bigNumberSpan">{{
                    multiTeamChoose.totalBestValue || "--"
                  }}</span>个</van-col>
                <van-col span="12" class="score" v-else>
                  总时长:<span v-html="countTimeAll(multiTeamChoose.totalBestValue)"></span>
                </van-col>
              </van-row>
            </div>
            <div class="scoreListItemDiv">
              <van-row class="scoreListItem" v-for="(item, index) in multiTeamChoose.dataDetail" :class="
                  item.userId == currentUserId && index == 0 ? 'selfItem' : ''
                ">
                <van-col span="12" class="name" @click="Interaction.visitPersonalHomepage(item.userId)">
                  <div class="rank">
                    <img v-if="item.rank == 1" class="sortPic" src="../img/no1.png" />
                    <img v-else-if="item.rank == 2" class="sortPic" src="../img/no2.png" />
                    <img v-else-if="item.rank == 3" class="sortPic" src="../img/no3.png" />
                    <span v-else>{{ item.rank }}</span>
                  </div>
                  {{ item.nickName }}
                </van-col>
                <van-col span="12" class="score" v-if="competitionItem.mode == 2"><span class="bigNumberSpan">{{
                    item.bestValue || "--"
                  }}</span>个</van-col>
                <van-col span="12" class="score" v-else>
                  总时长:<span v-html="countTimeAll(item.bestValue)"></span>
                </van-col>
              </van-row>
            </div>
          </div>
          <div class="multiTeamClose">
            <img src="../img/multiTeamClose.png" @click="multiTeamShow = false" />
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
var vm;
import { DateTime, getQueryString, isWechat, isIOS } from "@u/tool";

import {
  competitionDetail,
  detailInfo,
  userTimesRemain,
  userAttendStatus,
  userQuitCompetition,
  participateCompetition,
  teamPeopleRemain,
  teamListArr,
} from "@a/detail";

import { boundDeviceCount } from "@a/index";

const defaultSettings = require("../settings.js");
import {
  NavBar,
  Icon,
  NoticeBar,
  Popup,
  DatetimePicker,
  ActionSheet,
  Col,
  Row,
  PullRefresh,
  List,
  Button,
  Dialog,
} from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [NoticeBar.name]: NoticeBar,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [ActionSheet.name]: ActionSheet,
    [Row.name]: Row,
    [Col.name]: Col,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
  },

  data() {
    return {
      type: getQueryString("type"),
      currentUserId: "",
      DateTime: DateTime,
      competitionId: getQueryString("id"),
      isShare: getQueryString("isShare"),
      fromList: 1,
      competitionItem: {
        type: "personal",
      },
      userItem: {},
      joinDetailItem: {},
      competitionStatus: "", //1进行中 2即将开始 3已结束
      isSign: 0, //是否已经报名
      timesRemain: -1, //跳绳剩余次数
      setting: false, //设置弹窗
      settingActions: [
        {
          name: "邀请好友",
          type: 1,
        },
        {
          name: "比赛规则",
          type: 2,
        },
      ],
      modeName: "",

      loading: false,
      finished: false,
      refreshing: false,
      page: 0,
      pageSize: 10,
      total: 0,
      list: [],
      officialRuleShow: false,
      signClick: false,

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
      teamId_choose: "",
      chooseTeamShow: false,
      teamdefault: 1,
      activeClass: 0,
      teamList_choose: [],
      drawStatus: false,
      multiTeamShow: false,
      multiTeamChoose: {
        dataDetail: [],
        totalBestValue: "",
      },
      chineseRank: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
        "十三",
        "十四",
        "十五",
        "十六",
        "十七",
        "十八",
        "十九",
        "二十",
        "二十一",
        "二十二",
        "二十三",
        "二十四",
        "二十五",
        "二十六",
        "二十七",
        "二十八",
        "二十九",
        "三十",
        "三十一",
        "三十二",
        "三十三",
        "三十四",
        "三十五",
        "三十六",
        "三十七",
        "三十八",
        "三十九",
        "四十",
        "四十一",
        "四十二",
        "四十三",
        "四十四",
        "四十五",
        "四十六",
        "四十七",
        "四十八",
        "四十九",
        "五十",
        "五十一",
        "五十二",
        "五十三",
        "五十四",
        "五十五",
        "五十六",
        "五十七",
        "五十八",
        "五十九",
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //vm为vue的实例,代替this
      if (!from.meta.index) {
        vm.fromList = 0;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.destroyed();
    next(); //一定不要忘记写
  },
  filters: {},
  mounted() {
    window.addEventListener("scroll", this.scrollFn);
    window.initCompetitionDetail = this.initCompetitionDetail;
  },
  created() {
    vm = this;
    this.initData();
    if (this.isShare != 1) {
      this.joinStatusAndTimesRemain();
    }
  },
  methods: {
    goApp() {
      var openApp = function (linkUrl) {
        var a = document.createElement("a");
        a.setAttribute("href", linkUrl);
        a.setAttribute("id", "js_a");
        //防止反复添加
        if (document.getElementById("js_a")) {
          document.body.removeChild(document.getElementById("js_a"));
        }
        document.body.appendChild(a);
        a.click();
      };
      let linkUrl = "";
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        linkUrl = `https://lstemp.laisitech.com?actionType=competitionDetail&id=${this.competitionId}&type=${this.type}`;

        openApp(linkUrl);
      } else if (/(Android)/i.test(navigator.userAgent)) {
        linkUrl = `app://rehealth/mainPage?redirectUrl=PK/#/competitionDetail?hideTitle=1&id=${this.competitionId}&type=${this.type}`;
        if (openApp(linkUrl)) {
        } else {
          linkUrl =
            "https://a.app.qq.com/o/simple.jsp?pkgname=com.lstech.rehealth";
          openApp(linkUrl);
        }
      }
    },
    scrollFn() {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      var rate = t / 100;
      if (rate > 1) {
        rate = 1;
      }
      var colorValue = `rgba(18,18,31,${rate})`;
      document.getElementsByClassName("van-nav-bar")[0].style.background =
        colorValue;
      // document.getElementsByClassName("van-nav-bar__title")[0].style.opacity =
      //   rate;
      document.getElementsByClassName("van-nav-bar")[0].style.color = `rgb(${
        255 - 48 * rate
      },${255 - 48 * rate},${255 - 45 * rate})`;
    },
    destroyed() {
      window.removeEventListener("scroll", this.scrollFn); // 销毁监听
    },
    onclickLeft() {
      this.destroyed();
      if (this.fromList) {
        this.$router.go(-1);
      } else {
        this.$interaction.closePage();
      }
    },
    initCompetitionDetail() {
      this.initData();
    },
    //初始化比赛详情
    initData() {
      competitionDetail({
        id: this.competitionId,
      }).then((res) => {
        if (res.code == 0) {
          if (this.isShare) {
            this.currentUserId = getQueryString("userId");
          } else {
            this.currentUserId = JSON.parse(
              localStorage.getItem("appInfo")
            ).userId;
          }

          this.competitionItem = res.data[1];
          if (this.competitionItem.isOfficial) {
            //奖励的换行处理
            if (this.competitionItem.gameReward) {
              this.competitionItem.gameReward =
                this.competitionItem.gameReward.replace(/\n/g, "<br>") +
                "(由发起人提供)";
            }
            if (this.competitionItem.rule) {
              this.competitionItem.rule = this.competitionItem.rule.replace(
                /\n/g,
                "<br>"
              );
            }
          } else {
            this.competitionItem.gameReward =
              this.competitionItem.gameReward + "(由发起人提供)";
          }
          this.userItem = res.data[0];
          this.joinDetailItem = res.data[2];
          if (this.competitionItem.mode == 2) {
            if (this.type == "skipping") {
              this.modeName =
                this.competitionItem.modeValue == 30
                  ? "30秒钟倒计时跳"
                  : parseInt(this.competitionItem.modeValue / 60) +
                    "分钟倒计时跳";
            } else if (this.type == "wristball") {
              this.modeName =
                this.competitionItem.modeValue == 30
                  ? "30秒钟倒计时转"
                  : parseInt(this.competitionItem.modeValue / 60) +
                    "分钟倒计时转";
            } else if (this.type == "steps") {
              this.modeName = this.competitionItem.modeValue + "公里跑";
            } else if (this.type == "wheel") {
              this.modeName =
                this.competitionItem.modeValue == 30
                  ? "30秒钟倒计时"
                  : parseInt(this.competitionItem.modeValue / 60) +
                    "分钟倒计时";
            }
          } else {
            if (this.type == "skipping") {
              this.modeName = this.competitionItem.modeValue + "个倒计数跳";
            } else if (this.type == "wristball") {
              this.modeName = this.competitionItem.modeValue + "个倒计数转";
            } else if (this.type == "steps") {
              this.modeName = this.competitionItem.modeValue + "公里跑";
            } else if (this.type == "wheel") {
              this.modeName = this.competitionItem.modeValue + "个倒计数";
            }
          }

          if (
            !DateTime.timeContrast(this.competitionItem.startTime) &&
            DateTime.timeContrast(this.competitionItem.endTime)
          ) {
            this.competitionStatus = 1;
          } else if (
            DateTime.timeContrast(this.competitionItem.startTime) &&
            DateTime.timeContrast(this.competitionItem.endTime)
          ) {
            this.competitionStatus = 2;
          } else if (!DateTime.timeContrast(this.competitionItem.endTime)) {
            this.competitionStatus = 3;
          }

          this.detailInitData();
        }
      });
    },
    goSetting() {
      this.setting = true;
    },
    settingSelect(obj) {
      if (obj.type == 1) {
        this.$interaction.sharePage({
          title: `我在派健康参与了比赛【${this.competitionItem.name}】,快来和我battle吧`,
          description: "派健康--爱自己，爱生活",
          url:
            defaultSettings.host +
            `h5/h5V3/PK/#/competitionDetail?id=${this.competitionItem.id}&type=${this.type}&isShare=1`,
        });
      } else if (obj.type == 2) {
        this.destroyed();
        this.$router.push({
          path: "/rule",
          type: this.type,
        });
      } else if (obj.type == 3) {
        if (!this.isSign) {
          this.$toast("您还未报名哦");
          return;
        }
        if (
          this.userItem.uid ==
          JSON.parse(localStorage.getItem("appInfo")).userId
        ) {
          this.$toast("自己创建的比赛,无法退出");
          return;
        }
        Dialog.confirm({
          message: "确定退出比赛吗？",
          confirmButtonText: "确定",
        })
          .then(() => {
            if (this.competitionStatus == 2) {
              userQuitCompetition({
                competitionId: this.competitionId,
                userId: this.currentUserId,
              }).then((res) => {
                if (res.data == 1) {
                  this.$toast("成功退出比赛！");
                  this.onclickLeft();
                }
              });
            } else if (this.competitionStatus == 1) {
              this.$toast("无法退出正在进行的比赛！");
            } else if (this.competitionStatus == 3) {
              this.$toast("无法退出已经结束的比赛！");
            }
          })
          .catch(() => {});
      }
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
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
          if (this.competitionItem.type == "team") {
            this.teamList = res.data.content;

            if (this.competitionItem.mode == 2) {
              //倒计时

              if (
                this.teamList[0].average == 0 &&
                this.teamList[1].average == 0
              ) {
              } else if (this.teamList[0].average == 0) {
                this.teamList[0].lineWidth = 28;
                this.teamList[1].lineWidth = 72;
              } else if (this.teamList[1].average == 0) {
                this.teamList[0].lineWidth = 72;
                this.teamList[1].lineWidth = 28;
              } else {
                this.teamList[0].lineWidth =
                  100 *
                  (this.teamList[0].average /
                    (this.teamList[0].average + this.teamList[1].average));
                this.teamList[1].lineWidth = 100 - this.teamList[0].lineWidth;
                if (this.teamList[0].lineWidth < 28) {
                  this.teamList[0].lineWidth = 28;
                }
              }
            } else {
              if (
                this.teamList[0].average == 0 &&
                this.teamList[1].average == 0
              ) {
              } else if (this.teamList[0].average == 0) {
                this.teamList[0].lineWidth = 28;
                this.teamList[1].lineWidth = 72;
              } else if (this.teamList[1].average == 0) {
                this.teamList[0].lineWidth = 72;
                this.teamList[1].lineWidth = 28;
              } else {
                this.teamList[1].lineWidth =
                  100 *
                  (this.teamList[0].average /
                    (this.teamList[0].average + this.teamList[1].average));
                this.teamList[0].lineWidth = 100 - this.teamList[1].lineWidth;
                if (this.teamList[1].lineWidth < 28) {
                  this.teamList[1].lineWidth = 28;
                }
              }
            }
            return;
          }
          if (this.competitionItem.type == "multiTeam") {
            var rows = res.data.content;
            var draw = 1;
            for (var i = 0; i < rows.length; i++) {
              if (rows[i].rank == 1) draw++;
              if (rows[i].dataDetail) {
                for (var j = 0; j < rows[i].dataDetail.length; j++) {
                  if (rows[i].dataDetail[j].userId == this.currentUserId) {
                    rows[i].self = true;
                  }
                }
              } else {
                rows[i].dataDetail = [];
              }
            }
            if (draw > 1) {
              this.drawStatus = true;
            } else {
              this.drawStatus = false;
            }

            this.list = res.data.content;
            return;
          }
          if (res.data.content.length < this.pageSize) {
            this.finished = true;
          }
          if (this.page + 1 > Math.ceil(res.data.total / this.pageSize)) {
            this.finished = true;
          }
          if (this.page == 0) {
            this.list = res.data.content;
          } else {
            this.list = this.list.concat(res.data.content);
          }
        } else if (this.page == 0 && parseInt(res.code) == 1000) {
          this.list = [];
          this.finished = true;
        }
        this.loading = false;
      });
    },
    countTimeAll(time) {
      //秒
      if (!time) return "<span class='bigNumberSpan'>--</span>";
      time = parseInt(time);
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
    //判断是否参加了这场比赛 //获取可跳绳次数
    joinStatusAndTimesRemain() {
      userAttendStatus({
        competitionId: this.competitionId,
      }).then((res) => {
        this.isSign = res.data;
        if (this.isSign) {
          this.settingActions.push({
            name: "退出比赛",
            type: 3,
          });
        }
      });
      userTimesRemain({
        competitionId: this.competitionId,
      }).then((res) => {
        this.timesRemain = res.data;
      });
    },
    //获取队伍可加入人数
    getCountRemain() {
      teamPeopleRemain({
        id: this.teamId_choose,
      }).then((res) => {
        if (res.code == 0) {
          if (res.data != 0) {
            this.sign();
          } else {
            this.$toast("该队伍报名人数已满!");
          }
        }
      });
    },
    //获取比赛队伍列表
    getTeamList() {
      teamListArr({
        competitionId: this.competitionId,
      }).then((res) => {
        if (res.code == 0) {
          this.teamList_choose = res.data;
        } else {
          this.teamList_choose = [];
        }
      });
    },
    teamSelect(obj) {
      this.teamId_choose = obj.teamId;
      this.sign();
    },
    //进入团队赛详情
    gotoTeamDetail() {
      this.destroyed();
      this.$router.push({
        path: "/teamDetail",
        query: {
          id: this.competitionId,
          userId: this.currentUserId,
          type: this.type,
          time: new Date().getTime(),
        },
      });
    },
    //点击查看多组赛的详细
    multiTeamShowChange(item) {
      if (item.dataDetail.length > 0) {
        this.multiTeamShow = true;
        this.multiTeamChoose = item;
      }
    },

    getPowertoSign() {
      boundDeviceCount().then((res) => {
        let type = this.type == "steps" ? "watch" : this.type;
        let unbind = true;
        res.data.forEach((item) => {
          if (item.deviceType == type) {
            this.getPowertoSign2();
            unbind = false;
            return;
          }
        });
        if (unbind) {
          this.$toast("请先绑定设备");
        }
      });
    },
    //判断有没有资格报名
    getPowertoSign2() {
      if (this.competitionItem.type == "team") {
        this.getTeamList();
        this.chooseTeamShow = true;
        return;
      }
      this.sign();
    },
    sign() {
      if (this.signClick) return;
      this.signClick = true;
      participateCompetition(
        {
          competitionId: this.competitionItem.id,
          teamId: this.teamId_choose || "",
          userId: this.currentUserId,
        },
        this.competitionItem.type
      ).then((res) => {
        if (res.code == 0) {
          this.initData();
          this.joinStatusAndTimesRemain();

          this.$toast("报名成功！");
        }
        this.signClick = false;
      });
    },
    gotoSkip() {
      var skipItem = {
        method: "LSTH5APP_SelectDeviceAndPushToSport", //H5调起原生选择设备，并跳转到对应设备类型的运动页，目前3.0后有：跳绳、健腹轮、腕力球
        deviceType: this.type == "steps" ? "watch" : this.type, //skipping、wristball、wheel 、steps
        mode: this.competitionItem.mode, //倒计时2、倒计数3，按照原先跳绳PK类型定义的值",
        modeValue: this.competitionItem.modeValue, //按照原先跳绳的类型传值
        jumpCount: this.competitionItem.repeatTimes, //按照原先跳绳的类型传值
        category: 1, //1：PK赛，2俱乐部比赛,
        isPK: 1, //0不是，1是，表示是否是PK类型的运动，是的话去pk运动页面，不是去普通运动页面
        dataId: this.competitionItem.id,
      };
      try {
        if (isIOS) {
          window.webkit.messageHandlers.lstNative.postMessage(skipItem);
        } else {
          window.android.LSTH5APP_SelectDeviceAndPushToSport(
            JSON.stringify(skipItem)
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/detail.scss";

.van-action-sheet__item {
  border-bottom: 1px solid #1e1e2a;
}
</style>
