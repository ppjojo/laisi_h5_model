import request from "@/utils/request"
export function listItem(params) {
    return request({
        url: '/ropeRedPackage/userTradeStatement/get/money/in/out/activity',
        method: 'get',
        params
    })
}
