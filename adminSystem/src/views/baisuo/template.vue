<template>
    <div class="app-container">
        <el-input class="inputclass" v-model="filePara.fileUrl" disabled></el-input>
        <el-upload ref='upload' action="" :http-request="requestFile" :before-upload="beforeAvatarUpload"
            :show-file-list="false">
            <el-button size="small" type="primary">模板上传</el-button>
            <div slot="tip" class="el-upload__tip">
                文件上传限制条件：(excel格式文件)
                <p>1. 后缀名xls或xlsx</p>
                <p>2. 只使⽤第⼀个sheet</p>
            </div>
        </el-upload>

    </div>
</template>

<script>
    import { importList } from '@/api/baisuo/template';
    import { fileUpload } from '@/utils/fileUpload'

    export default {
        data() {
            return {
                filePara: {
                    fileName: null,
                    fileExt: null,
                    fileSize: null,
                    fileUrl: null,
                    fileMd5: null
                }
            }
        },
        mounted() {

        },
        computed: {

        },

        methods: {
            // 限制上传文件格式
            beforeAvatarUpload(file) {

                let fileName = file.name
                let filenameArr = fileName.split(".")
                this.filePara.fileName = ''
                for (let i = 0; i < filenameArr.length - 1; i++) {
                    i == filenameArr.length - 2 ? this.filePara.fileName += filenameArr[i] : this.filePara.fileName += filenameArr[i] + '.'
                }

                let suffixName = filenameArr[filenameArr.length - 1]
                this.filePara.fileExt = suffixName
                this.filePara.fileSize = file.size
                if (!(suffixName == 'xls' || suffixName == 'xlsx')) {
                    return this.$message({
                        showClose: true,
                        message: "上传文件类型错误，文件后缀名应为名xls或xlsx",
                        type: "error"
                    });
                }
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.filePara.fileUrl = res.data.url;
                        this.filePara.fileMd5 = res.data.md5
                        this.uploadTemplate()
                    }
                })
            },


            // 模板上传接口
            uploadTemplate() {
                importList(this.filePara)
                    .then(res => {
                        this.$message({
                            showClose: true,
                            message: '模板上传成功',
                            type: 'success'
                        });
                    })

            },

        }
    }
</script>

<style scoped>
    .inputclass {
        width: 50%;
        margin: 3% 0 2%;
    }
</style>