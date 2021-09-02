import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getUInfo } from '@/utils/auth'
import md5 from 'js-md5';
import { router } from '@/router';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    //console.log(config)
    // do something before request is sent
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
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

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
  response => {
    const res = response.data
    //console.log(response)
    
    // if the custom code is not 0, it is judged as an error.
    if (res.code == 400 || res.code == 500 || res.code == 1000 || res.code == 1500||  res.code >2000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    } else if (res.code == 2000) {
      Message({
        message: '登录已过期！请重新登录',
        type: 'error',
        duration:  2* 1000
      })
      setTimeout(() => {
        store.dispatch('user/logout')
        router.push("/login?redirect="+location.hash.split("#")[1])
      }, 2000)
    } else {
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
