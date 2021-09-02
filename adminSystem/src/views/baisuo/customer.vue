<template>
    <div class="app-container">
        <div v-show="!deviceEdit">
            <div class="container-edit">
                <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加客户</el-button>
            </div>
            <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
                size="small ">
                <el-table-column align="center" prop="clientId" width='65' label="客户ID">
                </el-table-column>

                <el-table-column align="center" prop="name" label="客户名">
                </el-table-column>

                <el-table-column align="center" prop="createTime" label="创建时间">
                    <template slot-scope="scope">
                        {{scope.row.createTime | formatDate}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="180">
                    <template scope="scope">
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                        </el-button>
                        <el-button @click=" btn_manage(scope.row)" type="text" style="color:#67c23a;" size="mini"
                            v-if="checkPer('manage')">管理设备
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange"
                @handleSizeChange="handleSizeChange">
            </pagination>
            <!--新增和编辑界面-->
            <el-dialog :title="dialogTitle+'客户'" :visible.sync="dialogVisible" width="50%">
                <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                    <el-form-item label="客户名称" prop="name">
                        <el-input v-model="form.name" maxlength="16"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-show="deviceEdit">
            <div class="container-edit">
                <el-button size="mini" type="primary" icon="el-icon-back" circle @click="deviceEdit=false">
                </el-button>
                <el-button type="primary" size="mini" @click="btn_add_device()" v-if="checkPer('add')">添加设备</el-button>
            </div>
            <el-divider content-position="left"> {{form.name}}</el-divider>

            <el-table v-loading="deviceLoading" :data="deviceList" element-loading-text="Loading" border fit
                highlight-current-row size="small ">
                <el-table-column align="center" prop="deviceId" label="设备Id" width="80">
                </el-table-column>
                <el-table-column align="center" prop="code" label="设备码">
                </el-table-column>

                <el-table-column align="center" prop="mainAccountId" label="主账号ID">
                </el-table-column>
                <el-table-column align="center" prop="mainAccountName" label="主账号昵称">
                </el-table-column>
                <!-- <el-table-column align="center" prop="phone" label="手机号">
                </el-table-column> -->
                <el-table-column align="center" prop="schoolName" label="学校">
                </el-table-column>
                <el-table-column align="center" prop="bindTime" label="激活时间">
                </el-table-column>

                 <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"未锁定":"锁定" }}
                    </el-tag>
                </template>
            </el-table-column>

                <el-table-column align="center" prop="comment" label="备注">
                </el-table-column>
                <el-table-column align="center" label="操作" width="180">
                    <template scope="scope">
                        <el-button @click="btn_edit_device(scope.row)" type="text" size="mini" v-if="checkPer('edit')">
                            编辑
                        </el-button>
                        <el-button @click=" btn_manage_device(scope.row)" type="text" style="color:#67c23a;" size="mini"
                            v-if="checkPer('manage')">管理绳组
                        </el-button>
                        <el-button @click=" btn_delete_device(scope.row)" type="text" style="color: #f78989;;"
                            size="mini" v-if="checkPer('delete')&&scope.row.status!=1">删除
                        </el-button>
                        <!-- <el-upload ref='upload' v-if="checkPer('import')" action="" accept=".xls, .xlsx"
                            :http-request="requestlistExcelFile" style="display: inline-block;margin:0 10px;"
                            :show-file-list="false">
                            <el-button type="text" style="color:#67C23A;" size="mini" @click="deviceId=scope.row.deviceId">
                                导入跳绳设备
                            </el-button>
                        </el-upload> -->
                    </template>
                </el-table-column>
            </el-table>
            </pagination>
            <!--新增和编辑设备界面-->
            <el-dialog :title="dialogTitle+'设备'" :visible.sync="deviceDialogVisible" width="50%">
                <el-form :model="deviceForm" label-width="100px" :rules="rules" ref="deviceForm">
                    <el-form-item label="设备ID" prop="deviceId" v-if=" AddorEdit == 0">
                        <el-input v-model="deviceForm.deviceId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所属客户ID" prop="clientId">
                        <el-input v-model="deviceForm.clientId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="设备码" v-if=" dialogTitle == '编辑'">
                        <el-input v-model="deviceForm.code" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="comment">
                        <el-input type="textarea" placeholder="请输入内容" v-model="deviceForm.comment" maxlength="100"
                            show-word-limit>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="deviceDialogVisible = false">取 消</el-button>
                    <el-button type="primary" size="mini" @click="submitDeviceForm('deviceForm')">确 定</el-button>
                </div>
            </el-dialog>
            <!--绳组列表-->
            <el-dialog :title="deviceForm.code+' 的绳组'" :visible.sync="deviceGroupDialogVisible" width="70%">
                <div class="container-edit">
                    <el-button type="primary" size="mini" @click="btn_add_group()" v-if="checkPer('add')&&deviceForm.status==0">添加绳组
                    </el-button>
                    <el-button type="success" size="mini" v-if="this.deviceForm.status==0" @click="btn_add_lock()" >锁定镭雕
                    </el-button>
                    <el-button type="success" size="mini" v-if="this.deviceForm.status==1" @click="btn_add_unLock()" >解锁
                    </el-button>
                </div>
                <el-table v-loading="deviceGroupLoading" :data="deviceGroupList" element-loading-text="Loading" fit
                    highlight-current-row size="small " default-expand-all>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.ropes" style="width: 100%" size="small ">
                                <el-table-column align="center" prop="id" label="ID" width="60">
                                </el-table-column>
                                <!-- <el-table-column align="center" prop="groupName" label="分组名" width="180">
                                </el-table-column> -->
                                <el-table-column align="center" prop="mac" label="mac">
                                </el-table-column>
                                <el-table-column align="center" prop="serialNumber" label="序列号">
                                </el-table-column>
                                <el-table-column align="center" label="操作" width="80">
                                    <template scope="scope">
                                        <el-button @click="btn_edit_skip(scope.row)" type="text" size="mini">编辑
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="deviceId" label="设备ID" width="65">
                    </el-table-column>
                    <el-table-column align="center" prop="groupName" label="分组名">
                    </el-table-column>
                    <el-table-column align="center" prop="hubName" label="hubName">
                    </el-table-column>
                    <el-table-column align="center" prop="hubMac" label="hubMac">
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="120">
                        <template scope="scope">
                            <el-button @click="btn_edit_deviceGroup(scope.row)" type="text"  size="mini">编辑
                            </el-button>
                            <el-button @click=" btn_delete_deviceGroup(scope.row)" type="text" style="color: #f78989;;"
                                size="mini" v-if="deviceForm.status==0">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="deviceGroupDialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!--编辑跳绳-->
            <el-dialog title="编辑跳绳设备" :visible.sync="skipEditVisible">
                <el-form :model="skipForm" label-width="100px" :rules="rules" ref="skipForm">
                    <el-form-item label="分组名" prop="groupName">
                        <el-input v-model="skipForm.groupName" :disabled="dialogTitle=='编辑'"></el-input>
                    </el-form-item>
                    <el-form-item label="序列号" prop="serialNumber">
                        <el-input v-model="skipForm.serialNumber" :disabled="dialogTitle=='编辑'"></el-input>
                    </el-form-item>
                    <el-form-item label="当前MAC" >
                        <el-col :span="9" v-if="dialogTitle=='编辑'">
                            <el-input v-model="skipForm.oldMac" :disabled="dialogTitle=='编辑'"></el-input>
                        </el-col>
                        <el-col :span="6" v-if="dialogTitle=='编辑'" style="text-align: center;">替换MAC</el-col>
                        <el-col :span="9">
                            <el-input v-model="skipForm.mac"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="说明" prop="instruction">
                        <el-input type="textarea" v-model="skipForm.instruction" :autosize="{ minRows: 2}"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="skipEditVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click.native="submitSkipForm('skipForm')">提交</el-button>
                </div>
            </el-dialog>

            <!--新增绳组-->
            <el-dialog :title="'新增'+deviceForm.code+'的绳组'" :visible.sync="groupDialogVisible">
                <div v-if="groupHubShow">
                    <el-divider content-position="left">选择Hub</el-divider>
                    <div class="container-search">
                        <el-form :inline="true" :model="hubSearchForm">
                            <el-form-item label="hubMac">
                                <el-input v-model="hubSearchForm.hubMac"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="getHubList">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-table v-loading="hubLoading" :data="hubList" element-loading-text="Loading" border fit
                        highlight-current-row size="small ">
                        <el-table-column align="center" prop="id" label="ID" width="65">
                        </el-table-column>
                        <el-table-column align="center" prop="hubMac" label="hubMac">
                        </el-table-column>
                        <el-table-column align="center" prop="instruction" label="说明">
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="80">
                            <template scope="scope">
                                <el-button @click="groupForm.hubMac=scope.row.hubMac;groupHubShow=false" type="text"
                                    size="mini">
                                    确定选择
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-else>
                    <div class="container-edit">
                        <el-button size="mini" @click="groupHubShow = true">上一步</el-button>
                    </div>
                    <el-divider content-position="left">选择分组</el-divider>
                    <div class="container-search">
                        <el-form :inline="true" :model="groupSearchForm">
                            <el-form-item label="分组名">
                                <el-input v-model="groupSearchForm.groupName"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="getGroupList">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <el-table v-loading="groupLoading" :data="groupList" element-loading-text="Loading" border fit
                        highlight-current-row size="small ">
                        <el-table-column align="center" prop="id" label="ID" width="65">
                        </el-table-column>
                        <el-table-column align="center" prop="groupName" label="分组名" width="80">
                        </el-table-column>
                        <el-table-column align="center" prop="instruction" label="说明">
                        </el-table-column>

                        <el-table-column align="center" label="操作" width="120">
                            <template scope="scope">
                                <el-button @click="groupForm.groupName=scope.row.groupName;submitGroupForm()"
                                    type="text" size="mini">
                                    选择分组并提交
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <div slot="footer" class="dialog-footer">
                        <el-button size="mini" type="primary" @click.native="">提交
                        </el-button>
                    </div> -->
                </div>
            </el-dialog>

            <!--更换绳组的hubmac-->
            <el-dialog title="绳组编辑" :visible.sync="editGroupDialogVisible">
                <el-form :inline="true" :model="editGroupForm" label-width="100px">
                    <el-form-item label="分组名">
                        <el-input v-model="editGroupForm.groupName" :disabled="true"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="hubMac" prop="当前MAC">
                        <el-col :span="9">
                            <el-input v-model="editGroupForm.oldHubMac" :disabled="true"></el-input>
                        </el-col>
                        <el-col :span="6"  style="text-align: center;">替换HubMac</el-col>
                        <el-col :span="9">
                            <el-input v-model="editGroupForm.hubMac" @focus="editGroupToChooseDialogVisible=true"  ></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="editGroupDialogVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click.native="submiteditGroupForm('editGroupForm')">提交</el-button>
                </div>
            </el-dialog>

            <!--更换绳组的hubmac去 选择hub列表-->
            <el-dialog title="选择替换的绳组" :visible.sync="editGroupToChooseDialogVisible" append-to-body>
                <el-table v-loading="hubLoading" :data="hubList" element-loading-text="Loading" border fit
                    highlight-current-row size="small ">
                    <el-table-column align="center" prop="id" label="ID" width="65">
                    </el-table-column>
                    <el-table-column align="center" prop="hubMac" label="hubMac">
                    </el-table-column>
                    <el-table-column align="center" prop="instruction" label="说明">
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="80">
                        <template scope="scope">
                            <el-button @click="editGroupForm.hubMac=scope.row.hubMac;editGroupToChooseDialogVisible=false" type="text"
                                size="mini">
                                确定选择
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>

        </div>
    </div>

