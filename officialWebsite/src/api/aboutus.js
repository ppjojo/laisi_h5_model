import request from "@/utils/request"
//获取关于我们
export function getCompanyProfile(params) {
    return request({
        url: '/officialWebsite/websiteCompanyProfile/getCompanyProfile',
        method: 'get',
        params
    })
}

//获取品牌介绍
export function getWebsiteBrandIntroduction(params) {
    return request({
        url: '/officialWebsite/websiteBrandIntroduction/getWebsiteBrandIntroduction',
        method: 'get',
        params
    })
}

//获取大事件
export function getWebsiteBigEvent(params) {
    return request({
        url: '/officialWebsite/websiteBigEvent/getWebsiteBigEvent',
        method: 'get',
        params
    })
}
