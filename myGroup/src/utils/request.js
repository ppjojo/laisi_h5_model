import axios from "axios";
import md5 from "js-md5";
import { Toast } from "vant";
import defaultSettings from "@/settings";

// create an axios instance
const service = axios.create({
  baseURL: defaultSettings.host, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // console.log(config)
    let appInfo = JSON.parse(localStorage.getItem("appInfo"));
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
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // console.log(response)

    // if the custom code is not 0, it is judged as an error.
    console.log(response)
    if (res.code == 0) {
      return res;
    } else if (
      res.code == 400 ||
      res.code == 500 ||
      res.code == 1000 ||
      res.code == 1500 ||
      res.code == 2000
    ) {
      if(res){
        Toast({
          message: res.msg || "Error",
        });
      }
      return Promise.reject(res);
    }else {
      return res;
    }
  },
  (error) => {
    Toast({
      message: "系统异常",
    });
    return Promise.reject(error);
  }
);

export default service;
