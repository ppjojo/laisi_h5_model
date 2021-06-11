import request from "@/utils/request"
//列表
export function getAllProduct(data) {
    return request({
        url: '/officialWebsite/websiteProduct/see/all/website/product',
        method: 'post',
        data
    })
}
//删除
export function delProduct(params) {
    return request({
        url: '/officialWebsite/websiteProduct/delete/website/product',
        method: 'get',
        params
    })
}
//新增图片
export function addProduct(data) {
    return request({
        url: '/officialWebsite/websiteProduct/insert/website/product',
        method: 'post',
        data
    })
}
//编辑
export function updateProduct(data) {
    return request({
        url: '/officialWebsite/websiteProduct/update/website/product',
        method: 'post',
        data
    })
}
