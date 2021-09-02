import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/ota/appinfo/get/all',
        method: 'post',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/ota/appinfo/insert',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/ota/appinfo/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/ota/appinfo/delete/ids',
        method: 'post',
        params,
    })
}
