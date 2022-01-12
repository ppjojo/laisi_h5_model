/*!
 * bluetoothProtocol.js v0.2
 * 202201 zhouhao
 * 
 */
var utils = {
    host: "https://lstest3.laisitech.com/",
    appId: "129836372101",
    appSecret: "Tp64DuQ6CQqHeTSHfzbJKusHu4K0Piab",
    sequenceIDcofig: "00",
    commandHeader: "",
    fullCommand: "",
    commandList: {
        "01": {
            "01": "举例说明，未使用",
            "02": "设置RTC时间",
            "03": "确认历史记录同步成功",
            "04": "开始跳绳",
            "05": "停止跳绳",
            "06": "呼叫设备",
            "07": "重启设备进入FOTA模式",
            "08": "设置双三摇开关",
            "09": "设置发光跳绳发光模式、颜色、亮度、频次",
        },
        "02": {
            "01": "读取设备固件版本号",
            "04": "读取设备RTC时间",
            "05": "读取设备电量",
            "07": "读取设备当前跳绳状态",
            "08": "获取鉴权随机码",
            "09": "获取客户代码",
            "0A": "获取双三摇开关",
            "0B": "获取功能配置项",
            "0C": "获取发光跳绳发光模式颜色、亮度、频次"
        },
        "03": {
            "01": "鉴权"
        },
        "04": {
            "01": "同步历史数据"
        }
    }
}
/**
 * 工具类
 */
