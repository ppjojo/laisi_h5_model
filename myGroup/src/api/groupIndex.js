import request from "@u/request"
import { getQueryString } from "@u/tool";
export function getGroupInfo(data) {
	let url = 'myteam/homepage/group/detail';
	if(getQueryString('isShare'))url = '';
    return request({
        url: url,
        method: 'get',
        params:data
    })
}
export function groupSettingInfo(data) {
    return request({
        url: 'myteam/group/query/groupData',
        method: 'get',
        params:data
    })
}
export function getAllMember(data) {
    return request({
        url: 'myteam/member/query/allMembers',
        method: 'get',
        params:data
    })
}
export function memberExit(data) {
    return request({
        url: 'myteam/member/exit/member',
        method: 'post',
		data,
        params:data
    })
}
export function changeNickname(data) {
    return request({
        url: 'myteam/member/update/nickName',
        method: 'post',
		data,
		params:data
    })
}
export function relieveGroup(data) {
    return request({
        url: 'myteam/group/relieve/groupAndMember',
        method: 'post',
		data,
		params:data
    })
}
export function joinGroup(data) {
    return request({
        url: 'myteam/member/create/member',
        method: 'post',
		data,
		params:data
    })
}
export function applyOnly(data) {
    return request({
        url: 'myteam/invited/only/groupUser/confirm',
        method: 'get',
        params:data
    })
}