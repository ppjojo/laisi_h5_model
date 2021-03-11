import { isAndroid, isIOS } from "@u/tool";
import defaultSettings from "@/settings";
var interaction = {
  appNative: function(method, param) {
    //h5调用app原生
    if (!param) param = {};
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
    return new Promise((resolve, reject) => {
      resolve();
    });
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
      console.log(e);
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
    var lastHtmlUrl = "";
    if (isIOS) {
      lastHtmlUrl = "/" + htmlUrl;
    } else {
      lastHtmlUrl = defaultSettings.host + "/" + htmlUrl;
    }
    this.appNative("pushToNextVC", {
      htmlUrl: lastHtmlUrl, //'/h5/h5V2/xx/xx.html' ios  // android host+'h5/h5V2/xx/xx.html'
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

  //点击用户头像或者昵称，跳转到原生个人主页
  visitPersonalHomepage: function(userId) {
    if (!userId) return;
    this.appNative("visitPersonalHomepage", {
      visitUserId: userId,
    });
  },

  //获取连接中的所有蓝牙mac 然后app端会回调getConnectedMac方法
  gotoGetConnectedMac: function() {
    try {
      if (isIOS) {
        window.webkit.messageHandlers.lstNative.postMessage("getConnectedMac");
      } else if (isAndroid) {
        getConnectedMac(window.android.getConnectedMac());
      }
    } catch (e) {
      console.log(e);
    }
  },
  //获取到连接中的mac地址的回调
  // getConnectedMac: function(list) {
  //   /*{r10mac:1111,t20mac:222,t18mac:3333,q20:444}*/
  //   var linkList = JSON.parse(list);
  // },
  VIDEO_flag: false,
  //app端h5页面出现后会主动调用这个方法 可用于刷新页面
  appWebviewOpen: function(param) {
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
window.appWebviewOpen = () => {};
window.appWebviewClose = () => {};
window.getAppInfo=interaction.getAppInfo

export { interaction };