var tool = {
    /**
     * 十六进制字符串转数组
     * 1185759ac35a91143f97037002b1a266 转换 ["11", "85", "75", "9a", "c3", "5a", "91", "14", "3f", "97", "03", "70", "02", "b1", "a2", "66"]
     * @param {String} str 十六进制字符串
     */
    hexToArr: (str) => {
        var pos = 0;
        var len = str.length;
        if (len % 2 != 0) {
            return null;
        }
        len /= 2;
        var hexA = new Array();
        for (var i = 0; i < len; i++) {
            var s = str.substr(pos, 2);
            hexA.push(s);
            pos += 2;
        }
        return hexA;
    },
    /**
     * 十六进制字符串转数组
     * 1185759ac35a91143f97037002b1a266 转换 ["1185759a", "c35a9114", "3f970370", "02b1a266"]
     * @param {String} str 十六进制字符串
     */
    hexToArr2: (str) => {
        var pos = 0;
        var len = str.length;
        if (len % 8 != 0) {
            return null;
        }
        len /= 8;
        var hexA = new Array();
        for (var i = 0; i < len; i++) {
            var s = str.substr(pos, 8);
            hexA.push(s);
            pos += 8;
        }
        return hexA;
    },

    /**
     * 十进制转十六进制
     * 15 转 0F
     * @param {Number} num 十进制数字
     */
    numToHex: (num) => {
        return ("0" + (Number(num).toString(16))).slice(-2).toUpperCase()
    },
    /**
     * TL1 Payload 段所有数据无进位累加和
     * 0300010004F59183B0 转 c1
     * @param {Number} num 十进制数字
     */
    sumCheck: (arr) => {
        var des = 0
        for (var i = 0; i < arr.length; i++) {
            des += parseInt(arr[i], 16)
        }
        return tool.numToHex(des)
    },
    /**将String类型的数据转为ArrayBuffer
     * 
     * @param {*} str 
     */
    hexStringToArrayBuffer: (str) => {
        if (!str) {
            return new ArrayBuffer(0);
        }
        var buffer = new ArrayBuffer(str.length / 2);
        let dataView = new DataView(buffer)
        let ind = 0;
        for (var i = 0, len = str.length; i < len; i += 2) {
            let code = parseInt(str.substr(i, 2), 16)
            dataView.setUint8(ind, code)
            ind++
        }
        return buffer;
    },
    /**
     * Arraybuffer To hex
     * @param {*} buffer 
     */
    arrayBufferToHex: (buffer) => {
        var hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function (bit) {
                return ('00' + bit.toString(16)).slice(-2)
            }
        )
        return hexArr.join('');
    },
    /**
     * 十六进制字符串转字节数组
     * 每2个字符串转换
     * 903132333435363738 转为 [-112, 49, 50, 51, 52, 53, 54, 55, 56]
     * @param {String} str 符合16进制字符串
     */
    StrToBytes: (str) => {
        var pos = 0;
        var len = str.length;
        if (len % 2 != 0) {
            return null;
        }
        len /= 2;
        var hexA = new Array();
        for (var i = 0; i < len; i++) {
            var s = str.substr(pos, 2);
            var v = parseInt(s, 16);
            if (v >= 127) v = v - 255 - 1
            hexA.push(v);
            pos += 2;
        }
        return hexA;
    },
    /*MD5加密方法*/
    md5: (md5str) => {
        var createMD5String = function (string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            var S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            var S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            var S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 1732584193;
            b = 4023233417;
            c = 2562383102;
            d = 271733878;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
                d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
                c = FF(c, d, a, b, x[k + 2], S13, 606105819);
                b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
                a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
                d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
                c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
                b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
                a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
                d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
                c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
                b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
                a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
                d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
                c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
                b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
                a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
                d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
                c = GG(c, d, a, b, x[k + 11], S23, 643717713);
                b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
                a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
                d = GG(d, a, b, c, x[k + 10], S22, 38016083);
                c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
                b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
                a = GG(a, b, c, d, x[k + 9], S21, 568446438);
                d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
                c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
                b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
                a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
                d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
                c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
                b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
                a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
                d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
                c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
                b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
                a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
                d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
                c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
                b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
                a = HH(a, b, c, d, x[k + 13], S31, 681279174);
                d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
                c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
                b = HH(b, c, d, a, x[k + 6], S34, 76029189);
                a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
                d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
                c = HH(c, d, a, b, x[k + 15], S33, 530742520);
                b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
                a = II(a, b, c, d, x[k + 0], S41, 4096336452);
                d = II(d, a, b, c, x[k + 7], S42, 1126891415);
                c = II(c, d, a, b, x[k + 14], S43, 2878612391);
                b = II(b, c, d, a, x[k + 5], S44, 4237533241);
                a = II(a, b, c, d, x[k + 12], S41, 1700485571);
                d = II(d, a, b, c, x[k + 3], S42, 2399980690);
                c = II(c, d, a, b, x[k + 10], S43, 4293915773);
                b = II(b, c, d, a, x[k + 1], S44, 2240044497);
                a = II(a, b, c, d, x[k + 8], S41, 1873313359);
                d = II(d, a, b, c, x[k + 15], S42, 4264355552);
                c = II(c, d, a, b, x[k + 6], S43, 2734768916);
                b = II(b, c, d, a, x[k + 13], S44, 1309151649);
                a = II(a, b, c, d, x[k + 4], S41, 4149444226);
                d = II(d, a, b, c, x[k + 11], S42, 3174756917);
                c = II(c, d, a, b, x[k + 2], S43, 718787259);
                b = II(b, c, d, a, x[k + 9], S44, 3951481745);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        };
        var rotateLeft = function (lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        };
        var addUnsigned = function (lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = lX & 2147483648;
            lY8 = lY & 2147483648;
            lX4 = lX & 1073741824;
            lY4 = lY & 1073741824;
            lResult = (lX & 1073741823) + (lY & 1073741823);
            if (lX4 & lY4) {
                return lResult ^ 2147483648 ^ lX8 ^ lY8;
            }
            if (lX4 | lY4) {
                if (lResult & 1073741824) {
                    return lResult ^ 3221225472 ^ lX8 ^ lY8;
                } else {
                    return lResult ^ 1073741824 ^ lX8 ^ lY8;
                }
            } else {
                return lResult ^ lX8 ^ lY8;
            }
        };
        var F = function (x, y, z) {
            return (x & y) | (~x & z);
        };
        var G = function (x, y, z) {
            return (x & z) | (y & ~z);
        };
        var H = function (x, y, z) {
            return x ^ y ^ z;
        };
        var I = function (x, y, z) {
            return y ^ (x | ~z);
        };
        var FF = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var GG = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var HH = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var II = function (a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        };
        var convertToWordArray = function (string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWordsTempOne = lMessageLength + 8;
            var lNumberOfWordsTempTwo =
                (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
            var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] =
                    lWordArray[lWordCount] |
                    (string.charCodeAt(lByteCount) << lBytePosition);
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };
        var wordToHex = function (lValue) {
            var WordToHexValue = "",
                WordToHexValueTemp = "",
                lByte,
                lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValueTemp = "0" + lByte.toString(16);
                WordToHexValue =
                    WordToHexValue +
                    WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
            }
            return WordToHexValue;
        };
        var uTF8Encode = function (string) {
            string = string.toString().replace(/\x0d\x0a/g, "\x0a");
            var output = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    output += String.fromCharCode(c);
                } else {
                    if (c > 127 && c < 2048) {
                        output += String.fromCharCode((c >> 6) | 192);
                        output += String.fromCharCode((c & 63) | 128);
                    } else {
                        output += String.fromCharCode((c >> 12) | 224);
                        output += String.fromCharCode(((c >> 6) & 63) | 128);
                        output += String.fromCharCode((c & 63) | 128);
                    }
                }
            }
            return output;
        };
        return createMD5String(md5str);
    }
}
/**
 * 蓝牙协议相关
 */
