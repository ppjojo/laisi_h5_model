import request from "@/utils/request"

//新增
export function addItem(data) {
    return request({
        url: '/ota/downloadpage/insert',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/ota/downloadpage/update',
        method: 'post',
        data
    })
}
//查看
export function viewItem(params) {
    return request({
        url: '/ota/downloadpage/get/appid',
        method: 'post',
        params
    })
}
