import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/factory/queryTestRecordList',
        method: 'post',
        data
    })
}

