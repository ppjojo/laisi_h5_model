import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: 'uiconfig/itemLevelBan/see/all/ban/date',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: 'uiconfig/itemLevelBan/insert/item/ban',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: 'uiconfig/itemLevelBan/update/item/ban',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: 'uiconfig/itemLevelBan/delete/item/ban',
        method: 'get',
        params
    })
}
