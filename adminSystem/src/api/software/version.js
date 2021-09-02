import request from "@/utils/request"
import qs from "qs"

//历史版本
export function queryVersionHistoryList(params) {
    return request({
        url: '/ota/app/version/all',
        method: 'get',
        params
    })
}
export function addVersionByappId(data) {
    return request({
        url: '/ota/app/version/add',
        method: 'post',
        data
    })
}
export function editVersionByappId(data) {
    return request({
        url: '/ota/app/version/update',
        method: 'post',
        data
    })
}

//渠道包
export function queryVersionChannelList(params) {
    return request({
        url: '/ota/app/package/all',
        method: 'get',
        params
    })
}
export function versionByChannelIdDetail(params) {
    return request({
        url: '/ota/app/package/find',
        method: 'get',
        params
    })
}
export function uploadVersionByChannelId(data) {
    return request({
        url: '/ota/app/package/upload',
        method: 'post',
        data
    })
}
export function editVersionByChannelId(data) {
    return request({
        url: '/ota/app/package/update',
        method: 'post',
        data
    })
}

export function uploadVersionByChannelId2(data) {
    return request({
        url: '/ota/app/package/upload/v2',
        method: 'post',
        data
    })
}
export function editVersionByChannelId2(data) {
    return request({
        url: '/ota/app/package/update/v2',
        method: 'post',
        data
    })
}

//当前版本
export function queryAllChannelCurrentVersionList(params) {
    return request({
        url: '/ota/app/current/version/all',
        method: 'get',
        params
    })
}
export function currentVersionByChannelIdDetail(params) {
    return request({
        url: '/ota/app/current/version',
        method: 'get',
        params
    })
}
export function editCurrentVersionByChannelId(data) {
    return request({
        url: '/ota/app/current/version/update',
        method: 'post',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        data:qs.stringify(data)
    })
}

//灰度
export function queryGrayVerlist(params) {
    return request({
        url: '/ota/app/gray/version/all',
        method: 'get',
        params
    })
}
export function addGrayVer(data) {
    return request({
        url: '/ota/app/gray/version/add',
        method: 'post',
        data
    })
}
export function updateGrayVer(data) {
    return request({
        url: '/ota/app/gray/version/update',
        method: 'post',
        data
    })
}
export function delGrayVer(data) {
    return request({
        url: '/ota/app/gray/version/delete',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data)
    })
}

