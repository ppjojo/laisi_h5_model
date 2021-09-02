import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/helpCenter/manual/query/list',
        method: 'post',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/helpCenter/manual/upload',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/helpCenter/manual/edit',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/helpCenter/manual/delete',
        method: 'post',
        params
    })
}
