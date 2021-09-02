import request from "@/utils/request"
//查询所有音乐
export function listItem(data) {
    return request({
        url: '/community/cMusicList/queryAll',
        method: 'post',
        data
    })
}
//添加音乐
export function addItem(data) {
    return request({
        url: '/community/cMusicList/save',
        method: 'post',
        data
    })
}
//删除音乐
export function deleteItem(data) {
    return request({
        url: '/community/cMusicList/delete',
        method: 'post',
        data
    })
}