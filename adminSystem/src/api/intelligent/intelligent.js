import request from '@/utils/request'
export function allDefaultCourse(data) {
  return request({
    url: '/community/smartDefaultClass/see/all',
    method: 'post',
    data,
  })
}
export function addDefaultCourse(data) {
  return request({
    url: '/community/smartDefaultClass/insertOne',
    method: 'post',
    data,
  })
}
export function updateDefaultCourse(data) {
  return request({
    url: '/community/smartDefaultClass/updateOne',
    method: 'post',
    data,
  })
}

export function allCourse(data) {
  return request({
    url: '/community/smartClass/see/all',
    method: 'post',
    data,
  })
}
export function addCourse(data) {
  return request({
    url: '/community/smartClass/insertOne',
    method: 'post',
    data,
  })
}
export function updateCourse(data) {
  return request({
    url: '/community/smartClass/updateOne',
    method: 'post',
    data,
  })
}

export function allAction(data) {
  return request({
    url: '/community/smartAction/see/all',
    method: 'post',
    data,
  })
}
export function updateAction(data) {
  return request({
    url: '/community/smartAction/updateOne',
    method: 'post',
    data,
  })
}
export function addAction(data) {
  return request({
    url: '/community/smartAction/insertOne',
    method: 'post',
    data,
  })
}
export function getActionMovie(data) {
  return request({
    url: '/community/smartAction/get/ali/all/action',
    method: 'get',
    data,
    params:data
  })
}
export function allFood(data) {
  return request({
    url: '/community/smartFood/see/all',
    method: 'post',
    data,
  })
}
export function addFood(data) {
  return request({
    url: '/community/smartFood/insertOne',
    method: 'post',
    data,
  })
}
export function updateFood(data) {
  return request({
    url: '/community/smartFood/updateOne',
    method: 'post',
    data,
  })
}

export function allFoodType(data) {
  return request({
    url: '/community/smartFoodType/see/all',
    method: 'post',
    data,
  })
}
export function addFoodType(data) {
  return request({
    url: '/community/smartFoodType/insertOne',
    method: 'post',
    data,
  })
}
export function updateFoodType(data) {
  return request({
    url: '/community/smartFoodType/updateOne',
    method: 'post',
    data,
  })
}