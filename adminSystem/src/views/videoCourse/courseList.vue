<template>
    <div class="app-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="大课程" name="big">
                <div class="container-search">
                    <el-form :inline="true" :model="searchForm">
                        <el-form-item label="课程分类">
                            <el-select v-model="searchForm.classCatalog" clearable>
                                <el-option v-for="item in catalogList" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="success" @click="bgetList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="container-edit">
                    <el-button type="primary" size="mini" @click="btn_add_big" v-if="checkPer('add')">添加大课程</el-button>
                </div>
                <el-table v-loading="blistLoading" :data="blist" element-loading-text="Loading" border fit
                    highlight-current-row size="small ">
                    <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
                    <el-table-column align="center" prop="className" label="课程名">
                    </el-table-column>
                    <el-table-column align="center" label="封面图">
                        <template scope="scope">
                            <img :src="scope.row.classCover" width="120px">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="classGrade" label="强度">
                        <template scope="scope">
                            {{scope.row.classGrade | filtersLevel }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态" width="110">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status | statusFilter" size="mini">
                                {{ scope.row.status==1?"已上架":"下架" }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="classCatalogName" label="课程分类">
                    </el-table-column>

                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button @click="btn_edit_big(scope.row)" type="text" size="mini" v-if="checkPer('edit')">
                                编辑
                            </el-button>
                            <el-button @click=" btn_delete_big(scope.row.id)" type="text" style="color:#f78989;"
                                size="mini" v-if="checkPer('delete')">删除
                            </el-button>
                            <el-button @click="btn_edit_bigSmall(scope.row)" type="text" style="color:#67C23A;"
                                size="mini" v-if="checkPer('addSmall')">
                                添加小课程
                            </el-button>
                            <el-button @click="btn_add_hot(scope.row)" type="text" style="color:#67C23A;" size="mini"
                                v-if="checkPer('addHot')">
                                添加热门
                            </el-button>
                            <el-button @click="btn_view_comment(scope.row)" type="text" style="color:#67C23A;"
                                size="mini" v-if="checkPer('view')">
                                查看评论
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <pagination :pageTotal="btotal" @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange">
                </pagination> -->

            </el-tab-pane>
            <el-tab-pane label="小课程" name="small">
                <div class="container-edit">
                    <el-button type="primary" size="mini" @click="btn_add_small" v-if="checkPer('add')">添加小课程
                    </el-button>
                </div>
                <el-table v-loading="slistLoading" :data="slist" element-loading-text="Loading" border fit
                    highlight-current-row size="small ">
                    <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
                    <el-table-column align="center" prop="className" label="小课程名">
                    </el-table-column>
                    <el-table-column align="center" label="封面图">
                        <template scope="scope">
                            <img :src="scope.row.classCover" width="120px">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="classGrade" label="强度">
                        <template scope="scope">
                            {{scope.row.classGrade | filtersLevel }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="duration" label="时长">
                        <template scope="scope">
                            {{scope.row.duration | filtersduration }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="适用性别">
                        <template scope="scope">
                            {{scope.row.sex==1?"男":"女" }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="calory" label="消耗(kcal)">
                        <template scope="scope">
                            {{scope.row.calory/1000 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            </el-button>
                            <el-button @click=" btn_edit_small(scope.row)" type="text" size="mini"
                                v-if="checkPer('edit')">
                                编辑
                            </el-button>
                            <el-button @click=" btn_delete_small(scope.row.id)" type="text" style="color:#f78989;"
                                size="mini" v-if="checkPer('delete')">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <pagination :pageTotal="ctotal" @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange">
                </pagination> -->

            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="dialogTitle+'大课程'" :visible.sync="bdialogVisible" width="50%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="bform">
                <el-form-item label="课程名称" prop="className">
                    <el-input v-model.trim="form.className"></el-input>
                </el-form-item>
                <el-form-item label="课程封面" prop="classCover">
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.classCover" :src="form.classCover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="课程强度" prop="classGrade">
                    <el-select v-model="form.classGrade" clearable>
                        <el-option v-for="item in courseLevelList" :key="item.value" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程分类" prop="classCatalog">
                    <el-select v-model="form.classCatalog" clearable>
                        <el-option v-for="item in catalogList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支持设备" prop="supportDevice">
                    <el-select v-model="form.supportDevice" clearable>
                        <el-option v-for="item in deviceList" :key="item.value" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程状态">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0" inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="是否七日计划">
                    <el-switch v-model="form.sevenStatus" :active-value="1" :inactive-value="0" inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="七日计划分类"  v-if="form.sevenStatus">
                    <el-select v-model="form.classType">
                        <el-option  label="体能提升" :value="1"></el-option>
                         <el-option  label="减脂" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="课程简介" prop="classDes">
                    <el-input v-model.trim="form.classDes" placeholder='请输入课程简介' clearable type="textarea"
                        :autosize="{ minRows: 2}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" width="60">
                <el-button size="mini" @click="bdialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="b_submitForm('bform')">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog :title="dialogTitle+'小课程'" :visible.sync="sdialogVisible" width="50%" v-loading="vedioloading">
            <el-form :model="form" label-width="100px" :rules="rules" ref="sform">
                <el-form-item label="课程上传" prop="classVod">
                    <el-input v-model="form.classVod" @change="classVodChange"></el-input>
                    <el-upload ref='upload' action="" :http-request="requestFile_video" accept="video/*"
                        :show-file-list="false">
                        <el-button size="small" type="primary">上传视频</el-button>
                    </el-upload>
                    <el-button size="small" type="primary" v-if="form.classVod" @click="goPlayer()">查看视频
                    </el-button>
                </el-form-item>
                <el-form-item label="课程名" prop="className">
                    <el-input v-model="form.className"></el-input>
                </el-form-item>
                <el-form-item label="时长" prop="duration">
                    <el-input v-model="form.duration">
                        <template slot="append">秒</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="课程封面" prop="classCover">
                    <el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
                        class="avatar-uploader">
                        <img v-if="form.classCover" :src="form.classCover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="课程强度" prop="classGrade">
                    <el-select v-model="form.classGrade" clearable>
                        <el-option v-for="item in courseLevelList" :key="item.value" :label="item.name"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="适用性别" prop="sex">
                    <el-select v-model="form.sex" clearable>
                        <el-option key="男" label="男" :value=1></el-option>
                        <el-option key="女" label="女" :value=0></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消耗" prop="caloryShow">
                    <el-input v-model.trim="form.caloryShow">
                        <template slot="append">千卡</template>
                    </el-input>
                </el-form-item>
                <el-divider content-position="left">如果是七日训练计划，下面需要填写</el-divider>
                <el-form-item label="小课程排序" >
                    <el-input v-model="form.smallClassDay"></el-input>
                </el-form-item>
                <el-form-item label="小课程有效时长(秒)" >
                    <el-input v-model="form.smallUsefulDuration" type="num"></el-input>
                </el-form-item>
                <el-form-item label="小课程简介">
                    <el-input v-model.trim="form.smallClassDes" placeholder='请输入课程简介' clearable type="textarea" :autosize="{ minRows: 2}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" width="60">
                <el-button size="mini" @click="sdialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="s_submitForm('sform')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title='视频预览' :visible.sync="playShow" @close="closeDialog" width="50%">
            <div class="prism-player" id="J_prismPlayer"></div>
        </el-dialog>

        <el-dialog :title="dialogTitle+' 下的小课程'" :visible.sync="bsdialogVisible" width="50%">
            <div class="container-edit">
                <el-button type="primary" size="mini" @click="bs_submitForm" v-if="checkPer('addSmall')">添加所选中的小课程到大课程
                </el-button>
            </div>
            <el-table v-loading="slistLoading" :data="slist" element-loading-text="Loading" border fit
                ref="multipleTable" highlight-current-row size="small " @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
                <el-table-column align="center" prop="className" label="小课程名">
                </el-table-column>
                <el-table-column align="center" label="封面图">
                    <template scope="scope">
                        <img :src="scope.row.classCover" width="120px">
                    </template>
                </el-table-column>
                <el-table-column align="center" label="适用性别">
                    <template scope="scope">
                        {{scope.row.sex==1?"男":"女" }}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog :title="dialogTitle+'的评论'" :visible.sync="commentdialogVisible" width="70%">
            <el-table v-loading="commentlistLoading" :data="commentList" element-loading-text="Loading" border fit
                highlight-current-row size="small ">
                <el-table-column align="center" prop="id" label="ID" width="65"></el-table-column>
                <el-table-column align="center" prop="uid" label="评论userId">
                </el-table-column>
                <el-table-column align="center" label="头像">
                    <template scope="scope">
                        <img :src="scope.row.headPictureUrl" width="70px">
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="评论时间">
                </el-table-column>
                <el-table-column prop="comment" label="评论内容">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button @click=" btn_delete_comment(scope.row)" type="text" style="color:#f78989;"
                            size="mini" v-if="checkPer('view')">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageTotal="commentTotal" @handleCurrentChange="commentCurrentChange"
                @handleSizeChange="commentSizeChange">
            </pagination>
        </el-dialog>




    </div>
</template>

<script>
    import { bListItem, bAddItem, bUpdateItem, bDeleteItem, queryAllSmallByBigId, saveSmallToBig, updateSmallToBig, deleteComment, listComment } from '@/api/videoCourse/course'
    import { sListItem, sAddItem, sUpdateItem, sDeleteItem } from '@/api/videoCourse/course'
    import { videoUpload, getPlayAuth } from '@/api/videoCourse/course'
    import { addHotItem } from '@/api/videoCourse/hotCourse'
    import { catalogListItem } from '@/api/videoCourse/course'
    import { checkPermission } from '@/api/checkPermission'
    import { fileUpload } from '@/utils/fileUpload'
    import Pagination from "@/components/pagination";

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

                blist: [],
                blistLoading: false,
                bpage: 0,
                bpageSize: 10,
                btotal: 0,

                form: {},
                searchForm: {},

                activeName: 'big',
                //分类
                catalogList: [],
                dialogTitle: "新增",
                bdialogVisible: false,
                sdialogVisible: false,

                rules: {
                    className: [
                        { required: true, message: '请输入课程名称', trigger: 'blur' },
                        // { min: 1, max: 16, message: '比赛名称在16字以内', trigger: 'blur' }
                    ],
                    classCover: [
                        { required: true, message: '请上传课程封面', trigger: 'blur' },
                    ],
                    classDes: [
                        { required: true, message: '请输入课程简介', trigger: 'blur' },
                        // { min: 1, max: 16, message: '比赛名称在16字以内', trigger: 'blur' }
                    ],
                    classCatalog: [
                        { required: true, message: '请选择课程分类', trigger: 'change' },
                    ],
                    classGrade: [
                        { required: true, message: '请选择课程等级', trigger: 'change' },
                    ],
                    duration: [
                        { required: true, message: '请输入课程时长', trigger: 'change' },
                    ],
                    sex: [
                        { required: true, message: '请选择适用性别', trigger: 'change' },
                    ],
                    classVod: [
                        { required: true, message: '请先上传视频', trigger: 'change' },
                    ],
                },
                //课程等级选择列表
                courseLevelList: [
                    { name: '低强度', value: 1 },
                    { name: '中低强度', value: 2 },
                    { name: '中强度', value: 3 },
                    { name: '中高强度', value: 4 },
                    { name: '高强度', value: 5 },
                ],
                //支持设备选择列表 （
                deviceList: [
                    { name: '手表', value: 1 },
                    { name: '跳绳', value: 2 }
                ],

                vedioloading: false,
                playShow: false,

                bsdialogVisible: false,
                multipleSelection: [],

                commentdialogVisible: false,
                commentlistLoading: true,
                commentList: [],
                commentTotal: 0,
                commentPage: 1,
                commentpageSize: 10,
            }
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
            filtersDevice: function (value) {
                if (value == 1) {
                    return '手表'
                } else if (value == 2) {
                    return '跳绳'
                } else {
                    return ''
                }
            },

            filtersLevel: function (value) {
                let name = value
                if (value == 1) {
                    name = '低强度'
                } else if (value == 2) {
                    name = '中低强度'
                } else if (value == 3) {
                    name = '中强度'
                } else if (value == 4) {
                    name = '中高强度'
                } else if (value == 5) {
                    name = '高强度'
                }
                return name
            },
            filtersduration: function (s) {
                if (!s) return '';
                var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
                var hour = Math.floor((s - day * 24 * 3600) / 3600);
                var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
                var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
                if (day > 0) {
                    return day + "天" + hour + "小时" + minute + "分" + second + "秒";
                } else if (hour > 0) {
                    //return  hour + "小时" + minute + "分" + second + "秒"; 
                    return (hour * 60 + minute) + "分" + second + "秒";
                } else if (minute > 0) {
                    return minute + "分" + second + "秒";
                } else {
                    return second + "秒";
                }
            },

        },
        mounted() {
            this.getCatalogList()
            this.sgetList()

        },
        methods: {
            //获取分类
            getCatalogList() {
                catalogListItem({}).then(res => {
                    this.catalogList = res.data
                    this.bgetList()
                })
            },
            //获取大课程
            bgetList() {
                this.blistLoading = true
                bListItem(this.searchForm).then(res => {
                    this.blist = res.data;
                    this.blist.map(item => {
                        this.catalogList.forEach(citem => {
                            if (item.classCatalog == citem.id) {
                                item.classCatalogName = citem.name
                            }
                        })
                    })

                    // this.btotal = res.data.count;
                    this.blistLoading = false
                })
            },
            //获取小课程
            sgetList() {
                this.slistLoading = true
                sListItem({}).then(res => {
                    this.slist = res.data;
                    this.stotal = res.data.count;
                    this.slistLoading = false
                })
            },
            //保存
            b_submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.bdialogVisible = false
                        if (this.dialogTitle == "新增") {
                            bAddItem(this.form).then(response => {
                                this.bgetList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.className
                                });
                            })
                        } else {
                            bUpdateItem(this.form).then(response => {
                                this.bgetList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.className
                                });
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            s_submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.sdialogVisible = false
                        if (this.dialogTitle == "新增") {
                            var classGradeNum = 0;
                            var durationNum = this.form.duration
                            var sexNum = 0
                            var caloryNum = 0
                            if (this.form.sex == 0) {
                                sexNum = 50
                                if (this.form.classGrade == 1) {
                                    classGradeNum = 1.5
                                } else if (this.form.classGrade == 2) {
                                    classGradeNum = 3
                                } else if (this.form.classGrade == 3) {
                                    classGradeNum = 4.5
                                } else if (this.form.classGrade == 4) {
                                    classGradeNum = 6
                                } else if (this.form.classGrade == 5) {
                                    classGradeNum = 7.5
                                }
                            } else if (this.form.sex == 1) {
                                sexNum = 65
                                if (this.form.classGrade == 1) {
                                    classGradeNum = 2
                                } else if (this.form.classGrade == 2) {
                                    classGradeNum = 4
                                } else if (this.form.classGrade == 3) {
                                    classGradeNum = 6
                                } else if (this.form.classGrade == 4) {
                                    classGradeNum = 8
                                } else if (this.form.classGrade == 5) {
                                    classGradeNum = 9
                                }
                            }
                            caloryNum = classGradeNum * 0.0167 * sexNum * durationNum / 60
                            this.form.caloryShow = caloryNum.toFixed(1)
                            this.form.calory = caloryNum.toFixed(1) * 1000//*1000是为了数据库的保存
                            sAddItem(this.form).then(response => {
                                this.sgetList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.className
                                });
                            })
                        } else {
                            this.form.calory = this.form.caloryShow * 1000//*1000是为了数据库的保存
                            sUpdateItem(this.form).then(response => {
                                this.sgetList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改' + this.form.className
                                });
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //删除
            btn_delete_big(id) {
                this.$confirm('此操作将永久删除大课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bDeleteItem({
                        id: id,
                    }).then(response => {
                        this.bgetList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选大课程!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除大课程操作',
                        type: 'info'
                    });
                });
            },
            btn_delete_small(id) {
                this.$confirm('此操作将永久删除小课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sDeleteItem({
                        id: id,
                    }).then(response => {
                        this.sgetList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选小课程!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除小课程操作',
                        type: 'info'
                    });
                });
            },
            //添加
            btn_add_big() {
                this.bdialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    className: null, //课程名称：不可重复
                    classCover: null, //课程封面
                    classGrade: 1, //课程等级： 初级（默认）、中级、高级
                    classCatalog: null, // 课程分类： 跳绳、健身、燃脂、跑步等
                    supportDevice: 1, //支持设备：手表、跳绳等
                    classDes: null, //课程简介  （大课程）
                    status: 0,
                }
            },
            btn_add_small() {
                this.sdialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    className: null, //课程名称：不可重复
                    classCover: null, //课程封面
                    classGrade: 1, //课程等级： 初级（默认）、中级、高级
                    classCatalog: null, // 课程分类： 跳绳、健身、燃脂、跑步等
                    supportDevice: 1, //支持设备：手表、跳绳等
                    duration: 0,  //时长（分钟） （小课程）
                    calory: 0, //消耗（千卡） （小课程）
                    classVod: null, //课程上传（上传视频） （小课程）
                    status: 0,
                }
            },
            //编辑
            btn_edit_big(row) {
                this.bdialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            btn_edit_small(row) {
                this.sdialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
                this.$set(this.form, "caloryShow", this.form.calory / 1000)

            },
            //上传
            requestFile(param) {
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    if (res.code == 0) {
                        this.form.classCover = res.data.url;
                    }
                })
            },
            requestFile_video(param) {
                this.vedioloading = true
                var fileForm = new FormData()
                fileForm.append('file', param.file)
                fileUpload(fileForm).then(res => {
                    this.vedioloading = false
                    if (res.code == 0) {
                        this.form.classVod = data.videoId;
                    }
                })
            },
            //视频id添加进来需要去获取视频图片
            classVodChange(str) {
                getPlayAuth({
                    videoId: str
                }).then(res => {
                    if (res.code == 0) {
                        this.$set(this.form, 'classCover', res.data.videoMeta.coverURL)
                        this.$set(this.form, 'duration', Math.round(res.data.videoMeta.duration))
                        this.$set(this.form, 'className', res.data.videoMeta.title.split('.')[0])
                    } else {
                        this.$message({
                            showClose: true,
                            message: '视频ID不正确',
                            type: 'error'
                        });
                    }

                })
            },
            //获取视频播放凭证
            goPlayer() {
                this.playShow = true
                getPlayAuth({
                    videoId: this.form.classVod,
                }).then(res => {
                    if (res.code == 0) {
                        this.playShow = true
                        this.player = new Aliplayer({
                            id: 'J_prismPlayer',
                            width: '100%',
                            autoplay: true,
                            vid: this.form.classVod,
                            playauth: res.data.playAuth,
                            cover: res.data.videoMeta.coverURL,
                            encryptType: 1,
                        }, function (player) {
                            console.log('播放器创建好了。')
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }

                })

            },
            //视频关闭
            closeDialog() {
                this.player.dispose()
            },
            //添加小课程
            btn_edit_bigSmall(row) {
                this.bsdialogVisible = true;
                queryAllSmallByBigId({
                    id: row.id,
                    userId: 10000000
                }).then(res => {
                    this.form = res.data.bigClass
                    this.slist.forEach(item => {
                        this.$refs.multipleTable.toggleRowSelection(item, false)
                        res.data.smallClass.forEach(row => {
                            if (item.id == row.id) {
                                this.$refs.multipleTable.toggleRowSelection(item, true);
                            }
                        });

                    })
                    if (res.data.smallClass.length > 0) {
                        this.dialogTitle = "编辑 "+this.form.className
                    } else {
                        this.dialogTitle = "新增 "+this.form.className
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            bs_submitForm() {
                var ids = [];
                this.multipleSelection.forEach(item => {
                    ids.push({ id: item.id });
                });
                this.$confirm('此操作将添加选中的小课程到大课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.dialogTitle == "新增") {
                        this.bsdialogVisible = false
                        saveSmallToBig(ids, {
                            cBigClassId: this.form.id,
                        }).then(response => {
                            this.$notify({
                                type: 'success',
                                message: '成功给大课程添加了小课程!'
                            });
                        })
                    } else {
                        this.bsdialogVisible = false
                        updateSmallToBig(ids, {
                            cBigClassId: this.form.id,
                        }).then(response => {
                            this.$notify({
                                type: 'success',
                                message: '成功修改大课程下的小课程!'
                            });
                        })
                    }
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除添加小课程操作',
                        type: 'info'
                    });
                });
            },
            //评论
            btn_view_comment(row) {
                this.form = row
                this.commentdialogVisible = true;
                this.getCommentList()
            },
            getCommentList() {
                this.commentlistLoading = true
                listComment({
                    bigClassId: this.form.id,
                    pageNum: this.commentPage,
                    pageSize: this.commentpageSize
                }).then(res => {
                    this.commentlistLoading = false
                    this.commentList = res.data.list;
                    this.commentTotal = res.data.total;
                    this.commentList.map(item => {
                        if (item.user) {
                            item.nickname = item.user.nickname;
                            item.headPictureUrl = item.user.headPictureUrl;
                        }
                        item.createTime = item.createTime.split("T")[0]
                        //item.createTime = item.createTime.split(".")[0].replace("T", " ");
                    });

                })
            },
            commentCurrentChange(val) {
                this.commentPage = val;
                this.getCommentList()
            },
            commentSizeChange(val) {
                this.commentpageSize = val;
                this.getCommentList()
            },
            btn_delete_comment(item) {
                this.$confirm('此操作将永久删除评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteComment({
                        id: item.id,
                        uid:item.uid,
                        bigClassId:item.bigClassId
                    }).then(response => {
                        this.getCommentList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选评论!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除评论操作',
                        type: 'info'
                    });
                });
            },
            //添加热门
            btn_add_hot(row) {
                this.$confirm('此操作将添加课程到热门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    addHotItem({
                        bigClassId: row.id,
                        hotCover: row.classCover,
                        orderNum: 1,
                        status: 0
                    }).then(res => {
                        this.$notify({
                            message: '成功添加所选课程到热门区，请去查看操作',
                            type: 'success'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消操作',
                        type: 'info'
                    });
                });

            },
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 100px;
        display: block;
    }
</style>