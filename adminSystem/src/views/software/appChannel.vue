<template>
    <div>
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="channelid" label="渠道ID" width="120"></el-table-column>
            <el-table-column align="center" prop="channelname" label="渠道名称"></el-table-column>

            <el-table-column align="center" label="是否是默认渠道" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isdefault | statusFilter" size="mini">{{ scope.row.isdefault==1?"是":"否" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="使用url链接" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isurllink | statusFilter" size="mini">{{ scope.row.isurllink==1?"是":"否" }}
                    </el-tag>
                </template>
            </el-table-column>
            <!-- <el-table-column  align="center" prop="upload_url" label="上传URL"></el-table-column>
            <el-table-column  align="center" prop="username" label="外部渠道用户名"></el-table-column>
            <el-table-column  align="center" prop="password" label="外部渠道密码"></el-table-column> -->
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
                    </el-button>
                    <el-button @click=" btn_download(scope.row)" type="text" style="color:#67C23A;" size="mini">下载二维码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog title="选择渠道" :visible.sync="dialogVisible" width="90%" append-to-body>
            <el-form :model="form" label-width="150px" :rules="rules" ref="form">
                <el-form-item label="APPID" prop="appId">
                    <el-input v-model="form.appId" disabled></el-input>
                </el-form-item>
                <el-form-item label="APP名称" prop="appName">
                    <el-input v-model="form.appName" disabled></el-input>
                </el-form-item>

                <el-divider content-position="left">渠道选择</el-divider>
                <el-table :data="otherList" border fit highlight-current-row size="small "
                    ref="multipleTableAPPAddChannel" @selection-change="handleSelectionChange_APPAddChannel">
                    <el-table-column align="center" type="selection" width="55"></el-table-column>
                    <el-table-column align="center" prop="channelid" label="渠道ID" width="120"></el-table-column>
                    <el-table-column align="center" prop="channelname" label="渠道名称"></el-table-column>
                    <!-- 在表格中直接编辑,编辑不同步,有问题 用el-input等组件同步有问题，用普通的input组件可以实现同步操作-->
                    <el-table-column label="默认渠道">
                        <template slot-scope="scope">
                            <el-radio-group v-model="scope.row.isDefault" @change="isDefaultChange">
                                <el-radio class="radio" :label="1">是</el-radio>
                                <el-radio class="radio" :label="0">否</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                    <el-table-column label="使用url链接">
                        <template slot-scope="scope">
                            <el-radio-group v-model="scope.row.isUrlLink">
                                <el-radio class="radio" :label="1">是</el-radio>
                                <el-radio class="radio" :label="0">否</el-radio>
                            </el-radio-group>

                        </template>
                    </el-table-column>
                    <el-table-column label="上传URL" width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.uploadUrl"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="外部渠道用户名" width="120">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.username"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="外部渠道密码" width="120">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.password"></el-input>
                        </template>
                    </el-table-column>

                </el-table>



            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitAddchannel_Select('form')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- APP 渠道编辑页面 -->
        <el-dialog title="渠道编辑" :visible.sync="APPEditChannelFormVisible" append-to-body>
            <el-form :model="form" label-width="150px" ref="form">

                <el-form-item label="渠道ID：" prop="channelid">
                    <el-input v-model="form.channelid" disabled></el-input>
                </el-form-item>
                <el-form-item label="渠道名称：" prop="channelname">
                    <el-input v-model="form.channelname" disabled></el-input>
                </el-form-item>

                <el-form-item label="是否为默认渠道：" prop="isdefault">
                    <el-radio-group v-model="form.isdefault">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否使用URL链接：" prop="isurllink">
                    <el-radio-group v-model="form.isurllink">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="上传URL：" prop="upload_url">
                    <el-input v-model="form.upload_url"></el-input>
                </el-form-item>

                <el-form-item label="外部渠道用户名：" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="外部渠道密码：" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click.native="APPEditChannelFormVisible = false">取消</el-button>
                <el-button size="mini" type="primary" @click.native="submitForm('form')">提交</el-button>
            </div>
        </el-dialog>




    </div>
</template>

<script>
    import { channelListByAppId, otherChannelListByAppId, addChannelByAppId, addChannelSelectByAppId, deleteChannelByappId, editChannelByappId, downloadQR } from '@/api/software/appChannel'
    import { checkPermission } from '@/api/checkPermission'
    import { fileUpload } from '@/utils/fileUpload'

    export default {
        props: {
            appInfo: Object,
        },
        computed: {
            checkPer() {
                return function (btn) {
                    return (checkPermission(this.$route.path + '/' + btn))
                }
            }
        },
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
        data() {
            return {
                list: [],
                loading: false,

                dialogVisible: false,
                form: {},
                rules: {
                },
                otherList: [],
                APPEditChannelFormVisible: false,
                selectedChannelList:[],


            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                channelListByAppId({
                    appId: this.appInfo.appid
                }).then(res => {
                    if (res.code == 0) {
                        this.list = res.data
                        this.loading = false
                    }
                })
            },
            getOtherList() {
                otherChannelListByAppId({
                    appId: this.appInfo.appid
                }).then(res => {
                    if (res.code == 0) {
                        this.otherList = res.data
                    }
                })
            },
            //保存渠道的详情
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let para = {
                            isUrlLink: this.form.isurllink,
                            username: this.form.username,
                            password: this.form.password,
                            channelId: this.form.channelid,
                            appId: this.form.appId,
                            isDefault: this.form.isdefault,
                            uploadUrl: this.form.upload_url,
                        }
                        editChannelByappId(para).then(response => {
                            this.$notify({
                                type: 'success',
                                message: '成功修改' + this.form.channelname + '渠道'
                            });
                            this.APPEditChannelFormVisible = false;
                            this.getList()
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleSelectionChange_APPAddChannel(val) {
                this.selectedChannelList = val
            },
            //为该appid 选择渠道新建
            submitAddchannel_Select() {
                let para = []
                for (let i = 0; i < this.selectedChannelList.length; i++) {
                    let item = this.selectedChannelList[i]
                    let newitem = {
                        appId: this.appInfo.appid,
                        channelId: item.channelid,
                        isDefault: item.isDefault,
                        isUrlLink: item.isUrlLink,
                        password: item.password,
                        uploadUrl: item.uploadUrl,
                        username: item.username,
                        password:item.password
                    }
                    para.push(newitem)
                }
                addChannelSelectByAppId(para).then(res => {
                    this.$notify({
                        type: 'success',
                        message: '成功为所选APP新增渠道'
                    });
                    this.dialogVisible = false;
                    this.getList()
                })
            },
            btn_add() {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.getOtherList()
                this.form = {
                    appId: this.appInfo.appid,
                    appName: this.appInfo.appName,
                }
            },
            btn_edit(row) {
                this.APPEditChannelFormVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(row) {
                this.$confirm('此操作将永久删除渠道, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteChannelByappId({
                        appId: row.appId,
                        channelId: row.channelid
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选渠道!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除渠道操作',
                        type: 'info'
                    });
                });
            },

            btn_download(row) {
                window.open(process.env.VUE_APP_BASE_API + "ota/qrpicture/download?appid=" + row.appId + "&channel=" + row.channelid)
            },
            
        }
    }
</script>

<style scoped>
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>