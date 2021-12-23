import Layout from '@/layout'
var upgrade = {
    path: '/upgrade',
    component: Layout,
    redirect: '/upgrade/firmware',
    permission: 'upgrade',
    hidden: true,
    meta: {
        title: '升级资源',
        icon: 'menu_upgrade'
    },
    children: [{
            path: 'firmware',
            permission: 'upgrade:firmware',
            hidden: true,
            component: () =>
                import ('@/views/upgrade/firmware'),
            meta: {
                title: '固件管理',
                icon: 'upgrade_firmware'
            }
        },
        {
            path: 'resource',
            permission: 'upgrade:resource',
            hidden: true,
            component: () =>
                import ('@/views/upgrade/resource'),
            meta: {
                title: '资源管理',
                icon: 'upgrade_resource'
            }
        }
    ]
}

export { upgrade };