<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="deviceName" label="产品名称">
            </el-table-column>
            <el-table-column align="center" prop="deviceType" label="设备类型">
            </el-table-column>
            <el-table-column align="center" prop="deviceModel" label="设备型号">
            </el-table-column>
            <el-table-column align="center" prop="platform" label="平台">
            </el-table-column>
            <el-table-column align="center" prop="appSupport" label="APP最低版本">
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
        <el-dialog :title="dialogTitle+'相应的版本'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="130px" :rules="rules" ref="form">
                <el-form-item label="产品名" prop="deviceName">
                    <el-select v-model="form.deviceName" clearable @change='selectDeviceChange'>
                        <el-option v-for="item in deviceList" :key="item.id" :label="item.deviceName"
                            :value="item.deviceName">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="设备类别" prop="deviceType">
                    <el-input v-model="form.deviceType"></el-input>
                </el-form-item>
                <el-form-item label="设备型号" prop="deviceModel">
                    <el-input v-model="form.deviceModel"></el-input>
                </el-form-item>

                <el-form-item label="适用平台" prop="platform">
                    <el-radio-group v-model="form.platform">
                        <el-radio class="radio" label="ios">IOS</el-radio>
                        <el-radio class="radio" label="android">Android</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="APP最低版本号" prop="appSupport">
                    <el-input v-model.number="form.appSupport"></el-input>
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/device/deviceSupportAppVersion'
    import { listItem as productListItem } from '@/api/device/productList'
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
                form: {},
                rules: {
                    deviceName: [
                        { required: true, message: '请选择适用产品', trigger: 'change' }
                    ],
                    deviceType: [
                        { required: true, message: '请输入适用设备类别', trigger: 'blur' },
                    ],
                    deviceModel: [
                        { required: true, message: '请输入适用设备型号', trigger: 'blur' },
                    ],
                    platform: [
                        { required: true, message: '请选择适用平台', trigger: 'change' }
                    ],
                    appSupport: [
                        { required: true, message: '请输入设备支持的最低版本号', trigger: 'blur' },
                        {
                            pattern: /^\+?[1-9]\d*$/,
                            message: "请输入正整数",
                            trigger: "blur"
                        }
                    ],
                },
                deviceList: [],//所有设备
            }
        },
        mounted() {
            this.getList()
            this.getProductList()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            getProductList() {
                productListItem({}).then(res => {
                    if (res.code == 0) {
                        this.deviceList = res.data
                        // var obj = {};
                        // this.deviceTypeList = res.data.reduce((arr, next) => {
                        //     obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
                        //     return arr;
                        // }, []);

                    }
                })
            },
            //设备类型改变后重置设备型号
            selectDeviceChange(value) {
                this.deviceList.map(item => {
                    if (item.deviceName == value) {
                        this.form.deviceModel = item.deviceModel
                        this.form.deviceType = item.deviceType
                    }
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
                                    message: '成功新增' + this.form.deviceName
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.deviceName
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
                    deviceName: null,
                    deviceType: null,
                    deviceModel: null,
                    platform: 'ios',
                    appSupport: null,
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除设备昵称, 是否继续?', '提示', {
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
                            message: '成功删除所选设备昵称!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除设备昵称操作',
                        type: 'info'
                    });
                });
            },

        }
    }
</script>