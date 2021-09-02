import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/sportwatch/sportType/get/all/sportType',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/sportwatch/sportType/upload',
        method: 'post',
        data
    })
}
