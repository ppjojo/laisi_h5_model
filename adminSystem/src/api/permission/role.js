import request from '@/utils/request'
import qs from "qs"

export function listItem(params) {
    return request({
        url: '/permission/role/roleAll',
        method: 'get',
        params
    })
}

export function addItem(data) {
    return request({
        url: '/permission/role/addRoleSubmit',
        method: 'post',
        data
    })
}

export function updateItem(data) {
    return request({
        url: '/permission/role/updateRoleSubmit',
        method: 'post',
        data
    })
}
export function deleteItem(params) {
    return request({
        url: '/permission/role/deleteRoleById',
        method: 'get',
        params
    })
}
export function roleTree(params) {
    return request({
        url: '/permission/queryRoleTree',
        method: 'get',
        params
    })
}

export function addPremission(data) {
    return request({
        url: '/permission/role/addPremSubmit',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}