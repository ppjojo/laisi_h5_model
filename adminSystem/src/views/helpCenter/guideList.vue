<template>
    <div class="app-container">
        <div class="container-search">
            <el-form :inline="true" :model="searchForm">
                <!-- <el-form-item label="语言设置：">
                    <el-select v-model="searchForm.language">
                        <el-option v-for="(item, ind) in languageList" :key="ind" :label="item.languageType"
                            :value="item.languageType">{{item.languageType + '-' +item.description}}</el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="设备型号">
                    <el-select v-model="searchForm.deviceType" placeholder="全部" clearable>
                        <el-option v-for="item in deviceModelList" :key="item.deviceModel" :label="item.deviceName"
                            :value="item.deviceModel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="container-edit">
            <el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加</el-button>
        </div>
        <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
            <!-- <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-table :data="scope.row.stepList" ref="stepListTable" @selection-change="handleSelectionChange">
                        <el-table-column prop="manual" label="指南描述" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template scope="props">
                                <el-button @click="btn_edit(props.row)" type="text" size="mini" v-if="checkPer('edit')">
                                    编辑
                                </el-button>
                                <el-button @click=" btn_delete(props.row.id)" type="text" style="color:#f78989;"
                                    size="mini" v-if="checkPer('delete')">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column> -->
            <el-table-column prop="deviceType" label="设备类型" width="100">
            </el-table-column>
            <el-table-column prop="manual" label="指南描述" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">
                        编辑
                    </el-button>
                    <el-button @click=" btn_lan(scope.row)" type="text" style="color:#67c23a;" size="mini"
                        v-if="checkPer('edit')">语言配置
                    </el-button>
                    <el-button @click=" btn_delete(scope.row.id)" type="text" style="color:#f78989;" size="mini"
                        v-if="checkPer('delete')">删除
                    </el-button>
                </template>
            </el-table-column>


        </el-table>



        <!--新增和编辑界面-->
        <el-dialog :title="dialogTitle+'操作指南'" :visible.sync="dialogVisible" width="60%">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <!-- <el-form-item label="语言" prop="languageType">
                    <el-select v-model="form.languageType">
                        <el-option v-for="(item, ind) in languageList" :key="ind" :label="item.languageType"
                            :value="item.languageType">
                            {{item.languageType + '-' +item.description}}</el-option>
                    </el-select>
                </el-form-item> -->


                <el-form-item label="设备型号" prop="device_type">
                    <el-select v-model="form.device_type" clearable>
                        <el-option v-for="item in deviceModelList" :key="item.deviceModel" :label="item.deviceName"
                            :value="item.deviceModel">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-upload class="avatar-uploader" name="img" action="" :http-request="requestFile"
                    :show-file-list="false" v-show="false">
                </el-upload>
                <quill-editor class="myQuillEditor" ref="myQuillEditor" :content="form.manual"
                    :options="editorOptiondetails" @change="onEditordetailChange($event)">
                </quill-editor>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="语言配置" :visible.sync="lanDialogVisible" width="70%">
            <el-form :model="lanForm" label-width="120px" ref="lanForm">
                <el-form-item :label="item.description+'-'+item.languageType" v-for="item in languageList">
                    <el-input type="textarea" :autosize="{ minRows: 2}" v-model="lanForm[item.languageType]"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="lanDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitLanForm('lanForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { listItem, addItem, updateItem, deleteItem } from '@/api/helpCenter/guideList'
    import { listItem as languageListItem } from '@/api/device/appLanguage'
    import { lanAddItem, lanUpdateItem, lanViewItem } from '@/api/helpCenter/problemList'
    import { listItem as productListItem } from '@/api/device/productList'
    import { fileUpload } from '@/utils/fileUpload'
    import { checkPermission } from '@/api/checkPermission'
    import { getUInfo } from '@/utils/auth'
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'
    // 工具栏配置
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"] // remove formatting button
    ];

    export default {
        components: {
            quillEditor
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    // 1: 'gray',
                    0: 'danger'
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
                list: [],
                loading: false,


                dialogVisible: false,
                form: {},
                searchForm: {},
                rules: {
                    languageType: [
                        { required: true, message: '请选择所属语言类型', trigger: 'change' }
                    ],
                    manual: [
                        { required: true, message: '请输入操作指南描述', trigger: 'blur' },
                    ],
                    device_type: [
                        { required: true, message: '请选择设备型号', trigger: 'change' }
                    ]
                },

                languageList: [],
                deviceModelList: [],

                quillUpdateImg: false,
                editorOptiondetails: {
                    placeholder: "请输入操作指南的描述",
                    modules: {
                        toolbar: {
                            container: toolbarOptions, // 工具栏
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        document.querySelector(".avatar-uploader input").click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                }
                            }
                        }
                    }
                },
                lanDialogVisible:false,
                lanForm:""

            }
        },
        mounted() {
            this.getList()
            this.getLanguageList()
            this.getProductList()
        },
        methods: {
            getList() {
                var data = {
                    // pageNumber: this.page,
                    // pageSize: this.limit,
                    ...this.searchForm
                }
                listItem(data).then(res => {
                    this.list = []
                    for (let prop in res.data) {
                        let item = {
                            deviceType: prop,
                            manual: res.data[prop][0].manual,
                            id: res.data[prop][0].id,
                            languageType: res.data[prop][0].languageType,
                            device_type: res.data[prop][0].device_type,
                            stepList: res.data[prop]
                        }
                        this.list.push(item)
                    }
                    this.loading = false
                })
            },
            getLanguageList() {
                languageListItem({
                    isSupport: 1
                }).then(res => {
                    this.languageList = res.data
                })
            },
            getProductList() {
                productListItem({}).then(res => {
                    var obj = {};
                    this.deviceModelList = res.data.reduce((arr, next) => {
                        obj[next.deviceModel] ? '' : obj[next.deviceModel] = true && arr.push(next);
                        return arr;
                    }, []);
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
                            addItem([this.form]).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增操作指南'
                                });
                            })
                        } else {
                            updateItem(this.form).then(response => {
                                this.getList()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改操作指南'
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
                    manual: '',
                    device_type: '',
                    languageType: null, //语言类型

                    pic_url: '',
                    pic_size: '',
                    // environment: '',
                    pic_order: null,
                }
            },
            btn_edit(row) {
                this.dialogVisible = true;
                this.dialogTitle = "编辑"
                this.form = Object.assign({}, row)
            },
            //删除
            btn_delete(id) {
                this.$confirm('此操作将永久删除该操作指南, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteItem({
                        ids: id,
                    }).then(response => {
                        this.getList()
                        this.$notify({
                            type: 'success',
                            message: '成功删除所选操作指南!'
                        });
                    })
                }).catch(() => {
                    this.$notify({
                        message: '已取消删除操作指南操作',
                        type: 'info'
                    });
                });
            },
            onEditordetailChange(e) {
                this.form.manual = e.html;
            },
            requestFile(param) {
                var fileObj = param.file;
                this.file = fileObj;
                var form = new FormData(); // FormData 对象
                form.append("file", fileObj); // 文件对象
                fileUpload(form).then(res => {
                    let quill = this.$refs.myQuillEditor.quill;
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, "image", res.data.url);
                    // 调整光标到最后
                    quill.setSelection(length + 1);
                    // this.fileuplodSize.push(res.data);
                });
            },
            //语言配置
            btn_lan(row) {
                languageListItem({
                    isSupport:"1"
                }).then(res=>{
                    this.languageList=res.data
                })
                this.lanForm = {
                    en: "",
                    zh: row.manual,
                    cs: "",
                    fr: "",
                    ja: "",
                    pt: "",
                    ru: "",
                    sk: "",
                    it: "",
                    de: "",
                    type: "manual",
                    typeId: row.id,
                    subType: "0"
                }
                this.getLanDetail()
                this.lanDialogVisible=true
                
            },
            getLanDetail(){
                lanViewItem({
                    type: "manual",
                    typeId: this.lanForm.typeId,
                    subType: "0"
                }).then(res=>{
                    if(res.data.length>0){
                        this.lanForm=Object.assign(this.lanForm,res.data[0])
                        this.dialogTitle="编辑"
                    }else{
                        this.dialogTitle="新增"
                    }


                })
            },
            submitLanForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.lanDialogVisible = false
                        if (this.dialogTitle == "新增") {
                            lanAddItem(this.lanForm).then(response => {
                                this.getLanDetail()
                                this.$notify({
                                    type: 'success',
                                    message: '成功新增翻译资源'
                                });
                            })
                        } else {
                            lanUpdateItem(this.lanForm).then(response => {
                                this.getLanDetail()
                                this.$notify({
                                    type: 'success',
                                    message: '成功修改翻译资源'
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