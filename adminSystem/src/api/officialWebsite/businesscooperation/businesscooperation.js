import request from "@/utils/request"
//获取关于我们
export function getPartnerAll(params) {
    return request({
        url: '/officialWebsite/getPartnerAll',
        method: 'get',
        params
    })
}
//编辑关于我们
export function joinPartner(data) {
    return request({
        url: '/officialWebsite/joinPartner',
        method: 'post',
        data
    })
}