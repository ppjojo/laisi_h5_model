import request from "@/utils/request"
//列表
export function getNews(params) {
    return request({
        url: '/officialWebsite/websiteNews/see/all/website/news',
        method: 'get',
        params
    })
}
//删除
export function delNews(params) {
    return request({
        url: '/officialWebsite/websiteNews/delete/website/news',
        method: 'get',
        params
    })
}
//新增
export function addNews(data) {
    return request({
        url: '/officialWebsite/websiteNews/insert/website/news',
        method: 'post',
        data,
    })
}
//新增
export function updateNews(data) {
    return request({
        url: '/officialWebsite/websiteNews/update/website/news',
        method: 'post',
        data,
    })
}
export function getNewsDetail(params) {
    return request({
        url: 'officialWebsite/websiteNews/select',
        method: 'get',
        params
    })
}
