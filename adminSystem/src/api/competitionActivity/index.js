import request from "@/utils/request"

//学校列表
export function schoolList(data) {
    return request({
        url: 'nationSchoolPK/school/queryAll',
        method: 'get',
        data
    })
}
//学校下的教师列表
export function teacherList(params) {
    return request({
        url: 'nationSchoolPK/leader/selectLeaders',
        method: 'get',
        params
    })
}
//学校下的学生列表
export function studentList(params) {
    return request({
        url: 'nationSchoolPK/student/getStudentsPage',
        method: 'get',
        params
    })
}

//导入学校
export function registerSchool(data) {
    return request({
        url: "nationSchoolPK/school/registerSchool",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}

//导入老师
export function registerTeacher(data) {
    return request({
        url: "nationSchoolPK/leader/registerLeader",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: 'post',
        data
    })
}

//比赛列表
export function competitionList(data) {
    return request({
        url: 'nationSchoolPK/competition/getAllCompetition',
        method: 'get',
        data
    })
}

export function createItem(data) {
    return request({
        url: "nationSchoolPK/competition/createItem",
        method: 'post',
        data
    })
}

export function updateItem(data) {
    return request({
        url: "nationSchoolPK/competition/updateItem",
        method: 'post',
        data
    })
}