<template>
	<div id="app">
		<TopMenu class="web-top" :style="{'color':color}"></TopMenu>
		<router-view class="web-mid"></router-view>
		<BottomMenu class="web-bottom"></BottomMenu>
	</div>
</template>

<script>
	import TopMenu from './components/TopMenu.vue'
	import BottomMenu from './components/BottomMenu.vue'
	export default {
		name: 'app',
		components: {
			TopMenu,
			BottomMenu
		},
		data() {
			return {
				color: "#fff",
			}
		},
		watch: { //使用watch 监听$router的变化
			$route(to, from) {
				if (to.meta.color) {
					this.color = to.meta.color
				}
				if(from.path == "/productDetail"){
					document.getElementsByClassName("header_pc")[0].style.background = `rgba(255,255,255,0)`;
					document.getElementsByClassName("web-top")[0].style.color = "#fff"
				}
			}
		},
		created() {
			window.addEventListener('scroll', this.scrollFn);
		},
		methods: {
			scrollFn() {
				if (this.$route.path=="/productDetail")return;
					var t = document.documentElement.scrollTop || document.body.scrollTop;
				var rate = t / 200
				if (rate > 1) rate = 1
				var colorValue = `rgba(255,255,255,${rate})`
				var val = parseInt(255 - rate * 255)
				var colorValue2 = `rgba(${val},${val},${val})`
				document.getElementsByClassName("header_pc")[0].style.background = colorValue
				if (this.color == "#fff") {
					document.getElementsByClassName("web-top")[0].style.color = colorValue2
				}


			},
			destroyed() {
				window.removeEventListener('scroll', this.scrollFn); // 销毁监听
			},
		}

	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		min-height: 100vh;
	}

	.web-mid {
		min-height: 500px;
	}

	.web-top {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 9;
	}

	.web-bottom {
		/* position: absolute;
	bottom: 0;
	width: 100%; */
	}

	@media (max-width: 992px) {
		.web-top {
			color: #000 !important;
		}
	}
</style>
