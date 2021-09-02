import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/community-core/recommend/show/recommend',
        method: 'get',
        params
    })
}
export function addItem(data) {
    return request({
        url: '/community-core/recommend/add/recommend',
        method: 'post',
        data,
    })
}

export function deleteItem(data) {
    return request({
        url: '/community-core/recommend/remove/recommend',
        method: 'post',
        data,
    })
}
export function updateItem(data) {
    return request({
        url: 'community-core/recommend/update',
        method: 'post',
        data,
    })
}



export function queryUser(params) {
    return request({
        url: '/community-core/interest/search/account',
        method: 'get',
        params,
    })
}



