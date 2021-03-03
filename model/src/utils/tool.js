//android终端
var isAndroid =
  navigator.userAgent.indexOf("Android") > -1 ||
  navigator.userAgent.indexOf("Adr") > -1;
//iOS终端
var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//是否微信
var isWechat = navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
export {
    isAndroid,isIOS,isWechat
}
