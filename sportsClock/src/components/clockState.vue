<template>
    <div id="clockstate" v-cloak>
		<div class="">
			
		</div>
    </div>
</template>

<script>
    
    import {
        NavBar ,Icon 
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
		props:{
			state:{
				type:Boolean,
				default: () => false
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
            getList(){
            },
            onClickLeft() {
                this.$interaction.closePage();
                // this.$router.go(-1)
            },
            onClickRight() { //跳转创建小组
                 this.$router.push({path: '/groupIndex', query: {id: item}});
            },
        }
    };
</script>
<style lang="scss" >
	#clockstate{
		padding: .52rem .72rem .4rem .72rem;
		text-align: center;
	}
 </style>
