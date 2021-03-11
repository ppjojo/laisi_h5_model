import Vue from "vue";
import App from "./App";
import { router } from "./router";
import "@u/amfe-flexible";
import { interaction } from "@u/interaction"; //app交互文件
Vue.prototype.$interaction = interaction;
import "./styles/flex_ub.css";
import "vant/lib/index.less";

new Vue({
  router,
  el: "#app",
  render: (h) => h(App),
});
