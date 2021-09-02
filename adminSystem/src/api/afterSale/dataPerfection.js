import request from "@/utils/request"
import qs from 'qs'
export function addLostData(data) {
    return request({
        url: '/deviceData/data/upload/lost',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        method: 'post',
        data:qs.stringify(data),
    })
}

