import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/helpCenter/faq/query',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/helpCenter/faq/insert/item',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/helpCenter/faq/update/item',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/helpCenter/faq/delete/id',
        method: 'post',
        params
    })
}
//修改问题是否为hot状态 --请求参数：ids, hot, enviroment
export function addHot(params) {
    return request({
        url: '/helpCenter/faq/change/hots',
        method: 'post',
        params
    })
}

//新增翻译
export function lanAddItem(data) {
    return request({
        url: '/helpCenter/language/add',
        method: 'post',
        data
    })
}
//更新翻译
export function lanUpdateItem(data) {
    return request({
        url: '/helpCenter/language/update',
        method: 'post',
        data
    })
}
//查看详情
export function lanViewItem(params) {
    return request({
        url: '/helpCenter/language/query/list',
        method: 'get',
        params
    })
}
