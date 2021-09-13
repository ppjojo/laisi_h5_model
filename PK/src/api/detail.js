import request from "@u/request"
import {getQueryString} from '@u/tool'

var pkType=getQueryString("type");
var prefix="ropeSkipping"
if(pkType=="steps"){
    prefix="sportwatch"
}
//比赛详情
export function competitionDetail(data) {
    let apiUrl=prefix+"/competition/get/item"
    if(getQueryString("isShare")==1){
        apiUrl=`share/${prefix}/competition/get/item`
    }
    return request({
        url: apiUrl,
        method: 'post',
        params:data
    })
}

export function detailInfo(data) {
    let apiUrl=prefix+"/competition/detail/play"
    if(getQueryString("isShare")==1){
        apiUrl=`share/${prefix}/competition/detail/play`
    }
    return request({
        url:apiUrl,
        method: 'post',
        // data,
        params:data
    })
}
//比赛的参与转态
export function userAttendStatus(data) {//1 已参加 0 未参加 2 跑步
    return request({
        url: prefix+"/competition/user/is/attended",
        method: 'post', 
        // data,
        params:data
    })
}
//用户的跳绳次数
export function userTimesRemain(data) {
    return request({
        url: prefix+"/competition/user/times/remain",
        method: 'get',
        // data,
        params:data
    })
}
//退出比赛
export function userQuitCompetition(data) {
    return request({
        url: prefix+"/competition/user/quit",
        method: 'post',
        params:data
    })
}
//参加比赛
export function participateCompetition(data,type) {
    let apiUrl=prefix+"/competition/user/participate"
    if(type!="personal"){
        apiUrl=prefix+"/team/user/participate"
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
        url: prefix+"/team/count/remain",
        method: 'post',
        params:data
    })
}

//团队赛的队伍
export function teamListArr(data) {
    return request({
        url: prefix+"/team/list",
        method: 'post',
        params:data
    })
}






