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
export function HomeInfo(data, flag) { //
	let url = 'ab-roller/dailyChallenge/challengeHomeInfo';
	if (flag == 1) url = 'wristball/dailychallenge/challengeHomeInfo';
	return request({
		url: url,
		method: 'get',
		data,
	})
}
export function typeCheck(data, flag) { //
	let url = 'ab-roller/dailyChallenge/challengeCheck';
	if (flag == 1) url = 'wristball/dailychallenge/challengeCheck';
	return request({
		url: url,
		method: 'get',
		data,
	})
}
export function challengeHistory(data, flag) { //
	let url = 'ab-roller/dailyChallenge/challengeHistory';
	if (flag == 1) url = 'wristball/dailychallenge/challengeHistory';
	return request({
		url: url,
		method: 'get',
		data,
	})
}
