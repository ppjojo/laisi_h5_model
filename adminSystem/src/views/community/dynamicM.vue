<template>
  <div class="app-container">
    <div class="container-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="authorId">
          <el-input v-model="searchForm.authorId" placeholder="作者ID"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="searchForm.auditState">
            <el-option label="未审核" :value="0"></el-option>
            <el-option label="阿里云审核未通过" :value="1"></el-option>
            <el-option label="阿里云审核通过" :value="2"></el-option>
            <el-option label="人工审核未通过" :value="3"></el-option>
            <el-option label="人工审核通过" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间段：" prop="startTime_endTime">
          <el-date-picker v-model="startTime_endTime" type="datetimerange" value-format="timestamp" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
      <el-table-column align="center" prop="authorId" label="用户ID">
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称">
      </el-table-column>
      <el-table-column align="center" prop="content" show-overflow-tooltip label="内容">
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="发布时间">
        <template scope="scope">
          {{scope.row.createTime.split('.')[0].replace('T',' ')}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="location" label="发布地点">
      </el-table-column>
      <el-table-column align="center" prop="" label="审核状态">
        <template scope="scope">
          {{scope.row.auditState==0?"未审核":scope.row.auditState==1?"阿里云审核未通过":scope.row.auditState==2?"阿里云审核通过":scope.row.auditState==3?"人工审核未通过":scope.row.auditState==4?"人工审核通过":""}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="readCount" label="状态">
        <template scope="scope">
          {{scope.row.status==1?"已删除":scope.row.type==2?(scope.row.videoInfo?"视频审核通过":"视频审核未通过"):"无视频"}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="readCount" label="点击数">
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
          </el-button>

          <el-button @click=" hotrate(scope.row)" type="text" style="color:#67C23a;" size="mini"
            v-if="checkPer('cold')">热度
          </el-button>
          <el-button @click=" btn_approval(scope.row)" type="text" style="color:#FF4D51;" size="mini"
            v-if="checkPer('delete')">人工审核
          </el-button>
          <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
            v-if="checkPer('delete')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button size="mini" type="primary" style="margin-top: 20px;" v-if="hasNext==1" @click="getList">下一页</el-button>
    </el-col>


    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle+'动态'" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" label-width="80px" :rules="rules" ref="form" v-loading="formLoading">
        <el-form-item label="昵称:">
          <el-input :disabled="true" v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <div>{{form.content}}</div>
        </el-form-item>
        <el-divider content-position="left"><span style="color: red;">修改成功之后，需等待后台数据才会刷新</span></el-divider>
        <el-divider content-position="left"><span style="color: red;">"图片已丢失"的图片地址:</span></el-divider>
        <el-divider content-position="left">
          https://oss.laisitech.com/ffb21bd7-21df-41fe-863a-5f846e17a4d7_880x880</el-divider>

        <el-form-item label="动态图片:">
          <div v-for="(url,index) in form.mediaUrlArray">
            <el-input v-model="form.mediaUrlArray[index]"></el-input>
            <el-image style="width: 100px; height: 100px;margin-top: 15px;" :preview-src-list="form.mediaUrlArray"
              :src="url" fit="fit"></el-image>
          </div>
        </el-form-item>
        <el-button size="small" type="primary" v-if="form.type==2" @click="goPlayer()">查看视频
        </el-button>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" v-if="dialogTitle != '人工审核'" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogTitle != '人工审核'" size="mini" @click="submitForm('form')">确 定</el-button>
        <el-button size="mini" @click="approval(2)" v-if="dialogTitle == '人工审核'">审核不通过</el-button>
        <el-button type="primary" v-if="dialogTitle == '人工审核'" size="mini" @click="approval(1)">审核通过</el-button>
      </div>
    </el-dialog>

    <el-dialog title='视频预览' :visible.sync="playShow" @close="closeDialog" width="50%">
      <div class="prism-player" id="J_prismPlayer"></div>
    </el-dialog>

    <el-dialog title="动态数据统计" :visible.sync="reportVisible" width="50%">
      <el-form :model="form" label-width="80px" :inline="true">
        <el-form-item label="ID:">
          {{form.storyId}}
        </el-form-item>
        <el-form-item label="收藏数:">
          {{form.marksCount}}
        </el-form-item>
        <el-form-item label="点赞数:">
          {{form.likesCount}}
        </el-form-item>
        <el-form-item label="评论数:">
          {{form.commentCount}}
        </el-form-item>
        <el-form-item label="总评论数:">
          {{form.totalComment}}
        </el-form-item>
        <el-form-item label="转发:">
          {{form.forwardCount}}
        </el-form-item>
        <el-form-item label="时间系数:">
          {{form.timeRate}}
        </el-form-item>
        <el-form-item label="热度系数:">
          {{form.hotRate}}
        </el-form-item>
        <el-form-item label="热度:">
          {{form.hot}}
        </el-form-item>
      </el-form>
      <el-form :model="form" label-width="80px">
        <el-form-item label="自身热度:">
          <el-input v-model="form.selfRate"></el-input>
        </el-form-item>
        <el-form-item label="阅读数:">
          <el-input v-model="form.readCount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="reportVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="submit_hotrate('form')">确 定</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    listItem,
    SearchBySome,
    updateItem,
    deleteItem,
    updateAuditState,
    hotrate_Detail,
    hotrate_Update
  } from '@/api/community/dynamicM'
  import {
    getPlayAuth
  } from '@/api/videoCourse/course'
  import {
    checkPermission
  } from '@/api/checkPermission'

  export default {
    computed: {
      checkPer() {
        return function (btn) {
          return (checkPermission(this.$route.path + '/' + btn))
        }
      }
    },
    data() {
      return {
        list: [],
        index: 0,
        hasNext: 0,
        loading: false,
        playShow: false,

        dialogVisible: false,
        form: {},
        rules: {
          deviceTitle: [{
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          }, ],
          deviceType: [{
            required: true,
            message: '请输入产品类型',
            trigger: 'blur'
          }, ],
          deviceModel: [{
            required: true,
            message: '请输入产品型号',
            trigger: 'blur'
          }, ],
        },
        searchForm: {
          authorId: "",
          endTime: "",
          startTime: ""
        },
        startTime_endTime: "",
        reportVisible: false

      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        listItem({
          index: this.index,
          pageSize: 10,
          userId: 10000000
        }).then(res => {
          if (this.index == 0) {
            this.list = res.data.content;
          } else {
            this.list = this.list.concat(res.data.content);
          }

          this.index = res.data.index;
          this.hasNext = res.data.hasNext;
          this.loading = false
        })
      },
      searchData() {
        let para = this.searchForm;
        if (this.startTime_endTime) {
          para.startTime = this.startTime_endTime[0]
          para.endTime = this.startTime_endTime[1]
        } else {
          para.startTime = ""
          para.endTime = ""
        }
        if (para.authorId == "" && para.startTime == "" && para.endTime == "" && para.auditState == "") {
          this.index = 0
          this.getList();
          return
        }


        SearchBySome(para).then(res => {
          this.listLoading = false;
          this.list = res.data;
        })
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            this.form.mediaUrl = this.form.mediaUrlArray.join(",")
            updateItem(this.form).then(response => {
              this.getList()
              this.$notify({
                type: 'success',
                message: '成功修改动态'
              });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      btn_edit(row) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑"
        this.formtitle = "编辑"
        this.form = Object.assign({}, row)
        if (this.form.mediaUrl) {
          this.$set(this.form, "mediaUrlArray", this.form.mediaUrl.split(','))
        }
      },
      btn_approval(row) {
        this.dialogVisible = true;
        this.dialogTitle = "人工审核"
        this.formtitle = "人工审核"
        this.form = Object.assign({}, row)
        if (this.form.mediaUrl) {
          this.$set(this.form, "mediaUrlArray", this.form.mediaUrl.split(','))
        }
      },
      approval(flag) {
        let str = '是否确定不通过该动态？';
        if (flag == 1) str = '是否确定通过该动态?';
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateAuditState({
            id: this.form.id,
            authorId: this.form.authorId,
            auditState: flag == 1 ? 4 : 3
          }).then(response => {
            this.dialogVisible = false
            this.searchData()
            this.$notify({
              message: '成功审核该条动态!'
            });
          })
        }).catch(() => {
          this.dialogVisible = false
          this.$notify({
            message: '已取消操作',
            type: 'info'
          });
        });
      },
      //删除
      btn_delete(row) {
        this.$confirm('此操作将永久删除该条动态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteItem({
            storyId: row.id,
            authorId: row.authorId
          }).then(response => {
            this.index = 0
            this.getList()
            this.$notify({
              type: 'success',
              message: '成功删除该条动态!'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除操作',
            type: 'info'
          });
        });
      },
      //修改热度
      hotrate(row) {
        hotrate_Detail({
          storyId: row.id
        }).then(res => {
          this.form = res.data
          this.reportVisible = true
        })
      },
      submit_hotrate() {

        hotrate_Update(this.form).then(response => {
          this.$notify({
            type: 'success',
            message: '动态相关系数以修改!'
          });
          setTimeout(() => {
            this.reportVisible = false
          })
        })
      },
      //获取视频播放凭证
      goPlayer() {
        this.playShow = true
        getPlayAuth({
          videoId: this.form.videoId,
          videoType: 2
        }).then(res => {
          if (res.code == 0) {
            this.playShow = true
            this.player = new Aliplayer({
              id: 'J_prismPlayer',
              width: '100%',
              autoplay: true,
              vid: this.form.videoId,
              playauth: res.data.playAuth,
              cover: res.data.videoMeta.coverURL,
              encryptType: 1,
            }, function (player) {
              console.log('播放器创建好了。')
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
          }

        })

      },
      //视频关闭
      closeDialog() {
        this.player.dispose()
      },

    }
  }

</script>
