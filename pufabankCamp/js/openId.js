var APPID = 'wx95bf7aeab60bbf0a';

function getCode() {
    var url_str = location.href // 获取整个地址栏的url_str
    var num = url_str.indexOf("?")
    url_str = url_str.substr(num + 1) // 获取url中的参数
    var arr = url_str.split("&") // 获取url参数数组
        // 获取code
    var code = "";
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=')
        if (arr[i].substring(0, num) == 'code') {
            code = arr[i].substr(num + 1)
        }
    }
    return code;
}
/**
 * cookie中存值
 * */
function setCookie(name, value) {
    if (value) {
        var days = 1; //定义一天
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        // 写入Cookie, toGMTString将时间转换成字符串
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString;
    }
};

/**
 * cookie中取值
 * */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //匹配字段
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};

/**
 * 清除指定cookie值
 * */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = setCookie(name);
    if (cval && cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    }
};

/**
 * 清除全部cookie值
 * */

function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            //	document.cookie = keys[i] +'=0;expires=' + new Date( 0).toUTCString()
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + ";path=/video_learning" +
                ";domain=localhost";
        }
    }
};

function getOpenid(code, cb) {
    if (getCookie("SUMMERCAMP_OPENID")) {
        cb(getCookie("SUMMERCAMP_OPENID"));
        return;
    }
    ajax({
        type: "get",
        url: "summerVlogSkippingPk/summerCamp/getAccessToken",
        data: {
            code: code
        },
        success: function(res) {
            console.log(typeof(res))
            setCookie("SUMMERCAMP_OPENID", res.openid);
            cb(res.openid)
        },
        error: function() {
            console.log("error")
        }
    })
}