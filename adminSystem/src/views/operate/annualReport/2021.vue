<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="name" label="品牌名">
      </el-table-column>
      <el-table-column align="center" prop="brandCode" label="品牌标识码">
      </el-table-column>
      <el-table-column align="center" prop="instruction" label="品牌说明">
      </el-table-column>
      <el-table-column align="center" label="品牌logo">
        <template slot-scope="scope">
          <img :src="scope.row.logo" alt="" width="80px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click="btn_addRed(scope.row)" type="text" size="mini" style="color:#67c23a">添加红包
          </el-button>
          <el-button @click="btn_redStatus(scope.row)" type="text" size="mini" style="color:#67c23a">红包状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'品牌'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌标识码" prop="brandCode">
          <el-input v-model="form.brandCode"></el-input>
        </el-form-item>
        <el-form-item label="品牌说明" prop="instruction">
          <el-input v-model="form.instruction"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logo">
          <el-input v-model="form.logo" style="margin-bottom: 10px;"></el-input>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <img v-if="form.logo" :src="form.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增和编辑界面-->
    <el-dialog :title="this.form.name+'的红包'" :visible.sync="redDialogVisible" width="50%">
      <el-form :model="redForm" label-width="100px" :rules="rules" ref="redForm">
        <el-form-item label="红包最大值" prop="maxAmount">
          <el-input v-model="redForm.maxAmount">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="红包最小值" prop="minAmount">
          <el-input v-model="redForm.minAmount">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="红包总个数" prop="totalSize">
          <el-input v-model="redForm.totalSize"></el-input>
        </el-form-item>
        <el-form-item label="红包总金额" prop="totalAmount">
          <el-input v-model="redForm.totalAmount">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="redDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="redSubmitForm('redForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--红包详情-->
    <el-dialog :title="this.form.name+'的红包详情'" :visible.sync="detailDialogVisible" width="60%">
      <el-form :model="redForm" label-width="120px" :rules="rules" ref="redForm">
        <el-form-item label="红包总个数">
          <el-input v-model="redForm.totalSize" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="红包总金额">
          <el-input v-model="redForm.totalAmount" :disabled="true">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="已领取红包个数:" v-if="redForm.opened">
          {{redForm.opened.totalSize}}个
        </el-form-item>
        <el-form-item label="已领取红包金额:" v-if="redForm.opened">
          {{redForm.opened.totalAmount/100}}元
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="packetList" element-loading-text="Loading" border fit highlight-current-row size="small ">
        <el-table-column align="center" prop="id" label="ID" width="65">
        </el-table-column>
        <el-table-column align="center" prop="amount" label="金额（元）">
          <template slot-scope="scope">
            {{scope.row.amount/100}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userId" label="领取用户ID">
        </el-table-column>
        <el-table-column align="center" label="状态" width="110">
          <template slot-scope="scope" v-if="scope.row.status">
            <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==2?"已领取":scope.row.status==1?"未领取":"" }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="领取时间" width="110">
                    <template slot-scope="scope">
                        {{scope.row.tradeTime? (scope.row.tradeTime| formatDate):""}}
                    </template>
                </el-table-column> -->
      </el-table>
      <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
      </pagination>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="detailDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from "@/components/pagination";
import {
  listItem,
  addItem,
  updateItem,
  addRedItem,
  redPacketStatus,
} from "@/api/operate/annualReport/2020";
import { checkPermission } from "@/api/checkPermission";
import { fileUpload } from "@/utils/fileUpload";
import { formatDate } from "@/utils/date";

export default {
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        2: "success",
        1: "gray",
        // 1: 'danger'
      };
      return statusMap[status];
    },
    formatDate(time) {
      time = time;
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
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
      list: [],
      loading: false,

      dialogVisible: false,
      form: {},
      rules: {
        maxAmount: [
          { required: true, message: "请输入红包最大值", trigger: "change" },
        ],
        minAmount: [
          { required: true, message: "请输入红包最小值", trigger: "change" },
        ],
        totalAmount: [
          { required: true, message: "请输入红包总金额", trigger: "change" },
        ],
        totalSize: [
          { required: true, message: "请输入红包总数量", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入品牌名", trigger: "change" }],
        brandCode: [
          { required: true, message: "请输入品牌标识码", trigger: "change" },
        ],
        instruction: [
          { required: true, message: "请输入品牌说明", trigger: "change" },
        ],
      },
      redDialogVisible: false,
      redForm: {
        opened: {
          totalSize: 0,
          totalAmount: 0,
        },
      },

      page: 1,
      limit: 10,
      total: 0,
      detailDialogVisible: false,
      packetList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      listItem({
        year: 2021,
      }).then((res) => {
        this.list = res.data;
        this.loading = false;
      });
    },
    //保存品牌
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogTitle == "新增") {
            addItem(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功新增" + this.form.name,
              });
              this.dialogVisible = false;
            });
          } else {
            updateItem(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功修改" + this.form.name,
              });
              this.dialogVisible = false;
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    btn_add() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      this.form = {
        name: "",
        logo: "",
        brandCode: "",
      };
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.form = Object.assign({}, row);
    },
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);
      fileUpload(fileForm).then((res) => {
        if (res.code == 0) {
          this.form.logo = res.data.url;
        }
      });
    },
    btn_addRed(row) {
      this.dialogTitle = "新增";
      this.form = Object.assign({}, row);
      this.redDialogVisible = true;
      this.redForm = {
        brandId: row.id,
        maxAmount: null,
        minAmount: null,
        totalAmount: null,
        totalSize: null,
      };
    },
    btn_redStatus(row) {
      this.dialogTitle = "新增";
      this.form = Object.assign({}, row);
      this.getRedPacketStatus();
    },
    getRedPacketStatus() {
      redPacketStatus(
        {
          pageNum: this.page,
          pageSize: this.limit,
          year: 2021,
        },
        {
          // "amount": 0,
          // "lockTime": "",
          // "status": 0,
          // "tradeId": 0,
          // "tradeTime": "",
          // "userId": 0
          brandId: this.form.id,
          year: 2021,
        }
      ).then((res) => {
        this.detailDialogVisible = true;
        this.packetList = res.data.packets;
        this.total = res.data.totalSize;
        this.redForm = Object.assign({}, res.data);
      });
    },
    // 上下分页
    handleCurrentChange(val) {
      this.page = val;
      this.getRedPacketStatus();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.limit = val;
      this.getRedPacketStatus();
    },
    redSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let para = Object.assign({}, this.redForm);
          para.maxAmount = para.maxAmount * 100;
          para.minAmount = para.minAmount * 100;
          para.totalAmount = para.totalAmount * 100;
          para.year = 2021;
          if (this.dialogTitle == "新增") {
            addRedItem(para).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功新增" + this.form.name + "的红包",
              });
              this.redDialogVisible = false;
            });
          } else {
            updateItem(para).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功修改" + this.form.name + "的红包",
              });
              this.redDialogVisible = false;
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar {
  width: 120px;
  display: block;
}
</style>