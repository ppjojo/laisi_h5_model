<template>
	<div class="">
		<div class="outbox ub ub-ac ub-pj">
			<div class="title">铼锶</div>
			<ul class="menulist ub ub-ac">
				<li>户外运动系列</li>
				<li>智能穿戴系列</li>
				<li>派健康</li>
				<li>行业解决方案</li>
				<li>商务合作</li>
				<li>关于铼锶</li>
			</ul>
			<div class="lang ub ub-ac">
				<img src="../assets/img/china.png" alt="">
				<span>China(简体中文)</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TopMenu',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.outbox {
		padding: 60px 200px;
		.title {
			font-size: 23px;
			color: #333;
			font-weight: bold;
		}
		.menulist{
			li{
				margin-right: 60px;
				cursor: pointer;
			}
			li:last-child{
				margin-right: 0;
			}
		}
		.lang{
			img{
				height: 24px;
				width: 24px;
				border-radius: 100%;
				margin-right: 10px;
			}
		}
	}
</style>
