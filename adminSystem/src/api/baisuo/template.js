import request from "@/utils/request"
export function importList(data) {
    return request({
        url: '/school_rk/upload/template',
        method: 'post',
        data
    })
}