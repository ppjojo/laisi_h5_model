import request from "@u/request"
export function listItemApi(data,type) {
    let api="ropeSkipping/competition/doing"
    if(type==0){
        api="ropeSkipping/competition/doing"
    }else if(type==1){
        api="ropeSkipping/competition/todo"
    }else{
        api="ropeSkipping/competition//user/attended"
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
        url: "ropeSkipping/competition/check/code",
        method: 'post',
        data
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
        url: "ropeSkipping/competition/create/times/limit",
        method: 'POST',
        data
    })
}


//创建比赛
export function createCompetition(data) {
    return request({
        url: "ropeSkipping/competition/create",
        method: 'post',
        data
    })
}


