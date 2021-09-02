<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px;" size="medium" @click="addnew">新增</el-button>
    <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
      size="small ">
      <el-table-column align="center" prop="newsTitle" label="新闻标题">
      </el-table-column>
      <!-- <el-table-column align="center" prop="newsBody" label="新闻正文">
      </el-table-column> -->
      <el-table-column align="center" width="80px" label="标签">
        <template slot-scope="scope">
          {{scope.row.newsTag==0?'活动':'新闻'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateUser" width="100px" label="编辑人">
      </el-table-column>
      <el-table-column align="center" prop="createTime" width="140px" label="上传时间">
      </el-table-column>
      <el-table-column align="center" prop="newsPicture" width="150px" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.newsPicture" style="width: 100px;" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="newsTop" width="80px" label="置顶">
      </el-table-column>
      <el-table-column align="center" width="150px" label="操作">
        <template scope="scope">
          <el-button @click="btn_edit(scope.row,2)" type="text" size="mini">编辑
          </el-button>
          <el-button @click="delItem(scope.row.id)" type="text" size="mini">删除
          </el-button>
          <!-- <el-button @click="publishItem(scope.row)" type="text" size="mini">{{scope.row.newHot==0?'发布':'下架'}}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>
    <!--新增和编辑界面-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%">
      <el-form :model="form" label-width="120px" :rules="rules" ref="form">
        <el-form-item label="新闻标题" prop="newsTitle">
          <el-input v-model="form.newsTitle"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容" prop="newsBody">
          <el-upload class="avatar-uploader" name="img" action="" :http-request="requestFile2" :show-file-list="false"
            v-show="false">
          </el-upload>
          <quill-editor class="myQuillEditor" ref="myQuillEditor" :content="form.newsBody"
            :options="editorOptiondetails" @change="onEditordetailChange($event)">
          </quill-editor>
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.newsBody">
        </el-form-item>
        <el-form-item label="标签" prop="newsTag">
          <el-radio v-model="form.newsTag" :label="0">活动</el-radio>
          <el-radio v-model="form.newsTag" :label="1">新闻</el-radio>
        </el-form-item>
        <el-form-item label="编辑人" prop="newsEditor">
          <el-input v-model="form.newsEditor"></el-input>
        </el-form-item>
        <el-form-item label="热门标签" prop="newsTop">
          <el-input v-model.number="form.newsTop"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="newsPicture">
          <el-input v-model="form.newsPicture" readonly=""></el-input>
          <el-image style="width: 200px; height: 100px;margin-top: 10px;" :src="form.newsPicture" fit="cover">
          </el-image>
          <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false">
            <el-button type="primary" size="mini" style="margin-top: 10px;">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">图片尺寸1068*684px 比例89:57</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="事件时间:" prop="eventTime">
          <el-date-picker v-model="form.eventTime" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item> -->
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
    getNews,
    delNews,
    addNews,
    updateNews,
    getNewsDetail
  } from '@/api/officialWebsite/index/index'
  import {
    checkPermission
  } from '@/api/checkPermission'
  import {
    formatDate
  } from '@/utils/date'
  import {
    fileUpload
  } from '@/utils/fileUpload'
  import Pagination from "@/components/pagination";
  // require styles
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {
    quillEditor
  } from 'vue-quill-editor'
  // 工具栏配置
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{
      header: 1
    }, {
      header: 2
    }], // custom button values
    [{
      list: "ordered"
    }, {
      list: "bullet"
    }],
    [{
      script: "sub"
    }, {
      script: "super"
    }], // superscript/subscript
    [{
      indent: "-1"
    }, {
      indent: "+1"
    }], // outdent/indent
    [{
      direction: "rtl"
    }], // text direction

    [{
      size: ["small", false, "large", "huge"]
    }], // custom dropdown
    [{
      header: [1, 2, 3, 4, 5, 6, false]
    }],

    [{
      color: []
    }, {
      background: []
    }], // dropdown with defaults from theme
    [{
      font: []
    }],
    [{
      align: []
    }],
    ["link", "image", "video"],
    ["clean"] // remove formatting button
  ];
  export default {
    components: {
      Pagination,
      quillEditor
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
      },
      formatDate(time) {
        if (!time) return ''
        time = time
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
        list: [],
        loading: false,
        dialogVisible: false,
        form: {},
        pageSize: 10,
        pageNum: 0,
        total: 0,
        dialogTitle: '新增',
        rules: {
          newsBody: [{
            required: true,
            message: '请填写新闻内容',
            trigger: 'blur,change'
          }, ],
          newsTitle: [{
            required: true,
            message: '请填写新闻标题',
            trigger: 'blur,change'
          }, ],
          newsEditor: [{
            required: true,
            message: '请填写新闻编辑人',
            trigger: 'blur,change'
          }, ],
          newsPicture: [{
            required: true,
            message: '请上传新闻图片',
            trigger: 'blur,change'
          }, ],

        },
        userId: JSON.parse(localStorage.getItem('Laisi_info')).id,
        quillUpdateImg: false,
        editorOptiondetails: {
          placeholder: "请输入操作指南的描述",
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                image: function (value) {
                  if (value) {
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                }
              }
            }
          }
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        getNews({
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }).then(res => {
          this.list = res.data.websiteNewsList;
          this.total = res.data.websiteNewsCount
          this.loading = false
        }).catch(error => {
          this.list = []
        })
      },
      addnew() {
        this.dialogVisible = true;
        this.dialogTitle = "新增";
        this.form = {
          createTime: "",
          newsBody: "",
          newsDepartment: "",
          newsEditor: "",
          newsPicture: "",
          newsTag: 1,
          newsTitle: "",
          newsTop: 0,
          updateUser: "",
        }
      },
      //保存
      btn_edit(row, flag) {
        this.dialogTitle = "编辑";

        getNewsDetail({
          id: row.id
        }).then(res => {
          this.form = JSON.parse(JSON.stringify(res));
        })
        this.dialogVisible = true;
      },
      //删除
      delItem(id) {
        this.$confirm('确认删除该新闻吗?', '提示', {
          type: 'warning'
        }).then(() => {
          delNews({
            id: id
          }).then(res => {
            this.getList();
            this.$notify({
              type: 'success',
              message: '成功删除'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除',
            type: 'info'
          });
        });
      },
      publishItem(item) { //上下架新闻
        let str = '确认' + (item.newHot == 0 ? '发布' : '下架') + '该新闻吗?';
        this.$confirm(str, '提示', {
          type: 'warning'
        }).then(() => {
          item.newHot = item.newHot == 0 ? 1 : 0;
          item.updateUser = this.userId;
          updateNews(item).then(res => {
            this.getList();
            this.$notify({
              type: 'success',
              message: '成功删除'
            });
          })
        }).catch(() => {
          this.$notify({
            message: '已取消删除',
            type: 'info'
          });
        });
      },
      //保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.updateUser = this.userId;
            this.dialogVisible = false;
            if (this.dialogTitle == "新增") {
              addNews(this.form).then(response => {
                this.getList();
                this.$notify({
                  type: 'success',
                  message: '成功新增'
                });
              })
            } else {
              updateNews(this.form).then(response => {
                this.getList()
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
        })
      },
      requestFile(param) {
        var fileForm = new FormData()
        fileForm.append('file', param.file)
        fileUpload(fileForm).then(res => {
          if (res.code == 0) {
            this.form.newsPicture = res.data.url;
          }
        })
      },
      // 上下分页
      handleCurrentChange(val) {
        this.pageNum = val - 1;
        this.getList()
      },
      // 每页显示多少条
      handleSizeChange(val) {
        this.pageSize = val;
        this.getList()
      },
      onEditordetailChange(e) {
        this.form.newsBody = e.html;
      },
      requestFile2(param) {
        var fileObj = param.file;
        this.file = fileObj;
        var form = new FormData(); // FormData 对象
        form.append("file", fileObj); // 文件对象
        fileUpload(form).then(res => {
          let quill = this.$refs.myQuillEditor.quill;
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, "image", res.data.url);
          // 调整光标到最后
          quill.setSelection(length + 1);
          // this.fileuplodSize.push(res.data);
        });
      },
    }
  }

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
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 80px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 170px;
    height: 80px;
    display: block;
  }

  .avatar-uploader-icon2 {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .avatar2 {
    width: 80px;
    height: 80px;
    display: block;
  }

</style>
