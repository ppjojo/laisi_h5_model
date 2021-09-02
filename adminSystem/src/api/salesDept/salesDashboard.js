import request from '@/utils/request'

//查询店铺表格数据
export function shopDataList(params) {
    return request({
        url: '/saleboard/shopInformation/selectall',
        method: 'get',
        params
    })
}
//查询代理得表格数据
export function shopCustomerList(params) {
    return request({
        url: '/saleboard/saleboardClient/total',
        method: 'get',
        params
    })
}

//查询客户源每日情况（曲线图）
export function shopCustomerLine(params) {
    return request({
        url: '/saleboard/saleboardClient/census',
        method: 'get',
        params
    })
}

//查询客户源的客户top：
export function shopCustomerTop(params) {
    return request({
        url: '/saleboard/saleboardClient/top',
        method: 'get',
        params
    })
}

export function shopTop(params) {
    return request({
        url: '/saleboard/shopInformation/top',
        method: 'get',
        params
    })
}


