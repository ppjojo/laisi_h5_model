import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem(params) {
    return request({
        url: '/activity/AwardPool/AllAwardPool',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/activity/AwardPool/add',
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
        url: '/activity/AwardPool/update',
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
        url: '/activity/AwardPool/deleteAwardPool',
        method: 'get',
        params
    })
}
//详情view
export function viewItem(params) {
    return request({
        url: '/activity/AwardPool/queryAwardPool',
        method: 'get',
        params
    })
}

//兑换奖品
export function exchangeAwardListItem(params) {
    return request({
        url: '/activity/exchange/show/award',
        method: 'get',
        params
    })
}



