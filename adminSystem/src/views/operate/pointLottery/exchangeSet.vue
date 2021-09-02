<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加商品</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="奖品ID">
            </el-table-column>
            <el-table-column align="center" prop="name" label="奖品名称">
            </el-table-column>
            <el-table-column align="center" prop="integral" label="逗币兑换数">
            </el-table-column>
            <el-table-column align="center" prop="weight" label="权重">
            </el-table-column>
            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"上架":"下架" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini">编辑</el-button>
                    <el-button @click="btn_shelf(scope.row)" type="text" style="color: #67c23a;" size="mini">
                        {{scope.row.status==0?'下架':'上架'}}</el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'兑换奖品'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                <el-form-item label="商品选择" prop="awardClass">
                    <el-select :disabled="dialogTitle=='编辑'" v-model="form.awardClass" filterable placeholder="请选择"
                        ref="selection" @change="setName" prop="awardClass">
                        <el-option v-for="(item,index) in exchangeList" :key="item.id" :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="兑换所需逗币" prop="integral">
					<el-input v-model.number="form.integral"></el-input>
				</el-form-item>
        <el-form-item label="权重" prop="weight">
        	<el-input v-model.number="form.weight"></el-input>
        </el-form-item>
				<el-form-item label="开始时间">
					<el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
						v-model="form.startTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
						v-model="form.endTime"></el-date-picker>
				</el-form-item>
				<el-form-item label="奖品说明" prop="instructions">
					<el-input type="textarea"  :autosize="{ minRows: 2}" placeholder="请输入奖品说明" v-model="form.instructions">
					</el-input>
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
    import { listItem, addItem, updateItem, deleteItem, viewItem, offShelf, onShelf, convertibleAward } from '@/api/operate/pointLottery/exchangeSet'
    import { checkPermission } from '@/api/checkPermission'
    import { formatDate } from '@/utils/date'
    import Pagination from "@/components/pagination";

    export default {
        components: {
            Pagination
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    // 1: 'gray',
                    2: 'danger'
                }
                return statusMap[status]
            },
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
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
                exchangeList: [],
                page: 0,
                limit: 10,
                total: 0,

                dialogVisible: false,
                form: {},
                searchForm: {},
                rules: {


                },


            }
        },
        mounted() {
            this.getList()
            this.getExchangeList()
        },
        methods: {
            getList() {
                listItem({
                    page: this.page,
                    pageSize: this.limit
                }).then(res => {
                    this.list = res.data.data
                    this.total = res.data.count
                    this.loading = false
                })
            },
            searchList() {
                searchListItem({
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data
                    this.total = res.data.length
                    this.loading = false
                })
            },
            getExchangeList() {
                convertibleAward({}).then(res => {
                    this.exchangeList = res.data;
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val - 1;
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
                        if (this.dialogTitle == "新增") {
                            addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.name
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.name
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
                    integral: "",
                    startTime: "",
                    endTime: "",
                    awardClass: "",
                    instructions: "",
                    weight:""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                viewItem({
                    id: row.id
                }).then(res => {
                    this.form = Object.assign({}, res.data)
                })

            },
            //删除
            btn_delete(row) {
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        id: row.id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选商品!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            //上下架
            btn_shelf(row) {
                this.$confirm('此操作将改变该奖品的状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (row.status == 0) {
                        offShelf({
                            id: row.id,
                        }).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功下架奖品!'
                            });
                        })
                    } else {
                        onShelf({
                            id: row.id,
                        }).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功上架奖品!'
                            });
                        })
                    }
                }).catch(() => {
                    this.$notify({
                        message: '已取消操作',
                        type: 'info'
                    });
                });
            },
            setName() {
				setTimeout(() => {
					this.form.name = this.$refs.selection.selectedLabel;
				}, 100)
			},
        }
    }
</script>
