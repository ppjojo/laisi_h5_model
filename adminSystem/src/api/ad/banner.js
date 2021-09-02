import request from "@/utils/request"

let uurl="advBanner"
 if (process.env.VUE_APP_INTERFACEADDRESS == 'usa') {
    //海外环境
    uurl='homePage'
  }else if (process.env.VUE_APP_INTERFACEADDRESS == 'eur') {
    //海外环境--德国
    uurl='homePage'
  }
//列表
export function listItem(data) {
    return request({
        url: uurl+'/ad/banner/get/all',
        method: 'get',
        data
    })
}
//置顶
export function topItem(params) {
    return request({
        url: uurl+'/ad/banner/set/top',
        method: 'get',
        params
    })
}
//更新
export function addUpdateItem(data) {
    return request({
        url: uurl+'/ad/banner/add/update',
        method: 'post',
        data
    })
}
//删除
export function deleteItem(params) {
    return request({
        url: uurl+'/ad/banner/delete',
        method: 'get',
        params
    })
}
