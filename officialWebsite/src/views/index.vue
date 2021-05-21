<template>
	<div class="outbox">
		<div class="ub ub-ac ub-pj adbox">
			<img src="../assets/img/ad.png" alt="">
			<img src="../assets/img/ad.png" alt="">
		</div>
		<div class="newsbox">
			<el-carousel :interval="5000" type="card" indicator-position="none" height="600px">
			    <el-carousel-item v-for="item in 6" :key="item">
			      <h3 class="medium">{{ item }}</h3>
			    </el-carousel-item>
			  </el-carousel>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'index',
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
	.outbox{
		padding: 90px;
		background-color: #fff;
		.adbox{
			img{
				width: 591px;
				height: 573px;
			}
		}
	}
</style>
