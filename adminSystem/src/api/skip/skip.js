import request from '@/utils/request'
import qs from "qs"

// 获取跳绳PK赛列表:
export function listItem(params, deviceType) {
    var prefix = "ropeSkipping"
    if (deviceType == "watch") {
        prefix = "sportwatch"
    } else if (deviceType == "wristball") {
        prefix = "wristball"
    } else if (deviceType == "wheel") {
        prefix = "ab-roller"
    }
    return request({
        url: prefix + '/competition/criteria/query',
        method: 'post',
        params
    })
}
// 添加官方比赛
export function addItem(data, deviceType) {
    var prefix = "ropeSkipping"
    if (deviceType == "watch") {
        prefix = "sportwatch"
    } else if (deviceType == "wristball") {
        prefix = "wristball"
    } else if (deviceType == "wheel") {
        prefix = "ab-roller"
    }
    return request({
        url: prefix + '/competition/create',
        method: 'post',
        data,
        params: {
            userId: 1
        }
    })
}

// 编辑官方比赛
export function updateItem(data, deviceType) {
    var prefix = "ropeSkipping"
    if (deviceType == "watch") {
        prefix = "sportwatch"
    } else if (deviceType == "wristball") {
        prefix = "wristball"
    } else if (deviceType == "wheel") {
        prefix = "ab-roller"
    }
    return request({
        url: prefix + '/competition/update/item',
        method: 'post',
        data,
        params: {
            userId: 1
        }
    })
}
//删除比赛
export function deleteItem(params, deviceType) {
    var prefix = "ropeSkipping"
    if (deviceType == "watch") {
        prefix = "sportwatch"
    } else if (deviceType == "wristball") {
        prefix = "wristball"
    } else if (deviceType == "wheel") {
        prefix = "ab-roller"
    }
    return request({
        url: prefix + '/competition/delete/item',
        method: 'post',
        params
    })
}

//获取比赛详情
export function detailItem(params, deviceType) {
    var prefix = "ropeSkipping"
    if (deviceType == "watch") {
        prefix = "sportwatch"
    } else if (deviceType == "wristball") {
        prefix = "wristball"
    } else if (deviceType == "wheel") {
        prefix = "ab-roller"
    }
    return request({
        url: prefix + '/competition/get/item',
        method: 'post',
        params
    })
}

//赛况详情
export function joinItem(data, deviceType) {
    var prefix = "ropeSkipping"
    if (deviceType == "watch") {
        prefix = "sportwatch"
    } else if (deviceType == "wristball") {
        prefix = "wristball"
    } else if (deviceType == "wheel") {
        prefix = "ab-roller"
    }
    return request({
        url: prefix + '/competition/detail/background',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: 'post',
        data: qs.stringify(data),
    })
}