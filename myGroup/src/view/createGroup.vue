<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="创建小组(1/3)" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>

            </van-nav-bar>
        </div>
        <div class="createGroup">
            <div class="labelTitle">小组形象</div>
            <div class="uploaderBox">
                <van-uploader upload-icon="plus" :deletable="false" :max-count="1" :after-read="afterRead" />
                <img class="showImg" :src="groupItem.image" alt="" v-if="groupItem.image">
            </div>

            <div class="uploaderTxt">请选择一张图片作为小组头像</div>

            <van-button round class="nextStep" block @click="goNext()" :color="groupItem.image?bgc:bgcgrey">下一步
            </van-button>

            <van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
        </div>

    </div>
</template>

<script>
    import {
        listItem
    } from '@a/test'
    import {
        NavBar,
        Uploader,
        Button,
        Loading
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Uploader.name]: Uploader,
            [Button.name]: Button,
            [Loading.name]: Loading,
            // [Swipe.name]: Swipe,
            // [SwipeItem.name]: SwipeItem,
            // [GoodsAction.name]: GoodsAction,
            // [GoodsActionIcon.name]: GoodsActionIcon,
            // [GoodsActionButton.name]: GoodsActionButton
        },

        data() {
            return {
                bgc: "linear-gradient(to right, #FF6A88, #FF5136 )",
                bgcgrey: '#999',
                previewImg: "",
                overlayShow: false,
                groupItem: {
                    image: ""
                }
            };
        },
        filters: {},
        mounted() {},
        created() {},
        methods: {

            onclickLeft() {
                this.$router.go(-1)
            },

            afterRead(file) {
                this.overlayShow = true;
                uploadImg1(file, 'showImg', null, res => {
                    this.overlayShow = false;
                    if (res.code != 0) {
                        this.$toast("图片审核未通过，请重新上传！");
                    } else {
                        this.groupItem.image = res.url;
                    }
                })
            },
            goNext() {
                if (!this.groupItem.image) return;
                localStorage.setItem('groupItem', JSON.stringify(this.groupItem));
                window.location.href = "createGroup2.html"
            },
        }
    };
</script>
<style>
    @import '../styles/css/myGroupList.css'
</style>