import request from "@u/request"
export function listItem(data) {
    return request({
        url: 'yz/yzGoodsReturn/goods/selectAll',
        method: 'post',
        data,
        params:{
            "sss":4
        }
    })
}
export function getIndexData(data) {
    return request({
        url: 'community/sevenClassUser/seven/status',
        method: 'get',
        params:data
    })
}
