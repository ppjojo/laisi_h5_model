import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(params) {
    return request({
        url: '/school_rk/account/list',
        method: 'get',
        params
    })
}

//查看
export function viewItem(params) {
    return request({
        url: '/school_rk/account/detail',
        method: 'get',
        params
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/school_rk/account/delete',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}

