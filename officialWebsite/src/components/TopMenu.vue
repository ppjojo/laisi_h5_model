<template>
	<div class="">
		<div class="nav-header">
			<div class="logo">铼锶</div>
			<div class="iconfont icon-weibiaoti15" @click="drawer=!drawer">
			</div>
		</div>
		<el-collapse-transition>
			<div class="nav-body" v-show="drawer">
				<ul>
					<li>户外运动系列</li>
					<li>智能穿戴系列</li>
					<li>派健康</li>
					<li>行业解决方案</li>
					<li>商务合作</li>
					<li style="border: none;">关于铼锶</li>
				</ul>
			</div>
		</el-collapse-transition>
		<div class="outbox ub ub-ac ">
			<div class="title">铼锶</div>
			<ul class="menulist ub ub-ac">
				<li>户外运动系列</li>
				<li>智能穿戴系列</li>
				<li>派健康</li>
				<li>行业解决方案</li>
				<li>商务合作</li>
				<li>关于铼锶</li>
			</ul>
			<div class="lang ub ub-ac" @click="changeLanguage">
				<img src="../assets/img/china.png" alt="" >
				<span>{{$t('language.name')}}</span>
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
				drawer: false
			}
		},
		mounted() {},
		created() {},
		methods: {
			changeLanguage() {
				this.$i18n.locale == 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh' //设置中英文模式
				localStorage.setItem('languageSet', this.$i18n.locale) //将用户设置存储到localStorage以便用户下次打开时使用此设置
			},
		}
	}
</script>


<style lang="scss" scoped>
	@media (min-width: 992px) {
		.nav-header{
			display: none !important;
		}
		.nav-body{
			display: none !important;
		}
		.outbox{
			display: flex !important;
		}
	}
	@media (max-width: 992px) {
		.nav-header{
			display: flex !important;
		}
		
		.outbox{
			display: none !important;
		}
	}
	.nav-header {
		position: relative;
		z-index: 10;
		height: 66px;
		box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;

		.logo {
			font-size: 0.2rem;
		}

	}

	.nav-body {
		box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
		background-color: #fff;

		ul {
			padding: 0 15px 15px 15px;

			li {
				font-size: 0.16rem;
				line-height: 45px;
				text-align: left;
				border-bottom: 1px solid #d4d4d4;
			}

		}
	}

	.outbox {
		justify-content: space-around;
		padding: 0.54rem 0;

		.title {
			font-size: .23rem;
			color: #333;
			font-weight: bold;
		}

		.menulist {
			li {
				margin-right: .6rem;
				cursor: pointer;
			}

			li:last-child {
				margin-right: 0;
			}
		}

		.lang {
			img {
				height: 0.24rem;
				width: 0.24rem;
				border-radius: 100%;
				margin-right: 0.1rem;
			}
		}
	}
</style>