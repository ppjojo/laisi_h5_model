<template>
    <div class="contain">
        <div style="max-width:14rem;margin:0 auto;position:relative">
            <div class="button_buy" @click="gotoBuy()">立即购买</div>
        </div>

        <img class="productImg" :src="obj.productLink" alt="">
    </div>
</template>

<script>
import {
		getAllProduct
	} from "@a/product";
    export default {
        name: 'index',
        props: {},
        data() {
            return {
                obj:{}

            }
        },
		created() {
			
		},
        computed: {

        },
        watch: {
            '$route'() {
                this.getGoods()
            }
        },
        mounted() {
            this.getGoods()
        },
        methods: {
            getGoods() {
				getAllProduct({ //户外运动
					id: this.$route.query.id
				}).then(res => {
					this.obj = res.data[0];
				})
				
			},
            gotoBuy() {
                window.open (this.obj.productTianmaoLink,'_blank')
                
            }

        }
    }
</script>


<style lang="scss" scoped>
    .productImg {
        width: 100%
    }

    .button_buy {
        width: 1rem;
        height: 0.42rem;
        color: rgba(255, 255, 255, 100);
        font-size: 0.2rem;
        position: fixed;
        top: 2rem;
        right: 1rem;
        line-height: 0.42rem;
        text-align: center;
        background-color: rgba(230, 0, 18, 1);
        border-radius: 5px;
    }



    //大于992
    @media (min-width: 992px) {}



    //小于992
    @media (max-width: 992px) {
        .contain {
            margin-top: 0.66rem;
        }
        .button_buy {
        width: 1rem;
        height: 0.42rem;
        color: rgba(255, 255, 255, 100);
        font-size: 0.2rem;
        position: absolute;
        top: 1rem;
        right: 0.2rem;
        line-height: 0.42rem;
        text-align: center;
        background-color: rgba(230, 0, 18, 1);
    }


    }
</style>