import request from "@/utils/request"
import { getUInfo } from '@/utils/auth'
export function listItem(params) {
    return request({
        url: '/ropeRedPackage/userWithdrawal/applyAll',
        method: 'get',
        params
    })
}
export function listItemByStatus(params) {
    return request({
        url: '/ropeRedPackage/userWithdrawal/userWithdrawalApplyInfo',
        method: 'get',
        params
    })
}

export function withdrawalCashToWechat(data) {
    return request({
        url: '/ropeRedPackage/userWithdrawal/withdrawalCashToWechat',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//用户余额
export function userAmount(params) {
    return request({
        url: '/ropeRedPackage/userAmount/userAmount/backstage',
        method: 'get',
        params
    })
}
//余额明细
export function userAmountDetail(params) {
    return request({
        url: '/ropeRedPackage/userTradeStatement/userTradeStatement/backstage',
        method: 'get',
        params
    })
}
