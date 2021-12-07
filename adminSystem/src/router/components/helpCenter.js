import Layout from '@/layout'
var helpCenter = {
    path: '/helpCenter',
    component: Layout,
    redirect: '/helpCenter/problemList',
    permission: 'helpCenter',
    hidden: true,
    meta: {
        title: '帮助中心',
        icon: 'menu_helpCenter'
    },
    children: [{
            path: 'bigQuestion',
            permission: 'helpCenter:bigQuestion',
            hidden: true,
            component: () =>
                import ('@/views/helpCenter/bigQuestion'),
            meta: {
                title: '问题大类',
                icon: 'helpCenter_guideList'
            }
        },
        {
            path: 'problemList',
            permission: 'helpCenter:problemList',
            hidden: true,
            component: () =>
                import ('@/views/helpCenter/problemList'),
            meta: {
                title: '常见问题',
                icon: 'helpCenter_problemList'
            }
        },
        {
            path: 'devicetype',
            permission: 'helpCenter:devicetype',
            hidden: true,
            component: () =>
                import ('@/views/helpCenter/devicetype'),
            meta: {
                title: '设备分类',
                icon: 'helpCenter_guideList'
            }
        },
        {
            path: 'guideList',
            permission: 'helpCenter:guideList',
            hidden: true,
            component: () =>
                import ('@/views/helpCenter/guideList'),
            meta: {
                title: '操作指南',
                icon: 'helpCenter_guideList'
            }
        }
    ]
}

export { helpCenter };