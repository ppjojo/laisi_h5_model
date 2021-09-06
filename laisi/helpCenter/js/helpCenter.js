var tabid = 'tab1' ;   //选项卡id: tab1:常见问题， tab2：操作指南

var openProblemMenuIndex = -1

var problemMenuList = []   //常见问题区域的数据定义
var problemList = []
var allproblemList = []
var problemMenuItemClicked = null


var productList = [] //操作指南区域的数据定义--选择产品列表

var phoneLanguage=navigator.language;
var language=""
if(phoneLanguage.indexOf("zh") != -1){
	language="zh"
	changeTitle()
}else if(phoneLanguage.indexOf("en") != -1){
	language="en"
	changeTitle()
}
$(function(){
	getdetail()
})


/*** 获取地址栏问号后面所传的值 ***/
function getQueryString(name){
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(&|$)");
    var r = decodeURIComponent(window.location.href).substr(1).match(reg);
    if(r!=null)  return  unescape(r[2]); return null;
}


function changeTitle() {
    if(language =="zh" ) {
        document.title = '帮助中心';
        $("#tab1").html("常见问题");
        $("#tab2").html("操作指南");
        $("#toptxtp").html("派小俊为您答疑解惑");
    }else if(language=="en") {
        document.title = 'Help center';
        $("#tab1").html("FAQ");
        $("#tab2").html("Instructions");
        $("#toptxtp").html("Xiao PAI is here to answer all your questions.");
    }
}



// 选择是常见问题还是操作指南的点击事件
function selectTab(optionTab) {
    tabid = optionTab
    localStorage.setItem('helpcenterTabID',optionTab);

    if( tabid == 'tab1' ) {
        $('#problemDiv').show()
        $('#guideDiv').hide()
        $("#tab1").addClass("selected");
        $("#tab2").removeClass("selected");
        problemMenuItemIsShow(problemMenuList)
    }
    if( tabid == 'tab2' ) {
        $('#problemDiv').hide()
        $('#guideDiv').show()
        $("#tab2").addClass("selected"); 
        $("#tab1").removeClass("selected");
        guideGetProductlist()
    }
}

function getdetail() {

    problemMenuList = [
        {
            isshow: false,
            menuIconImg: './img/proMenuICON_skiping.png',
            value:'skipping',
            menuTxt: '智能跳绳',
            menuTxtEn: 'Smart skipping rope'
        },
		{
		    isshow: false,
		    menuIconImg: './img/proMenuICON_balance.png',
		    value: 'balance',
		    menuTxt: '智能体脂秤',
		    menuTxtEn: 'Smart body fat scale'
		},
		{
		    isshow: false,
		    menuIconImg: './img/proMenuICON_watch.png',
		    value: 'watch',
		    menuTxt: '智能手表',
		    menuTxtEn: 'Intelligent watch'
		},
		{
		    isshow: false,
		    menuIconImg: './img/proMenuICON_wristball.png',
		    value: 'wristball',
		    menuTxt: '智能腕力球',
		    menuTxtEn: 'Smart wristball'
		},
        {
            isshow: false,
            menuIconImg: './img/proMenuICON_airSticker.png',
            value: 'airStick',
            menuTxt: '空气检测仪',
            menuTxtEn: 'Air monitor'
        },
        
        {
            isshow: false,
            menuIconImg: './img/proMenuICON_app.png',
            value: 'ReHealth',
            menuTxt: 'APP使用',
            menuTxtEn: 'APP use'
        }
    ]

    if(localStorage.getItem('helpcenterTabID')) {
        selectTab(localStorage.getItem('helpcenterTabID'))
    }else {
        selectTab(tabid)
    }
}

