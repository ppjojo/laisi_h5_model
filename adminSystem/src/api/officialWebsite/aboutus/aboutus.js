import request from "@/utils/request"
//获取关于我们
export function getCompanyProfile(params) {
    return request({
        url: '/officialWebsite/websiteCompanyProfile/getCompanyProfile',
        method: 'get',
        params
    })
}
//编辑关于我们
export function updateCompanyProfile(data) {
    return request({
        url: '/officialWebsite/websiteCompanyProfile/updateCompanyProfile',
        method: 'post',
        data
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
//新增品牌介绍
export function addWebsiteBrandIntroduction(data) {
    return request({
        url: '/officialWebsite/websiteBrandIntroduction/addWebsiteBrandIntroduction',
        method: 'post',
        data
    })
}
//删除品牌介绍
export function deleteWebsiteBrandIntroduction(params) {
    return request({
        url: '/officialWebsite/websiteBrandIntroduction/deleteWebsiteBrandIntroduction',
        method: 'get',
        params
    })
}
//更新品牌介绍
export function updateWebsiteBrandIntroduction(data) {
    return request({
        url: '/officialWebsite/websiteBrandIntroduction/updateWebsiteBrandIntroduction',
        method: 'post',
        data
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
//添加大事件
export function addWebsiteBigEvent(data) {
    return request({
        url: '/officialWebsite/websiteBigEvent/addWebsiteBigEvent',
        method: 'post',
        data
    })
}
//删除大事件
export function deleteWebsiteBigEvent(params) {
    return request({
        url: '/officialWebsite/websiteBigEvent/deleteWebsiteBigEvent',
        method: 'get',
        params
    })
}
//编辑大事件
export function updateWebsiteBigEvent(data) {
    return request({
        url: '/officialWebsite/websiteBigEvent/updateWebsiteBigEvent',
        method: 'post',
        data
    })
}