var bp = {
    /**从laisi获取鉴权码
     * 示例requestBody（Object）
     {
        mac: 'BC:97:40:51:90:A3',//当前连接的设备的蓝牙地址
        sn: 'LTA302053C00395',//当前连接的设备的sn
        random: '4294907099'//鉴权命令发送之后，蓝牙设备返回随机数（16进制转为10进制）
     }
     * 示例response （Object）
      {"code":"0","msg":"OK","data":184964417}
     */
    getAuth: (obj) => {
        return new Promise(function (resolve, reject) {
            var headers = {
                appId: utils.appId,
                timestamp: new Date().getTime(),
                version: "v1",
            }
            var str = `appId=${headers.appId}&timestamp=${headers.timestamp}&version=v1&APP_SECRET=${utils.appSecret}`
            headers.sign = tool.md5(str).toUpperCase();
            wx.request({
                url: utils.host + 'thirdpart-api/shzgh/auth/get/key',
                method: 'POST',
                header: headers,
                data: obj,
                success(res) {
                    console.log("从服务端获取随机码"+JSON.stringify(res.data))
                    resolve(res.data)
                },
                fail(err) {
                    console.log("从服务端获取随机码失败")
                    reject(err)
                }

            })
        })
    },
    /**设置及读取跳绳的指令组装
     * obj 
     {
         command:"02",
         key:"08",//保留字段+key
         value:"00"
      }
      AA010009 C1 1E     03 00 01 0004 F59183B0
      
     *  AA 01 0006 0B 1D  02 0008 0001 00 
        1) AA：先导字节，固定
        2) 01：错误标记、应答标记、版本号
        3) 00 0B：数据长度，即从 TL1 Header之后开始的数据 6 
        4) 21： TL1 Payload 段所有数据无进位累加和， 11
        5) 01: Sequence id 发送时持续累加
        6) 01：Command ID ，这里是设置命令
        7) 00：保留字段
        8) 01：key 字段
        9) 00 06：key length 字段，表示value字段包含的数据大小
        10) c0 a8 01 01：表示NB模块服务器地址，即 192.168.1.1
        11) 1F 90：表示NB模块服务器端口, 即 8080.
    */
    commandAssemble: (obj) => {
        return new Promise(function (resolve, reject) {
            if (!obj || !obj.command || !obj.key) {
                reject({
                    code: -1,
                    data: "",
                    msg: "指令对象不正确,请检查指令！"
                })
            }
            switch (obj.command) {
                case "01": //设置类
                    switch (obj.key) {
                        case "01":
                            break;
                        case "02":
                            if (obj.requestCommand) {
                                var requestCommand = obj.requestCommand;
                                var timestamps = requestCommand.timestamps
                                if (!timestamps) reject({
                                    code: -1,
                                    data: "",
                                    msg: "时间戳（timestamps）为空！"
                                });
                                var datetime = new Date(timestamps)
                                var year = datetime.getFullYear();
                                var month = datetime.getMonth() + 1;
                                var day = datetime.getDate();
                                var hour = datetime.getHours();
                                var minute = datetime.getMinutes();
                                var second = datetime.getSeconds();
                                obj.value = tool.numToHex(year - 2000) + tool.numToHex(month) + tool.numToHex(day) + tool.numToHex(hour) + tool.numToHex(minute) + tool.numToHex(second);
                            } else {
                                reject({
                                    code: -1,
                                    data: "",
                                    msg: "未包含requestCommand对象！"
                                });
                            }
                            break;
                        case "03":
                            break;
                        case "04":
                            if (obj.requestCommand) {
                                var requestCommand = obj.requestCommand;
                                var mode = requestCommand.mode;
                                var modeValue = requestCommand.modeValue;
                                var dataType = requestCommand.dataType || 0;
                                var skipId = requestCommand.skipId || 0;
                                if (!mode || !modeValue) reject({
                                    code: -1,
                                    data: "",
                                    msg: "跳绳模式（mode）或者模式值（modeValue）为空！"
                                });
                                obj.value = tool.numToHex(mode) + Number(modeValue).toString(16).padStart(4, "0000").slice(-4) + tool.numToHex(dataType) + Number(skipId).toString(16).padStart(8, "00000000").slice(-8);
                            } else {
                                reject({
                                    code: -1,
                                    data: "",
                                    msg: "未包含requestCommand对象！"
                                });
                            }
                            break;
                        case "05":
                            break;
                        case "06":
                            break;
                        case "07":
                            break;
                        case "08":
                            if (obj.requestCommand) {
                                var requestCommand = obj.requestCommand;
                                var tripleJumpSwitch = requestCommand.tripleJumpSwitch || 0;
                                obj.value = tool.numToHex(tripleJumpSwitch)
                            } else {
                                reject({
                                    code: -1,
                                    data: "",
                                    msg: "未包含requestCommand对象！"
                                });
                            }
                            break;
                        case "09":
                            if (obj.requestCommand) {
                                var requestCommand = obj.requestCommand;
                                var lightMode = requestCommand.lightMode;
                                var brightness = requestCommand.brightness;
                                var rate = requestCommand.rate;
                                var colorList = requestCommand.colorList;
                                if (!lightMode || !brightness || !rate || !colorList) reject({
                                    code: -1,
                                    data: "",
                                    msg: "检查参数是否正确！"
                                });
                                var colorStr = "";
                                colorList.forEach((item, index) => {
                                    colorStr += tool.numToHex(item)
                                })
                                obj.value = tool.numToHex(lightMode) + Number(brightness).toString(16) + Number(rate).toString(16) + colorStr
                            } else {
                                reject({
                                    code: -1,
                                    data: "",
                                    msg: "未包含requestCommand对象！"
                                });
                            }
                            break;
                    }
                    break;
                case "02": //读取类
                    switch (obj.key) {
                        case "08":
                            obj.value="01"
                            break;
                    }
                    break
                case "03": //鉴权
                    switch (obj.key) {
                        case "01":
                            if (obj.requestCommand) {
                                var requestCommand = obj.requestCommand;
                                var random = requestCommand.random;
                                if (!random) reject({
                                    code: -1,
                                    data: "",
                                    msg: "随机数（random）为空！"
                                });
                                obj.value = Number(random).toString(16).padStart(8, "00000000").slice(-8).toUpperCase()
                            } else {
                                reject({
                                    code: -1,
                                    data: "",
                                    msg: "未包含requestCommand对象！"
                                });
                            }
                            break;
                    }
                    break

                    

            }
            const prefix = "AA"; //1
            let Errorflag = "01"; //2
            let sequenceID = tool.numToHex(utils.sequenceIDcofig++); //5
            let commandID = obj.command; //6
            let key = Number(obj.key).toString(16).padStart(4, "0000").slice(-4);
            let valueLength = Number((obj.value || "").length / 2).toString(16).padStart(4, "0000").slice(-4); //9
            let val = obj.value || ""; //10
            let payload = commandID + key + valueLength + val;
            let payloadLength = Number(payload.length / 2).toString(16).padStart(4, "0000").slice(-4); //3
            let sumCheck = tool.sumCheck(tool.hexToArr(payload)); //4
            let header = [
                prefix,
                Errorflag,
                payloadLength,
                sumCheck,
                sequenceID
            ]
            var sendCode = header.join("") + payload
            console.log("发送的指令：" + sendCode.toUpperCase())
            resolve({
                code: 0,
                data: tool.hexStringToArrayBuffer(sendCode.toUpperCase()),
                msg: "success"
            })
        })
    },
    /**设置及读取跳绳的指令解析
     * 
     * @param {*} buffer 
     */
    commandAnalysis: (buffer) => {
        return new Promise(function (resolve, reject) {
            if (!buffer) {
                reject({
                    code: -1,
                    data: "",
                    msg: "无正确的Buffer参数！"
                })
            }
            var str = tool.arrayBufferToHex(buffer).toUpperCase();
            var prefix = str.substr(0, 2);
            //如果接收的命令头部是AA，说明是包头;将全局变量初始值。否则拼接
            if (prefix == "AA") {
                utils.commandHeader = str;
                utils.fullCommand = str;
            } else {
                utils.fullCommand += str;
            }
            //如果接收到的包的长度和包头的协议不一致的话 需要再次接收，并与之前的拼接
            if ((utils.fullCommand.length - 12) / 2 < parseInt(utils.commandHeader.substr(4, 4), 16)) {
                //console.log("正在接收数据，当前数据包：" + utils.fullCommand)
            } else {
                //包长一致的话 进行sumCheck认证，一样的话可以进行数据包解析，否则丢弃
                var sumCheck = utils.commandHeader.substr(8, 2);
                var payload = utils.fullCommand.substr(12, utils.fullCommand.length - 1)
                var sumCheck2 = tool.sumCheck(tool.hexToArr(payload))
                if (sumCheck != sumCheck2) {
                    //console.log("废弃的数据包：" + utils.fullCommand)
                    utils.fullCommand = "";
                    utils.commandHeader = "";
                    reject({
                        code: -1,
                        data: "",
                        msg: "废弃的数据包：" + utils.fullCommand
                    })
                } else {
                    //console.log("最后接收到的完整的数据包：" + utils.fullCommand)
                    var commandObj = {
                        initialInstruction: utils.fullCommand,
                        prefix: utils.fullCommand.substr(0, 2),
                        Errorflag: utils.fullCommand.substr(2, 2),
                        payloadLength: utils.fullCommand.substr(4, 4),
                        sumCheck: utils.fullCommand.substr(8, 2),
                        sequenceID: utils.fullCommand.substr(10, 2),
                        command: utils.fullCommand.substr(12, 2),
                        keyPlaceholder: utils.fullCommand.substr(14, 2),
                        key: utils.fullCommand.substr(16, 2),
                        valueLength: utils.fullCommand.substr(18, 4),
                        value: utils.fullCommand.substr(22, parseInt(utils.fullCommand.substr(18, 4), 16) * 2),
                        other: utils.fullCommand.substr(22 + parseInt(utils.fullCommand.substr(18, 4), 16) * 2, utils.fullCommand.length - 1),
                    }
                    commandObj.desc = utils.commandList[commandObj.command][commandObj.key]
                    console.log("接收的指令"+"--" + commandObj.desc+"--" + commandObj.initialInstruction)
                    bp.commandEscape(commandObj).then(res => {
                        resolve({
                            code: 0,
                            data: res.data,
                            msg: "success"
                        })
                    }).catch(err => {
                        //console.log(err)
                    })


                }
            }

        })

    },
    /**设置及读取跳绳的指令转义
     * 
     * @param {*} obj 
     */
    commandEscape: (obj) => {
        return new Promise(function (resolve, reject) {
            if (obj.Errorflag == "41") {
                switch (obj.command) {
                    case "01": //设置类
                        resolve({
                            code: 0,
                            data: obj,
                            msg: "success"
                        })
                        break;
                    case "02": //读取信息类
                        switch (obj.key) {
                            case "01":
                                obj.responseCommand = {
                                    version: parseInt(obj.value, 16)
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "04":
                                //当前年份减去2000后的值1 月1 日1 时1 分1 秒1
                                var dateTime = tool.StrToBytes(obj.value)
                                var year = dateTime[0] + 2000;
                                var month = dateTime[1].toString().padStart(2, '00');
                                var day = dateTime[2].toString().padStart(2, '00');
                                var hour = dateTime[3].toString().padStart(2, '00');
                                var minute = dateTime[4].toString().padStart(2, '00');
                                var second = dateTime[5].toString().padStart(2, '00');
                                obj.responseCommand = {
                                    year: year,
                                    month: month,
                                    day: day,
                                    hour: hour,
                                    minute: minute,
                                    second: second,
                                    dateTime: year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second,
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "05":
                                //当天时间戳4 电池容量百分比2
                                obj.responseCommand = {
                                    battery: parseInt(obj.value.substr(8, 4), 16)
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "07":
                                // AA410013B502020007000E 01 2 5 003 C 0000 0000 003 C 0000 0000
                                /**
                                 * 跳绳模式：1-自由跳 2-倒计时跳 3-倒计数跳
                                 * 跳绳模式值，如果是倒计时跳，就是跳多少秒；如果是倒计数跳，就是跳多少个
                                 * 跳绳类别 0:一般模式，跳绳过程中可以切换跳绳模式非0: 防作弊模式，跳绳过程中不能切换模式及复位该位置没有值时请传0
                                 * 跳绳数据id 用于对跳绳数据进行分类，供后台数据分类使用。该位置没有值时请传0
                                 * */
                                if (parseInt(obj.valueLength, 16) == 9) {
                                    //V0版本结构：
                                    //跳绳模式0.5 跳绳设备的状态0.5 跳绳模式设置的值2 跳绳次数2 有效跳绳时长2 时间显示2
                                    obj.responseCommand = {
                                        mode: parseInt(obj.value.substr(0, 1), 16),
                                        status: parseInt(obj.value.substr(1, 1), 16),
                                        modeValue: parseInt(obj.value.substr(2, 4), 16),
                                        number: parseInt(obj.value.substr(6, 4), 16),
                                        activeMs: parseInt(obj.value.substr(10, 4), 16),
                                        duraMs: parseInt(obj.value.substr(14, 4), 16),
                                    }
                                } else {
                                    if (parseInt(obj.value.substr(0, 2), 16) == 1) {
                                        //V1版本结构：
                                        //数据协议版本号1 跳绳模式0.5 跳绳设备的状态0.5 当前跳绳模式设置的值2 当前跳绳次数2 当前有效跳绳时长2 当前时间显示2 当前双摇次数2 当前三摇次数2
                                        obj.responseCommand = {
                                            version: parseInt(obj.value.substr(0, 2), 16),
                                            mode: parseInt(obj.value.substr(2, 1), 16),
                                            status: parseInt(obj.value.substr(3, 1), 16),
                                            modeValue: parseInt(obj.value.substr(4, 4), 16),
                                            number: parseInt(obj.value.substr(8, 4), 16),
                                            activeMs: parseInt(obj.value.substr(12, 4), 16),
                                            duraMs: parseInt(obj.value.substr(16, 4), 16),
                                            doubleJump: parseInt(obj.value.substr(20, 4), 16),
                                            tripleJump: parseInt(obj.value.substr(24, 4), 16),
                                        }
                                    }
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "08":
                                obj.responseCommand = {
                                    random: parseInt(obj.value, 16)
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "09":
                                obj.responseCommand = {
                                    customerCode: parseInt(obj.value, 16)
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "0A":
                                //从手柄读取双三摇开关，1表示记录双三摇数据，0表示不记录双三摇数据
                                obj.responseCommand = {
                                    tripleJumpSwitch: parseInt(obj.value, 16)
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "0B":
                                /**
                                 * 从手柄读取手柄目前支持的功能项 0101000000
                                 * 版本号为1时，表示功能配置项有支持双三摇功能，仅解析第二个字节的第一位即可,为1时表示支持双三摇功能，可对其进行开启和关闭该功能。其他配置项版本号预留。
                                 * 版本号为2时，表示功能配置项有是否支持双三摇功能、是否开关计数功能。解析时，第二字节1位为1时表示支持双三摇功能；第二字节2位为1时表示支持开关计数功能，这个是发光跳绳的需求，特殊场景下，用户可能需要关闭计数功能（比如使用了计数手柄跳发光跳绳，不希望两个设备都有历史数据)。其他配置项预留。

                                */
                                if (parseInt(obj.value.substr(0, 2), 16) == 1) {
                                    obj.responseCommand = {
                                        tripleJumpSwitch: parseInt(obj.value.substr(2, 2), 16)
                                    }
                                } else {
                                    obj.responseCommand = {
                                        tripleJumpSwitch: parseInt(obj.value.substr(2, 2), 16),
                                        countSwitch: parseInt(obj.value.substr(4, 2), 16),
                                    }
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            case "0C":
                                /**
                                 * 从发光跳绳读取发光模式相关信息 
                                 * 发光模式:1：单色常亮 2：单色呼吸 3：多色渐变 4：BPM模式(1)
                                 * 亮度:颜色亮度 (0.5)
                                 * 频次:发光模式1和4，APP端不需要关注频次(0.5)
                                 * 颜色R（0-255）(1*3):发光模式1和2，只跟3个字节分别是RGB。模式3至少是2个RGB，最多7个RGB。但是有个特殊值0，表示默认多色。
                                 */
                                var arr = tool.StrToBytes(obj.value);
                                var colorList = [];
                                arr.forEach((item, index) => {
                                    if (index > 1) {
                                        colorList.push(parseInt(item, 16))
                                    }
                                })
                                obj.responseCommand = {
                                    lightMode: parseInt(obj.value.substr(0, 2), 16),
                                    brightness: parseInt(obj.value.substr(2, 1), 16),
                                    rate: parseInt(obj.value.substr(3, 1), 16),
                                    colorList: colorList
                                }
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                            default:
                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                        }
                        break;
                    case "03": //鉴权
                        resolve({
                            code: 0,
                            data: obj,
                            msg: "success"
                        })
                        break;
                    case "04": //数据同步
                        switch (obj.key) {
                            case "01":
                                /**
                                 * 03 61D54251 0200 3C 0000000000 0001 0002 0001 0001 002D 0000 0001 00 0000 0002 0001 0001 0000 0000
                                 * 数据协议版本号v2 跳绳开始时间戳 跳绳模式 跳绳模式值 跳绳类别 跳绳数据ID 跳绳活动时长 跳绳拌绳次数 最大连续跳绳次数 跳绳总次数 跳绳总时长 平均频次 最快频次 跳绳的分段数 分段1跳绳次数 分段1跳绳时长 分段2跳绳次数分段2跳绳时长...
                                 * 数据协议版本号v3(1) 跳绳开始时间戳4 跳绳模式1 跳绳模式值2 跳绳类别1 跳绳数据ID4 跳绳活动时长2 跳绳拌绳次数2 最大连续跳绳次数2 跳绳总次数2 跳绳总时长2 平均频次2 最快频次2 双摇次数2 三摇次数2 跳绳的分段数1 分段1跳绳次数2 分段1跳绳时长2 分段2跳绳次数2 分段2跳绳时长2 ...
                                 * */
                                if (parseInt(obj.value.substr(0, 2), 16) == 2) { //V2版本数据
                                    var arr = tool.hexToArr2(obj.value.substr(64, parseInt(obj.value.substr(54, 2), 16) * 8))
                                    var sectionList = []
                                    arr.forEach((item, index) => {
                                        var sectionObj = {
                                            count: parseInt(item.substr(0, 4), 16),
                                            duration: parseInt(item.substr(4, 4), 16),
                                            order: index
                                        }
                                        sectionList.push(sectionObj)
                                    })
                                    obj.responseCommand = {
                                        timestamps: parseInt(obj.value.substr(2, 8), 16),
                                        mode: parseInt(obj.value.substr(10, 2), 16),
                                        modeValue: parseInt(obj.value.substr(12, 4), 16),
                                        dataType: parseInt(obj.value.substr(16, 2), 16),
                                        skipId: parseInt(obj.value.substr(18, 8), 16),
                                        activeMs: parseInt(obj.value.substr(26, 4), 16),
                                        realSection: parseInt(obj.value.substr(30, 4), 16),
                                        mostHolding: parseInt(obj.value.substr(34, 4), 16),
                                        number: parseInt(obj.value.substr(38, 4), 16),
                                        duraMs: parseInt(obj.value.substr(42, 4), 16),
                                        avgNumber: parseInt(obj.value.substr(46, 4), 16),
                                        mostFreq: parseInt(obj.value.substr(50, 4), 16),
                                        section: parseInt(obj.value.substr(54, 2), 16),
                                        sectionList: sectionList
                                    }
                                } else if (parseInt(obj.value.substr(0, 2), 16) == 3) { //V3版本数据
                                    var arr = tool.hexToArr2(obj.value.substr(64, parseInt(obj.value.substr(62, 2), 16) * 8))
                                    var sectionList = []
                                    arr.forEach((item, index) => {
                                        var sectionObj = {
                                            count: parseInt(item.substr(0, 4), 16),
                                            duration: parseInt(item.substr(4, 4), 16),
                                            order: index
                                        }
                                        sectionList.push(sectionObj)
                                    })

                                    obj.responseCommand = {
                                        timestamps: parseInt(obj.value.substr(2, 8), 16),
                                        mode: parseInt(obj.value.substr(10, 2), 16),
                                        modeValue: parseInt(obj.value.substr(12, 4), 16),
                                        dataType: parseInt(obj.value.substr(16, 2), 16),
                                        skipId: parseInt(obj.value.substr(18, 8), 16),
                                        activeMs: parseInt(obj.value.substr(26, 4), 16),
                                        realSection: parseInt(obj.value.substr(30, 4), 16),
                                        mostHolding: parseInt(obj.value.substr(34, 4), 16),
                                        number: parseInt(obj.value.substr(38, 4), 16),
                                        duraMs: parseInt(obj.value.substr(42, 4), 16),
                                        avgNumber: parseInt(obj.value.substr(46, 4), 16),
                                        mostFreq: parseInt(obj.value.substr(50, 4), 16),
                                        doubleJump: parseInt(obj.value.substr(54, 4), 16),
                                        tripleJump: parseInt(obj.value.substr(58, 4), 16),
                                        section: parseInt(obj.value.substr(62, 2), 16),
                                        sectionList: sectionList
                                    }
                                }

                                resolve({
                                    code: 0,
                                    data: obj,
                                    msg: "success"
                                })
                                break;
                        }
                        break;
                    default:
                        resolve({
                            code: 0,
                            data: obj,
                            msg: "success"
                        })
                }
            } else if (obj.Errorflag == "C1") {
                console.log("返回的指令不对，需要重新鉴权")
                reject({
                    code: -1,
                    data: "",
                    msg: "返回的指令不对，需要重新鉴权"
                })
            }
        })


    },
    /**接收实时跳绳数据指令解析
     * 
     * @param {*} obj 
     */
    realTimeDataAnalysis: (buffer) => {
        return new Promise(function (resolve, reject) {
            if (!buffer) {
                reject({
                    code: -1,
                    data: "",
                    msg: "无正确的Buffer参数！"
                })
            }
            /**
             * v0 11字节头，AA开头 当前跳绳模式0.5 跳绳当前状态0.5(1-就绪状态 2-正在跳绳状态 5-跳绳结束状态) 当前跳绳模式设置的值2 当前跳绳次数2 当前有效跳绳时长2 当前时间显示2
             *  v1 01开头 当前跳绳模式0.5 跳绳当前状态0.5(1-就绪状态 2-正在跳绳状态 5-跳绳结束状态) 当前跳绳模式设置的值2 当前跳绳次数2 当前有效跳绳时长2 当前时间显示2 当前双摇次数2 当前三摇次数2
             * */
            var str = tool.arrayBufferToHex(buffer).toUpperCase();
            console.log("接收的实时数据指令"+str)
            var prefix = str.substr(0, 2); //如果接收的命令头部是AA，说明是V0;否则V1
            var obj = {};
            if (prefix == "AA") {
                obj = {
                    mode: parseInt(str.substr(22, 1), 16),
                    status: parseInt(str.substr(23, 1), 16),
                    modeValue: parseInt(str.substr(24, 4), 16),
                    count: parseInt(str.substr(28, 4), 16),
                    activeMs: parseInt(str.substr(32, 4), 16),
                    showTime: parseInt(str.substr(36, 4), 16),
                }
            } else if (prefix == "01") {
                obj = {
                    mode: parseInt(str.substr(2, 1), 16),
                    status: parseInt(str.substr(3, 1), 16),
                    modeValue: parseInt(str.substr(4, 4), 16),
                    count: parseInt(str.substr(8, 4), 16),
                    activeMs: parseInt(str.substr(12, 4), 16),
                    showTime: parseInt(str.substr(16, 4), 16),
                    doubleJump: parseInt(str.substr(20, 4), 16),
                    tripleJump: parseInt(str.substr(24, 4), 16),
                }
            }
            console.log("接收的实时数据指令处理之后的数据："+JSON.stringify(obj))
            resolve({
                code: 0,
                data: obj,
                msg: "success"
            })
        })
    }
}

export {
    bp
};