import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/helpCenter/manual/query/all',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/helpCenter/manual/insert/item',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/helpCenter/manual/update/item',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/helpCenter/manual/delete/id',
        method: 'get',
        params
    })
}
