import Vue from 'vue';
import App from './App';
import { router } from './router';
import '@u/amfe-flexible';
import { interaction } from '@u/interaction'; //app交互文件
import "./font/iconfont.css";
Vue.prototype.$interaction = interaction

import "vant/lib/index.less"
if (process.env.NODE_ENV != 'dev') {
    localStorage.removeItem("appInfo")
}
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
})
new Vue({
    router,
    el: '#app',
    render: h => h(App)
});