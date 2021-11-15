//version 20211029
var host = "https://lstest3.laisitech.com/";

//Android终端
var isAndroid =
    navigator.userAgent.indexOf("Android") > -1 ||
    navigator.userAgent.indexOf("Adr") > -1;
//iOS终端
var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//是否微信
var isWechat =
    navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
//rem单位的集中处理
document.documentElement.style.fontSize =
    document.documentElement.clientWidth / 7.5 + "px";
window.onresize = function() {
    document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 7.5 + "px";
};
themeChange();
//主题切换
function themeChange() {
    if (localStorage.getItem("appInfo")) {
        var appInfo = JSON.parse(localStorage.getItem("appInfo"));
        theme = appInfo.theme
    } else if (getQueryString("theme")) {
        theme = getQueryString("theme")
    }
    if (theme == 'black') {
        if (document.getElementById("themeCssLink")) {
            document.getElementById("themeCssLink").href = "../common/css/theme_black.css"
        } else if (document.getElementById("themeCssLink2")) {
            document.getElementById("themeCssLink2").href = "../../common/css/theme_black.css"
        }

    } else if (theme == 'white') {
        if (document.getElementById("themeCssLink")) {
            document.getElementById("themeCssLink").href = "../common/css/theme_white.css"
        } else if (document.getElementById("themeCssLink2")) {
            document.getElementById("themeCssLink2").href = "../../common/css/theme_white.css"
        }

    }
}




//接口请求统一处理
let ajax = (config) => {
    return new Promise(function(resolve, reject) {
        Interaction.getAppInfoAndUserInfo();
        if (!config.data) config.data = Object.assign({}, config.data)
        if (getQueryString("isShare") == 1 || config.isShare == 1) {
            config.isShare = 1
            config.data.userId = getQueryString("userId") || "10000";
            resolve(config);
            return;
        }

        let tokenInterval = setInterval(() => {
            if (localStorage.getItem("appInfo")) {
                console.log("gettoken success")
                var appInfo = JSON.parse(localStorage.getItem("appInfo"));
                config.data.userId = appInfo.userId
                themeChange();
                resolve(config);
                clearInterval(tokenInterval);
            }
        }, 100);
    }).then((res) => {
        return ajaxResolve(res);
    })
};

let ajaxResolve = (config) => {
    return new Promise(function(resolve, reject) {
        var ajaxData = {
            type: (config.type || "GET").toUpperCase(),
            url: host + config.url || "",
            async: config.async || "true",
            data: config.data || null,
            dataType: config.dataType || "json",
            contentType: config.contentType || "application/json; charset=utf-8",
            beforeSend: config.beforeSend || function() {},
            success: config.success || function() {},
            error: config.error || function() {},
        };
        ajaxData.beforeSend();
        var xhr = new XMLHttpRequest();
        xhr.responseType = ajaxData.dataType;

        var params = [];
        for (var key in ajaxData.data) {
            if (typeof ajaxData.data[key] != "object")
                params.push(key + "=" + ajaxData.data[key]);
        }
        var sendData = params.join("&");

        if (ajaxData.contentType == "multipart/form-data") {
            xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
        } else {
            xhr.open(ajaxData.type, ajaxData.url + "?" + sendData, ajaxData.async);
        }

        //设置请求头
        var timestamp = new Date().getTime()
        if (localStorage.getItem("appInfo") && config.isShare != 1) {
            var appInfo = JSON.parse(localStorage.getItem("appInfo"));
            var unorderedHeaderObj = {
                    appId: appInfo.appId || "",
                    timestamp: timestamp,
                    version: "v1",
                    token: appInfo.token || "",
                    platform: appInfo.platform || "",
                    appVersion: appInfo.appVersion || "",
                    timeZone: appInfo.timeZone || "",
                    userId: appInfo.userId,
                }
                //unorderedHeaderObj = Object.assign(unorderedHeaderObj, config.data)
            const orderedHeaderObj = {};
            Object.keys(unorderedHeaderObj).sort().forEach(function(key) {
                orderedHeaderObj[key] = unorderedHeaderObj[key];
            });
            let sign = [];
            for (var key in orderedHeaderObj) {
                xhr.setRequestHeader(key, orderedHeaderObj[key]);
                sign.push(key + "=" + orderedHeaderObj[key]);
            }
            sign.push("APP_SECRET=" + appInfo.appSecret)
            sign = sign.join("&");
            // console.log(sign)
            xhr.setRequestHeader("LAISIH5", "LAISIH5");
            xhr.setRequestHeader("sign", md5(sign).toLocaleUpperCase());
        } else {
            xhr.setRequestHeader("timestamp", timestamp);
            xhr.setRequestHeader("userId", config.data.userId);
        }





        if (ajaxData.type.toUpperCase() == "GET") {
            xhr.send(null);
        } else {
            if (ajaxData.contentType == "multipart/form-data") {
                xhr.send(ajaxData.data.formdata);
            } else {
                xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                xhr.send(JSON.stringify(ajaxData.data));
            }
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (parseInt(xhr.response.code) == 2000) {
                        Interaction.getAppInfoAndUserInfo();
                        localStorage.removeItem("appInfo")
                        return ajax(config)
                    } else {
                        ajaxData.success(xhr.response);
                        return resolve(xhr.response);
                    }
                } else {
                    ajaxData.error();
                    return reject(xhr.response);
                }
            }
        };
    })
}

