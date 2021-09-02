<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="用户ID：">
                    <el-input v-model="searchForm.uid"  clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model="searchForm.phoneNumber"  clearable></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input v-model="searchForm.nickname"  clearable></el-input>
                </el-form-item>
                <el-form-item label="会员等级：">
                    <el-select v-model="searchForm.memberLevel" placeholder="全部" clearable>
                        <el-option v-for="item in memberLevelList" :key="item.value" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="page=0;getList()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="uid" label="用户ID"  width="150">
            </el-table-column>
            <el-table-column align="center" prop="phoneNumber" label="手机号">
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column align="center" label="会员等级">
                <template slot-scope="props">
                    LV {{props.row.memberLevel}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="growthVal" label="成长值">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click=" btn_view(scope.row)" type="text" style="color:#67c23a;" size="mini"
                        v-if="checkPer('view')">明细
                    </el-button>
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">修改成长值
                    </el-button>
                    
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog title="修改该用户的成长值" :visible.sync="dialogVisible">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="用户ID" prop="uid">
                    <el-input v-model="form.uid" disabled></el-input>
                </el-form-item>

                <el-form-item label="成长值来源" prop="growthSource">
                    <el-input v-model.number="form.growthSource"></el-input>
                    成长值来源内容请操作员自填,并且此输入限制字符长度为30。
                </el-form-item>

                <el-form-item label="成长值变化" prop="growthChange">
                    <el-input v-model.number="form.growthChange"></el-input>
                    成长值变化的输入，输入正数时为增加该数值，输入负数时为减去该数值，如：6，-3。
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="form.remark" type='textarea'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="成长值明细" :visible.sync="detailVisible">
            <el-form :model="detailForm" label-width="100px" :rules="rules" ref="detailForm">
                <el-form-item label="用户ID" >
                    <el-input v-model="detailForm.user.uid" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="detailForm.user.phoneNumber" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称" >
                    <el-input v-model="detailForm.user.nickname" disabled></el-input>
                </el-form-item>
                <el-form-item label="会员等级" >
                    <el-input v-model="detailForm.user.memberLevel" disabled></el-input>
                </el-form-item>
                <el-form-item label="成长值" >
                    <el-input v-model="detailForm.user.growthVal" disabled></el-input>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">明细详情</el-divider>
            <el-table highlight-current-row :data="detailForm.list"  size="small ">
                <el-table-column prop="growthSource" label="成长值来源">
                </el-table-column>

                <el-table-column prop="growthChange" label="成长值变化">
                </el-table-column>
                
                <el-table-column prop="createTime" label="时间">
                    <template slot-scope="props">
                        {{props.row.createTime | formatDate}}
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true">
                </el-table-column>

            </el-table>
            <pagination :pageTotal="total2" @handleCurrentChange="handleCurrentChange2" @handleSizeChange="handleSizeChange2">
            </pagination>

        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, viewItem } from '@/api/growthPoints/growthValue'
    import { checkPermission } from '@/api/checkPermission'
    import Pagination from "@/components/pagination";
    import {getUInfo} from "@/utils/auth";
    import {formatDate} from "@/utils/date";
    export default {
        components: {
            Pagination
        },
        computed: {
            checkPer() {
                return function (btn) {
                    return (checkPermission(this.$route.path + '/' + btn))
                }
            }
        },
        filters: {
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
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
                searchForm: {},
                rules: {
                    growthChange: [
                        { required: true, message: '请输入成长值的变化值', trigger: 'blur' },
                    ],
                    growthSource: [
                        { required: true, message: '请输入成长值来源', trigger: 'blur' },
                    ],
                },
                memberLevelList:[],
                detailVisible:false,
                detailForm:{
                    user:{},
                    list:[]
                },
                page2: 0,
                limit2: 10,
                total2: 20,

            }
        },
        mounted() {
            this.getList()
            this.memberLevelList = []
            for (let i = 0; i < 31; i++) {
                let item = {
                    value:  i,
                    name: 'LV' + i
                }
                this.memberLevelList.push(item)
            }
        },
        methods: {
            getList() {
                listItem({
                    page: this.page,
                    pageSize: this.limit,
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data.list
                    this.total = res.data.count
                    this.loading = false
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val-1;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val) {
                this.limit = val;
                this.getList()
            },
            //保存
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.uid + "的成长值"
                                });
                            })
                            
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, {
                    uid: row.uid,
                    employeeNo: JSON.parse(getUInfo()).id,
                    growthChange: null,
                    remark: null,
                    growthSource: null
                })
                
            },

            btn_view(row){
                this.detailVisible = true
                this.detailForm.user=row;
                this.getDetailList()
               
            },
            getDetailList(){
                viewItem({
                    page: this.page2,
                    pageSize: this.limit2,
                    uid:this.detailForm.user.uid
                }).then(res => {
                    this.detailForm.list = res.data.list
                    this.total2 = res.data.count
                })
            },
             // 上下分页
             handleCurrentChange2(val) {
                this.page2 = val-1;
                this.getDetailList()
            },
            // 每页显示多少条
            handleSizeChange2(val) {
                this.limit2 = val;
                this.getDetailList()
            },

        }
    }
</script>