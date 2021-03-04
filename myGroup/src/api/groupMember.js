import request from "@u/request"
export function listItem(data) {
    return request({
        url: 'club/clubGroupInfo',
        method: 'get',
        data,
        params:data
    })
}
export function TakeFocus(data) {
    return request({
        url: 'community-core/interest/add',
        method: 'post',
        data,
        params:data
    })
}