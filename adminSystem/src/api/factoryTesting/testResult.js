import request from "@/utils/request"
//列表
export function listItem(data) {
    return request({
        url: '/factory/queryTestRecordList',
        method: 'post',
        data
    })
}

export function exportTestResult(data) {
    return request({
        url: '/factory/exportTestResult',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        responseType: "blob",
        data
    })
}