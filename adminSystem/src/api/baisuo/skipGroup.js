import request from "@/utils/request"
//查询设备包含的绳组
export function deviceGroupList(params) {
    return request({
        url: '/school_rk/device/group/list',
        method: 'get',
        params
    })
}
//编辑mac
export function macEdit(data) {
    return request({
        url: '/school_rk/device/rope/update',
        method: 'post',
        data
    })
}
//绳组列表
export function groupList(data) {
    return request({
        url: '/school_rk/device/searchGroups',
        method: 'post',
        data
    })
}
//添加绳组
export function addDeviceGroup(data) {
    return request({
        url: '/school_rk/device/group/add',
        method: 'post',
        data
    })
}
//删除绳组
export function deleteDeviceGroup(data) {
    return request({
        url: '/school_rk/device/group/delete',
        method: 'post',
        data
    })
}