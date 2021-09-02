import request from "@/utils/request"

export function teamTotal(params) {
    return request({
        url: '/myteam/background/group/count',
        method: 'get',
        params
    })
}

export function groupDateCount(params) {
    return request({
        url: 'myteam/background/group/date/count ',
        method: 'get',
        params
    })
}
export function groupDateActivty(params) {
    return request({
        url: 'myteam/background/group/activty ',
        method: 'get',
        params
    })
}