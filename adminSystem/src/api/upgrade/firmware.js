import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/ota/resources/firmware/all',
        method: 'get',
        params
    })
}
export function viewItem(params) {
    return request({
        url: '/ota/resources/firmware/info',
        method: 'get',
        params
    })
}
export function addItem(data) {
    return request({
        url: '/ota/resources/firmware/add',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/ota/resources/firmware/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/ota/resources/firmware/delete',
        method: 'post',
        data
    })
}
