import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem(data) {
    return request({
        url: '/integral/background/date/count',
        method: 'get',
        params:data
    })
}




