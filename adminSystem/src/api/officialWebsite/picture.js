import request from "@/utils/request"
//列表
export function getAllPicture(data) {
    return request({
        url: '/officialWebsite/websitePicture/see/all/website/picture',
        method: 'post',
        data
    })
}
//删除
export function delPicture(params) {
    return request({
        url: '/officialWebsite/websitePicture/delete/website/picture',
        method: 'get',
        params
    })
}
//新增图片
export function addPicture(data) {
    return request({
        url: '/officialWebsite/websitePicture/insert/website/picture',
        method: 'post',
        data
    })
}
//编辑
export function updatePicture(data) {
    return request({
        url: '/officialWebsite/websitePicture/update/website/product',
        method: 'post',
        data,
        params:data
    })
}
