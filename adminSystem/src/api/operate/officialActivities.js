import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/uiconfig/hotActivity/all',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/uiconfig/hotActivity/add',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/uiconfig/hotActivity/update',
        method: 'post',
        data
    })
}
// //删除
// export function deleteItem(params) {
//     return request({
//         url: '/device/language/delete',
//         method: 'post',
//         params
//     })
// }
