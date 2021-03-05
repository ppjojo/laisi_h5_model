import request from "@u/request"
export function getGroupInfo(data) {
    return request({
        url: 'myteam/homepage/group/detail',
        method: 'get',
        params:data
    })
}
export function groupSettingInfo(data) {
    return request({
        url: 'myteam/group/query/groupData',
        method: 'get',
        params:data
    })
}
export function getAllMember(data) {
    return request({
        url: 'myteam/member/query/allMembers',
        method: 'get',
        params:data
    })
}