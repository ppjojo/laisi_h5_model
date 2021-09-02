import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/integral/query/stastic/count',
        method: 'post',
        data
    })
}


