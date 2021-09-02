import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem() {
    return request({
        url: '/activity/SupriseBoxPool/getAllBoxPool',
        method: 'get',
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/activity/SupriseBoxPool/add',
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
        url: '/activity/SupriseBoxPool/update',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/activity/SupriseBoxPool/delete',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//选择盲盒的奖池
export function selectAwardPool(params) {
    return request({
        url: '/activity/AwardPool/selectAwardPool',
        method: 'get',
        params
    })
}
//开奖信息
export function OpenedBoxesDetails(params) {
    return request({
        url: '/activity/SupriseBoxPool/getOpenedBoxesDetails',
        method: 'get',
        params
    })
}
//奖品池的奖品

export function awardPoolItem(params) {
    return request({
        url: '/activity/AwardPool/selectAwardPoolItem',
        method: 'get',
        params
    })
}

//新增奖品
export function supriseBoxPooladdItem(data) {
    return request({
        url: '/activity/SupriseBoxPool/addItem',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}
//编辑奖品
export function supriseBoxPoolupdateItem(data) {
    return request({
        url: '/activity/SupriseBoxPool/updateItem',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}

//删除奖品
export function supriseBoxPooldeleteItem(data) {
    return request({
        url: '/activity/SupriseBoxPool/deleteItem',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
    })
}

export function unopenedBoxesCount() {
    return request({
        url: '/activity/SupriseBoxPool/getUnopenedBoxesCount',
        method: 'get',
    })
}
export function getUnopenedBoxesUser() {
    return request({
        url: '/activity/SupriseBoxPool/getUnopenedBoxesUser',
        method: 'get',
    })
}


