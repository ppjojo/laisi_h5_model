import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/watchpanel/resource/all',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/watchpanel/resource/insert',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/watchpanel/resource/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/watchpanel/resource/delete',
        method: 'get',
        params
    })
}
//查询
export function queryDial(params) {
    return request({
        url: '/watchpanel/resource/dialid',
        method: 'get',
        params
    })
}



//新增翻译
export function lanAddItem(data) {
    return request({
        url: '/watchpanel/language/insert',
        method: 'post',
        data
    })
}
//更新翻译
export function lanUpdateItem(data) {
    return request({
        url: '/watchpanel/language/update',
        method: 'post',
        data
    })
}
//查看详情
export function lanViewItem(params) {
    return request({
        url: '/watchpanel/language/query/item',
        method: 'get',
        params
    })
}