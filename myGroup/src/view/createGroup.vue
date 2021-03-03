<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar :title="'创建小组('+flag+'/3)'" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed></van-nav-bar>
        </div>
        <div class="createGroup" v-if="flag==1">
            <div class="labelTitle">小组形象</div>
            <div class="uploaderBox">
                <van-uploader upload-icon="plus" v-model="fileList" :deletable="false" :max-count="1" :after-read="afterRead" />
            </div>
            <div class="uploaderTxt">请选择一张图片作为小组头像</div>
            <van-button round class="nextStep" block @click="goNext1()" :color="groupItem.image?bgc:bgcgrey">下一步
            </van-button>
            <van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
        </div>
        <div class="createGroup" v-if="flag==2">
            <div class="labelTitle">小组名称</div>
            <div>
                <van-field v-model="groupItem.name" :input="titleChange()"  style="background-color: #f5f5f5;"
                    rows="1" autosize type="textarea" maxlength="16" placeholder="请为您的小组取个响亮的名称吧～" show-word-limit />
            </div>
            <div class="labelTitle" style="margin-top: 0.5rem;">小组口号</div>
            <div>
                <van-field v-model="groupItem.introduce" :input="contentChange()"  rows="5" autosize style="background-color: #f5f5f5;"
                    type="textarea" maxlength="100" placeholder="简单介绍一下您的小组～" show-word-limit />
            </div>



            <van-button round class="nextStep" block @click="goNext2()"
                :color="groupItem.name&&groupItem.introduce?bgc:bgcgrey">下一步
            </van-button>

            <van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
        </div>
        <div class="createGroup" v-if="flag==3">
            <div class="labelTitle">小组标签</div>
            <div>
                <ul class="labelBox">
                    
                    <li v-for="item in labelConfig" @click="labelChange(item.id)">
                        <div class="embedImgBox " :class="inArray(item.id)?item.class:''">
                            <img class="embedImg " :src="inArray(item.id)?item.activeImg:item.img" />
                        </div>
                        <div class="labelTxt">{{item.name}}</div>
                    </li>
                    
                </ul>
            </div>
            <van-button round class="nextStep" block @click="create()"
                :color="labelArray.length>0?bgc:bgcgrey">创建
            </van-button>

            <van-loading type="spinner" vertical v-show="overlayShow"></van-loading>
        </div>

    </div>
</template>

<script>
    import {
        listItem
    } from '@a/test'
    import { pictureReview,textReview } from '@u/tool';
    import {
        NavBar,
        Uploader,
        Button,
        Loading,
        Field
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Uploader.name]: Uploader,
            [Button.name]: Button,
            [Loading.name]: Loading,
            [Field.name]: Field,
            // [SwipeItem.name]: SwipeItem,
            // [GoodsAction.name]: GoodsAction,
            // [GoodsActionIcon.name]: GoodsActionIcon,
            // [GoodsActionButton.name]: GoodsActionButton
        },

        data() {
            return {
                flag:3,
                bgc: "linear-gradient(to right, #FF6A88, #FF5136 )",
                bgcgrey: '#999',
                previewImg: "",
                overlayShow: false,
                fileList:[],
                groupItem: {
                    image: "",
                    name: "",
                    introduce: "",
                    label: ""
                },
                labelArray: [],
                labelConfig:[
                    {
                        id:1,
                        name:"跳绳",
                        class:"ts",
                        img: require('../img/label_ts.svg'),
                        activeImg:require('../img/label_ts_color.svg'),
                    },
                    {
                        id:2,
                        name:"减肥",
                        class:"jf",
                        img: require('../img/label_jf.svg'),
                        activeImg:require('../img/label_jf_color.svg'),
                    },
                    {
                        id:3,
                        name:"减脂",
                        class:"jz",
                       img: require('../img/label_jz.svg'),
                        activeImg:require('../img/label_jz_color.svg'),
                    },
                    {
                        id:4,
                        name:"健身",
                        class:"js",
                        img: require('../img/label_js.svg'),
                        activeImg:require('../img/label_js_color.svg'),
                    },
                    {
                        id:5,
                        name:"腕力球",
                        class:"wlq",
                        img: require('../img/label_wlq.svg'),
                        activeImg:require('../img/label_wlq_color.svg'),
                    },
                ]
            };
        },
        filters: {},
        mounted() {},
        created() {},
        methods: {

            onclickLeft() {
                if(this.flag>1){
                    this.flag--
                }else{
                    this.$router.go(-1)
                }
            },

            afterRead(file) {
                this.overlayShow = true;
                pictureReview(file, res => {
                    this.overlayShow = false;
                    if (res.code == 0) {
                        this.groupItem.image = res.url;
                        this.fileList[0].url=res.url
                    }
                })
            },
            goNext1() {
                if (!this.groupItem.image) return;
                this.flag=2
            },
            goNext2() { //去下一步
                if (!this.groupItem.name || !this.groupItem.introduce) return;
                this.overlayShow=true;
                textReview(this.groupItem.name + this.groupItem.introduce, res => {
                    this.overlayShow = false;
                    if (res.code == 0) {
                         this.flag=3
                    }
                })
            },
            inArray: function (id) {//判断该标签是否选中
                if (!id) return ''
                var index = this.labelArray.findIndex(item => item === id)
                return index==-1?false:true
            },
            labelChange(id) {
                var index = this.labelArray.findIndex(item => item === id)
                if (index == -1) this.labelArray.push(id);
                else this.labelArray.splice(index, 1);
            },
            contentChange() {
                // if (this.groupItem.introduce) this.groupItem.introduce = this.groupItem.introduce.replace(
                //     /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。#￥$%\`~^？！@…—&$=()\-+\/*{}【】\\（）[\]]|\s/g, '')
            },
            titleChange() {
                // if (this.groupItem.name) this.groupItem.name = this.groupItem.name.replace(
                //     /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。#￥$%\`~^？！@…—&$=()\-+\/*{}【】\\（）[\]]|\s/g, '')
            },
            
            create(){

            }
        }
    };
</script>
<style>
    @import '../styles/css/myGroupList.css'
</style>