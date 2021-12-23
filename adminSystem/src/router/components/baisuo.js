import Layout from '@/layout'
var baisuo = {
    path: '/baisuo',
    component: Layout,
    redirect: '/baisuo/user',
    permission: 'baisuo',
    hidden: true,
    meta: {
        title: '百索系统',
        icon: 'menu_baisuo'
    },
    children: [{
            path: 'user',
            permission: 'baisuo:user',
            hidden: true,
            component: () =>
                import ('@/views/baisuo/user'),
            meta: {
                title: '用户管理',
                icon: 'baisuo_user'
            }
        },
        {
            path: 'customer',
            permission: 'baisuo:customer',
            hidden: true,
            component: () =>
                import ('@/views/baisuo/customer'),
            meta: {
                title: '客户管理',
                icon: 'baisuo_customer'
            }
        },
        {
            path: 'template',
            permission: 'baisuo:template',
            hidden: true,
            component: () =>
                import ('@/views/baisuo/template'),
            meta: {
                title: '模板管理',
                icon: 'baisuo_template'
            }
        },
        {
            path: 'ropeSkipping',
            permission: 'baisuo:ropeSkipping',
            hidden: true,
            component: () =>
                import ('@/views/baisuo/ropeSkipping'),
            meta: {
                title: '跳绳管理',
                icon: 'baisuo_ropeSkipping'
            }
        },
        {
            path: 'hub',
            permission: 'baisuo:hub',
            hidden: true,
            component: () =>
                import ('@/views/baisuo/hub'),
            meta: {
                title: 'Hub管理',
                icon: 'baisuo_hub'
            }
        },

    ]
}

export { baisuo };