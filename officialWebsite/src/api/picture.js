import request from "@/utils/request"
export function getAllPicture(data) {
    return request({
        url: '/officialWebsite/websitePicture/see/all/website/picture',
        method: 'post',
        data
    })
}