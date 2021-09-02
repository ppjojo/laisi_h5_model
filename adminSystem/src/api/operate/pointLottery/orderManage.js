import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem(data) {
    return request({
        url: '/activity/UserBag/waitingPostList',
        method: 'post',
        data
    })
}
//发货
export function updateItem(data) {
    return request({
        url: '/activity/UserBag/processPost',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
        
    })
}





