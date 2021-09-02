/**绳彩飞扬 */
import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/rope-skipping-summer-camp/tbCamp/allCamps',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/rope-skipping-summer-camp/tbCamp/addCamp',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/rope-skipping-summer-camp/tbCamp/updateCamp',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/rope-skipping-summer-camp/tbCamp/deleteCamp',
        method: 'post',
        data
    })
}


