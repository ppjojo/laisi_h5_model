<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar title="比赛规则" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
                <template #left>
                    <span class="icon iconfont icon-fanhuianniu" style="font-size: 0.5rem;" />
                </template>
            </van-nav-bar>
        </div>
        <div class="ruleContain">
            <p>派健康竞技场可以进行倒计时跳、倒计数跳2种比赛模式，以上2种模式都有个人赛、团队赛（分为活力队与能量队2队）的比赛类型。</p>
            <p class="mar-t">个人倒计数跳比赛</p>
            <p>在比赛期间，参赛者在指定次数内完成指定个数的跳绳（例如1000个），以耗时从少到多依次排名；成绩相同使用次数更少者排名靠前，成绩和使用次数都相同，则排名相同；</p>
            <p class="mar-t">团队倒计数跳比赛</p>
            <p> 在比赛期间，参赛者分为活力队与能量队2队，每个参赛者在指定次数内完成指定个数的跳绳（例如1000个），参赛者取多次跳绳里面的最好成绩，团队以平均有效成绩耗时少的胜；</p>
            <p class="mar-t">个人倒计时跳比赛</p>
            <p> 在比赛期间，参赛者在指定次数内完成指定时间的跳绳（例如1分钟），以跳绳个数从多到少依次排名；成绩相同使用次数更少者排名靠前，成绩和使用次数都相同，则排名相同；</p>
            <p class="mar-t">团队倒计数跳比赛</p>
            <p> 在比赛期间，参赛者分为活力队与能量队2队，每个参赛者在指定次数内完成指定时间的跳绳（例如1分钟），参赛者取多次跳绳里面的最好成绩，团队以平均有效成绩跳绳个数多的胜；</p>
            <p class="mar-t"> 个人发布的奖励由个人负责，官方发布的奖励由官方负责。</p>

            <p class="officalTitle">官方比赛（含奖品）补充规则：</p>
            <p class="mar-t offical">1、跳绳作弊视作扰乱比赛秩序，不会计入比赛成绩，或被删除比赛成绩，且可能被禁止参与后续比赛；</p>
            <p class="mar-t offical">2、中奖名单公示后，所有获奖者至【75派】微信公众号留下收货信息，并上传视频证明自己的跳绳水平与获奖成绩相符，不能自证者，将被取消获奖资格；</p>
            <p class="mar-t offical">3、本比赛详情内名次仅供参考，最终获奖名单，详见【75派】微信公众号和APP内获奖公告</p>
        </div>
    </div>
</template>

<script>
    import {
        NavBar,
        Icon
    } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,

        },

        data() {
            return {
                  type: this.$route.query.type,
            };
        },
        filters: {},
        mounted() {
            //this.getList()
        },
        created() {},
        methods: {
            getList() {

            },
            onclickLeft() {
                this.$router.go(-1)
            },

        }
    };
</script>
<style lang="scss">
    @import '@/styles/index.scss';
</style>
<style lang="scss">
    .ruleContain {
        padding: 0.3rem;

        p {
            font-size: 0.28rem;
            margin: 0;
            padding: 0;
            line-height: 0.4rem;
        }

        .mar-t {
            margin-top: 0.2rem;
        }

        .officalTitle {
            font-size: 0.32rem;
            font-weight: bold;
            margin-top: 0.8rem;
        }

        .offical {
            font-weight: bold;
        }
    }
</style>