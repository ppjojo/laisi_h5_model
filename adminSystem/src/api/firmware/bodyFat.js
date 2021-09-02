import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/balanceFirmware/get',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/balanceFirmware/',
        method: 'post',
        data
    })
}
//编辑
export function updateItem(data) {
    return request({
        url: '/balanceFirmware/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/balanceFirmware/delete/id',
        method: 'get',
        params
    })
}