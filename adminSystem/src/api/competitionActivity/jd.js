import request from "@/utils/request"

//比赛列表
export function competitionList(data) {
    return request({
        url: 'jingdongPk/competition/getAllCompetition',
        method: 'get',
        data
    })
}


//导入jd账号
export function registerUser(data) {
    return request({
        url: "jingdongPk/competitor/registerUser",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}

export function createItem(data) {
    return request({
        url: "jingdongPk/competition/createItem",
        method: 'post',
        data
    })
}

export function updateItem(data) {
    return request({
        url: "jingdongPk/competition/updateItem",
        method: 'post',
        data
    })
}

export function rankItem(params) {
    return request({
        url: "jingdongPk/competitorStatistic/rankItem",
        method: 'get',
        params
    })
}