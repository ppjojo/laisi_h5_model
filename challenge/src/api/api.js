import request from "@u/request"
export function listItem(data) {
	return request({
		url: 'yz/yzGoodsReturn/goods/selectAll',
		method: 'post',
		data,
		params: {
			"sss": 4
		}
	})
}
export function HomeInfo(params, flag) { //
	let url = 'ab-roller/dailyChallenge/challengeHomeInfo';
	if (flag == 1) url = 'wristball/dailychallenge/challengeHomeInfo';
	if (flag == 2) url = 'ropeSkipping/dailychallenge/todayChallage';
	return request({
		url: url,
		method: 'get',
		params,
	})
}
export function typeCheck(params, flag) { //
	let url = 'ab-roller/dailyChallenge/challengeCheck';
	if (flag == 1) url = 'wristball/dailychallenge/challengeCheck';
	if (flag == 2) url = 'ropeSkipping/dailychallenge/canEnable';
	return request({
		url: url,
		method: 'get',
		params,
	})
}
export function challengeHistory(params, flag) { //
	let url = 'ab-roller/dailyChallenge/challengeHistory';
	if (flag == 1) url = 'wristball/dailychallenge/challengeHistory';
	if (flag == 2) url = 'ropeSkipping/dailychallenge/challageHistory';
	return request({
		url: url,
		method: 'get',
		params,
	})
}
export function changeRopeChallage(data) {//更换挑战
	return request({
		url: 'ropeSkipping/dailychallenge/changeChallage',
		method: 'post',
		data,
	})
}
export function acceptChallage(data,flag) {//迎战
let url = 'ab-roller/dailyChallenge/acceptChallenge';
	if (flag == 1) url = 'wristball/dailychallenge/acceptChallenge';
	if (flag == 2) url = 'ropeSkipping/dailychallenge/acceptChallage';
	return request({
		url: url,
		method:'post',
		data,
		params:data
	})
}