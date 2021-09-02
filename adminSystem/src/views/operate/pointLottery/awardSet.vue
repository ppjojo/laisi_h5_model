<template>
	<div class="app-container">
		<div class="container-search">
			<el-form :inline="true" :model="searchForm">
				<el-form-item label="奖品类别">
					<el-select v-model="searchForm.type" placeholder="请选择" clearable>
						<el-option v-for="item in typeList" :key="item.type" :label="item.name" :value="item.type">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="奖品名称">
					<el-input v-model="searchForm.name" ></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="searchList()">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="container-edit">
			<el-button type="primary" size="mini" @click="btn_add()" v-if="checkPer('add')">添加奖品</el-button>
		</div>
		<el-table v-loading="loading" :data="list" element-loading-text="Loading" border fit highlight-current-row
			size="small ">
			<el-table-column align="center" prop="id" label="奖品ID">
			</el-table-column>
			<el-table-column align="center" prop="name" label="奖品名称">
			</el-table-column>
			<el-table-column align="center" prop="pictureUrl" label="奖品图片">
				<template scope="scope">
					<img :src="scope.row.logo" style="width: 50px;height: 50px;" alt="">
				</template>
			</el-table-column>

			<el-table-column align="center" prop="type" label="奖品分类">
				<template scope="scope">
					{{scope.row.type==1?"盲盒":scope.row.type==3?"优惠券":scope.row.type==5?"实物":scope.row.type==4?"包邮券":"红包"}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="创建时间">
				<template slot-scope="scope">
					{{scope.row.createTime | formatDate}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="180">
				<template scope="scope">
					<el-button @click="btn_edit(scope.row)" type="text" size="mini" v-if="checkPer('edit')">编辑
					</el-button>
					<el-button @click=" btn_delete(scope.row)" type="text" style="color:#f78989;" size="mini"
						v-if="checkPer('delete')">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination :pageTotal="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
		</pagination>


		<!--新增和编辑界面-->
		<el-dialog :title="dialogTitle+'奖品'" :visible.sync="dialogVisible" width="50%">
			<el-form :model="form" label-width="100px" :rules="rules" ref="form">
				<el-form-item label="奖品类型" prop="type">
					<el-radio-group v-model="form.type">
						<el-radio class="radio" :label="1">盲盒</el-radio>
						<el-radio class="radio" :label="2">红包</el-radio>
						<el-radio class="radio" :label="3">消费券</el-radio>
						<el-radio class="radio" :label="4">包邮券</el-radio>
						<el-radio class="radio" :label="5">实物</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="奖品图" prop="logo">
					<el-upload ref='upload' action="" :http-request="requestFile" :show-file-list="false"
						class="avatar-uploader">
						<img v-if="form.logo" :src="form.logo" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="有赞优惠券" v-if="form.type==3">
					<el-select v-model="form.voucherGroup" @change="giveName" value-key="group_id"
						:disabled="dialogTitle=='编辑'"  >
						<el-option v-for="item in couponList" :key="item.group_id" :label="item.description" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="奖品属性" prop="attribute" v-if="form.type!=2">
					<el-radio-group v-model="form.attribute" >
						<el-radio class="radio" :label="0">小奖</el-radio>
						<el-radio class="radio" :label="1">大奖</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="奖品名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="奖品value" prop="value">
					<el-input placeholder="红盒子1,紫盒子2,金盒子3,其余可不填" v-model="form.value"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" size="mini" @click="submitForm('form')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import { listItem, addItem, updateItem, deleteItem, viewItem, searchListItem, YZcoupons } from '@/api/operate/pointLottery/awardSet'
	import { checkPermission } from '@/api/checkPermission'
	import { fileUpload } from '@/utils/fileUpload'
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
				couponList: [],
				page: 0,
				limit: 10,
				total: 0,

				dialogVisible: false,
				form: {},
				searchForm: {},
				rules: {
					logo: [{
						required: true,
						message: '请上传图片',
						trigger: 'blur,change'
					},],
					amount: [{
						required: true,
						message: '请填写礼品数量',
						trigger: 'blur,change'
					},
					{
						pattern: /^\+?[0-9]\d*$/,
						message: "请输入大于等于0的正整数",
						trigger: "blur"
					},
					],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'blur,change'
					},
					],
					attribute: [{
						required: true,
						message: '请选择奖品属性',
						trigger: 'blur,change'
					},],
					name: [{
						required: true,
						message: '请填写奖品名称',
						trigger: 'blur,change'
					},],

				},
				typeList: [
					{ name: '优惠券', type: 3, },
					{ name: '红包', type: 2, },
					{ name: '实物', type: 5, },
					{ name: '包邮券', type: 4, },
				],

			}
		},
		mounted() {
			this.getList()
			this.getCoupon()
		},
		methods: {
			getList() {
				listItem({
					page: this.page,
					pageSize: this.limit
				}).then(res => {
					this.list = res.data.data
					this.total = res.data.count
					this.loading = false
				})
			},
			searchList() {
				searchListItem({
					...this.searchForm
				}).then(res => {
					this.list = res.data
					this.total=res.data.length
					this.loading = false
				})
			},
			getCoupon() {
				YZcoupons({}).then(res => {
					this.couponList = res;
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
					name:"",
					type: "",
					logo: null, //图片url
					attribute:"",
					name:"",
					voucherGroup: {}
				}
			},
			btn_edit(row) {
				this.dialogVisible = true;
				this.dialogTitle = "编辑"
				viewItem({
					id: row.id
				}).then(res => {
					this.form = Object.assign({}, res.data)
				})

			},
			//删除
			btn_delete(row) {
				this.$confirm('此操作将永久删除该奖品, 是否继续?', '提示', {
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
							message: '成功删除所选奖品!'
						});
					})
				}).catch(() => {
					this.$notify({
						message: '已取消删除操作',
						type: 'info'
					});
				});
			},
			requestFile(param) {
				var fileForm = new FormData()
				fileForm.append('file', param.file)
				fileUpload(fileForm).then(res => {
					if (res.code == 0) {
						this.form.logo = res.data.url;
					}
				})
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
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
	}

	.avatar {
		width: 80px;
		height: 80px;
		display: block;
	}
</style>
