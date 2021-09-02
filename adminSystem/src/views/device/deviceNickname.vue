<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="deviceType" label="设备类型">
            </el-table-column>
            <el-table-column align="center" prop="deviceParentModel" label="设备型号">
            </el-table-column>
            <el-table-column align="center" prop="bindDeviceModel" label="绑定设备型号">
            </el-table-column>
            <el-table-column align="center" prop="devicePostfix" label="呢称后缀">
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
        <el-dialog :title="dialogTitle+'设备昵称'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                <el-form-item label="设备类型" prop="deviceType">
                    <el-select v-model="form.deviceType" placeholder="请选择设备类型" @change="deviceTypeChange">
                        <el-option v-for="item in deviceTypeList" :key="item.deviceType" :label="item.deviceType"
                            :value="item.deviceType">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备型号" prop="deviceParentModel">
                    <el-select v-model="form.deviceParentModel" placeholder="请选择设备型号">
                        <el-option v-for="item in nowDeviceModelList" :key="item.deviceModel" :label="item.deviceModel"
                            :value="item.deviceModel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="绑定设备类型" prop="bindDeviceModel">
                    <el-input v-model="form.bindDeviceModel"></el-input>
                </el-form-item>
                <el-form-item label="设备昵称后缀" prop="devicePostfix">
                    <el-input v-model="form.devicePostfix"></el-input>
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/device/deviceNickname'
    import { listItem as  productListItem} from '@/api/device/productList'
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
                    bindDeviceModel: [
                        { required: true, message: '请输入绑定设备型号', trigger: 'blur' },
                    ],
                    deviceParentModel: [
                        { required: true, message: '请选择设备类型', trigger: 'blur' },
                    ],
                    deviceType: [
                        { required: true, message: '请选择设备类型', trigger: 'blur' },
                    ],
                },
                deviceTypeList: [],//设备类型
                deviceModelList: [],//所有设备型号
                nowDeviceModelList: [],//当前设备类型下得设备型号

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
            getProductList(){
                productListItem({}).then(res => {
                    if (res.code == 0) {
                        this.deviceModelList=res.data
                        var obj = {};
                        this.deviceTypeList = res.data.reduce( (arr, next)=>{
                            obj[next.deviceType] ? '' : obj[next.deviceType] = true && arr.push(next);
                            return arr; 
                        }, []);
                        
                    }
                })
            },
            //设备类型改变后重置设备型号
            deviceTypeChange(value) {
                var that = this;
                this.nowDeviceModelList = [];
                this.deviceModelList.forEach(item => {
                    if (item.deviceType == value) {
                        that.nowDeviceModelList.push(item)
                    }
                });
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
                                    message: '成功新增' + this.form.bindDeviceModel + "设备昵称"
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.bindDeviceModel + "设备昵称"
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
                    deviceTitle: "",
                    deviceType: "",
                    deviceModel: "",
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