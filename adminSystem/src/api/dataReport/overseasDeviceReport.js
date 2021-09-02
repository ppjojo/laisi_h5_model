import request from "@/utils/request"

//绑定设备统计总个数统计
export function deviceTotal(data) {
    return request({
        url: '/device/date/bind/total',
        method: 'get',
        data
    })
}
//绑定设备统计  按天统计
export function deviceDayList(data) {
    return request({
        url: '/device/date/bind/list',
        method: 'get',
        data
    })
}

//欧洲绑定情况
export function eurDeviceTotal(data) {
    return request({
        url: '/syncmanager/eur/bindReport',
        method: 'get',
        data
    })
}
//欧洲版本统计
export function eurDeviceVerdion(data) {
    return request({
        url: '/datastatistic-api/eur/getEurDeviceVersion',
        method: 'get',
        data
    })
}
//欧洲搜索设备
export function eursearchDevice(data,params) {
    return request({
        url: '/syncmanager/eur/searchDevice',
        method: 'post',
        data,
        params:params
    })
}


//usa绑定情况
export function usaDeviceTotal(data) {
    return request({
        url: '/syncmanager/usa/bindReport',
        method: 'get',
        data
    })
}
//usa版本统计
export function usaDeviceVerdion(data) {
    return request({
        url: '/datastatistic-api/usa/getUsaDeviceVersion',
        method: 'get',
        data
    })
}
export function deviceVerdion(data) {
    return request({
        url: '/datastatistic-api/deviceUpgrade/getDeviceVersionCheckStatus',
        method: 'get',
        data
    })
}

//usa搜索设备
export function usasearchDevice(data,params) {
    return request({
        url: '/syncmanager/usa/searchDevice',
        method: 'post',
        data,
        params:params
    })
}
// /*下载background详情查询eur*/
export function downloadEurExcel(data) {
    return request({
        url: '/syncmanager/eur/excel/export',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        responseType:"blob",
        data:JSON.stringify(data)
    })
}
// /*下载background详情查询usa*/
export function downloadUsaExcel(data) {
    return request({
        url: '/syncmanager/usa/excel/export',
        method: 'post',
        headers:{
            "Content-Type":"application/json",
        },
        responseType:"blob",
        data:JSON.stringify(data)
    })
}
//各国绑定数量
export function groupByCountry(data) {
    return request({
        url: '/syncmanager/eur/groupByCountry',
        method: 'get',
        data
    })
}
