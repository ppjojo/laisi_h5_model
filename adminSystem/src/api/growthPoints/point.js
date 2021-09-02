import request from "@/utils/request"

export function queryList(params) {
    return request({
        url: '/integral/actionDic/group/list',
        method: 'get',
        params
    })
}

//////积分模块
//列表
export function listModel(params) {
    return request({
        url: '/integral/model/list/all',
        method: 'get',
        params
    })
}
//新增
export function insertModel(data) {
    return request({
        url: '/integral/model/insert',
        method: 'post',
        data
    })
}
//更新
export function updateModel(data) {
    return request({
        url: '/integral/model/update',
        method: 'post',
        data
    })
}
//删除
export function deleteModel(params) {
    return request({
        url: '/integral/model/delete',
        method: 'get',
        params
    })
}

//////任务模块
//列表
export function listActionDic(params) {
    return request({
        url: '/integral/actionDic/list/all',
        method: 'get',
        params
    })
}
//新增
export function insertActionDic(data) {
    return request({
        url: '/integral/actionDic/insert',
        method: 'post',
        data
    })
}
//更新
export function updateActionDic(data) {
    return request({
        url: '/integral/actionDic/update',
        method: 'post',
        data
    })
}
//删除
export function deleteActionDic(params) {
    return request({
        url: '/integral/actionDic/delete',
        method: 'get',
        params
    })
}
export function timeGetAll(params) {
    return request({
        url: '/integral/time/setting/get/all',
        method: 'get',
        params
    })
}
export function updateTime(data) {
    return request({
        url: '/integral/time/setting/update/all',
        method: 'post',
        data,
    })
}
