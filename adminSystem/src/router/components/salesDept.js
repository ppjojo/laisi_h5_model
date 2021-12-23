import Layout from '@/layout'
var salesDept = {
    path: '/salesDept',
    component: Layout,
    redirect: '/salesDept/salesDashboard',
    permission: 'salesDept',
    hidden: true,
    meta: {
        title: '销售部报表',
        icon: 'menu_salesDept'
    },
    children: [{
            path: 'salesDashboard',
            permission: 'salesDept:salesDashboard',
            hidden: true,
            component: () =>
                import ('@/views/salesDept/salesDashboard'),
            meta: {
                title: '销售看板',
                icon: 'salesDept_salesDashboard'
            }
        },
        {
            path: 'salesDataEntry',
            permission: 'salesDept:salesDataEntry',
            hidden: true,
            component: () =>
                import ('@/views/salesDept/salesDataEntry'),
            meta: {
                title: '销售数据录入',
                icon: 'salesDept_salesDataEntry'
            }
        }
    ]
}

export { salesDept };