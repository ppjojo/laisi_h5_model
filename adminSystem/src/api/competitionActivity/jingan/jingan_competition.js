/**绳彩飞扬 */
import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/summerVlogSkippingPk/competition/queryByCampId',
        method: 'get',
        params
    })
}
export function queryByUserIdAndCampId(params) {
    return request({
        url: '/summerVlogSkippingPk/competitor/queryByUserIdAndCampId',
        method: 'get',
        params
    })
}

//新增
export function addItem(data) {
    return request({
        url: '/summerVlogSkippingPk/competition/createCompetition',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/summerVlogSkippingPk/competition/updateCompetition',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/summerVlogSkippingPk/competition/deleteCompetition',
        method: 'post',
        data
    })
}