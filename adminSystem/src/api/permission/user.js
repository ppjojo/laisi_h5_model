import request from '@/utils/request'

export function listItem(params) {
    return request({
        url: '/permission/user/userAll',
        method: 'get',
        params
    })
}

export function addItem(data) {
    return request({
        url: '/permission/user/addUserSubmit',
        method: 'post',
        data
    })
}
export function updateItem(data) {
    return request({
        url: '/permission/user/updateUserSubmit',
        method: 'post',
        data
    })
}
export function deleteItem(params) {
    return request({
        url: '/permission/user/deleteUserByIds',
        method: 'get',
        params
    })
}

export function userRoleByUserId(params) {
    return request({
        url: '/permission/user/getUserRoleByUserId',
        method: 'get',
        params
    })
}

