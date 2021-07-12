import request from "@u/request"
export function listItem(data) {
    return request({
        url: 'myteam/group/member/attend',
        method: 'get',
        params:data
    })
}