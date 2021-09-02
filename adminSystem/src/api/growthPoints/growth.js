import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/grow/queryActionList',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/grow/addAction',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/grow/updateGrowthChangeByActionId',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/grow/deleteByActionId',
        method: 'get',
        params
    })
}
