import {
    bp
} from "./bluetoothProtocol"
Page({
    data: {
        multiArray: [
            [{
                    id: "01",
                    name: "设置类01",
                }, {
                    id: "02",
                    name: "读取信息类02"
                },
                {
                    id: "03",
                    name: "鉴权类03"
                }, {
                    id: "04",
                    name: "数据同步类04"
                },
            ],
            [{
                    id: "01",
                    name: "举例说明，未使用",
                    value: "",
                }, {
                    id: "02",
                    name: "设置RTC时间",
                    value: ""
                },
                {
                    id: "03",
                    name: "确认历史记录同步成功"
                }, {
                    id: "04",
                    name: "开始跳绳"
                },
                {
                    id: "05",
                    name: "停止跳绳"
                }, {
                    id: "06",
                    name: "呼叫设备"
                },
                {
                    id: "07",
                    name: "重启设备进入FOTA模式"
                }, {
                    id: "08",
                    name: "设置双三摇开关"
                },
                {
                    id: "09",
                    name: "设置发光跳绳发光模式、颜色、亮度、频次"
                }
            ]
        ],
        multiIndex: [],
        info: "未初始化蓝牙适配器",
        connectedDeviceId: "",
        deviceId: "",

        requestCommand: {
            mac: 'BC:97:40:51:90:A3', //当前连接的设备的蓝牙地址
            sn: 'LTA302053C00395', //当前连接的设备的sn
            
            timestamps: new Date().getTime(),

            mode: 2,
            modeValue: 199,

            tripleJumpSwitch: 1,

            lightMode: 1,
            brightness: 1,
            rate: 1,
            colorList: [255, 255, 0]
        },
        //接收实时跳绳数据
        SKIPROPE_BLE_NOTIFY_SERVICE: "0000FFE0-0000-1000-8000-00805F9B34FB",
        SKIPROPE_BLE_NOTIFY_CHARACTERISTIC: "0000FFE4-0000-1000-8000-00805F9B34FB",
        // 设置及读取跳绳的指令
        SKIPROPE_BLE_TRANSMISSION_SERVICE: "0000FFF0-0000-1000-8000-00805F9B34FB",
        SKIPROPE_BLE_TRANSMISSION_NOTIFY: "0000FFF1-0000-1000-8000-00805F9B34FB",
        SKIPROPE_BLE_TRANSMISSION_WRITE: "0000FFF2-0000-1000-8000-00805F9B34FB"
    },
    onLoad() {},
    //初始化蓝牙
    lanyatest1(event) {
        var that = this;
        wx.openBluetoothAdapter({
            success: function (res) {
                console.log('初始化蓝牙适配器成功')
                //页面日志显示
                that.setData({
                    info: '初始化蓝牙适配器成功'
                })
                that.lanyatest2()
            },
            fail: function (res) {
                console.log('请打开蓝牙和定位功能')
                that.setData({
                    info: '请打开蓝牙和定位功能'
                })
            }
        })
    },
    //获取蓝牙的状态
    lanyatest2(event) {
        var that = this;
        wx.getBluetoothAdapterState({
            success: function (res) {
                //打印相关信息
                console.log(JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available);

                that.setData({
                    info: JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available
                })
                that.lanyatest3()

            },
            fail: function (res) {
                //打印相关信息
                console.log(JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available);

                that.setData({
                    info: JSON.stringify(res.errMsg) + "\n蓝牙是否可用：" + res.available
                })

            }

        })

    },
    //搜索周边设备
    lanyatest3(event) {
        var that = this;
        wx.startBluetoothDevicesDiscovery({
            services: ['0000FFE0'], //如果填写了此UUID，那么只会搜索出含有这个UUID的设备，建议一开始先不填写或者注释掉这一句
            success: function (res) {
                that.setData({
                    info: "搜索设备" + JSON.stringify(res),
                })
                console.log('搜索设备返回' + JSON.stringify(res))

            }
        })

    },
    //获取所有的设备
    lanyatest4(event) {
        var that = this;
        wx.getBluetoothDevices({
            success: function (res) {

                that.setData({
                    info: "设备列表\n" + JSON.stringify(res.devices),
                    devices: res.devices
                })
                console.log('搜设备数目：' + res.devices.length)
                console.log('设备信息：\n' + JSON.stringify(res.devices) + "\n")
            }
        })

    },
    //连接蓝牙设备
    lanyaconnect(event) {
        var that = this;
        wx.createBLEConnection({
            deviceId: event.currentTarget.id,
            // deviceId: "23AB21E4-DC3E-7D32-4B5D-2C08EC09BBB6", //90A3
            success: function (res) {
                console.log('调试信息：' + res.errMsg);
                that.setData({
                    connectedDeviceId: event.currentTarget.id,
                    info: "MAC地址：" + event.currentTarget.id + '  调试信息：' + res.errMsg,

                })
                that.lanyatest6()
                that.lanyatest7()
            },
            fail: function () {
                console.log("连接失败");
            },

        })

    },
    //蓝牙设备连接上的话，就先停止搜索
    lanyatest6(event) {
        var that = this;
        wx.stopBluetoothDevicesDiscovery({
            success: function (res) {
                console.log("停止搜索" + JSON.stringify(res.errMsg));
                that.setData({
                    info: "停止搜索" + JSON.stringify(res.errMsg),
                })
            }
        })
    },
    //获取连接的设备DeviceServices
    lanyatest7(event) {
        var that = this;
        wx.getBLEDeviceServices({
            deviceId: that.data.connectedDeviceId,
            success: function (res) {
                that.setData({
                    info: JSON.stringify(res.services),
                })
            }
        })
    },
    //开启设置及读取跳绳的指令
    lanyatest8_1(event) {
        var that = this;
        wx.getBLEDeviceCharacteristics({
            deviceId: that.data.connectedDeviceId,
            serviceId: that.data.SKIPROPE_BLE_TRANSMISSION_SERVICE,
            success(res) {
                console.log('SKIPROPE_BLE_TRANSMISSION_SERVICE device getBLEDeviceCharacteristics:', res.characteristics)
                that.setData({
                    info: JSON.stringify(res.characteristics) + "\n服务特征"
                })
                that.lanyatest9_1()
            },
            fail: function (res) {
                console.log(JSON.stringify(res.errMsg) + "\n服务特征出错");
            },
        })
    },
    //开启设置及读取跳绳的指令的返回值监听
    lanyatest9_1() {
        var that = this;
        wx.notifyBLECharacteristicValueChange({
            state: true,
            deviceId: that.data.connectedDeviceId,
            serviceId: that.data.SKIPROPE_BLE_TRANSMISSION_SERVICE,
            characteristicId: that.data.SKIPROPE_BLE_TRANSMISSION_NOTIFY,
            success: function (res) {
                console.log('SKIPROPE_BLE_TRANSMISSION_NOTIFY notifyBLECharacteristicValueChange   success', res.errMsg)
            },
            fail: function (res) {
                console.log(JSON.stringify(res.errMsg) + "\n开始监听失败");
            },
        })

        wx.onBLECharacteristicValueChange(function (res) {
            console.log('characteristic value comed')
            bp.commandAnalysis(res.value).then(res2 => {
                that.setData({
                    info: JSON.stringify(res2.data),
                })
                if (res2.data.command == "02" && res2.data.key == '08') {
                    that.lanyatest11(res2.data)
                }
            })


        })
    },
    //接收实时跳绳数据
    lanyatest8_2(event) {
        var that = this;
        wx.getBLEDeviceCharacteristics({
            deviceId: that.data.connectedDeviceId,
            serviceId: that.data.SKIPROPE_BLE_NOTIFY_SERVICE,
            success(res) {
                console.log('SKIPROPE_BLE_NOTIFY_SERVICE device getBLEDeviceCharacteristics:', res.characteristics)
                that.setData({
                    info: JSON.stringify(res.characteristics) + "\n服务特征"
                })
                that.lanyatest9_2()
            },
            fail: function (res) {
                console.log(JSON.stringify(res.errMsg) + "\n服务特征出错");
            },
        })
    },
    // 接收实时跳绳数据 的返回值监听
    lanyatest9_2() {
        var that = this;
        wx.notifyBLECharacteristicValueChange({
            state: true,
            deviceId: that.data.connectedDeviceId,
            serviceId: that.data.SKIPROPE_BLE_NOTIFY_SERVICE,
            characteristicId: that.data.SKIPROPE_BLE_NOTIFY_CHARACTERISTIC,
            success: function (res) {
                console.log('SKIPROPE_BLE_NOTIFY_CHARACTERISTIC notifyBLECharacteristicValueChange success', res.errMsg)
            },
            fail: function (res) {
                console.log(JSON.stringify(res.errMsg) + "\n开始监听失败");
            },
        })

        wx.onBLECharacteristicValueChange(function (res) {
            bp.realTimeDataAnalysis(res.value).then(res2 => {
                that.setData({
                    info: JSON.stringify(res2.data),
                })
            }).catch(err => {
                console.log(err)
            })


        })
    },

    //鉴权第一步获取设备端的验证码
    lanyatest10() {
        let buffer = bp.commandAssemble({
            command: "02",
            key: "08",
        }).then(res => {
            this.sendCommand(res.data)
        }).catch(err => {
            console.log(err)
        })

    },
    //监听到设备的0208后 拿到设备的验证码后请求接口 拿到随机数 进行0301鉴权
    lanyatest11(obj) {
        var that=this;
        bp.getAuth({
            mac: that.data.requestCommand.mac, //当前连接的设备的蓝牙地址
            sn: that.data.requestCommand.sn, //当前连接的设备的sn
            random: obj.responseCommand.random
        }).then(res => {
            bp.commandAssemble({
                command: "03",
                key: "01",
                requestCommand: {
                    random: res.data
                }
            }).then(res2 => {
                this.sendCommand(res2.data)
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })

    },
    //方便调试，picker选择后直接发送指令码
    bindMultiPickerChange: function (e) {
        var that = this;
        this.setData({
            multiIndex: e.detail.value
        })
        bp.commandAssemble({
            command: that.data.multiArray[0][that.data.multiIndex[0]].id,
            key: that.data.multiArray[1][that.data.multiIndex[1]].id,
            requestCommand: that.data.requestCommand
        }).then(res => {
            this.sendCommand(res.data)
        }).catch(err => {
            console.log(err)
        })

    },
    //picker选项发生变化之后，第二栏页同时改变
    bindMultiPickerColumnChange: function (e) {
        var arr = this.data.multiArray;
        switch (e.detail.column) {
            case 0:
                switch (e.detail.value) {
                    case 1:
                        arr[1] = arr[1] = [{
                                id: '01',
                                name: "读取设备固件版本号"
                            }, {
                                id: '04',
                                name: "读取设备RTC时间"
                            },
                            {
                                id: '05',
                                name: "读取设备电量"
                            }, {
                                id: '07',
                                name: "读取设备当前跳绳状态"
                            },
                            {
                                id: '08',
                                name: "获取鉴权随机码"
                            }, {
                                id: '09',
                                name: "获取客户代码"
                            },
                            {
                                id: '0A',
                                name: "获取双三摇开关"
                            }, {
                                id: '0B',
                                name: "获取功能配置项"
                            },
                            {
                                id: '0C',
                                name: "获取发光跳绳发光模式颜色、亮度、频次"
                            },
                        ]
                        this.setData({
                            multiArray: arr
                        });
                        break
                    case 2:
                        arr[1] = [{
                            id: '01',
                            name: "鉴权"
                        }]
                        this.setData({
                            multiArray: arr
                        });
                        break
                    case 3:
                        arr[1] = [{
                            id: '01',
                            name: "同步历史数据"
                        }]
                        this.setData({
                            multiArray: arr
                        });
                        break
                    default:
                        arr[1] = [{
                                id: "01",
                                name: "举例说明，未使用"
                            }, {
                                id: "02",
                                name: "设置RTC时间"
                            },
                            {
                                id: "03",
                                name: "确认历史记录同步成功"
                            }, {
                                id: "04",
                                name: "开始跳绳"
                            },
                            {
                                id: "05",
                                name: "停止跳绳"
                            }, {
                                id: "06",
                                name: "呼叫设备"
                            },
                            {
                                id: "07",
                                name: "重启设备进入FOTA模式"
                            }, {
                                id: "08",
                                name: "设置双三摇开关"
                            },
                            {
                                id: "09",
                                name: "设置发光跳绳发光模式、颜色、亮度、频次"
                            }
                        ]
                        this.setData({
                            multiArray: arr
                        });
                        break
                }
                break
        }
    },
    //发送指令
    sendCommand(buffer) {
        var that = this;
        wx.writeBLECharacteristicValue({
            deviceId: that.data.connectedDeviceId,
            serviceId: that.data.SKIPROPE_BLE_TRANSMISSION_SERVICE,
            characteristicId: that.data.SKIPROPE_BLE_TRANSMISSION_WRITE,
            value: buffer,
            success: function (res) {
                console.log(res)
            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            },
        })
    },

    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var requestCommand =  e.detail.value
        this.setData({
            requestCommand: requestCommand
        })
    },
})