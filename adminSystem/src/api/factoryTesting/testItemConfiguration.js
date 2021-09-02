import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/factory/queryTestItemConfigList',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/factory/saveTestItemConfig',
        method: 'post',
        data
    })
}
//根据工厂id查询所有测试项配置
export function queryTestItemConfigListById(params) {
    return request({
        url: '/factory/queryTestItemConfigListById',
        method: 'get',
        params
    })
}

//根据工厂、项目、测试类型查询测试项
export function queryTestItemConfig(data) {
    return request({
        url: '/factory/queryTestItemConfig',
        method: 'post',
        data
    })
}
