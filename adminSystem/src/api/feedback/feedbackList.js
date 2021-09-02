import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(data) {
    return request({
        url: '/feedback/query/page',
        method: 'post',
        data
    })
}

//更新
export function updateItem(data) {
    return request({
        url: '/feedback/process',
        method: 'post',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        data:qs.stringify(data),
    })
}

