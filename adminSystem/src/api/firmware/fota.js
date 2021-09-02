import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/fota/get',
        method: 'get',
        params
    })
}
//详情view
export function viewItem(params) {
    return request({
        url: '/fota/get/id',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/fota/',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/fota/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/fota/delete/id',
        method: 'get',
        params
    })
}

//获取一条灰度信息

export function grayInfoItem(params) {
    return request({
        url: '/fota/gray/version/get',
        method: 'get',
        params
    })
}
//保存灰度信息
export function grayInfoAddItem(data) {
    return request({
        url: '/fota/gray/version/save',
        method: 'post',
        data
    })
}


//保存交管状态
export function changeCheckStatus(data) {
    return request({
        url: '/fota/checkStatus/set',
        method: 'post',
        data
    })
}