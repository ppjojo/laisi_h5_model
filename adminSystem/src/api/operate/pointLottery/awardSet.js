import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem(params) {
    return request({
        url: '/activity/activityAwardClass/queryAllAward',
        method: 'get',
        params
    })
}
export function searchListItem(data) {
    return request({
        url: '/activity/activityAwardClass/queryAwardInfo',
        method: 'post',
        data
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/activity/activityAwardClass/add',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/activity/activityAwardClass/update',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: '/activity/activityAwardClass/delete',
        method: 'get',
        params
    })
}
//详情view
export function viewItem(params) {
    return request({
        url: '/activity/activityAwardClass/queryAwardById',
        method: 'get',
        params
    })
}
//有赞优惠券
export function YZcoupons(params) {
    return request({
        url: '/yz/yzshop/unfinished/activity/coupons',
        method: 'post',
        params
    })
}


