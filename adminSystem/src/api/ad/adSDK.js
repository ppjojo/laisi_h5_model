import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/advBanner/ad/sdk/selectAll',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/advBanner/ad/sdk/insert',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/advBanner/ad/sdk/update',
        method: 'post',
        data
    })
}

