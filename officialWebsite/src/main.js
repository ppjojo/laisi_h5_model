import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import "@u/amfe-flexible";
import "./styles/flex_ub.css";
import "./assets/icons/iconfont.css"
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n=new VueI18n({
    locale:localStorage.getItem('languageSet')||'zh',   //从localStorage里获取用户中英文选择，没有则默认中文
    messages:{
        'zh':require('./components/language/zh'),
        'en':require('./components/language/en')
    }
})
// Vue.config.productionTip = false
Vue.use(ElementUI);

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import animate from 'animate.css'

Vue.use(animate);

router.beforeEach((to, from, next) => {
    next()
    window.scrollTo(0,0)
})


new Vue({
	router,
	i18n,   //把 i18n 挂载到 vue 根实例上
	el: "#app",
	render: h => h(App),
}).$mount('#app')
