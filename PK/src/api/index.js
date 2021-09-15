import request from "@u/request"
import {getQueryString} from '@u/tool'

var pkType=getQueryString("type");
var prefix="ropeSkipping"
if(pkType=="steps"){
    prefix="sportwatch"
}else if(pkType=="wristball"){
    prefix="wristball"
}else if(pkType=="wheel"){
    prefix="wheel"
}

export function listItemApi(data,type) {
    let api=prefix+"/competition/doing"
    if(type==0){
        api=prefix+"/competition/doing"
    }else if(type==1){
        api=prefix+"/competition/todo"
    }else{
        api=prefix+"/competition//user/attended"
    }
    return request({
        url: api,
        method: 'post',
        data,
    })
}

//邀请码确认
export function checkCode(data) {
    return request({
        url: prefix+"/competition/check/code",
        method: 'post',
        params:data
    })
}
//账号绑定的设备
export function boundDeviceCount(data) {
    return request({
        url: "device/get/bound/device",
        method: 'get',
        data
    })
}
//今日的创建次数
export function createTimes(data) {
    return request({
        url: prefix+"/competition/create/times/limit",
        method: 'POST',
        data
    })
}


//创建比赛
export function createCompetition(data) {
    return request({
        url: prefix+"/competition/create",
        method: 'post',
        data
    })
}


