import Layout from '@/layout'
var software = {
    path: '/software',
    component: Layout,
    redirect: '/software/firmware',
    permission: 'software',
    hidden: true,
    meta: {
        title: '软件升级',
        icon: 'menu_software'
    },
    children: [{
            path: 'publicChannels',
            permission: 'software:publicChannels',
            hidden: true,
            component: () =>
                import ('@/views/software/publicChannels'),
            meta: {
                title: '公共渠道',
                icon: 'software_publicChannels'
            }
        },
        {
            path: 'appList',
            permission: 'software:appList',
            hidden: true,
            component: () =>
                import ('@/views/software/appList'),
            meta: {
                title: 'APP管理',
                icon: 'software_appList'
            }
        },
        {
            path: 'version',
            permission: 'software:version',
            hidden: true,
            component: () =>
                import ('@/views/software/version'),
            meta: {
                title: '版本管理',
                icon: 'software_version'
            }
        },
    ]
}

export { software };