import Layout from '@/layout'
var clockDial = {
    path: '/clockDial',
    component: Layout,
    redirect: '/clockDial/dialResource',
    permission: 'clockDial',
    hidden: true,
    meta: {
        title: '表盘管理',
        icon: 'menu_clockDial'
    },
    children: [{
            path: 'dialResource',
            permission: 'clockDial:dialResource',
            hidden: true,
            component: () =>
                import ('@/views/clockDial/dialResource'),
            meta: {
                title: '表盘资源',
                icon: 'clockDial_dialResource'
            }
        },
        {
            path: 'dialinterface',
            permission: 'clockDial:dialinterface',
            hidden: true,
            component: () =>
                import ('@/views/clockDial/dialinterface'),
            meta: {
                title: '表盘界面',
                icon: 'clockDial_dialinterface'
            }
        },
    ]
}

export { clockDial };