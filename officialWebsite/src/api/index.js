import request from "@/utils/request"

export function getAllPicture(data) {
    return request({
        url: '/officialWebsite/websitePicture/see/all/website/picture',
        method: 'post',
        data
    })
}
//列表
export function getNews(params) {
    return request({
        url: '/officialWebsite/websiteNews/see/all/website/news',
        method: 'get',
        params
    })
}
