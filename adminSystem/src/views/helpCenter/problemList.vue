<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <!-- <el-form-item label="语言设置：">
                    <el-select v-model="searchForm.language">
                        <el-option v-for="(item, ind) in languageList" :key="ind" :label="item.languageType"
                            :value="item.languageType">{{item.languageType + '-' +item.description}}</el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="问题标题">
                    <el-input v-model="searchForm.title"></el-input>
                </el-form-item>
                <el-form-item label="问题大类">
                    <el-select v-model="searchForm.questionType" placeholder="全部" clearable>
                        <el-option v-for="item in deviceModelList" :key="item.id" :label="item.questionTypeTitle"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
            <el-table-column align="center" prop="deviceType" label="设备类型"></el-table-column>
            <!-- <el-table-column align="center" prop="device_type_detail" label="设备名称"></el-table-column> -->
            <el-table-column align="center" prop="title" label="问题标题" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" btn_lan(scope.row)" type="text" style="color:#67c23a;" size="mini"
                        v-if="checkPer('edit')">语言配置
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'问题'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <!-- <el-form-item label="语言" prop="languageType">
                    <el-select v-model="form.languageType">
                        <el-option v-for="(item, ind) in languageList" :key="ind" :label="item.languageType"
                            :value="item.languageType">{{item.languageType + '-' +item.description}}</el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="问题标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                <el-form-item label="问题大类" prop="questionType">
                    <el-select v-model="form.questionType" clearable @change='selectDeviceModelChange'>
                        <el-option v-for="item in deviceModelList" :key="item.id" :label="item.questionTypeTitle"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备类型" prop="deviceType">
                    <el-input v-model="form.deviceType" disabled></el-input>
                </el-form-item>
                <el-form-item label="优先等级" prop="orderNumber">
                    <el-input v-model.number="form.orderNumber"></el-input>
                </el-form-item>
                <el-form-item label="问题解答" prop="operationManual">
                    <el-input v-model="form.operationManual" :autosize="{ minRows: 2}" type="textarea"></el-input>

                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="语言配置" :visible.sync="lanDialogVisible" width="70%">
            <el-row >
                <el-col :span="11">
                    <el-divider content-position="left">标题</el-divider>
                </el-col>
                <el-col :span="11">
                    <el-divider content-position="left">描述</el-divider>
                </el-col>
            </el-row>
            <el-row v-for="item in languageList">
                <el-col :span="11">
                    <el-form :model="lanForm1" label-width="120px"  ref="lanForm1">
                        <el-form-item :label="item.description+'-'+item.languageType" >
                            <el-input type="textarea" :autosize="{ minRows: 2}"  v-model="lanForm1[item.languageType]"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="11">
                    <el-form :model="lanForm2" label-width="120px"  ref="lanForm2">
                        <el-form-item :label="item.description+'-'+item.languageType">
                            <el-input type="textarea" :autosize="{ minRows: 2}"  v-model="lanForm2[item.languageType]"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="lanDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitLanForm('lanForm1')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, updateItem, deleteItem, addHot } from '@/api/helpCenter/problemList'
    import { listItem as languageListItem } from '@/api/device/appLanguage'
    import { lanAddItem, lanUpdateItem, lanViewItem } from '@/api/helpCenter/problemList'
    import { listItem as questionListItem } from '@/api/helpCenter/bigQuestion'
    import Pagination from "@/components/pagination";
    import { checkPermission } from '@/api/checkPermission'
    import { getUInfo } from '@/utils/auth'

    export default {
        components: {
            Pagination
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    // 1: 'gray',
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
                page: 0,
                limit: 10,
                total: 20,

                dialogVisible: false,
                form: {},
                searchForm: {
                    // language: "zh"
                    title:null,
                    questionType:null,
                    pageSize:10,
                    pageNumber:0
                },
                rules: {
                    deviceTitle: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' },
                    ],
                    deviceType: [
                        { required: false, message: '请输入产品类型', trigger: 'blur' },
                    ],
                    deviceModel: [
                        { required: true, message: '请输入产品型号', trigger: 'blur' },
                    ],
                },

                languageList: [],
                deviceModelList: [],
                lanDialogVisible:false,

                lanForm1: [],//标题
                lanForm2: [],//描述

            }
        },
        mounted() {
            // this.getList()
            // this.getLanguageList()
            this.getProductList()
        },
        methods: {
            getList() {
                listItem(this.searchForm).then(res => {
                    this.list = res.data
                    this.total = res.data.totalElements
                    this.loading = false
                })
            },
            getLanguageList() {
                languageListItem({
                    isSupport: 1
                }).then(res => {
                    this.languageList = res.data
                })
            },
            getProductList() {
                questionListItem({}).then(res => {
                    var obj = {};
                    this.deviceModelList = res.data;
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.searchForm.pageNumber = val - 1;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val) {
                this.searchForm.pageSize = val;
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
                                    message: '成功新增问题'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改问题'
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
                    user_id: JSON.parse(getUInfo()).id,
                    title: "",
                    question_type: "",
                    is_hot: 0,
                    device_type: "",
                    device_type_detail: "",
                    operation_manual: "",
                    languageType: ""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        ids: id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选问题!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除问题操作',
                        type: 'info'
                    });
                });
            },
            //选择问题所属设备型号时，设备型号的名称输入一起修改
            selectDeviceModelChange(value) {
                for (let i = 0; i < this.deviceModelList.length; i++) {
                    let item = this.deviceModelList[i]
                    if (item.deviceModel == value) {
                        this.form.device_type_detail = item.deviceType
                    }
                }
            },

            //语言配置
            btn_lan(row) {
                languageListItem({
                    isSupport: "1"
                }).then(res => {
                    this.languageList = res.data
                })
                // type ： faq表示常见问题。  manual 表示手册
                //subType 0 表示描述 ，1表示title
                this.lanForm1 = {
                    en: "",
                    zh: row.title,
                    cs: "",
                    fr: "",
                    ja: "",
                    pt: "",
                    ru: "",
                    sk: "",
                    it: "",
                    de: "",
                    type: "faq",
                    typeId: row.id,
                    subType: "1"
                }
                this.lanForm2 = {
                    en: "",
                    zh: row.operation_manual,
                    cs: "",
                    fr: "",
                    ja: "",
                    pt: "",
                    ru: "",
                    sk: "",
                    it: "",
                    de: "",
                    type: "faq",
                    typeId: row.id,
                    subType: "0"
                }
                this.getLanDetail()
                this.lanDialogVisible = true

            },
            getLanDetail() {
                lanViewItem({
                    type: "faq",
                    typeId:  this.lanForm1.typeId,
                    subType: "1"
                }).then(res => {
                    if (res.data.length>0) {
                        if (res.data[0].subType == 1) {
                            this.lanForm1 = Object.assign(this.lanForm1, res.data[0])
                            this.lanForm2 = Object.assign(this.lanForm2, res.data[1])
                        } else {
                            this.lanForm2 = Object.assign(this.lanForm2, res.data[0])
                            this.lanForm1 = Object.assign(this.lanForm1, res.data[1])
                        }
                        this.dialogTitle = "编辑"
                    } else {
                        this.dialogTitle = "新增"
                    }
                })
            },
            submitLanForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.lanDialogVisible = false
                        if (this.dialogTitle == "新增") {
                            lanAddItem(this.lanForm1).then(response => {
                                this.getLanDetail()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增翻译资源'
                                });
                            })
                            lanAddItem(this.lanForm2).then(response => {
                                this.getLanDetail()
                            })
                        } else {
                            lanUpdateItem(this.lanForm1).then(response => {
                                this.getLanDetail()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改翻译资源'
                                });
                            })
                            lanUpdateItem(this.lanForm2).then(response => {
                                this.getLanDetail()
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        }
    }
</script>
