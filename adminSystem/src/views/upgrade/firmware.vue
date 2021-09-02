<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="firmwareType" label="平台类型">
            </el-table-column>
            <el-table-column align="center" prop="firmwareVersion" label="固件版本号">
            </el-table-column>
            <el-table-column align="center" prop="resourceVersion" label="资源版本号">
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
        <el-dialog :title="dialogTitle+'固件版本'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="平台类型：" prop="firmwareType">
                    <el-radio-group v-model="form.firmware.firmwareType" :disabled="dialogTitle=='编辑'">
                        <el-radio class="radio" :label="'Android'">Android</el-radio>
                        <el-radio class="radio" :label="'IOS'">IOS</el-radio>
                        <el-radio class="radio" :label="'All'">All</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="资源版本号：" prop="resourceVersion">
                    <el-select v-model="form.firmware.resourceVersion" placeholder="请选择">
                        <el-option v-for="item in relist" :key="item.version" :label="item.version"
                            :value="item.version">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="固件版本号：" prop="firmwareVersion">
                    <el-input v-model="form.firmware.firmwareVersion" :disabled="dialogTitle=='编辑'"></el-input>
                </el-form-item>
                <el-form-item label="描述：" prop="firmwareDescribe">
                    <el-input v-model="form.firmware.firmwareDescribe" type='textarea'></el-input>
                </el-form-item>
                <el-table :data="form.packages" highlight-current-row style="width: 100%;"
                    v-if="dialogTitle=='编辑'">
                    <el-table-column prop="version" label="差分版本号"></el-table-column>
                    <el-table-column prop="path" label="资源地址"></el-table-column>
                    <el-table-column prop="size" label="固件文件大小（KB）"></el-table-column>
                    <el-table-column prop="md5" label="固件文件的MD5校验"></el-table-column>

                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { listItem, addItem, viewItem, updateItem, deleteItem } from '@/api/upgrade/firmware'
    import { listItem as resouceListItem } from '@/api/upgrade/resource'
    import { checkPermission } from '@/api/checkPermission'

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
                form: {
                    firmware:{},
                    packages:[]
                },
                rules: {
                   
                },
                relist:[]

            }
        },
        mounted() {
            this.getList()
            this.getResouceList()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            getResouceList(){
                resouceListItem({}).then(res => {
                    this.relist = res.data
                })
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.dialogTitle == "新增") {
                            addItem(this.form.firmware).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.firmware.firmwareVersion
                                });
                            })
                        } else {
                            updateItem(this.form.firmware).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.firmware.firmwareVersion
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
                    firmware:{},
                    packages:[]
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                viewItem({
                    firmwareId:row.id
                }).then(res=>{
					this.form = Object.assign({}, res.data);
				})
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除固件版本, 是否继续?', '提示', {
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
                            message: '成功删除所选固件版本!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除固件版本操作',
                        type: 'info'
                    });
                });
            },

        }
    }
</script>