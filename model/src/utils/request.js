import axios from "axios";
import md5 from "js-md5";
import { Toast } from "vant";
import defaultSettings from "@/settings";
import { getQueryString } from "@u/tool";
import { interaction } from "@u/interaction"; //app交互文件

// create an axios instance
const service = axios.create({
  baseURL: defaultSettings.host, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    let isShare = getQueryString("isShare");
    let appInfo = JSON.parse(localStorage.getItem("appInfo"));
    if (isShare || !appInfo) {
      appInfo = {
        token: "SHARE",
        userId: getQueryString("userId") || "10",
      };
    }
    let token = appInfo.token;
    let random = Math.floor(Math.random() * 999999);
    let timestamp = new Date().getTime();
    config.headers.userId = appInfo.userId;
    config.headers.random = random;
    config.headers.timestamp = timestamp;
    let requestId = md5(timestamp + token + random);
    config.headers.requestId = requestId;
    config.headers.token = token;

    if (!config.params) config.params = {};
    config.params.appId = appInfo.appId;
    config.params.appVersion = appInfo.appVersion;
    config.params.platform = appInfo.platform;
    config.params.userId = appInfo.userId;
    config.params.timeZone = appInfo.timeZone;

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    interaction.getAppInfoAndUserInfo();
    if (res.code == 0) {
      return res;
    } else if (res.code == 2000) {//toke过期了
      return service(response.config);
    } else if (
      res.code == 400 ||
      res.code == 500 ||
      res.code == 1000 ||
      res.code == 1500 ||
      res.code == 2961
    ) {
      if (res) {
        Toast({
          message: res.msg || "Error",
        });
      } else {
        Toast({
          message: "系统异常",
        });
      }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
    Toast({
      message: "系统异常",
    });
    return Promise.reject(error);
  }
);

export default service;
