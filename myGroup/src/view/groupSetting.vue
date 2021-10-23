<template>
  <div id="app" class="groupSetting" v-cloak>
    <div class="header">
      <van-nav-bar title="小组设置" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
        <template #left>
          <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
        </template>
        <template #right>
        </template>
      </van-nav-bar>
    </div>
    <van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
    <!-- 人数box -->
    <div class="cellbox " @click="goMember(4)" style="border-bottom:none;">
      <div class="title">小组成员</div>
      <div class="rightBox">
        <div class="detail">{{groupItem.count}}人</div>
        <span class="icon iconfont icon-tongyong-gengduo" />
      </div>
    </div>
    <div class="cellbox   border-bottom2" style="justify-content:flex-start;padding-top:0;">
      <template v-for="(item,index) in memberIcon">
        <div class="groupMember " v-if="index<=(isCurrentUser?(groupItem.count==10?3:2):3)">
          <div class="imgbox ">
            <div class="headImg" :style="{'background-image':'url('+item.headPictureUrl+')'}"></div>
          </div>
          <div class="van-ellipsis detail">{{item.nickname}}</div>
        </div>
      </template>
      <div class="groupMember " @click="goInvite()" v-if="groupItem.count<10">
        <div class="imgbox ">
          <img class="menuicon" :src="require('../img/plus.png')" alt="">
        </div>
        <div class="van-ellipsis detail">邀请</div>
      </div>
      <div class="groupMember " v-if="isCurrentUser" @click="goMember(3)">
        <div class="imgbox ">
          <img class="menuicon" :src="require('../img/minus.png')" alt="">
        </div>
        <div class="van-ellipsis detail">移除</div>
      </div>
    </div>
    <!-- 小组菜单 -->
    <div class="cellbox  ">
      <div class="title">小组形象</div>
      <div class="rightBox">
        <template v-if="isCurrentUser">
          <van-uploader :after-read="afterRead">
            <div class="headpic" :style="{'background-image':'url('+groupItem.portrait+')'}"></div>
          </van-uploader>
          <span class="icon iconfont icon-tongyong-gengduo" />
        </template>
        <div v-else class="headpic" :style="{'background-image':'url('+groupItem.portrait+')'}"></div>
      </div>
    </div>
    <!-- 小组名称 -->
    <div class="cellbox  " @click="goChangeMult(4)">
      <div class="title">小组名称</div>
      <div class="rightBox">
        <div class="van-ellipsis detail">{{groupItem.name}}</div>
        <span v-if="isCurrentUser" class="icon iconfont icon-tongyong-gengduo" />
      </div>
    </div>
    <!-- 小组口号 -->
    <div class="cellbox  " @click="goChangeMult(1)">
      <div>
        <div class="title" style="margin-bottom: .2rem;">小组口号</div>
        <div class="van-multi-ellipsis--l3 detail" style="max-width: 6.6rem;white-space: normal;">
          {{groupItem.slogon}}</div>
      </div>
      <span v-if="isCurrentUser" class="icon iconfont icon-tongyong-gengduo" />
    </div>
    <!-- 小组公告 -->
    <div class="cellbox " @click="goChangeMult(2)">
      <div>
        <div class="title" style="margin-bottom: .2rem;">小组公告</div>
        <div class="van-multi-ellipsis--l3 detail" style="max-width: 6.6rem;white-space: normal;">
          {{groupItem.content}}</div>
      </div>
      <span class="icon iconfont icon-tongyong-gengduo" />
    </div>
    <!-- 小组标签 -->
    <div class="cellbox  " @click="goChangeMult(3)">
      <div class="title">小组标签</div>
      <div class="rightBox">
        <div class="labelBox ">
          <div v-for="labelItem in labelFun(groupItem.labelId)" class="labelItem" :class="labelItem[0]">
            {{labelItem[1]}}
          </div>
        </div>
        <span v-if="isCurrentUser" class="icon iconfont icon-tongyong-gengduo" />
      </div>
    </div>
    <!-- 小组qr -->
    <div class="cellbox border-bottom2 " @click="groupQR">
      <div class="title">小组二维码</div>
      <span class="icon iconfont icon-tongyong-gengduo" />
    </div>
    <!-- 设为置顶 -->
    <!-- <div class="cellbox  ">
			<div class="title">设为置顶</div>
			<van-switch active-color="#07c160" @change="switchChange(1)" :active-value="1" :inactive-value="0"
				v-model="groupItem.isTop" size="20"></van-switch>
		</div> -->
    <!-- 消息免打扰 -->
    <!-- <div class="cellbox ">
			<div class="title">消息免打扰</div>
			<van-switch active-color="#07c160" @change="switchChange(2)" :active-value="1" :inactive-value="0"
				v-model="groupItem.isSilent" size="20"></van-switch>
		</div> -->
    <!-- 小组邀请确认 -->
    <div class="cellbox  " v-if="isCurrentUser">
      <div class="title">小组邀请确认</div>
      <van-switch active-color="#3AD266" @change="switchChange(false)" :active-value="1" :inactive-value="0" v-model="groupItem.isInviteConfirm" size="20"></van-switch>
    </div>
    <!-- 我在小组中昵称 -->
    <div class="cellbox  " @click="goChangeNickname">
      <div class="title">我在小组中昵称</div>
      <div class="rightBox">
        <div class="van-ellipsis detail">{{groupItem.nickname}}</div>
        <span class="icon iconfont icon-tongyong-gengduo" />
      </div>
    </div>
    <!-- 转让组长 -->
    <div class="cellbox  border-bottom2" v-if="isCurrentUser" @click="goMember(1)">
      <div class="title">转让组长</div>
      <span class="icon iconfont icon-tongyong-gengduo" />
    </div>
    <!-- 删除聊天记录 -->
    <div class="cellbox  border-bottom2" @click="delChatRecord">
      <div class="title">删除聊天记录</div>
      <span class="icon iconfont icon-tongyong-gengduo" />
    </div>
    <!-- 退出 -->
    <div class="cellbox quit border-bottom2" v-if="isCurrentUser" @click="goMember(2)">
      转让并退出小组
    </div>
    <!-- 退出 -->
    <div class="cellbox quit" @click="cancelGroup">
      {{isCurrentUser?'解散小组':'退出小组'}}
    </div>
  </div>
