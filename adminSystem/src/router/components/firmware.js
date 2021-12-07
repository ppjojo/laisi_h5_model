import Layout from '@/layout'
var firmware = {
    path: '/firmware',
    component: Layout,
    redirect: '/firmware/fota',
    permission: 'firmware',
    hidden: true,
    meta: {
        title: '固件升级',
        icon: 'menu_firmware'
    },
    children: [{
            path: 'fota',
            permission: 'firmware:fota',
            hidden: true,
            component: () =>
                import ('@/views/firmware/fota'),
            meta: {
                title: 'Fota配置',
                icon: 'firmware_fota'
            }
        },
        {
            path: 'bodyFat',
            permission: 'firmware:bodyFat',
            hidden: true,
            component: () =>
                import ('@/views/firmware/bodyFat'),
            meta: {
                title: '体脂秤固件',
                icon: 'firmware_bodyFat'
            }
        },
        {
            path: 'whiteList',
            permission: 'firmware:whiteList',
            hidden: true,
            component: () =>
                import ('@/views/firmware/whiteList'),
            meta: {
                title: '白名单',
                icon: 'firmware_whiteList'
            }
        },
        {
            path: 'whiteListJob',
            permission: 'firmware:whiteListJob',
            hidden: true,
            component: () =>
                import ('@/views/firmware/whiteListJob'),
            meta: {
                title: '白名单更新规则',
                icon: 'firmware_whiteListJob'
            }
        },
    ]
}

export { firmware };