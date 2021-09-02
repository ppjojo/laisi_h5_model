import request from '@/utils/request'
import qs from "qs"

// 获取跳绳PK赛列表:
export function listItem(params) {
  return request({
    url: '/ropeSkipping/competition/criteria/query',
    method: 'post',
    params
  })
}
// 添加官方比赛
export function addItem(data) {
  return request({
    url: '/ropeSkipping/competition/create',
    method: 'post',
    data,
    params:{
      userId:1
    }
  })
}

// 编辑官方比赛
export function updateItem(data) {
  return request({
    url: '/ropeSkipping/competition/update/item',
    method: 'post',
    data,
    params:{
      userId:1
    }
  })
}
//删除比赛
export function deleteItem(params) {
  return request({
    url: '/ropeSkipping/competition/delete/item',
    method: 'post',
    params
  })
}

//获取比赛详情
export function detailItem(params) {
  return request({
    url: '/ropeSkipping/competition/get/item',
    method: 'post',
    params
  })
}

//赛况详情
export function joinItem(data) {
  return request({
    url: '/ropeSkipping/competition/detail/background',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: 'post',
    data: qs.stringify(data),
  })
}
