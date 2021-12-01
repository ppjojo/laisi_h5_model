export default {
    formatStr(item, key) { //根据类型返回名称
        return this.returnName(key)
    },
    formatStrUnit(item, d) { //根据类型返回单位
        if (d == 'runout' || d == 'runin' || d == 'ride' || d == 'onFoot' || d == 'mountaineering' || d == 'walkIn' ||
            d == 'steps' || d == 'walk') {
            return (this.toThousands((item.number) || item.distance) + '      ' + this.returnUnit(item, d))
        } else if (d == 'skipping' || d == 'wristball' || d == 'wheel') {
            return (this.toThousands(item.number || item.distance) + this.returnUnit(item, d) + '\xa0\xa0\xa0' + this
                .formatSeconds(item.takeMs ||
                    item.timeSpend || 0))
        } else if (d == 'rideIndoor' || d ==
            'ropeSkipping') {
            return this.formatSeconds(item.takeMs || item.timeSpend || 0);
        } else {
            return this.returnUnit(item, d)
        }
    },
    formatStrUnit2(item, d) { //根据类型返回单位
        if (d == 'runout' || d == 'runin' || d == 'ride' || d == 'onFoot' || d == 'mountaineering' || d == 'walkIn' ||
            d == 'swimming' || d == 'walk' || d == 'skipping' || d == 'ropeSkipping' || d == 'wristball' || d ==
            'wheel' || d == "steps" || d == 'swimmingOut' || d == 'trailRun') {
            return this.toThousands(item.number || item.distance);
        } else {
            return this.formatSeconds2(item.takeMs || item.timeSpend || 0);
        }
    },
    formatSeconds(value) {
        var secondTime = parseInt(value / 1000); // 秒
        if (secondTime < 60) {
            return secondTime + '秒';
        }
        var minuteTime = 0; // 分
        if (secondTime >= 60 && secondTime < 3600) {
            minuteTime = parseInt(secondTime / 60);
            secondTime = parseInt(secondTime % 60);
            return (minuteTime + '分钟' + secondTime + '秒')
        }
        var hourTime = 0; // 小时
        if (secondTime >= 60) {
            minuteTime = parseInt(secondTime / 60);
            secondTime = parseInt(secondTime % 60);
            if (minuteTime >= 60) {
                hourTime = parseInt(minuteTime / 60);
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        var result = "" + parseInt(secondTime) + '秒';

        // if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
        // }
        // if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
        // }
        return result;
    },
    formatSeconds2(t) {
        t = parseInt(t / 1000);
        if (t < 60) return "00:00:" + ((i = t) < 10 ? "0" + i : i);
        if (t < 3600) return "00:" + ((a = parseInt(t / 60)) < 10 ? "0" + a : a) + ":" + ((i = t % 60) < 10 ? "0" + i :
            i);
        if (3600 <= t) {
            var a, i, e = parseInt(t / 3600);
            return (e < 10 ? "0" + e : e) + ":" + ((a = parseInt(t % 3600 / 60)) < 10 ? "0" + a : a) + ":" + ((i = t %
                60) < 10 ? "0" + i : i);
        }
    },
    toThousands(str) { //处理数字
        if (str < 1) return str;
        var newStr = "";
        var count = 0;
        var str = (str || 0).toString()
            // 当数字是整数
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr; //自动补小数点后两位
            return str;
        }
        // 当数字带有小数
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            return str;
        }
        // var num = (num || 0).toString(),
        // 	result = '';
        // while (num.length > 3) {
        // 	result = ',' + num.slice(-3) + result;
        // 	num = num.slice(0, num.length - 3);
        // }
        // if (num) {
        // 	result = num + result;
        // }
        // return result;
    },
    returnImg(d, isoverClock) { //返回图片
        if (isoverClock) return require('@i/sporticon/' + d + '3.png')
        return require('@i/sporticon/' + d + '.png')
    },
    returnUnit(item, d, type) { //just
        let str = '';
        switch (d) {
            case 'skipping':
                str = '个';
                break;
            case 'ropeSkipping':
                str = '个';
                break;
            case 'wristball':
                str = '圈';
                break;
            case 'wheel':
                str = '次';
                break;
            case 'course':
                str = this.formatSeconds(item.takeMs || 0);
                if (type == "time") {
                    str = ' '
                    return;
                }
                break;
            case 'steps':
                str = '步';
                break;
        }
        if (str) return str;
        if (d == 'runout' || d == 'runin' || d == 'ride' || d == 'onFoot' || d == 'mountaineering' || d == 'walkIn' ||
            d == 'rideIndoor' || d == 'walk') {
            return '公里'
        } else {
            if (type == "time") {
                str = ''
                return;
            }
            return this.formatSeconds(item.takeMs || item.timeSpend || 0);
        }
    },
    returnName(d) { //返回名称
        let str = '';
        switch (d) {
            case 'skipping':
                str = '跳绳';
                break;
            case 'ropeSkipping':
                str = '室内跳绳';
                break;
            case 'wristball':
                str = '腕力球';
                break;
            case 'wheel':
                str = '健腹轮';
                break;
            case 'steps':
                str = '步数';
                break;
            case 'course':
                str = '训练课程';
                break;
            case 'walk':
                str = '健走';
                break;
            case 'runout':
                str = '户外跑';
                break;
            case 'runin':
                str = '室内跑';
                break;
            case 'ride':
                str = '户外骑行';
                break;
            case 'rideIndoor':
                str = '室内骑行';
                break;
            case 'onFoot':
                str = '徒步';
                break;
            case 'mountaineering':
                str = '爬山';
                break;
            case 'badminton':
                str = '羽毛球';
                break;
            case 'football':
                str = '足球';
                break;
            case 'basketball':
                str = '篮球';
                break;
            case 'tennis':
                str = '网球';
                break;
            case 'dancing':
                str = '跳舞';
                break;
            case 'yoga':
                str = '瑜伽';
                break;
            case 'freeTraining':
                str = '自由训练';
                break;
            case 'trailRun':
                str = '越野跑';
                break;
            case 'swimming':
                str = '室内游泳';
                break;
            case 'walkIn':
                str = '室内健走';
                break;
            case 'rower':
                str = '划船机';
                break;
            case 'elliptical':
                str = '椭圆机';
                break;
            case 'swimmingOut':
                str = '室外游泳';
                break;
            default:
                break;
        }
        return str;
    }
};