<template>
	<div id="" v-cloak>
		<div id="" v-if="bgw" class="sporticon">
			<img :src="url" alt="">
		</div>
		<div v-else class="sporticon2 ub ub-ac">
			<img :src="url" alt="">
			<div>
				{{typeUtilStr(itemObj,name,'unit')}}<span>{{typeUtilStr(itemObj,name,'val')}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import typeUtil from "@u/type";
	export default {
		props: {
			name: {
				type: String,
				default: () => ''
			},
			bgw: {
				type: Boolean,
				default: () => false
			},
			taskNum: {
				type: Number,
				default: () => 0
			},
			isoverClock:{
				type:Boolean,
				default:()=>false
			}
		},
		components: {},

		data() {
			return {
				url: '',
				itemObj: {
					number: 0,
					takeMs: 0
				}
			};
		},
		filters: {},
		mounted() {},
		created() {
			this.url = typeUtil.returnImg(this.name,this.isoverClock);
			if (!this.bgw) {
				this.itemObj.number = this.itemObj.takeMs = this.taskNum;
			}
		},
		methods: {
			typeUtilStr(val, key, type) { //返回运动名称
				if (type == 'val') return typeUtil.returnUnit(val, key, 'time');
				if (type == 'unit') return typeUtil.formatStrUnit2(val, key);
			},
		},
		watch: {
			taskNum(val) {
				this.itemObj.number = this.itemObj.takeMs = val;
			},
			name(val) {
				this.name = val;
				this.url = typeUtil.returnImg(this.name,this.isoverClock);
			}
		}
	};
</script>
<style lang="scss">
	.sporticon img {
		width: .64rem;
		height: .64rem;
	}

	.sporticon2 {
		img {
			width: .56rem;
			height: .56rem;
			margin-right: .16rem;
		}

		div {
			color: #cfcfd2;
			font-size: .43rem;
			white-space: nowrap;

			span {
				font-size: .24rem;
			}
		}
	}
</style>
