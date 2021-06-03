<template>
	<div class="bottombox">
		<!-- {{$t('user.login')}} -->

		<div class="ullist">
			<el-row>
				<el-col :md="5" :lg="5" :xl="5">
					<ul class="uls">
						<li class="title">关于铼锶</li>
						<li class="detail">企业简介</li>
						<li class="detail">大事记</li>
					</ul>
				</el-col>
				<el-col  :md="5" :lg="5" :xl="5">
					<ul class="uls">
						<li class="title">合作伙伴</li>
						<li class="detail">芯海科技</li>
						<li class="detail">ES SENSE</li>
						<li class="detail">NORDIC</li>
						<li class="detail">矽睿</li>
					</ul>
				</el-col>
				<el-col  :md="6" :lg="6" :xl="6">
					<ul class="uls">
						<li class="title">商务合作</li>
						<li class="detail">marketing@laisitech.com</li>
					</ul>
				</el-col>
				<!-- <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="4">
					<ul class="uls">
						<li class="title">联系我们</li>
						<li class="detail">400-665-2788</li>
						<li class="detail">上海市松江区中心路1158号<br>21幢1001室</li>
					</ul>
				</el-col> -->
				<el-col  :md="4" :lg="4" :xl="4">
					<ul class="uls">
						<li class="title">下载app</li>
						<li class="detail"><img src="../assets/logo.png" alt=""></li>
					</ul>
				</el-col>
				<el-col :md="4" :lg="4" :xl="4">
					<ul class="uls">
						<li class="title">关注我们</li>
						<li class="detail"><img src="../assets/logo.png" alt=""></li>
						<li class="detail"><img src="../assets/logo.png" alt=""></li>
					</ul>
				</el-col>
			</el-row>
		</div>
		<el-collapse accordion>
			<el-collapse-item title="关于铼锶">
				<div class="itemBox">
					企业简介
				</div>
				<div class="itemBox">
					大事记
				</div>
			</el-collapse-item>
			<el-collapse-item title="合作伙伴">
				<div class="itemBox">
					芯海科技
				</div>
				<div class="itemBox">
					ES SENSE
				</div>
				<div class="itemBox">
					NORDIC
				</div>
				<div class="itemBox">
					矽睿
				</div>
			</el-collapse-item>
			<el-collapse-item title="商务合作">
				<div class="itemBox">
					marketing@laisitech.com
				</div>
			</el-collapse-item>
			<el-collapse-item title="下载app">
				<div class="itemBox">
					<img src="../assets/logo.png" alt="">
				</div>
			</el-collapse-item>
			<el-collapse-item title="关注我们">
				<div class="itemBox">
					<img src="../assets/logo.png" alt="">
					<img src="../assets/logo.png" alt="">
				</div>
			</el-collapse-item>
		</el-collapse>
		<div class=" back">
			<div>
				地址：上海市松江区中心路1158号21幢A座9-10楼 联系电话：021-80158697
			</div>
			<div class="addressAndPrivacy">
				<div class="address">Copyright ©2019.上海铼锶信息技术有限公司版权所有 沪ICP备19002806号</div>
				<div class="privacy"><a href="">隐私政策</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="">用户使用许可协议</a></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BottomMenu',
		props: {},
		data() {
			return {

			}
		},
		mounted() {},
		created() {},
		methods: {

		}
	}
</script>


<style lang="scss">
	.el-collapse {
		padding: 0 20px;
		border: none;

		.el-collapse-item__header {
			background-color: transparent;
			color: #fff !important;
			height: 50px;
			font-size: 14px;
			border-bottom: 1px solid #a49f9f;
		}

		.el-collapse-item__wrap {
			background-color: transparent;

			.el-collapse-item__content {
				padding-bottom: 0;
				color: #fff !important;

			}
		}
	}
</style>
<style lang="scss" scoped>
	@media (max-width: 992px) {
		.bottombox {
			.ullist {
				display: none;
			}

			background-color: #252525;
			color: #fff;
			padding: 0.15rem 0;

			.itemBox {
				cursor: pointer;
				border-bottom: 1px solid #413e3e;
				margin: 0 0.1rem;
				font-size: 0.12rem;
				line-height: 35px;
				text-align: left;
				color: #eee;

				&:last-child {
					border: none;
				}

				img {
					width: 60px;
					width: 60px;
					margin-right: 0.15rem;
				}
			}

			.back {
				font-size: 0.24rem;
				line-height: 0.5rem;
				padding-top: 0.34rem;
				max-width: 14rem;
				margin: 0 auto;
				color: #999;
				text-align: center;
				.privacy {
					a {
						color: #4D82BA;
						text-decoration: none;
					}

				}
			}
		}
	}



	@media (min-width: 992px) {
		.bottombox {
			background-color: #252525;
			color: #fff;
			padding: 0.9rem 0;

			.ullist {
				max-width: 14rem;
				margin: 0 auto;
				border-bottom: 1px solid #E5E5E5;

				.uls {
					height: 3.5rem;

					li {
						cursor: pointer;
						text-align: center;
					}

					li.title {
						font-size: 0.22rem;
						margin-bottom: 0.4rem;
						font-weight: bold;
					}

					li.detail {
						font-size: 0.16rem;
						margin-bottom: 0.2rem;
					}

					img {
						width: 0.85rem;
						height: 0.85rem;
					}
				}
			}

			.back {
				font-size: 0.12rem;
				line-height: 0.5rem;
				padding-top: 0.34rem;
				max-width: 14rem;
				margin: 0 auto;
				color: #999;
				text-align: left;
				.addressAndPrivacy{
					display: flex;
					justify-content: space-between;
				}

				.privacy {
					a {
						color: #4D82BA;
						text-decoration: none;
					}

				}
			}

			.el-collapse {
				display: none;
			}
		}
	}
</style>