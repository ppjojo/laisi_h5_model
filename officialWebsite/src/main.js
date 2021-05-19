import Vue from 'vue'
import App from './App.vue'
import {
	router
} from "./router";
// import "@u/amfe-flexible";
import "./styles/flex_ub.css";
Vue.config.productionTip = false

new Vue({
	router,
	el: "#app",
	render: h => h(App),
}).$mount('#app')
