import Vue from 'vue';
import App from './App';
import { router } from './router';
import '@u/amfe-flexible';
import { isAndroid,isIOS } from '@u/tool';//工具类
import { interaction } from '@u/interaction';//app交互文件
Vue.prototype.$interaction = interaction

import "vant/lib/index.less"

interaction.getAppInfoAndUserInfo()

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
