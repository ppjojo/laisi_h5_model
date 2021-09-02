import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/community-core/notify/item/queryAllByLimit',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/community-core/notify/item/insertOne',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/community-core/notify/item/updateOne',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/community-core/notify/item/deleteOne',
        method: 'get',
        params
    })
}

//删除
export function releaseItem(data) {
    return request({
        url: '/community-core/notify/item/pushOne',
        method: 'POST',
        data
    })
}
