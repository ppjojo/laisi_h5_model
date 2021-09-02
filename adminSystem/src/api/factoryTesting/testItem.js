import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/factory/queryTestItemList',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/factory/saveTestItem',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/factory/updateTestItem',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/factory/deleteTestItem',
        method: 'post',
        params
    })
}
