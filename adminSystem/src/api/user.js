import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/permission/loginIn',
    method: 'get',
    params:data
  })
}
export function getVerifyCode(data) {
  return request({
    url: '/permission/verifyCode',
    responseType: 'blob',
    method: 'get',
    data
  })
}

export function changePwd(data) {
  return request({
    url: '/permission/user/modifyPassword',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
