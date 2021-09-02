import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(params) {
    return request({
        url: '/community-core/story/detail/recommend',
        method: 'get',
        params
    })
}
export function SearchBySome(params) {
    return request({
        url: '/community-core/story/detail/search',
        method: 'get',
        params
    })
}
export function updateItem(data) {
    return request({
        url: '/community-core/story/updateStory',
        method: 'post',
        data
    })
}
export function deleteItem(data) {
    return request({
        url: '/community-core/story/deleteStory',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}
//改热度
export function removeHot(data) {
    return request({
        url: '/community-core/story/removeHot',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}
//人工审核
export function updateAuditState(data) {
    return request({
        url: '/community-core/story/updateAuditState',
        method: 'post',
        data:data,
    })
}



export function hotrate_Detail(params) {
    return request({
        url: '/community-core/story/hotrate/detail',
        method: 'get',
        params,
    })
}

export function hotrate_Update(data) {
    return request({
        url: 'community-core/story/hotrate/update',
        method: 'post',
        data,
    })
}
