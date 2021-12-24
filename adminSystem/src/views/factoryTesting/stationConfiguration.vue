<template>
  <div class="app-container">
    <div class="container-edit">
      <el-button type="primary" size="mini" @click="btn_add()">添加配置项</el-button>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column align="center" prop="configId" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="projectName" label="项目名称" width="150"></el-table-column>
      <!-- <el-table-column align="center" prop="factoryId" label="工厂ID" width="150">
      </el-table-column> -->
      <el-table-column align="center" prop="factoryName" label="工厂名" width="150">
      </el-table-column>
      <el-table-column align="center" prop="stationName" label="站位名称" width="150">
      </el-table-column>
      <el-table-column align="center" prop="testTypeName" label="测试类型" width="150">
      </el-table-column>

      <el-table-column align="center" prop="testItemList" label="适用的站位配置集合">
        <template scope="scope">
          <span v-for='item in scope.row.testItemList'>{{item.testItemName}}、</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
          </el-button>
          <el-button @click=" btn_delete(scope.row.configId)" type="text" style="color:#f78989;" size="mini">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'配置项'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">

        <el-form-item label="工厂" prop="factoryId">
          <el-select v-model="form.factoryId" clearable>
            <el-option v-for="item in factoryList" :key="item.id" :label="item.factoryName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" prop="projectId">
          <el-select v-model="form.projectId" clearable>
            <el-option v-for="item in projectList" :key="item.id" :label="item.projectName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="站位" prop="testStationId">
          <el-select v-model="form.testStationId" clearable>
            <el-option v-for="item in stationList" :key="item.id" :label="item.stationName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="测试类型" prop="testTypeId">
          <el-select v-model="form.testTypeId" clearable>
            <el-option v-for="item in testTypeList" :key="item.id" :label="item.testTypeName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试项" prop="testItemIdList">
          <div v-for="(item, ind) in form.testItemList" :key='ind' style="margin-bottom: 15px;">
            <el-select v-model="item.testItemId" @change="testItemsListShow">
              <el-option v-for="tItem in allTestItemList" v-show="!tItem.disabled || tItem.id==item.id" :label="tItem.testItemName" :value="tItem.id"></el-option>
            </el-select>
            <el-button v-if="ind == form.testItemList.length-1" icon="el-icon-plus" size='small' circle @click="addTestItem"></el-button>
            <el-button type="danger" size='small' icon="el-icon-delete" circle @click="delTestItem(ind, item)">
            </el-button>
          </div>
          <el-button v-if=" !(form.testItemList && form.testItemList.length)" icon="el-icon-plus" size='small' circle @click="addTestItem"></el-button>

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
  updateItem,
  deleteItem,
} from "@/api/factoryTesting/stationConfiguration";
import { listItem2 as projectListItem } from "@/api/factoryTesting/project";
import { listItem as testItemListItem } from "@/api/factoryTesting/testItem";
import { listItem2 as testTypeListItem } from "@/api/factoryTesting/testType";
import { listItem as station } from "@/api/factoryTesting/station";
import { listItem as factoryItem } from "@/api/factoryTesting/factory";
import { checkPermission } from "@/api/checkPermission";

export default {
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
      form: {
        testItemIdList: [],
      },
      rules: {
        projectId: [
          {
            required: true,
            message: "请选择项目",
            trigger: "change",
          },
        ],
        testTypeId: [
          {
            required: true,
            message: "请选择测试类型",
            trigger: "change",
          },
        ],
        testStationId: [
          {
            required: true,
            message: "请选择站位",
            trigger: "change",
          },
        ],
        factoryId: [
          {
            required: true,
            message: "请选择工厂",
            trigger: "change",
          },
        ],
        testItemNameList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个测试项",
            trigger: "change",
          },
        ],
      },
      projectList: [],
      allTestItemList: [],
      testTypeList: [],
      stationList: [],
      factoryList: [],
    };
  },
  mounted() {
    this.getList();
    this.getProjectList();
    this.getTestItemList();
    this.getTestTypeList();
    this.getStation();
    this.getFactory();
  },
  methods: {
    getList() {
      listItem({}).then((res) => {
        this.list = res.data;
        this.loading = false;
      });
    },
    getProjectList() {
      projectListItem({}).then((res) => {
        this.projectList = res.data;
      });
    },
    getTestItemList() {
      testItemListItem({}).then((res) => {
        this.allTestItemList = res.data;
      });
    },
    getTestTypeList() {
      testTypeListItem({}).then((res) => {
        this.testTypeList = res.data;
      });
    },
    getStation() {
      station({}).then((res) => {
        this.stationList = res.data;
      });
    },
    getFactory() {
      factoryItem({}).then((res) => {
        this.factoryList = res.data;
      });
    },
    //保存
    submitForm(formName) {
      var ids = [];
      this.form.testItemList.forEach((item) => {
        ids.push(item.testItemId);
      });
      this.form.testItemIdList = ids;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          if (this.dialogTitle == "新增") {
            addItem(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功新增配置项",
              });
            });
          } else {
            this.form.id = this.form.configId;
            updateItem(this.form).then((response) => {
              this.getList();
              this.$notify({
                type: "success",
                message: "成功修改配置项",
              });
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
        projectId: null, //测试项名称
        testTypeId: null, //测试项缩写
        testItemIdList: [],
        testItemList: [],
      };
    },
    btn_edit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.form = Object.assign({}, row);
      this.testItemsListShow();
    },
    //删除
    btn_delete(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
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
              message: "成功删除所选!",
            });
          });
        })
        .catch(() => {
          this.$notify({
            message: "已取消删除操作",
            type: "info",
          });
        });
    },
    addTestItem() {
      this.form.testItemList.push({});
    },
    delTestItem(ind, item) {
      this.form.testItemList.splice(ind, 1);
      this.testItemsListShow();
    },
    //剔除已选择的选项
    testItemsListShow() {
      this.allTestItemList = this.allTestItemList.map((item) => {
        item.disabled = false;
        return item;
      });
      this.allTestItemList = this.allTestItemList.map((item) => {
        for (let i = 0; i < this.form.testItemList.length; i++) {
          if (item.id == this.form.testItemList[i].testItemId) {
            item.disabled = true;
          }
        }
        return item;
      });
    },
  },
};
</script>
