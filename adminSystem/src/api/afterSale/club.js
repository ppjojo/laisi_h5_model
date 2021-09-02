import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/club/getClubAllList',
        method: 'get',
        params
    })
}

export function searchListItem(params) {
    return request({
        url: '/club/searchClubList',
        method: 'get',
        params
    })
}
export function viewItem(params) {
    return request({
        url: '/club/clubDetail',
        method: 'get',
        params,
    })
}
export function todaySport(params) {
    return request({
        url: '/club/todaySport',
        method: 'get',
        params,
    })
}
export function clubExport(params) {
    return request({
        url: '/club/export',
        method: 'post',
        params,
    })
}

export function deleteItem(params) {
    return request({
        url: '/community-core/report/type/deleteOne',
        method: 'get',
        params,
    })
}





