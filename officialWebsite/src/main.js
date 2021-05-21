import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "./router";
// import "@u/amfe-flexible";
import "./styles/flex_ub.css";
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
	router,
	el: "#app",
	render: h => h(App),
}).$mount('#app')
