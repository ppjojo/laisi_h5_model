import Vue from 'vue';
import App from './App';
import { router } from './router';
import '@u/amfe-flexible';
import { isAndroid,isIOS } from '@u/tool';//工具类
import { interaction } from '@u/interaction';//app交互文件
import '@/icons'//icons
Vue.prototype.$interaction = interaction

import "vant/lib/index.less"

  try {
    if (isIOS) {
      window.webkit.messageHandlers.lstNative.postMessage("getAppInfo");
    } else if (isAndroid) {
      localStorage.setItem("appInfo", window.android.getAppInfo());
    }
  } catch (e) {
    console.log(e);
  }
  window.getAppInfo = (appInfo)=>{
    localStorage.setItem("appInfo", appInfo);
  };
 





new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
