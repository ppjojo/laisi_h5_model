import request from "@/utils/request"
import { getUInfo} from "@/utils/auth"
//列表
export function listItem(data) {
    return request({
        url: '/uiconfig/floatbutton/administration',
        method: 'get',
        data
    })
}

export function updateItem(data) {
    return request({
        url: '/uiconfig/floatbutton/update',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
        
    })
}
export function admindisplay(data) {
    return request({
        url: '/uiconfig/floatbutton/display',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
        
    })
}
export function adminnotDisplay(data) {
    return request({
        url: '/uiconfig/floatbutton/notDisplay',
        method: 'post',
        data,
        params:{
            userId:JSON.parse(getUInfo()).id
        }
        
    })
}





