import request from "@/utils/request"


// 根据appid获取该appid的所有渠道信息
export function channelListByAppId(params) {
    return request({
        url: '/ota/distchannel/info/byappid',
        method: 'post',
        params
    })
}
// 根据appid获取可选的渠道信息
export function otherChannelListByAppId(params) {
    return request({
        url: '/ota/distchannel/channel/notselected',
        method: 'post',
        params
    })
}

// App创建渠道信息,传参包含两种格式,注意
export function addChannelByAppId(params) {
    return request({
        url: '/ota/distchannel/create/channel/appid',
        method: 'post',
        params:params.appInfo,
        data:params.channelInsert
    })
}


// 从已有渠道信息中为该app选择渠道,提交接口
export function addChannelSelectByAppId(data) {
    return request({
        url: '/ota/distchannel/choose/channels/appid',
        method: 'post',
        data
    })
}

//删除对应appid的渠道信息
export function deleteChannelByappId(params) {
    return request({
        url: '/ota/distchannel/myapp/delete/byboth',
        method: 'post',
        params
    })
}
//编辑对应appid的渠道信息
export function editChannelByappId(data) {
    return request({
        url: '/ota/distchannel/edit/byappid',
        method: 'post',
        data
    })
}


//二维码下载
export function downloadQR(params) {
    return request({
        url: '/ota/qrpicture/download',
        method: 'get',
        params
    })
}
