import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(data) {
    return request({
        url: '/community-core/story/getCommunityDailyStatisticsList',
        method: 'post',
        data
    })
}
//查找
export function queryItem(data) {
    return request({
        url: '/community-core/story/getCommunityDailyStatistics',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}

