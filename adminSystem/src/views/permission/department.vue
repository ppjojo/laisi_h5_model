<template>
    <div class="app-container">
        <div class="container-edit" v-if="treeData.length<1">
            <el-button type="primary" size="mini" @click="btn_add_company" v-if="checkPer('add')">添加</el-button>
        </div>
        

        <el-table :data="treeData" style="width: 100%;margin-bottom: 20px;" row-key="id" border size="small" default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="name" label="部门名称"  width="200">
                <template slot-scope="scope">
                    <svg-icon icon-class="department_company" v-if="scope.row.type==0" />
                    <svg-icon icon-class="department_dept" v-if="scope.row.type==1" />
                    <svg-icon icon-class="department_team" v-if="scope.row.type==2" />
                    <!-- <svg-icon icon-class="role_role" v-else /> -->
                    <span  :class="{'disableNode':scope.row.status==1}">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.type | statusFilter" size="mini">
                        {{ scope.row.type==0?"公司":scope.row.type==1?"部门":scope.row.type==2?"组":"组员" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" size="mini">{{ scope.row.status==0?"正常":"禁用" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <template v-if="scope.row.type!==3">
                        <el-button type="text" size="mini" @click="() => btn_add(scope.row)" v-if="checkPer('add')">添加</el-button>
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑</el-button>
                        <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini" v-if="checkPer('delete')">删除
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑</el-button>
                        <el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini" v-if="checkPer('delete')">删除
                        </el-button>
                    </template>
                </template>

            </el-table-column>
        </el-table>

        

        <el-dialog :title="dialogTitle+'部门'" :visible.sync="dialogVisible" width="50%">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="部门名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="部门状态">
                    <el-switch v-model="form.status" :active-value="0" :inactive-value="1" inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort"></el-input>
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
    import { listItem, addItem, updateItem, deleteItem } from '@/api/permission/department'
    import { checkPermission } from '@/api/checkPermission'
    export default {

        data() {
            return {
                filterText: "",
                treeData: [],
                treeEdit:false,
                dialogVisible: false,
                dialogTitle: "新增",
                form: {},
                rules: {
                    name: [
                        { required: true, message: '请输入部门名', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '请输入排序号', trigger: 'blur' },
                    ],
                }
            }

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
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        },
        computed: {
            checkPer(){
                return function(btn){
                    return(checkPermission(this.$route.path+'/'+btn))
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
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            //添加
            btn_add(data) {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    parentId: data.id||-1,
                    name: "",
                    sort: null,
                    status: 0,
                    type: data.type + 1||0,
                }
            },
            btn_add_company() {
                this.dialogVisible = true;
                this.dialogTitle = "新增"
                this.form = {
                    parentId: -1,
                    name: "",
                    sort: null,
                    status: 0,
                    type: 0,
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(data) {
                this.$confirm('此操作将永久删除部门, 是否继续?', '提示', {
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
                            message: '成功删除所选部门!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除部门操作',
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
        }
    }
</script>
