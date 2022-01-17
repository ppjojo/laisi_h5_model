<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="俱乐部ID">
          <el-input v-model="searchForm.clubId" clearable placeholder="俱乐部ID"></el-input>
        </el-form-item>
        <el-form-item label="俱乐部名称">
          <el-input v-model="searchForm.name" clearable placeholder="俱乐部名称"></el-input>
        </el-form-item>
        <el-form-item label="成员ID">
          <el-input v-model="searchForm.memberId" clearable placeholder="成员ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload ref='upload' action="" :http-request="exportClub" :show-file-list="false" class="avatar-uploader">
            <el-button type="primary">导入俱乐部</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="90"></el-table-column>
      <el-table-column align="center" prop="photo" label="照片">
        <template scope="scope">
          <img :src="scope.row.photo" style="width: 50px;height: 50px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="俱乐部名称">
      </el-table-column>
      <el-table-column align="center" prop="memberNum" label="成员数量">
      </el-table-column>
      <el-table-column align="center" prop="creator" label="创建者">
      </el-table-column>
      <el-table-column align="center" prop="location" label="位置">
        <template scope="scope">
          {{scope.row.province+scope.row.city+scope.row.county}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('view')">查看
          </el-button>
          <el-upload ref='upload' action="" :http-request="exportGroup" v-if="scope.row.type=='05'" :show-file-list="false" class="avatar-uploader">
            <el-button type="text" size="mini" @click="clubId=scope.row.id">导入分部</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>

    <!--新增和编辑界面-->
    <el-dialog title="俱乐部详情" :visible.sync="dialogVisible" width="70%">
      <el-form :model="clubItem" label-width="120px" ref="clubItem">
        <el-form-item label="俱乐部照片:">
          <div><img :src="clubItem.photo" style="width: 100px;height: 100px;" alt=""></div>
        </el-form-item>
        <el-form-item label="俱乐部名称:">
          <div>{{clubItem.name}}</div>
        </el-form-item>
        <el-form-item label="俱乐部简介:">
          <div>{{clubItem.introduce}}</div>
        </el-form-item>
        <el-form-item label="标签:">
          <div>{{clubItem.label=="00"?"跳绳":""}}</div>
        </el-form-item>
        <el-form-item label="是否公开:">
          <div>{{clubItem.isPublic=="N"?"公开":"不公开"}}</div>
        </el-form-item>
        <el-form-item label="位置:">
          <div>{{clubItem.province||""+clubItem.city+clubItem.county}}</div>
        </el-form-item>
        <el-form-item label="成员数量:">
          <div>{{clubItem.memberNumber}}</div>
        </el-form-item>
      </el-form>
      <div v-if="clubItem.type=='05'">
        <el-divider content-position="left">分部列表</el-divider>
        <el-table :data="groupList" highlight-current-row height="500" style="width: 100%;">
          <el-table-column prop="name" label="分部名"></el-table-column>
          <el-table-column prop="totalNumber" label="人数"></el-table-column>
          <el-table-column align="center" prop="image" label="照片">
            <template scope="scope">
              <img :src="scope.row.image" style="width: 50px;height: 50px;" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template scope="scope">
              <el-button @click="clubGroupId=scope.row.id;clubGroupInfo()" type="text" size="mini">查看成员
              </el-button>
              <el-upload ref='upload' action="" :http-request="exportGroupMember" :show-file-list="false">
                <el-button type="text" size="mini" @click="clubGroupId=scope.row.id">导入成员</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
        <div>
        </div>

        <div v-if="clubItem.type!='05'">
          <el-divider content-position="left">成员列表</el-divider>
          <div>
            <el-button type="primary" @click="clubExportClick(clubItem.id)" v-if="checkPer('export')">导出成员运动数据</el-button>
          </div>
          <el-table :data="memberList" highlight-current-row height="300" style="width: 100%;">
            <el-table-column prop="memberId" label="用户ID"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="headPictureUrl" label="头像">
              <template scope="scope">
                <img :src="scope.row.headPictureUrl" style="width: 40px;height: 40px;" alt="">
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="clubItem.type!='05'">
          <el-divider content-position="left">今日运动</el-divider>
          <el-table :data="todaySportList" highlight-current-row height="300" style="width: 100%;">
            <el-table-column prop="memberId" label="用户ID"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="ropeNum" label="个数"></el-table-column>
          </el-table>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog title='分部人员列表' :visible.sync="groupMemberListVisible" width="70%" append-to-body>
      <el-table :data="groupMemberList" highlight-current-row style="width: 100%;">
        <el-table-column prop="memberId" label="用户ID"></el-table-column>
        <el-table-column prop="accountNickname" label="昵称"></el-table-column>
        <el-table-column prop="clubGroupNickname" label="组内昵称"></el-table-column>
        <!-- <el-table-column prop="nickname" label="昵称"></el-table-column> -->
        <el-table-column prop="headPictureUrl" label="头像">
          <template scope="scope">
            <img :src="scope.row.headPictureUrl" style="width: 40px;height: 40px;" alt="">
          </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="操作" width="120">
          <template scope="scope">
            <el-button @click="dataRevert(scope.row)" type="text" size="mini">数据找回
            </el-button>
          </template>
        </el-table-column> -->

      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="groupMemberListVisible = false">取消
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  listItem,
  searchListItem,
  viewItem,
  todaySport,
  clubExport,
  adminCreateClub,
  adminCreateClubGroup,
  adminCreateClubGroupMember,
  getGroupList,
  clubGroupInfo,
} from "@/api/afterSale/club";
import { checkPermission } from "@/api/checkPermission";
import Pagination from "@/components/pagination";
function timestampTodate2(date, type) {
  if (date) {
    var newdate = new Date(date);

    var year = newdate.getFullYear();
    var day =
      newdate.getDate() < 10 ? "0" + newdate.getDate() : newdate.getDate();
    var month =
      newdate.getMonth() + 1 < 10
        ? "0" + (newdate.getMonth() + 1)
        : newdate.getMonth() + 1;

    if (type == "-") {
      return year + "-" + month + "-" + day;
    } else if (type == "M/D") {
      return newdate.getMonth() + 1 + "月" + newdate.getDate() + "日";
    } else {
      return year + "/" + month + "/" + day;
    }
  }
}

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        Y: "success",
        // 1: 'gray',
        N: "danger",
      };
      return statusMap[status];
    },
  },
  components: {
    Pagination,
  },
  computed: {
    checkPer() {
      return function (btn) {
        return checkPermission(this.$route.path + "/" + btn);
      };
    },
  },
  data() {
    return {
      clubId: "",
      clubGroupId: "",
      searchForm: {
        memberId: "",
        name: "",
        clubId: "",
      },

      list: [],
      page: 1,
      total: 0,

      listLoading: false,

      clubItem: {},
      dialogVisible: false,
      todaySportList: [],
      memberList: [],
      groupList: [],
      groupMemberList: [],
      groupMemberListVisible: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      listItem({
        page: this.page,
        pageSize: 10,
      }).then((res) => {
        this.list = res.data.clubList;
        this.total = res.data.totalNum;
        this.loading = false;
      });
    },
    getGroupList(row) {
      if (row.type != "05") return;
      getGroupList({
        page: 1,
        pageSize: 1000,
        clubId: row.id,
      }).then((res) => {
        this.groupList = res.data;
      });
    },
    searchData() {
      this.page = 1;
      let para = this.searchForm;
      if (para.clubId == "" && para.name == "" && para.memberId == "") {
        this.page = 1;
        this.getList();
        return;
      }
      para.pageSize = 9999;
      searchListItem(para).then((res) => {
        this.loading = false;
        this.list = res.data;
      });
    },
    // 上下分页
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    btn_edit(row) {
      this.clubId = row.id;
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.getGroupList(row);
      viewItem({
        clubId: row.id,
      }).then((res) => {
        this.clubItem = res.data;
        this.dialogVisible = true;
      });
      if (row.type != "05") {
        todaySport({
          clubId: row.id,
          page: 1,
          pageSize: 9999,
          date: timestampTodate2(new Date().getTime(), "-"),
        }).then((res) => {
          this.todaySportList = res.data.sportList || res.data.clubGroupVoList;
          this.memberList = res.data.memberList;
        });
      }
    },
    clubGroupInfo() {
      clubGroupInfo({
        clubGroupId: this.clubGroupId,
        clubId: this.clubId,
      }).then((res) => {
        this.groupMemberList = res.data.clubGroupList;
      });
      this.groupMemberListVisible = true;
    },
    clubExportClick(id) {
      window.open(
        process.env.VUE_APP_BASE_API + "club/excel/export?clubId=" + id
      );
    },
    exportClub(param) {
      var fileForm = new FormData();
      fileForm.append("multipartFile", param.file);
      adminCreateClub(fileForm).then((res) => {
        if (res.code == 0) {
          this.getList();
          this.$notify({
            type: "success",
            message: "俱乐部导入成功!",
          });
        } else {
          this.$notify({
            message: res.msg,
            type: "info",
          });
        }
      });
    },
    exportGroup(param) {
      var fileForm = new FormData();
      fileForm.append("clubId", this.clubId);
      fileForm.append("multipartFile", param.file);
      adminCreateClubGroup(fileForm).then((res) => {
        if (res.code == 0) {
          this.$notify({
            type: "success",
            message: "分部导入成功!",
          });
        } else {
          this.$notify({
            message: res.msg,
            type: "info",
          });
        }
      });
    },
    exportGroupMember(param) {
      console.log(this.clubGroupId);
      var fileForm = new FormData();
      fileForm.append("clubId", this.clubId);
      fileForm.append("clubGroupId", this.clubGroupId);
      fileForm.append("multipartFile", param.file);
      adminCreateClubGroupMember(fileForm).then((res) => {
        if (res.code == 0) {
          this.$notify({
            type: "success",
            message: "分部导入成功!",
          });
        } else {
          this.$notify({
            message: res.msg,
            type: "info",
          });
        }
      });
    },
  },
};
</script>