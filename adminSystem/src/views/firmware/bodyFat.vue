<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="production" label="产品">
            </el-table-column>
            <el-table-column align="center" prop="firmwareType" label="固件类型">
            </el-table-column>
            <el-table-column align="center" prop="softwareVersion" label="固件版本">
            </el-table-column>
            <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.enable | statusFilter" size="mini">
                        {{ scope.row.enable==0?"不可用":"可用" }}
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
        <el-dialog :title="dialogTitle+'体脂秤固件'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="200px" :rules="rules" ref="form">
                <el-form-item label="产品" prop="production">
                    <el-input v-model="form.production"></el-input>
                </el-form-item>

                <el-form-item label="固件版本" prop="softwareVersion">
                    <el-input v-model="form.softwareVersion"></el-input>
                </el-form-item>
                <el-form-item label="固件类型" prop="firmwareType">
                    <el-radio-group v-model="form.firmwareType" @change="selectFirmwareType">
                        <el-radio class="radio" label="wifi">wifi</el-radio>
                        <el-radio class="radio" label="mcu">mcu</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="使⽤环境" prop="testing">
                    <el-radio-group v-model="form.testing">
                        <el-radio class="radio" :label="true">test</el-radio>
                        <el-radio class="radio" :label="false">prod</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="固件版本a⽂件下载地址：" prop="versionFileUrlA">
                    <el-input v-model="form.versionFileUrlA"></el-input>
                    <el-upload ref="upload" action :http-request="requestFile_a" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="固件版本a⽂件的crc校验值：" prop="versionCrcA">
                    <el-input v-model="form.versionCrcA"></el-input>
                </el-form-item>

                <el-form-item label="固件版本b⽂件下载地址：" prop="versionFileUrlB">
                    <el-input v-model="form.versionFileUrlB" :disabled=" form.firmwareType=='mcu' ">
                    </el-input>
                    <el-upload ref="upload" action :http-request="requestFile_b" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="固件版本b⽂件的crc校验值：" prop="versionCrcB">
                    <el-input v-model="form.versionCrcB" :disabled=" form.firmwareType=='mcu' ">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否可用：" prop="enable">
                    <el-radio-group v-model="form.enable">
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/firmware/bodyFat'
    import { fileUpload } from '@/utils/fileUpload'
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
                                    message: '成功新增体脂称固件'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改体脂称固件' 
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
                    production: "", //产品：h10
                    firmwareType: "wifi", //固件类型：wifi、mcu
                    softwareVersion: "", //固件版本：3.34 ->0x00000322 ->802
                    testing: true, // 环境：test 1；prod 0
                    versionFileUrlA: "", //固件版本a⽂件下载地址
                    versionCrcA: "", //crc校验值
                    versionFileUrlB: "", //固件版本b⽂件下载地址（和a相同）,类型为mcu时，为空
                    versionCrcB: "", //crc校验值（和a）,类型为mcu时，为空
                    enable: 0 //默认为0，不可用。可以用为1
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除该体脂称固件, 是否继续?', '提示', {
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
                            message: '成功删除所选体脂称固件!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            selectFirmwareType() {
                if (this.form.firmwareType == "mcu") {
                    this.form.versionCrcB = "";
                    this.form.versionFileUrlB = "";
                }
            },
            requestFile_a(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.versionFileUrlA = res.data.url;
                        this.form.versionCrcA = res.data.crc;
                    }
                })
            },
            requestFile_b(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.versionFileUrlB = res.data.url;
                        this.form.versionCrcB = res.data.crc;
                    }
                })
            },

        }
    }
</script>