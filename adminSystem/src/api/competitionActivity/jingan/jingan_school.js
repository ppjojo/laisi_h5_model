import request from "@/utils/request"
import qs from 'qs'

//导入学校
export function registerSchool(data) {
    return request({
        url: "summerVlogSkippingPk/summerCamp/registerSchool",
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
export function updateItem(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/updateSchool',
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

export function insertStuItem(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/insertStudent',
        method: 'post',
        data,
    })
}


export function searchStudent(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/searchStudent',
        method: 'get',
        params,
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

export function deleteTestData(params) {
    return request({
        url: '/summerVlogSkippingPk/vlogStory/delete/some/date',
        method: 'get',
        params,
    })
}

export function statistics(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/statistics/data',
        method: 'get',
        params,
    })
}

export function groupList(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/school/competion/rank',
        method: 'get',
        params,
    })
}

export function singleRankData(params) {
    return request({
        url: '/summerVlogSkippingPk/competitorDailyStastic/getSingleRankData',
        method: 'get',
        params,
    })
}

export function twinRankData(params) {
    return request({
        url: '/summerVlogSkippingPk/competitorDailyStastic/getTwinRankData',
        method: 'get',
        params,
    })
}

export function goDeleteSkipData(params) {
    return request({
        url: '/summerVlogSkippingPk/vlogSkippingDate/deleteOneUserDate',
        method: 'get',
        params,
    })
}

export function goUpdatePhoneNumber(params) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/updatePhoneNumber',
        method: 'post',
        params,
    })
}


export function insertLoseData(data) {
    return request({
        url: '/summerVlogSkippingPk/summerCamp/insert/lost/skip/data',
        method: 'post',
        data,
    })
}