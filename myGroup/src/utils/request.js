import axios from "axios";
import md5 from "js-md5";
import { Toast } from "vant";
import defaultSettings from "@/settings";
import { getQueryString } from "@u/tool";
import { interaction } from "@u/interaction"; //app交互文件
import axiosRetry from "axios-retry";
import { isAndroid, isIOS } from "@u/tool";

// create an axios instance
const service = axios.create({
  baseURL: defaultSettings.host, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});
axiosRetry(service, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // 重复请求延迟
  },
});

// request interceptor
service.interceptors.request.use((config) => {
  let appInfo = Object.assign(
    {
      token: "SHARE",
      userId: getQueryString("userId") || "10001285",
    },
    JSON.parse(localStorage.getItem("appInfo"))
  );
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
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(response.config);
    if (res.code == 0) {
      return res;
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
    Toast({
      message: "系统异常",
    });
    console.log(error);
    return Promise.reject(error);
  }
);

// window.getAppInfo = function(info) {
//   localStorage.setItem("appInfo", info);
// };

let getToken = (config) => {
  return new Promise(function(resolve, reject) {
    try {
      if (isIOS) {
        window.webkit.messageHandlers.lstNative.postMessage("getAppInfo");
        resolve(config);
      } else if (isAndroid) {
        resolve(config);
      }
    } catch (e) {
      console.log(e);
    }
  }).then(
    (res) => {
      return service(res);
    }, // 成功
    (err) => {
      console.log(err);
    } // 失败
  );
};
export default getToken;
