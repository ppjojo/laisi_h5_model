<template>
    <div class="app-container">
        <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="店铺数据" name="shop">
                <div class="container-edit">
                    <el-button type="primary" size="mini" @click="btn_add" v-if="checkPer('add')">录入店铺数据</el-button>
                </div>
                <el-table v-loading="slistLoading" :data="slist" element-loading-text="Loading" border fit
                    highlight-current-row size="small ">
                    <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
                    <el-table-column align="center" prop="saleboardName" label="店铺">
                    </el-table-column>
                    <el-table-column align="center" prop="saleboardPerson" label="责任人">
                    </el-table-column>
                    <el-table-column align="center" prop="dayComplete" label="当天完成额 ">
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="日期">
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            </el-button>
                            <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                                v-if="checkPer('delete')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :pageTotal="stotal" @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange">
                </pagination>

            </el-tab-pane>
            <el-tab-pane label="代理数据" name="other">
                <div class="container-edit">
                    <el-button type="primary" size="mini" @click="btn_add" v-if="checkPer('add')">录入代理数据</el-button>
                </div>
                <el-table v-loading="clistLoading" :data="clist" element-loading-text="Loading" border fit
                    highlight-current-row size="small ">
                    <el-table-column align="center" prop="id" label="ID" width="65" ></el-table-column>
                    <el-table-column align="center" prop="customerType" label="客户类型">
                    </el-table-column>
                    <el-table-column align="center" prop="customerName" label="客户">
                    </el-table-column>
                    <el-table-column align="center" prop="monthTask" label="月目标">
                    </el-table-column>
                    <el-table-column align="center" prop="dayComplete" label="当天完成额">
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="日期">
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            </el-button>
                            <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                                v-if="checkPer('delete')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :pageTotal="ctotal" @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange">
                </pagination>

            </el-tab-pane>
        </el-tabs>

        <el-dialog title="销售额的录入" :visible.sync="shopEditVisible">
            <el-form :model="shopForm" label-width="120px" :rules="editFormRules" ref="shopForm">
                <el-form-item label="店铺：" prop="saleboardName">
                    <el-select v-model="shopForm.saleboardName" placeholder="请选择">
                        <el-option key="京东自营旗舰店" label="京东自营旗舰店" value="京东自营旗舰店"></el-option>
                        <el-option key="京东POP店" label="京东POP店" value="京东POP店"></el-option>
                        <el-option key="天猫旗舰店" label="天猫旗舰店" value="天猫旗舰店"></el-option>
                        <el-option key="淘宝企业店" label="淘宝企业店" value="淘宝企业店"></el-option>
                        <el-option key="拼多多旗舰店" label="拼多多旗舰店" value="拼多多旗舰店"></el-option>
                        <el-option key="有赞商城/1688" label="有赞商城/1688" value="有赞商城/1688"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="责任人" prop="saleboardPerson">
                    <el-select v-model="shopForm.saleboardPerson" placeholder="请选择">
                        <el-option key="黄谦羽" label="黄谦羽" value="黄谦羽"></el-option>
                        <el-option key="刘聪" label="刘聪" value="刘聪"></el-option>
                        <el-option key="陈磊/张贤中" label="陈磊/张贤中" value="陈磊/张贤中"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="月目标：">
                    <el-divider content-position="left">每月的第一天必须输入月目标值</el-divider>
                    <el-input v-model="shopForm.totalTask" type="num"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="当日完成额：" prop="dayComplete">
                    <el-input v-model="shopForm.dayComplete" type="num"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="createTime">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="shopForm.createTime" type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="shopEditVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('shopForm')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="销售额的录入" :visible.sync="channelEditVisible">
            <el-form :model="channelForm" label-width="120px" :rules="editFormRules" ref="channelForm">

                <el-form-item label="客户类型：" prop="customerType">
                    <el-select v-model="channelForm.customerType" placeholder="请选择">
                        <el-option key="渠道" label="渠道" value="渠道"></el-option>
                        <el-option key="定制" label="定制" value="定制"></el-option>
                        <!-- <el-option key="零售" label="零售" value="零售"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="客户：" prop="customerName">
                    <el-input v-model="channelForm.customerName"></el-input>
                </el-form-item>
                <el-form-item label="月目标：">
                    <el-divider content-position="left">每月的第一天必须输入月目标值</el-divider>
                    <el-input v-model="channelForm.monthTask" type="num"><template slot="append">元</template></el-input>
                </el-form-item>
                <el-form-item label="当日完成额：" prop="dayComplete">
                    <el-input v-model="channelForm.dayComplete" type="num"><template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="日期" prop="createTime">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="channelForm.createTime" type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="channelEditVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('channelForm')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { shopInsert, customerInsert, customerDelete, customerList, shopList, shopDelete } from '@/api/salesDept/salesDataEntry.js';
    import Pagination from "@/components/pagination";
    import { checkPermission } from '@/api/checkPermission'
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
        data() {
            return {
                slist: [],
                slistLoading: false,
                spage: 0,
                spageSize: 10,
                stotal: 0,

                clist: [],
                clistLoading: false,
                cpage: 0,
                cpageSize: 10,
                ctotal: 0,

                activeName: 'shop',

                shopEditVisible: false,
                channelEditVisible: false,
                shopForm: {

                },
                channelForm: {

                },
                editFormRules: {
                    saleboardName: [
                        { required: true, message: '请选择店铺', trigger: 'blur' },
                    ],
                    saleboardPerson: [
                        { required: true, message: '请选择责任人', trigger: 'blur' },
                    ],
                    dayComplete: [
                        { required: true, message: '请输入当天完成额', trigger: 'blur' },
                    ],
                    createTime: [
                        { required: true, message: '请选择日期', trigger: 'blur' },
                    ],
                    customerType: [
                        { required: true, message: '请选择客户类型', trigger: 'blur' },
                    ],
                    customerName: [
                        { required: true, message: '请输入客户名', trigger: 'blur' },
                    ],

                },
            }
        },
        mounted() {
            this.sgetList()
            this.cgetList()
        },
        methods: {
            tabClick(tab, event) {
                // if (this.activeName == "shop") {
                //     this.sgetList()
                // } else {
                //     this.cgetList()
                // }
            },
            handleCurrentChange(value) {
                if (this.activeName == "shop") {
                    this.spage = value - 1
                    this.sgetList()
                } else {
                    this.cpage = value - 1
                    this.cgetList()
                }
            },
            // 每页显示多少条
            handleSizeChange(val) {
                if (this.activeName == "shop") {
                    this.spageSize = val
                    this.sgetList()
                } else {
                    this.cpageSize = val
                    this.cgetList()
                }
            },
            //获取列表
            sgetList() {
                this.slistLoading=true
                shopList({
                    offset: this.spage,
                    limit: this.spageSize
                }).then(res => {
                    this.slist = res.data.listResult;
                    this.stotal = res.data.count;
                    this.slistLoading=false
                })
            },
            cgetList() {
                this.clistLoading=true
                customerList({
                    offset: this.cpage,
                    limit: this.cpageSize
                }).then(res => {
                    this.clist = res.data.listResult;
                    this.ctotal = res.data.count;
                    this.clistLoading=false
                })
            },
            //保存数据
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.activeName == 'shop') {
                            shopInsert(this.shopForm).then(res => {
                                this.shopEditVisible = false
                                this.sgetList();
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增店铺数据!'
                                });
                            })
                        } else {
                            customerInsert(this.channelForm).then(res => {
                                this.channelEditVisible = false
                                this.cgetList();
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增代理数据!'
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
                if (this.activeName == "shop") {
                    this.shopEditVisible = true
                    this.shopForm = {}
                } else {
                    this.channelEditVisible = true;
                    this.channelForm = {}
                }

            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.activeName == "shop") {
                        shopDelete({
                            id: id,
                        }).then(response => {
                            this.sgetList()
                            this.$notify({
                                type: 'success',
                                message: '成功删除所选数据!'
                            });
                        })
                    } else {
                        customerDelete({
                            id: id,
                        }).then(response => {
                            this.cgetList()
                            this.$notify({
                                type: 'success',
                                message: '成功删除所选数据!'
                            });
                        })
                    }

                }).catch(() => {
                    this.$notify({
                        message: '已取消删除数据操作',
                        type: 'info'
                    });
                });
            },


        }
    }
</script>