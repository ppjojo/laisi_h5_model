<template>
    <div id="" v-cloak>
		<div class="box" :class="{isactive:light}"></div>
    </div>
</template>

<script>
    export default {
		props:{
			light:{
				type: Boolean,
				default: () => true
			}
		},
        components: {
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
			
        }
    };
</script>
<style lang="scss" >
	.box{
		width:.16rem;
		height:.16rem;
		border-radius:.04rem;
		background-color: rgba(30, 30, 42, 1);
	}
	.isactive{
		background-color: rgba(142, 210, 176, 1);
	}
 </style>
