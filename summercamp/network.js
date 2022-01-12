//version 20200513
//app内部使用和h5适用版本 
//h5使用得时候需要在参数里加上shareStatus==true，则就不需要token

//接口的请求头地址
var host = "https://lsprod.laisitech.com";

//接口未获取到token的重新请求次数
var tryTimes = 0;



//Android终端
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
//iOS终端
var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//是否微信
var isWechat = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
var APPID = 'wx95bf7aeab60bbf0a';
//截止时间
var stopTimeStamp = 1612972799000; //2.10 23.59.59


window.onload = function() {
        try {
            getAppInfoAndUserInfo()
        } catch (e) {
            console.log(e)
        }

    }
    //接口请求统一处理
function ajax() {
    if (getQueryString("isShare")) {
        arguments["0"].shareStatus = true;
        try {
            if (arguments["0"].data) {
                arguments["0"].data.userId = getQueryString("userId") || "100000";
            }
        } catch (e) {
            //TODO handle the exception
            console.log(e)
        }
    }
    if (!arguments["0"].shareStatus) { //当shareStatus==true得时候就是分享得 不需要token
        if (!localStorage.getItem("appInfo")) {
            try {
                getAppInfoAndUserInfo(arguments["0"]);
            } catch (e) {
                console.log(e)
            }
            return;
        } else {
            var appInfo = JSON.parse(localStorage.getItem("appInfo"))
            if (arguments["0"].data) {
                arguments["0"].data.appId = appInfo.appId;
                arguments["0"].data.appVersion = appInfo.appVersion;
                arguments["0"].data.platform = appInfo.platform;
                arguments["0"].data.userId = appInfo.userId;
            }
        }
    }
    arguments["0"].data.campId = getQueryString("campId") || "jingan20210122"

    var ajaxData = {
        type: (arguments["0"].type || "GET").toUpperCase(),
        url: host + arguments["0"].url || "",
        async: arguments["0"].async || "true",
        data: arguments["0"].data || null,
        dataType: arguments["0"].dataType || "json",
        contentType: arguments["0"].contentType || "application/x-www-form-urlencoded; charset=utf-8",
        beforeSend: arguments["0"].beforeSend || function() {},
        success: arguments["0"].success || function() {},
        error: arguments["0"].error || function() {}
    }

    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;



    var params = [];
    if (!arguments["0"].shareStatus) {
        var token = JSON.parse(localStorage.getItem("appInfo")).token;
        var userId = JSON.parse(localStorage.getItem("appInfo")).userId;
    }


    for (var key in ajaxData.data) {
        params.push(key + "=" + ajaxData.data[key]);
    }
    var sendData = params.join("&");


    if (ajaxData.type.toUpperCase() == "GET") {
        xhr.open(ajaxData.type, ajaxData.url + "?" + sendData, ajaxData.async);

        xhr.setRequestHeader('token', token);
        xhr.setRequestHeader('userId', userId);
        var random = Math.floor(Math.random() * 999999)
        xhr.setRequestHeader('random', random);
        var timestamp = (new Date()).getTime()
        xhr.setRequestHeader('timestamp', timestamp);
        var requestId = md5(timestamp + token + random)
        xhr.setRequestHeader('requestId', requestId);
        xhr.send(null);
    } else {
        xhr.open(ajaxData.type, ajaxData.url + "?" + sendData, ajaxData.async);
        if (arguments["0"].contentType == 'multipart/form-data') {

        } else {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        }
        xhr.setRequestHeader('token', token);
        xhr.setRequestHeader('userId', userId);
        var random = Math.floor(Math.random() * 999999)
        xhr.setRequestHeader('random', random);
        var timestamp = (new Date()).getTime()
        xhr.setRequestHeader('timestamp', timestamp);
        var requestId = md5(timestamp + token + random)
        xhr.setRequestHeader('requestId', requestId);
        if (arguments["0"].contentType == 'multipart/form-data') {
            xhr.send(ajaxData.data);
        } else {
            xhr.send(JSON.stringify(ajaxData.data));
        }
    }

    var secondAjaxData = arguments["0"];
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //告知APP，token失效或者为空
                if (parseInt(xhr.response.code) == 2000) {
                    tryTimes++;
                    try {
                        if (tryTimes < 6) {
                            getAppInfoAndUserInfo(secondAjaxData);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    tryTimes = 0
                    ajaxData.success(xhr.response)
                }
            } else {
                ajaxData.error()
            }
        }
    }
}
/*MD5加密方法*/
function md5(md5str) {
    var createMD5String = function(string) {
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;
        string = uTF8Encode(string);
        x = convertToWordArray(string);
        a = 1732584193;
        b = 4023233417;
        c = 2562383102;
        d = 271733878;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
            d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
            c = FF(c, d, a, b, x[k + 2], S13, 606105819);
            b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
            a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
            d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
            c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
            b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
            a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
            d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
            c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
            b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
            a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
            d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
            c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
            b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
            a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
            d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
            c = GG(c, d, a, b, x[k + 11], S23, 643717713);
            b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
            a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
            d = GG(d, a, b, c, x[k + 10], S22, 38016083);
            c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
            b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
            a = GG(a, b, c, d, x[k + 9], S21, 568446438);
            d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
            c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
            b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
            a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
            d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
            c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
            b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
            a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
            d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
            c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
            b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
            a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
            d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
            c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
            b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
            a = HH(a, b, c, d, x[k + 13], S31, 681279174);
            d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
            c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
            b = HH(b, c, d, a, x[k + 6], S34, 76029189);
            a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
            d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
            c = HH(c, d, a, b, x[k + 15], S33, 530742520);
            b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
            a = II(a, b, c, d, x[k + 0], S41, 4096336452);
            d = II(d, a, b, c, x[k + 7], S42, 1126891415);
            c = II(c, d, a, b, x[k + 14], S43, 2878612391);
            b = II(b, c, d, a, x[k + 5], S44, 4237533241);
            a = II(a, b, c, d, x[k + 12], S41, 1700485571);
            d = II(d, a, b, c, x[k + 3], S42, 2399980690);
            c = II(c, d, a, b, x[k + 10], S43, 4293915773);
            b = II(b, c, d, a, x[k + 1], S44, 2240044497);
            a = II(a, b, c, d, x[k + 8], S41, 1873313359);
            d = II(d, a, b, c, x[k + 15], S42, 4264355552);
            c = II(c, d, a, b, x[k + 6], S43, 2734768916);
            b = II(b, c, d, a, x[k + 13], S44, 1309151649);
            a = II(a, b, c, d, x[k + 4], S41, 4149444226);
            d = II(d, a, b, c, x[k + 11], S42, 3174756917);
            c = II(c, d, a, b, x[k + 2], S43, 718787259);
            b = II(b, c, d, a, x[k + 9], S44, 3951481745);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }
        var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
        return tempValue.toLowerCase();
    };
    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    };
    var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = lX & 2147483648;
        lY8 = lY & 2147483648;
        lX4 = lX & 1073741824;
        lY4 = lY & 1073741824;
        lResult = (lX & 1073741823) + (lY & 1073741823);
        if (lX4 & lY4) {
            return lResult ^ 2147483648 ^ lX8 ^ lY8;
        }
        if (lX4 | lY4) {
            if (lResult & 1073741824) {
                return lResult ^ 3221225472 ^ lX8 ^ lY8;
            } else {
                return lResult ^ 1073741824 ^ lX8 ^ lY8;
            }
        } else {
            return lResult ^ lX8 ^ lY8;
        }
    };
    var F = function(x, y, z) {
        return (x & y) | (~x & z);
    };
    var G = function(x, y, z) {
        return (x & z) | (y & ~z);
    };
    var H = function(x, y, z) {
        return x ^ y ^ z;
    };
    var I = function(x, y, z) {
        return y ^ (x | ~z);
    };
    var FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var convertToWordArray = function(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo =
            (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] =
                lWordArray[lWordCount] |
                (string.charCodeAt(lByteCount) << lBytePosition);
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    var wordToHex = function(lValue) {
        var WordToHexValue = "",
            WordToHexValueTemp = "",
            lByte,
            lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue =
                WordToHexValue +
                WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }
        return WordToHexValue;
    };
    var uTF8Encode = function(string) {
        string = string.toString().replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else {
                if (c > 127 && c < 2048) {
                    output += String.fromCharCode((c >> 6) | 192);
                    output += String.fromCharCode((c & 63) | 128);
                } else {
                    output += String.fromCharCode((c >> 12) | 224);
                    output += String.fromCharCode(((c >> 6) & 63) | 128);
                    output += String.fromCharCode((c & 63) | 128);
                }
            }
        }
        return output;
    };
    return createMD5String(md5str);
}
//拼接url和参数
function spliceURL(strUrl, params) {
    let paramsStr = "";
    for (let p in params) {
        if (params[p] || params[p] === 0) {
            paramsStr += "&" + p + "=" + params[p];
        }
    }
    if (paramsStr) {
        paramsStr = "?" + paramsStr.substr(1);
    }
    strUrl = strUrl + paramsStr;
    return strUrl;
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
/*** 获取地址栏问号后面所传的值 ***/
function getQueryString(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.href.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
//获取app设备的信息 以及token信息
function getAppInfoAndUserInfo(ajaxData) {
    if (isIOS) {
        try {
            window.webkit.messageHandlers.lstNative.postMessage('getAppInfo');
            getAppInfoAfter(ajaxData);
        } catch (e) {
            console.log(e)
        }

    } else if (isAndroid) {
        try {
            getAppInfo(window.android.getAppInfo(), ajaxData);
        } catch (e) {
            console.log(e)
        }
    } else {
        console.log("其他设备")
    }
}
//获取app设备的信息 以及token信息    ios的回调
function getAppInfo(info, ajaxData) {
    localStorage.setItem('appInfo', info);
    var infoObject = JSON.parse(info);
    //用户token和userId
    localStorage.setItem('token', infoObject.token);
    localStorage.setItem('userId', infoObject.userId);
    if (ajaxData) {
        ajax(ajaxData);
    }

}

function getAppInfoAfter(ajaxData) {
    if (ajaxData) {
        setTimeout(function() {
            ajax(ajaxData);
        }, 1000)
    }
}
//手机全屏时候，分享按钮在h5上（20200702）
function sharePage(info) {
    console.log("sharePage ")
    if (!info) return;
    try {
        if (isIOS) {
            window.webkit.messageHandlers.lstNative.postMessage({
                "method": "sharePage",
                "title": info.title,
                "description": info.description,
                "url": info.url
            });
        } else if (isAndroid) {
            console.log("android share")
            var androidJson = {
                "title": info.title,
                "description": info.description,
                "url": info.url
            }
            window.android.sharePage(JSON.stringify(androidJson));
        } else {
            console.log("其他设备")
        }
    } catch (e) {
        console.log(e)
    }

}
//返回上一级页面（20200104）
function closePage() {
    console.log("closePage ")
    try {
        if (isIOS) {
            window.webkit.messageHandlers.lstNative.postMessage({
                'method': 'goBack',
            });
        } else if (isAndroid) {
            console.log("android back")
            window.android.goBack();
        } else {
            console.log("其他设备")
        }
    } catch (e) {
        console.log(e)
    }
}
//2019-11-20T02:22:58.000+0000 转换2019-11-20 11:11:59
function renderTime(utc_datetime) {
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('.');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    var timestamp = getTime(new_datetime);
    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60 * 1000;

    // 时间戳转为时间
    var beijing_datetime = sjc2time("ymd3", timestamp);
    return beijing_datetime;

}

function getTime(time) {
    var myDate = new Date(time);
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        var t = new Date(time.replace(/-/g, '/')).getTime();
    } else {
        var t = myDate.getTime();
    }
    return t;
}
//传入时间戳获取日期
function sjc2time(id, sjc) {
    var datetime = new Date(sjc);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var month2 = datetime.getMonth() + 1 < 10 ? datetime.getMonth() + 1 : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var date2 = datetime.getDate() < 10 ? datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    if (id == "y") {
        return year;
    } else if (id == "d") {
        return date;
    } else if (id == "ym") {
        return year + "-" + month;
    } else if (id == "ymd") {
        return year + "-" + month + "-" + date;
    } else if (id == "ymd3") {
        return year + "." + month + "." + date;
    } else if (id == "ymd2") {
        return year + "年" + month + "月" + date + "日";
    } else if (id == "ymdhm") {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    } else if (id == "mdhm") {
        return month + "月" + date + "日 " + hour + ":" + minute;
    } else if (id == "ymdhms") {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    } else if (id == "ymdhm2") {
        return year + "年" + month + "月" + date + "日 " + hour + ":" + minute;
    } else if (id == "ymdhm3") {
        return year + "/" + month + "/" + date + " " + hour + ":" + minute;
    } else if (id == "md") {
        return month + "-" + date;
    } else if (id == "md2") {
        return month2 + "月" + date2 + "日";
    } else if (id == "hm") {
        return hour + ":" + minute;
    } else if (id == "hms") {
        return hour + ":" + minute + ":" + second;
    } else if (!id) {
        return year + "-" + month + "-" + date;
    } else if (id == "mdhm2") {
        return month + "-" + date + " " + hour + ":" + minute;
    } else if (id == "mdhm3") {
        return month + "/" + date + " " + hour + ":" + minute;
    } else if (id == "dhms") {
        return date + "," + hour + "," + minute + "," + second;
    }
}
//获取到连接中的mac地址的回调（视频课程得时候添加）
function getConnectedMac(list) {
    console.log("连接中的mac地址的回调")
    console.log(JSON.parse(list)) //object对象
}
//传入秒数 返回相应的日时分秒（视频课程得时候添加）
function secondsFormat(s, flag) { //有flag的是小课程
    var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
    var hour = Math.floor((s - day * 24 * 3600) / 3600);
    var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
    var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
    if (flag) {
        if (day > 0) {
            return day + "天" + hour + "小时" + minute + "分" + second + "秒";
        } else if (hour > 0) {
            return (hour * 60 + minute) + "分" + second + "秒";
        } else if (minute > 0) {
            return minute + "分" + second + "秒";
        } else {
            return second + "秒";
        }
    } else {
        if (second > 0) {
            minute = minute + 1
        }
        if (day > 0) {
            return day + "天" + hour + "小时" + minute + "分"
        } else if (hour > 0) {
            return (hour * 60 + minute) + "分钟"
        } else if (minute > 0) {
            return minute + "分钟"
        }
    }


}



//进入个人中心（20200525）//点击H5头像，跳转到原生个人主页
function visitPersonalHomepage(userId) {
    try {
        if (isIOS) {
            window.webkit.messageHandlers.lstNative.postMessage({
                'method': 'visitPersonalHomepage',
                'visitUserId': userId
            });
        } else if (isAndroid) {
            window.android.visitPersonalHomepage(JSON.stringify({
                'visitUserId': userId
            }));
        } else {
            console.log("其他设备")
        }
    } catch (e) {
        console.log(e)
    }
}


//获取已经绑定的mac地址
function getMacAddress() {

    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        try {
            window.webkit.messageHandlers.lstNative.postMessage('getT20ConnectedMac')
        } catch (e) {
            console.log(e)
        }
    } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
        getAndroidMac()
    } else {
        var token = 'token';
    }

}

function getAndroidMac() {
    var macAddress = window.android.getT20ConnectedMac()
    if (macAddress) {
        localStorage.setItem('macBind', macAddress);
    } else {
        localStorage.setItem('macBind', "");
    }
    try {
        getMac();
    } catch (e) {
        console.log(e)
    }

}

function getT20ConnectedMac(macAddress) {
    if (macAddress) {
        localStorage.setItem('macBind', macAddress);
    } else {
        localStorage.setItem('macBind', "");
    }

    try {
        getMac();
    } catch (e) {
        console.log(e)
    }
}