<template>
    <div id="app" v-cloak>
        <div class="header">
            <van-nav-bar :title="'创建PK赛('+flag+'/2)'" @click-left="onclickLeft" left-arrow safe-area-inset-top fixed>
            </van-nav-bar>
        </div>
        <div class="creatBox" v-if="flag==1">
            <div class="item_box">
                <div class="laber">
                    比赛名称
                </div>
                <div class="pkName_box">
                    <van-field v-model="submitform.name" rows="2" type="textarea" maxlength="16" placeholder="请输入比赛名称吧~"
                        show-word-limit />
                </div>
            </div>
            <div v-if="type=='skipping'">
                <div class="item_box">
                    <div class="laber">
                        比赛模式
                    </div>
                    <div>
                        <van-radio-group @change="modeChange" v-model="submitform.mode" direction="horizontal">
                            <van-radio name="2">倒计时跳</van-radio>
                            <van-radio name="3">倒计数跳</van-radio>
                        </van-radio-group>
                    </div>
                    <div v-if="submitform.mode" class="borderTop">
                        <van-cell class="pk_cell" :class="form.pkMode.indexOf('请选择')!=-1?'':'chosed'"
                            @click="modeChange(submitform.mode)" :title="submitform.mode==2?'倒计时长':'倒计数跳个数'" is-link
                            :value="form.pkMode" />
                    </div>
                </div>
                <div class="item_box">
                    <div class="laber">
                        比赛类型
                    </div>
                    <div class="border">
                        <van-radio-group @change="typeChange" v-model="submitform.type" direction="horizontal">
                            <van-radio name="personal">个人赛</van-radio>
                            <van-radio name="team">团体赛</van-radio>
                        </van-radio-group>
                    </div>

                    <div v-if="submitform.type=='team'" class="borderTop">
                        <van-cell class="pk_cell" :class="form.pkType.toString().indexOf('请选择')!=-1?'':'chosed'"
                            @click="typeChange(submitform.type)" title="团队赛人数" is-link :value="form.pkType" />
                    </div>
                </div>
            </div>

            <div v-else-if="type=='steps'">
                <div class="item_box">
                    <div>
                        <van-cell class="pk_cell2" :class="form.pkMode.indexOf('请选择')!=-1?'':'chosed'"
                            @click="distanceShow = true" title="比赛模式(公里数)" is-link :value="form.pkMode" />
                    </div>
                </div>
                <div class="item_box">
                    <div>
                        <van-cell class="pk_cell2 chosed" title="比赛类型" value="个人赛" />
                    </div>
                </div>

            </div>

            <div v-else-if="type=='wristball'">
                <div class="item_box">
                    <div>
                        <van-cell class="pk_cell2" :class="form.pkMode.indexOf('请选择')!=-1?'':'chosed'"
                            @click="countTimeShow = true" title="比赛模式(倒计时转)" is-link :value="form.pkMode" />
                    </div>
                </div>
                <!-- <div class="item_box">
                    <div class="laber">
                        比赛类型
                    </div>
                    <div class="border">
                        <van-radio-group @change="typeChange" v-model="submitform.type" direction="horizontal">
                            <van-radio name="personal">个人赛</van-radio>
                            <van-radio name="team">团体赛</van-radio>
                        </van-radio-group>
                    </div>

                    <div v-if="submitform.type=='team'" class="borderTop">
                        <van-cell class="pk_cell" :class="form.pkType.toString().indexOf('请选择')!=-1?'':'chosed'"
                            @click="typeChange(submitform.type)" title="团队赛人数" is-link :value="form.pkType" />
                    </div>
                </div> -->
                <div class="item_box">
                    <div>
                        <van-cell class="pk_cell2 chosed" title="比赛类型" value="个人赛" />
                    </div>
                </div>
            </div>

            <div v-if="type=='wheel'">
                <div class="item_box">
                    <div class="laber">
                        比赛模式
                    </div>
                    <div>
                        <van-radio-group @change="modeChange" v-model="submitform.mode" direction="horizontal">
                            <van-radio name="2">倒计时</van-radio>
                            <van-radio name="3">倒计次</van-radio>
                        </van-radio-group>
                    </div>
                    <div v-if="submitform.mode" class="borderTop">
                        <van-cell class="pk_cell" :class="form.pkMode.indexOf('请选择')!=-1?'':'chosed'"
                            @click="modeChange(submitform.mode)" :title="submitform.mode==2?'倒计时长':'倒计数次数'" is-link
                            :value="form.pkMode" />
                    </div>
                </div>
                <div class="item_box">
                    <div>
                        <van-cell class="pk_cell2 chosed" title="比赛类型" value="个人赛" />
                    </div>
                </div>
            </div>


            <van-button round class="nextStep" :class="canNext1?'canNextStep':''" block @click="nextPage()">下一步
            </van-button>
        </div>


        <div class="creatBox" v-if="flag==2">
            <div class="item_box">
                <div class="pkRepeatTimes">
                    <van-cell class="pk_cell2" :class="form.pkRepeatTimes.indexOf('请选择')!=-1?'':'chosed'"
                        @click="playTimesShow = true" title="比赛次数" is-link :value="form.pkRepeatTimes" />
                </div>
            </div>
            <div class="item_box">
                <div class="laber">
                    比赛邀请码{{submitform.invitationCode?":"+submitform.invitationCode:""}}
                </div>
                <div class="border">
                    <van-radio-group @change="isVerifyChange" v-model="submitform.isVerify">
                        <van-radio name="false">公开比赛，无需邀请码</van-radio>
                        <van-radio name="true">需要邀请码，自动生成</van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="item_box">
                <div>
                    <van-cell class="pk_cell2" :class="form.pkStart.indexOf('请选择')!=-1?'':'chosed'"
                        @click="startTimeShow = true" title="开始时间" is-link :value="form.pkStart" />
                </div>
            </div>
            <div class="item_box">
                <div>
                    <van-cell class="pk_cell2" :class="form.pkEnd.indexOf('请选择')!=-1?'':'chosed'"
                        @click="endTimeShow = true" title="结束时间" is-link :value="form.pkEnd" />
                </div>
            </div>
            <div class="item_box" v-if="type!='steps'">
                <div class="laber">
                    比赛奖励
                </div>
                <div>
                    <van-radio-group @change="gameRewardChange" v-model="form.pkGameReward" direction="horizontal">
                        <van-radio name="1">无奖励</van-radio>
                        <van-radio name="2">自定义奖励</van-radio>
                    </van-radio-group>
                </div>
                <div class="pkName_box" v-if="form.pkGameReward==2">
                    <van-field v-model="submitform.gameReward" rows="2" type="textarea" maxlength="20"
                        placeholder="请输入比赛奖励吧~" show-word-limit />
                </div>
            </div>

            <van-button round class="nextStep" :class="canNext2?'canNextStep':''" block @click="submitFormData()">创建
            </van-button>

        </div>




        <van-popup v-model="countTimeShow" position="bottom" round>
            <van-picker :title="type=='skipping'?'倒计时跳时长':'倒计时转时长'" show-toolbar :columns="countTimeColumns"
                :default-index="1" @cancel="countTimeShow = false" @confirm="onCountTimeConfirm" />
        </van-popup>

        <van-popup v-model="distanceShow" position="bottom" round>
            <van-picker title="公里数" show-toolbar :columns="distanceColumns" :default-index="1"
                @cancel="distanceShow = false" @confirm="onDistanceConfirm" />
        </van-popup>

        <!-- <van-popup v-model="countNumberShow" position="bottom">
            <van-picker title="倒计数跳个数" show-toolbar :columns="countNumberColumns" @cancel="countNumberShow = false"
                @confirm="onCountNumberConfirm" />
        </van-popup> -->
        <van-popup v-model="teamShow" position="bottom" round>
            <van-picker title="团体赛人数" show-toolbar :columns="teamColumns" @cancel="teamShow = false"
                @confirm="onteamConfirm" />
        </van-popup>
        <van-popup v-model="playTimesShow" position="bottom" round>
            <van-picker show-toolbar title="比赛次数" :columns="playTimesColumns" :default-index="2"
                @cancel="playTimesShow = false" @confirm="onplayTimesConfirm" />
        </van-popup>
        <van-popup v-model="startTimeShow" position="bottom" round>
            <van-picker show-toolbar title="开始时间" :columns="startTimeColumns" @cancel="startTimeShow = false"
                @confirm="onstartTimeConfirm" @change="onstartTimeChange" />
        </van-popup>

        <van-popup v-model="endTimeShow" position="bottom" round>
            <van-picker show-toolbar title="结束时间" :columns="endTimeColumns" @cancel="endTimeShow = false"
                @confirm="onendTimeConfirm" @change="onendTimeChange" />
        </van-popup>

        <van-dialog v-model="countNumberShow" width="80%" :title="type=='skipping'?'倒计数跳个数':'倒计次次数'" show-cancel-button
            @confirm="onCountNumberConfirm">
            <div>
                <van-field type="number" v-model="inputValue" :placeholder="type=='skipping'?'请输入倒计数跳个数':'请输入倒计次次数'" />
            </div>
        </van-dialog>
    </div>

    </div>
