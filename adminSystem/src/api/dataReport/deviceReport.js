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
//跳绳数据绑定
export function sheetName(data) {
    return request({
        url: '/customMacUpload/query/count/by/sheetName',
        method: 'get',
        data
    })
}


//跳绳细分
export function skippingBindCount(data) {
    return request({
        url: '/device/skipping/bind/count',
        method: 'get',
        data
    })
}

//手表的细分

export function watchBindCount(data) {
    return request({
        url: '/device/watch/bind/count',
        method: 'get',
        data
    })
}