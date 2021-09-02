<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="groupId" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="groupName" label="白名单组名">
            </el-table-column>
            <el-table-column align="center" prop="info" label="备注">
            </el-table-column>
            <el-table-column align="center" prop="createUser" label="创建用户">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_view(scope.row)" type="text" size="mini" v-if="checkPer('view')">白名单组详情
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.groupId)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'白名单'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                <el-form-item label="白名单组名" prop="groupName">
                    <el-input v-model="form.groupName"></el-input>
                </el-form-item>
                <el-form-item label="白名单类型" prop="groupName">
                    <el-select v-model="form.type" label="白名单类型">
                        <el-option label="上传文件" value="list"></el-option>
                        <el-option label="自动生成" value="auto"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="白名单用户数量" prop="selectCount" v-if="form.type=='auto'">
                    <el-input v-model="form.selectCount"></el-input>
                </el-form-item>
                <el-form-item label="文件名" prop="listFilName" v-else>
                    <el-input v-model="form.listFilName" disabled></el-input>
                    <el-upload ref='upload' action="" :http-request="requestWhitelistExcelFile" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传文件</el-button>
                        <div slot="tip" class="el-upload__tip">
                            文件上传限制条件：(excel格式文件)
                            <p>1. 后缀名xls或xlsx</p>
                            <p>2. 只使⽤第⼀个sheet</p>
                            <p>3. 列名 userId或phone</p>
                        </div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="备注：" prop="info ">
                    <el-input v-model="form.info " type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 白名单组的文件的表格显示 -->
        <el-dialog title="该白名单组详情" :visible.sync="whitelistByGroupIdListVisible">
            <div class="container-edit">
                <el-button type="primary" size="mini" @click="btn_add_user()" v-if="checkPer('add')">添加</el-button>
            </div>
            <el-table :data="whitelistByGroupIdList" highlight-current-row border size="small">
                <el-table-column align="center" prop="userId" label="用户ID"></el-table-column>
                <el-table-column align="center" prop="phone" label="手机号码"></el-table-column>
                <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template scope="scope">
                        <el-button @click="btn_edit_user(scope.row)" type="text" size="mini">编辑
                        </el-button>
                        <el-button @click=" btn_delete_user(scope.row)" type="text" style="color:#f78989;" size="mini">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="whitelistByGroupIdListVisible = false">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="dialogTitle+'白名单用户'" :visible.sync="userDialogVisible" width="50%" append-to-body>
            <el-form :model="userForm" label-width="120px" :rules="rules" ref="userForm">
                <el-form-item label="userId">
                    <el-input v-model="userForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="userForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="userDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitUserForm('userForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, viewItem, deleteItem } from '@/api/firmware/whiteList'
    import { addUserItem, updateUserItem, deleteUserItem } from '@/api/firmware/whiteList'
    import { fileUpload } from '@/utils/fileUpload'
    import { checkPermission } from '@/api/checkPermission'
    import { getUInfo } from '@/utils/auth'

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
                loading: false,

                dialogVisible: false,
                form: {},
                rules: {},

                whitelistByGroupIdListVisible: false,
                whitelistByGroupIdList: [],

                userDialogVisible: false,
                userForm: {},

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.form.type == "list") {
                            this.form.selectCount=""
                        } else {
                            this.form.listFile=""
                        }
                        let formData = new FormData();
                        formData.append("groupName", this.form.groupName);
                        formData.append("info", this.form.info);
                        formData.append("userId", this.form.userId);
                        formData.append("listFile", this.form.listFile);
                        formData.append("selectCount", this.form.selectCount);
                        formData.append("type", this.form.type);
                        

                        addItem(formData).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功新增白名单'
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            btn_add() {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    selectCount: "",
                    type: "list",
                    userId:JSON.parse(getUInfo()).id
                }
            },
            btn_view(row) {
                this.whitelistByGroupIdListVisible = true;
                this.form = row
                this.getWhiteUserList()
            },
            getWhiteUserList() {
                viewItem({
                    groupId: this.form.groupId
                }).then(res => {
                    this.whitelistByGroupIdList = []
                    if (parseInt(res.code) == 0) {
                        this.whitelistByGroupIdList = res.data
                    }
                })
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除白名单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        groupId: id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选白名单!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除白名单操作',
                        type: 'info'
                    });
                });
            },
            requestWhitelistExcelFile(param) {
                var fileObj = param.file
                console.log(param)
                let fileName = fileObj.name
                let filenameArr = fileName.split(".")
                let suffixName = filenameArr[filenameArr.length - 1]

                if (!(suffixName == 'xls' || suffixName == 'xlsx')) {
                    return this.$message({
                        showClose: true,
                        message: "上传文件类型错误，文件后缀名应为名xls或xlsx",
                        type: "error"
                    });
                } else {

                    return this.form = {
                        listFile: fileObj,
                        listFilName: fileName,
                        groupName: this.form.groupName,
                        info: this.form.info,
                        userId: JSON.parse(getUInfo()).id,
                    }

                    console.log(this.form)
                }

            },
            btn_add_user(row) {
                this.userDialogVisible = true;
                this.dialogTitle = "新增"
                this.userForm = {
                    userId: "",
                    phone: "",
                    email: "",
                    groupId:this.form.groupId
                }
            },
            btn_edit_user(row) {
                this.userDialogVisible = true;
                this.dialogTitle = "编辑"
                this.userForm = Object.assign({}, row)
            },
            btn_delete_user(row) {
                this.$confirm('此操作将永久删除白名单用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUserItem({
                        id: row.id,
                    }).then(response => {
                        this.getWhiteUserList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选白名单用户!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            submitUserForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.userDialogVisible = false
                        if (this.dialogTitle == "新增") {
                            addUserItem(this.userForm).then(response => {
                                this.getWhiteUserList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增白名单用户'
                                });
                            })
                        } else {
                            updateUserItem(this.userForm).then(response => {
                                this.getWhiteUserList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改白名单用户'
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