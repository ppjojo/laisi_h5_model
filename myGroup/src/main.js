import Vue from "vue";
import App from "./App";
import { router } from "./router";
import "@u/amfe-flexible";
import { interaction } from "@u/interaction"; //app交互文件
Vue.prototype.$interaction = interaction;

import "vant/lib/index.less";

if (process.env.NODE_ENV != "dev") {
  localStorage.removeItem("appInfo");
}
interaction.getAppInfoAndUserInfo();

new Vue({
  router,
  el: "#app",
  render: (h) => h(App),
});
