import request from "@u/request"
import {getQueryString} from '@u/tool'
//比赛详情
export function competitionDetail(data) {
    let apiUrl="ropeSkipping/competition/get/item"
    if(getQueryString("isShare")==1){
        apiUrl="share/ropeSkipping/competition/get/item"
    }
    return request({
        url: apiUrl,
        method: 'post',
        params:data
    })
}

export function detailInfo(data) {
    let apiUrl="ropeSkipping/competition/detail/play"
    if(getQueryString("isShare")==1){
        apiUrl="share/ropeSkipping/competition/detail/play"
    }
    return request({
        url:apiUrl,
        method: 'post',
        // data,
        params:data
    })
}
//比赛的参与转态
export function userAttendStatus(data) {
    return request({
        url: "ropeSkipping/competition/user/is/attended",
        method: 'post',
        // data,
        params:data
    })
}
//用户的跳绳次数
export function userTimesRemain(data) {
    return request({
        url: "ropeSkipping/competition/user/times/remain",
        method: 'get',
        // data,
        params:data
    })
}
//退出比赛
export function userQuitCompetition(data) {
    return request({
        url: "ropeSkipping/competition/user/quit",
        method: 'post',
        params:data
    })
}
//参加比赛
export function participateCompetition(data,type) {
    let apiUrl="ropeSkipping/competition/user/participate"
    if(type!="personal"){
        apiUrl="ropeSkipping/team/user/participate"
    }
    return request({
        url:apiUrl,
        method: 'post',
        data,
        params:data
    })
}
//团队赛的剩余报名人数
export function teamPeopleRemain(data) {
    return request({
        url: "ropeSkipping/team/count/remain",
        method: 'post',
        params:data
    })
}

//团队赛的队伍
export function teamListArr(data) {
    return request({
        url: "ropeSkipping/team/list",
        method: 'post',
        params:data
    })
}






