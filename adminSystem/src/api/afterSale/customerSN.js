import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(data) {
    return request({
        url: '/customMacUpload/query/all/date',
        method: 'post',
        data
    })
}


export function addItem(data) {
    return request({
        url: '/customMacUpload/one/mac/insert',
        method: 'post',
        data,
    })
}
export function updateItem(data) {
    return request({
        url: '/customMacUpload/one/update',
        method: 'post',
        data,
    })
}
export function deleteItem(params) {
    return request({
        url: '/customMacUpload/one/delete',
        method: 'get',
        params,
    })
}
export function importExcel(data) {
    return request({
        url: '/customMacUpload/file/insert',
        headers:{
            "Content-Type":"multipart/form-data",
        },
        method: 'post',
        data
    })
}