</template>

<script>
import { groupSettingInfo, memberExit, relieveGroup } from "@a/groupIndex";
import { upDateGroup } from "@a/createGroup";
const defaultSettings = require("../settings.js");
import {
  NavBar,
  Icon,
  Loading,
  Tag,
  Switch,
  Uploader,
  Dialog,
  Toast,
} from "vant";
import { pictureReview } from "@u/tool";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [Tag.name]: Tag,
    [Switch.name]: Switch,
    [Uploader.name]: Uploader,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
  },

  data() {
    return {
      overlayShow: false,
      loading: false,
      finished: false,
      groupId: this.$route.query.id,
      huanxinGroupId: this.$route.query.huanxinGroupId,
      groupOwnerId: this.$route.query.groupOwnerId,
      isCurrentUser: 0,
      memberIcon: [],
      groupItem: {
        name: "",
        portrait: "",
        slogon: "",
        labelId: "",
        isTop: 0,
        isSilent: 0,
        isInviteConfirm: 0,
        nickname: "",
      },
    };
  },
  filters: {},
  mounted() {},
  created() {
    this.groupItem = Object.assign(
      this.groupItem,
      this.$store.state.group.groupInfo
    );
    this.memberIcon = Object.assign(
      this.memberIcon,
      this.$store.state.group.groupInfo.memberIcon
    );
    this.initData();
  },
  methods: {
    initData() {
      groupSettingInfo({
        groupId: this.groupId,
      }).then((res) => {
        this.isCurrentUser = res.data.myteamGroupMember
          ? res.data.myteamGroupMember.isGroupLeader
          : 0;
        this.groupItem = Object.assign(
          this.groupItem,
          res.data.myteamGroupMember
        );
        this.groupItem = Object.assign(
          this.groupItem,
          res.data.myteamGroupInfo
        );
        this.memberIcon = res.data.myteamGroupMemberList;

        this.$store.commit("setData", {
          key: "group.groupInfo",
          val: res.data.myteamGroupInfo,
        });
        // this.$store.commit("setData", {
        // 	key: "personalGroupInfo",
        // 	val: res.data.myteamGroupMember
        // })
        // this.$store.commit("setData", {
        // 	key: "groupMemberList",
        // 	val: res.data.myteamGroupMemberList
        // })
      });
    },
    afterRead(file) {
      this.overlayShow = true;
      pictureReview(file, (res) => {
        this.overlayShow = false;
        if (res.code != 0) return;
        this.groupItem.portrait = res.url;
        upDateGroup(this.groupItem).then((res) => {
          this.$store.commit("setData", {
            key: "group.groupInfo.portrait",
            val: res.url,
          });
        });
      });
    },
    goMember(flag) {
      //1组长转让 2 组长转让并退出  3移除成员  4 成员列表
      this.$router.push({
        path: "/groupMember",
        query: {
          flag: flag,
          id: this.groupId,
          huanxinGroupId: this.huanxinGroupId,
        },
      });
    },
    goChangeNickname() {
      //修改昵称
      this.$router.push({
        path: "/changeNickname",
        query: {
          name: this.groupItem.nickname,
          id: this.groupId,
        },
      });
    },
    goInvite() {
      //邀请好友
      this.$router.push({
        path: "/inviteList",
        query: {
          id: this.groupId,
          huanxinGroupId: this.huanxinGroupId,
          groupOwnerId: this.groupOwnerId,
          groupName: this.groupItem.name,
        },
      });
    },
    goChangeMult(flag) {
      //1小组口号--2小组公告---3小组标签--4小组名称
      if (!this.isCurrentUser && !this.isCurrentUser && flag != 2) return;
      if (flag == 3) {
        //前往标签
        this.$router.push({
          path: "/createGroup",
          query: {
            id: this.groupId,
            labelId: this.groupItem.labelId,
            edit: 1,
          },
        });
        return;
      }
      this.$router.push({
        path: "/multChangePage",
        query: {
          flag: flag,
          id: this.groupId,
          isCurrentUser: this.isCurrentUser,
          text:
            flag == 1
              ? this.groupItem.slogon
              : flag == 2
              ? this.groupItem.content
              : this.groupItem.name,
        },
      });
    },
    labelFun(id) {
      return defaultSettings.RETURN_LABEL(id);
    },
    delChatRecord() {
      Dialog.confirm({
        confirmButtonText: "删除",
        message: "删除后，将清空小组聊天的消息记录!",
      })
        .then(() => {
          this.$interaction.appNative("LSTH5APP_DeletChatContent", {
            huanxinGroupId: this.huanxinGroupId,
          });
          setTimeout(() => {
            Toast("删除成功!");
          }, 500);
        })
        .catch(() => {});
    },
    cancelGroup() {
      //解散小组
      let str = "确定退出小组？";
      let confirmButtonText = "退出";
      if (this.isCurrentUser) {
        str = "确定解散小组？";
        confirmButtonText = "解散";
      }
      Dialog.confirm({
        confirmButtonText: confirmButtonText,
        message: str,
      })
        .then(() => {
          if (this.isCurrentUser) {
            relieveGroup({
              groupId: this.groupId,
            })
              .then((res) => {
                this.$store.commit("setData", {
                  key: "myGroupListRefresh",
                  val: true,
                });
                this.$router.replace({
                  path: "/myGroupList",
                  query: {
                    isCancel: 1,
                  },
                });
              })
              .catch(() => {
                this.isCancel = false;
              });
            return;
          }
          //成员退出
          memberExit({
            groupId: this.groupId,
          })
            .then((res) => {
              this.$store.commit("setData", {
                key: "myGroupListRefresh",
                val: true,
              });
              this.$router.replace({
                path: "/myGroupList",
                query: {
                  isCancel: 1,
                },
              });
            })
            .catch(() => {
              this.isCancel = false;
            });
        })
        .catch(() => {});
    },
    switchChange(flag) {
      upDateGroup(this.groupItem).then((res) => {
        if (!flag) return;
        let methodstr = "LSTH5APP_MessageDoNotDisturb"; //免打扰huanxinGroupId= "环信的群聊ID",isOpen: int类型 1免打扰开启，0免打扰关闭
        if (flag == 1) methodstr = "LSTH5APP_ConversationSetIsTop"; //置顶huanxinGroupId= "环信的群聊ID",isOpen: int类型 1开启置顶，0关闭置顶
        this.$interaction.appNative(methodstr, {
          huanxinGroupId: this.huanxinGroupId,
          isOpen: flag == 1 ? this.groupItem.isTop : this.groupItem.isSilent,
        });
      });
    },
    onclickLeft() {
      this.$router.go(-1);
      this.$store.commit("setData", {
        key: "groupIndexRefresh",
        val: true,
      });
    },
    groupQR() {
      //二维码
      this.$interaction.appNative("LSTH5APP_goToGroupQR", {
        name: this.groupItem.name,
        imageUrl: this.groupItem.portrait,
        qrShareUrl:
          defaultSettings.host +
          "h5/h5V3/myGroup/#/groupIndex?id=" +
          this.groupId +
          "&isShare=1",
      });
    },
  },
};
</script>
<style scoped="scoped" lang="scss">
@import "@s/group.scss";
</style>