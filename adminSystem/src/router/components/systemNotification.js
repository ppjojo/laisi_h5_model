import Layout from '@/layout'
var systemNotification = {
    path: '/systemNotification',
    component: Layout,
    redirect: '/systemNotification/systemNotification',
    permission: 'systemNotification',
    hidden: true,
    meta: {
        title: '系统通知',
        icon: 'menu_systemNotification'
    },
    children: [{
            path: 'systemNotification',
            permission: 'systemNotification:systemNotification',
            hidden: true,
            component: () =>
                import ('@/views/systemNotification/systemNotification'),
            meta: {
                title: '系统通知',
                icon: 'systemNotification_systemNotification'
            }
        },

    ]
}

export { systemNotification };