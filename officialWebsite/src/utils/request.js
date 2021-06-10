import axios from "axios";
import md5 from "js-md5";
import defaultSettings from "../../settings";
import {
  getQueryString
} from "@u/tool";

// create an axios instance
const service = axios.create({
  baseURL: defaultSettings.host, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});


// request interceptor
service.interceptors.request.use((config) => {
  let token = "token"
  if (getUInfo()) {
    let userId = null;
    userId = JSON.parse(getUInfo()).id;
    config.headers.userId = userId;
    token = JSON.parse(getUInfo()).accessToken;
  }
  let random = Math.floor(Math.random() * 999999);
  config.headers.random = random;
  let timestamp = new Date().getTime();
  config.headers.timestamp = timestamp;
  let requestId = md5(timestamp + token + random);
  config.headers.requestId = requestId;
  config.headers.token = token;
  return config

});

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 0) {
      return res;
    } else if (res.code == 2000) {
      if (process.env.NODE_ENV != "dev" && !getQueryString('isShare')) {
        interaction.getAppInfoAndUserInfo();
        return service.request(response.config)
      }
    } else if (
      res.code == 400 ||
      res.code == 500 ||
      res.code == 1000 ||
      res.code == 1500 ||
      res.code == 2961
    ) {
      if (res) {
        this.$message.error({
          message: res.msg || "Error",
        });
      } else {
        this.$message.error({
          message: "系统异常",
        });
      }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  (error) => {
    this.$message.error({
      message: "系统异常",
    });
    console.log(error);
    return Promise.reject(error);
  }
);

let getToken = (config) => {

  return new Promise(function (resolve, reject) {
    if (process.env.NODE_ENV == "dev") {
      resolve(config);
    }
    if (getQueryString('isShare')) {
      resolve(config);
      return
    }
    interaction.getAppInfoAndUserInfo();
    let tokenInterval = setInterval(() => {
      if (localStorage.getItem('appInfo')) {
        resolve(config);
        clearInterval(tokenInterval)
      }
    }, 100)
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