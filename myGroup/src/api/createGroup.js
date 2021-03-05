import request from "@u/request"
export function createGroup(data) {
    return request({
        url: 'myteam/group/create/myGroup',
        method: 'post',
        data,
        params:{nickname:JSON.parse(localStorage.getItem("appInfo")).nickname}
    })
}
export function upDateGroup(data) {
    return request({
        url: 'myteam/group/update/group',
        method: 'post',
        data,
        params:{nickname:JSON.parse(localStorage.getItem("appInfo")).nickname}
    })
}