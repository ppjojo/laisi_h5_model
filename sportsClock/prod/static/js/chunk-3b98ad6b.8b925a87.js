(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b98ad6b"],{"07b4":function(t,e,a){},"2c1a":function(t,e,a){},4984:function(t,e,a){"use strict";a("c62a")},"528d":function(t,e,a){"use strict";a("2c1a")},"67d4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.isIos&&(1==t.isShare||t.sheetImageStatus)?n("div",{staticStyle:{height:"1.32rem"}}):t._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.sheetImageStatus&&1!=t.isShare,expression:"!sheetImageStatus&&isShare!=1"}],staticClass:"header"},[n("van-nav-bar",{attrs:{title:"打卡总览","left-arrow":"","safe-area-inset-top":"",fixed:""},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight},scopedSlots:t._u([{key:"left",fn:function(){return[n("span",{staticClass:"icon iconfont icon-fanhuianniu",staticStyle:{"font-size":"0.5rem"}})]},proxy:!0},{key:"right",fn:function(){return[n("span",{staticClass:"icon iconfont icon-fenxianganniu",staticStyle:{"font-size":"0.48rem"}})]},proxy:!0}])})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.sheetImageStatus&&1!=t.isShare,expression:"!sheetImageStatus&&isShare!=1"}]},[n("div",{staticClass:"ub ub-ac tab"},[n("div",{staticClass:"subtab",on:{click:function(e){return t.changeTab(1)}}},[n("div",{staticClass:"title",class:{active:1==t.tabIndex}},[t._v("月度统计")]),n("img",{directives:[{name:"show",rawName:"v-show",value:1==t.tabIndex,expression:"tabIndex==1"}],staticClass:"activeImg",attrs:{src:a("f3b7"),alt:""}})]),n("div",{staticClass:"subtab",on:{click:function(e){return t.changeTab(2)}}},[n("div",{staticClass:"title",class:{active:2==t.tabIndex}},[t._v("年度统计")]),n("img",{directives:[{name:"show",rawName:"v-show",value:2==t.tabIndex,expression:"tabIndex==2"}],staticClass:"activeImg",attrs:{src:a("f3b7"),alt:""}})])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:1==t.tabIndex,expression:"tabIndex==1"}]},[n("div",{staticClass:"calendaroutbox"},[n("nCalendar",{ref:"calendar",attrs:{showOnly:!0}})],1),n("div",{staticClass:"percent"},[n("div",{staticClass:"percentoutbox"},[n("div",{staticClass:"percentTip",style:{left:"calc( "+t.rate[0]+"% - .35rem )"}},[t._v(t._s(t.rate[0])+"%")]),n("div",{staticClass:"inside",style:{width:t.rate[0]+"%"}})])]),n("div",{staticClass:"target"},[t._v(" 亲爱的"+t._s(t.nickname)+"～"),n("br"),t._v(" 本月已经完成了 "),n("span",{staticStyle:{"font-size":".3rem"}},[t._v(t._s(t.rate[0]))]),t._v(" %的打卡目标，要继续加油哦！ ")]),n("div",{staticClass:"ub ub-ac ub-pj finishList"},[t._l(t.monthObj,(function(e,a){return[0!=e?n("div",{staticClass:"listItem"},[n("returnIcon",{attrs:{isoverClock:!0,name:a,taskNum:e}})],1):t._e()]}))],2)]),n("div",{directives:[{name:"show",rawName:"v-show",value:2==t.tabIndex,expression:"tabIndex==2"}]},[n("div",{staticClass:"calendaroutbox"},[n("year",{ref:"year",attrs:{monthbar:t.yearDetail.checkTimeMap||{}}})],1),n("div",{staticStyle:{"margin-top":".48rem"}},[n("div",{staticClass:"target"},[t._v(" 亲爱的"+t._s(t.nickname)+"～"),n("br"),t.yearDetail.yearCount>=50?n("div",[t._v("你本年度填满了"),n("span",{staticStyle:{"font-size":".3rem"}},[t._v(t._s(t.yearDetail.yearCount||0))]),t._v("个方块，太棒啦！")]):t.yearDetail.yearCount<50?n("div",[t._v("你本年度填满了"),n("span",{staticStyle:{"font-size":".3rem"}},[t._v(t._s(t.yearDetail.yearCount||0))]),t._v("个方块，请继续加油哦！")]):0!=t.yearDetail.yearCount&&t.yearDetail.yearCount?t._e():n("div",[t._v("很遗憾，本年度你没有填满方块")])]),n("div",{staticClass:"ub ub-ac ub-pj finishList"},[t._l(t.yearObj,(function(e,a){return[0!=e?n("div",{staticClass:"listItem"},[n("returnIcon",{attrs:{isoverClock:!0,name:a,taskNum:e}})],1):t._e()]}))],2)])]),n("van-popup",{style:{height:"45%"},attrs:{position:"bottom",round:""},model:{value:t.YMshow,callback:function(e){t.YMshow=e},expression:"YMshow"}},[n("van-datetime-picker",{directives:[{name:"show",rawName:"v-show",value:1==t.tabIndex,expression:"tabIndex==1"}],attrs:{type:"year-month",title:"","min-date":t.minDate,"max-date":t.maxDate,formatter:t.formatter},on:{cancel:function(e){t.YMshow=!1},confirm:t.pickConfirm},model:{value:t.currentDate,callback:function(e){t.currentDate=e},expression:"currentDate"}}),n("van-picker",{directives:[{name:"show",rawName:"v-show",value:2==t.tabIndex,expression:"tabIndex==2"}],attrs:{title:"选择年份","show-toolbar":"",columns:t.columns},on:{cancel:function(e){t.YMshow=!1},confirm:t.onConfirmYear}})],1)],1)},i=[],s=a("ade3");a("3cd0"),a("07b4");function r(t){var e=window.getComputedStyle(t),a="none"===e.display,n=null===t.offsetParent&&"fixed"!==e.position;return a||n}var c,o,l=a("ea8e"),h=a("d282"),u=a("a142"),d=a("a8c1"),f=a("5fbe"),m=Object(h["a"])("sticky"),b=m[0],v=m[1],p=b({mixins:[Object(f["a"])((function(t,e){if(this.scroller||(this.scroller=Object(d["c"])(this.$el)),this.observer){var a=e?"observe":"unobserve";this.observer[a](this.$el)}t(this.scroller,"scroll",this.onScroll,!0),this.onScroll()}))],props:{zIndex:[Number,String],container:null,offsetTop:{type:[Number,String],default:0}},data:function(){return{fixed:!1,height:0,transform:0}},computed:{offsetTopPx:function(){return Object(l["b"])(this.offsetTop)},style:function(){if(this.fixed){var t={};return Object(u["c"])(this.zIndex)&&(t.zIndex=this.zIndex),this.offsetTopPx&&this.fixed&&(t.top=this.offsetTopPx+"px"),this.transform&&(t.transform="translate3d(0, "+this.transform+"px, 0)"),t}}},watch:{fixed:function(t){this.$emit("change",t)}},created:function(){var t=this;!u["f"]&&window.IntersectionObserver&&(this.observer=new IntersectionObserver((function(e){e[0].intersectionRatio>0&&t.onScroll()}),{root:document.body}))},methods:{onScroll:function(){var t=this;if(!r(this.$el)){this.height=this.$el.offsetHeight;var e=this.container,a=this.offsetTopPx,n=Object(d["b"])(window),i=Object(d["a"])(this.$el),s=function(){t.$emit("scroll",{scrollTop:n,isFixed:t.fixed})};if(e){var c=i+e.offsetHeight;if(n+a+this.height>c){var o=this.height+n-c;return o<this.height?(this.fixed=!0,this.transform=-(o+a)):this.fixed=!1,void s()}}n+a>i?(this.fixed=!0,this.transform=0):this.fixed=!1,s()}}},render:function(){var t=arguments[0],e=this.fixed,a={height:e?this.height+"px":null};return t("div",{style:a},[t("div",{class:v({fixed:e}),style:this.style},[this.slots()])])}}),g=(a("25bb"),a("f8c2"),a("f253")),w=(a("578d"),a("ee83")),x=(a("87d0"),a("e41f")),k=(a("b342"),a("ad06")),I=(a("da02"),a("6b41")),y=(a("ac1f"),a("466d"),a("e25e"),a("99af"),a("3dc5")),T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"calendarBox"}},[a("div",{staticClass:"ub ub-ac ub-pj dateTitle"},[a("van-icon",{attrs:{name:"arrow-left",size:"15"},on:{click:function(e){return t.changeYear(1)}}}),a("div",{on:{click:function(e){return t.openFatherPickYear()}}},[t._v(t._s(t.dateTitle))]),a("van-icon",{attrs:{name:"arrow",size:"15"},on:{click:function(e){return t.changeYear(2)}}})],1),a("div",{staticClass:"dateList"},t._l(t.monthList,(function(e){return a("div",{staticClass:"monthbox ub ub-ac"},[a("div",{staticClass:"title"},[t._v(t._s(e.id)+"月")]),a("div",{staticClass:" ub ub-ac"},[t._l(e.daylength,(function(t,n){return[a("div",{staticClass:"daybox"},[a("dayBox",{attrs:{light:e.days.includes(n+1)}})],1)]}))],2)])})),0)])},j=[],S=(a("4160"),a("d3b7"),a("159b"),a("cf80")),O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:""}},[a("div",{staticClass:"box",class:{isactive:t.light}})])},Y=[],A={props:{light:{type:Boolean,default:function(){return!1}}},components:{},data:function(){return{}},filters:{},mounted:function(){},created:function(){},methods:{}},C=A,D=(a("528d"),a("2877")),H=Object(D["a"])(C,O,Y,!1,null,null,null),X=H.exports,z={props:{showOnly:{type:Boolean,default:function(){return!1}},monthbar:{type:Object,default:function(){}}},components:(c={},Object(s["a"])(c,k["a"].name,k["a"]),Object(s["a"])(c,"dayBox",X),c),data:function(){return{dateTitle:"",list:[],monthList:[]}},filters:{},mounted:function(){},created:function(){this.dateTitleStr(new Date,"y")},methods:{openFatherPickYear:function(){this.$parent.fatherPickYearMonth()},dateTitleStr:function(t,e){this.dateTitle=S["a"].getTimeStr(t,e)},dateTitleStr2:function(t){this.dateTitle=t,this.getMonthList()},getMonthList:function(){for(var t=this,e=[],a=1;a<13;a++){var n={id:a,daylength:this.returnDaylength(a),days:[]};e.push(n)}var i=function(a){var n=t.monthbar[a];n.forEach((function(t){e[a-1].days.push(new Date(t.checkTime).getDate())}))};for(var s in this.monthbar)i(s);this.monthList=e},returnDaylength:function(t){if(1==t||3==t||5==t||7==t||8==t||10==t||12==t)return 31;if(2==t){var e=parseInt(this.dateTitle);return e%4!=0||e%100==0&&e%400!=0?28:29}return 30},changeYear:function(t){var e=parseInt(this.dateTitle);if(1==t){if(!(e>2021))return;e-=1}else{if(!(e<(new Date).getFullYear()))return;e+=1}this.$parent.getList(null,new Date(e,0,1).getTime()),this.dateTitle=e}},watch:{monthbar:function(){this.getMonthList()}}},L=z,U=(a("b578"),Object(D["a"])(L,T,j,!1,null,null,null)),M=U.exports,B=a("2335"),V=a("3de1"),_=a("4ec3"),E={components:(o={},Object(s["a"])(o,I["a"].name,I["a"]),Object(s["a"])(o,k["a"].name,k["a"]),Object(s["a"])(o,"nCalendar",y["a"]),Object(s["a"])(o,"returnIcon",B["a"]),Object(s["a"])(o,x["a"].name,x["a"]),Object(s["a"])(o,w["a"].name,w["a"]),Object(s["a"])(o,g["a"].name,g["a"]),Object(s["a"])(o,"year",M),Object(s["a"])(o,p.name,p),o),data:function(){return{isShare:Object(V["a"])("isShare2"),minDate:new Date(2021,0,1),maxDate:new Date,currentDate:new Date,checkTime:(new Date).getTime(),YMshow:!1,tabIndex:1,columns:[],sheetImageStatus:!1,monthObj:{skipping:""},yearObj:{},rate:[0,0],yearDetail:{},nickname:localStorage.getItem("appInfo")?JSON.parse(localStorage.getItem("appInfo")).nickname:Object(V["a"])("nickname"),userId:localStorage.getItem("appInfo")?JSON.parse(localStorage.getItem("appInfo")).userId:"",isIos:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)}},filters:{},mounted:function(){window.sheetImageHideHeader=this.sheetImageHideHeader,window.sheetImageshowHeader=this.sheetImageshowHeader,this.getList(1),this.getList(2)},created:function(){Object(V["a"])("isShare2")&&(this.tabIndex=parseInt(Object(V["a"])("tabIndex")));for(var t=(new Date).getFullYear();t>2020;t--)this.columns.push(t)},methods:{getList:function(t,e){t||(t=this.tabIndex),1==t?this.monthAPI(e):this.yearAPI(e)},monthAPI:function(t){var e=this;t||(t=this.checkTime),Object(_["b"])({checkTime:t}).then((function(t){e.monthObj=t.data,e.$forceUpdate()}))},yearAPI:function(t){var e=this;t||(t=this.checkTime),Object(_["d"])({checkTime:t}).then((function(t){e.yearDetail=t.data})),Object(_["e"])({checkTime:t}).then((function(t){e.yearObj=t.data,e.$forceUpdate()}))},changeTab:function(t){this.tabIndex=t},onClickLeft:function(){this.$router.go(-1)},onClickRight:function(){this.sharePage()},fatherSetMonthObj:function(t,e){this.rate[e]=t.standardRate,this.$forceUpdate()},fatherPickYearMonth:function(){this.YMshow=!0},pickConfirm:function(t){this.$refs.calendar.getList(t),this.$refs.calendar.dateTitleStr(t,"ym"),this.checkTime=new Date(t).getTime(),this.getList(1),this.YMshow=!1},onConfirmYear:function(t){this.$refs.year.dateTitleStr2(t),this.checkTime=new Date(t,0,1).getTime(),this.getList(2),this.YMshow=!1},valRate:function(t){this.rate=t},formatter:function(t,e){return"year"===t?"".concat(e,"年"):"month"===t?"".concat(e,"月"):e},sharePage:function(){this.$interaction.appNative("LSTH5APP_UrlAndSheetImageShareModel",{shareTitle:"运动日历打卡",isShareUrl:!1,shareContent:"",shareUrl:"sportsClock/#/clockoverview?isShare2=1&tabIndex=".concat(this.tabIndex,"&userId=").concat(this.userId,"&nickname=").concat(this.nickname)})},sheetImageHideHeader:function(){this.sheetImageStatus=!0},sheetImageshowHeader:function(){this.sheetImageStatus=!1}}},N=E,F=(a("4984"),Object(D["a"])(N,n,i,!1,null,null,null));e["default"]=F.exports},a5e1:function(t,e,a){},b578:function(t,e,a){"use strict";a("a5e1")},c62a:function(t,e,a){},f3b7:function(t,e){t.exports="data:image/png;base64,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"}}]);