/**产品分类 */
import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/device/group/list/all',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/device/group/insert',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/device/group/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/device/group/delete',
        method: 'post',
        params
    })
}