//常见问题的菜单是否显示的查询 ---查询每个菜单模块是否有数据，控制该菜单模块是否显示
function problemMenuItemIsShow(menulist) {
	ajax({
		type: "post",
		url: "helpCenter/faq/groupby/devicedetail",
		data:{
			language:language
		},
		success: function(res) {
			if(localStorage.getItem("appInfo")){
		$('#username').text(JSON.parse(localStorage.getItem("appInfo")).nickname ) 
	}
    
			if( parseInt(res.code) == 0) {
			    var data = res.data
			    for (var prop in data){   
			        for(var i=0 ; i<menulist.length ; i++){
			            if(menulist[i].value==prop  ) {
			                menulist[i].isshow = true
			                break
			            }
			        }
			    }
			    // 循环渲染每个有数据的模块类型的问题列表区域
			    var html='';
			    for (var i = 0;i < menulist.length;i++){
			        var item = menulist[i]
			        html+='<div  class="problemItemListDiv" id="'+ item.value +'" >'
			            + '</div>'
			    }      
			    $('#problemList').html(html)
			    allproblemList = []
			    openProblemMenuIndex = -1
			    for( var i=0 ; i<menulist.length ; i++) {
			        if(menulist[i].isshow) {
			            appendProblemMenuData( menulist)
			            problemlistByDevicetype(menulist[i].value)
			        }
			    }
			}
		},
		error: function() {
			console.log("error")
			
		}
	})
}

//问题列表--请求接口
function problemlistByDevicetype(devicetypedetail) {
        problemList =  []
        var lastmenuItem = ''
        var isshowLength =  0
        for( var j=0 ; j<problemMenuList.length ; j++) {
            if(problemMenuList[j].isshow) {
                lastmenuItem = problemMenuList[j].value
                isshowLength +=1
            }
        }
		
		ajax({
			type: "post",
			url: "helpCenter/faq/devicedetail/list",
			data:{
				deviceTypeDetail:devicetypedetail,
				language:language
			},
			success: function(res) {
				if( parseInt(res.code) == 0) {
				    var data = res.data
				    allproblemList.push({
				        devicetype: devicetypedetail,
				        datalist: data
				    })
				    
				    console.log('allproblemList', allproblemList)
				    if( allproblemList.length == isshowLength ) {
				        for(var i=0 ; i<allproblemList.length; i++ ) {
				            appendProblemData(allproblemList[i].datalist, allproblemList[i].devicetype)
				        }
				    }
				}
			},
			error: function() {
				console.log("error")
				
			}
		})
}

