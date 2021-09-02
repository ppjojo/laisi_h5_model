import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: 'uiconfig/itemLevel/see/all/item',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: 'uiconfig/itemLevel/insert/item',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: 'uiconfig/itemLevel/update/item',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: 'uiconfig/itemLevel/delete/item/ban',
        method: 'get',
        params
    })
}
