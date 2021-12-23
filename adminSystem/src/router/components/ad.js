import Layout from '@/layout'
var ad = {
    path: '/ad',
    component: Layout,
    redirect: '/ad/banner',
    permission: 'ad',
    hidden: true,
    meta: {
        title: '广告配置',
        icon: 'menu_ad'
    },
    children: [{
            path: 'banner',
            permission: 'ad:banner',
            hidden: true,
            component: () =>
                import ('@/views/ad/banner'),
            meta: {
                title: 'banner',
                icon: 'ad_banner'
            }
        },
        {
            path: 'adSDK',
            permission: 'ad:adSDK',
            hidden: true,
            component: () =>
                import ('@/views/ad/adSDK'),
            meta: {
                title: '广告SDK',
                icon: 'ad_adSDK'
            }
        }
    ]
}
export { ad };