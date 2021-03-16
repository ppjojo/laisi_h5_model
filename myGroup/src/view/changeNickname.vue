<template>
	<div id="app" v-cloak>
		<div class="header">
			<van-nav-bar title="我在小组中的昵称" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
				<template #right>
				</template>
			</van-nav-bar>
		</div>
		<div class="infomation">
			修改我在小组中的昵称，昵称修改后，只会在此小组内有效，小组内成员都可看见。
		</div>
		<van-cell-group id="changeName">
			<van-field v-model="nickname" maxlength="8" clearable placeholder="请输入昵称"></van-field>
		</van-cell-group>
		<van-button round class="submit" block @click="changeName(nickname)" :color="nickname?bgc:bgcgrey">完成
		</van-button>
	</div>
</template>

<script>
	import {
		changeNickname
	} from '@a/groupIndex';
	import {
		textReview
	} from '@u/tool';
	import {
		NavBar,
		CellGroup,
		Field,
		Button,
		Toast
	} from 'vant';

	export default {
		components: {
			[NavBar.name]: NavBar,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button,
			[Toast.name]: Toast,
			// [SwipeItem.name]: SwipeItem,
			// [GoodsAction.name]: GoodsAction,
			// [GoodsActionIcon.name]: GoodsActionIcon,
			// [GoodsActionButton.name]: GoodsActionButton
		},

		data() {
			return {
				bgc: "linear-gradient(to right, #FF6A88, #FF5136 )",
				bgcgrey: '#999',
				nickname: this.$route.query.name || '',
				groupId: parseInt(this.$route.query.id),
				clubid: '',
			};
		},
		filters: {},
		mounted() {},
		created() {},
		methods: {
			changeName(nickname) {
				if (!nickname) return;
				textReview(this.nickname, res => {
					if (res.code == 0) {
						changeNickname({
							groupId: this.groupId,
							nickName: this.nickname
						}).then((res2) => {
							if (res2.code == 0) {
								Toast('修改昵称成功！');
								setTimeout(() => {
									this.$router.go(-1);
								}, 1500)
							}else{
								Toast('该昵称已被占用!');
							}
						}).catch(() => {
							console.log("error")
						})
					}
				})
			},
			onclickLeft() {
				// this.$interaction.closePage();
				this.$router.go(-1)
			},
			onClickRight() { //跳转创建小组
				localStorage.removeItem("groupItem")
				this.$router.push({
					path: '/groupIndex',
					query: {
						id: item
					}
				});
			},
			goGroupIndex(item) {
				this.$router.push({
					path: '/groupIndex',
					query: {
						id: item
					}
				});

			}
		}
	};
</script>
<style scoped>
	/deep/ #changeName .van-field__control {
		color: #333;
		text-align: center !important;
		padding: .2rem 0;
	}

	.infomation {
		margin: 1.2rem auto;
		line-height: .4rem;
		width: 6.3rem;
		font-size: .28rem;
		color: #999;
		text-align: center;
	}

	.submit {
		width: 4rem;
		height: 0.8rem;
		margin: 1.2rem auto;
		opacity: .8;
		font-size: .4rem;
	}

	.van-hairline--top-bottom::after,
	.van-hairline-unset--top-bottom::after {
		border-width: 0 0 0.02rem 0;
	}

	.van-cell-group {
		width: 85%;
		margin: 0 auto;
		padding: 0 .5rem;
	}
</style>