import request from "@/utils/request"
//列表
export function userListItem(params) {
    return request({
        url: '/community-core/report/stastic/queryByType',
        method: 'get',
        params
    })
}

export function listItem(params) {
    return request({
        url: '/community-core/report/type/queryAll',
        method: 'get',
        params
    })
}
export function addItem(data) {
    return request({
        url: '/community-core/report/type/insertOne',
        method: 'post',
        data,
    })
}
export function updateItem(data) {
    return request({
        url: '/community-core/report/type/updateOne',
        method: 'post',
        data,
    })
}

export function deleteItem(params) {
    return request({
        url: '/community-core/report/type/deleteOne',
        method: 'get',
        params,
    })
}





