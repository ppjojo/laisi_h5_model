<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="channelId" label="渠道ID"></el-table-column>
            <el-table-column align="center" prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.useflag | statusFilter" size="mini">{{ scope.row.useflag==1?"启用":"禁用" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否内部">
                <template scope="scope">
                    {{scope.row.isInner==1?"内部":"外部"}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="uploadUrl" label="上传URL"></el-table-column>
            <el-table-column align="center" prop="username" label="外部渠道用户名"></el-table-column>
            <el-table-column align="center" prop="password" label="外部渠道密码"></el-table-column>

            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.channelId)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'渠道'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                <el-form-item label="渠道ID" prop="channelId">
                    <el-input v-model="form.channelId" :disabled=" dialogTitle == '编辑' "></el-input>
                </el-form-item>
                <el-form-item label="渠道名称" prop="channelName">
                    <el-input v-model="form.channelName"></el-input>
                </el-form-item>
                <el-form-item label="是否为内部" prop="isInner">
                    <el-radio-group v-model="form.isInner">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="平台类型" prop="platformType">
                    <el-radio-group v-model="form.platformType">
                        <el-radio class="radio" :label="0">无</el-radio>
                        <el-radio class="radio" :label="3">全部</el-radio>
                        <el-radio class="radio" :label="1">Android</el-radio>
                        <el-radio class="radio" :label="2">IOS</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否启用" prop="useflag">
                    <el-radio-group v-model="form.useflag">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传URL" prop="uploadUrl">
                    <el-input v-model="form.uploadUrl"></el-input>
                </el-form-item>

                <el-form-item label="渠道用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="渠道密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                    <el-input v-model="form.notes" type="textarea"></el-input>
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/software/publicChannels'
    import { checkPermission } from '@/api/checkPermission'
    import { getUInfo } from '@/utils/auth'

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
                list: [],
                loading: false,

                dialogVisible: false,
                form: {},
                rules: {
                    channelId: [
                        { required: true, message: '请输入渠道ID', trigger: 'blur' },
                    ],
                    channelName: [
                        { required: true, message: '请输入渠道名称', trigger: 'blur' },
                    ],

                    isInner: [
                        { required: true, message: '请选择是否为内部', trigger: 'change' }
                    ],
                    platformType: [
                        { required: true, message: '请选择平台类型', trigger: 'change' }
                    ],
                    useflag: [
                        { required: true, message: '请选择是否启用', trigger: 'change' }
                    ],
                },

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data.content
                    this.loading = false
                })
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.dialogTitle == "新增") {
                            addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.channelName 
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.channelName
                                });
                            })
                        }
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
                    channelId: null,
                    channelName: null,
                    isInner: 1,
                    platformType: 0,  // android是1，ios 是2 ，全部是3 。0是默认的，没有设置平台状态
                    useflag: 0,
                    uploadUrl: null,
                    username: null,
                    password: null,
                    notes: null,
                    userid: JSON.parse(getUInfo()).id,
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(channelId) {
                this.$confirm('此操作将永久删除渠道, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        channelIds: channelId
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

        }
    }
</script>