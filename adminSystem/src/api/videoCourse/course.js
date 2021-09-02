import request from "@/utils/request"
//大课程
export function bListItem(data) {
    return request({
        url: '/community/cBigClass/queryAll',
        method: 'post',
        data
    })
}
export function bAddItem(data) {
    return request({
        url: '/community/cBigClass/save',
        method: 'post',
        data
    })
}
export function bUpdateItem(data) {
    return request({
        url: '/community/cBigClass/update',
        method: 'post',
        data
    })
}
export function bDeleteItem(data) {
    return request({
        url: '/community/cBigClass/delete',
        method: 'post',
        data
    })
}



//小课程
export function sListItem(data) {
    return request({
        url: '/community/cSmallClass/queryAll',
        method: 'post',
        data
    })
}
export function sAddItem(data) {
    return request({
        url: '/community/cSmallClass/save',
        method: 'post',
        data
    })
}
export function sUpdateItem(data) {
    return request({
        url: '/community/cSmallClass/update',
        method: 'post',
        data
    })
}

export function sDeleteItem(data) {
    return request({
        url: '/community/cSmallClass/delete',
        method: 'post',
        data
    })
}


//分类
export function catalogListItem(data) {
    return request({
        url: '/community/cCatalog/queryAll',
        method: 'post',
        data
    })
}
export function catalogAddItem(data) {
    return request({
        url: '/community/cCatalog/save',
        method: 'post',
        data
    })
}
export function catalogUpdateItem(data) {
    return request({
        url: '/community/cCatalog/update',
        method: 'post',
        data
    })
}
export function catalogDeleteItem(data) {
    return request({
        url: '/community/cCatalog/delete',
        method: 'post',
        data
    })
}

//视频上传
export function videoUpload(data) {
    return request({
        url: "/community/alivod/upload",
        headers:{
            "Content-Type":"multipart/form-data",
        },
        method: 'post',
        data
    })
}
//获取视频播放凭证
export function getPlayAuth(params) {
    return request({
        url: '/community/alivod/getPlayAuth',
        method: 'get',
        params
    })
}

//大课程查询大课程下得小课程
export function queryAllSmallByBigId(data) {
    return request({
        url: '/community/cBigClass/queryAllSmallByBigId',
        method: 'post',
        data
    })
}
//向⼤大课程中添加⼩小课程
export function saveSmallToBig(data,params) {
    return request({
        url: '/community/cBigSmallClass/save',
        method: 'post',
        params,
        data
    })
}
//更新⼤大课程中⼩小课程 
export function updateSmallToBig(data,params) {
    return request({
        url: '/community/cBigSmallClass/update',
        method: 'post',
        params,
        data
    })
}


//评论
export function listComment(params) {
    return request({
        url: '/community/cBigClassComment/queryAllByPage',
        method: 'post',
        params
    })
}
//删除评论
export function deleteComment(data) {
    return request({
        url: '/community/cBigClassComment/delete',
        method: 'post',
        data
    })
}


