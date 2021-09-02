import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(params) {
    return request({
        url: '/school_rk/client/list',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/school_rk/client/add',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/school_rk/client/update',
        method: 'post',
        data
    })
}


//添加设备
export function deviceAdd(data) {
    return request({
        url: '/school_rk/device/add',
        method: 'post',
        data
    })
}

//编辑设备
export function deviceEdit(data) {
    return request({
        url: '/school_rk/device/update',
        method: 'post',
        data
    })
}

//展⽰客户设备
export function deviceList(params) {
    return request({
        url: '/school_rk/client/devices',
        method: 'get',
        params
    })
}

//删除设备
export function deviceDelete(params) {
    return request({
        url: '/school_rk/device/delete',
        method: 'get',
        params
    })
}

//批量导⼊绳⼦
export function importRopeList(data) {
    return request({
        url: '/school_rk/device/rope/import',
        headers:{
            "Content-Type":"multipart/form-data",
        },
        method: 'post',
        data
    })
}


//锁定镭雕
export function lockDevice(params) {
    return request({
        url: '/school_rk/device/lock',
        method: 'post',
        params
    })
}
//解锁镭雕
export function unLockDevice(params) {
    return request({
        url: '/school_rk/device/unlock',
        method: 'post',
        params
    })
}

//更换hub的mac
export function updateHub(data) {
    return request({
        url: '/school_rk/device/group/updateHub',
        method: 'post',
        data
    })
}


