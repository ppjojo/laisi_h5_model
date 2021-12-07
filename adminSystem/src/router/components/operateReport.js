import Layout from '@/layout'
var operateReport = {
    path: '/operateReport',
    component: Layout,
    redirect: '/operateReport/clubReport',
    permission: 'operateReport',
    hidden: true,
    meta: {
        title: '运营报表',
        icon: 'menu_operateReport'
    },
    children: [{
            path: 'overView',
            permission: 'operateReport:overView',
            hidden: true,
            component: () =>
                import ('@/views/operateReport/overView'),
            meta: {
                title: '运营总览',
                icon: 'operateReport_courseInfoReport'
            }
        },
        {
            path: 'clubReport',
            permission: 'operateReport:clubReport',
            hidden: true,
            component: () =>
                import ('@/views/operateReport/clubReport'),
            meta: {
                title: '俱乐部报表',
                icon: 'operateReport_clubReport'
            }
        },
        {
            path: 'courseReport',
            permission: 'operateReport:courseReport',
            hidden: true,
            component: () =>
                import ('@/views/operateReport/courseReport'),
            meta: {
                title: '课程参与人数',
                icon: 'operateReport_courseReport'
            },
        },
        {
            path: 'weekPlanOverview',
            permission: 'operateReport:weekPlanOverview',
            hidden: true,
            component: () =>
                import ('@/views/operateReport/weekPlanOverview'),
            meta: {
                title: '七日训练计划',
                icon: 'operateReport_courseInfoReport'
            },
        },
        {
            path: 'courseInfoReport',
            permission: 'operateReport:courseInfoReport',
            hidden: true,
            component: () =>
                import ('@/views/operateReport/courseInfoReport'),
            meta: {
                title: '课程总览',
                icon: 'operateReport_courseInfoReport'
            },
        },
        {
            path: 'communityReport',
            permission: 'operateReport:communityReport',
            hidden: true,
            component: () =>
                import ('@/views/operateReport/communityReport'),
            meta: {
                title: '社区报表',
                icon: 'operateReport_communityReport'
            }
        },
        {
            path: 'DBReport',
            permission: 'operateReport:DBReport',
            hidden: true,
            redirect: '/views/operateReport/DBReport/dailyAdd',
            component: () =>
                import ('@/views/operateReport/DBReport/DBIndex'),
            meta: {
                title: '逗币报表',
                icon: 'operateReport_communityReport'
            },
            children: [{
                path: 'dailyAdd',
                permission: 'operateReport:DBReport:dailyAdd',
                hidden: true,
                component: () =>
                    import ('@/views/operateReport/DBReport/dailyAdd'),
                meta: {
                    title: '每日新增',
                    icon: 'operateReport_courseInfoReport'
                }
            }, ]
        },
        {
            path: 'myTeamReport',
            permission: 'operateReport:myTeamReport',
            hidden: true,
            redirect: '/views/operateReport/myTeamReport/dailyAlive',
            component: () =>
                import ('@/views/operateReport/myTeamReport/index'),
            meta: {
                title: '我的小组',
                icon: 'operateReport_courseInfoReport'
            },
            children: [{
                path: 'dailyAlive',
                permission: 'operateReport:myTeamReport:dailyAlive',
                hidden: true,
                component: () =>
                    import ('@/views/operateReport/myTeamReport/dailyAlive'),
                meta: {
                    title: '小组报表',
                    icon: 'operateReport_courseInfoReport'
                }
            }, ]
        },
    ]
}
export { operateReport };