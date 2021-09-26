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
    url: '/community/cSmallClass/see/all/action',
    method: 'post',
    data,
  })
}
export function updateAction(data) {
  return request({
    url: '/community/cSmallClass/update',
    method: 'post',
    data,
  })
}
export function addAction(data) {
  return request({
    url: '/community/cSmallClass/save',
    method: 'post',
    data,
  })
}
export function getActionMovie(data) {
  return request({
    url: '/community/smartAction/see/all',
    method: 'post',
    data,
  })
}