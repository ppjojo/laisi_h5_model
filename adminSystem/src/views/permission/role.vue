<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add">添加</el-button>
        </div>
        <el-table :data="treeData" style="width: 100%;margin-bottom: 20px;" row-key="id" border size="small"
            default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="name" label="角色名称" width="200">
                <template slot-scope="scope">
                    <svg-icon icon-class="role_classify" v-if="scope.row.type==0" />
                    <svg-icon icon-class="role_role" v-if="scope.row.type==1" />
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.type | statusFilter" size="mini">
                        {{ scope.row.type==0?"角色组":scope.row.type==1?"角色":"" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="remarks" label="备注" align="center">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <template v-if="scope.row.type==0">
                        <el-button type="text" size="mini" @click="() => btn_add(scope.row)" v-if="checkPer('add')">添加
                        </el-button>
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                        </el-button>
                        <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                            v-if="checkPer('delete')">删除
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button type="text" size="mini" @click="() => btn_permission(scope.row)"
                            v-if="checkPer('permission')">关联权限</el-button>
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                        </el-button>
                        <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                            v-if="checkPer('delete')">删除
                        </el-button>
                    </template>
                </template>

            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle+'角色'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" v-if="dialogTitle=='新增'">
                    <el-radio-group v-model="form.type">
                        <el-radio label="0">角色组</el-radio>
                        <el-radio label="1">角色</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="关联权限" :visible.sync="menuVisible" width="50%" top="25vh" append-to-body>
            <el-tree :data="menuTreeList" show-checkbox node-key="id" ref="menu" highlight-current :props="defaultProps"
                check-strictly :default-checked-keys="checkedKeys" >
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="menuVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="getCheckedKeys('menu')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, updateItem, deleteItem, addPremission } from '@/api/permission/role'
    import { menuTree } from '@/api/permission/menu'
    import { checkPermission } from '@/api/checkPermission'
    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    1: 'gray',
                    2: 'danger',
                    3: 'warning'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                filterText: "",
                treeData: [],
                treeEdit: false,
                dialogVisible: false,
                dialogTitle: "新增",
                form: {},
                rules: {
                    name: [
                        { required: true, message: '请输入角色名', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                menuVisible: false,
                menuTreeList: [],
                checkedKeys: [],
                changePermissionRoleId: "",
                defaultProps: {
                    children: 'children',
                    label: 'title'
                }
            }

        },
        computed: {
            checkPer() {
                return function (btn) {
                    return (checkPermission(this.$route.path + '/' + btn))
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                listItem().then(response => {
                    var data = [...response.data];
                    var tree = data.filter((father) => {
                        var branchArr = data.filter((child) => {
                            if (father.id == child.parentId) child._hasParent = true;
                            return father.id == child.parentId;
                        });
                        if (branchArr.length > 0) father.children = branchArr;
                        return !father._hasParent;
                    });
                    tree = tree.filter((item) => {
                        return !item._hasParent;
                    })
                    this.treeData = tree
                })
            },
            //添加
            btn_add(data) {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    parentId: data.id || -1,
                    name: "",
                    type: "0",
                    remarks: ""
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
                this.form.type = this.form.type + ""
            },
            //关联权限
            btn_permission(data) {
                this.changePermissionRoleId = data.id
                menuTree({
                    id: data.id
                }).then(response => {
                    this.menuTreeList = response
                    this.checkedKeys = []
                    var that = this
                    let getKeys = function (arr) {
                        arr.forEach(item => {
                            if (item.checked) {
                                that.checkedKeys.push(item.id)
                            }
                            if (item.children) {
                                getKeys(item.children);
                            }
                        });
                    };
                    getKeys(response);

                })
                this.menuVisible = true
            },
            getCheckedKeys(refsName) {
                var ids = this.$refs[refsName].getCheckedKeys()
                this.$confirm('此操作将会修改角色的权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    addPremission({
                        roleId: this.changePermissionRoleId,
                        ids: ids.join(",")
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功修改所选角色的关联权限!'
                        });
                        this.menuVisible = false
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消修改权限操作',
                        type: 'info'
                    });
                });


            },
            //删除
            btn_delete(data) {
                this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        id: data.id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选角色!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除角色操作',
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
                                    message: '成功新增' + this.form.name
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功编辑' + this.form.name
                                });
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            nodeClick(node, status) {
                // console.log(node)
                // var that = this
                // let getKeys = function (arr) {
                //     arr.forEach(item => {
                //         if (status) {
                //             that.checkedKeys.push(item.id)
                //         } else {
                //             let index = that.checkedKeys.indexOf(item.id);
                //             if (index != -1)
                //             that.checkedKeys.splice(index, 1);
                //         }
                //         if (item.children) {
                //             getKeys(item.children);
                //         }
                //     });
                // };
                // getKeys(node.children);
                // console.log(that.checkedKeys)

            }
        }
    }
</script>