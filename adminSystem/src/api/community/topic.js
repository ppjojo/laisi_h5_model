import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/community-core/topic/queryAllTopic',
        method: 'get',
        params
    })
}
export function addItem(data) {
    return request({
        url: '/community-core/topic/add',
        method: 'post',
        data,
        params:{
            userId:10000000
        }
    })
}

export function updateItem(data) {
    return request({
        url: '/community-core/topic/update',
        method: 'post',
        data,
        params:{
            userId:10000000
        }
    })
}



