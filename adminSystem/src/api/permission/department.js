import request from '@/utils/request'

export function listItem(params) {
    return request({
        url: '/permission/dept/deptAll',
        method: 'get',
        params
    })
}

export function addItem(data) {
    return request({
        url: '/permission/dept/addDeptSubmit',
        method: 'post',
        data
    })
}

export function updateItem(data) {
    return request({
        url: '/permission/dept/updateDeptSubmit',
        method: 'post',
        data
    })
}
export function deleteItem(params) {
    return request({
        url: '/permission/dept/deleteDeptByID',
        method: 'get',
        params
    })
}
export function deptTree(params) {
    return request({
        url: '/permission/queryDeptTree',
        method: 'get',
        params
    })
}
