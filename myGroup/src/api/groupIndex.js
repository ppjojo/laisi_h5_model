import request from "@u/request"
export function getGroupInfo(data) {
    return request({
        url: 'myteam/homepage/group/detail',
        method: 'get',
        params:data
    })
}