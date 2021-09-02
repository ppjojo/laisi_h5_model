import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem(params) {
    return request({
        url: '/activity/activityExchangeAwardClass/queryAllExchangeAward',
        method: 'get',
        params
    })
}
// export function searchListItem(data) {
//     return request({
//         url: '/activity/activityAwardClass/queryAwardInfo',
//         method: 'post',
//         data
//     })
// }
//新增
export function addItem(data) {
    return request({
        url: '/activity/activityExchangeAwardClass/add',
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
        url: '/activity/activityExchangeAwardClass/update',
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
        url: '/activity/activityExchangeAwardClass/delete',
        method: 'get',
        params
    })
}
//详情view
export function viewItem(params) {
    return request({
        url: '/activity/activityExchangeAwardClass/queryExchangeAwardById',
        method: 'get',
        params
    })
}
//下架
export function offShelf(params) {
    return request({
        url: '/activity/activityExchangeAwardClass/remove',
        method: 'get',
        params
    })
}
//上架
export function onShelf(params) {
    return request({
        url: '/activity/activityExchangeAwardClass/addAgain',
        method: 'get',
        params
    })
}


//获取可兑换所有的
export function convertibleAward(params) {
    return request({
        url: '/activity/activityAwardClass/convertibleAward',
        method: 'get',
        params
    })
}

