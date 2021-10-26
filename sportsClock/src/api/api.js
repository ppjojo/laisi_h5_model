import request from "@u/request"
import { getQueryString } from "@u/tool";
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
	let url = 'sportClock/getSportByMonth';
	if(getQueryString('isShare2'))url = 'sportClock/share/getSportByMonth'
    return request({
        url: url,
        method: 'post',
		data,
        params:data
    })
}
export function getSportByYear(data) {//运动日历
let url = 'sportClock/getSportByYear';
	if(getQueryString('isShare2'))url = 'sportClock/share/getSportByYear'
    return request({
        url: url,
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
let url = 'sportClock/getDayData';
	if(getQueryString('isShare2'))url = 'sportClock/share/getDayData'
    return request({
        url: url,
        method: 'get',
        params:data
    })
}
export function getMonthDeviceTotal(data) {//月综合
let url = 'sportClock/getMonthDeviceTotal';
	if(getQueryString('isShare2'))url = 'sportClock/share/getMonthDeviceTotal'
    return request({
        url: url,
        method: 'get',
        params:data
    })
}
export function getYearDeviceTotal(data) {//年综合
let url = 'sportClock/getYearDeviceTotal';
	if(getQueryString('isShare2'))url = 'sportClock/share/getYearDeviceTotal'
    return request({
        url: url,
        method: 'get',
        params:data
    })
}
