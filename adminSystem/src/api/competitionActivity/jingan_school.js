import request from "@/utils/request"
import qs from 'qs'

//导入学校
export function registerSchool(data) {
    return request({
        url: "summerVlogSkippingPk/school/registerSchool",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}
//列表
export function listItem(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/queryAll',
        method: 'get',
        params
    })
}

export function studentListItem(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/studentList',
        method: 'get',
        params
    })
}
export function addItem(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/addSchool',
        method: 'post',
        data,
    })
}
export function deleteItem(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/deleteSchool',
        method: 'get',
        params,
    })
}
export function importStudent(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/excelImportStudent',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}
export function updateStuItem(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/updateStudentInfo',
        method: 'post',
        data,
    })
}

export function searchStudent(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/searchStudent',
        method: 'post',
        data,
    })
}


export function studentDaily(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/studentDaily',
        method: 'get',
        params,
    })
}

export function dataRevert(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/studentDailyRevert',
        method: 'post',
        data,
    })
}