<template>
	<div id="app" class="changeNickname" v-cloak>
		<div class="header">
			<van-nav-bar title="我在小组中的昵称" @click-left="onclickLeft" @click-right="onClickRight" left-arrow
				safe-area-inset-top fixed>
				<template #left>
					<span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
				</template>
			</van-nav-bar>
		</div>
		<div class="infomation" >
			修改我在小组中的昵称，昵称修改后，只会在此小组内有效，小组内成员都可看见。
		</div>
		<div id="changeName">
			<van-field v-model="nickname" maxlength="8" clearable placeholder="请输入昵称"></van-field>
		</div>
		<van-button round class="submit" block @click="changeName(nickname)" :color="nickname!=oldNickName&&nickname!=''?bgc:bgcgrey">完成
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
		},

		data() {
			return {
				bgc: "linear-gradient(to right, #FF4E3E, #FFaa88 )",
				bgcgrey: '#999',
				nickname: this.$route.query.name || '',
				groupId: parseInt(this.$route.query.id),
				clubid: '',
				oldNickName:this.$route.query.name || '',
			};
		},
		filters: {},
		mounted() {},
		created() {},
		methods: {
			changeName(nickname) {
				if(nickname==this.oldNickName)return;
				if (!nickname) return 
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
		}
	};
</script>
<style scoped lang="scss">
	@import '@s/group.scss';
</style>