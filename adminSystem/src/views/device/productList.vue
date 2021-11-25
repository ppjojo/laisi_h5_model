<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="deviceName" label="产品名">
      </el-table-column>
      <el-table-column align="center" label="产品图">
        <template slot-scope="scope">
          <img :src="scope.row.deviceIconSmallUrl" alt="" width="100px">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="deviceModel" label="产品具体型号">
      </el-table-column>
      <el-table-column align="center" prop="bindRule" label="绑定规则">
      </el-table-column>
      <el-table-column align="center" prop="deviceOrderNumber" label="排序">
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'产品'" :visible.sync="dialogVisible" width="70%" append-to-body>
      <productEdit :formItem="form" @refresh="getList();dialogVisible=false"></productEdit>
    </el-dialog>

  </div>
</template>

<script>
import { listItem, deleteItem } from "@/api/device/productList";
import ProductEdit from "./productEdit.vue";

export default {
  props: {
    groupList: Array,
    groupId: String,
  },
  components: {
    ProductEdit,
  },

  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        // 1: 'gray',
        0: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      dialogVisible: false,
      form: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      listItem({}).then((res) => {
        if (res.code == 0) {
          this.list = [];
          res.data.forEach((item) => {
            if (item.deviceGroupId == this.groupId) {
              this.list.push(item);
            }
          });
        }
      });
    },
    btn_add() {
      this.form = {
        languageType: null, //所属语言类型
        deviceName: "",
        deviceType: "",
        deviceVendor: "",
        deviceModel: "",
        deviceIconSmallUrl: "",
        deviceIconLargeUrl: "",
        description: "",
        bindRule: "",
        bindStrategy: "",
        bindDeviceLimit: 1,
        bindUserLimit: 1,
        androidVersion: "",
        iosVersion: "",
        homePageTitle: "",
        deviceVendorLogo: "",
        deviceScanName: "",
        deviceBindAnimation: "",
        protocolType: "",
      };
      this.dialogVisible = true;
      this.dialogTitle = "新增";
    },
    btn_edit(row) {
      this.form = Object.assign({}, row);
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
    },
    //删除
    btn_delete(id) {
      this.$confirm("此操作将永久删除产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteItem({
            id: id,
          }).then((response) => {
            this.getList();
            this.$notify({
              type: "success",
              message: "成功删除所选产品!",
            });
          });
        })
        .catch(() => {
          this.$notify({
            message: "已取消删除产品操作",
            type: "info",
          });
        });
    },
  },
};
</script>

