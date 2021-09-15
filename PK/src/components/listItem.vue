<template>

    <div class="list-item" @click="itemClick(item)"  
    :style="{'background-image':'url('+require('@/img/'+type+'/'+item.id%5+'.png')+')'}" >
        <div class="pkTitle">
            {{item.name}}
            <span v-if="item.isOfficial">官方</span>
            <img class="lock_img" v-if="item.isVerify" src="../img/is_public.png" />
        </div>
        <div class="pkDescript">
            <span>{{item.type=="personal"?"个人PK":"团队PK"}}</span>

            <div v-if="type=='steps'">
                <span class="laberContent" >{{item.modeValue+"公里跑"}}</span>
                
            </div>
            <div v-else-if="type=='wristball'">
                <span class="laberContent"
                    v-if="item.mode==2">{{item.modeValue==30?"30秒钟倒计时转":(parseInt((item.modeValue)/60))+"分钟倒计时转"}}</span>
                <span class="laberContent" v-else>{{item.modeValue+"个倒计数转"}}</span>
            </div>
            <div v-else-if="type=='wheel'">
                <span class="laberContent"
                    v-if="item.mode==2">{{item.modeValue==30?"30秒钟倒计时":(parseInt((item.modeValue)/60))+"分钟倒计时"}}</span>
                <span class="laberContent" v-else>{{item.modeValue+"个倒计次"}}</span>
            </div>
            <div v-else>
                <span class="laberContent"
                    v-if="item.mode==2">{{item.modeValue==30?"30秒钟倒计时跳":(parseInt((item.modeValue)/60))+"分钟倒计时跳"}}</span>
                <span class="laberContent" v-else>{{item.modeValue+"个倒计数跳"}}</span>
            </div>

            <span>{{item.repeatTimes==-1?"不限次数取最优":item.repeatTimes+"次内取最优"}}</span>
            <div>
                <span v-if="item.type=='personal'">{{"已参赛:"+item.registerCount+'/不限'}}</span>
                <span
                    v-else>{{" 已参加:"+item.registerCount}}/{{item.teamPersonLimit==-1?'不限':item.teamPersonLimit*item.teamNum}}</span>
            </div>

        </div>
        <div class="pkPromoter">
            <span>发起人:{{item.nickName}} </span>
        </div>
        <div class="pkTime pkTime_ing"
            v-if="(!DateTime.timeContrast(item.startTime))&&(DateTime.timeContrast(item.endTime))">
            {{DateTime.timeFormat(item.endTime)+'结束'}}</div>
        <div class="pkTime pkTime_ing"
            v-else-if="DateTime.timeContrast(item.startTime)&&DateTime.timeContrast(item.endTime)">
            {{DateTime.timeFormat(item.startTime)+'开始'}}</div>
        <div class="pkTime pkTime_done" v-else-if="!DateTime.timeContrast(item.endTime)">已结束</div>
    </div>

</template>

<script>
    import {
        DateTime,
        getQueryString
    } from "@u/tool"
    export default {
        props: ['item'],
        data() {
            return {
                DateTime: DateTime,
                type: getQueryString("type")
            }
        },
        mounted() {},
        methods: {
            itemClick(item) {
                this.$emit("getJoinStatus", item)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'listItem.scss'
</style>