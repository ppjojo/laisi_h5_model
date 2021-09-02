import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/report/user/report/data',
        method: 'get',
        params
    })
}