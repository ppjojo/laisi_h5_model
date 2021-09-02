<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-date-picker v-model="searchForm.weekTime" type="week" format="yyyy 第 WW 周" value-format="yyyy-MM-dd"
          :picker-options="{firstDayOfWeek:1}" placeholder="选择周">
        </el-date-picker>

        <el-form-item>
          <el-button type="success" @click="getAll">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-search" style="margin-bottom:20px">
      <el-divider content-position="left">
        <svg-icon icon-class="salesDept_date" /> 总数据
      </el-divider>
      <div>
        <el-row type="flex" justify="space-between" style="margin-bottom:20px">
          <el-col :span="6">
            <div class="dataBox">
              <p>用户总量</p>
              <p>{{totalData.umengData.totalUsers||0}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="dataBox">
              <p>日均新增用户</p>
              <p>{{totalData.newAvgUsers||0}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="dataBox">
                <p>日均启动次数</p>
                <p>{{totalData.launchesAvg||0}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <div class="dataBox">
              <p>设备总量</p>
              <p>{{totalData.deviceToTal||0}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="dataBox">
              <p>日均活跃用户</p>
              <p>{{totalData.umengData.avgActivityUsers||0}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <div class="dataBox">
                <p>平均使用时长</p>
                <p>{{totalData.duration||0}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>


    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>新增用户</td>
            <td>活跃用户</td>
            <td>累计用户</td>
            <td>启动次数</td>
            <td>平均使用时长</td>
            <td>新增多设备用户数</td>
            <td>累计多设备用户数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>基础数据</td>
            <td>{{totalData.umengData.newUsers||0}}</td>
            <td>{{totalData.umengData.activityUsers||0}}</td>
            <td>{{totalData.umengData.totalUsers||0}}</td>
            <td>{{totalData.umengData.launches||0}}</td>
            <td>{{totalData.duration||0}}</td>
            <td>{{totalData.deviceNewBindCount||0}}</td>
            <td>{{totalData.deviceBindCountTotal||0}}</td>
          </tr>
        </tbody>
      </table>
      <div style="line-height:40px">
        多设备用户数：根据mac地址判定，账号下绑定设备数大于等于2个的用户 。。
      </div>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>设备数据</td>
            <td>设备类型</td>
            <td>新增设备</td>
            <td>设备绑定量</td>
            <td>使用设备日活</td>
            <td>使用次数</td>
            <td>平均使用时长(小时)</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :rowspan="deviceData.alllength">设备数据</td>
            <td :rowspan="deviceData.data.length">国内地区</td>
            <td>{{deviceData.data[0]?deviceData.data[0].deviceType:''}}</td>
            <td>{{deviceData.data[0]?deviceData.data[0].deviceTotal:''}}</td>
            <td>{{deviceData.data[0]?deviceData.data[0].total:''}}</td>
            <td>{{deviceData.data[0]?deviceData.data[0].deviceCount:''}}</td>
            <td>{{deviceData.data[0]?deviceData.data[0].usedCount:''}}</td>
            <td>{{deviceData.data[0]?(deviceData.data[0].avgTimeUsed/3600).toFixed(2):''}}</td>
          </tr>
          <template v-for="(item,index) in deviceData.data">
            <tr v-if="index>0">
              <td>{{item.deviceType}}</td>
              <td>{{item.deviceTotal}}</td>
              <td>{{item.total}}</td>
              <td>{{item.deviceCount}}</td>
              <td>{{item.usedCount}}</td>
              <td>{{(item.avgTimeUsed/3600).toFixed(2)}}</td>
            </tr>
          </template>
          <tr>
            <td :rowspan="deviceData.internalData.length">海外地区</td>
            <td>{{deviceData.internalData[0]?deviceData.internalData[0].deviceType:''}}</td>
            <td>{{deviceData.internalData[0]?deviceData.internalData[0].deviceTotal:''}}</td>
            <td>{{deviceData.internalData[0]?deviceData.internalData[0].total:''}}</td>
            <td>{{deviceData.internalData[0]?deviceData.internalData[0].deviceCount:''}}</td>
            <td>{{deviceData.internalData[0]?deviceData.internalData[0].usedCount:''}}</td>
            <td>{{deviceData.internalData[0]?(deviceData.internalData[0].avgTimeUsed/3600).toFixed(2):''}}</td>
          </tr>
          <template v-for="(item,index) in deviceData.internalData">
            <tr v-if="index>0">
              <td>{{item.deviceType}}</td>
              <td>{{item.deviceTotal}}</td>
              <td>{{item.total}}</td>
              <td>{{item.deviceCount}}</td>
              <td>{{item.usedCount}}</td>
              <td>{{(item.avgTimeUsed/3600).toFixed(2)}}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>动态总数</td>
            <td>动态浏览数</td>
            <td>发动态用户数</td>
            <td>动态互动数</td>
            <td>Vlog动态树</td>
            <td>图片、文字动态数</td>
            <td>视频动态数</td>
            <td>话题参与用户数</td>
            <td>新增话题数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>社区</td>
            <td>{{totalData.communityInfoBean.storyCount||0}}</td>
            <td>{{totalData.communityInfoBean.readCount||0}}</td>
            <td>{{totalData.communityInfoBean.storyUsersCount||0}}</td>
            <td>{{totalData.communityInfoBean.storyInteractiveCount||0}}</td>
            <td>{{totalData.communityInfoBean.storyVideoCount||0}}</td>
            <td>{{totalData.communityInfoBean.storyPictureCount||0}}</td>
            <td>{{totalData.communityInfoBean.storyVideoCount||0}}</td>
            <td>{{totalData.communityInfoBean.storyTopicInteractiveCount||0}}</td>
            <td>{{totalData.communityInfoBean.storyTopicCount||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>新建PK赛数</td>
            <td>个人赛数</td>
            <td>团体赛数</td>
            <td>PK赛累计总数</td>
            <td>PK赛新增参与用户数</td>
            <td>PK赛累计参与用户数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>PK赛</td>
            <td>{{totalData.skippingPkData.weekSize||0}}</td>
            <td>{{totalData.skippingPkData.weekPersonal||0}}</td>
            <td>{{totalData.skippingPkData.weekTeam||0}}</td>
            <td>{{totalData.skippingPkData.totalSize||0}}</td>
            <td>{{totalData.skippingPkData.weekUser||0}}</td>
            <td>{{totalData.skippingPkData.totalUser||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>新建俱乐部数</td>
            <td>俱乐部总数</td>
            <td>活跃俱乐部数</td>
            <td>俱乐部活跃用户数</td>
            <td>新增企事业类型俱乐部数</td>
            <td>企事业类型俱乐部总数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>俱乐部</td>
            <td>{{totalData.clubDailyData.clubCount||0}}</td>
            <td>{{totalData.clubDailyData.clubTotalCount||0}}</td>
            <td>{{totalData.clubDailyData.activeClubCount||0}}</td>
            <td>{{totalData.clubDailyData.activeClubUserCount||0}}</td>
            <td>{{totalData.clubDailyData.enterprisesClubCount||0}}</td>
            <td>{{totalData.clubDailyData.enterprisesClubTotalCount||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>参与逗币用户数</td>
            <td>新增逗币用户数</td>
            <td>盲盒兑换数</td>
            <td>奖品兑换数</td>
            <td>盲盒订单数</td>
            <td>实物奖品数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>逗币玩法</td>
            <td>{{totalData.integralData.count||0}}</td>
            <td>{{totalData.integralData.new_attend_count||0}}</td>
            <td>{{totalData.integralData.box_exchange||0}}</td>
            <td>{{totalData.integralData.award_exchange||0}}</td>
            <td>{{totalData.integralData.order_post||0}}</td>
            <td>{{totalData.integralData.award_post||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>报名用户数</td>
            <td>奖池金额</td>
            <td>付费用户数</td>
            <td>付费用户完成数</td>
            <td>1元体验组用户数</td>
            <td>1元完成用户数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>红包赛</td>
            <td>{{totalData.ropeRedWeekData.totalAttend||0}}</td>
            <td>{{totalData.ropeRedWeekData.totalAmount||0}}</td>
            <td>{{totalData.ropeRedWeekData.paidUserCount||0}}</td>
            <td>{{totalData.ropeRedWeekData.paidUserCompleteCount||0}}</td>
            <td>{{totalData.ropeRedWeekData.joinTotalAttendOne||0}}</td>
            <td>{{totalData.ropeRedWeekData.completeCountOne||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>新增参与用户数</td>
            <td>累计参与用户数累计参与用户数</td>
            <td>好友赛参与数</td>
            <td>战绩分享数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>跳绳实时 PK赛</td>
            <td>{{totalData.rateCount.newUser||0}}</td>
            <td>{{totalData.rateCount.joinAllUser||0}}</td>
            <td>{{totalData.rateCount.friendGame||0}}</td>
            <td>{{totalData.rateCount.matachGame||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>新建小组数</td>
            <td>新加入小组用户数</td>
            <td>小组累计创建数</td>
            <td>小组参与用户数</td>
            <td>每小组人均用户数</td>
            <td>活跃小组数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>小组</td>
            <td>{{totalData.weekGroupCountInfo.groupCount||0}}</td>
            <td>{{totalData.weekGroupCountInfo.newMemberCount||0}}</td>
            <td>{{totalData.weekGroupCountInfo.groupTotal||0}}</td>
            <td>{{totalData.weekGroupCountInfo.memberCount||0}}</td>
            <td>{{totalData.weekGroupCountInfo.avgUserGroup||0}}</td>
            <td>{{totalData.weekGroupCountInfo.activityCount||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>参与七日计划总数</td>
            <td>初级减脂参与数</td>
            <td>中级减脂参与数</td>
            <td>初级体能参与数</td>
            <td>中级体能参与数</td>
            <td>初级减脂课程每天参与数</td>
            <td>中级减脂课程每天参与数</td>
            <td>初级体能课程每天参与数</td>
            <td>中级体能课程每天参与数</td>
            <td>1节课程参与数</td>
            <td>解锁2节课以上</td>
            <td>七日计划全部完成的人</td>
            <td>七日计划完成再次测评的人数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>7日计划总数</td>
            <td>{{totalData.sevenAllDateSum.testSum||0}}</td>
            <td>{{totalData.sevenAllDateSum.smallFatSum||0}}</td>
            <td>{{totalData.sevenAllDateSum.bigFatSum||0}}</td>
            <td>{{totalData.sevenAllDateSum.smallPhySum||0}}</td>
            <td>{{totalData.sevenAllDateSum.bigPhySum||0}}</td>
            <td>{{totalData.sevenAllDateSum.smallFatClass||0}}</td>
            <td>{{totalData.sevenAllDateSum.bigFatClass||0}}</td>
            <td>{{totalData.sevenAllDateSum.smallPhyClass||0}}</td>
            <td>{{totalData.sevenAllDateSum.bigPhyClass||0}}</td>
            <td>{{totalData.sevenAllDateSum.twoClassNotFinish||0}}</td>
            <td>{{totalData.sevenAllDateSum.twoClassFinish||0}}</td>
            <td>{{totalData.sevenAllDateSum.sevenAllFinish||0}}</td>
            <td>{{totalData.sevenAllDateSum.againTest||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tableBox">
      <table>
        <thead>
          <tr>
            <td>类型</td>
            <td>运营模块</td>
            <td>参与七日计划周总数</td>
            <td>初级减脂参与数</td>
            <td>中级减脂参与数</td>
            <td>初级体能参与数</td>
            <td>中级体能参与数</td>
            <td>初级减脂课程每天参与数</td>
            <td>中级减脂课程每天参与数</td>
            <td>初级体能课程每天参与数</td>
            <td>中级体能课程每天参与数</td>
            <td>1节课程参与数</td>
            <td>解锁2节课以上</td>
            <td>七日计划全部完成的人</td>
            <td>七日计划完成再次测评的人数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>运营数据</td>
            <td>7日计划周总数</td>
            <td>{{totalData.sevenAllDateWeek.testSum||0}}</td>
            <td>{{totalData.sevenAllDateWeek.smallFatSum||0}}</td>
            <td>{{totalData.sevenAllDateWeek.bigFatSum||0}}</td>
            <td>{{totalData.sevenAllDateWeek.smallPhySum||0}}</td>
            <td>{{totalData.sevenAllDateWeek.bigPhySum||0}}</td>
            <td>{{totalData.sevenAllDateWeek.smallFatClass||0}}</td>
            <td>{{totalData.sevenAllDateWeek.bigFatClass||0}}</td>
            <td>{{totalData.sevenAllDateWeek.smallPhyClass||0}}</td>
            <td>{{totalData.sevenAllDateWeek.bigPhyClass||0}}</td>
            <td>{{totalData.sevenAllDateWeek.twoClassNotFinish||0}}</td>
            <td>{{totalData.sevenAllDateWeek.twoClassFinish||0}}</td>
            <td>{{totalData.sevenAllDateWeek.sevenAllFinish||0}}</td>
            <td>{{totalData.sevenAllDateWeek.againTest||0}}</td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

<script>
  import {
    getIntegrationData,
  } from '@/api/operateReport/operateReport'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'

  export default {
    components: {},
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          // 0: 'gray',
          0: 'danger'
        }
        return statusMap[status]
      },
      formatDate(time) {
        time = time
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd ')
      }

    },
    computed: {
      checkPer() {
        return function(btn) {
          return (checkPermission(this.$route.path + '/' + btn))
        }
      }
    },
    data() {
      return {
        list: [],
        loading: false,
        page: 1,
        limit: 10,
        total: 0,
        searchForm: {
          weekTime: "",
          startTime: "",
          endTime: ""
        },
        deviceData: {
          data: [],
          internalData: [],
          alllength: 0
        },
        totalData: {
          "newAvgUsers": null, //日均新增用户
          "launchesAvg": null, //日均启动用户
          "deviceToTal": null, //设备总量
          "dailyAvgUsers": null, //日均活跃用户
          "duration": null, //平均使用时长
          "deviceNewBindCount": null, //新增多设备用户数
          "deviceBindCountTotal": null, //多设备用户数
          "umengData": {
            "newUsers": null, //新增用户
            "avgActivityUsers": null, //活跃用户
            "launches": null, //启动次数
            "totalUsers": null //累计用户
          },

          "weekGroupCountInfo": { //小组数据
            "groupCount": null, //小组总人数
            "newMemberCount": null, //新加入小组用户数
            "memberCount": null, //参与成员个数
            "activityCount": null, //活跃小组数
            "avgUserGroup": null, //小组平均用户
            "groupTotal": null //小组总数
          },
          "communityInfoBean": { //社区数据
            "storyCount": null, //动态总数
            "storyUsersCount": null, //发动态用户数
            "readCount": null, //动态浏览数
            "storyInteractiveCount": null, //每日动态互动人数
            "storyPictureCount": null, //每日图片动态数
            "storyVideoCount": null, //每日视频动态数
            "storyTopicCount": null, //每日新增话题数(带话题的动态数)
            "storyTopicInteractiveCount": null //每日话题参与人数
          },
          "clubDailyData": { //俱乐部
            "clubCount": null, //新增俱乐部数
            "clubTotalCount": null, //俱乐部总数
            "activeClubCount": null, //活跃俱乐部数
            "activeClubUserCount": null, //俱乐部活跃用户数
            "enterprisesClubCount": null, //新增企事业类型俱乐部数
            "enterprisesClubTotalCount": null //企事业类型俱乐部总数
          },
          "ropeRedWeekData": { //红包赛
            "totalAttend": null, //报名总人数
            "totalAmount": null, //红包总奖池金额
            "paidUserCount": null, //付费用户数
            "paidUserCompleteCount": null, //付费用户完成数
            "joinTotalAttendOne": null, //1元体验组用户数
            "completeCountOne": null //1元完成用户数
          },
          "skippingPkData": { //pk赛
            "weekSize": null, //新增pk赛数
            "weekPersonal": null, //个人赛数
            "totalSize": null, //pk赛累计总数
            "weekTeam": null, //团体赛数
            "totalUser": null, //PK赛累计参与用户数
            "weekUser": null //PK赛新增参与用户数
          },
          "integralData": { //逗币
            "count": 0, //每日活跃用户
            "newAttendCount": 0, //新增用户
            "boxExchange": 0, //兑换盲盒
            "awardExchange": 0, //兑换奖品
            "awardPost": 0, // 寄出奖品
            "orderPost": 0 //盲盒订单
          },
          "rateCount": { //实时pk赛
            "newUser": 0, //新增参数人数
            "joinAllUser": 0, //所有用户
            "matachGame": 0, //匹配赛
            "friendGame": 0 //好友赛
          },
          "sevenAllDateSum": { //总数
            "testSum": 0, //参与七⽇计划总⼈数
            "smallFatSum": 0, //初级减脂参与⼈数
            "bigFatSum": 0, //中级减脂参与⼈数
            "smallPhySum": 0, //初级体能参与⼈数
            "bigPhySum": 0, //中级体能参与⼈数
            "smallFatClass": 0, //初级减脂课程每天参与⼈数
            "bigFatClass": 0, //中级减脂课程每天参与⼈数
            "smallPhyClass": 0, //初级体能课程每天参与⼈数
            "bigPhyClass": 0, //中级体能课程每天参与⼈数
            "twoClassNotFinish": 0, //1节课程参与⼈数
            "twoClassFinish": 0, //解锁2节课以上
            "sevenAllFinish": 0, //七⽇计划全部完成的⼈
            "againTest": 0 //七⽇计划完成再次测评的⼈数
          },
          sevenAllDateWeek:{
            "testSum": 0, //参与七⽇计划总⼈数
            "smallFatSum": 0, //初级减脂参与⼈数
            "bigFatSum": 0, //中级减脂参与⼈数
            "smallPhySum": 0, //初级体能参与⼈数
            "bigPhySum": 0, //中级体能参与⼈数
            "smallFatClass": 0, //初级减脂课程每天参与⼈数
            "bigFatClass": 0, //中级减脂课程每天参与⼈数
            "smallPhyClass": 0, //初级体能课程每天参与⼈数
            "bigPhyClass": 0, //中级体能课程每天参与⼈数
            "twoClassNotFinish": 0, //1节课程参与⼈数
            "twoClassFinish": 0, //解锁2节课以上
            "sevenAllFinish": 0, //七⽇计划全部完成的⼈
            "againTest": 0 //七⽇计划完成再次测评的⼈数
          }
        },
        totalData2: {
          "newAvgUsers": null, //日均新增用户
          "launchesAvg": null, //日均启动用户
          "deviceToTal": null, //设备总量
          "dailyAvgUsers": null, //日均活跃用户
          "duration": null, //平均使用时长
          "deviceNewBindCount": null, //新增多设备用户数
          "deviceBindCountTotal": null, //多设备用户数
          "umengData": {
            "newUsers": null, //新增用户
            "avgActivityUsers": null, //活跃用户
            "launches": null, //启动次数
            "totalUsers": null //累计用户
          },

          "weekGroupCountInfo": { //小组数据
            "groupCount": null, //小组总人数
            "newMemberCount": null, //新加入小组用户数
            "memberCount": null, //参与成员个数
            "activityCount": null, //活跃小组数
            "avgUserGroup": null, //小组平均用户
            "groupTotal": null //小组总数
          },
          "communityInfoBean": { //社区数据
            "storyCount": null, //动态总数
            "storyUsersCount": null, //发动态用户数
            "readCount": null, //动态浏览数
            "storyInteractiveCount": null, //每日动态互动人数
            "storyPictureCount": null, //每日图片动态数
            "storyVideoCount": null, //每日视频动态数
            "storyTopicCount": null, //每日新增话题数(带话题的动态数)
            "storyTopicInteractiveCount": null //每日话题参与人数
          },
          "clubDailyData": { //俱乐部
            "clubCount": null, //新增俱乐部数
            "clubTotalCount": null, //俱乐部总数
            "activeClubCount": null, //活跃俱乐部数
            "activeClubUserCount": null, //俱乐部活跃用户数
            "enterprisesClubCount": null, //新增企事业类型俱乐部数
            "enterprisesClubTotalCount": null //企事业类型俱乐部总数
          },
          "ropeRedWeekData": { //红包赛
            "totalAttend": null, //报名总人数
            "totalAmount": null, //红包总奖池金额
            "paidUserCount": null, //付费用户数
            "paidUserCompleteCount": null, //付费用户完成数
            "joinTotalAttendOne": null, //1元体验组用户数
            "completeCountOne": null //1元完成用户数
          },
          "skippingPkData": { //pk赛
            "weekSize": null, //新增pk赛数
            "weekPersonal": null, //个人赛数
            "totalSize": null, //pk赛累计总数
            "weekTeam": null, //团体赛数
            "totalUser": null, //PK赛累计参与用户数
            "weekUser": null //PK赛新增参与用户数
          },
          "integralData": { //逗币
            "count": 0, //每日活跃用户
            "newAttendCount": 0, //新增用户
            "boxExchange": 0, //兑换盲盒
            "awardExchange": 0, //兑换奖品
            "awardPost": 0, // 寄出奖品
            "orderPost": 0 //盲盒订单
          },
          "rateCount": { //实时pk赛
            "newUser": 0, //新增参数人数
            "joinAllUser": 0, //所有用户
            "matachGame": 0, //匹配赛
            "friendGame": 0 //好友赛
          },
          "sevenAllDateSum": { //总数
            "testSum": 0, //参与七⽇计划总⼈数
            "smallFatSum": 0, //初级减脂参与⼈数
            "bigFatSum": 0, //中级减脂参与⼈数
            "smallPhySum": 0, //初级体能参与⼈数
            "bigPhySum": 0, //中级体能参与⼈数
            "smallFatClass": 0, //初级减脂课程每天参与⼈数
            "bigFatClass": 0, //中级减脂课程每天参与⼈数
            "smallPhyClass": 0, //初级体能课程每天参与⼈数
            "bigPhyClass": 0, //中级体能课程每天参与⼈数
            "twoClassNotFinish": 0, //1节课程参与⼈数
            "twoClassFinish": 0, //解锁2节课以上
            "sevenAllFinish": 0, //七⽇计划全部完成的⼈
            "againTest": 0 //七⽇计划完成再次测评的⼈数
          },
          sevenAllDateWeek:{
            "testSum": 0, //参与七⽇计划总⼈数
            "smallFatSum": 0, //初级减脂参与⼈数
            "bigFatSum": 0, //中级减脂参与⼈数
            "smallPhySum": 0, //初级体能参与⼈数
            "bigPhySum": 0, //中级体能参与⼈数
            "smallFatClass": 0, //初级减脂课程每天参与⼈数
            "bigFatClass": 0, //中级减脂课程每天参与⼈数
            "smallPhyClass": 0, //初级体能课程每天参与⼈数
            "bigPhyClass": 0, //中级体能课程每天参与⼈数
            "twoClassNotFinish": 0, //1节课程参与⼈数
            "twoClassFinish": 0, //解锁2节课以上
            "sevenAllFinish": 0, //七⽇计划全部完成的⼈
            "againTest": 0 //七⽇计划完成再次测评的⼈数
          }
        }
      }
    },
    mounted() {
      this.searchForm.weekTime = new Date()
      this.getAll()
    },
    methods: {
      getAll() {

        let nowData = new Date(this.searchForm.weekTime);
        //获取今天的是周几
        let currentDay = nowData.getDay();
        //把currentDay == 0赋值给周日
        if (currentDay == 0) {
          currentDay = 7
        }
        // 获取周一的时间戳
        let monDayTime = nowData.getTime() - (currentDay - 1) * 24 * 60 * 60 * 1000;
        // 获取周日的时间戳
        let sunDayTime = nowData.getTime() + (7 - currentDay) * 24 * 60 * 60 * 1000;

        // // 获取本周周一的具体时间
        // console.log("周一" + formatDate(new Date(monDayTime), 'yyyy-MM-dd '));
        // // 获取本周周日的具体时间
        // console.log("周末" + formatDate(new Date(sunDayTime), 'yyyy-MM-dd ') );
        this.searchForm.startTime = formatDate(new Date(monDayTime), 'yyyy-MM-dd')
        this.searchForm.endTime = formatDate(new Date(sunDayTime), 'yyyy-MM-dd')
        console.log(this.searchForm)
        this.getTotal();
      },
      getTotal() {
        getIntegrationData(this.searchForm).then(res => {
          for (let key in res.data) {
            if (!res.data[key]) res.data[key] = {};
          }
          this.totalData = Object.assign(this.totalData2,res.data||{}) ;
          this.deviceData.alllength = this.totalData.deviceStatisticInfo.length;
          this.totalData.deviceStatisticInfo.forEach(d => {
            if (d.area != 'internal') this.deviceData.internalData.push(d)
            else this.deviceData.data.push(d)
          })
          console.log(this.deviceData)
        })
      },

    }
  }
</script>


<style lang="scss">
  .dataBox {
    padding: 5px;
    border-radius: 5px;
    background-color: grey;

    p {
      margin: 0;
      padding: 0;

      &:first-child {
        font-size: 18px;
        line-height: 30px;
        color: #DCDFE6;
      }

      &:last-child {
        font-size: 35px;
        line-height: 40px;
        color: #ffffff;
      }
    }

  }

  .tableBox {
    table {
      border-collapse: collapse;
      width: 100%;
      border: 1px solid #000;
      border-spacing: unset;
      margin-bottom: 20px;

      thead {
        background-color: grey;
        height: 40px;
        line-height: 40px;
      }

      tr {
        border: 1px solid #000;

        td {
          padding-left: 5px;
          color: #ffffff;
          border: 1px solid #000;
          height: 40px;
          line-height: 40px;

          &:last-child {
            border: none;
          }
        }
      }

      tbody {
        tr {
          td {
            color: #000;
          }
        }
      }
    }



  }
</style>
