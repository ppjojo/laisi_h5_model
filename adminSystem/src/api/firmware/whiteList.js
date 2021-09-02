import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(params) {
    return request({
        url: '/fota/whitelist/group/all',
        method: 'get',
        params
    })
}
//新增
export function addItem(data) {
    return request({
        url: '/fota/whitelist/group/create',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data
    })
}
//显示
export function viewItem(params) {
    return request({
        url: '/fota/whitelist/group/show',
        method: 'get',
        params
    })
}
//删除
export function deleteItem(data) {
    return request({
        url: '/fota/whitelist/group/delete',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}


//新增白名单用户
export function addUserItem(data) {
    return request({
        url: '/fota/whitelist/item/add',
        method: 'post',
        data
    })
}
//编辑白名单用户
export function updateUserItem(data) {
    return request({
        url: '/fota/whitelist/item/update',
        method: 'post',
        data
    })
}
//删除白名单用户
export function deleteUserItem(data) {
    return request({
        url: '/fota/whitelist/item/delete',
        method: 'post',
        data
    })
}