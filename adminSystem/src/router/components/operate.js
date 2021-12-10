import Layout from '@/layout'
var operate = {
    path: '/operate',
    component: Layout,
    redirect: '/operate/pointLottery',
    permission: 'operate',
    hidden: true,
    meta: {
        title: '运营活动',
        icon: 'menu_operate'
    },
    children: [{
            path: 'shareConfig',
            permission: 'operate:shareConfig',
            hidden: true,
            component: () =>
                import ('@/views/operate/shareConfig/shareConfig'),
            meta: {
                title: '分享模板',
                icon: 'operate_shareConfig'
            }
        },
        {
            path: 'withdrawal',
            permission: 'operate:withdrawal',
            hidden: true,
            component: () =>
                import ('@/views/operate/withdrawal'),
            meta: {
                title: '提现审核',
                icon: 'operate_withdrawal'
            }
        },
        {
            path: 'onlinePK',
            permission: 'operate:onlinePK',
            hidden: true,
            redirect: '/operate/onlinePK/onLinePKList',
            component: () =>
                import ('@/views/operate/onlinePK/onlinePKIndex'),
            meta: {
                title: '在线Pk赛',
                icon: 'operate_onlinePK'
            },
            children: [{
                    path: 'onlinePKList',
                    permission: 'operate:onlinePK:onlinePKList',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/onlinePK/onlinePKList'),
                    meta: {
                        title: '在线Pk赛',
                        icon: 'menu_onlinePKList'
                    }
                },
                {
                    path: 'robot',
                    permission: 'operate:onlinePK:robot',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/onlinePK/robot'),
                    meta: {
                        title: '机器人管理',
                        icon: 'menu_robot'
                    }
                }
            ]
        },
        {
            path: 'officialActivities',
            permission: 'operate:officialActivities',
            hidden: true,
            component: () =>
                import ('@/views/operate/officialActivities'),
            meta: {
                title: '首页官方活动',
                icon: 'operate_officialActivities'
            }
        },
        {
            path: 'payControl',
            permission: 'operate:payControl',
            hidden: true,
            component: () =>
                import ('@/views/operate/payControl'),
            meta: {
                title: '支付控制管理',
                icon: 'operate_payControl'
            }
        },
        {
            path: 'redbagGame',
            permission: 'operate:redbagGame',
            hidden: true,
            component: () =>
                import ('@/views/operate/redbagGame/redbagGame'),
            meta: {
                title: '红包挑战赛',
                icon: 'operate_redbag'
            }
        },
        {
            path: 'redBagExport',
            permission: 'operate:redBagExport',
            hidden: true,
            component: () =>
                import ('@/views/operate/redBagExport'),
            meta: {
                title: '红包统计',
                icon: 'operate_redbag'
            },
        },
        {
            path: 'activityConfig',
            permission: 'operate:activityConfig',
            hidden: true,
            component: () =>
                import ('@/views/operate/activityConfig'),
            meta: {
                title: '活动显示配置',
                icon: 'operate_activityConfig'
            }
        },
        {
            path: 'pointLottery',
            permission: 'operate:pointLottery',
            hidden: true,
            redirect: '/operate/pointLottery/awardSet',
            component: () =>
                import ('@/views/operate/pointLottery/pointLotteryIndex'),
            meta: {
                title: '逗币活动',
                icon: 'operate_pointLottery'
            },
            children: [

                {
                    path: 'coinsReport',
                    permission: 'operate:pointLottery:coinsReport',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/coinsReport'),
                    meta: {
                        title: '逗币领取统计',
                        icon: 'operate_coinsReport'
                    }
                },
                {
                    path: 'awardSet',
                    permission: 'operate:pointLottery:awardSet',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/awardSet'),
                    meta: {
                        title: '商品设置',
                        icon: 'operate_awardSet'
                    }
                },
                {
                    path: 'exchangeSet',
                    permission: 'operate:pointLottery:exchangeSet',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/exchangeSet'),
                    meta: {
                        title: '兑换商品设置',
                        icon: 'operate_exchangeSet'
                    }
                },
                {
                    path: 'userCoins',
                    permission: 'operate:pointLottery:userCoins',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/userCoins'),
                    meta: {
                        title: '逗币查询',
                        icon: 'operate_userCoins'
                    }
                },
                {
                    path: 'awardPool',
                    permission: 'operate:pointLottery:awardPool',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/awardPool'),
                    meta: {
                        title: '奖池设置',
                        icon: 'operate_awardPool'
                    }
                },
                {
                    path: 'blindboxSet',
                    permission: 'operate:pointLottery:blindboxSet',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/blindboxSet'),
                    meta: {
                        title: '盲盒设置',
                        icon: 'operate_blindboxSet'
                    }
                },
                {
                    path: 'orderManage',
                    permission: 'operate:pointLottery:orderManage',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/orderManage'),
                    meta: {
                        title: '订单管理',
                        icon: 'operate_orderManage'
                    }
                },
                {
                    path: 'redbagManage',
                    permission: 'operate:pointLottery:redbagManage',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/pointLottery/redbagManage'),
                    meta: {
                        title: '红包打款',
                        icon: 'operate_redbagManage'
                    }
                },

            ]
        }, {
            path: 'growthPoints',
            permission: 'operate:growthPoints',
            hidden: true,
            redirect: '/operate/growthPoints/growthValue',
            component: () =>
                import ('@/views/operate/growthPoints/growthPointsIndex'),
            meta: {
                title: '成长值和逗币',
                icon: 'menu_growthPoints'
            },
            children: [{
                    path: 'growthValue',
                    permission: 'operate:growthPoints:growthValue',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/growthPoints/growthValue'),
                    meta: {
                        title: '成长值统计'
                    }
                },
                {
                    path: 'growth',
                    permission: 'operate:growthPoints:growth',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/growthPoints/growth'),
                    meta: {
                        title: '成长值管理'
                    }
                },
                {
                    path: 'point',
                    permission: 'operate:growthPoints:point',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/growthPoints/point'),
                    meta: {
                        title: '逗币任务'
                    }
                },
                {
                    path: 'taskStastic',
                    permission: 'operate:growthPoints:taskStastic',
                    hidden: true,
                    component: () =>
                        import ('@/views/operate/growthPoints/taskStastic'),
                    meta: {
                        title: '逗比任务统计'
                    }
                },
            ]
        },
        //年度报告
        {
            path: 'annualReport',
            permission: 'operate:annualReport',
            hidden: true,
            redirect: '/operate/annualReport/2020',
            component: () =>
                import ('@/views/operate/annualReport/reportIndex'),
            meta: {
                title: '年度报告',
                icon: 'menu_annualReport'
            },
            children: [{
                path: '2020',
                permission: 'operate:annualReport:2020',
                hidden: true,
                component: () =>
                    import ('@/views/operate/annualReport/2020'),
                meta: {
                    title: '2020年度报告',
                    icon: 'menu_annualReport'
                }
            }]
        },


    ]
}

export { operate };