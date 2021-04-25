import request from "@u/request"
import {
    getQueryString
} from "@u/tool";
export function getIndexData(params) {
    return request({
        url: 'community/sevenClassUser/seven/status',
        method: 'get',
        params
    })
}

export function seeTestResult(params) {
    let url = 'community/sevenClassUser/seeTestResult'
    if (getQueryString("isShare")) {
        url = 'classShare/sevenClassUser/seeTestResult'
    }
    return request({
        url: url,
        method: 'get',
        params
    })
}
export function getClassPlan(data) {
    return request({
        url: 'community/sevenClassUser/get/my/classPlan',
        method: 'post',
        data
    })
}