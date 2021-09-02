import request from "@/utils/request"
import qs from 'qs'
//列表
export function listItem(params) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/schoolList',
        method: 'get',
        params
    })
}

export function studentListItem(params) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/studentList',
        method: 'get',
        params
    })
}
export function addItem(data) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/addSchool',
        method: 'post',
        data,
    })
}
export function deleteItem(params) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/deleteSchool',
        method: 'get',
        params,
    })
}
export function importStudent(data) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/excelImportStudent',
        headers:{
            "Content-Type":"multipart/form-data",
        },
        method: 'post',
        data
    })
}
export function updateStuItem(data) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/updateStudentInfo',
        method: 'post',
        data,
    })
}

export function searchStudent(data) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/searchStudent',
        method: 'post',
        data,
    })
}


export function studentDaily(params) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/studentDaily',
        method: 'get',
        params,
    })
}

export function dataRevert(data) {
    return request({
        url: '/rope-skipping-summer-camp/summerCamp/studentDailyRevert',
        method: 'post',
        data,
    })
}