/*** 获取地址栏问号后面所传的值 ***/
function getQueryString(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.href.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
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

/*与原生的交互*/
var Interaction = {
    appNative: function(method, param) {
        //h5调用app原生
        try {
            if (isIOS) {
                param.method = method;
                window.webkit.messageHandlers.lstNative.postMessage(param);
            } else if (isAndroid) {
                window.android[method](JSON.stringify(param));
            }
        } catch (e) {
            console.log(e);
        }
    },
    //获取app设备的信息 以及token信息
    getAppInfoAndUserInfo: function() {
        try {
            if (isIOS) {
                window.webkit.messageHandlers.lstNative.postMessage("getAppInfo");
            } else if (isAndroid) {
                this.getAppInfo(window.android.getAppInfo());
            }
        } catch (e) {
            console.log("===================重新获取appInfo==================");
        }
    },
    //获取app设备的信息 以及token信息的回调
    getAppInfo: function(info) {
        localStorage.setItem("appInfo", info);
    },


    //新开一个原生得window窗口
    pushToNextVC: function(htmlUrl) {
        // ios reservedStatusBarHeight=1 页面从手机状态栏开始显示<br>
        // hideTitle=1 页面从手机状态栏下面开始显示并隐藏标题栏<br>
        // isFullScreen=1 页面隐藏手机状态栏以及标题栏<br>
        //hideStatusBarHeight 安卓
        if (!htmlUrl) return;
        this.appNative("pushToNextVC", {
            htmlUrl: htmlUrl, //'/h5/h5V2/xx/xx.html' ios  // android host+'h5/h5V2/xx/xx.html'
        });
    },
    //关闭当前的h5窗口
    closePage: function() {
        try {
            if (isIOS) {
                window.webkit.messageHandlers.lstNative.postMessage({
                    method: "goBack",
                });
            } else if (isAndroid) {
                window.android.goBack();
            }
        } catch (e) {
            console.log(e);
        }
    },

    //H5调用原生的方法传入标题描述地址进行分享
    sharePage: function(info) {
        if (!info) return;
        this.appNative("sharePage", {
            title: info.title,
            description: info.description,
            url: info.url,
        });
    },
    //H5调原生分享模板，链接分享模板，模板中又存在截图分享功能
    LSTH5APP_UrlAndSheetImageShareModel: function(info) {
        if (!info) return;
        // shareTitle: "11",
        // 	shareContent: "22",
        // 	shareUrl: "sportsReport/index.html",
        this.appNative("LSTH5APP_UrlAndSheetImageShareModel", {
            shareTitle: info.shareTitle,
            shareContent: info.shareContent,
            shareUrl: info.shareUrl,
        });
    },

    //点击用户头像或者昵称，跳转到原生个人主页
    visitPersonalHomepage: function(userId) {
        if (!userId) return;
        this.appNative("visitPersonalHomepage", {
            visitUserId: userId,
        });
    },
    VIDEO_flag: false,
    //app端h5页面出现后会主动调用这个方法 可用于刷新页面
    appWebviewOpen: function(param) {
        if (typeof initPageData != "undefined") {
            if (this.VIDEO_flag && isAndroid) return;
            if (isAndroid) this.VIDEO_flag = true;
            initPageData(param);
        }
        console.log("appWebviewOpen");
    },
    //app端h5页面消失后会主动调用这个方法 暂无用处
    appWebviewClose: function() {
        console.log("appWebviewClose");
    },
    //友盟的埋点功能
    umengStatistics: function(event, bannerId) {
        this.appNative("umengStatistics", {
            event: event,
            bannerId: bannerId,
        });
    },
};

window.getAppInfo = Interaction.getAppInfo;
//app回调的方法的看项目情况加在页面之中
window.appWebviewOpen = Interaction.appWebviewOpen;
window.appWebviewClose = Interaction.appWebviewClose;
// window.getConnectedMac = this.getConnectedMac;