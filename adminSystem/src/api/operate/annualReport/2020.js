import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/activity/reportRedPacket/allBrand',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/activity/reportRedPacket/addBrand',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/activity/reportRedPacket/updateBrand',
        method: 'post',
        data
    })
}

//新增红包
export function addRedItem(data) {
    return request({
        url: '/activity/reportRedPacket/addRedRedPacket',
        method: 'post',
        data
    })
}


//红包状态
export function redPacketStatus(params,data) {
    return request({
        url: '/activity/reportRedPacket/redPacketStatus',
        method: 'post',
        data,
        params
    })
}