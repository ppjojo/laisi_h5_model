import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/rate-admin/findByRateRoket',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/rate-admin/createRateRoket',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/rate-admin/updateRateRoket',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/rate-admin/deleteRateRoket',
        method: 'post',
        params
    })
}