</template>

<script>
    import { listItem, addItem, updateItem,lockDevice,updateHub,unLockDevice } from '@/api/baisuo/customer'
    import { deviceAdd, deviceList, deviceEdit, importRopeList, deviceDelete } from '@/api/baisuo/customer'
    import { deviceGroupList, macEdit, groupList as groupListItem, addDeviceGroup, deleteDeviceGroup } from '@/api/baisuo/skipGroup'
    import { listItem as hubListItem } from '@/api/baisuo/hub'
    import { updateItem as skipUpdateItem } from '@/api/baisuo/ropeSkipping'
    import { checkPermission } from '@/api/checkPermission'
    import Pagination from "@/components/pagination";
    import { formatDate } from '@/utils/date'

    export default {
        filters: {
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    // 1: 'gray',
                    1: 'danger'
                }
                return statusMap[status]
            }

        },
        
        components: {
            Pagination
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
                page: 0,
                limit: 10,
                total: 20,

                dialogVisible: false,
                form: {
                    name: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入客户名称', trigger: 'blur' },
                        { min: 1, max: 20, message: '客户名称在20字以内', trigger: 'blur' }
                    ],

                    comment: [
                        { max: 100, message: '备注的长度在100个字符以内', trigger: 'blur' }
                    ],
                },

                deviceEdit: false,
                deviceList: [],
                deviceLoading: false,
                deviceForm: {},
                deviceDialogVisible: false,
                deviceId: "",

                deviceGroupDialogVisible: false,
                deviceGroupLoading: false,
                deviceGroupList: [],

                skipForm: {},
                skipEditVisible: false,

                groupDialogVisible: false,
                groupLoading: false,
                groupList: [],
                groupForm: {
                    hubMac: ""
                },
                groupSearchForm: {},
                hubList: [],
                hubSearchForm: {},
                hubLoading: true,
                groupHubShow: true,

                //更换绳组的id
                editGroupForm: {},
                editGroupDialogVisible: false,
                editGroupToChooseDialogVisible:false

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                    pageNumber: this.page,
                    pageSize: this.limit,
                }).then(res => {
                    this.list = res.data.content
                    this.total = res.data.total
                    this.loading = false
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val - 1;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val) {
                this.limit = val;
                this.getList()
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
                                    message: '成功新增' + this.form.name
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.name
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
                    clientId: null,
                    name: null,//max:16
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },


            //管理设备
            btn_manage(row) {
                this.deviceEdit = true;
                this.form = row
                this.getDeviceList()
            },
            getDeviceList() {
                this.deviceLoading = true
                deviceList({
                    clientId: this.form.clientId
                }).then(res => {
                    this.deviceList = []
                    this.deviceList = res.data
                    this.deviceLoading = false
                })
            },
            btn_add_device() {
                this.deviceDialogVisible = true
                this.dialogTitle = "新增"
                this.deviceForm = {
                    deviceId: null,
                    clientId: this.form.clientId,
                    comment: null, //max:100
                }

            },
            btn_edit_device(row) {
                this.deviceDialogVisible = true;
                this.dialogTitle = "编辑"
                this.deviceForm = Object.assign({}, row)
                this.deviceForm.clientId = this.form.clientId
            },
            submitDeviceForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.deviceDialogVisible = false
                        if (this.dialogTitle == "新增") {
                            deviceAdd(this.deviceForm).then(response => {
                                this.getDeviceList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增设备'
                                });
                            })
                        } else {
                            deviceEdit(this.deviceForm).then(response => {
                                this.getDeviceList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改设备'
                                });
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //设备下的跳绳的上传管理
            requestlistExcelFile(param) {
                let form = new FormData();
                form.append("deviceId", this.deviceId);
                form.append("listFile", param.file);
                importRopeList(form)
                    .then(res => {
                        this.getDeviceList()
                    })
            },
            btn_edit_skip(row) {
                this.skipEditVisible = true;
                this.dialogTitle = "编辑"
                this.skipForm = Object.assign({}, row)
                this.skipForm.parentId = this.deviceForm.deviceId
                this.skipForm.oldMac = this.skipForm.mac
                this.skipForm.mac = ""
            },
            submitSkipForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.skipForm.mac == "") this.skipForm.mac = this.skipForm.oldMac
                        this.skipEditVisible = false
                        skipUpdateItem(this.skipForm).then(response => {
                            this.getDeviceGroupList()
                            this.$notify({
                                type: 'success',
                                message: '成功修改跳绳'
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //管理设备下的绳组
            btn_manage_device(row) {
                this.deviceGroupDialogVisible = true;
                this.deviceForm = Object.assign({}, row)
                this.getDeviceGroupList()
            },
             //删除设备组
             btn_delete_device(row) {
                this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deviceDelete({
                        deviceId: row.deviceId,
                    }).then(response => {
                        this.getDeviceList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选设备'
                        });
                    })
                }).catch((error) => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            
            
            //设备组列表
            getDeviceGroupList() {
                this.deviceGroupLoading = true
                deviceGroupList({
                    deviceId: this.deviceForm.deviceId,
                    pageNumber: 0,
                    pageSize: 999,
                }).then(res => {
                    this.deviceGroupList = []
                    this.deviceGroupList = res.data
                    this.deviceGroupLoading = false
                })
            },
            //删除设备组
            btn_delete_deviceGroup(row) {
                this.$confirm('此操作将永久删除该设备的绳组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDeviceGroup({
                        deviceId: row.deviceId,
                        id: row.id
                    }).then(response => {
                        this.getDeviceGroupList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选设备的绳组!'
                        });
                    })
                }).catch((error) => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            //编辑设备组
            btn_edit_deviceGroup(row) {
                this.editGroupDialogVisible = true
                this.dialogTitle = "新增"
                this.getHubList()
                this.editGroupForm = Object.assign({}, row)
                this.editGroupForm.oldHubMac=this.editGroupForm.hubMac
               this.editGroupForm.hubMac=""
            },
            btn_add_group() {
                this.groupDialogVisible = true
                this.dialogTitle = "新增"
                this.getGroupList()
                this.getHubList()
                this.groupForm = {
                    deviceId: this.deviceForm.deviceId,
                }
            },
            getGroupList() {
                groupListItem({
                    status: 0,
                    ...this.groupSearchForm
                }).then(res => {
                    this.groupList = res.data
                    this.groupLoading = false
                })
            },
            getHubList() {
                hubListItem({
                    status: 0,
                    ...this.hubSearchForm
                }).then(res => {
                    this.hubList = res.data
                    this.hubLoading = false
                })
            },
            submitGroupForm(formName) {
                addDeviceGroup(this.groupForm).then(response => {
                    this.getDeviceGroupList()
                    this.$notify({
                        type: 'success',
                        message: '成功新增' + this.deviceForm.code + "的绳组"
                    });
                })
                this.groupDialogVisible = false
                this.groupHubShow = true
            },

            submiteditGroupForm(formName) {
                updateHub(this.editGroupForm).then(response => {
                    this.getDeviceGroupList()
                    this.$notify({
                        type: 'success',
                        message: '成功修改' + this.deviceForm.code + "的绳组"
                    });
                })
                this.editGroupDialogVisible = false
            },


            //锁定镭雕
            btn_add_lock(){
                lockDevice(this.deviceForm).then(response => {
                    this.$notify({
                        type: 'success',
                        message: '成功锁定镭雕'
                    });
                    this.getDeviceList()
                    this.getDeviceGroupList()
                    this.deviceForm.status=1

                })
            },
            btn_add_unLock(){
                unLockDevice(this.deviceForm).then(response => {
                    this.$notify({
                        type: 'success',
                        message: '成功解锁镭雕'
                    });
                    this.getDeviceList()
                    this.getDeviceGroupList()
                    this.deviceForm.status=0

                })
            }
        }
    }
</script>