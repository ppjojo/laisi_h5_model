import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/school_rk/device/searchRope',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/school_rk/device/addRope',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/school_rk/device/updateRope',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/school_rk/device/deleteRope',
        method: 'post',
        data
    })
}
//导入
export function importItem(data) {
    return request({
        url: '/school_rk/device/importRopes',
        method: 'post',
        data
    })
}

