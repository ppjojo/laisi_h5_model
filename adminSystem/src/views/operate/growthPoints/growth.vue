<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-divider content-position="left">新手奖励</el-divider>
        <el-table v-loading="loading" :data="newuserRewardList" element-loading-text="Loading" border fit
            highlight-current-row size="small ">
            <el-table-column align="center" prop="actionName" label="活动名称">
            </el-table-column>
            <el-table-column align="center" prop="growthChange" label="成长值">
            </el-table-column>
            <el-table-column align="center" prop="dayGrowthLimited" label="每日上限">
            </el-table-column>
            <el-table-column align="center" prop="totalGrowthLimited" label="总上限">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-divider content-position="left">日常奖励</el-divider>
        <el-table v-loading="loading" :data="dailyRewardList" element-loading-text="Loading" border fit
            highlight-current-row size="small ">
            <el-table-column align="center" prop="actionName" label="活动名称">
            </el-table-column>
            <el-table-column align="center" prop="growthChange" label="成长值">
            </el-table-column>
            <el-table-column align="center" prop="dayGrowthLimited" label="每日上限">
            </el-table-column>
            <el-table-column align="center" prop="totalGrowthLimited" label="总上限">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-divider content-position="left">主线奖励</el-divider>
        <el-table v-loading="loading" :data="mainlinRewardList" element-loading-text="Loading" border fit
            highlight-current-row size="small ">
            <el-table-column align="center" prop="actionName" label="活动名称">
            </el-table-column>
            <el-table-column align="center" prop="growthChange" label="成长值">
            </el-table-column>
            <el-table-column align="center" prop="dayGrowthLimited" label="每日上限">
            </el-table-column>
            <el-table-column align="center" prop="totalGrowthLimited" label="总上限">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'活动'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="活动名称" prop="actionName">
                    <el-input v-model="form.actionName"></el-input>
                </el-form-item>

                <el-form-item label="活动类型" prop="actionType" v-show='dialogTitle == "新增" '>
                    <el-select v-model="form.actionType" placeholder="请选择活动类型" clearable>
                        <el-option v-for="item in actionTypeList" :key="item.value" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="成长值" prop="growthChange">
                    <el-input v-model.number="form.growthChange"></el-input>
                </el-form-item>

                <el-form-item label="每日上限">
                    <el-input v-model.number="form.dayGrowthLimited"></el-input>
                </el-form-item>

                <el-form-item label="总上限">
                    <el-input v-model.number="form.totalGrowthLimited"></el-input>
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/growthPoints/growth'
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
                newuserRewardList: [],
                dailyRewardList: [],
                mainlinRewardList: [],
                loading: false,

                // 表单数据
                actionTypeList: [
                    { value: '00', name: '新手奖励' },
                    { value: '01', name: '日常奖励' },
                    { value: '02', name: '主线奖励' },
                ],


                dialogVisible: false,
                form: {},
                rules: {
                    growthChange: [
                        { required: true, message: '请输入成长值', trigger: 'blur' },
                        {
                            required: true,
                            pattern: /^\+?[1-9]\d*$/,
                            message: '成长值只能输入数字',
                            trigger: 'blur'
                        }
                    ],
                    actionName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    actionType: [
                        { required: true, message: '请选择活动类型', trigger: 'change' }
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
                    this.newuserRewardList = []
                    this.dailyRewardList = []
                    this.mainlinRewardList = []
                    res.data.map(item => {
                        if (item.actionType == '00') {
                            this.newuserRewardList.push(item)
                        } else if (item.actionType == '01') {
                            this.dailyRewardList.push(item)
                        } else if (item.actionType == '02') {
                            this.mainlinRewardList.push(item)
                        }
                    })
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
                                    message: '成功新增' + this.form.actionName 
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.actionName 
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
                    actionId: null,
                    actionType: null,
                    growthChange: null,
                    actionName: null,
                    dayGrowthLimited: null,
                    totalGrowthLimited: null
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(row) {
                this.$confirm('此操作将永久删除活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        actionId: row.actionId,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选活动!'
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