<template>
    <div id="" v-cloak>
		<div id=""  class="sporticon">
			<img :src="url" alt="">
		</div>
    </div>
</template>

<script>
    export default {
		props:{
			type:{
				type:Number,
				default: () => 1
			},
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
			if(this.type==2)this.url = require('@i/icon_skipping.png')
			if(this.type==1)this.url = require('@i/icon_wristball.png')
			if(this.type==3)this.url = require('@i/icon_jfl.png')
		},
        methods: {
        }
    };
</script>
<style lang="scss" >
	.sporticon{
		width: .64rem;
		margin-right:.24rem;
		height: .64rem;
		img{ 
			width: 100%;
			height: 100%;
		}
	}
 </style>
