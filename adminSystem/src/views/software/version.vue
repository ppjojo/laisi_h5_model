<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-select v-model="searchForm.appId">
          <el-option v-for="item in appList" :key="item.appid" :label="item.appName" :value="item.appid">
          </el-option>
        </el-select>
        <el-form-item>
          <el-button type="success" @click="getAppData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="版本历史">
        <div class="container-edit">
          <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="versionHistoryList" element-loading-text="Loading" border fit
          highlight-current-row size="small ">
          <el-table-column align="center" prop="appId" label="AppID"></el-table-column>
          <el-table-column align="center" prop="verCode" label="版本号"></el-table-column>
          <el-table-column align="center" prop="verName" label="版本名称"></el-table-column>
          <el-table-column align="center" label="升级类型">
            <template scope="scope">
              {{scope.row.updateType == 1?"强制升级":"普通升级"}}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="OS类型">
                        <template scope="scope">
                            {{scope.row.osType == 1?"Android":"IOS"}}
                        </template>
                    </el-table-column> -->
          <!-- <el-table-column align="center" prop="inDesc" label="内部版本说明" ></el-table-column>
                    <el-table-column align="center" prop="extDesc" label="外部版本说明" ></el-table-column> 
                    <el-table-column align="center" prop="notes" label="备注" ></el-table-column>-->

          <el-table-column align="center" label="是否紧急修复">
            <template scope="scope">
              <el-tag :type="scope.row.needRepair | statusFilter" size="mini">
                {{ scope.row.needRepair==1?"是":"否" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否启用">
            <template scope="scope">
              <el-tag :type="scope.row.useFlag | statusFilter" size="mini">
                {{ scope.row.useFlag==1?"是":"否" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template scope="scope">
              <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
              </el-button>
              <el-button @click=" btn_import(scope.row)" type="text" style="color:#67c23a;" size="mini"
                v-if="checkPer('import')">导入渠道包
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="版本渠道">
        <el-table :data="versionChannelList" highlight-current-row v-loading="versionChannelListLoading"
          style="width: 100%;">
          <el-table-column align="center" prop="apkId" label="ID"></el-table-column>
          <el-table-column align="center" prop="verCode" label="版本号"></el-table-column>

          <el-table-column align="center" prop="channelId" label="渠道ID"></el-table-column>
          <el-table-column align="center" prop="channelName" label="渠道名称"></el-table-column>

          <el-table-column align="center" prop="fileName" label="文件名" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column align="center" prop="url" label="文件存储地址" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column align="center" label="是否使用">
            <template scope="scope">
              <el-tag :type="scope.row.enabled | statusFilter" size="mini">
                {{ scope.row.enabled==1?"是":"否" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template scope="scope">
              <div class='btns'>
                <el-button size="mini" v-if="checkPer('edit')" type="text" @click="handlePackageEdit(scope.row)">
                  编辑
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="当前版本">
        <el-table :data="allChannelCurrentVersionList" highlight-current-row
          v-loading="allChannelCurrentVersionListLoading" style="width: 100%;">
          <el-table-column align="center" prop="channelId" label="渠道ID"></el-table-column>
          <el-table-column align="center" prop="channelName" label="渠道名称"></el-table-column>

          <el-table-column align="center" prop="verCode" label="版本号"></el-table-column>
          <el-table-column align="center" prop="verName" label="版本名称"></el-table-column>
          <el-table-column align="center" label="升级类型">
            <template scope="scope">
              {{scope.row.updateType == 1?"强制升级":"普通升级"}}
            </template>
          </el-table-column>

          <el-table-column align="center" prop="apkId" label="Apk包ID"></el-table-column>
          <!-- <el-table-column align="center" prop="updateTime" label="更新时间"></el-table-column> -->

          <el-table-column align="center" label="操作" width="150">
            <template scope="scope">
              <div class='btns'>
                <el-button size="mini" type="text" v-if="checkPer('edit')"
                  @click="handleCurrentVersionEdit(scope.$index, scope.row)">编辑
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="灰度发布版本">
        <el-table :data="allGrayscaleReleaseVersionList" highlight-current-row
          v-loading="allGrayscaleReleaseVersionListLoading" style="width: 100%;">
          <el-table-column align="center" prop="channelId" label="渠道ID"></el-table-column>
          <el-table-column align="center" prop="channelName" label="渠道名称"></el-table-column>

          <el-table-column align="center" prop="verId" label="版本ID"></el-table-column>
          <el-table-column align="center" prop="verCode" label="版本号"></el-table-column>
          <el-table-column align="center" prop="verName" label="版本名称"></el-table-column>

          <el-table-column align="center" prop="apkId" label="Apk包ID"></el-table-column>
          <el-table-column align="center" prop="groupName" label="白名单组分组组名"></el-table-column>

          <el-table-column align="center" label="操作" width="200">
            <template scope="scope">
              <div class='btns'>
                <el-button size="small" type="text" v-if="checkPer('edit')"
                  @click="editGrayscaleReleaseVersionForm(scope.$index, scope.row)">设置</el-button>
                <el-button size="small" v-if=' scope.row.order == 0' type="text" v-if="checkPer('addgray')"
                  @click="addGrayVerByChannelId(scope.$index, scope.row)">添加灰度版本</el-button>
                <el-button size="small" v-else=' scope.row.order == 1' type="text" v-if="checkPer('addgray')"
                  style="color:#f78989;" @click="delGrayVerByChannelId(scope.$index, scope.row)">
                  删除灰度版本</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>




    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'版本'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="150px" :rules="rules" ref="form">
        <el-form-item label="版本ID：" prop="verId" v-show='versionAddorEdit == 0'>
          <el-input v-model="form.verId" disabled></el-input>
        </el-form-item>
        <el-form-item label="版本号：" prop="verCode">
          <el-input v-model="form.verCode"></el-input>
        </el-form-item>
        <el-form-item label="版本名称：" prop="verName">
          <el-input v-model="form.verName"></el-input>
        </el-form-item>

        <el-form-item label="是否强制升级：" prop="updateType">
          <el-radio-group v-model="form.updateType">
            <el-radio class="radio" :label="1">强制升级</el-radio>
            <el-radio class="radio" :label="0">普通升级</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否紧急修复：" prop="needRepair">
          <el-radio-group v-model="form.needRepair">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用：" prop="useFlag">
          <el-radio-group v-model="form.useFlag">
            <el-radio class="radio" :label="1">是</el-radio>
            <el-radio class="radio" :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="发布时间：" prop="releaseTime">
          <el-date-picker v-model="form.releaseTime" type="datetime" placeholder="选择发布的日期时间" value-format='timestamp'>
          </el-date-picker>
        </el-form-item>

        <el-form-item label="内部说明：" prop="inDesc">
          <el-input v-model="form.inDesc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="外部说明：" prop="extDesc">
          <el-input v-model="form.extDesc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="notes">
          <el-input v-model="form.notes" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 版本渠道更新 和 历史版本的导入渠道表单 -->
    <el-dialog :title="dialogTitle+'渠道包'" :visible.sync="versionChannelFormVisible">
      <el-form :model="versionChannelForm" label-width="150px" :rules="rules" ref="versionChannelForm">
        <el-form-item label="AppID：" prop="appId" v-if="dialogTitle=='导入'">
          <el-input v-model="versionChannelForm.appId" disabled></el-input>
        </el-form-item>
        <el-form-item label="渠道ID：" prop="channelId" v-if="dialogTitle=='导入'">
          <el-input v-model="versionChannelForm.channelId" :disabled="!isIOS"></el-input>
        </el-form-item>
        <el-form-item label="版本ID：" prop="verId" v-if="dialogTitle=='导入'">
          <el-input v-model="versionChannelForm.verId" :disabled="!isIOS"></el-input>
        </el-form-item>

        <el-form-item label="apkId：" prop="apkId" v-if="dialogTitle=='编辑'">
          <el-input v-model="versionChannelForm.apkId" disabled></el-input>
        </el-form-item>

        <el-form-item label="testFlightUrl" prop="apkId" v-if="isIOS">
          <el-input v-model="versionChannelForm.url"></el-input>
        </el-form-item>
        <el-form-item label="size" prop="apkId" v-if="isIOS">
          <el-input v-model="versionChannelForm.fileSize"></el-input>
        </el-form-item>
        <el-form-item label="md5" prop="apkId" v-if="isIOS">
          <el-input v-model="versionChannelForm.md5"></el-input>
        </el-form-item>

        <el-form-item label="上传的文件名：" prop="fileName" v-if="!isIOS">
          <el-input v-model="versionChannelForm.fileName" disabled></el-input>
          <el-upload ref='upload' action="" :http-request="requestPackageFile" :show-file-list="true" multiple
            :file-list="fileList" :limit="99">
            <el-button size="small" type="primary">点击上传文件</el-button>
            <div slot="tip" class="el-upload__tip">
              如ReHealth-1.0.1016.0-qa-release.apk或 ReHealth-2.0.1152-EnvProd-jiagu_PTA.apk，另外，渠道ID不能超过10个字符。</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注：" prop="notes">
          <el-input v-model="versionChannelForm.notes" type="textarea"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="versionChannelFormVisible = false">取消</el-button>
        <el-button size="mini" type="primary" :loading="apkUpload"
          @click="submitVersionChannelForm('versionChannelForm')">提交
        </el-button>
      </div>
    </el-dialog>

    <!-- 当前版本的更新表单 -->
    <el-dialog title="编辑该渠道的当前版本信息" :visible.sync="currentVersionByChannelIdFormVisible">
      <el-form :model="currentVersionByChannelIdForm" label-width="150px" :rules="currentVersionByChannelIdFormRules"
        ref="currentVersionByChannelIdForm">

        <el-form-item label="AppID：" prop="appId">
          <el-input v-model="currentVersionByChannelIdForm.appId" disabled></el-input>
        </el-form-item>

        <el-form-item label="渠道ID：" prop="channelId">
          <el-input v-model="currentVersionByChannelIdForm.channelId" disabled></el-input>
        </el-form-item>
        <el-form-item label="渠道名称：" prop="channelName">
          <el-input v-model="currentVersionByChannelIdForm.channelName" disabled></el-input>
        </el-form-item>

        <el-form-item label="版本号：" prop="verId">
          <el-input v-model="currentVersionByChannelIdForm.verId" disabled></el-input>
        </el-form-item>
        <el-form-item label="版本名称：" prop="verName">
          <el-select value-key='verId' v-model="selectCurrentVer" @change='selectCurrentVerChange'>
            <el-option v-for="item in versionHistoryList" :key="item.verId" :label="item.verName" :value="item"
              :disabled="item.useFlag==0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否强制升级：" prop="updateType">
          <el-radio-group v-model="currentVersionByChannelIdForm.updateType" disabled>
            <el-radio class="radio" :label="1">强制升级</el-radio>
            <el-radio class="radio" :label="0">普通升级</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="currentVersionByChannelIdFormVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="SubmitCurrentVerByChannelId('currentVersionByChannelIdForm')">提交
        </el-button>
      </div>
    </el-dialog>

    <!-- 设置灰度发布版本信息表单 -->
    <el-dialog :title="Grayformtitle" :visible.sync="GrayscaleReleaseVersionFormVisible">
      <el-form :model="GrayscaleReleaseVersionForm" label-width="150px" :rules="GrayscaleReleaseVersionFormRules"
        ref="GrayscaleReleaseVersionForm">
        <el-form-item label="AppID：" prop="appId" v-if='GrayAddorEdit == 1'>
          <el-input v-model="GrayscaleReleaseVersionForm.appId" disabled></el-input>
        </el-form-item>
        <el-form-item label="渠道ID：" prop="channelId" v-if='GrayAddorEdit == 1'>
          <el-input v-model="GrayscaleReleaseVersionForm.channelId" disabled></el-input>
        </el-form-item>
        <el-form-item label="渠道名称：" prop="channelName">
          <el-input v-model="GrayscaleReleaseVersionForm.channelName" disabled></el-input>
        </el-form-item>

        <el-form-item label="选择灰度版本：" prop="verId">
          <el-select v-model="GrayscaleReleaseVersionForm.verId" clearable>
            <el-option v-for="item in versionHistoryList" :key="item.verId" :label="item.verName" :value="item.verId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择白名单分组：" prop="groupId">
          <el-select v-model="GrayscaleReleaseVersionForm.groupId" clearable>
            <el-option v-for="item in whiteListData" :key="item.groupId" :label="item.groupName" :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="GrayscaleReleaseVersionFormVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click.native="grayVersionSubmit('GrayscaleReleaseVersionForm')">
          提交</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {
    queryVersionHistoryList,
    addVersionByappId,
    editVersionByappId
  } from '@/api/software/version'
  import {
    queryVersionChannelList,
    versionByChannelIdDetail,
    uploadVersionByChannelId2,
    editVersionByChannelId2
  } from '@/api/software/version'
  import {
    queryAllChannelCurrentVersionList,
    currentVersionByChannelIdDetail,
    editCurrentVersionByChannelId
  } from '@/api/software/version'
  import {
    queryGrayVerlist,
    addGrayVer,
    updateGrayVer,
    delGrayVer,
  } from '@/api/software/version'
  import {
    listItem as whiteList
  } from '@/api/firmware/whiteList'
  import {
    listItem as appList
  } from '@/api/software/appList'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    getUInfo
  } from '@/utils/auth'

  import {
    fileUploadOrigin
  } from '@/utils/fileUpload'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          // 1: 'gray',
          0: 'danger'
        }
        return statusMap[status]
      }
    },
    computed: {
      checkPer() {
        return function (btn) {
          return (checkPermission(this.$route.path + '/' + btn))
        }
      }
    },
    data() {
      return {
        versionHistoryList: [],
        loading: false,

        dialogVisible: false,
        form: {},
        rules: {
          releaseTime: [{
            required: true,
            message: '请选择发布的日期时间',
            trigger: 'change'
          }],
        },
        appList: [],
        searchForm: {
          appId: ""
        },

        versionChannelList: [],
        versionChannelListLoading: true,
        versionChannelFormVisible: false,
        versionChannelForm: {},
        apkUpload: false,


        // 选项卡---当前版本的数据定义
        allChannelCurrentVersionList: [], //所有渠道当前版本的信息列表
        allChannelCurrentVersionListLoading: false,
        selectCurrentVer: {},
        currentVersionByChannelIdFormVisible: false,
        currentVersionByChannelIdForm: {
          appId: null,
          channelId: null,
          userId: null,
          verId: null,
          verName: null,
        },

        //选项卡--灰度发布版本的数据定义
        allGrayscaleReleaseVersionList: [], // order 为0的灰度为根灰度， 不可删除
        allGrayscaleReleaseVersionListLoading: false,

        GrayAddorEdit: -1, //更新：0， 添加： 1
        Grayformtitle: "",
        GrayscaleReleaseVersionFormVisible: false,
        GrayscaleReleaseVersionForm: {
          id: null, //灰度id, 更新时需要
          appId: null, //添加时需要
          channelId: null, //添加时需要

          verId: null,
          groupId: null,
          userId: null,
        },

        whiteListData: [],
        isIOS: false,
        fileList: []




      }
    },
    mounted() {
      this.getAppList()
    },
    methods: {
      getAppData() {
        this.isIOS = this.appList.find(obj => obj.appid == this.searchForm.appId).appName.includes("iOS")
        //版本列表
        queryVersionHistoryList({
          appId: this.searchForm.appId
        }).then(res => {
          this.versionHistoryList = res.data
          this.loading = false
        })
        //渠道包列表
        queryVersionChannelList({
          appId: this.searchForm.appId
        }).then(res => {
          this.versionChannelList = res.data
          this.versionChannelListLoading = false
        })
        //当前版本
        queryAllChannelCurrentVersionList({
          appId: this.searchForm.appId
        }).then(res => {
          this.allChannelCurrentVersionList = res.data
          this.allGrayscaleReleaseVersionListLoading = false
        })
        //灰度信息
        queryGrayVerlist({
          appId: this.searchForm.appId
        }).then(res => {
          this.allGrayscaleReleaseVersionList = res.data
          this.allChannelCurrentVersionListLoading = false
          if (this.whiteListData.length > 0) {
            this.allGrayscaleReleaseVersionList.map(item => {
              this.whiteListData.forEach(wItem => {
                if (wItem.groupId == item.groupId) {
                  item.groupName = wItem.groupName
                }
              });
            })
          }
        })

        //白名单
        whiteList({}).then(res => {
          this.whiteListData = res.data
        })

      },
      //获取所有的app
      getAppList() {
        appList({}).then(res => {
          this.appList = res.data
          this.searchForm.appId = res.data[0].appid
          this.getAppData()
        })
      },
      //版本历史保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.dialogTitle == "新增") {
              addVersionByappId(this.form).then(response => {
                this.getAppData()
                this.$notify({
                  type: 'success',
                  message: '成功新增' + this.form.verName
                });
              })
            } else {
              editVersionByappId(this.form).then(response => {
                this.getAppData()
                this.$notify({
                  type: 'success',
                  message: '成功修改' + this.form.verName
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //版本历史的新增
      btn_add() {
        this.dialogVisible = true;
        this.dialogTitle = "新增"
        this.form = {
          appId: this.searchForm.appId, //添加时需要
          verId: null, //版本ID: 更新时需要
          verCode: null,
          verName: null, //版本名称
          updateType: 0, //1:强制升级；默认0:普通升级
          needRepair: 0, //是否紧急修复; 默认0:否, 1:是
          useFlag: 1, //是否启用
          inDesc: '', //内部说明
          extDesc: '', //外部说明
          notes: '', //备注
          userId: null,
          releaseTime: null, //发布时间 : 时间戳格式
        }
      },
      //版本历史的编辑
      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.form = Object.assign({}, row)
      },
      // 版本渠道列表的编辑按钮的点击事件
      handlePackageEdit(row) {
        this.versionChannelFormVisible = true
        this.dialogTitle = '编辑'
        this.versionChannelForm = row
        this.fileList = []
      },
      //导入渠道包
      btn_import(row) {
        this.versionChannelFormVisible = true
        this.dialogTitle = '导入'
        this.versionChannelForm = {
          appId: row.appId, //上传所需字段
          verId: row.verId, //上传所需字段
          channelId: null, //上传所需字段

          apkId: null, //更新需要传字段

          apkFile: null,
          fileName: "defaultName",
          md5: null, //对文件加密, 
          userId: null,
          notes: row.notes,
        }
        this.fileList = []
      },
      //删除
      btn_delete(id) {
        this.$confirm('此操作将永久删除卡片标题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem({
            id: id,
          }).then(response => {
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功删除所选卡片标题!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除卡片标题操作',
            type: 'info'
          });
        });
      },
      requestPackageFile(param) {
        var fileObj = param.file

        let _ = this
        //验证文件是否符合规范
        let fileName = fileObj.name
        let FilechannelId = ""
        let suffixName = fileName.substring(fileName.length - 4, fileName.length)
        let datastr = fileName.substring(0, fileName.length - 4)
        let filenameArr = datastr.split("-")



        let packagename = filenameArr[0]




        if (!(suffixName == '.apk')) {
          return this.$message({
            showClose: true,
            message: "上传文件类型错误，应为'.apk'类型文件，请重新确认并上传！",
            type: "error"
          });

        } else if (!(filenameArr.length == 4)) {
          return this.$message({
            showClose: true,
            message: "文件名命名格式有问题，请重新命名并上传！",
            type: "error"
          });

        } else if (FilechannelId.length > 10) {
          return this.$message({
            showClose: true,
            message: "文件名里设置的渠道ID超过10个字符",
            type: "error"
          });
        }
        //  else if (!(verType == 'release' || verType == 'debug')) {
        //     return this.$message({
        //         showClose: true,
        //         message: "文件名里设置的版本分类不是release或者debug",
        //         type: "error"
        //     });
        // } 

        if (fileName.indexOf("release") == -1) {
          if (filenameArr[3].split("_").length < 2) {
            return this.$message({
              showClose: true,
              message: "文件名命名格式有问题，请重新命名并上传！",
              type: "error"
            });
          }
          FilechannelId = filenameArr[3].split("_")[1]
        } else {
          FilechannelId = filenameArr[2]
        }

        if (!(this.limitFilechannelId(FilechannelId))) {
          return this.$message({
            showClose: true,
            message: "文件名里设置的渠道ID不存在",
            type: "error"
          });
        }

        // this.versionChannelForm.channelId = FilechannelId;
        this.versionChannelForm.fileName = fileName;
        this.versionChannelForm.userId = JSON.parse(getUInfo()).id;
        this.versionChannelForm.channelId = FilechannelId;
        this.versionChannelForm.apkFile = fileObj;
        this.versionChannelForm.packagename = packagename

        let selfForm = {
          channelId: FilechannelId,
          fileName: fileName,
          userId: JSON.parse(getUInfo()).id,
          apkFile: fileObj,
          packagename: packagename,
          appId:  this.versionChannelForm.appId, //上传所需字段
          verId:  this.versionChannelForm.verId, //上传所需字段

          apkId: this.versionChannelForm.apkId, //更新需要传字段
          md5: null, //对文件加密, 
          notes:  this.versionChannelForm.notes,
        };

        this.submitVersionChannelForm("versionChannelForm", selfForm)
      },
      //上传文件时，对文件名里命名的渠道ID进行有效检验（该渠道是否存在）
      limitFilechannelId(FilechannelId) {
        for (let i = 0; i < this.allChannelCurrentVersionList.length; i++) {
          let item = this.allChannelCurrentVersionList[i]
          let itemChannelID = this.allChannelCurrentVersionList[i].channelId
          if (FilechannelId == itemChannelID) {
            return true
          }
        }
        return false
      },
      submitVersionChannelForm2(formObj) {
        let submitFormObj = this.versionChannelForm
        if (formObj) {
          submitFormObj = formObj
        }
        if (this.dialogTitle == "导入") {
          uploadVersionByChannelId2(submitFormObj).then(response => {
            this.apkUpload = false;
            this.getAppData()
            this.$notify({
              type: 'success',
              message: '成功新增渠道包'
            });
            this.versionChannelFormVisible = false
          }).catch(error => {
            this.apkUpload = false;
            this.versionChannelFormVisible = false
          })

        } else {
          this.versionChannelForm.userId = JSON.parse(getUInfo()).id
          editVersionByChannelId2(submitFormObj).then(response => {
            this.apkUpload = false;
            this.$message.close();
            this.getAppData()
            this.$notify({
              type: 'success',
              message: '成功修改渠道包'
            });
            this.versionChannelFormVisible = false
          }).catch(error => {
            this.apkUpload = false;
            this.versionChannelFormVisible = false
          })

        }
      },
      submitVersionChannelForm(formName, formObj) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.versionChannelForm.apkFile) {
              this.submitVersionChannelForm2();
              return;
            }
            if (!formObj && !formObj.apkFile) {
              this.submitVersionChannelForm2();
              return;
            }
            let messageOption = this.$message({
              duration: 0,
              type: 'warning',
              message: '正在上传渠道包，请稍后'
            });
            var fileForm = new FormData()
            fileForm.append('file', formObj.apkFile)
            fileForm.append('dir', "appPackage/" + formObj.packagename)
            fileUploadOrigin(fileForm).then(res => {
              messageOption.close();
              if (res.code == 0) {
                formObj.url = res.data.url;
                formObj.fileSize = res.data.size;
                formObj.md5 = res.data.md5;
                this.submitVersionChannelForm2(formObj)
              }
            }).catch(error => {
              messageOption.close();
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 当前版本列表的编辑按钮的点击事件
      handleCurrentVersionEdit(index, row) {
        let _ = this
        this.currentVersionByChannelIdFormVisible = true
        this.selectCurrentVer = {}
        this.currentVersionByChannelIdForm = row

        this.selectCurrentVer.verName = row.verName
        this.selectCurrentVer.verId = row.verId
      },
      // 选择某个渠道的当前版本的下拉选择事件
      selectCurrentVerChange() {
        this.currentVersionByChannelIdForm.verId = this.selectCurrentVer.verId
        this.currentVersionByChannelIdForm.verName = this.selectCurrentVer.verName
        this.currentVersionByChannelIdForm.updateType = this.selectCurrentVer.updateType
      },
      // 当前版本的表单编辑的提交按钮
      SubmitCurrentVerByChannelId(formName) {
        this.currentVersionByChannelIdFormLoading = true;
        let para = {
          appId: this.currentVersionByChannelIdForm.appId,
          channelId: this.currentVersionByChannelIdForm.channelId,
          verId: this.currentVersionByChannelIdForm.verId,
          userId: JSON.parse(getUInfo()).id,
        }

        editCurrentVersionByChannelId(para)
          .then(res => {
            this.currentVersionByChannelIdFormLoading = false;
            this.$notify({
              type: 'success',
              message: '成功修改'
            });
            this.currentVersionByChannelIdFormVisible = false;
            this.getAppData()
          })
      },
      // 灰度发布版本列表的设置按钮    编辑该渠道下的灰度发布版本信息
      editGrayscaleReleaseVersionForm(index, row) {
        this.GrayscaleReleaseVersionFormVisible = true;
        this.GrayAddorEdit = 0
        this.Grayformtitle = '设置该渠道下的灰度发布版本信息'
        this.GrayscaleReleaseVersionForm = row
      },
      //灰度发布版本列表的添加此渠道灰度发布版本的按钮 点击事件
      addGrayVerByChannelId(index, row) {
        this.GrayAddorEdit = 1
        this.Grayformtitle = '添加此渠道灰度发布版本'
        this.GrayscaleReleaseVersionFormVisible = true
        this.GrayscaleReleaseVersionForm = {
          id: null, //灰度id, 更新时需要
          appId: row.appId, //添加时需要
          channelId: row.channelId, //添加时需要
          channelName: row.channelName, //渠道名称，显示用
          verId: null,
          groupId: null,
          userId: null,
        }

      },
      //灰度发布版本列表的删除此渠道灰度发布版本的按钮 点击事件
      delGrayVerByChannelId(index, row) {
        this.$confirm('此操作将永久删除该灰度版本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delGrayVer({
            id: row.id
          }).then(response => {
            this.getAppData()
            this.$notify({
              type: 'success',
              message: '成功删除所选灰度版本!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除灰度版本',
            type: 'info'
          });
        });
      },
      grayVersionSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.GrayscaleReleaseVersionFormVisible = false

            if (this.GrayAddorEdit) {
              let para = {
                appId: this.GrayscaleReleaseVersionForm.appId, //添加时需要
                channelId: this.GrayscaleReleaseVersionForm.channelId, //添加时需要
                verId: this.GrayscaleReleaseVersionForm.verId,
                groupId: this.GrayscaleReleaseVersionForm.groupId,
                userId: JSON.parse(getUInfo()).id
              }
              addGrayVer(para).then(response => {
                this.getAppData()
                this.$notify({
                  type: 'success',
                  message: '成功新增'
                });
              })
            } else {
              let para = {
                id: this.GrayscaleReleaseVersionForm.id, //灰度id, 更新时需要
                verId: this.GrayscaleReleaseVersionForm.verId,
                groupId: this.GrayscaleReleaseVersionForm.groupId,
                userId: JSON.parse(getUInfo()).id
              }
              updateGrayVer(para).then(response => {
                this.getAppData()
                this.$notify({
                  type: 'success',
                  message: '成功修改'
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }

</script>
