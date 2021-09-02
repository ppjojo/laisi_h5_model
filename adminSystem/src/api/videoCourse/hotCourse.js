import request from "@/utils/request"
//热门
export function addHotItem(data) {
    return request({
        url: '/community/cHotClass/save',
        method: 'post',
        data
    })
}
export function listItem(data) {
    return request({
        url: '/community/cHotClass/queryAll',
        method: 'post',
        data
    })
}
export function updateItem(data) {
    return request({
        url: '/community/cHotClass/update',
        method: 'post',
        data
    })
}

export function deleteItem(data) {
    return request({
        url: '/community/cHotClass/delete',
        method: 'post',
        data
    })
}