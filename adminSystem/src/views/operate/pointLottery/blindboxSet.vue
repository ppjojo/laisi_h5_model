<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()">添加盲盒</el-button>
            <el-button type="success" size="mini" @click="btn_getbuyer()">盲盒购买者</el-button>
        </div>
        <div   v-if="boxAccount.length>0">
            <div style="padding:10px 0;">当前<span>未开奖</span>的盲盒数：</div>
            <div style="padding:10px 0;" v-for=" item in boxAccount">
                <span>{{item.box_type==1?"红盒子":item.box_type==2?"紫盒子":item.box_type==3?"金盒子":""}}:</span>
                <span>{{item.unopenedCount}}</span>
            </div>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small">
            <el-table-column align="center" prop="id" label="ID">
            </el-table-column>
            <el-table-column align="center" prop="name" label="盲盒名称">
            </el-table-column>
            <el-table-column align="center" label="盲盒分类">
                <template scope="scope">
                    <div>{{scope.row.boxType==1?"红盒子":scope.row.boxType==2?"紫盒子":"金盒子"}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="盲盒奖池" width="250">
                <template scope="scope">
                    <span v-for="item in scope.row.items">
                        {{item.name+"*"+item.awardCount+"、"}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开奖状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==1?"未开奖":"已开奖" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="openTime" label="开奖时间" width="150">
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="scope.row.status==1">编辑
                    </el-button>
                    <el-button @click=" btn_edit_poolAward(scope.row)" type="text" size="mini"
                        v-if="scope.row.status==1" style="color:#67c23a;">奖池商品
                    </el-button>
                    <el-button @click=" btn_award_detail(scope.row)" type="text" size="mini" v-if="scope.row.status==2"
                        style="color:#67c23a;">中奖信息
                    </el-button>
                    <el-button @click=" btn_delete(scope.row)" type="text" size="mini" style="color:#f78989;">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>



        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'盲盒组'" :visible.sync="dialogVisible" width="60%">
            <el-form :model="form" label-width="230px" :rules="rules" ref="form">
                <el-form-item label="盲盒奖池名称：" prop="name">
                    <el-input :readonly="dialogTitle=='编辑'" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="盲盒类型：" prop="boxType">
                    <el-radio-group :disabled="dialogTitle=='编辑'" v-model="form.boxType">
                        <el-radio class="radio" :label="1">红盒子</el-radio>
                        <el-radio class="radio" :label="2">紫盒子</el-radio>
                        <el-radio class="radio" :label="3">金盒子</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选择奖池：" prop="awardPoolId">
                    <el-select :disabled="dialogTitle=='编辑'" v-model="form.awardPoolId" filterable placeholder="请选择">
                        <el-option v-for="(item,sindex) in poolList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开奖时间:" prop="openTime">
                    <el-date-picker v-model="form.openTime" type="datetime" format="yyyy-MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 购买者 -->
        <el-dialog title='当前盲盒买者' :visible.sync="buyerVisible" width="75%">
            <el-table :data="buyerList" highlight-current-row border fit size="small">
                <el-table-column align="center" prop="userId" label="userId" width="120">
                </el-table-column>
                <el-table-column align="center" label="盒子种类">
                  <template scope="scope">
                      <div>{{scope.row.boxType==1?"红盒子":scope.row.boxType==2?"紫盒子":"金盒子"}}</div>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="createTime" label="购买时间">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="buyerVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!--中奖信息-->
        <el-dialog title='中奖信息' :visible.sync="openVisible" width="75%">
            <div style="padding: 10px;">盲盒总个数：<span class="red">{{openDetail.totalAward||0}}</span>&nbsp;
                盲盒参与人数：<span class="red">{{openDetail.totalAttend||0}}</span>&nbsp;盲盒中奖人数：<span
                    class="red">{{openDetail.totalWin||0}}</span>
            </div>
            <el-table :data="openList" highlight-current-row border fit size="small">
                <el-table-column align="center" prop="user_id" label="ID" width="100">
                </el-table-column>
                <el-table-column align="center" prop="nickname" label="用户昵称" width="170">
                </el-table-column>
                <el-table-column align="center" prop="name" label="奖品名称">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="openVisible = false">取消</el-button>
            </div>
        </el-dialog>


        <!--奖池商品编辑界面-->
        <el-dialog title='奖池商品' :visible.sync="poolItemFormVisible" width="75%">
            <el-form label-width="230px">
                <el-form-item label="选择奖池奖品：">
                    <el-select ref="poolitems" v-model="poolItemChoose" value-key="awardClass" multiple filterable
                        placeholder="请先选择奖池">
                        <el-option v-for="(item,sindex) in poolItemList" :key="item.awardClass" :label="item.name"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-table :data="poolItemChoose" highlight-current-row v-loading="listLoading" border fit size="small">
                    <el-table-column align="center" prop="awardClass" label="ID" width="65">
                    </el-table-column>
                    <el-table-column align="center" prop="pictureUrl" label="奖品图片">
                        <template scope="scope">
                            <div class="img-container">
                                <img width="60px" :src="scope.row.logo" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="奖品名称">
                    </el-table-column>
                    <el-table-column align="center" label="奖品数量">
                        <template scope="scope">
                            <div v-if="!scope.row.max">{{scope.row.awardCount - scope.row.usedCount}}</div>
                            <div v-else>{{scope.row.max}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="奖品分类">
                        <template scope="scope">
                            <div>
                                {{scope.row.type==5||scope.row.awardType==5?"实物":scope.row.type==3||scope.row.awardType==3?"优惠券":scope.row.type==4||scope.row.awardType==4?"包邮券":"红包"}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="数量">
                        <template scope="scope">
                            <el-input v-if="scope.row.updateTime" type="number" v-model="scope.row.awardCount"
                                placeholder="请输入"></el-input>
                            <el-input v-else type="number" v-model="scope.row.count" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="120">
                        <template scope="scope">
                            <el-button @click="handlePool(scope.row)" type="text" size="mini" >提交
                            </el-button>
                            <el-button  @click="handlePoolDel(scope.$index, scope.row)" type="text" size="mini" style="color:#f78989;">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="poolItemFormVisible = false">取消</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import { listItem, addItem, updateItem, deleteItem, selectAwardPool,getUnopenedBoxesUser, OpenedBoxesDetails, awardPoolItem, supriseBoxPooladdItem, supriseBoxPoolupdateItem, supriseBoxPooldeleteItem ,unopenedBoxesCount} from '@/api/operate/pointLottery/blindboxSet'
    import { checkPermission } from '@/api/checkPermission'
    import { fileUpload } from '@/utils/fileUpload'
    import { formatDate } from '@/utils/date'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    // 1: 'gray',
                    1: 'danger'
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
                dialogVisible: false,
                form: {},
                poolList: [],
                buyerList:[],
                buyerVisible:false,
                rules: {
                    name: [{
                        required: true,
                        message: '请填写奖池名称',
                        trigger: 'blur,change'
                    },],
                    boxType: [{
                        required: true,
                        message: '请选择盲盒类型',
                        trigger: 'blur,change'
                    },],
                    openTime: [{
                        required: true,
                        message: '请选择开奖时间',
                        trigger: 'blur,change'
                    },],
                    awardPoolId: [{
                        required: true,
                        message: '请选择奖池',
                        trigger: 'blur,change'
                    },],
                    goodsUrl: [{
                        required: true,
                        message: '请填写商品链接',
                        trigger: 'blur,change'
                    },],

                },
                openDetail: {},
                openVisible: false,
                openList: [],

                poolItemFormVisible: false,
                poolItemList: [],//奖池下的奖品
                poolItemids: [],//选中的奖品ids
                poolItemChoose: [],//选中的奖品表格

                boxAccount:[],

            }
        },
        mounted() {
            this.getList()
            this.getAllpool()
            this.getUnopenedBoxesCount()
        },
        methods: {
            getList() {
                listItem({}).then(res => {
                    this.list = res.data
                    this.loading = false
                })
            },
            getAllpool() {
                selectAwardPool({}).then(res => {
                    this.poolList = res.data;
                })
            },
            getUnopenedBoxesCount(){
                unopenedBoxesCount({}).then(res => {
                    this.boxAccount = res.data;
                })
            },
            btn_getbuyer(){
                getUnopenedBoxesUser().then(res=>{
                    this.buyerList = res.data;
                    this.buyerVisible = true;
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
                    boxType: null, //类型
                    name: null,
                    awardPoolId: null,
                    openTime: null,
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(row) {
                this.$confirm('此操作将永久删除该盲盒, 是否继续?', '提示', {
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
                            message: '成功删除所选盲盒!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作',
                        type: 'info'
                    });
                });
            },
            //中奖信息
            btn_award_detail(row) {
                this.openList = []
                this.openDetail = row
                OpenedBoxesDetails({
                    awardPoolId: row.id
                }).then(res => {

                    for (let item in res.data) {
                        if (res.data[item].length == 2) {//就一个物品
                            let obj = {};
                            obj.user_id = item;
                            obj.nickname = res.data[item][1].nickname || res.data[item][0].nickname;
                            obj.count = res.data[item][0].count || res.data[item][1].count;
                            obj.name = res.data[item][0].name || res.data[item][1].name;
                            obj.redPacketValue=res.data[item][0].redPacketValue || res.data[item][1].redPacketValue;
                            if(res.data[item][0].type==2||res.data[item][1].type==2){
                              obj.name = res.data[item][0].count||res.data[item][1].count;
                              obj.name += '个红包共';
                              obj.name +=":"+ res.data[item][0].redPacketValue/100 || res.data[item][1].redPacketValue/100;
                              obj.name += '元';
                            }else{
                              if(res.data[item][0].type==0||res.data[item][1].type==0){
                                obj.name = obj.name + '*' + obj.redPacketValue;
                              }else{
                                obj.name = obj.name + '*' + obj.count;
                              }
                            }
                            this.openList.push(obj);
                        } else {
                            let arr = res.data[item];
                            let nickname = '', user_id = '', marr = [];
                            let obj = {};
                            arr.forEach((d, i) => {
                                if (d["nickname"]) {
                                    nickname = d["nickname"];
                                    user_id = d["user_id"]
                                }
                            })
                            obj.nickname = nickname;
                            obj.user_id = user_id;
                            arr.forEach((d, i) => {
                                if (d["name"]) {
                                   if(d["type"]==2){
                                     marr.push(d["count"]+'个'+d["name"]+"共计"+d["redPacketValue"]/100 + '元');
                                   }else{
                                     if(d["type"]==0){
                                       marr.push(d["name"] + '*' + d["redPacketValue"]);
                                     }else{
                                       marr.push(d["name"] + '*' + d["count"]);
                                     }
                                   }

                                }
                            })
                            obj.name = marr.toString();
                            this.openList.push(obj);
                        }
                    }
                    this.openVisible = true;
                })
            },
            //盲盒池奖品编辑
            btn_edit_poolAward(row) {
                this.form = row
                this.selectAwardPoolItem()
                this.poolItemChoose = row.items;
                this.poolItemFormVisible = true;
            },
            selectAwardPoolItem(id) {
                awardPoolItem({
                    poolId: this.form.awardPoolId
                }).then(res => {
                    this.poolItemList = res.data
                })
            },
            handlePool(row) {//提交奖品
                let param = JSON.parse(JSON.stringify(row));
                if (!param.updateTime) {
                    param.boxPoolId = this.form.id;
                    param.awardCount = parseInt(param.count);
                    param.type = param.awardType;
                    supriseBoxPooladdItem(param).then(res => {
                        this.getList();
                        this.$notify({
                            type: 'success',
                            message: '新增成功!'
                        });
                    })
                } else {//编辑
                    param.awardCount = parseInt(param.awardCount);
                    supriseBoxPoolupdateItem(param).then(res => {
                        this.getList();
                        this.$notify({
                            type: 'success',
                            message: '修改成功!'
                        });
                    })
                }

            },
            handlePoolDel(index, row) {//删除奖品
                this.$confirm('确认删除该奖品吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    if (!row.updateTime) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.poolItemChoose.splice(index, 1);
                        return;
                    }
                    let para = row;
                    supriseBoxPooldeleteItem(para).then(res => {
                        this.poolItemChoose.splice(index, 1);
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选奖品!'
                        });
                    })
                }).catch(() => {
                    this.listLoading = false;
                });
            }
        }
    }
</script>
