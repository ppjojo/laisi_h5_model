import request from "@/utils/request"
//列表包括废弃的
export function listItem(params) {
    return request({
        url: '/factory/allFactoryList',
        method: 'get',
        params
    })
}
export function listItem2(params) {
    return request({
        url: '/factory/queryFactoryList',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/factory/saveFactory',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/factory/updateFactory',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/factory/deleteFactory',
        method: 'post',
        params
    })
}
