<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="订单号">
                    <el-input v-model="searchForm.postOrder" placeholder="订单号查询" clearable></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="searchForm.status" filterable placeholder="请选择">
                        <el-option key="2" label="全部" value="">
                        </el-option>
                        <el-option key="0" label="未发货" value="0">
                        </el-option>
                        <el-option key="1" label="已发货" value="1">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="recordId" label="编号" width="50">
            </el-table-column>
            <el-table-column align="center" prop="userId" label="用户Id" width="100">
            </el-table-column>
            <el-table-column align="center" prop="receiver" label="收货人姓名" >
                <template scope="scope">
                    <div v-if="scope.row.address">{{scope.row.address.receiver}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="收货地址">
                <template scope="scope">
                    <div v-if="scope.row.address">
                        {{scope.row.address.province + scope.row.address.city + scope.row.address.county + scope.row.address.address + scope.row.address.buildingNo}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="订单物品">
                <template scope="scope">
                    {{ arrformat2(scope.row.items).toString() }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="联系电话" width="140">
                <template scope="scope">
                    <div v-if="scope.row.address">{{scope.row.address.phoneNumber}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="兑换时间" width="140">
                <template slot-scope="scope">
                    {{scope.row.requestTime | formatDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="postOrder" label="物流单号" width="200">
            </el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"未发货":"已发货" }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="160">
                <template scope="scope">
                    <el-button @click="btn_view(scope.row)" type="text" size="mini">查看详情</el-button>
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" style="color:#67c23a">输入物流单号
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog title="发货" :visible.sync="dialogVisible" width="50%">
            <el-form ref="form" label-width="120px" :model="form" :rules="rules">
                <el-form-item label="快递公司">
                    <el-select v-model="form.orderName" filterable placeholder="请选择">
                        <el-option key="顺丰" label="顺丰" value="顺丰">
                        </el-option>
                        <el-option key="韵达" label="韵达" value="韵达">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="postOrder" label="快递单号">
                    <el-input v-model="form.postOrder" placeholder="请输入快递单号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title='数据详情' :visible.sync="detailListDivVisible" width="70%">
            <el-form ref="detailForm" label-width="120px" :model="detailForm">
                <el-form-item label="用户ID">
                    <el-input v-model="detailForm.userId" :disabled="true"></el-input>
                </el-form-item>
                <Section v-if="detailForm.address">
                    <el-form-item label="收货人">
                        <el-input v-model="detailForm.address.receiver" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="收货手机号码">
                        <el-input v-model="detailForm.address.phoneNumber" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="收货地址">
                        {{detailForm.address.province + detailForm.address.city + detailForm.address.county + detailForm.address.address + detailForm.address.buildingNo}}
                    </el-form-item>
                </Section>
            </el-form>
            <el-table :data="detailList" highlight-current-row style="width: 100%;">
                <el-table-column prop="name" label="物品名"></el-table-column>
                <el-table-column prop="count" label="数量">
                </el-table-column>
                <el-table-column label="图片">
                    <template scope="scope">
                        <div class="img-container">
                            <img width="50px" :src="scope.row.logo" alt="">
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="detailListDivVisible = false;">取消
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, updateItem } from '@/api/operate/pointLottery/orderManage'
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
                    1: 'success',
                    // 1: 'gray',
                    0: 'danger'
                }
                return statusMap[status]
            },
            formatDate(time) {
                time = time
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
                page: 1,
                limit: 10,
                total: 0,

                dialogVisible: false,
                form: {},
                searchForm: {},
                rules: {
                    postOrder: [{
                        required: true,
                        message: '请输入快递单号',
                        trigger: 'blur,change'
                    },],
                    name: [{
                        required: true,
                        message: '请填写商品名称',
                        trigger: 'blur,change'
                    },],

                },
                detailListDivVisible: false,
                detailForm: {},
                detailList:[]


            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                    page: this.page,
                    pageSize: this.limit,
                    ...this.searchForm
                }).then(res => {
                    this.list = res.data.data
                    this.total = res.data.total
                    this.loading = false
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val ;
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
                        updateItem(this.form).then(response => {
                            this.getList()
                            this.$notify({
                                type: 'success',
                                message: '成功修改' 
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
                this.form = row
                this.form.id = row.recordId
                this.form.orderName = "顺丰"
            },

            arrformat(arr) { //去重找出一样的
                var _res = []; // 
                arr.sort(this.compare('name'));
                for (var i = 0; i < arr.length;) {
                    var count = 0;
                    for (var j = i; j < arr.length; j++) {
                        if (arr[i].awardClass == arr[j].awardClass) {
                            count++;
                        }
                    }
                    _res.push([arr[i].name, count, arr[i].logo]);
                    i += count;
                }
                var newArr = [];
                for (var i = 0; i < _res.length; i++) {
                    newArr.push(_res[i][0] + ',' + _res[i][1] + ',' + _res[i][2]);
                }
                return newArr;
            },
            arrformat2(arr) {
                var arr = this.arrformat(JSON.parse(JSON.stringify(arr))), obj = [];
                arr.forEach(item => {
                    var itemarr = item.split(',')
                    obj.push(itemarr[0] + '*' + itemarr[1]);
                });
                return obj
            },
            compare(property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1.localeCompare(value2)
                }
            },
            //查看详情
            btn_view(row) {
                this.detailForm = Object.assign({}, row)
                this.detailList=[]
                let list = this.arrformat(row.items);
                list.forEach((d, i) => {
                    let obj = {},
                        arrs = d.split(',');
                    obj.name = arrs[0];
                    obj.logo = arrs[2];
                    obj.count = arrs[1];
                    this.detailList.push(obj);
                });
                this.detailListDivVisible = true
            },

        }
    }
</script>