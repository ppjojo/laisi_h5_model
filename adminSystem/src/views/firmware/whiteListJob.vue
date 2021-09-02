<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="groupId" label="白名单组ID">
      </el-table-column>
      <el-table-column align="center" prop="deviceType" label="设备类型">
      </el-table-column>
      <el-table-column align="center" prop="deviceModel" label="设备型号">
      </el-table-column>
      <el-table-column align="center" prop="activeDays" label="有效天数">
      </el-table-column>
      <el-table-column align="center" prop="sizeLimit" label="有效人数">
      </el-table-column>
      <el-table-column align="center" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status == 1 ? "正常" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
          </el-button>
          <el-button @click="btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('delete')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle + '白名单定时任务'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="白名单组ID" prop="groupId">
          <el-select v-model="form.groupId" clearable placeholder="请选择">
            <el-option v-for="item in allWhiteList" :label="item.groupName" :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceType">
        <el-select v-model="form.deviceType" clearable placeholder="请选择">
            <el-option v-for="item in deviceTypeList" :label="item.deviceType" :value="item.deviceType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" prop="deviceModel">
          <el-input v-model="form.deviceModel"></el-input>
        </el-form-item>
        <el-form-item label="同步时长（天）" prop="activeDays">
          <el-input v-model="form.activeDays"></el-input>
        </el-form-item>
        <el-form-item label="人数限制" prop="sizeLimit">
          <el-input v-model="form.sizeLimit"></el-input>
        </el-form-item>
        <el-form-item label="规则" prop="cron">
            <div>
                <a  target="_blank"    style="color:blue"  href="https://www.bejson.com/othertools/cron/">规则生成页https://www.bejson.com/othertools/cron/</a>
            </div>
          <el-input v-model="form.cron"></el-input>
        </el-form-item>
        <el-form-item label="平台" prop="platform">
          <el-input v-model="form.platform" placeholder="android||ios||不填写"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="countryList">
          <el-input v-model="form.countryList" placeholder="CN:US:AU"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listItem,
    addItem,
    deleteItem,
    updateItem,
  } from "@/api/firmware/whiteListJob";
  import {
    listItem as queryWhitelist
  } from '@/api/firmware/whiteList';
  import {
    listItem as productListItem
  } from '@/api/device/productList'
  import {
    checkPermission
  } from "@/api/checkPermission";
  import {
    getUInfo
  } from "@/utils/auth";

  export default {
    computed: {
      checkPer() {
        return function (btn) {
          return checkPermission(this.$route.path + "/" + btn);
        };
      },
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
        rules: {},
        allWhiteList: [],
        deviceTypeList: [], //设备类型
      };
    },
    mounted() {
      this.getList();
      this.getAllWhiteList()
      this.getProductList()
    },
    methods: {
      getList() {
        listItem({}).then((res) => {
          this.list = res.data;
          this.loading = false;
        });
      },
      getAllWhiteList() {
        queryWhitelist().then(res => {
          this.allWhiteList = res.data
        })
      },
      getProductList() {
        productListItem({}).then(res => {
          var obj = {};
          this.deviceTypeList = res.data.reduce((arr, next) => {
            obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
            return arr;
          }, []);
          
        })
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (this.dialogTitle == "新增") {
              addItem(this.form).then((response) => {
                this.getList();
                this.$notify({
                  type: "success",
                  message: "成功新增白名单规则",
                });
                this.dialogVisible = false;
              });
            } else {
              updateItem(this.form).then((response) => {
                this.getList();
                this.$notify({
                  type: "success",
                  message: "成功修改白名单规则",
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
          groupId: "",
          deviceModel: "",
          deviceType: null,
          activeDays: "",
          sizeLimit: "",
          cron: "",
          status: 1,
          platform: "",
          countryList: "CN:US:AU",
        };
      },
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑";
        this.form = Object.assign({}, row);
      },

      //删除
      btn_delete(row) {
        this.$confirm("此操作将永久删除白名单规则, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            deleteItem({
              id: row.id,
            }).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功删除所选白名单规则!",
              });
            });
          })
          .catch(() => {
            this.$notify({
              message: "已取消删除白名单操作规则",
              type: "info",
            });
          });
      },
    },
  };

</script>
