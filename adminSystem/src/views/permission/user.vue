<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="用户名">
                    <el-input v-model="searchForm.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchForm.tel"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add" v-if="checkPer('add')">添加</el-button>
            <el-button type="danger" size="mini" @click="btn_delete" v-if="checkPer('delete')">删除</el-button>
        </div>
        <el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
            size="small " @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column align="center" prop="id" label="ID" width="65">
            </el-table-column>
            <el-table-column align="center" prop="username" label="用户名">
            </el-table-column>
            <el-table-column align="center" prop="realname" label="真实姓名">
            </el-table-column>
            <el-table-column align="center" prop="dname" label="部门">
            </el-table-column>
            <el-table-column align="center" prop="sex" label="性别">
            </el-table-column>
            <el-table-column align="center" prop="tel" label="手机号">
            </el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"正常":"禁用" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                    </el-button>
                    <el-button @click=" deleteItem(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
        </pagination>

        <el-dialog :title="dialogTitle+'用户'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入管理账号的名称"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="form.realname"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <div @click="chooseDept()">
                        <el-input v-model="form.dname"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="角色">
                    <div @click="chooseRole()">
                        <el-input v-model="form.roleName"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机" prop="tel">
                    <el-input  v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <!-- <el-form-item label="密码" v-if="JSON.parse(getUInfo()).deptId==77">
                    <el-input v-model="form.password" ></el-input>
                </el-form-item> -->
                <el-form-item label="账号状态">
                    <el-switch v-model="form.status" :active-value="0" :inactive-value="1" inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="选择部门" :visible.sync="deptVisible" width="50%" top="25vh" append-to-body>
            <el-tree :data="deptTreeList" show-checkbox default-expand-all node-key="id" ref="dept" highlight-current
                :check-strictly=true :props="defaultProps" @check-change="deptTreeClick"
                :default-checked-keys="deptCheckedKeys">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="deptVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="getCheckedKeys('dept')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="选择角色" :visible.sync="roleVisible" width="50%" top="25vh" append-to-body>
            <el-tree :data="roleTreeList" show-checkbox default-expand-all node-key="id" ref="role" highlight-current
                :props="defaultProps" :default-checked-keys="roleCheckedKeys">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="roleVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="getCheckedKeys('role')">确 定</el-button>
            </span>
        </el-dialog>
    </div>



</template>
<script>
    import Pagination from "@/components/pagination";
    import { listItem, addItem, updateItem, deleteItem, userRoleByUserId } from '@/api/permission/user'
    import { deptTree } from '@/api/permission/department'
    import { roleTree } from '@/api/permission/role'
    import { getUInfo } from '@/utils/auth'
     import {
    checkPermission
  } from '@/api/checkPermission'
    export default {
        components: {
            Pagination
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    // 1: 'gray',
                    1: 'danger'
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
                searchForm: {},
                list: [],
                loading: true,
                page: 1,
                limit: 10,
                total: 0,
                multipleSelection: [],
                dialogVisible: false,
                dialogTitle: "新增",
                form: {
                    password:""
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    tel: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                },

                roleVisible: false,
                deptVisible: false,
                deptTreeList: [],
                roleTreeList: [],
                roleCheckedKeys: [],
                deptCheckedKeys: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getUInfo:getUInfo,
            getList() {
                this.loading = true
                var data = Object.assign({
                    page: this.page,
                    limit: this.limit
                }, this.searchForm)
                listItem(data).then(response => {
                    this.list = response.data
                    this.total = response.count
                    this.loading = false
                })
            },
            chooseDept() {
                deptTree().then(response => {
                    this.deptTreeList = []
                    var data = [...response];
                    this.deptTreeList = data.filter(item => {
                        return item.parentId == -1
                    })
                })
                this.deptVisible = true
            },
            chooseRole() {
                roleTree().then(response => {
                    this.roleTreeList = []
                    var data = [...response];
                    this.roleTreeList = data.filter(item => {
                        return item.parentId == -1
                    })
                })
                this.roleVisible = true
            },
            deptTreeClick(data, checked, node) {
                if (checked) {
                    this.$refs['dept'].setCheckedNodes([data]);
                }
            },
            getCheckedKeys(refsName) {
                var ids = this.$refs[refsName].getCheckedKeys()
                var namesArray = this.$refs[refsName].getCheckedNodes()
                var names = []
                namesArray.forEach(item => {
                    names.push(item.title)
                })
                if (refsName == "dept") {
                    this.form.deptId = ids.join(",")
                    this.form.dname = names.join(",")
                    this.deptVisible = false

                } else {
                    this.form.roleList = ids
                    this.form.roleId = ids.join(",")
                    this.form.roleName = names.join(",")
                    this.roleVisible = false
                }

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
            //选择框
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //添加
            btn_add() {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    deptId: "",
                    dname: "",
                    email: "",
                    jobTitle: "",
                    realname: "",
                    roleId: "",
                    roleList: [],
                    roleName: "",
                    sex: "男",
                    sort: "",
                    status: 0,
                    tel: "",
                    username: "",
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
                this.deptCheckedKeys=[];
                this.roleCheckedKeys=[];
                this.deptCheckedKeys.push(row.deptId)
                userRoleByUserId({
                    userId: row.id
                }).then(response => {
                    var namesArray = []
                    var ids=[]
                    response.data.forEach(item => {
                        this.roleCheckedKeys.push(item.roleId)
                        namesArray.push(item.name)
                        ids.push(item.roleId)
                    })
                    this.form.roleList = ids
                    this.form.roleId = ids.join(",")
                    this.form.roleName = namesArray.join(',')
                })

            },
            //删除
            btn_delete() {
                if (this.multipleSelection.length < 1) return;
                let ids = [];
                this.multipleSelection.forEach(element => {
                    ids.push(element.id)
                });
                this.deleteItem(ids.join(","))
            },
            deleteItem(ids) {
                this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        ids: ids,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选用户!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除用户操作',
                        type: 'info'
                    });
                });
            },
            //表单提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.dialogTitle == '新增') {
                            addItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增' + this.form.username + '用户!'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功编辑' + this.form.username + '用户!'
                                });
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置表单验证
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>

<style lang="scss" scoped>
    .pagination {
        text-align: left;
        margin-top: 10px;
    }
</style>