<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar title="测评结果" safe-area-inset-top fixed>
				<!-- <template #right>
					<van-icon name="plus" style="font-size: 0.4rem;" />
				</template> -->
			</van-nav-bar>
		</div>
		<div class="content" style="padding-top:0;">
			<div class="fts14" style="padding: .1rem 0;">您的好友用户的昵称在派健康完成跳绳训练7日计划后测评结果。——2021/03/06</div>
			<div class="title">7日计划训练效果看的见</div>
			<div class="fts14" style="text-align: center;padding: .1rem 0;">各项指标全面提升，训练更高效</div>
			<ul class="barline">
				<li>
					<div class="fts14">协调性<span class="redlarge">(+48)</span></div>
					<div class="underbox">
						<div class="colorbox" :style="{width:'88%'}"></div>
						<div class="whitebox" :style="{left:'5%'}"></div>
						<div class="oldnum fts12" :style="{left:'5%'}">5</div>
						<div class="newnum redsmall" :style="{left:'88%'}">88</div>
					</div>
				</li>
			</ul>
			<div class="fts12">声明：所有的数据仅供参考，不建议以此数据作为医疗或者健康状况的判断依据。</div>
		</div>
	</div>
</template>

<script>
	import {
		listItem
	} from '@a/api'
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

		data() {
			return {

			};
		},
		filters: {},
		mounted() {
		},
		created() {},
		methods: {
			getList() {
				listItem().then(() => {
					console.log("success")
				}).catch(() => {
					console.log("error")
				})
			},
		}
	};
</script>
<style lang="scss" scoped="scoped">
	@import '@/styles/weekPlan.scss';

	.content {
		padding: .3rem;

		.fts16 {
			font-size: .32rem;
		}

		.fts14 {
			font-size: .28rem;
		}

		.fts12 {
			font-size: .24rem;
			color: #999;
		}

		.title {
			font-size: .4rem;
			font-weight: bold;
			text-align: center;
			margin-top: .4rem;
		}
		.barline{
			margin-top: .4rem;
			li{
				margin-bottom: .5rem;
				.redlarge{
					color: #E60012;
					font-size: .4rem;
				}
				.redsmall{
					color: #E60012;
					font-size: .28rem;
				}
				.underbox{
					width: 100%;
					height: .16rem;
					border-radius: .08rem;
					background-color: rgba(245, 245, 245, 1);
					position: relative;
					margin: .2rem 0;
					.colorbox{
						background: linear-gradient(to right, #FF6A88, #FF5136 );
						height: 100%;
						border-radius: .08rem;
						position: absolute;
						left: 0;
						top: 0;
					}
					.whitebox{
						width: 1%;
						height: 100%;
						background-color: #fff;
						position: absolute;
						z-index: 99;
					}
					.newnum,.oldnum{
						position: absolute;
						top: .25rem;
					}
					
				}
			}
		}
	}

</style>
