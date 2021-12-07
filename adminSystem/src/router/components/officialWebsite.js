import Layout from '@/layout'
var officialWebsite = {
    path: '/officialWebsite',
    component: Layout,
    redirect: '/officialWebsite/index/index',
    permission: 'officialWebsite',
    hidden: true,
    meta: {
        title: '官网后台',
        icon: 'menu_operate'
    },
    children: [{
            path: 'index',
            permission: 'officialWebsite:index',
            hidden: true,
            redirect: '/officialWebsite/index/index',
            component: () =>
                import ('@/views/officialWebsite/index/index'),
            meta: {
                title: '首页'
            },
            children: [{
                    path: 'bannerList',
                    permission: 'officialWebsite:index:bannerList',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/index/bannerList'),
                    meta: {
                        title: 'banner图更换'
                    }
                },
                {
                    path: 'adpic',
                    permission: 'officialWebsite:index:adpic',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/index/adpic'),
                    meta: {
                        title: '小图更换'
                    }
                },
                {
                    path: 'news',
                    permission: 'officialWebsite:index:news',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/index/news'),
                    meta: {
                        title: '新闻与活动'
                    }
                }
            ]
        },
        {
            path: 'aboutus',
            permission: 'officialWebsite:aboutus',
            hidden: true,
            redirect: '/officialWebsite/aboutus/index',
            component: () =>
                import ('@/views/officialWebsite/aboutus/index'),
            meta: {
                title: '关于铼锶'
            },
            children: [{
                    path: 'bannerList',
                    permission: 'officialWebsite:aboutus:bannerList',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/aboutus/bannerList'),
                    meta: {
                        title: 'banner图更换'
                    }
                },
                {
                    path: 'aboutLS',
                    permission: 'officialWebsite:aboutus:aboutLS',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/aboutus/aboutLS'),
                    meta: {
                        title: '关于我们'
                    }
                },
                {
                    path: 'brand',
                    permission: 'officialWebsite:aboutus:brand',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/aboutus/brand'),
                    meta: {
                        title: '品牌介绍'
                    }
                },
                {
                    path: 'memorabilia',
                    permission: 'officialWebsite:aboutus:memorabilia',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/aboutus/memorabilia'),
                    meta: {
                        title: '大事记'
                    }
                },
            ]
        },
        {
            path: 'businesscooperation',
            permission: 'officialWebsite:businesscooperation',
            hidden: true,
            redirect: '/officialWebsite/businesscooperation/index',
            component: () =>
                import ('@/views/officialWebsite/businesscooperation/index'),
            meta: {
                title: '商务合作'
            },
            children: [{
                    path: 'bannerList',
                    permission: 'officialWebsite:businesscooperation:bannerList',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/businesscooperation/bannerList'),
                    meta: {
                        title: 'banner图更换'
                    }
                },
                {
                    path: 'cooperativepartner',
                    permission: 'officialWebsite:businesscooperation:cooperativepartner',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/businesscooperation/cooperativepartner'),
                    meta: {
                        title: '我的合作伙伴'
                    }
                }
            ]
        },
        {
            path: 'outdoorSport',
            permission: 'officialWebsite:outdoorSport',
            hidden: true,
            redirect: '/officialWebsite/outdoorSport/index',
            component: () =>
                import ('@/views/officialWebsite/outdoorSport/index'),
            meta: {
                title: '户外运动系列'
            },
            children: [{
                    path: 'bannerList',
                    permission: 'officialWebsite:outdoorSport:bannerList',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/outdoorSport/bannerList'),
                    meta: {
                        title: 'banner图更换'
                    }
                },
                {
                    path: 'adpic',
                    permission: 'officialWebsite:outdoorSport:adpic',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/outdoorSport/adpic'),
                    meta: {
                        title: '产品更换'
                    }
                }
            ]
        },
        {
            path: 'smartWear',
            permission: 'officialWebsite:smartWear',
            hidden: true,
            redirect: '/officialWebsite/smartWear/index',
            component: () =>
                import ('@/views/officialWebsite/smartWear/index'),
            meta: {
                title: '智能穿戴系列'
            },
            children: [{
                    path: 'bannerList',
                    permission: 'officialWebsite:smartWear:bannerList',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/smartWear/bannerList'),
                    meta: {
                        title: 'banner图更换'
                    }
                },
                {
                    path: 'adpic',
                    permission: 'officialWebsite:smartWear:adpic',
                    hidden: true,
                    component: () =>
                        import ('@/views/officialWebsite/smartWear/adpic'),
                    meta: {
                        title: '产品更换'
                    }
                }
            ]
        },
        {
            path: 'paiHealth',
            permission: 'officialWebsite:paiHealth',
            hidden: true,
            redirect: '/officialWebsite/paiHealth/index',
            component: () =>
                import ('@/views/officialWebsite/paiHealth/index'),
            meta: {
                title: '派健康'
            },
            children: [{
                path: 'bannerList',
                permission: 'officialWebsite:paiHealth:bannerList',
                hidden: true,
                component: () =>
                    import ('@/views/officialWebsite/paiHealth/bannerList'),
                meta: {
                    title: 'banner图更换'
                }
            }, ]
        },
        {
            path: 'Solution',
            permission: 'officialWebsite:Solution',
            hidden: true,
            redirect: '/officialWebsite/Solution/index',
            component: () =>
                import ('@/views/officialWebsite/Solution/index'),
            meta: {
                title: '行业解决方案'
            },
            children: [{
                path: 'bannerList',
                permission: 'officialWebsite:Solution:bannerList',
                hidden: true,
                component: () =>
                    import ('@/views/officialWebsite/Solution/bannerList'),
                meta: {
                    title: 'banner图更换'
                }
            }, ]
        },
    ]
}

export { officialWebsite };