import request from '@/utils/request'
export function allAppData(params) {
    return request({
      url: '/report/umeng/getAllAppData',
      method: 'get',
      params
    })
  }
  export function todayYesterdayData(params) {
    return request({
      url: '/report/umeng/getTodayYesterdayData',
      method: 'get',
      params
    })
  }
// 获取用户统计数据
  export function userDataDay(params) {
    return request({
      url: '/report/umeng/userReport',
      method: 'get',
      params
    })
  }
  // 获取用户统计数据
  export function userReportCount(params) {
    return request({
      url: '/report/umeng/userReportCount',
      method: 'get',
      params
    })
  }