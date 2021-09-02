import request from "@/utils/request"
//列表包括废弃的
export function listItem(params) {
    return request({
        url: '/factory/allTestTypeList',
        method: 'get',
        params
    })
}
export function listItem2(params) {
    return request({
        url: '/factory/queryTestTypeList',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/factory/saveTestType',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/factory/updateTestType',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/factory/deleteTestType',
        method: 'post',
        params
    })
}
