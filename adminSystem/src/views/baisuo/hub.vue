<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="hubMac">
                    <el-input v-model="searchForm.hubMac"></el-input>
                </el-form-item>
                <el-form-item label="组名">
                    <el-input v-model="searchForm.groupName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="container-edit">
            <!-- <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button> -->
            <el-upload ref='upload' v-if="checkPer('import')" action="" accept=".xls, .xlsx" :http-request="requestFile"
                style="display: inline-block;margin:0 10px;" :show-file-list="false">
                <el-button size="mini" type="success">导入Hub</el-button>
            </el-upload>
            <el-button type="primary" size="mini" @click="btn_download()"  v-if="checkPer('import')">下载Hub模板</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="hubName" label="hubName" width="150">
            </el-table-column>
            <el-table-column align="center" prop="hubMac" label="hubMac" width="150">
            </el-table-column>
            <el-table-column align="center" prop="deviceId" label="设备ID">
            </el-table-column>
            <el-table-column align="center" prop="groupName" label="组名">
            </el-table-column>
            <el-table-column align="center" prop="accountId" label="账号ID">
            </el-table-column>
            <el-table-column align="center" prop="clientId" label="客户ID">
            </el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"空闲":"占用" }}
                    </el-tag>
                </template>
            </el-table-column>
            
            <el-table-column align="center" label="操作" width="120">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')&&scope.row.status==0">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'Hub'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="hubMac" prop="hubMac">
                    <el-input v-model="form.hubMac"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="instruction">
                    <el-input type="textarea" v-model="form.instruction" :autosize="{ minRows: 2}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="导入数据错误行" :visible.sync="errorVisible">
            <el-table :data="errorList" element-loading-text="Loading" border fit
                highlight-current-row size="small ">
                <el-table-column align="center" prop="hubMac" label="hubMac">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="errorVisible = false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, updateItem, deleteItem,importItem } from '@/api/baisuo/hub'
    import { checkPermission } from '@/api/checkPermission'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    // 1: 'gray',
                    1: 'danger'
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
                searchForm: {

                },
                rules: {
                    deviceTitle: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                    ],
                    deviceType: [
                        { required: true, message: '请输入产品类型', trigger: 'blur' },
                    ],
                    deviceModel: [
                        { required: true, message: '请输入产品型号', trigger: 'blur' },
                    ],
                },
                errorList:[],
                errorVisible:false

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data
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
                                    message: '成功新增Hub'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改Hub'
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
                    deviceId: "",
                    groupName: "",
                    hubMac: "",
                    instruction: "",
                    mac: "",
                    serialNumber: "",
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(row) {
                this.$confirm('此操作将永久删除Hub, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        id: row.id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选Hub!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除跳绳Hub',
                        type: 'info'
                    });
                });
            },
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('listFile', param.file)
                importItem(fileForm).then(res => {
                    this.getList()
                }).catch(error => {
                    if (error.code > 2800) {
                        this.errorVisible=true
                        this.errorList=error.data
                    }
                })
            },
            btn_download(){
                
                window.open(process.env.VUE_APP_BASE_API + "school_rk/download/hub/template")
            },
        }
    }
</script>