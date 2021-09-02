import request from "@/utils/request"
//列表
export function clubListItem(params) {
    return request({
        url: '/datastatistic-api/club/getClubDailyStatisticsList',
        method: 'get',
        params
    })
}
//新增
export function communityItem(data) {
    return request({
        url: '/datastatistic-api/community/getCommunityDailyStatistics',
        method: 'post',
        data,
        params:data
    })
}
export function communityItemAll(data) {
    return request({
        url: '/datastatistic-api/community/getCommunityDailyStatisticsList',
        method: 'post',
        data,
    })
}
//更新
export function getBigClassJoinSum(data) {
    return request({
        url: '/datastatistic-api/course/getBigClassJoinSum',
        method: 'get',
        params:data
    })
}
export function getSeeClassDate(data) {
    return request({
        url: '/datastatistic-api/course/getSeeClassDate',
        method: 'get',
        params:data
    })
}
export function getEveryDayNewUser(data) {
    return request({
        url: '/integral/background/date/count',
        method: 'get',
        params:data
    })
}
export function getIntegrationData(data) {
    return request({
        url: '/datastatistic-api/getIntegrationData',
        method: 'get',
        params:data
    })
}
// //删除
export function getWeekPlanData(data) {
    return request({
        url: 'community/sevenAllDate/see/seven/all/date',
        method: 'get',
        params:data
    })
}
