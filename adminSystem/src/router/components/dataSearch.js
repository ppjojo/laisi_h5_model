import Layout from '@/layout'
var dataSearch = {
    path: '/dataSearch',
    component: Layout,
    redirect: '/dataSearch:skipData',
    permission: 'dataSearch',
    hidden: true,
    meta: {
        title: '数据查询',
        icon: 'menu_dataSearch'
    },
    children: [{
            path: 'skipData',
            permission: 'dataSearch:skipData',
            hidden: true,
            component: () =>
                import ('@/views/dataSearch/skipData'),
            meta: {
                title: '跳绳查询',
                icon: 'dataSearch_skipData'
            }
        },
        {
            path: 'wristBall',
            permission: 'dataSearch:wristBall',
            hidden: true,
            component: () =>
                import ('@/views/dataSearch/wristBall'),
            meta: {
                title: '腕力球查询',
                icon: 'dataSearch_wristBall'
            }
        },
        {
            path: 'userData',
            permission: 'dataSearch:userData',
            hidden: true,
            component: () =>
                import ('@/views/dataSearch/userData'),
            meta: {
                title: '用户数据',
                icon: 'dataSearch_userData'
            }
        },
        {
            path: 'bindData',
            permission: 'dataSearch:bindData',
            hidden: true,
            component: () =>
                import ('@/views/dataSearch/bindData'),
            meta: {
                title: ' 绑定数据',
                icon: 'dataSearch_bindData'
            }
        },
        {
            path: 'uploadDtatus',
            permission: 'dataSearch:uploadDtatus',
            hidden: true,
            component: () =>
                import ('@/views/dataSearch/uploadDtatus'),
            meta: {
                title: '上报状态',
                icon: 'dataSearch_uploadDtatus'
            }
        },
        {
            path: 'pageCard',
            permission: 'dataSearch:pageCard',
            hidden: true,
            component: () =>
                import ('@/views/dataSearch/pageCard'),
            meta: {
                title: ' 首页卡片',
                icon: 'dataSearch_pageCard'
            }
        },

        {
            path: 'watch',
            permission: 'dataSearch:watch',
            hidden: true,
            redirect: '/dataSearch/watch/sportWatchSearch',
            component: () =>
                import ('@/views/dataSearch/watch/watchIndex'),
            meta: {
                title: '手表查询',
                icon: 'dataSearch_watch'
            },
            children: [{
                    path: 'sportWatchSearch',
                    permission: 'dataSearch:watch:sportWatchSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/watch/sportWatchSearch'),
                    meta: {
                        title: '年月日步数'
                    }
                },
                {
                    path: 'runWatchSearch',
                    permission: 'dataSearch:watch:runWatchSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/watch/runWatchSearch'),
                    meta: {
                        title: '年月日运动'
                    }
                },
                {
                    path: 'runHistorySearch',
                    permission: 'dataSearch:watch:runHistorySearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/watch/runHistorySearch'),
                    meta: {
                        title: '历史查询'
                    }
                },
                {
                    path: 'runListInfo',
                    permission: 'dataSearch:watch:runListInfo',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/watch/runListInfo'),
                    meta: {
                        title: '运动详情查询'
                    }
                },
                {
                    path: 'oxygenSearch',
                    permission: 'dataSearch:watch:oxygenSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/watch/oxygenSearch'),
                    meta: {
                        title: '年月日血氧查询'
                    }
                },
                {
                    path: 'calorySearch',
                    permission: 'dataSearch:watch:calorySearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/watch/calorySearch'),
                    meta: {
                        title: '年月日卡路里查询'
                    }
                },
                {
                    path: 'heartrateSearch',
                    permission: 'dataSearch:watch:heartrateSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/watch/heartrateSearch'),
                    meta: {
                        title: '年月日心率查询'
                    }
                },
            ]
        },
        {
            path: 'backgroundWatch',
            permission: 'dataSearch:backgroundWatch',
            hidden: true,
            redirect: '/dataSearch/backgroundWatch/backgroundRunSearch',
            component: () =>
                import ('@/views/dataSearch/backgroundWatch/backgroundWatchindex'),
            meta: {
                title: '服务端手表数据',
                icon: 'dataSearch_watch'
            },
            children: [{
                    path: 'backgroundRunSearch',
                    permission: 'dataSearch:backgroundWatch:backgroundRunSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/backgroundWatch/backgroundRunSearch'),
                    meta: {
                        title: '手表跑步'
                    }
                },
                {
                    path: 'backgroundSleepSearch',
                    permission: 'dataSearch:backgroundWatch:backgroundSleepSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/backgroundWatch/backgroundSleepSearch'),
                    meta: {
                        title: '手表睡眠'
                    }
                },
                {
                    path: 'backgroundStepSearch',
                    permission: 'dataSearch:backgroundWatch:backgroundStepSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/backgroundWatch/backgroundStepSearch'),
                    meta: {
                        title: '手表步数'
                    }
                },
                {
                    path: 'backgroundHeartSearch',
                    permission: 'dataSearch:backgroundWatch:backgroundHeartSearch',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/backgroundWatch/backgroundHeartSearch'),
                    meta: {
                        title: '手表心率'
                    }
                },
                {
                    path: 'backgroundBD',
                    permission: 'dataSearch:backgroundWatch:backgroundBD',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/backgroundWatch/backgroundBD'),
                    meta: {
                        title: '手表血压'
                    }
                },
                {
                    path: 'backgroundOxygen',
                    permission: 'dataSearch:backgroundWatch:backgroundOxygen',
                    hidden: true,
                    component: () =>
                        import ('@/views/dataSearch/backgroundWatch/backgroundOxygen'),
                    meta: {
                        title: '手表血氧'
                    }
                },
            ]
        },
    ]
}

export { dataSearch };