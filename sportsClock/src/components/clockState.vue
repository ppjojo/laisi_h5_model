<template>
	<div id="clockstate" v-cloak>
		<div class="">
			<img v-if="state" class="stateImg" :src="require('@i/clockstate1.png')" alt="">
			<img v-else class="stateImg" :src="require('@i/clockstate2.png')" alt="">
		</div>
		<div v-if="state">
			<div class="" style="width: 2.8rem;color: #959598;font-size: .24rem;margin: .34rem auto;">
				你已累计运动打卡8天啦～
				继续加油呀！
			</div>
			<div>
				<img class="" style="width: 4rem;margin-bottom: .32rem;" :src="require('@i/clockaward.png')" alt="">
			</div>
			<div class="unit ub ub-ad">
				<div class="ub ub-aend">
					<div class="num">100</div>
					<div style="padding-bottom: .2rem;padding-left: .1rem;">逗币</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="" style="width: 2.8rem;color: #959598;font-size: .24rem;margin: .34rem auto;">
				你今天还没有运动诶～
				现在去运动！
			</div>
			<div>
				<img class="" style="width: 1.9rem;" :src="require('@i/none.png')" alt="">
			</div>
		</div>
		<div class="bottomBtn">
			{{state?'分享到朋友圈+50逗币':'去运动'}}
		</div>
	</div>
</template>

<script>
	import {
		NavBar,
		Icon
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			// [Cell.name]: Cell,
			// [CellGroup.name]: CellGroup,
			// [Swipe.name]: Swipe,
			// [SwipeItem.name]: SwipeItem,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},
		props: {
			state: {
				type: Boolean,
				default: () => true
			},
		},
		data() {
			return {

			};
		},
		filters: {},
		mounted() {
			this.getList()
		},
		created() {},
		methods: {
			getList() {},
			onClickLeft() {
				this.$interaction.closePage();
				// this.$router.go(-1)
			},
			onClickRight() { //跳转创建小组
				this.$router.push({
					path: '/groupIndex',
					query: {
						id: item
					}
				});
			},
		}
	};
</script>
<style lang="scss" >
	#clockstate {
		padding: .52rem .72rem .4rem .72rem;
		text-align: center;
		position: relative;
		height: 100%;
		width: 5.66rem;
		.stateImg {
			width: 2.6rem;
		}
		.unit{
			color: #fff;
			font-size: .28rem;
			.num{
				font-size: .8rem;
			}
		}
		.bottomBtn{
			position: absolute;
			width: 4.22rem;
			height: .8rem;
			bottom: .4rem;
			left: calc( 50% - 2.11rem );
			line-height: .8rem;
			color: #fff;
			font-size: .32rem;
			text-align: center;
			background: linear-gradient(to right, #FF6A88, #FF5136 );
			border-radius: .4rem;
		}
	}
</style>
