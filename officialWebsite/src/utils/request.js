import axios from 'axios'
import {  Message } from 'element-ui'
import defaultSettings from "../../settings";
import md5 from 'js-md5';

const service = axios.create({
  baseURL: defaultSettings.host, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    let token = "token"
    let random = Math.floor(Math.random() * 999999);
    config.headers.random = random;
    let timestamp = new Date().getTime();
    config.headers.timestamp = timestamp;
    let requestId = md5(timestamp + token + random);
    config.headers.requestId = requestId;
    config.headers.token = token;
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    if (res.code == 400 || res.code == 500 || res.code == 1000 || res.code == 1500||  res.code >2000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    }  else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
