import request from "@u/request"
export function listItem(data) {
    return request({
        url: 'yz/yzGoodsReturn/goods/selectAll',
        method: 'post',
        data,
        params:{
            "sss":4
        }
    })
}
export function insertSportData(data) {//打卡按钮
    return request({
        url: 'sportClock/insertSportData',
        method: 'post',
		data,
        params:data
    })
}
export function getSportByMonth(data) {//运动日历
    return request({
        url: 'sportClock/getSportByMonth',
        method: 'post',
		data,
        params:data
    })
}
export function getSportByYear(data) {//运动日历
    return request({
        url: 'sportClock/getSportByYear',
        method: 'get',
        params:data
    })
}
export function updateSportData(data) {//更新打卡
    return request({
        url: 'sportClock/updateSportData',
        method: 'post',
        data,
    })
}
export function getDayData(data) {//当天的运动信息
    return request({
        url: 'sportClock/getDayData',
        method: 'get',
        params:data
    })
}
export function getMonthDeviceTotal(data) {//月综合
    return request({
        url: 'sportClock/getMonthDeviceTotal',
        method: 'get',
        params:data
    })
}
export function getYearDeviceTotal(data) {//年综合
    return request({
        url: 'sportClock/getYearDeviceTotal',
        method: 'get',
        params:data
    })
}
