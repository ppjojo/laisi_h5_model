import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/helpCenter/device/get/all',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/helpCenter/device/insert/item',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/helpCenter/device/update/item',
        method: 'post',
        data
    })
}
//del
export function deleteItem(data) {
    return request({
        url: '/helpCenter/device/delete/id',
        method: 'get',
        params:data
    })
}
