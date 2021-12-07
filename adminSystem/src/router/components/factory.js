import Layout from '@/layout'
var factory = {
    path: '/factoryTesting',
    component: Layout,
    redirect: '/factoryTesting/factory',
    permission: 'factoryTesting',
    hidden: true,
    meta: {
        title: '工厂测试',
        icon: 'menu_factoryTesting'
    },
    children: [{
            path: 'factory',
            permission: 'factoryTesting:factory',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/factory'),
            meta: {
                title: '工厂管理',
            }
        },
        {
            path: 'project',
            permission: 'factoryTesting:project',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/project'),
            meta: {
                title: '项目管理'
            }
        },
        {
            path: 'testType',
            permission: 'factoryTesting:testType',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/testType'),
            meta: {
                title: '测试类型管理'
            }
        },
        {
            path: 'station',
            permission: 'factoryTesting:station',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/station'),
            meta: {
                title: '站位管理'
            }
        },
        {
            path: 'stationConfiguration',
            permission: 'factoryTesting:stationConfiguration',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/stationConfiguration'),
            meta: {
                title: '站位配置'
            }
        },
        {
            path: 'testItem',
            permission: 'factoryTesting:testItem',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/testItem'),
            meta: {
                title: '测试项'
            }
        },
        {
            path: 'testItemConfiguration',
            permission: 'factoryTesting:testItemConfiguration',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/testItemConfiguration'),
            meta: {
                title: '测试项配置'
            }
        },
        {
            path: 'testResult',
            permission: 'factoryTesting:testResult',
            hidden: true,
            component: () =>
                import ('@/views/factoryTesting/testResult'),
            meta: {
                title: '测试结果'
            }
        },

    ]
}

export { factory };