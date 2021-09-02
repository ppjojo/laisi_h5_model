<template>
    <div class="app-container">
        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>

        <el-table :data="treeData" style="width: 100%;margin-bottom: 20px;" row-key="id" border size="small"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="name" label="菜单名称" width="200">
                <template slot-scope="scope">
                    <svg-icon icon-class="menu_list" v-if="scope.row.type==0" />
                    <svg-icon icon-class="menu_menu" v-if="scope.row.type==1" />
                    <svg-icon icon-class="menu_btn" v-if="scope.row.type==2" />
                    <svg-icon icon-class="menu_navigation" v-if="scope.row.type==3" />
                    <svg-icon icon-class="menu_child" v-if="scope.row.type==4" />
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.type | statusFilter" size="mini">
                        {{ scope.row.type==0?"目录":scope.row.type==1?"菜单":scope.row.type==2?"按钮":scope.row.type==3?"导航菜单":"子菜单" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="URL" align="center">
            </el-table-column>
            <el-table-column prop="permission" label="权限标识" align="center">
            </el-table-column>
            <el-table-column prop="sort" label="排序" align="center">
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <template v-if="scope.row.type==0||scope.row.type==1||scope.row.type==4">
                        <el-button type="text" size="mini" @click="() => btn_add(scope.row)" v-if="checkPer('add')">添加
                        </el-button>
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                        </el-button>
                        <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                            v-if="checkPer('delete')">删除
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
                        </el-button>
                        <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
                            v-if="checkPer('delete')">删除
                        </el-button>
                    </template>
                </template>

            </el-table-column>
        </el-table>


        <el-dialog :title="dialogTitle+'菜单'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" @change="menuNameChange"></el-input>
                </el-form-item>
                <el-form-item label="URL" >
                    <el-input v-model="form.url" @change="menuNameChange"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="permission">
                    <el-input v-model="form.permission"></el-input>
                </el-form-item>
                <el-form-item label="排序号">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio-group v-model="form.type">
                        <el-radio label="0" v-if="form.parentId==-1">目录</el-radio>
                        <el-radio label="1" v-if="form.parentId!=-1&&form.type==1">菜单</el-radio>

                        <el-radio label="4" v-if="form.parentId!=-1">子菜单</el-radio>
                        <el-radio label="2" v-if="form.parentId!=-1">按钮</el-radio>
                        <!-- <el-radio label="3" v-if="form.parentId==-1">导航菜单</el-radio> -->
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, updateItem, deleteItem } from '@/api/permission/menu'
    import { checkPermission } from '@/api/checkPermission'
    let id = 1000;
    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    0: 'gray',//目录
                    1: 'success',//菜单
                    2: 'danger',//按钮
                    3: 'warning',
                    4: 'info'//子菜单
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
                        { required: true, message: '请输入菜单名', trigger: 'blur' },
                    ],
                    permission: [
                        { required: true, message: '请输入权限标识', trigger: 'blur' },
                    ],
                }
            }

        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        },
        computed: {
            checkPer() {
                return function (btn) {
                    return (checkPermission(this.$route.path + '/' + btn))
                }
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
                if (data) {
                    this.form = {
                        parentId: data.id,
                        name: "",
                        type: data.type + 1,
                        url: data.url + "/",
                        sort: "",
                        permission: data.permission + ":"
                    }
                    this.form.type = this.form.type + ""

                } else {
                    this.form = {
                        parentId: -1,
                        name: "",
                        type: "0",
                        url: "",
                        sort: "",
                        permission: ""
                    }
                }

            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
                this.form.type = this.form.type + ""
            },
            //删除
            btn_delete(data) {
                this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {
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
                            message: '成功删除所选菜单!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除菜单操作',
                        type: 'info'
                    });
                });
            },
            //表单提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                        if (this.form.type == 2) {
                            this.form.url = ""
                        }
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
            menuNameChange(val) {
                if (this.form.type == 2) {
                    if (val == "新增" || val == "add") {
                        this.form.permission = this.form.permission + "add"
                    } else if (val == "编辑" || val == "edit") {
                        this.form.permission = this.form.permission + "edit"
                    } else if (val == "删除" || val == "delete") {
                        this.form.permission = this.form.permission + "delete"
                    } else if (val == "查看" || val == "view") {
                        this.form.permission = this.form.permission + "view"
                    }
                } else {
                    try {
                        this.form.permission = this.form.url.replace(/\//g, ":")
                    } catch (err) {

                    }

                }
            }
        }
    }
</script>
<style>


</style>