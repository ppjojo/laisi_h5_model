import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/helpCenter/question/type/query/all',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/helpCenter/question/type/add/item',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/helpCenter/question/type/update/item',
        method: 'post',
        data
    })
}