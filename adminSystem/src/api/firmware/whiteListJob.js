import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/fota/whiteListGroupUpdateJob/queryJobs',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/fota/whiteListGroupUpdateJob/addJob',
        method: 'post',
        data
    })
}
// //编辑
export function updateItem(data) {
    return request({
        url: '/fota/whiteListGroupUpdateJob/updateJob',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/fota/whiteListGroupUpdateJob/deleteJob',
        method: 'post',
        data
    })
}