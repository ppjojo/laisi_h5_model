<template>
	<div class="bottombox">
		<div class="ullist ub ub-pj">
			<ul class="uls">
				<li class="title">关于铼锶</li>
				<li class="detail">企业简介</li>
				<li class="detail">大事记</li>
			</ul>
			<ul class="uls">
				<li class="title">合作伙伴</li>
				<li class="detail">芯海科技</li>
				<li class="detail">大事记</li>
				<li class="detail">ES SENSE</li>
				<li class="detail">NORDIC</li>
				<li class="detail">矽睿</li>
			</ul>
			<ul class="uls">
				<li class="title">商务合作</li>
				<li class="detail">marketing@laisitech.com</li>
			</ul>
			<ul class="uls">
				<li class="title">联系我们</li>
				<li class="detail">400-665-2788</li>
				<li class="detail">上海市松江区中心路1158号21幢1001室</li>
			</ul>
			<ul class="uls">
				<li class="title">下载app</li>
				<li class="detail"><img src="../assets/logo.png" alt=""></li>
			</ul>
			<ul class="uls">
				<li class="title">关注我们</li>
				<li class="detail"><img src="../assets/logo.png" alt=""></li>
				<li class="detail"><img src="../assets/logo.png" alt=""></li>
			</ul>
		</div>
		<div class="ub ub-ac ub-pj back">
			<div>Copyright © 2019.上海铼锶信息技术有限公司版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沪ICP备19002806号</div>
			<div class="blue">隐私政策&nbsp;&nbsp;|&nbsp;&nbsp;用户使用许可协议</div>
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
		methods:{

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.bottombox{
		background-color: #252525;
		height: 625px;
		padding: 90px 150px;
		color: #fff;
		.ullist{
			padding-bottom: 60px;
			border-bottom: 1px solid #E5E5E5;
			.uls{
				li{
					cursor: pointer;
					text-align: left;
				}
				li.title{
					font-size: 22px;
					margin-bottom: 40px;
					font-weight: bold;
				}
				li.detail{
					font-size: 16px;
					margin-bottom: 20px;
				}
				img{
					width: 85px;
					height: 85px;
				}
			}
		}
		.back{
			font-size: 16px;
			padding-top: 34px;
			.blue{
				color: #4D82BA;
				cursor: pointer;
			}
		}
	}
</style>
