<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="工厂">
          <el-select v-model="searchForm.factoryId" placeholder="全部" clearable>
            <el-option v-for="item in factoryList" :key="item.id" :label="item.factoryName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目">
          <el-select v-model="searchForm.projectId" placeholder="全部" clearable>
            <el-option v-for="item in projectList" :key="item.id" :label="item.projectName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="测试类型">
          <el-select v-model="searchForm.testTypeId" placeholder="全部" clearable>
            <el-option v-for="item in testTypeList" :key="item.id" :label="item.testTypeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属测试项">
          <el-select v-model="searchForm.testItemId" placeholder="全部" clearable>
            <el-option v-for="item in testItemList" :key="item.id" :label="item.testItemName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属MAC：">
          <el-input v-model.trim="searchForm.deviceMac" clearable> </el-input>
        </el-form-item>

        <el-form-item label="测试时间">
          <el-date-picker v-model="searchForm.timestamp" type="date" value-format='timestamp' placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工单号">
          <el-input v-model.trim="searchForm.testBatch" clearable> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="page=0;getList()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false" class="avatar-uploader">
            <el-button type="success">上传并导出</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row size="small ">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="">
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">ID：</el-col>
              <el-col :span="21">{{ props.row.id }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">工厂：</el-col>
              <!-- <el-col :span="3">{{ props.row.factory_id }}</el-col> -->
              <el-col :span="18">{{ props.row.factoryName }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">项目：</el-col>
              <!-- <el-col :span="3">{{ props.row.project_id }}</el-col> -->
              <el-col :span="18">{{ props.row.projectName }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">测试类型：</el-col>
              <!-- <el-col :span="3">{{ props.row.test_type_id }}</el-col> -->
              <el-col :span="18">{{ props.row.testTypeName }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">测试项：</el-col>
              <!-- <el-col :span="3">{{ props.row.test_item_id }}</el-col> -->
              <el-col :span="5">{{ props.row.testItemName}}</el-col>
              <el-col :span="4">{{ props.row.testItemAbbreviate }}</el-col>
              <el-col :span="9">{{ props.row.testItemClues }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">MAC地址：</el-col>
              <el-col :span="21">{{ props.row.device_mac }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">测试 工单号：</el-col>
              <el-col :span="21">{{ props.row.test_batch }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">测试数据：</el-col>
              <el-col :span="21">{{ props.row.raw_test_result_data }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">测试结果：</el-col>
              <el-col :span="21">
                <el-tag :type="props.row.test_status | statusFilter" size="mini">{{ props.row.test_status==1?"通过":props.row.test_status==2?"未通过":props.row.test_status==0?"未测试":"" }}
                </el-tag>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3" style="color:#99a9bf;">测试结果数据：</el-col>
              <el-col :span="21">{{ props.row.rawTestResultData}}</el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="test_batch" label="测试工单号"></el-table-column>
      <el-table-column align="center" prop="factoryName" label="工厂名称"></el-table-column>
      <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
      <el-table-column align="center" prop="testTypeName" label="测试类型名称"></el-table-column>
      <el-table-column align="center" prop="testItemName" label="测试项名称"></el-table-column>
      <el-table-column align="center" prop="device_mac" label="MAC地址"></el-table-column>
      <el-table-column align="center" prop="timestamp" label="测试时间">
        <template scope="scope">
          {{scope.row.timestamp | formatDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="raw_test_result_data" label="测试数据">
      </el-table-column>
      <el-table-column align="center" prop="test_status" label="测试结果">
        <template slot-scope="scope">
          <el-tag :type="scope.row.test_status | statusFilter" size="mini">{{ scope.row.test_status==1?"通过":scope.row.test_status==2?"未通过":scope.row.test_status==0?"未测试":"" }}
          </el-tag>
        </template>
      </el-table-column>

    </el-table>

    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>

  </div>
</template>

<script>
import { listItem, exportTestResult } from "@/api/factoryTesting/testResult";
import { listItem as factoryListItem } from "@/api/factoryTesting/factory";
import { listItem as projectListItem } from "@/api/factoryTesting/project";
import { listItem as testItemListItem } from "@/api/factoryTesting/testItem";
import { listItem as testTypeListItem } from "@/api/factoryTesting/testType";
import { checkPermission } from "@/api/checkPermission";
import Pagination from "@/components/pagination";
import { formatDate } from "@/utils/date";

export default {
  components: {
    Pagination,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        0: "gray",
        2: "danger",
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
      searchForm: {},
      list: [],
      loading: false,
      page: 0,
      limit: 10,
      total: 20,
      factoryList: [],
      projectList: [],
      testItemList: [],
      testTypeList: [],
    };
  },
  mounted() {
    this.getList();
    this.getFactoryList();
    this.getProjectList();
    this.getTestItemList();
    this.getTestTypeList();
  },
  methods: {
    getList() {
      listItem({
        page: this.page,
        pageSize: this.limit,
        ...this.searchForm,
      }).then((res) => {
        this.list = res.data.content;
        this.total = res.data.totalElements;
        this.loading = false;
      });
    },
    // 上下分页
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getList();
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    getFactoryList() {
      factoryListItem({}).then((res) => {
        this.factoryList = res.data;
      });
    },
    getProjectList() {
      projectListItem({}).then((res) => {
        this.projectList = res.data;
      });
    },
    getTestItemList() {
      testItemListItem({}).then((res) => {
        this.testItemList = res.data;
      });
    },
    getTestTypeList() {
      testTypeListItem({}).then((res) => {
        this.testTypeList = res.data;
      });
    },
    requestFile(param) {
      var fileForm = new FormData();
      fileForm.append("file", param.file);

      exportTestResult(fileForm).then((res) => {
        let fileName = "factoryTestResult.xls";
        var blob = new Blob([res], {
          type: "application/vnd.ms-excel;charset=utf-8",
        });
        if (window.navigator.msSaveOrOpenBlob) {
          //msSaveOrOpenBlob方法返回bool值
          navigator.msSaveBlob(blob, fileName); //本地保存
        } else {
          var link = document.createElement("a"); //a标签下载
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
      });
    },
  },
};
</script>

<style>
.el-row {
  height: 30px;
}
.el-col {
  line-height: 30px;
}
</style>