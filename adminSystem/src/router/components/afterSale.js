import Layout from '@/layout'
var afterSale = {
    path: '/afterSale',
    component: Layout,
    redirect: '/afterSale/dataPerfection',
    permission: 'afterSale',
    hidden: true,
    meta: {
        title: '售后服务',
        icon: 'menu_afterSale'
    },
    children: [{
            path: 'dataPerfection',
            permission: 'afterSale:dataPerfection',
            hidden: true,
            component: () =>
                import ('@/views/afterSale/dataPerfection'),
            meta: {
                title: '数据完善',
                icon: 'afterSale_dataPerfection'
            }
        },
        {
            path: 'club',
            permission: 'afterSale:club',
            hidden: true,
            component: () =>
                import ('@/views/afterSale/club'),
            meta: {
                title: '俱乐部',
                icon: 'afterSale_club'
            }
        },
        {
            path: 'goods',
            permission: 'afterSale:goods',
            hidden: true,
            component: () =>
                import ('@/views/afterSale/goods'),
            meta: {
                title: '发现页商品',
                icon: 'afterSale_goods'
            }
        },
        {
            path: 'customerSN',
            permission: 'afterSale:customerSN',
            hidden: true,
            component: () =>
                import ('@/views/afterSale/customerSN'),
            meta: {
                title: '客户SN和MAC',
                icon: 'operate_customerSN'
            }
        },
    ]
}
export { afterSale };