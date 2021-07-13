<template>
    <div id="" v-cloak>
		<div id="" v-if="bgw" class="sporticon">
			<img :src="url" alt="">
		</div>
		<div v-else class="sporticon2 ub ub-ac" >
			<img :src="url" alt="">
			<div>
				1.285<span>个</span>
			</div>
		</div>
    </div>
</template>

<script>
    export default {
		props:{
			name:{
				type:String,
				default: () => ''
			},
			bgw:{
				type:Boolean,
				default: () => false
			}
		},
        components: {
        },

        data() {
            return {
                url:''
            };
        },
        filters: {},
        mounted() {
        },
        created() {
			this.url = require('@i/sporticon/icon_skipping.png')
		},
        methods: {
        }
    };
</script>
<style lang="scss" >
	.sporticon img{
		width: .64rem;
		height: .64rem;
	}
	.sporticon2{
		img{
			width: .56rem;
			height: .56rem;
			margin-right: .16rem;
		}
		div{
			color: #cfcfd2;
			font-size: .48rem;
			span{
				font-size: .24rem;
			}
		}
	} 
 </style>
