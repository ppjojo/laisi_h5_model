<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" width="65"  prop="id" label="ID"></el-table-column>
            <el-table-column align="center"  prop="adSdkId" label="SDKID">
            </el-table-column>
            <el-table-column align="center"  prop="adSdkName" label="SDK名字">
            </el-table-column>
            
            <el-table-column align="center" label="可用状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isRegister | statusFilter" size="mini">{{ scope.row.isRegister==1?"可用":"禁用" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'SDK'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="SDKID" prop="adSdkId">
                    <el-input v-model="form.adSdkId"></el-input>
                </el-form-item>
                <el-form-item label="SDK名字" prop="adSdkName">
                    <el-input v-model="form.adSdkName"></el-input>
                </el-form-item>
                <el-form-item label="是否接入" >
                    <el-radio-group v-model="form.isRegister">
                        <el-radio class="radio" :label="1">是</el-radio>
                        <el-radio class="radio" :label="0">否</el-radio>
                    </el-radio-group>
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
    import { listItem, addItem, updateItem } from '@/api/ad/adSDK'
    import { checkPermission } from '@/api/checkPermission'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    // 1: 'gray',
                    0: 'danger'
                }
                return statusMap[status]
            },

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
                    adSdkId: [
                        { required: true, message: '请输入Id', trigger: 'blur' },
                    ],
                    adSdkName: [
                        { required: true, message: '请输入SDK名称', trigger: 'blur' },
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
                                    message: '成功新增SDK'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改SDK' 
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
                    adSdkId: "",
                    adSdkName: "",
                    isRegister: 0
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
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
            
        }
    }
</script>

