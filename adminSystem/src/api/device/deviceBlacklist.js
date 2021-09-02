import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/device/mac/blacklist/list',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/device/mac/blacklist/insert',
        method: 'post',
        data
    })
}

//删除
export function deleteItem(params) {
    return request({
        url: '/device/mac/blacklist/delete',
        method: 'get',
        params
    })
}
