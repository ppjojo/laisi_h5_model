import request from "@/utils/request"
//列表
export function listItem(params) {
    return request({
        url: '/club/getClubAllList',
        method: 'get',
        params
    })
}

export function searchListItem(params) {
    return request({
        url: '/club/searchClubList',
        method: 'get',
        params
    })
}
export function viewItem(params) {
    return request({
        url: '/club/clubDetail',
        method: 'get',
        params,
    })
}
export function todaySport(params) {
    return request({
        url: '/club/todaySport',
        method: 'get',
        params,
    })
}
export function clubExport(params) {
    return request({
        url: '/club/export',
        method: 'post',
        params,
    })
}

export function deleteItem(params) {
    return request({
        url: '/community-core/report/type/deleteOne',
        method: 'get',
        params,
    })
}


//导入俱乐部
export function adminCreateClub(data) {
    return request({
        url: "club/custom/saveClub",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}

export function adminCreateClubGroup(data) {
    return request({
        url: "club/custom/saveClubGroup",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}

export function adminCreateClubGroupMember(data) {
    return request({
        url: "club/custom/joinClub",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}
// export function getGroupList(data) {
//     return request({
//         url: '/club/memberManage',
//         method: 'post',
//         data,
//     })
// }
export function getGroupList(params) {
    return request({
        url: '/club/queryClubGroup',
        method: 'get',
        params,
    })
}
export function clubGroupInfo(params) {
    return request({
        url: '/club/clubGroupInfo',
        method: 'get',
        params,
    })
}