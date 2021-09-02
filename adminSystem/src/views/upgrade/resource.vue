<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="versionNum" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="version" label="资源版本号">
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建日期"></el-table-column>
            <el-table-column align="center" prop="description" label="描述">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.version)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'资源'" :visible.sync="dialogVisible" width="60%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="资源版本号：" prop="version">
                    <el-input v-model="form.resource.version" :disabled="dialogTitle=='编辑'"></el-input>
                </el-form-item>
                <el-form-item label="描述：" prop="description">
                    <el-input v-model="form.resource.description" type='textarea'>
                    </el-input>
                </el-form-item>
                 

                <el-divider content-position="left" v-if="dialogTitle=='编辑'"> 差分包</el-divider>
                <el-button type="primary" @click="btn_add_package" size="mini" v-if="dialogTitle=='编辑'">新增差分包</el-button>
                <el-table :data="form.packages" highlight-current-row style="width: 100%;" v-if="dialogTitle=='编辑'">
                    <el-table-column prop="oldVersion" label="旧版本号"></el-table-column>
                    <el-table-column prop="path" label="资源地址"></el-table-column>
                    <el-table-column prop="size" label="固件文件大小（KB）"></el-table-column>
                    <el-table-column prop="md5" label="MD5"></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template scope="scope">
                            <el-button @click=" btn_removeResource(scope.$index, scope.row.id)" type="text"
                                style="color:#f78989;" size="mini">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title='差分包' :visible.sync="resourceVisible" width="50%" @closed="">
            <el-form :model="resourceForm" label-width="160px" :rules="AddorEditFormRules" ref="resourceForm">
                <el-form-item label="旧固件版本">
                    <el-select v-model="resourceForm.oldVersion" placeholder="请选择">
                        <el-option v-for="item in list" :label="item.version" :value="item.version"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="当前版本号" prop="newVersion">
                    <el-input v-model="resourceForm.newVersion" readonly></el-input>
                </el-form-item>
                <el-divider content-position="left">文件</el-divider>
                <el-upload ref='upload' action="" :http-request="requestFile" :before-upload="beforeAvatarUpload"
                    :show-file-list="false">
                    <el-button style="margin-left: 87px;margin-bottom: 10px;" size="mini" type="primary">点击上传文件
                    </el-button>
                </el-upload>
                <el-form-item label="文件名" prop="version">
                    <el-input v-model="resourceForm.version"></el-input>
                </el-form-item>
                <el-form-item label="资源地址" prop="path">
                    <el-input v-model="resourceForm.path" :readonly='true'></el-input>
                </el-form-item>
                <el-form-item label="固件文件大小（KB）" prop="size">
                    <el-input v-model="resourceForm.size" :readonly='true'></el-input>
                </el-form-item>
                <el-form-item label="固件文件的MD5" prop="md5">
                    <el-input v-model="resourceForm.md5" :readonly="true"></el-input>
                </el-form-item>

            </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click.native="resourceVisible = false,resourceForm = {}">取消</el-button>
                <el-button size="mini" type="primary" @click.native="btn_pushResource">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { listItem, addItem, viewItem, updateItem, deleteItem, packageAddItem, packageDeleteItem } from '@/api/upgrade/resource'
    import { fileUpload } from '@/utils/fileUpload'
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
                    resource: {
                        description: '',
                        version: '',
                    },
                    packages: []
                },
                rules: {

                },
                resourceVisible: false,
                resourceForm: {
                    newVersion: ""
                },

            }
        },
        mounted() {
            this.getList()
            //this.getResouceList()
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
                        if(this.dialogTitle=="新增"){
                            addItem(this.form.resource).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功新增' + this.form.firmware.version
                            });
                        })
                        }else{
                            updateItem(this.form.resource).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功编辑' + this.form.firmware.version
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
                    resource: {
                        description: '',
                        version: '',
                    },
                    packages: []
                }
            },
            //新增差分包
            btn_add_package() {
                this.resourceVisible = true;
                this.resourceForm = {
                    newVersion: this.form.resource.version,
                    crc: "",
                    md5: "",
                    oldVersion: "",
                    path: "",
                    size: "",
                    type: 2,
                    url: "",
                    version: ""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                viewItem({
                    resourceVersion: row.version
                }).then(res => {
                    this.form = Object.assign({}, res.data);
                })
            },
            //删除
            btn_delete(version) {
                this.$confirm('此操作将永久删除固件版本, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        version: version,
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
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        for (let keys in res.data) {
                            this.$set(this.resourceForm, keys, res.data[keys])
                        }
                        this.resourceForm.version = param.file.name;
                        this.resourceForm.path = this.resourceForm.url;
                    }
                })
            },
            btn_pushResource() {
                this.$confirm('此操作将新增差分包', '提示', {}).then(() => {
                        packageAddItem(this.resourceForm).then(res => {
                            if (res.code == 0) {
                                this.form.packages.push(res.data);
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增差分包!'
                                });
                                this.resourceVisible = false;
                            }
                        })
                    this.resourceForm = {};
                }).catch(() => {
                    this.$notify({
                        message: '已取消操作',
                        type: 'info'
                    });
                });

            },
            btn_removeResource(index, id) {
                this.$confirm('此操作将删除差分包', '提示', {}).then(() => {
                        packageDeleteItem({
                            id: id
                        }).then(res => {
                            if (res.code == 0) {
                                this.form.packages.splice(index, 1)
                                this.$notify({
                                    type: 'success',
                                    message: '成功删除差分包!'
                                });
                                this.resourceVisible = false;
                            }
                        })
                    this.resourceForm = {};
                }).catch(() => {
                    this.$notify({
                        message: '已取消操作',
                        type: 'info'
                    });
                });
            }

        }
    }
</script>