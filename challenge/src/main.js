import Vue from 'vue';
import App from './App';
import { router } from './router';
import '@u/amfe-flexible';
import { interaction } from '@u/interaction';//app交互文件
// import '@/icons'//icons
Vue.prototype.$interaction = interaction
import "./styles/flex_ub.css";
import "./assets/font/iconfont.css";
import "vant/lib/index.less"
if(process.env.NODE_ENV != 'dev'){
  localStorage.removeItem("appInfo")
}
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
