import Layout from '@/layout'
var device = {
    path: '/device',
    component: Layout,
    redirect: '/device/productCategory',
    permission: 'device',
    hidden: true,
    meta: {
        title: '设备管理',
        icon: 'menu_device'
    },
    children: [{
            path: 'productCategory',
            permission: 'device:productCategory',
            hidden: true,
            component: () =>
                import ('@/views/device/productCategory'),
            meta: {
                title: '产品分类',
                icon: 'device_productCategory'
            }
        },
        {
            path: 'productList',
            permission: 'device:productList',
            hidden: true,
            component: () =>
                import ('@/views/device/productList'),
            meta: {
                title: '产品分类',
                icon: 'device_productCategory'
            }
        },
        {
            path: 'productCard',
            permission: 'device:productCard',
            hidden: true,
            component: () =>
                import ('@/views/device/productCard'),
            meta: {
                title: '产品卡片标题',
                icon: 'device_productCard'
            }
        },

        {
            path: 'deviceNickname',
            permission: 'device:deviceNickname',
            hidden: true,
            component: () =>
                import ('@/views/device/deviceNickname'),
            meta: {
                title: '设备昵称',
                icon: 'device_deviceNickname'
            }
        },
        {
            path: 'deviceSupportAppVersion',
            permission: 'device:deviceSupportAppVersion',
            hidden: true,
            component: () =>
                import ('@/views/device/deviceSupportAppVersion'),
            meta: {
                title: '设备的APP版本配置',
                icon: 'device_deviceSupportAppVersion'
            }
        },
        {
            path: 'deviceBlacklist',
            permission: 'device:deviceBlacklist',
            hidden: true,
            component: () =>
                import ('@/views/device/deviceBlacklist'),
            meta: {
                title: '设备黑名单',
                icon: 'device_deviceBlacklist'
            }
        },
        {
            path: 'appLanguage',
            permission: 'device:appLanguage',
            hidden: true,
            component: () =>
                import ('@/views/device/appLanguage'),
            meta: {
                title: 'APP语言',
                icon: 'device_appLanguage'
            }
        },
        {
            path: 'watchSportType',
            permission: 'device:watchSportType',
            hidden: true,
            component: () =>
                import ('@/views/device/watchSportType'),
            meta: {
                title: '手表运动状态',
                icon: 'device_deviceBlacklist'
            }
        },
    ]
}

export { device };