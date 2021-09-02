import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem(data) {
    return request({
        url: '/integral/query/user/coins',
        method: 'post',
        data
    })
}
//更新
export function updateItem(data) {
    return request({
        url: '/integral/update/coin',
        method: 'post',
        data
        
    })
}

//详情view
export function viewItem(params) {
    return request({
        url: '/integral/list/record',
        method: 'get',
        params
    })
}



