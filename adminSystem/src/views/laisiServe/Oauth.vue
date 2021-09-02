<template>
    <div class="app-container">
        <!-- <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="语言支持状态">
                    <el-select v-model="searchForm.isSupport" >
                        <el-option  label="支持的语言" value="1"></el-option>
                        <el-option  label="不支持的语言" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div> -->
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" >添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="languageType" label="语言类型">
            </el-table-column>
            <el-table-column align="center" prop="description" label="备注">
            </el-table-column>
            <el-table-column align="center" prop="deviceModel" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isSupport | statusFilter" size="mini">
                        {{ scope.row.isSupport==0?"不支持":"支持" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="回调地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item  prop="description">
                   <el-checkbox v-model="checked2" disabled>铼锶aaaa服务权限</el-checkbox>
                </el-form-item>
                <el-form-item  prop="description">
                   <el-checkbox v-model="checked2" disabled>铼锶aaaa服务权限</el-checkbox>
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/device/appLanguage'
    import { checkPermission } from '@/api/checkPermission'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
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
                searchForm:{
                    isSupport:"1"
                },
                rules: {
                    address: [
                        { required: true, message: '请输入回调地址', trigger: 'blur' },
                    ],
                    
                },
                checked2:true

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {

                listItem(this.searchForm).then(res => {
                    this.list = res.data
                    this.loading = false
                }).catch(error=>{
                    this.list=[]
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
                                    message: '成功新增' + this.form.languageType + "APP语言"
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.languageType + "APP语言"
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
                    isSupport: 1, // 1表示支持的语言，0表示不支持的语言 Integer
                    languageType: null, //语言类型 String  如：'en'
                    description: null
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除该APP语言, 是否继续?', '提示', {
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
                            message: '成功删除所选APP语言!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除APP语言操作',
                        type: 'info'
                    });
                });
            },

        }
    }
</script>