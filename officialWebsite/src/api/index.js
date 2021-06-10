import request from "@/utils/request"


//列表
export function getNews(params) {
    return request({
        url: '/officialWebsite/websiteNews/see/all/website/news',
        method: 'get',
        params
    })
}
