import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/watchpanel/picture/query/list',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/watchpanel/picture/insert',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/watchpanel/picture/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/watchpanel/picture/delete',
        method: 'get',
        params
    })
}



//新增表盘界面详情大图
export function customizeInsert(data) {
    return request({
        url: '/watchpanel/customize/insert',
        method: 'post',
        data
    })
}


//更新表盘界面详情大图
export function customizeUpdate(data) {
    return request({
        url: '/watchpanel/customize/update',
        method: 'post',
        data
    })
}


//大表盘详情
export function customizeDetail(params) {
    return request({
        url: '/watchpanel/customize/query/resourceId',
        method: 'post',
        params
    })
}
