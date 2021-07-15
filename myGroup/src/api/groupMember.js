import request from "@u/request"
export function listItem(data) {
    return request({
        url: 'myteam/member/search/allMember',
        method: 'post',
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

export function tansferGroupLeader(data) {
    return request({
        url: 'myteam/member/update/transfer',
        method: 'post',
        data,
        params:data
    })
}
export function tansferGroupLeaderAndOut(data) {
    return request({
        url: 'myteam/member/update/transferOut',
        method: 'post',
        data,
        params:data
    })
}

export function removeMember(data) {
    return request({
        url: 'myteam/member/batch/member',
        method: 'post',
        data,
        // params:data
    })
}
export function getMyFriend(data) {
    return request({
        url: 'myteam/invited/search/friendsList',
        method: 'get',
        // data,
        params:data
    })
}
export function inviteFriend(data) {
    return request({
        url: 'myteam/invited/list/insert',
        method: 'post',
        data,
        // params:data
    })
}
