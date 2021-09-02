import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/school_rk/device/searchHub',
        method: 'post',
        data
    })
}
//新增
// export function addItem(data) {
//     return request({
//         url: '/school_rk/device/addRope',
//         method: 'post',
//         data
//     })
// }
//更新
export function updateItem(data) {
    return request({
        url: '/school_rk/device/updateHub',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/school_rk/device/deleteHub',
        method: 'post',
        data
    })
}
//导入
export function importItem(data) {
    return request({
        url: '/school_rk/device/importHubs',
        method: 'post',
        data
    })
}

