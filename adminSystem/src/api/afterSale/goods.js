import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/yz/yzGoodsReturn/goods/selectAll',
        method: 'post',
        data
    })
}
export function updateItem(data) {
    return request({
        url: '/yz/yzGoodsReturn/update',
        method: 'post',
        data
    })
}










