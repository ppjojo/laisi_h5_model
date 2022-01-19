/**绳彩飞扬 */
import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/summerVlogSkippingPk/camp/allCamps',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/summerVlogSkippingPk/camp/addCamp',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/summerVlogSkippingPk/camp/updateCamp',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/summerVlogSkippingPk/camp/deleteCamp',
        method: 'post',
        data
    })
}

//新增红包
export function addRedItem(data) {
    return request({
        url: '/summerVlogSkippingPk/redPacketType/addRedPacketType',
        method: 'post',
        data
    })
}


//红包状态
export function redPacketStatus(params, data) {
    return request({
        url: '/summerVlogSkippingPk/redPacketType/seeAllPacketStatus',
        method: 'get',
        data,
        params
    })
}