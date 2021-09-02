import request from '@/utils/request'

//店铺数据
export function shopList(params) {
    return request({
        url: '/saleboard/shopInformation/all/list',
        method: 'get',
        params
    })
}
export function shopInsert(data) {
    return request({
        url: '/saleboard/shopInformation/insert',
        method: 'post',
        data
    })
}

export function shopDelete(params) {
    return request({
        url: '/saleboard/shopInformation/delete',
        method: 'get',
        params
    })
}



//客户数据      
export function customerList(params) {
    return request({
        url: '/saleboard/saleboardClient/all/list',
        method: 'get',
        params
    })
}
export function customerInsert(data) {
    return request({
        url: '/saleboard/saleboardClient/insert',
        method: 'post',
        data
    })
}

export function customerDelete(params) {
    return request({
        url: '/saleboard/saleboardClient/delete',
        method: 'get',
        params
    })
}                            
