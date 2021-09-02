import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function ropeRedPoolAll(data) {
    return request({
        url: '/ropeRedPackage/ropeRedPool/list/all',
        method: 'get',
        params:data
    })
}
//删除
export function delropeRedPool(data) {
    return request({
        url: '/ropeRedPackage/ropeRedPool/delete',
        method: 'get',
        params:data
    })
}
//新增期数
export function ropeRedPoolInsert(data) {
    return request({
        url: '/ropeRedPackage/ropeRedPool/insert',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//修改期数
export function ropeRedPoolUpdate(data) {
    return request({
        url: '/ropeRedPackage/ropeRedPool/update',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//每期详情
export function poolTypeDetail(data) {
    return request({
        url: '/ropeRedPackage/ropeRedTypeInfo/get/every/detail',
        method: 'get',
        params:data
    })
}
//删除组别
export function typeDel(data) {
    return request({
        url: '/ropeRedPackage/ropeRedType/delete',
        method: 'get',
        params:data
    })
}
//每期瓜分详情
export function redbagDetail(data) {
    return request({
        url: '/ropeRedPackage/ropeRedPool/ropeRedPackageInfo',
        method: 'get',
        params:data
    })
}
//一键完成  /ropeRedPackage/ropeRedTypeInfo/setAllOk
export function setAllOk(data) {
    return request({
        url: '/ropeRedPackage/ropeRedTypeInfo/setAllOk',
        method: 'get',
        params:data
    })
}
//查询余额
export function queryUserAmountAll(data) {
    return request({
        url: '/ropeRedPackage/userAmount/queryUserAmountAll',
        method: 'get',
        params:data
    })
}
