<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="俱乐部ID">
                    <el-input v-model="searchForm.clubId" clearable placeholder="俱乐部ID"></el-input>
                </el-form-item>
                <el-form-item label="俱乐部名称">
                    <el-input v-model="searchForm.name" clearable placeholder="俱乐部名称"></el-input>
                </el-form-item>
                <el-form-item label="成员ID">
                    <el-input v-model="searchForm.memberId" clearable placeholder="成员ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="searchData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small ">
            <el-table-column align="center" prop="id" label="ID" width="90"></el-table-column>
            <el-table-column align="center" prop="photo" label="照片">
                <template scope="scope">
                    <img :src="scope.row.photo" style="width: 50px;height: 50px;" alt="">
                </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="俱乐部名称">
            </el-table-column>
            <el-table-column align="center" prop="memberNum" label="成员数量">
            </el-table-column>
            <el-table-column align="center" prop="creator" label="创建者">
            </el-table-column>
            <el-table-column align="center" prop="isPublic" label="公开状态">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isPublic | statusFilter" size="mini">{{ scope.row.isPublic=='N'?"不公开":"公开" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="location" label="位置">
                <template scope="scope">
                    {{scope.row.province+scope.row.city+scope.row.county}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('view')">查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>


        <!--新增和编辑界面-->
        <el-dialog title="俱乐部详情" :visible.sync="dialogVisible" width="50%">
            <el-form :model="clubItem" label-width="120px" ref="clubItem">
                <el-form-item label="俱乐部照片:">
                    <div><img :src="clubItem.photo" style="width: 100px;height: 100px;" alt=""></div>
                </el-form-item>
                <el-form-item label="俱乐部名称:">
                    <div>{{clubItem.name}}</div>
                </el-form-item>
                <el-form-item label="俱乐部简介:">
                    <div>{{clubItem.introduce}}</div>
                </el-form-item>
                <el-form-item label="标签:">
                    <div>{{clubItem.label=="00"?"跳绳":""}}</div>
                </el-form-item>
                <el-form-item label="是否公开:">
                    <div>{{clubItem.isPublic=="N"?"公开":"不公开"}}</div>
                </el-form-item>
                <el-form-item label="位置:">
                    <div>{{clubItem.province||""+clubItem.city+clubItem.county}}</div>
                </el-form-item>
                <el-form-item label="成员数量:">
                    <div>{{clubItem.memberNumber}}</div>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">成员列表</el-divider>
            <div>
                <el-button type="primary" @click="clubExportClick(clubItem.id)"  v-if="checkPer('export')">导出成员运动数据</el-button>
            </div>
            <el-table :data="memberList" highlight-current-row height="300" style="width: 100%;">
                <el-table-column prop="memberId" label="用户ID"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="headPictureUrl" label="头像">
                    <template scope="scope">
                        <img :src="scope.row.headPictureUrl" style="width: 40px;height: 40px;" alt="">
                    </template>
                </el-table-column>
            </el-table>
            <el-divider content-position="left">今日运动</el-divider>
            <el-table :data="todaySportList" highlight-current-row height="300" style="width: 100%;">
                <el-table-column prop="memberId" label="用户ID"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="ropeNum" label="个数"></el-table-column>
            </el-table>
           
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, searchListItem, viewItem, todaySport, clubExport } from '@/api/afterSale/club'
    import { checkPermission } from '@/api/checkPermission'
    import Pagination from "@/components/pagination";
    function timestampTodate2(date, type) {
        if (date) {
            var newdate = new Date(date)

            var year = newdate.getFullYear();
            var day = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
            var month = newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1;

            if (type == '-') {
                return year + '-' + month + '-' + day;
            } else if (type == 'M/D') {
                return newdate.getMonth() + 1 + '月' + newdate.getDate() + '日';
            } else {
                return year + '/' + month + '/' + day;
            }

        }
    }

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    "Y": 'success',
                    // 1: 'gray',
                    "N": 'danger'
                }
                return statusMap[status]
            }
        },
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
                searchForm: {
                    memberId: "",
                    name: "",
                    clubId: ""
                },

                list: [],
                page: 1,
                total: 0,

                listLoading: false,

                clubItem: {},
                dialogVisible: false,
                todaySportList: [],
                memberList: [],

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                listItem({
                    page: this.page,
                    pageSize: 10,
                }).then(res => {
                    this.list = res.data.clubList
                    this.total=res.data.totalNum
                    this.loading = false
                })
            },
            searchData() {
                this.page = 1;
                let para = this.searchForm;
                if (para.clubId == "" && para.name == "" && para.memberId == "") {
                    this.page = 1;
                    this.getList();
                    return
                }
                para.pageSize = 9999
                searchListItem(para).then(res => {
                    this.loading = false;
                    this.list = res.data;
                })
            },
            // 上下分页
            handleCurrentChange(val) {
                this.page = val;
                this.getList()
            },
            // 每页显示多少条
            handleSizeChange(val) {
                this.limit = val;
                this.getList()
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                viewItem({
                    clubId: row.id
                }).then(res => {
                    this.clubItem = res.data;
                    this.dialogVisible = true;
                })


                todaySport({
                    clubId: row.id,
                    page: 1,
                    pageSize: 9999,
                    date: timestampTodate2(new Date().getTime(), "-")
                }).then(res => {
                    this.todaySportList = res.data.sportList
                    this.memberList = res.data.memberList
                })

            },
            clubExportClick(id) {
                window.open(process.env.VUE_APP_BASE_API + "club/excel/export?clubId=" + id)
            }

        }
    }
</script>