//常见问题的导航菜单点击方法
function searchProblemMenuIndex(index) {
    console.log('searchProblemMenuIndex', index)
    if(openProblemMenuIndex == index ) {
        openProblemMenuIndex = -1
        problemMenuItemClicked = null
    }else {
        openProblemMenuIndex = index
        problemMenuItemClicked = problemMenuList[index].value
    }
    
    localStorage.setItem('openProblemMenuIndex',openProblemMenuIndex)

    for(var i=0 ; i<allproblemList.length; i++ ) {
        appendProblemData(allproblemList[i].datalist, allproblemList[i].devicetype, problemMenuItemClicked)
    }

    appendProblemMenuData( problemMenuList )

}
//常见问题:点击导航菜单后,点击菜单的显示方法
function appendProblemMenuData( menulist) {

    var html='';

    if( localStorage.getItem('openProblemMenuIndex')  && localStorage.getItem('openProblemMenuIndex') != -1 ) {
        openProblemMenuIndex = localStorage.getItem('openProblemMenuIndex')
    }

    for (var i = 0;i < menulist.length;i++){

        var item = menulist[i]
        var clickedMenuDiv = '', clickedMenuDivIcon = ''

        if( openProblemMenuIndex == i) {
           //min-height:2.048rem 
           if( $("#"+item.value ).outerHeight() > (document.documentElement.clientWidth / 7.5 * 2.4) ) {
            clickedMenuDiv = 'height: '+ $("#"+item.value ).outerHeight() + 'px'+';' 
           }
            
            clickedMenuDivIcon = 'turn'
        }

        var menuTxt = language=="zh" ? item.menuTxt : item.menuTxtEn;
        var menuTxtClass = language=="zh" ? '' : 'enTxt';
        if( item.isshow) {
            html+='<div class="menuitem "'+ 'style="' + clickedMenuDiv +'"' 
            + ' onclick="searchProblemMenuIndex('+i+')">'
            + '<img class="menuIconImg"  src="' + item.menuIconImg + '" alt="" />'
            + '<p class="' + menuTxtClass + '">'+ menuTxt + '</p>'
            +  '<img class="downIcon ' + clickedMenuDivIcon + '" src="./img/icon_down.png" alt="" >'
            + '</div>'
        }

    }         
    $('#problemMenu').html(html)

} 
//常见问题的问题列表渲染显示
function appendProblemData(datalist, datatype, problemMenuItemClicked) {

    var problemItemhtml='';

    if( localStorage.getItem('openProblemMenuIndex')  && localStorage.getItem('openProblemMenuIndex') != -1 ) {
        openProblemMenuIndex = localStorage.getItem('openProblemMenuIndex')
        problemMenuItemClicked = problemMenuList[openProblemMenuIndex].value
    }
    
    for (var i = 0;i < datalist.length;i++){

        var item = datalist[i]
        
        // 默认展示每个问题模块的两条，超过两条时点击箭头展示该模块剩余数据
        if( problemMenuItemClicked != datatype  &&  i>=2 ){
            break
        }

        problemItemhtml+='<div  class="problemItem" onclick="goAnswer('+item.id+')">'
        + '<p>'+ item.title + '</p>'
        + '</div>'
    }      

    $('#'+datatype).html(problemItemhtml)

    if( problemMenuItemClicked ==  datatype) {
        appendProblemMenuData( problemMenuList)
    }

} 
//跳转问题对应答案页
function goAnswer(answerid){
    console.log('answerid', answerid)

    window.location.href = "answer.html?id=" + answerid + '&userId='+ getQueryString('userId') ;
}

//操作指南区域的选择产品列表获取
function guideGetProductlist() {
    var prolist = []
	ajax({
		type: "get",
		url: "device/list/get/all/web",
		data:{
			language:language
		},
		success: function(res) {
			if(localStorage.getItem("appInfo")){
		$('#username').text(JSON.parse(localStorage.getItem("appInfo")).nickname ) 
	}
    
			if( parseInt(res.code) == 0) {
			    var data = res.data
			    prolist = data.map(function (item) {
			        item.isshow = false
			        return item;
			    })
			    guideProductlistIsShow(prolist)
			}
		},
		error: function() {
			console.log("error")
			
		}
	})
}

//操作指南区域的选择产品列表是否显示
function guideProductlistIsShow(prolist) {
	ajax({
		type: "post",
		url: "helpCenter/manual/groupby/devicetype",
		data:{
			language:language
		},
		success: function(res) {
			if( parseInt(res.code) == 0) {
			   var data = res.data
			   for (var prop in data){   
			       for(var i=0 ; i<prolist.length ; i++){
			           if(prolist[i].deviceModel==prop  ) {
			               prolist[i].isshow = true
			               break
			           }
			       }
			   }
			   appendGuideData(prolist)
			}
		},
		error: function() {
			console.log("error")
			
		}
	})
}

//操作指南的区域的渲染方法
function appendGuideData(datalist) {

    var html='';
    
    for (var i = 0;i < datalist.length;i++){

        var item = datalist[i]
        if( item.isshow) {
            html+='<div class="guideproItem" onclick="goguidedetail(\''+(item.deviceModel).toString()+'\')">'
			+ '<img class="proIconImg"  src="' + item.deviceIconSmallUrl + '" alt="" />'
                + '<div class="maincontainer">'
                
                + '<p>'+ item.deviceName + '</p>'
				+  '<img class="rightIcon" src="./img/icon_right.png" alt="" />'
                + '</div>'
                
                + '</div>'
        }
        
    }         
    $('#guideproList').html(html)

} 

//跳转操作指南详情页
function goguidedetail(deviceModel){
    window.location.href="guide.html?deviceType="+deviceModel + '&userId='+ getQueryString('userId');
}
