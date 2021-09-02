import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/device/title/list',
        method: 'get',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/device/title/insert',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/device/title/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/device/title/delete',
        method: 'post',
        params
    })
}
