import request from "@/utils/request"
import qs from 'qs'
//查询跳绳数据
export function skipSearch(params) {
    return request({
        url: '/share/ropeSkipping/search/data',
        method: 'get',
        params
    })
}
export function skipUpdate(data) {
    return request({
        url: '/ropeSkipping/data/record/update',
        method: 'post',
        data
    })
}

//查询腕力球数据
export function wristballSearch(params) {
    return request({
        url: '/wristball/search/data',
        method: 'get',
        params
    })
}

//搜索账户
export function searchAccount(params) {
    return request({
        url: '/account/search/account',
        method: 'get',
        params
    })
}
//测试环境删除用户
export function accountDelete(data) {
    return request({
        url: '/account/delete',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}
//查询子账户
export function memberList(data) {
    return request({
        url: '/account/member/list',
        method: 'post',
        data
    })
}
//设备版本信息
export function deviceVersionInfo(params) {
    return request({
        url: '/datastatistic-api/deviceUpgrade/getDeviceVersion',
        method: 'get',
        params
    })
}
//app版本信息
export function appVersionInfo(params) {
    return request({
        url: '/datastatistic-api/appUpgrade/getAppVersion',
        method: 'get',
        params
    })
}


//查询主账户绑定得设备
export function bindListByUserId(params) {
    return request({
        url: '/device/get/bound/device',
        method: 'get',
        params
    })
}
//查询子账户绑定设备
export function bindListByMemberId(params) {
    return request({
        url: '/device/bind/list/memberid',
        method: 'get',
        params
    })
}

/*上报得轨迹查询*/
export function trackingUploadDtatus(data) {
    return request({
        url: '/tracking/select/deviceMac/userId',
        method: 'post',
        data
    })
}

//查询个人主页卡片
export function cardListV2(data) {
    return request({
        url: '/newHomePage/v2/card/list',
        method: 'post',
        data
    })
}


/*手表相关*/
//查询步数数据
export function watchGetSport(data) {
    return request({
        url: '/sportwatch/steps/statistic',
        method: 'post',
        data
    })
}
//查询运动数据
export function watchGetHistory(data) {
    return request({
        url: '/sportwatch/run/history',
        method: 'post',
        data
    })
}
// //查询折叠项的listinfo
export function watchListInfo(data) {
    return request({
        url: '/sportwatch/run/list/info',
        method: 'post',
        data
    })
}
// //血氧查询
export function oxygenSearch(data) {
    return request({
        url: '/sportwatch/oxygen/statistic',
        method: 'post',
        data
    })
}
// //卡路里查询
export function calorySearch(data) {
    return request({
        url: '/sportwatch/calory/statistic',
        method: 'post',
        data
    })
}
// //心率查询
export function heartrateSearch(data) {
    return request({
        url: '/sportwatch/heartrate/statistic',
        method: 'post',
        data
    })
}
// //服务端手表数据查询
export function backgroundSearch(data) {
    return request({
        url: '/sportwatch/background/run/list',
        method: 'post',
        data
    })
}
// /*下载background详情查询*/
export function downloadDetail(data) {
    return request({
        url: '/sportwatch/background/detail/run',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        responseType:"blob",
        data:JSON.stringify(data)
    })
}
export function downloadHeart(data) {
    return request({
        url: '/sportwatch/background/detail/heartRate',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        responseType:"blob",
        data:JSON.stringify(data)
    })
}
//下载KML

export function downloadKMLDetail(data) {
    return request({
        url: '/sportwatch/background/detail/kml',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        responseType:"blob",
        data:JSON.stringify(data)
    })
}

// //服务端手表睡眠数据查询
export function backgroundSleepSearch(data) {
    return request({
        url: '/sportwatch/background/sleep/list',
        method: 'post',
        data
    })
}
// //服务端手表步数数据查询
export function backgroundStepSearch(data) {
    return request({
        url: '/sportwatch/background/steps/list',
        method: 'post',
        data
    })
}
// //服务端手表心率数据查询
export function backgroundHeartSearch(data) {
    return request({
        url: '/sportwatch/background/heart/list',
        method: 'post',
        data
    })
}
// //服务端手表血压数据查询
export function backgroundBD(data) {
    return request({
        url: '/sportwatch/background/bp/list',
        method: 'post',
        data
    })
}

// //服务端手表血氧数据查询
export function backgroundOxygen(data) {
    return request({
        url: '/sportwatch/background/oxygen/list',
        method: 'post',
        data
    })
}
// //服务端手表mac
export function MacList(params) {
    return request({
        url: '/device/bind/watch/mac/list/userId',
        method: 'get',
        params
    })
}