</template>

<script>
    import {
        NavBar,
        Icon,
        Popup,
        Field,
        RadioGroup,
        Radio,
        Button,
        Cell,
        Picker,
        Dialog,
    } from 'vant';

    import {
        textReview,
        DateTime
    } from '@u/tool'

    import {
        createCompetition
    } from '@a/index'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [Field.name]: Field,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            [Cell.name]: Cell,
            [Picker.name]: Picker,
            [Dialog.Component.name]: Dialog.Component,
        },

        data() {
            return {
                type: this.$route.query.type,
                flag: 1,
                countTimeColumns: ['30秒'],
                countTimeShow: false,

                countNumberColumns: [{
                        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        defaultIndex: 1
                    },
                    {
                        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        defaultIndex: 0
                    },
                    {
                        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        defaultIndex: 0
                    },
                    {
                        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        defaultIndex: 0
                    }
                ],
                countNumberShow: false,

                playTimesShow: false,
                playTimesColumns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "不限次数，比赛期间取最好成绩"],
                startTimeColumns: [],
                startTimeShow: false,
                startTime: [],

                endTimeColumns: [],
                endTimeShow: false,

                distanceShow: false,
                distanceColumns: [
                    "1公里","3公里","5公里","10公里","15公里","20公里","30公里","40公里","50公里","60公里"
                ],



                teamColumns: ["不限"],
                teamShow: false,

                form: {
                    pkType: "",
                    pkMode: "请选择倒计时跳时长",
                    pkRepeatTimes: "请选择比赛次数",
                    pkStart: "请选择开始时间",
                    pkEnd: "请选择结束时间",
                    pkGameReward: "",
                },
                submitform: {
                    startTime: "",
                    endTime: "",
                    name: "",
                    mode: "", //比赛模式: 2(倒计时)/3(倒计数)
                    type: "", //比赛类型: team(团队赛)/personal(个人赛)
                    isOfficial: false, // true(官方比赛)，false(非官方比赛)
                    modeValue: "", //倒计时/秒, 倒计数/个
                    repeatTimes: "", //比赛  -1:表示不限制比赛次数
                    invitationCode: "", //邀请码
                    isVerify: "", //是否需要邀请码   true(需要)
                    gameReward: "", //比赛奖励
                    teamPersonLimit: "" //团队人数

                },
                canNext1: false,
                canNext2: false,
                inputValue: ""
            };
        },
        watch: {
            submitform: {
                handler: function (val, oldval) {
                    if (this.type == "skipping"||this.type=="wheel") {
                        this.skippingCheckIsNull()
                    } else if (this.type == "steps") {
                        this.runningCheckIsNull()
                    } else if (this.type == "wristball") {
                        this.wristballCheckIsNull()
                    }

                },
                deep: true
            },
            countTimeShow: function (val) {
                if (val) {
                    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
                        passive: false
                    });
                } else {
                    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
                        passive: false
                    });
                }
            },
            countNumberShow: function (val) {
                if (val) {
                    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
                        passive: false
                    });
                } else {
                    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
                        passive: false
                    });
                }
            },
            teamShow: function (val) {
                if (val) {
                    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
                        passive: false
                    });
                } else {
                    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
                        passive: false
                    });
                }
            },
            playTimesShow: function (val) {
                if (val) {
                    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
                        passive: false
                    });
                } else {
                    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
                        passive: false
                    });
                }
            },
            startTimeShow: function (val) {
                if (val) {
                    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
                        passive: false
                    });
                } else {
                    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
                        passive: false
                    });
                }
            },
            endTimeShow: function (val) {
                if (val) {
                    document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {
                        passive: false
                    });
                } else {
                    document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {
                        passive: false
                    });
                }
            }


        },

        mounted() {
            if (this.type == "skipping" || this.type == "wristball"|| this.type == "wheel") {
                for (let i = 1; i <= 60; i++) {
                    this.countTimeColumns.push(i + '分');
                }
                for (let i = 2; i <= 50; i++) {
                    this.teamColumns.push(i);
                }
            } 
            if(this.type == "wheel"){
               this.submitform.type="personal"
            }

            if (this.type == "wristball") {
                this.submitform.mode=2
                 this.submitform.type="personal"
                this.form.pkMode = "请选择倒计时转时长"
            }

            if (this.type == "steps") {
                this.form.pkMode = "请选择公里数"
                this.submitform.mode=0
            }


            var startTime = DateTime.initStart();
            this.startTimeColumns = [{
                    values: Object.keys(startTime),
                },
                {
                    values: startTime[DateTime.getDateByNum(0)],
                }
            ]
            this.startTime = startTime;
            //先初始化结束时间
            this.initEndTime();
        },
        created() {
            console.log(this.$route.query.type)
        },
        methods: {
            onclickLeft() {
                this.$router.go(-1)
            },
            //检查跳绳是否有空项
            skippingCheckIsNull() {
                let submitform = this.submitform;
                if (!(submitform.mode && submitform.type && submitform.modeValue)) { //submitform.name &&
                    this.canNext1 = false;
                    return
                } else {
                    if (submitform.type == "team" && submitform.teamPersonLimit) {
                        this.canNext1 = true;
                    } else if (submitform.type == "personal") {
                        this.canNext1 = true;
                    } else {
                        this.canNext1 = false;
                        return
                    }
                }

                if (!(submitform.repeatTimes && submitform.isVerify && submitform.startTime && submitform.endTime &&
                        submitform.gameReward)) {
                    this.canNext2 = false;
                    return
                } else {
                    if (this.form.pkGameReward == 2 && submitform.gameReward) {
                        this.canNext2 = true;
                    } else if (this.form.pkGameReward == 1) {
                        this.canNext2 = true;
                    } else {
                        this.canNext2 = false;
                        return
                    }
                }

            },
            runningCheckIsNull() {
                let submitform = this.submitform;
                if (submitform.type && submitform.modeValue) { //submitform.name &&
                    this.canNext1 = true;

                }
                if (submitform.repeatTimes && submitform.isVerify && submitform.startTime && submitform.endTime) {
                    this.canNext2 = true;
                }

            },
            wristballCheckIsNull() {
                let submitform = this.submitform;
                if (submitform.type && submitform.modeValue) { //submitform.name &&
                    this.canNext1 = true;

                }
                if (!(submitform.repeatTimes && submitform.isVerify && submitform.startTime && submitform.endTime &&
                        submitform.gameReward)) {
                    this.canNext2 = false;
                    return
                } else {
                    if (this.form.pkGameReward == 2 && submitform.gameReward) {
                        this.canNext2 = true;
                    } else if (this.form.pkGameReward == 1) {
                        this.canNext2 = true;
                    } else {
                        this.canNext2 = false;
                        return
                    }
                }

            },

            modeChange(name) { //比赛模式切换回调
                this.submitform.modeValue = "";
                if (name == 2) {
                    this.countTimeShow = true;
                    this.form.pkMode = "请选择倒计时跳时长";
                } else {
                    this.countNumberShow = true
                    this.form.pkMode =this.type=="skipping"?"请选择倒计数跳个数":"请选择倒计次次数";
                }
            },
            typeChange(name) { //比赛类型切换回调

                if (name == 'personal') {
                    this.submitform.teamPersonLimit = null;
                } else {
                    this.teamShow = true;
                    this.form.pkType = "请选择团体赛人数";
                }
            },


            //倒计时的回调
            onCountTimeConfirm(value, index) {
                var afterText = this.type == "skipping" ? "倒计时跳" : "倒计时转"
                if (value == "60分") {
                    this.form.pkMode = "1小时" + afterText;
                } else {
                    this.form.pkMode = value + "钟" + afterText;
                }
                if (index == 0) {
                    this.submitform.modeValue = 30;
                } else {
                    this.submitform.modeValue = index * 60;
                }
                this.countTimeShow = false;
            },
            //公里数回调
            onDistanceConfirm(value, index) {
                this.form.pkModeValue = value;
                this.form.pkMode = value + "跑";
                this.submitform.modeValue = value.replace("公里","");
                this.distanceShow = false;
            },
            //倒计数的回调
            // onCountNumberConfirm(value, index) {
            //     let countNumber = value[0] * 1000 + value[1] * 100 + value[2] * 10 + value[3] * 1;
            //     if (countNumber < 50) {
            //         this.$toast('倒计数必须不小于50');
            //         return;
            //     }
            //     this.form.pkMode = countNumber + "个倒计数跳";
            //     this.submitform.modeValue = countNumber;
            //     this.countNumberShow = false;
            // },
            onCountNumberConfirm() {
                if (this.type == "skipping") {
                    if (this.inputValue < 50) {
                        this.$toast('倒计数必须不小于50');
                        return;
                    }
                    this.form.pkMode = this.inputValue + "个倒计数跳";
                } else {
                    if (this.inputValue < 1) {
                        this.$toast('倒计数次数必须不小于1');
                        return;
                    }
                    this.form.pkMode = this.inputValue + "次倒计数次数";
                }
                 this.submitform.modeValue = this.inputValue
                this.countNumberShow = false;
            },

            //团队人数的回调
            onteamConfirm(value, index) {
                this.form.pkType = value;
                this.submitform.type = 'team';
                if (value == "不限") {
                    this.submitform.teamPersonLimit = -1;
                } else {
                    this.submitform.teamPersonLimit = value;
                }
                this.teamShow = false;
            },
            //邀请码选择改变
            isVerifyChange(name) {
                this.submitform.invitationCode = null;
                this.submitform.isVerify = name;
                this.form.pkStart = "请选择开始时间";
                this.form.pkEnd = "请选择结束时间";
                this.submitform.startTime = "";
                this.submitform.endTime = "";

                if (name == "true") {
                    this.submitform.invitationCode = Math.random().toString(36).substr(2, 4);
                    var startTime = DateTime.initStart(2);
                    this.startTimeColumns = [{
                            values: Object.keys(startTime),
                        },
                        {
                            values: [],
                        }
                    ]
                    this.startTime = startTime;
                } else {
                    var startTime = DateTime.initStart();
                    this.startTimeColumns = [{
                            values: Object.keys(startTime),
                        },
                        {
                            values: startTime[DateTime.getDateByNum(0)],
                        }
                    ]

                    this.startTime = startTime;
                    //先初始化结束时间
                    this.initEndTime();
                }
            },
            //奖励的改变
            gameRewardChange(name) {
                if (name == 1) {
                    this.submitform.gameReward = "无奖励"
                } else {
                    this.submitform.gameReward = ""
                }
            },

            //比赛次数的回调
            onplayTimesConfirm(value, index) {
                if (index == 10) {
                    this.form.pkRepeatTimes = value;
                    this.submitform.repeatTimes = -1;
                } else {
                    this.form.pkRepeatTimes = value + "次内取最好成绩"
                    this.submitform.repeatTimes = value;
                }

                this.playTimesShow = false;
            },
            //开始时间的回调
            onstartTimeConfirm(value, index) {
                if (value[0] == "立即开始") {
                    var nowTime = DateTime.timeStamp2String('ymdhm');
                    this.form.pkStart = DateTime.timeStamp2String('mdhm');

                    this.submitform.startTime = DateTime.getSjc(nowTime);
                    this.initEndTime(DateTime.sjc2time('ymdhms', DateTime.getSjc(nowTime) + 3600000));
                } else {
                    this.form.pkStart = DateTime.sjc2time('mdhm2', DateTime.getSjc(value[0] + " " + value[1].text))

                    this.submitform.startTime = DateTime.getSjc(value[0] + " " + value[1].text);
                    this.initEndTime(value[0] + " " + value[1].text);
                }
                this.form.pkEnd = "请选择结束时间";
                this.submitform.endTime = "";
                this.startTimeShow = false;

            },
            //开始时间的改变
            onstartTimeChange(picker, value, index) {
                picker.setColumnValues(1, this.startTime[value[0]]);
            },
            //初始化结束时间
            initEndTime(time) {
                var num = 5;
                if (this.submitform.isVerify == 'false') {
                    var endTime = DateTime.initEnd(time);
                    num = 5;
                } else {
                    var endTime = DateTime.initEnd(time, 2);
                    num = 1
                }
                if (time) {
                    var starth = DateTime.timeStamp2String("h", DateTime.getTime(time))
                    var endh = Number(starth) + num;
                } else {
                    var starth = DateTime.getHours()
                    var endh = Number(starth) + num;
                }

                if (endh > 23) {
                    this.endTimeColumns = [{
                            values: Object.keys(endTime),
                        },
                        {
                            values: endTime[DateTime.getDateByNum(1, time)],
                        }
                    ]
                } else {
                    this.endTimeColumns = [{
                            values: Object.keys(endTime),
                        },
                        {
                            values: endTime[DateTime.getDateByNum(0, time)],
                        }
                    ]
                }

                this.endTime = endTime;
            },
            //结束时间的回调
            onendTimeConfirm(value, index) {
                var that = this;
                this.form.pkEnd = DateTime.sjc2time('mdhm2', DateTime.getSjc(value[0] + " " + value[1].text))
                this.submitform.endTime = DateTime.getSjc(value[0] + " " + value[1].text);
                if (this.submitform.startTime) {
                    var timeArray = DateTime.needYearOrNot2(this.submitform.startTime, this.submitform.endTime);
                    this.form.pkStart = timeArray[0];
                    this.form.pkEnd = timeArray[1];
                }
                this.endTimeShow = false;

            },
            //结束时间的改变
            onendTimeChange(picker, value, index) {
                picker.setColumnValues(1, this.endTime[value[0]]);
            },




            //进入创建的第二个页面之前先对pk赛名字进行审核
            nextPage() {
                if (!this.canNext1) return;

                if (this.submitform.name) {
                    textReview(this.submitform.name, res => {
                        if (res.code == 0) {
                            this.flag = 2

                        } else if (res.code == 4001) {
                            this.$toast("比赛名称未通过审核！");
                            this.submitform.name = "";
                        }
                    })

                } else {
                    var userName = JSON.parse(localStorage.getItem("appInfo")).nickname;
                    if (userName.length > 4) {
                        userName = userName.slice(0, 4) + '...';
                    }
                    this.submitform.name = userName + "发起的" + this.form.pkMode;
                    setTimeout(() => {
                        this.flag = 2
                    }, 300)
                }

            },
            //最后的创建比赛
            submitFormData() {
                if (!this.canNext2) return;
                this.submitform.promoterId = JSON.parse(localStorage.getItem("appInfo")).userId;
                createCompetition(this.submitform).then(res => {
                    this.$toast("比赛创建成功！");
                    this.$router.replace({
                        path: '/competitionDetail',
                        query: {
                            id: res.data[1].id,
                            type:this.type
                        }
                    });
                })


            },
        }
    };
</script>
<style lang="scss">
    @import '@/styles/index.scss'
</style>