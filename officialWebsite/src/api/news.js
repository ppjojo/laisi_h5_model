import request from "@/utils/request"


//列表
export function getNewsDetail(params) {
    return request({
        url: 'officialWebsite/websiteNews/select',
        method: 'get',
        params
    })
}
