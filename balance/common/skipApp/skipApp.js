var skip = {
    params: {
    	iostype: "",
    	androidtype: "",
    	androidurl: "",
        getdata: "",
        geturl: "",
        param: "",
        isWx: "",
        isIos: "",
        isDownload: 0,
        downloadUrl: "https://phiclouds.phicomm.com/ota/Service/App/downloadpage?appid=2017030031&channel=1NEW",
    },
    init: function() {
        /*微信引导页/底部引导栏*/
        var footersti = '<div class="footersticky"><div class="setimg"><img class="showimg" src="../common/images/appicon.jpg"/></div><div class="showdetail"><p class="layer">铼锶健康</p><p class="healthdetail">爱生活 爱健康</p></div><div class="callbackthis">立即打开</div></div>'
        if(this.isIos()){
            var topContent = this.parseDom('<div><div class="headertop"><div class="headercontent">点击右上角按钮，在弹出的菜单中，点击“在Safari中打开”，进入APP</div><img class="sportsimg" src="../common/images/headertop.png"/></div>'+footersti+'</div>')
        }else{
            var topContent = this.parseDom('<div><div class="headertop"><div class="headercontent">点击右上角按钮，在弹出的菜单中，点击“在浏览器打开”，进入APP</div><img class="sportsimg" src="../common/images/headertop.png"/></div>'+footersti+'</div>')
        }
        document.body.insertBefore(topContent[0], document.body.firstElementChild)
    	
    	this.params.getdata = this.getRequest();
    	this.params.geturl = this.getUrl();
    	this.params.isWx = this.isWeiXin()?1:0;
    	this.params.isIos = this.isIos()?1:0;
    	this.wxShow();
    	
    	var flag = skip.params.getdata.Shareflag;
	    if(flag && flag.toString() === "1"){
	        document.getElementsByClassName("footersticky")[0].style.visibility='visible';
	        if(skip.params.isWx){
	            document.getElementsByClassName("headertop")[0].addEventListener("click", function() {
	                    document.getElementsByClassName("headertop")[0].style.visibility='hidden'
	            }, !1);
	        }else{
		        if(skip.params.isIos){
		            skip.getiosversion(10, skip.params.isDownload);
		        } else {
		            skip.testApp();
		        }
		    }
		}
		document.getElementsByClassName("callbackthis")[0].addEventListener("click", function() {
			
		    if(skip.params.isWx){
		        document.getElementsByClassName("headertop")[0].style.visibility='visible';
		    }else{
		        if(skip.params.isIos){
		            skip.getiosversion(10, 1);
		        } else {
		            skip.testApp();
		        }
		    }
		}, !1);
		
//	    	alert(skip.params.androidurl);
    },
    wxShow: function() {			//初始判断需要直接跳转或下载App
    	if(skip.params.isWx && skip.params.isDownload){
	        document.getElementsByClassName("headertop")[0].style.visibility='visible';
	    }
    },
    parseDom: function (arg) {
		var objE = document.createElement("div");
		objE.innerHTML = arg;
		return objE.childNodes;
	},
	testApp: function() {
	    var timeout, t = 1000,
	        paramFlag = skip.params.getdata.resourceId || skip.params.getdata.itemId,
	        hasApp = true;
	    setTimeout(function() {
	    	var platform;
	    	if (skip.params.isIos) {
	    		platform = "download_ios";
	    	} else{
	    		platform = "download_android";
	    	}
	        if (!hasApp) {
	            window.location.href = skip.params.downloadUrl;
	        }
	    }, 4000);
	    var t1 = Date.now();
	    if(this.params.isIos){
	        window.location.href = "phicareapp://phicomm.phicare/awakenlink/html/scheme?type="+skip.params.iostype+"&resourceId="+paramFlag+skip.params.geturl;
	    } else {
	        window.location.href = "phicareapp://phicomm.phicare/awakenlink/html/scheme?type="+skip.params.androidtype+"&resourceId="+skip.params.androidurl+"?"+ skip.params.geturl +"&resId="+skip.params.getdata.resourceId;
	    }
	    timeout = setTimeout(function() {
	        var t2 = Date.now();
	        if (!t1 || t2 - t1 < t + 100) {
	            hasApp = false;
	        }
	    }, t);
	},
	getiosversion: function(change, flag) {
	    var agent = navigator.userAgent.toLowerCase();
	    var version;
	    var paramFlag = skip.params.getdata.resourceId || skip.params.getdata.itemId;
	    if (agent.indexOf("like mac os x") > 0) {
	        var regStr_saf = /os [\d._]*/gi;
	        var verinfo = agent.match(regStr_saf);
	        version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
	    }
	    if (version != "undefined" && version.length > 0) {
	        if (parseInt(version) > change) {
	            setTimeout(function() {
	                window.location.href = "https://oia.phicomm.com/article/?type=" + skip.params.iostype + "&resourceId="+paramFlag+skip.getUrl();
	            }, 2000)
	        } else if (flag) {
	            skip.testApp();
	        }
	    }
	},
	// 判断是否是微信浏览器
	isWeiXin: function() {
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(skip.isIos()){
	        if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/QQ/i) == 'qq'){
	            return true;
	        } else {
	            return false;
	        }
	    }else {
	        if(ua.match(/MicroMessenger/i) == 'micromessenger' || (ua.match(/QQ/i) == 'qq' && ua.match(/v1_and_sq/i) == 'v1_and_sq') ){
	            return true;
	        } else {
	            return false;
	        }
	    }
	},
	isIos: function() {
	    var u = navigator.userAgent;
	    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	},
	getRequest: function() {
	    var url = location.search;
	    var theRequest = new Object({});
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        strs = str.split("&");
	        for (var i = 0; i < strs.length; i += 1) {
	            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
	        }
	    }
	    return theRequest;
	},
	getUrl: function() {
	    var url = location.search;
	    var theRequest = new Object({});
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	    }
	    return str;
	},
}
