import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/ropeRedPackage/ropeRedPayType/getTodayUsers',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/uiconfig/hotActivity/add',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/ropeRedPackage/ropeRedPayType/updateType',
        method: 'post',
        data
    })
}
// //删除
export function dataGetMapping(params) {
    return request({
        url: '/ropeRedPackage/ropeRedPayType/getTodayUsers/data',
        method: 'get',
        params
    })
}
