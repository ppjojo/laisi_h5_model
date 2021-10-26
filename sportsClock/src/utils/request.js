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
service.interceptors.request.use((config) => {
  let appInfo = {}
  if (getQueryString('isShare')||getQueryString('isShare2')) {
    appInfo = {
      token: "SHARE",
      userId: getQueryString("userId") || "",
    }
  } else {
    appInfo = JSON.parse(localStorage.getItem("appInfo"))
  }
  //设置请求头
  let timestamp = new Date().getTime();
  var unorderedHeaderObj = {
    appId: appInfo.appId || "",
    timestamp: timestamp,
    version: "v1",
    token: appInfo.token || "",
    platform: appInfo.platform || "",
    appVersion: appInfo.appVersion || "",
    timeZone: appInfo.timeZone || "",
    userId: appInfo.userId,
  }
  //unorderedHeaderObj = Object.assign(unorderedHeaderObj, config.data)
  const orderedHeaderObj = {};
  Object.keys(unorderedHeaderObj).sort().forEach(function (key) {
    orderedHeaderObj[key] = unorderedHeaderObj[key];
  });
  let sign = [];
  for (var key in orderedHeaderObj) {
    config.headers[key] = orderedHeaderObj[key];
    sign.push(key + "=" + orderedHeaderObj[key]);
  }
  sign.push("APP_SECRET="+appInfo.appSecret)
  sign = sign.join("&");
  config.headers.LAISIH5= "LAISIH5";
  config.headers.sign= md5(sign).toLocaleUpperCase();
 
   return config;
});

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 0) {
      return res;
    }else if(res.code==2000){
      if (process.env.NODE_ENV != "dev"&&!getQueryString('isShare')&&!getQueryString('isShare2')) {
        interaction.getAppInfoAndUserInfo();
        return service.request(response.config)
      }
    }else if (
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

let getToken = (config) => {

  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV == "dev") {
      resolve(config);
    }
    if(getQueryString('isShare')||getQueryString('isShare2')){
      resolve(config);
      return 
    }
    interaction.getAppInfoAndUserInfo();
    let tokenInterval=setInterval(()=>{
      if(localStorage.getItem('appInfo')){
        resolve(config);
        clearInterval(tokenInterval)
      }
    },100)
    //resolve(config);
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
