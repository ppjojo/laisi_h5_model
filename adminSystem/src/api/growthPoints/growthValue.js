import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/grow/queryGrowth',
        method: 'get',
        params
    })
}
//新增
export function addItem(params) {
    return request({
        url: '/grow/innerAddGrowth',
        method: 'get',
        params
    })
}
//更新
export function viewItem(params) {
    return request({
        url: '/grow/queryGrowthDetail',
        method: 'get',
        params
    })
}

