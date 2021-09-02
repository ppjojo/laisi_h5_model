<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加项目</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="projectName" label="项目名">
            </el-table-column>
            <el-table-column align="center" prop="deviceNamePrefix" label="设备名">
            </el-table-column>
            <el-table-column align="center" prop="bleServiceUUID" label="蓝牙指令服务特征值">
            </el-table-column>
            <el-table-column align="center" prop="bleWriteUUID" label="蓝牙指令请求特征值">
            </el-table-column>
            <el-table-column align="center" prop="bleNotifyUUID" label="蓝牙指令回复特征值">
            </el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"正常":"废弃" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <!-- <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'项目'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="200px" :rules="rules" ref="form">
                <el-form-item label="项目名" prop="projectName">
                    <el-input v-model="form.projectName"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="deviceNamePrefix">
                    <el-input v-model="form.deviceNamePrefix"></el-input>
                </el-form-item>
                <el-form-item label="蓝牙指令服务特征值" prop="bleServiceUUID">
                    <el-input v-model="form.bleServiceUUID"></el-input>
                </el-form-item>
                <el-form-item label="蓝牙指令请求特征值" prop="bleWriteUUID">
                    <el-input v-model="form.bleWriteUUID"></el-input>
                </el-form-item>
                <el-form-item label="蓝牙指令回复特征值" prop="bleNotifyUUID">
                    <el-input v-model="form.bleNotifyUUID"></el-input>
                </el-form-item>
                <el-form-item label="项目状态">
                    <el-switch v-model="form.status" :active-value="0" :inactive-value="1" inactive-color="#ff4949">
                    </el-switch>
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/factoryTesting/project'
    import { checkPermission } from '@/api/checkPermission'

    export default {
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
                    0: 'success',
                    // 1: 'gray',
                    1: 'danger'
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
                        if (this.dialogTitle == "新增") {
                            addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.projectName
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.projectName
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
                    projectName: null, //项目名称
                    deviceNamePrefix: null, //设备名称
                    // 蓝牙指令服务特征值
                    bleServiceUUID: "",
                    // 蓝牙指令请求特征值
                    bleWriteUUID: "",
                    // 蓝牙指令回复特征值
                    bleNotifyUUID: ""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除项目, 是否继续?', '提示', {
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
                            message: '成功删除所选项目!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },

        }
    }
</script>