import request from '@/utils/request'

export function listItem(params) {
    return request({
        url: '/permission/menu/menuAll',
        method: 'get',
        params
    })
}

export function addItem(data) {
    return request({
        url: '/permission/menu/addMenuSubmit',
        method: 'post',
        data
    })
}

export function updateItem(data) {
    return request({
        url: '/permission/menu/updateMenuSubmit',
        method: 'post',
        data
    })
}
export function deleteItem(params) {
    return request({
        url: '/permission/menu/deleteMenuById',
        method: 'get',
        params
    })
}
export function menuTree(params) {
    return request({
        url: '/permission/menu/queryMenuTree',
        method: 'get',
        params
    })
}

export function menuPermissonByUserId(params) {
    return request({
        url: '/permission/getUserPermissions',
        method: 'get',
        params
    })
}
