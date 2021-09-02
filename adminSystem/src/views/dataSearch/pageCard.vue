<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="UserId">
                    <el-input v-model="searchForm.userId" placeholder="用户ID" @input="userIdChange"></el-input>
                </el-form-item>

                <el-form-item label="memberId">
                    <el-select v-model="searchForm.memberId" placeholder="请选择子账户" clearable>
                        <el-option v-for="item in memberList" :key="item.memberId" :label="item.memberId"
                            :value="item.memberId"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="手机系统">
                    <el-select v-model="searchForm.platform" placeholder="请选择手机系统" clearable>
                        <el-option key="android" label="android" value="android"></el-option>
                        <el-option key="ios" label="ios" value="ios"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="app版本号">
                    <el-input v-model="searchForm.appVersion" placeholder="app版本号（1.1.1095）"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="searchData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div v-if="props.row.cardType.indexOf('air') != -1">
                        <el-table :data="props.row.dataArray" style="width: 100%">
                            <el-table-column prop="deviceTitle" label="设备名">
                            </el-table-column>
                            <el-table-column prop="deviceNickName" label="设备昵称">
                            </el-table-column>
                            <el-table-column prop="deviceModel" label="设备型号">
                            </el-table-column>
                            <el-table-column prop="mac" label="MAC">
                            </el-table-column>
                            <el-table-column prop="airQuality" label="空气质量">
                            </el-table-column>
                            <el-table-column prop="humidity" label="湿度">
                            </el-table-column>
                            <el-table-column prop="temperature" label="温度">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="props.row.cardType.indexOf('balance') != -1">
                        <el-table :data="props.row.dataArray" style="width: 100%">
                            <el-table-column prop="deviceTitle" label="设备名">
                            </el-table-column>
                            <el-table-column prop="deviceNickName" label="设备昵称">
                            </el-table-column>
                            <el-table-column prop="deviceModel" label="设备型号">
                            </el-table-column>
                            <el-table-column prop="mac" label="MAC">
                            </el-table-column>
                            <el-table-column prop="count" label="数据数量">
                                <template scope="scope">
                                    <el-button @click="viewDetail(scope.row.balanceCardSqlBeans)" type="text"
                                        size="mini">查看{{scope.row.balanceCardSqlBeans.length}}条详情
                                    </el-button>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="calorie" label="卡路里">
                                </el-table-column>
                                <el-table-column prop="duration" label="时长">
                                </el-table-column> -->
                        </el-table>
                    </div>
                    <div v-else-if="props.row.cardType.indexOf('watch_blood_oxygen_data_card') != -1">
                        <el-table :data="props.row.dataArray" style="width: 100%">
                            <el-table-column prop="deviceId" label="MAC">
                            </el-table-column>
                            <el-table-column prop="deviceModel" label="设备型号">
                            </el-table-column>
                            <el-table-column prop="deviceNickName" label="设备昵称">
                            </el-table-column>
                            <el-table-column prop="saturation" label="血氧">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="props.row.cardType.indexOf('today_data_card') != -1">
                        <el-table :data="props.row.dataArray" style="width: 100%">
                            <el-table-column prop="dataResource" label="来源">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="props.row.cardType.indexOf('skipping') != -1">
                        <el-table :data="props.row.dataArray" style="width: 100%">
                            <el-table-column prop="deviceNickName" label="设备昵称">
                            </el-table-column>
                            <el-table-column prop="deviceModel" label="设备型号">
                            </el-table-column>
                            <el-table-column prop="mac" label="MAC">
                            </el-table-column>
                            <el-table-column prop="" label="用时">
                                <template scope="scope">
                                    {{scope.row.duraMs||scope.row.duration}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="个数">
                                <template scope="scope">
                                    {{scope.row.number||scope.row.count}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="消耗">
                                <template scope="scope">
                                    {{scope.row.burn||scope.row.calorie}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="props.row.cardType.indexOf('wristball') != -1">
                        <el-table :data="props.row.dataArray" style="width: 100%">
                            <el-table-column prop="deviceTitle" label="设备名">
                            </el-table-column>
                            <el-table-column prop="deviceNickName" label="设备昵称">
                            </el-table-column>
                            <el-table-column prop="deviceModel" label="设备型号">
                            </el-table-column>
                            <el-table-column prop="mac" label="MAC">
                            </el-table-column>
                            <el-table-column prop="count" label="圈数">
                            </el-table-column>
                            <el-table-column prop="calorie" label="卡路里">
                            </el-table-column>
                            <el-table-column prop="duration" label="时长">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="props.row.cardType.indexOf('watch_data_card') != -1">
                        <el-table :data="props.row.dataArray" style="width: 100%">
                            <el-table-column prop="deviceTitle" label="设备名">
                            </el-table-column>
                            <el-table-column prop="deviceNickName" label="设备昵称">
                            </el-table-column>
                            <el-table-column prop="deviceModel" label="设备型号">
                            </el-table-column>
                            <el-table-column prop="mac" label="MAC">
                            </el-table-column>
                            <!-- <el-table-column prop="count" label="oneWatchData">
                                    <template scope="scope">
                                        <div  @click="viewDetail2(scope.row.oneWatchData)" style="color: blue;">查看更多</div>
                                        
                                    </template>
                                </el-table-column> -->
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="卡片类型" prop="cardType">
            </el-table-column>
        </el-table>

        <el-dialog title='数据详情' :visible.sync="dialogVisible" width="70%">
            <el-table :data="detailList" highlight-current-row style="width: 100%;">
                <el-table-column prop="dataId" label="ID"></el-table-column>
                <el-table-column prop="weight" label="体重"></el-table-column>
                <el-table-column prop="bmi" label="BMI"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>







    </div>
</template>

<script>
    import { cardListV2 as listItem, memberList } from '@/api/dataSearch/dataSearch'
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
                memberList: [],

                searchForm: {
                    userId: '',
                    memberId: ""
                },
                detailList: [],
                dialogVisible: false,

            }
        },
        mounted() {
            //this.getMemberList()
        },
        methods: {
            userIdChange(value) {
                if (value.length == 8) {
                    this.getMemberList()
                }
            },
            getMemberList() {
                memberList({
                    uid: this.searchForm.userId
                }).then(res => {
                    this.memberList = res.data;
                    this.loading = false
                })
            },
            searchData() {
                let para = this.searchForm;
                para.timeStamp = new Date().getTime();
                if(!para.memberId)rutrun
                listItem(para).then(res => {
                    this.list = res.data.cardList;
                    this.list.forEach(element => {
                        element.dataArray = [];
                        element.dataArray.push(element.data)
                    });
                    this.loading = false
                })
            },
            viewDetail(list) {
                this.dialogVisible = true;
                this.detailList = list;
            },








        }
    }
</script>